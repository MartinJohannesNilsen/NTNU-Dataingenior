import numpy as np
import math


def exact_solution(t):
    """
    Calculates the position of the components at given time t
    @param t: time
    @return: The exact solution X given the time t
    """
    X = np.array([
        [1, 0, 0],
        [0, math.cos(t), -(math.sin(t))],
        [0, math.sin(t), math.cos(t)]
    ])
    return X
