from operator import index
import numpy as np
import matplotlib.pyplot as plt
from tabulate import tabulate
from oppg2 import exact_solution


def exact(interval, h):
    """
    Calculates the exact solutions
    @param interval:
    @param h: step size
    @return: a list of the exact solutions
    """
    arr = np.linspace(interval[0], interval[1], int(
        (interval[1] - interval[0]) / h + 1))
    result = []
    for a in arr:
        result.append(exact_solution(a))

    return result


def test_vals_on_sphere(method_result, t_i, h, interval, method_name):
    """
    Testing numeric method on special case of object being a sphere.
    @param method_result: Matrix containing the resulting values from a given numeric method
    @param t_i: t for given step
    @param h: Step size
    @param interval: 2x1 array containing the start and end for the desired interval
    @param method_name: String containing name of the method used. Just a QOL variable to help setting the title of the graphs easily.
    @return: a list of the errors
    """

    error = []
    exact_list = exact(interval, h)
    num_of_steps = np.linspace(0, 1, int((interval[1] - interval[0]) / h)).size + 1
    for i in range(num_of_steps):
        error.append(abs(method_result[i] - exact_list[i]))

    # print_table(t_i, lists_of_W=[error], headers_for_W=[method_name])

    return error


def plot_error_graph(interval, h, error, title):
    x_11 = []
    x_12 = []
    x_13 = []
    y_21 = []
    y_22 = []
    y_23 = []
    z_31 = []
    z_32 = []
    z_33 = []
    for i in range(int(((interval[1] - interval[0]) / h) + 1)):
        x_11.append(error[i][0][0])
        x_12.append(error[i][0][1])
        x_13.append(error[i][0][2])
        y_21.append(error[i][1][0])
        y_22.append(error[i][1][1])
        y_23.append(error[i][1][2])
        z_31.append(error[i][2][0])
        z_32.append(error[i][2][1])
        z_33.append(error[i][2][2])

    fig, axs = plt.subplots(3, 3)
    plt.subplots_adjust(top=0.88, bottom=0.1, hspace=0.55, wspace=0.45)
    fig.suptitle(f"{title}", fontsize=16)
    axs[0, 0].plot(x_11, 'tab:red')
    axs[0, 1].plot(x_12, 'tab:blue')
    axs[0, 2].plot(x_13, 'tab:green')
    axs[1, 0].plot(y_21, 'tab:red')
    axs[1, 1].plot(y_22, 'tab:blue')
    axs[1, 2].plot(y_23, 'tab:green')
    axs[2, 0].plot(z_31, 'tab:red')
    axs[2, 1].plot(z_32, 'tab:blue')
    axs[2, 2].plot(z_33, 'tab:green')

    plt.show()


def print_table(t_values, lists_of_W, headers_for_W):
    assert len({len(i) for i in lists_of_W}
               ) == 1, "The lists are not the same length, use the same h and interval!"
    tableArray = []
    for i, W_i in enumerate(zip(*lists_of_W)):
        row = []
        row.append(i)
        row.append(t_values[i])
        for x in W_i:
            row.append(x)
        tableArray.append(row)
    headers = ['i', 't_i']
    for x in headers_for_W:
        headers.append(x)
    print(tabulate(tableArray, headers=headers))

    """
    with open('./print.txt', 'w+') as f:
        f.write(tabulate(tableArray, headers=headers))
    """
