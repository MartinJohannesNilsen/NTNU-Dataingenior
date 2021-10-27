.. _examples-label:

###########################
Examples for OpenZen Usage
###########################

Connecting multiple Sensors
===========================

Its possible to connect multiple sensors with one OpenZen instance and event loops. Simply connect
to multiple sensors and store the sensor's handle:

.. code-block:: cpp

    auto sensorPairA = client.obtainSensorByName("SiUsb", "lpmscu2000574");
    auto& sensorA = sensorPairA.second;

    auto sensorPairB = client.obtainSensorByName("SiUsb", "lpmscu2000573");
    auto& sensorB = sensorPairB.second;

In your event loop, now check which sensor the last received event is orginating from:

.. code-block:: cpp

    auto event = client.waitForNextEvent();

    if (sensorA.sensor() == event.second.sensor) {
        std::cout << "Data from Sensor A" << std::endl;
    } else if (sensorB.sensor() == event.second.sensor) {
        std::cout << "Data from Sensor B" << std::endl;
    }

Synchronizing multiple Sensors
==============================

If multiple sensor are connected to the same OpenZen instance, they can be synchronized by putting
them into synchronization mode and then sending the command to leave synchronization mode at the same
time. The result of this operation will be that the ``timestamp`` and ``frameCount`` values returned by each
sensor will be in the same time frame. However, this method is a software synchronization and does not
account for the delay of the transport layer (USB, Bluetooth etc.) so the accuracy of this synchronization
is limited by this fact. In our experience, the software synchronization can achieve a synchronization better
than 5 milliseconds.

**C++ example code:**

.. code-block:: cpp

    // set both sensors in synchronization mode
    imu_component1.executeProperty(ZenImuProperty_StartSensorSync);
    imu_component2.executeProperty(ZenImuProperty_StartSensorSync);

    // wait a moment for the synchronization commands to arrive
    std::this_thread::sleep_for(std::chrono::seconds(3));

    // set both sensors back to normal mode
    imu_component1.executeProperty(ZenImuProperty_StopSensorSync);
    imu_component2.executeProperty(ZenImuProperty_StopSensorSync);

    // start receiving regular events from the sensors

**Python example code:**

.. code-block:: python

    # set both sensors in synchronization mode
    imu_component1.execute_property(openzen.ZenImuProperty.StartSensorSync)
    imu_component2.execute_property(openzen.ZenImuProperty.StartSensorSync)

    # wait a moment for the synchronization commands to arrive
    time.sleep(3)

    # set both sensors back to normal mode
    imu_component1.execute_property(openzen.ZenImuProperty.StopSensorSync)
    imu_component2.execute_property(openzen.ZenImuProperty.StopSensorSync)

    # start receiving regular events from the sensors
