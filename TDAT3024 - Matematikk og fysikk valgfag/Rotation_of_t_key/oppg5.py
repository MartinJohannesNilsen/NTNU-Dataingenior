import numpy as np
from oppg4 import RK4
from oppg4_fehlberg import RKF45
from oppg1 import calculate_moment_of_inertia_of_T


def solve_with_RK4(ω, h, interval):
    X_0 = np.identity(3, dtype=float)
    moment_of_inertia = calculate_moment_of_inertia_of_T()
    W_values, t_values = RK4(X_0, moment_of_inertia, h, interval, ω)
    return W_values, t_values


def solve_with_RK45(ω, h, interval):
    X_0 = np.identity(3, dtype=float)
    moment_of_inertia = calculate_moment_of_inertia_of_T()
    tol = 10 ** (-6)
    a_W, _ = RKF45(X_0, moment_of_inertia, h, interval, ω, tol)
