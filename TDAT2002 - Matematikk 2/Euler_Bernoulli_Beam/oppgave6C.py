import math
from oppgave2 import create_matrix
import numpy as np
import matplotlib.pyplot as plot
from scipy.linalg import solve
from constants import w, d, E, I, L, beam_weight, p, g, sinus_force, exact_solution


y_exact = exact_solution(L) # Eksakt loesning som den numeriske loesningen skal sammenlignes med.

# Initialiserer matrisene som skal brukes videre i oppgaven.
y_numericalAtL = np.empty([11, 1], dtype=float)
n_values = np.empty([11, 1], dtype=int)
errorAtL = np.empty([11, 1], dtype=float)

k = 1
while k <= 11:
    n = 10 * (2 ** k) # Velger n = 20480
    n_values[k - 1] = n

    h = L / n # Lengden paa intervallet h er gitt ved lengden paa bjelken delt paa antall intervaller
    A = create_matrix(n)
    b = np.ones(n)
    factor = h ** 4 / (E * I)

    for i in range(n):
        b[i] = (sinus_force(h * (i + 1)) + beam_weight) * factor # Regner ut kraftmatrisen paa hoeyre side av likningen.

    y_numerical = solve(A, b)
    errorAtL[k - 1] = abs(y_numerical[n - 1] - y_exact)

    k += 1

# Plotter resultatene for feil ved x=L for ulike verdier av n.
ax = plot.subplot()
ax.loglog(n_values, errorAtL) # Bruker logaritmiske akser
ax.set(xlabel="log(n)", ylabel="Log(Feil ved x=L)")
plot.show()