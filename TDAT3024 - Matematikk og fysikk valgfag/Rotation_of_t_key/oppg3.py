import numpy as np
import test_utils
from oppg1 import exponent_function


def run_steps(h, X_0, I, L, interval, method_for_ω_i, method_for_W_i):
    """
    This method run the steps for Euler with a given method for calculating ω_i and W_i, as this is what differentiates method (24) and (25)
    @param h: Step-size
    @param X_0: Initial condition
    @param I: Moment of inertia
    @param L: Torque
    @param interval:
    @param method_for_ω_i: Calculates the ω
    @param method_for_W_i: Calculates the W
    @return: An approximation of the positions for any given time in the interval
    """
    W_i = []
    t_i = []
    n_steps = int(interval[1] / h) + 1
    for i in range(interval[0], n_steps):
        t_i.append(i * h)

        if i == 0:
            W_i.append(X_0)
        else:
            ω_i = method_for_ω_i(I, W_i[i - 1], L)
            Ω = np.array([[0, -ω_i[2], ω_i[1]],
                          [ω_i[2], 0, -ω_i[0]],
                          [-ω_i[1], ω_i[0], 0]])
            W_i.append(method_for_W_i(W_i, i, h, Ω))
    return W_i, t_i


def Euler(h, X_0, I, L, interval=[0, 1]):
    """
    Calculates the given differential equation on matrix-form using the Euler method

    @param h: step-size
    @param X_0: Initial condition
    @param I: Moment of inertia
    @param L: Torque
    @param interval: Interval
    @return: An approximation of the positions for any given time in the interval and the steps
    """

    def calculate_ω_i(I, W_i, L):
        "Calculates ω_i as this gives us the components of Ω, based on the fact that ω_i = [ω_x ω_y ω_z]^T"
        return np.dot(np.linalg.inv(np.dot(W_i, I)), L)

    def calculate_W_i(W_i, i, h, Ω):
        return W_i[i - 1] + np.dot(h, W_i[i - 1] @ Ω)

    W_i, t_i = run_steps(h, X_0, I, L, interval, calculate_ω_i, calculate_W_i)

    return W_i, t_i


def Euler_improved(h, X_0, I, L, interval=[0, 1]):
    """
    Calculates the given differential equation on matrix-form using the Euler method, and fixing the weakness of Euler_formula_24 that W is not ortogonal"

    @param h: step-size
    @param X_0: Initial condition
    @param I: Moment of inertia
    @param L: Torque
    @param interval: Interval
    @return: An approximation of the positions for any given time in the interval and the steps
    """

    def calculate_ω_i(I, W_i, L):
        "Calculates ω_i as this gives us the components of Ω, based on the fact that ω_i = [ω_x ω_y ω_z]^T"
        I_inv = np.linalg.inv(I)
        W_trans = np.transpose(W_i)
        return np.dot(np.dot(I_inv, W_trans), L)

    def calculate_W_i(W_i, i, h, Ω):
        return W_i[i - 1] @ exponent_function(h=h, Ω=Ω)

    W_i, t_i = run_steps(h, X_0, I, L, interval, calculate_ω_i, calculate_W_i)

    return W_i, t_i


if __name__ == '__main__':
    h = 0.1
    interval = [0, 1]
    L = np.array([1, 0, 0])
    X_0 = I = np.eye(3)

    res0, t_i0 = Euler(X_0=X_0, I=I, L=L, h=h, interval=interval)
    res1, t_i1 = Euler_improved(X_0=X_0, I=I, L=L, h=h, interval=interval)

    test_utils.print_table(t_i1, [res0, res1], ['Euler (24)', 'Euler (25)'])

    # Plot the change of global truncation error in (24) and (25)
    # err0 = test_utils.test_vals_on_sphere(res0, t_i0, h, interval, "Euler (24)")
    # err1 = test_utils.test_vals_on_sphere(res1, t_i1, h, interval, "Euler (25)")

    # test_utils.plot_error_graph(interval, h, err0, f"Error for Euler (24) with h={h}")
    # test_utils.plot_error_graph(interval, h, err1, f"Error for Euler (25) with h={h}")

    # Plot the difference between the two implementations
    # test_utils.plot_error_graph(interval, h, abs(np.subtract(err0, err1)), f"Euler (24) error - Euler (25) error with h={h}")
