import numpy as np
from scipy.sparse import spdiags, lil_matrix, csr_matrix, csc_matrix, coo_matrix


def print_matrix(a, n):
    matrix = ""
    for i in range(0, n):
        line = ""
        for j in range(0, n):
            line += str(a[i][j]) + ", "
        line += "\n"
        matrix += line

    print(matrix)


def create_matrix(n):
    e = np.ones(n)
    A = spdiags([e, -4.0 * e, 6.0 * e, -4.0 * e, e], [-2.0, -1.0, 0.0, 1.0, 2.0], n, n)

    A = A.toarray()
    # Setter inn tall i forste rad
    for i in range(0, 4):
        A[0, i] = [16.0, -9.0, (8.0 / 3.0), (-1.0 / 4.0)][i]

    # Setter inn tall i rad n-1
    array1 = [(16.0 / 17.0), (-60.0 / 17.0), (72.0 / 17.0), (-28.0 / 17.0)]
    for i in range(n - 4, n):
        A[n - 2][i] = array1[0]
        array1.pop(0)

    # Setter tall inn i rad n
    array2 = [-12.0 / 17.0, 96.0 / 17.0, -156.0 / 17.0, 72.0 / 17.0]
    for i in range(n - 4, n):
        A[n - 1][i] = array2[0]
        array2.pop(0)

    return A


if __name__ == "__main__":
    print("Lager strukturmatrisen med n = 10")
    print_matrix(create_matrix(10), 10)

