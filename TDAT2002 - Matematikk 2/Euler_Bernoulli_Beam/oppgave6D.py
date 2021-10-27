import math
from oppgave2 import create_matrix
import numpy as np
import matplotlib.pyplot as plot
from scipy import inf
from scipy.linalg import solve, inv, norm
from constants import w, d, E, I, L, beam_weight, p, g, sinus_force, exact_solution

e_mach = np.finfo(float).eps
y_exact = exact_solution(L)
y_numericalAtL = np.empty([11, 1], dtype=float)
n_values = np.empty([11, 1], dtype=int)
errorAtL = np.empty([11, 1], dtype=float)
theoreticalError = np.empty([11, 1], dtype=float)
condXEmach = np.empty([11, 1], dtype=float)


k = 1
while k <= 11:
    n = 10 * (2 ** k)
    A = create_matrix(n)
    b = np.ones(n)

    n_values[k - 1] = n

    h = L / n  # Lengden paa intervallet h er gitt ved lengden paa bjelken delt paa antall intervaller
    theoreticalError[k - 1] = (L ** 2) / (n ** 2) # Teoretisk feil gitt ved h^2 = L^2/n^2

    factor = h ** 4 / (E * I)

    for i in range(n):
        b[i] = (sinus_force(h * (i + 1)) + beam_weight) * factor  # Kraftmatrisen paa hoeyre side av likningen Ax = b.

    y_numerical = solve(A, b)
    errorAtL[k - 1] = abs(y_numerical[n - 1] - y_exact)

    conditionNumber = norm(A, inf) * norm(inv(A), inf)  # Finner kondisjonstallet
    condXEmach[k - 1] = conditionNumber * e_mach  # Legger saa til kondisjonstall * maskin epsilon til i tabellen

    k += 1

ax = plot.subplot()
ax.loglog(n_values, errorAtL)
ax.loglog(n_values, condXEmach)
ax.loglog(n_values, theoreticalError)
ax.set(xlabel="log(n)", ylabel="log(Feil ved x=L) vs. cond*emach vs. h^2")
plot.show()