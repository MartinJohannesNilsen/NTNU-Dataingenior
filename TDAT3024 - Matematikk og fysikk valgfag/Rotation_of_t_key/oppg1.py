import numpy as np
import math


# Oppgave a)
def exponent_function(h, Ω):
    """
    Approximates the position of the axis
    @param h: Step size
    @param Ω: Rotation-matrix
    @return: Matrix X
    """
    ω_x, ω_y, ω_z = Ω[2, 1], Ω[0, 2], Ω[1, 0]

    ω = np.sqrt(ω_x ** 2 + ω_y ** 2 + ω_z ** 2)

    identity_matrix = np.identity(3)
    return identity_matrix + ((1 - np.cos(ω * h)) * ((np.dot(Ω, Ω)) / ω ** 2)) + (np.sin(ω * h) * (np.divide(Ω, ω)))


def test_exponent_function(ω, h):
    """
    Test that the exponential function satisfies the requirements of X^T * X = Id_(3x)
    @param ω:
    @param h: step-size
    @return: true if the requirement is satisfied
    """
    identity_matrix = np.identity(3)

    ω_x = ω[0]
    ω_y = ω[1]
    ω_z = ω[2]

    Ω = np.array(
        [[0, -ω_z, ω_y],
         [ω_z, 0, -ω_x],
         [-ω_y, ω_x, 0]]
    )
    X_approx = exponent_function(h, Ω)
    should_be_identity_matrix = np.dot(np.transpose(X_approx), X_approx)
    return np.allclose(should_be_identity_matrix, identity_matrix)


# Oppgave b)
def torque_L(I, ω):
    """
    Calculates the torque of a rigid body
    @param I: Moment of inertia of the rigid body
    @param ω: Rotation vector (1 x 3)
    @return: Torque
    """
    # Calculates the torque from the components of I
    I_xx = I[0, 0]
    I_xy = I[0, 1]
    I_xz = I[0, 2]
    I_yx = I[1, 0]
    I_yy = I[1, 1]
    I_yz = I[1, 2]
    I_zx = I[2, 0]
    I_zy = I[2, 1]
    I_zz = I[2, 2]

    ω_x, ω_y, ω_z = ω[0], ω[1], ω[2]

    # Finds the components of torque L
    L_x = (I_xx * ω_x) - (I_xy * ω_y) - (I_xz * ω_z)
    L_y = (-I_yx * ω_x) + (I_yy * ω_y) - (I_yz * ω_z)
    L_z = (-I_zx * ω_x) - (I_zy * ω_y) + (I_zz * ω_z)

    return np.array([L_x, L_y, L_z])


def energy_function(I, ω):
    """
    Calculates the energy of a rotating rigid body
    @param I: Moment of inertia of the rigid body
    @param ω: Rotation-vector
    @return: The calculated kinetic energy
    """
    L = torque_L(I, ω)
    K = (1 / 2) * (np.dot(L, ω))
    return abs(K)


# Oppgave c
def calculate_moment_of_inertia_of_T():
    """
    Calculates moment of inertia of T-handle
    @return: The moment of inertia (3 x 3) - matrix
    """
    length_handle = 0.08  # 8 cm
    radius_handle = 0.01  # 1 cm

    length_cylinder = 0.04  # 4 cm
    radius_cylinder = 0.01  # 1 cm

    density = 6700  # 6.7 gram per cubic centimeters = 6700 kg/m

    volume_handle = math.pi * math.pow(radius_handle, 2) * length_handle
    mass_handle = volume_handle * density

    volume_cylinder = math.pi * math.pow(radius_cylinder, 2) * length_cylinder
    mass_cylinder = volume_cylinder * density

    I_xx = ((mass_handle * math.pow(radius_handle, 2)) / 4) + ((mass_handle * math.pow(length_handle, 2)) / 12) + (
        (mass_cylinder * math.pow(radius_cylinder, 2)) / 2)

    I_yy = (mass_handle * math.pow(radius_handle, 2)) + ((mass_cylinder * math.pow(length_cylinder, 2)) / 4) + (
        (mass_handle * math.pow(radius_handle, 2)) / 2) + (
        (mass_cylinder * math.pow(radius_cylinder, 2)) / 4) + (
        (mass_cylinder * math.pow(length_cylinder, 2)) / 12)

    I_zz = (mass_handle * math.pow(radius_handle, 2)) + ((mass_cylinder * math.pow(length_cylinder, 2)) / 4) + (
        (mass_handle * math.pow(radius_handle, 2)) / 4) + ((mass_handle * math.pow(length_handle, 2)) / 12) + (
        (mass_cylinder * math.pow(radius_cylinder, 2)) / 4) + (
        (mass_cylinder * math.pow(length_cylinder, 2)) / 12)

    return np.array([[I_xx, 0, 0],
                     [0, I_yy, 0],
                     [0, 0, I_zz]])


if __name__ == "__main__":
    print("The calculated moment of inertia of the T-handle is:")
    print(calculate_moment_of_inertia_of_T())

    print("\nTesting the exponential function from task b....")
    h = 0.001
    for i in range(10000):
        random_rotation_matrix = np.random.randint(1000, size=(1, 3))
        if not test_exponent_function(random_rotation_matrix[0], h):
            print("Test did not succeed")
            break
    print("Test did succeed")
