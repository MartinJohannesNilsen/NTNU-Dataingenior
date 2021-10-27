import numpy as np
from numpy import linalg as lin
from oppg1 import torque_L, exponent_function
from oppg4 import find_Σ, RK4
import test_utils


# RKF45
class scheme():
    "The butcher table for RKF45"

    def __init__(self):
        self.c = np.array([[0],
                           [1 / 4],
                           [3 / 8],
                           [12 / 13],
                           [1],
                           [1 / 2],
                           [0],
                           [0]])
        self.A = np.array([[0, 0, 0, 0, 0],
                           [1 / 4, 0, 0, 0, 0],
                           [3 / 32, 9 / 32, 0, 0, 0],
                           [1932 / 2197, -7200 / 2197, 7296 / 2197, 0, 0],
                           [439 / 216, -8, 3680 / 513, -845 / 4104, 0],
                           [-8 / 27, 2, -3544 / 2565, 1859 / 4104, -11 / 40]])
        self.B = np.array([[25 / 216, 0, 1408 / 2565, 2197 / 4104, -1 / 5, 0],
                           [16 / 135, 0, 6656 / 12825, 28561 / 56430, -9 / 50, 2 / 55]])

    def print_scheme(self):
        print(np.array([[self.c, self.A], ["", self.B]]))

    def a(self, row, column):
        return self.A[row - 1][column - 1]

    def b(self, row, column):
        return self.B[row - 1][column - 1]

    def c(self, row, column):
        return self.c[row - 1][column - 1]


def step(I, W_i, L, h):
    """
    Method calculating one step of RKF45
    @param I: Moment of inertia of rigid body
    @param W_i:
    @param L: Torque
    @param h: Step size
    @return: The next approximation
    """
    tab = scheme()
    I_inv = lin.inv(I)
    W_trans = np.transpose(W_i)

    def calculate_σ_i(I_inv, W_trans, L):
        return np.dot(np.dot(I_inv, W_trans), L)

    σ_1 = calculate_σ_i(I_inv, W_trans, L)

    Σ_1 = find_Σ(σ_1)
    σ_2 = I_inv @ exponent_function(-h, (tab.a(2, 1) * Σ_1)) @ W_trans @ L

    Σ_2 = find_Σ(σ_2)
    σ_3 = I_inv @ exponent_function(-h, ((tab.a(3, 1) * Σ_1) + (tab.a(3, 2) * Σ_2))) @ W_trans @ L

    Σ_3 = find_Σ(σ_3)
    σ_4 = I_inv @ exponent_function(-h, ((tab.a(4, 1) * Σ_1) + (tab.a(4, 2) * Σ_2) + (tab.a(4, 3) * Σ_3))) @ W_trans @ L

    Σ_4 = find_Σ(σ_4)
    σ_5 = I_inv @ exponent_function(-h, ((tab.a(5, 1) * Σ_1) + (tab.a(5, 2) * Σ_2) +
                                         (tab.a(5, 3) * Σ_3) + (tab.a(5, 4) * Σ_4))) @ W_trans @ L

    Σ_5 = find_Σ(σ_5)
    σ_6 = I_inv @ exponent_function(-h, ((tab.a(6, 1) * Σ_1) + (tab.a(6, 2) * Σ_2) + (tab.a(6, 3) * Σ_3) +
                                         (tab.a(6, 4) * Σ_4) + (tab.a(6, 5) * Σ_5))) @ W_trans @ L

    Σ_6 = find_Σ(σ_6)

    W_next = W_i @ exponent_function(h, ((tab.b(1, 1) * Σ_1) + (tab.b(1, 2) * Σ_2) + (tab.b(1, 3) * Σ_3) +
                                         (tab.b(1, 4) * Σ_4) + (tab.b(1, 5) * Σ_5) + (tab.b(1, 6) * Σ_6)))

    Z_next = W_i @ exponent_function(h, ((tab.b(2, 1) * Σ_1) + (tab.b(2, 2) * Σ_2) + (tab.b(2, 3) * Σ_3) +
                                         (tab.b(2, 4) * Σ_4) + (tab.b(2, 5) * Σ_5) + (tab.b(2, 6) * Σ_6)))

    delta_W = W_next - Z_next

    trace_product = np.transpose(delta_W) @ delta_W
    E = np.sqrt(trace_product[0][0] +
                trace_product[1][1] + trace_product[2][2])

    return W_next, Z_next, E


def in_tolerance(err_tolerance, W_next, E):
    "The relative error test for RKF45"
    return (E / lin.norm(W_next)) < err_tolerance


def run_steps(err_tolerance, I, W_i, L, h, interval):
    """
    Method calculating all the steps of RKF45 with the relative error test for each step
    @param err_tolerance:
    @param I: Moment of inertia
    @param W_i: Approximation
    @param L: Torque
    @param h: Step-size
    @param interval: 1x2 matrix containing start- and endpoint of sampling
    @return: An approximation of the positions for any given time in the interval and the steps
    """
    list_of_W = [W_i]
    list_of_t = [interval[0]]
    finished = False
    safety_factor = 0.8  # Safety factor to be conservative

    while not finished:
        W_next, Z_next, E = step(I, list_of_W[-1], L, h)
        half = False

        while not in_tolerance(err_tolerance, W_next, E):
            if not half:
                h = safety_factor * (
                        ((err_tolerance * lin.norm(W_next)) / E) ** (1 / 5)) * h  # (6.57) from Sauer, page 326
                half = True
            else:
                h = h / 2
            W_next, Z_next, E = step(I, W_next, L, h)

        list_of_W.append(Z_next)
        list_of_t.append(list_of_t[-1] + h)
        if list_of_t[-1] >= interval[1]:
            finished = True

    return list_of_W, list_of_t


def RKF45(W_init, I, h, interval, ω, err_tolerance=10 ** (-6)):
    """
    Implementation of Runge Kutta Fehlberg
    @param W_init:
    @param I: Moment of inertia
    @param h: step size
    @param interval: 1x2 matrix containing start- and endpoint of sampling
    @param ω: Matrix containing the rotation in each dimension x,y,z
    @param err_tolerance: tolerance, default 10^-6 from Sauer
    @return: An approximation of the positions for any given time in the interval and the steps
    """
    L = torque_L(I, ω)
    tol = err_tolerance

    return run_steps(tol, I, W_init, L, h, interval)


if __name__ == "__main__":
    h = 0.001
    interval = [0, 1]
    X_0 = I = np.eye(3)
    ω = [1, 0, 0]

    res0, t_i0 = run_steps(10 ** (-6), I, X_0, ω, h, interval)
    res1, t_i1 = RK4(X_0, I, h, interval, ω)

    err0 = test_utils.test_vals_on_sphere(res0, t_i0, h, interval, "RKF45")
    err1 = test_utils.test_vals_on_sphere(res1, t_i1, h, interval, "RK4")

    test_utils.plot_error_graph(interval, h, abs(np.subtract(err0, err1)), "RK4 error - RKF45 error with start-h=0.001")
