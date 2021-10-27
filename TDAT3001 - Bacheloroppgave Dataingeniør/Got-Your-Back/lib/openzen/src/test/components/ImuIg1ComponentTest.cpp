//===========================================================================//
//
// Copyright (C) 2021 LP-Research Inc.
//
// This file is part of OpenZen, under the MIT License.
// See https://bitbucket.org/lpresearch/openzen/src/master/LICENSE for details
// SPDX-License-Identifier: MIT
//
//===========================================================================//

#include <gtest/gtest.h>

#include "components/ImuIg1Component.h"
#include "communication/ConnectionNegotiator.h"
#include "communication/SyncedModbusCommunicator.h"
#include "properties/Ig1ImuProperties.h"
#include "test/communication/MockbusCommunicator.h"
#include "ZenTypesHelpers.h"

#include <vector>
#include <iomanip>
#include <iostream>

using namespace zen;

inline std::vector<std::byte> float_to_bytes(float f) {

    std::vector<std::byte> v_out;
    std::byte const * p = reinterpret_cast<std::byte const *>(&f);
    for (std::size_t i = 0; i != sizeof(float); ++i)
    {
        v_out.push_back(p[i]);
    }
    return v_out;
}

inline std::vector<std::byte> float_to_int16_to_bytes(float f, float multiplier) {

    std::vector<std::byte> v_out;
    int16_t v_int = f * multiplier;
    std::byte const * p = reinterpret_cast<std::byte const *>(&v_int);
    for (std::size_t i = 0; i != sizeof(int16_t); ++i)
    {
        v_out.push_back(p[i]);
    }
    return v_out;
}

inline std::vector<std::byte> uint32_to_bytes(uint32_t f) {

    std::vector<std::byte> v_out;
    std::byte const * p = reinterpret_cast<std::byte const *>(&f);
    for (std::size_t i = 0; i != sizeof(uint32_t); ++i)
    {
        v_out.push_back(p[i]);
    }
    return v_out;
}

