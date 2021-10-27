import matplotlib.pyplot as plt
import numpy as np
from oppg5 import solve_with_RK4


def plot_components_with_RK4(ω):
    h = 0.005
    interval = [0, 100]
    result_RK4, t_values_RK4 = solve_with_RK4(ω, h, interval)

    x00 = []
    x01 = []
    x02 = []
    x10 = []
    x11 = []
    x12 = []
    x20 = []
    x21 = []
    x22 = []

    # We split up our result matrix into 9 sub-matrices in order to plot every component:
    for i in range(int((interval[1]-interval[0]) / h)):
        x00.append(result_RK4[i][0][0])
        x01.append(result_RK4[i][0][1])
        x02.append(result_RK4[i][0][2])
        x10.append(result_RK4[i][1][0])
        x11.append(result_RK4[i][1][1])
        x12.append(result_RK4[i][1][2])
        x20.append(result_RK4[i][2][0])
        x21.append(result_RK4[i][2][1])
        x22.append(result_RK4[i][2][2])

    # We plot our sub-matrices colour-coded in reference to vectors i,j,k in matrix X
    fig, axs = plt.subplots(3, 3)
    axs[0, 0].plot(x00, 'tab:red')
    axs[0, 0].set_title('Component X(0,0)')
    axs[0, 1].plot(x01, 'tab:blue')
    axs[0, 1].set_title('Component X(0,1)')
    axs[0, 2].plot(x02, 'tab:green')
    axs[0, 2].set_title('Component X(0,2)')
    axs[1, 0].plot(x10, 'tab:red')
    axs[1, 0].set_title('Component X(1,0)')
    axs[1, 1].plot(x11, 'tab:blue')
    axs[1, 1].set_title('Component X(1,1)')
    axs[1, 2].plot(x12, 'tab:green')
    axs[1, 2].set_title('Component X(1,2)')
    axs[2, 0].plot(x20, 'tab:red')
    axs[2, 0].set_title('Component X(2,0)')
    axs[2, 1].plot(x21, 'tab:blue')
    axs[2, 1].set_title('Component X(2,1)')
    axs[2, 2].plot(x22, 'tab:green')
    axs[2, 2].set_title('Component X(2,2)')

    plt.show()


if __name__ == "__main__":
    a = np.array([1, 0.05, 0])
    b = np.array([0, 1, 0.05])
    c = np.array([0.05, 0, 1])

    plot_components_with_RK4(a)
    plot_components_with_RK4(b)
    plot_components_with_RK4(c)
