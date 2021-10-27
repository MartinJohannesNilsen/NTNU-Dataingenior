import numpy as np
from numpy import linalg as lin
from oppg1 import torque_L, exponent_function
import test_utils


def find_Σ(σ):
    # Separating components
    x = σ[0]
    y = σ[1]
    z = σ[2]

    Σ = np.array(
        [[0, -z, y],
         [z, 0, -x],
         [-y, x, 0]]
    )
    return Σ


# RK4
def step(I_inv, W, L, h):  # Method calculating one step of RK4
    """
    Calculates one step of Runge-Kutta 4
    @param I_inv: The inverse of moment of inertia
    @param W: Approximation of that step
    @param L: Torque
    @param h: step size
    @return: The next approximation
    """
    W_trans = np.transpose(W)

    σ_1 = np.dot(np.dot(I_inv, W_trans), L)

    Σ_1 = find_Σ(σ_1)
    σ_2 = np.dot(
        np.dot(np.dot(I_inv, exponent_function((-h / 2), Σ_1)), W_trans), L)

    Σ_2 = find_Σ(σ_2)
    σ_3 = np.dot(
        np.dot(np.dot(I_inv, exponent_function((-h / 2), Σ_2)), W_trans), L)

    Σ_3 = find_Σ(σ_3)
    σ_4 = np.dot(
        np.dot(np.dot(I_inv, exponent_function(-h, Σ_3)), W_trans), L)

    Σ_4 = find_Σ(σ_4)
    W_next = np.dot(W, exponent_function(
        h / 6, (Σ_1 + (2 * Σ_2) + (2 * Σ_3) + Σ_4)))

    return W_next


def RK4(W_init, I, h, interval, ω):
    """
    Implementation of RK4 
    @param W_init: 
    @param I: moment of inertia matrix
    @param h: step size
    @param interval: 1x2 matrix containing start- and endpoint of sampling
    @param ω: matrix containing the angular velocity for each axis x,y,z
    @return: An approximation of the positions for any given time in the interval and the steps
    """

    I_inverse = lin.inv(I)
    n_steps = (interval[1] - interval[0]) / h
    L = torque_L(I, ω)
    W_values = [W_init]
    t_values = [interval[0]]

    for i in range(int(n_steps)):
        W_values.append(step(I_inverse, W_values[-1], L, h))
        t_values.append(t_values[-1] + h)

    return W_values, t_values


if __name__ == "__main__":
    X_0 = I = np.eye(3)
    h = 0.001
    interval = [0, 1]
    ω = [1, 0, 0]
    approximations_RK4, t_i = RK4(X_0, I, h, interval, ω)
    err = test_utils.test_vals_on_sphere(approximations_RK4, t_i, h, interval, "RK4")
    test_utils.plot_error_graph(interval, h, err, "Feil for RK4 med h=0.001")