TEST(ImuIg1Component, parseDataPackage_32bit) {

    ConnectionNegotiator negotiator;
    auto mockPtr = std::make_unique<MockbusCommunicator>(negotiator, MockbusCommunicator::RepliesVector() );
    auto syncMockPtr = std::make_unique<SyncedModbusCommunicator>(std::move(mockPtr));
    auto properties = std::make_unique<Ig1ImuProperties>(*syncMockPtr.get());

    // enable data bits to parse
    properties->setOutputDataBitset(
        (1 << 0) | // raw accelerometer
        (1 << 1) | // calibrated accelerometer
        (1 << 2) | // Raw Gyro 0
        (1 << 3) | // Raw Gyro 1
        (1 << 4) | // Bias Calib Gyro 0
        (1 << 5) | // Bias Calib Gyro 1
        (1 << 6) | // Align Calib Gyro 0
        (1 << 7) | // Align Calib Gyro 1
        (1 << 8) | // Raw Mag
        (1 << 9) | // Mag calibrated
        (1 << 10) | // Angular velocity
        (1 << 11) | // Quaternion
        (1 << 12) | // Euler angles
        (1 << 13) | // Linear acceleration
        (0 << 14) | // Pressure (not used by firmware)
        (0 << 15) | // Altitude (not used by firmware)
        (1 << 16)   // Temperature
    );
    // this means the sensor will output degrees
    // which means there will be no internal rad -> deg
    // conversion
    properties->setRadOutput(false);
    properties->setLowPrecisionMode(false);

    ImuIg1Component imuComp(std::move(properties), *syncMockPtr.get(), 0, false);

    std::vector<std::byte> vecValidPacket;
    
    // timestamp
    {
        auto v = uint32_to_bytes(123);
        vecValidPacket.insert(vecValidPacket.end(), v.begin(), v.end());
    }

    // acc Raw 3 vector
    {
        auto vx = float_to_bytes(10.0);
        auto vy = float_to_bytes(15.0);
        auto vz = float_to_bytes(20.0);
        vecValidPacket.insert(vecValidPacket.end(), vx.begin(), vx.end());
        vecValidPacket.insert(vecValidPacket.end(), vy.begin(), vy.end());
        vecValidPacket.insert(vecValidPacket.end(), vz.begin(), vz.end());
    }

    // acc Calibrated 3 vector
    {
        auto vx = float_to_bytes(-10.0);
        auto vy = float_to_bytes(-15.0);
        auto vz = float_to_bytes(-20.0);
        vecValidPacket.insert(vecValidPacket.end(), vx.begin(), vx.end());
        vecValidPacket.insert(vecValidPacket.end(), vy.begin(), vy.end());
        vecValidPacket.insert(vecValidPacket.end(), vz.begin(), vz.end());
    }

    // Raw Gyro 1
    {
        auto vx = float_to_bytes(-1.0);
        auto vy = float_to_bytes(-1.5);
        auto vz = float_to_bytes(-2.0);
        vecValidPacket.insert(vecValidPacket.end(), vx.begin(), vx.end());
        vecValidPacket.insert(vecValidPacket.end(), vy.begin(), vy.end());
        vecValidPacket.insert(vecValidPacket.end(), vz.begin(), vz.end());
    }

    // Raw Gyro 2
    {
        auto vx = float_to_bytes(1.0);
        auto vy = float_to_bytes(1.5);
        auto vz = float_to_bytes(2.0);
        vecValidPacket.insert(vecValidPacket.end(), vx.begin(), vx.end());
        vecValidPacket.insert(vecValidPacket.end(), vy.begin(), vy.end());
        vecValidPacket.insert(vecValidPacket.end(), vz.begin(), vz.end());
    }

    // Static-calib Gyro 1
    {
        auto vx = float_to_bytes(-0.1);
        auto vy = float_to_bytes(-0.15);
        auto vz = float_to_bytes(-0.2);
        vecValidPacket.insert(vecValidPacket.end(), vx.begin(), vx.end());
        vecValidPacket.insert(vecValidPacket.end(), vy.begin(), vy.end());
        vecValidPacket.insert(vecValidPacket.end(), vz.begin(), vz.end());
    }

    // Static-calib Gyro 2
    {
        auto vx = float_to_bytes(0.1);
        auto vy = float_to_bytes(0.1);
        auto vz = float_to_bytes(0.2);
        vecValidPacket.insert(vecValidPacket.end(), vx.begin(), vx.end());
        vecValidPacket.insert(vecValidPacket.end(), vy.begin(), vy.end());
        vecValidPacket.insert(vecValidPacket.end(), vz.begin(), vz.end());
    }

    // alignemnt-calib Gyro 1, this is gonna go into the g output of Ig1
    {
        auto vx = float_to_bytes(-2.1);
        auto vy = float_to_bytes(-2.15);
        auto vz = float_to_bytes(-2.2);
        vecValidPacket.insert(vecValidPacket.end(), vx.begin(), vx.end());
        vecValidPacket.insert(vecValidPacket.end(), vy.begin(), vy.end());
        vecValidPacket.insert(vecValidPacket.end(), vz.begin(), vz.end());
    }

    // alignment-calib Gyro 2
    {
        auto vx = float_to_bytes(1.1);
        auto vy = float_to_bytes(1.15);
        auto vz = float_to_bytes(1.2);
        vecValidPacket.insert(vecValidPacket.end(), vx.begin(), vx.end());
        vecValidPacket.insert(vecValidPacket.end(), vy.begin(), vy.end());
        vecValidPacket.insert(vecValidPacket.end(), vz.begin(), vz.end());
    }

    // Raw Magnetometer
    {
        auto vx = float_to_bytes(-5.1);
        auto vy = float_to_bytes(-5.15);
        auto vz = float_to_bytes(-5.2);
        vecValidPacket.insert(vecValidPacket.end(), vx.begin(), vx.end());
        vecValidPacket.insert(vecValidPacket.end(), vy.begin(), vy.end());
        vecValidPacket.insert(vecValidPacket.end(), vz.begin(), vz.end());
    }

    // Calib Magnetometer
    {
        auto vx = float_to_bytes(5.1);
        auto vy = float_to_bytes(5.15);
        auto vz = float_to_bytes(5.2);
        vecValidPacket.insert(vecValidPacket.end(), vx.begin(), vx.end());
        vecValidPacket.insert(vecValidPacket.end(), vy.begin(), vy.end());
        vecValidPacket.insert(vecValidPacket.end(), vz.begin(), vz.end());
    }

    // Angular Velocity
    {
        auto vx = float_to_bytes(-3.1);
        auto vy = float_to_bytes(-3.15);
        auto vz = float_to_bytes(-3.2);
        vecValidPacket.insert(vecValidPacket.end(), vx.begin(), vx.end());
        vecValidPacket.insert(vecValidPacket.end(), vy.begin(), vy.end());
        vecValidPacket.insert(vecValidPacket.end(), vz.begin(), vz.end());
    }

    // Quaternion
    {
        auto vq = float_to_bytes(0.5);
        auto vx = float_to_bytes(0.5);
        auto vy = float_to_bytes(-0.5);
        auto vz = float_to_bytes(-0.5);
        vecValidPacket.insert(vecValidPacket.end(), vq.begin(), vq.end());
        vecValidPacket.insert(vecValidPacket.end(), vx.begin(), vx.end());
        vecValidPacket.insert(vecValidPacket.end(), vy.begin(), vy.end());
        vecValidPacket.insert(vecValidPacket.end(), vz.begin(), vz.end());
    }

    // Euler Angles
    {
        auto vx = float_to_bytes(-0.5);
        auto vy = float_to_bytes(-0.6);
        auto vz = float_to_bytes(-0.7);
        vecValidPacket.insert(vecValidPacket.end(), vx.begin(), vx.end());
        vecValidPacket.insert(vecValidPacket.end(), vy.begin(), vy.end());
        vecValidPacket.insert(vecValidPacket.end(), vz.begin(), vz.end());
    }

    // Linear Acceleration
    {
        auto vx = float_to_bytes(0.6);
        auto vy = float_to_bytes(0.7);
        auto vz = float_to_bytes(0.8);
        vecValidPacket.insert(vecValidPacket.end(), vx.begin(), vx.end());
        vecValidPacket.insert(vecValidPacket.end(), vy.begin(), vy.end());
        vecValidPacket.insert(vecValidPacket.end(), vz.begin(), vz.end());
    }

    // Temperature
    {
        auto vx = float_to_bytes(-23.1);
        vecValidPacket.insert(vecValidPacket.end(), vx.begin(), vx.end());
    }

    gsl::span<const std::byte> imuRaw(vecValidPacket);

    const auto parsed = imuComp.processEventData(ZenEventType_ImuData, imuRaw);
    ASSERT_EQ(123, parsed->imuData.frameCount);
    ASSERT_NEAR(123 * 0.002, parsed->imuData.timestamp, 0.0001);

    ASSERT_NEAR(10.0, parsed->imuData.aRaw[0], 0.0001);
    ASSERT_NEAR(15.0, parsed->imuData.aRaw[1], 0.0001);
    ASSERT_NEAR(20.0, parsed->imuData.aRaw[2], 0.0001);

    ASSERT_NEAR(-10.0, parsed->imuData.a[0], 0.0001);
    ASSERT_NEAR(-15.0, parsed->imuData.a[1], 0.0001);
    ASSERT_NEAR(-20.0, parsed->imuData.a[2], 0.0001);

    ASSERT_NEAR(-1.0, parsed->imuData.gRaw[0], 0.0001);
    ASSERT_NEAR(-1.5, parsed->imuData.gRaw[1], 0.0001);
    ASSERT_NEAR(-2.0, parsed->imuData.gRaw[2], 0.0001);

    ASSERT_NEAR(-2.1, parsed->imuData.g[0], 0.0001);
    ASSERT_NEAR(-2.15, parsed->imuData.g[1], 0.0001);
    ASSERT_NEAR(-2.2, parsed->imuData.g[2], 0.0001);

    ASSERT_NEAR(-5.1, parsed->imuData.bRaw[0] , 0.0001);
    ASSERT_NEAR(-5.15, parsed->imuData.bRaw[1], 0.0001);
    ASSERT_NEAR(-5.2, parsed->imuData.bRaw[2], 0.0001);

    ASSERT_NEAR(5.1, parsed->imuData.b[0] , 0.0001);
    ASSERT_NEAR(5.15, parsed->imuData.b[1], 0.0001);
    ASSERT_NEAR(5.2, parsed->imuData.b[2], 0.0001);

    ASSERT_NEAR(-3.1, parsed->imuData.w[0] , 0.0001);
    ASSERT_NEAR(-3.15, parsed->imuData.w[1], 0.0001);
    ASSERT_NEAR(-3.2, parsed->imuData.w[2], 0.0001);

    ASSERT_NEAR(0.5, parsed->imuData.q[0] , 0.0001);
    ASSERT_NEAR(0.5, parsed->imuData.q[1], 0.0001);
    ASSERT_NEAR(-0.5, parsed->imuData.q[2], 0.0001);
    ASSERT_NEAR(-0.5, parsed->imuData.q[3], 0.0001);

    ASSERT_NEAR(-0.5, parsed->imuData.r[0] , 0.0001);
    ASSERT_NEAR(-0.6, parsed->imuData.r[1], 0.0001);
    ASSERT_NEAR(-0.7, parsed->imuData.r[2], 0.0001);

    ASSERT_NEAR(0.6, parsed->imuData.linAcc[0] , 0.0001);
    ASSERT_NEAR(0.7, parsed->imuData.linAcc[1], 0.0001);
    ASSERT_NEAR(0.8, parsed->imuData.linAcc[2], 0.0001);

    ASSERT_NEAR(-23.1, parsed->imuData.temperature, 0.0001);
}

TEST(ImuIg1Component, parseDataPackage_16bit) {

    ConnectionNegotiator negotiator;
    auto mockPtr = std::make_unique<MockbusCommunicator>(negotiator, MockbusCommunicator::RepliesVector() );
    auto syncMockPtr = std::make_unique<SyncedModbusCommunicator>(std::move(mockPtr));
    auto properties = std::make_unique<Ig1ImuProperties>(*syncMockPtr.get());

    // enable data bits to parse
    properties->setOutputDataBitset(
        (1 << 0) | // raw accelerometer
        (1 << 1) | // calibrated accelerometer
        (1 << 2) | // Raw Gyro 0
        (1 << 3) | // Raw Gyro 1
        (1 << 4) | // Bias Calib Gyro 0
        (1 << 5) | // Bias Calib Gyro 1
        (1 << 6) | // Align Calib Gyro 0
        (1 << 7) | // Align Calib Gyro 1
        (1 << 8) | // Raw Mag
        (1 << 9) | // Mag calibrated
        (1 << 10) | // Angular velocity
        (1 << 11) | // Quaternion
        (1 << 12) | // Euler angles
        (1 << 13) | // Linear acceleration
        (0 << 14) | // Pressure (not used by firmware)
        (0 << 15) | // Altitude (not used by firmware)
        (1 << 16)   // Temperature
    );
    // this means the sensor will output degrees
    // which means there will be no internal rad -> deg
    // conversion
    properties->setRadOutput(false);
    properties->setLowPrecisionMode(true);

    ImuIg1Component imuComp(std::move(properties), *syncMockPtr.get(), 0, false);

    std::vector<std::byte> vecValidPacket;
    
    // timestamp
    {
        auto v = uint32_to_bytes(123);
        vecValidPacket.insert(vecValidPacket.end(), v.begin(), v.end());
    }

    // acc Raw 3 vector
    {
        auto vx = float_to_int16_to_bytes(10.0, 1000.0);
        auto vy = float_to_int16_to_bytes(15.0, 1000.0);
        auto vz = float_to_int16_to_bytes(20.0, 1000.0);
        vecValidPacket.insert(vecValidPacket.end(), vx.begin(), vx.end());
        vecValidPacket.insert(vecValidPacket.end(), vy.begin(), vy.end());
        vecValidPacket.insert(vecValidPacket.end(), vz.begin(), vz.end());
    }

    // acc Calibrated 3 vector
    {
        auto vx = float_to_int16_to_bytes(-10.0, 1000.0);
        auto vy = float_to_int16_to_bytes(-15.0, 1000.0);
        auto vz = float_to_int16_to_bytes(-20.0, 1000.0);
        vecValidPacket.insert(vecValidPacket.end(), vx.begin(), vx.end());
        vecValidPacket.insert(vecValidPacket.end(), vy.begin(), vy.end());
        vecValidPacket.insert(vecValidPacket.end(), vz.begin(), vz.end());
    }

    // Raw Gyro 1
    {
        auto vx = float_to_int16_to_bytes(-10.0, 10.0);
        auto vy = float_to_int16_to_bytes(-10.5, 10.0);
        auto vz = float_to_int16_to_bytes(-20.0, 10.0);
        vecValidPacket.insert(vecValidPacket.end(), vx.begin(), vx.end());
        vecValidPacket.insert(vecValidPacket.end(), vy.begin(), vy.end());
        vecValidPacket.insert(vecValidPacket.end(), vz.begin(), vz.end());
    }

    // Raw Gyro 2
    {
        auto vx = float_to_int16_to_bytes(10.0, 10.0);
        auto vy = float_to_int16_to_bytes(10.5, 10.0);
        auto vz = float_to_int16_to_bytes(20.0, 10.0);
        vecValidPacket.insert(vecValidPacket.end(), vx.begin(), vx.end());
        vecValidPacket.insert(vecValidPacket.end(), vy.begin(), vy.end());
        vecValidPacket.insert(vecValidPacket.end(), vz.begin(), vz.end());
    }

    // Static-calib Gyro 1
    {
        auto vx = float_to_int16_to_bytes(-10.0, 10.0);
        auto vy = float_to_int16_to_bytes(-15.0, 10.0);
        auto vz = float_to_int16_to_bytes(-20.0, 10.0);
        vecValidPacket.insert(vecValidPacket.end(), vx.begin(), vx.end());
        vecValidPacket.insert(vecValidPacket.end(), vy.begin(), vy.end());
        vecValidPacket.insert(vecValidPacket.end(), vz.begin(), vz.end());
    }

    // Static-calib Gyro 2
    {
        auto vx = float_to_int16_to_bytes(60.0, 10.0);
        auto vy = float_to_int16_to_bytes(70.0, 10.0);
        auto vz = float_to_int16_to_bytes(80.0, 10.0);
        vecValidPacket.insert(vecValidPacket.end(), vx.begin(), vx.end());
        vecValidPacket.insert(vecValidPacket.end(), vy.begin(), vy.end());
        vecValidPacket.insert(vecValidPacket.end(), vz.begin(), vz.end());
    }

    // alignemnt-calib Gyro 1, this is gonna go into the g output of Ig1
    {
        auto vx = float_to_int16_to_bytes(-20.0, 10.0);
        auto vy = float_to_int16_to_bytes(-21.5, 10.0);
        auto vz = float_to_int16_to_bytes(-22.0, 10.0);
        vecValidPacket.insert(vecValidPacket.end(), vx.begin(), vx.end());
        vecValidPacket.insert(vecValidPacket.end(), vy.begin(), vy.end());
        vecValidPacket.insert(vecValidPacket.end(), vz.begin(), vz.end());
    }

    // alignment-calib Gyro 2
    {
        auto vx = float_to_int16_to_bytes(11.0, 10.0);
        auto vy = float_to_int16_to_bytes(11.5, 10.0);
        auto vz = float_to_int16_to_bytes(12.0, 10.0);
        vecValidPacket.insert(vecValidPacket.end(), vx.begin(), vx.end());
        vecValidPacket.insert(vecValidPacket.end(), vy.begin(), vy.end());
        vecValidPacket.insert(vecValidPacket.end(), vz.begin(), vz.end());
    }

    // Raw Magnetometer
    {
        auto vx = float_to_int16_to_bytes(-5.1, 100.0);
        auto vy = float_to_int16_to_bytes(-5.15, 100.0);
        auto vz = float_to_int16_to_bytes(-5.2, 100.0);
        vecValidPacket.insert(vecValidPacket.end(), vx.begin(), vx.end());
        vecValidPacket.insert(vecValidPacket.end(), vy.begin(), vy.end());
        vecValidPacket.insert(vecValidPacket.end(), vz.begin(), vz.end());
    }

    // Calib Magnetometer
    {
        auto vx = float_to_int16_to_bytes(5.1, 100.0);
        auto vy = float_to_int16_to_bytes(5.15, 100.0);
        auto vz = float_to_int16_to_bytes(5.2, 100.0);
        vecValidPacket.insert(vecValidPacket.end(), vx.begin(), vx.end());
        vecValidPacket.insert(vecValidPacket.end(), vy.begin(), vy.end());
        vecValidPacket.insert(vecValidPacket.end(), vz.begin(), vz.end());
    }

    // Angular Velocity
    {
        auto vx = float_to_int16_to_bytes(-3.1, 100.0);
        auto vy = float_to_int16_to_bytes(-3.15, 100.0);
        auto vz = float_to_int16_to_bytes(-3.2, 100.0);
        vecValidPacket.insert(vecValidPacket.end(), vx.begin(), vx.end());
        vecValidPacket.insert(vecValidPacket.end(), vy.begin(), vy.end());
        vecValidPacket.insert(vecValidPacket.end(), vz.begin(), vz.end());
    }

    // Quaternion
    {
        auto vq = float_to_int16_to_bytes(0.5, 10000.0);
        auto vx = float_to_int16_to_bytes(0.5, 10000.0);
        auto vy = float_to_int16_to_bytes(-0.5, 10000.0);
        auto vz = float_to_int16_to_bytes(-0.5, 10000.0);
        vecValidPacket.insert(vecValidPacket.end(), vq.begin(), vq.end());
        vecValidPacket.insert(vecValidPacket.end(), vx.begin(), vx.end());
        vecValidPacket.insert(vecValidPacket.end(), vy.begin(), vy.end());
        vecValidPacket.insert(vecValidPacket.end(), vz.begin(), vz.end());
    }

    // Euler Angles
    {
        auto vx = float_to_int16_to_bytes(-0.5, 100.0);
        auto vy = float_to_int16_to_bytes(-0.6, 100.0);
        auto vz = float_to_int16_to_bytes(-0.7, 100.0);
        vecValidPacket.insert(vecValidPacket.end(), vx.begin(), vx.end());
        vecValidPacket.insert(vecValidPacket.end(), vy.begin(), vy.end());
        vecValidPacket.insert(vecValidPacket.end(), vz.begin(), vz.end());
    }

    // Linear Acceleration
    {
        auto vx = float_to_int16_to_bytes(0.6, 1000.0);
        auto vy = float_to_int16_to_bytes(0.7, 1000.0);
        auto vz = float_to_int16_to_bytes(0.8, 1000.0);
        vecValidPacket.insert(vecValidPacket.end(), vx.begin(), vx.end());
        vecValidPacket.insert(vecValidPacket.end(), vy.begin(), vy.end());
        vecValidPacket.insert(vecValidPacket.end(), vz.begin(), vz.end());
    }

    // Temperature
    {
        auto vx = float_to_int16_to_bytes(-23.1, 100.0);
        vecValidPacket.insert(vecValidPacket.end(), vx.begin(), vx.end());
    }

    gsl::span<const std::byte> imuRaw(vecValidPacket);

    const auto parsed = imuComp.processEventData(ZenEventType_ImuData, imuRaw);
    ASSERT_EQ(123, parsed->imuData.frameCount);
    ASSERT_NEAR(123 * 0.002, parsed->imuData.timestamp, 0.0001);

    ASSERT_NEAR(10.0, parsed->imuData.aRaw[0], 0.01);
    ASSERT_NEAR(15.0, parsed->imuData.aRaw[1], 0.01);
    ASSERT_NEAR(20.0, parsed->imuData.aRaw[2], 0.01);

    ASSERT_NEAR(-10.0, parsed->imuData.a[0], 0.01);
    ASSERT_NEAR(-15.0, parsed->imuData.a[1], 0.01);
    ASSERT_NEAR(-20.0, parsed->imuData.a[2], 0.01);

    ASSERT_NEAR(-10.0, parsed->imuData.gRaw[0], 0.01);
    ASSERT_NEAR(-10.5, parsed->imuData.gRaw[1], 0.01);
    ASSERT_NEAR(-20.0, parsed->imuData.gRaw[2], 0.01);

    ASSERT_NEAR(-20.0, parsed->imuData.g[0], 0.01);
    ASSERT_NEAR(-21.5, parsed->imuData.g[1], 0.01);
    ASSERT_NEAR(-22.0, parsed->imuData.g[2], 0.01);

    ASSERT_NEAR(-5.1, parsed->imuData.bRaw[0] , 0.01);
    ASSERT_NEAR(-5.15, parsed->imuData.bRaw[1], 0.01);
    ASSERT_NEAR(-5.2, parsed->imuData.bRaw[2], 0.01);

    ASSERT_NEAR(5.1, parsed->imuData.b[0] , 0.01);
    ASSERT_NEAR(5.15, parsed->imuData.b[1], 0.01);
    ASSERT_NEAR(5.2, parsed->imuData.b[2], 0.01);

    ASSERT_NEAR(-3.1, parsed->imuData.w[0] , 0.01);
    ASSERT_NEAR(-3.15, parsed->imuData.w[1], 0.01);
    ASSERT_NEAR(-3.2, parsed->imuData.w[2], 0.01);

    ASSERT_NEAR(0.5, parsed->imuData.q[0] , 0.01);
    ASSERT_NEAR(0.5, parsed->imuData.q[1], 0.01);
    ASSERT_NEAR(-0.5, parsed->imuData.q[2], 0.01);
    ASSERT_NEAR(-0.5, parsed->imuData.q[3], 0.01);

    ASSERT_NEAR(-0.5, parsed->imuData.r[0] , 0.01);
    ASSERT_NEAR(-0.6, parsed->imuData.r[1], 0.01);
    ASSERT_NEAR(-0.7, parsed->imuData.r[2], 0.01);

    ASSERT_NEAR(0.6, parsed->imuData.linAcc[0] , 0.01);
    ASSERT_NEAR(0.7, parsed->imuData.linAcc[1], 0.01);
    ASSERT_NEAR(0.8, parsed->imuData.linAcc[2], 0.01);

    ASSERT_NEAR(-23.1, parsed->imuData.temperature, 0.01);
}

TEST(ImuIg1Component, parseDataPackage_16bit_rad_output) {

    ConnectionNegotiator negotiator;
    auto mockPtr = std::make_unique<MockbusCommunicator>(negotiator, MockbusCommunicator::RepliesVector() );
    auto syncMockPtr = std::make_unique<SyncedModbusCommunicator>(std::move(mockPtr));
    auto properties = std::make_unique<Ig1ImuProperties>(*syncMockPtr.get());

    // enable data bits to parse
    properties->setOutputDataBitset(
        (1 << 0) | // raw accelerometer
        (1 << 1) | // calibrated accelerometer
        (1 << 2) | // Raw Gyro 0
        (1 << 3) | // Raw Gyro 1
        (1 << 4) | // Bias Calib Gyro 0
        (1 << 5) | // Bias Calib Gyro 1
        (1 << 6) | // Align Calib Gyro 0
        (1 << 7) | // Align Calib Gyro 1
        (1 << 8) | // Raw Mag
        (1 << 9) | // Mag calibrated
        (1 << 10) | // Angular velocity
        (1 << 11) | // Quaternion
        (1 << 12) | // Euler angles
        (1 << 13) | // Linear acceleration
        (0 << 14) | // Pressure (not used by firmware)
        (0 << 15) | // Altitude (not used by firmware)
        (1 << 16)   // Temperature
    );
    // this means the sensor will output degrees
    // which means there will be no internal rad -> deg
    // conversion
    properties->setRadOutput(true);
    properties->setLowPrecisionMode(true);

    ImuIg1Component imuComp(std::move(properties), *syncMockPtr.get(), 0, false);

    std::vector<std::byte> vecValidPacket;

    // timestamp
    {
        auto v = uint32_to_bytes(123);
        vecValidPacket.insert(vecValidPacket.end(), v.begin(), v.end());
    }

    // acc Raw 3 vector
    {
        auto vx = float_to_int16_to_bytes(10.0, 1000.0);
        auto vy = float_to_int16_to_bytes(15.0, 1000.0);
        auto vz = float_to_int16_to_bytes(20.0, 1000.0);
        vecValidPacket.insert(vecValidPacket.end(), vx.begin(), vx.end());
        vecValidPacket.insert(vecValidPacket.end(), vy.begin(), vy.end());
        vecValidPacket.insert(vecValidPacket.end(), vz.begin(), vz.end());
    }

    // acc Calibrated 3 vector
    {
        auto vx = float_to_int16_to_bytes(-10.0, 1000.0);
        auto vy = float_to_int16_to_bytes(-15.0, 1000.0);
        auto vz = float_to_int16_to_bytes(-20.0, 1000.0);
        vecValidPacket.insert(vecValidPacket.end(), vx.begin(), vx.end());
        vecValidPacket.insert(vecValidPacket.end(), vy.begin(), vy.end());
        vecValidPacket.insert(vecValidPacket.end(), vz.begin(), vz.end());
    }

    // Raw Gyro 1
    {
        auto vx = float_to_int16_to_bytes(degToRad(-10.0), 1000.0);
        auto vy = float_to_int16_to_bytes(degToRad(-10.5), 1000.0);
        auto vz = float_to_int16_to_bytes(degToRad(-20.0), 1000.0);
        vecValidPacket.insert(vecValidPacket.end(), vx.begin(), vx.end());
        vecValidPacket.insert(vecValidPacket.end(), vy.begin(), vy.end());
        vecValidPacket.insert(vecValidPacket.end(), vz.begin(), vz.end());
    }

    // Raw Gyro 2
    {
        auto vx = float_to_int16_to_bytes(degToRad(10.0), 100.0);
        auto vy = float_to_int16_to_bytes(degToRad(10.5), 100.0);
        auto vz = float_to_int16_to_bytes(degToRad(20.0), 100.0);
        vecValidPacket.insert(vecValidPacket.end(), vx.begin(), vx.end());
        vecValidPacket.insert(vecValidPacket.end(), vy.begin(), vy.end());
        vecValidPacket.insert(vecValidPacket.end(), vz.begin(), vz.end());
    }

    // Static-calib Gyro 1
    {
        auto vx = float_to_int16_to_bytes(degToRad(-10.0), 1000.0);
        auto vy = float_to_int16_to_bytes(degToRad(-15.0), 1000.0);
        auto vz = float_to_int16_to_bytes(degToRad(-20.0), 1000.0);
        vecValidPacket.insert(vecValidPacket.end(), vx.begin(), vx.end());
        vecValidPacket.insert(vecValidPacket.end(), vy.begin(), vy.end());
        vecValidPacket.insert(vecValidPacket.end(), vz.begin(), vz.end());
    }

    // Static-calib Gyro 2
    {
        auto vx = float_to_int16_to_bytes(degToRad(60.0), 100.0);
        auto vy = float_to_int16_to_bytes(degToRad(70.0), 100.0);
        auto vz = float_to_int16_to_bytes(degToRad(80.0), 100.0);
        vecValidPacket.insert(vecValidPacket.end(), vx.begin(), vx.end());
        vecValidPacket.insert(vecValidPacket.end(), vy.begin(), vy.end());
        vecValidPacket.insert(vecValidPacket.end(), vz.begin(), vz.end());
    }

    // alignemnt-calib Gyro 1, this is gonna go into the g output of Ig1
    {
        auto vx = float_to_int16_to_bytes(degToRad(-20.0), 1000.0);
        auto vy = float_to_int16_to_bytes(degToRad(-21.5), 1000.0);
        auto vz = float_to_int16_to_bytes(degToRad(-22.0), 1000.0);
        vecValidPacket.insert(vecValidPacket.end(), vx.begin(), vx.end());
        vecValidPacket.insert(vecValidPacket.end(), vy.begin(), vy.end());
        vecValidPacket.insert(vecValidPacket.end(), vz.begin(), vz.end());
    }

    // alignment-calib Gyro 2
    {
        auto vx = float_to_int16_to_bytes(degToRad(11.0), 100.0);
        auto vy = float_to_int16_to_bytes(degToRad(11.5), 100.0);
        auto vz = float_to_int16_to_bytes(degToRad(12.0), 100.0);
        vecValidPacket.insert(vecValidPacket.end(), vx.begin(), vx.end());
        vecValidPacket.insert(vecValidPacket.end(), vy.begin(), vy.end());
        vecValidPacket.insert(vecValidPacket.end(), vz.begin(), vz.end());
    }

    // Raw Magnetometer
    {
        auto vx = float_to_int16_to_bytes(-5.1, 100.0);
        auto vy = float_to_int16_to_bytes(-5.15, 100.0);
        auto vz = float_to_int16_to_bytes(-5.2, 100.0);
        vecValidPacket.insert(vecValidPacket.end(), vx.begin(), vx.end());
        vecValidPacket.insert(vecValidPacket.end(), vy.begin(), vy.end());
        vecValidPacket.insert(vecValidPacket.end(), vz.begin(), vz.end());
    }

    // Calib Magnetometer
    {
        auto vx = float_to_int16_to_bytes(5.1, 100.0);
        auto vy = float_to_int16_to_bytes(5.15, 100.0);
        auto vz = float_to_int16_to_bytes(5.2, 100.0);
        vecValidPacket.insert(vecValidPacket.end(), vx.begin(), vx.end());
        vecValidPacket.insert(vecValidPacket.end(), vy.begin(), vy.end());
        vecValidPacket.insert(vecValidPacket.end(), vz.begin(), vz.end());
    }

    // Angular Velocity
    {
        auto vx = float_to_int16_to_bytes(degToRad(-3.1), 100.0);
        auto vy = float_to_int16_to_bytes(degToRad(-3.15), 100.0);
        auto vz = float_to_int16_to_bytes(degToRad(-3.2), 100.0);
        vecValidPacket.insert(vecValidPacket.end(), vx.begin(), vx.end());
        vecValidPacket.insert(vecValidPacket.end(), vy.begin(), vy.end());
        vecValidPacket.insert(vecValidPacket.end(), vz.begin(), vz.end());
    }

    // Quaternion
    {
        auto vq = float_to_int16_to_bytes(0.5, 10000.0);
        auto vx = float_to_int16_to_bytes(0.5, 10000.0);
        auto vy = float_to_int16_to_bytes(-0.5, 10000.0);
        auto vz = float_to_int16_to_bytes(-0.5, 10000.0);
        vecValidPacket.insert(vecValidPacket.end(), vq.begin(), vq.end());
        vecValidPacket.insert(vecValidPacket.end(), vx.begin(), vx.end());
        vecValidPacket.insert(vecValidPacket.end(), vy.begin(), vy.end());
        vecValidPacket.insert(vecValidPacket.end(), vz.begin(), vz.end());
    }

    // Euler Angles
    {
        auto vx = float_to_int16_to_bytes(degToRad(-0.5), 10000.0);
        auto vy = float_to_int16_to_bytes(degToRad(-0.6), 10000.0);
        auto vz = float_to_int16_to_bytes(degToRad(-0.7), 10000.0);
        vecValidPacket.insert(vecValidPacket.end(), vx.begin(), vx.end());
        vecValidPacket.insert(vecValidPacket.end(), vy.begin(), vy.end());
        vecValidPacket.insert(vecValidPacket.end(), vz.begin(), vz.end());
    }

    // Linear Acceleration
    {
        auto vx = float_to_int16_to_bytes(0.6, 1000.0);
        auto vy = float_to_int16_to_bytes(0.7, 1000.0);
        auto vz = float_to_int16_to_bytes(0.8, 1000.0);
        vecValidPacket.insert(vecValidPacket.end(), vx.begin(), vx.end());
        vecValidPacket.insert(vecValidPacket.end(), vy.begin(), vy.end());
        vecValidPacket.insert(vecValidPacket.end(), vz.begin(), vz.end());
    }

    // Temperature
    {
        auto vx = float_to_int16_to_bytes(-23.1, 100.0);
        vecValidPacket.insert(vecValidPacket.end(), vx.begin(), vx.end());
    }

    gsl::span<const std::byte> imuRaw(vecValidPacket);

    const auto parsed = imuComp.processEventData(ZenEventType_ImuData, imuRaw);
    ASSERT_EQ(123, parsed->imuData.frameCount);
    ASSERT_NEAR(123 * 0.002, parsed->imuData.timestamp, 0.0001);

    ASSERT_NEAR(10.0, parsed->imuData.aRaw[0], 0.01);
    ASSERT_NEAR(15.0, parsed->imuData.aRaw[1], 0.01);
    ASSERT_NEAR(20.0, parsed->imuData.aRaw[2], 0.01);

    ASSERT_NEAR(-10.0, parsed->imuData.a[0], 0.01);
    ASSERT_NEAR(-15.0, parsed->imuData.a[1], 0.01);
    ASSERT_NEAR(-20.0, parsed->imuData.a[2], 0.01);

    ASSERT_NEAR(-10.0, parsed->imuData.gRaw[0], 0.1);
    ASSERT_NEAR(-10.5, parsed->imuData.gRaw[1], 0.1);
    ASSERT_NEAR(-20.0, parsed->imuData.gRaw[2], 0.1);

    ASSERT_NEAR(-20.0, parsed->imuData.g[0], 0.1);
    ASSERT_NEAR(-21.5, parsed->imuData.g[1], 0.1);
    ASSERT_NEAR(-22.0, parsed->imuData.g[2], 0.1);

    ASSERT_NEAR(-5.1, parsed->imuData.bRaw[0] , 0.01);
    ASSERT_NEAR(-5.15, parsed->imuData.bRaw[1], 0.01);
    ASSERT_NEAR(-5.2, parsed->imuData.bRaw[2], 0.01);

    ASSERT_NEAR(5.1, parsed->imuData.b[0] , 0.01);
    ASSERT_NEAR(5.15, parsed->imuData.b[1], 0.01);
    ASSERT_NEAR(5.2, parsed->imuData.b[2], 0.01);

    ASSERT_NEAR(-3.1, parsed->imuData.w[0] , 0.4);
    ASSERT_NEAR(-3.15, parsed->imuData.w[1], 0.4);
    ASSERT_NEAR(-3.2, parsed->imuData.w[2], 0.4);

    ASSERT_NEAR(0.5, parsed->imuData.q[0] , 0.01);
    ASSERT_NEAR(0.5, parsed->imuData.q[1], 0.01);
    ASSERT_NEAR(-0.5, parsed->imuData.q[2], 0.01);
    ASSERT_NEAR(-0.5, parsed->imuData.q[3], 0.01);

    ASSERT_NEAR(-0.5, parsed->imuData.r[0] , 0.01);
    ASSERT_NEAR(-0.6, parsed->imuData.r[1], 0.01);
    ASSERT_NEAR(-0.7, parsed->imuData.r[2], 0.01);

    ASSERT_NEAR(0.6, parsed->imuData.linAcc[0] , 0.01);
    ASSERT_NEAR(0.7, parsed->imuData.linAcc[1], 0.01);
    ASSERT_NEAR(0.8, parsed->imuData.linAcc[2], 0.01);

    ASSERT_NEAR(-23.1, parsed->imuData.temperature, 0.01);
}
