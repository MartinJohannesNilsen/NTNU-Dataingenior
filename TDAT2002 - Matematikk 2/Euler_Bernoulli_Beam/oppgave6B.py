import math
from oppgave2 import create_matrix
import numpy as np
import matplotlib.pyplot as plot
from scipy.linalg import solve
from constants import w, d, E, I, L, beam_weight, p, g, sinus_force, exact_solution

# OPPGAVE 6B

n = 10 * (2 ** 11)  # Velger n = 20480
h = L / n  # Lengden paa intervallet h er gitt ved lengden av bjelken delt paa antall intervaller
A = create_matrix(int(n)) # Strukturmatrisen
b = np.ones(int(n))
factor = h ** 4 / (E * I) # Faktor regnet ut fra oppgave 1.

y_exact = np.empty([int(n), 1], dtype=float)
y_numerical = []

# Regner ut kraftmatrisen og den eksakte loesningen fra x=0 til x=L
for i in range(n):
    b[i] = (sinus_force(h * (i+1)) + beam_weight) * factor  # Kraftmatrisen paa hoeyre side av likningen.
    y_exact[i] = exact_solution(h * (i+1))

y_numerical = solve(A, b)

x_values = [(h * i) for i in range(n)] # Tabell med x-verdier fra x=0 til x=L for bruk i plotting

# Plotter grafen til eksakt mot numerisk loesning.
plot.plot(x_values, y_exact)
plot.plot(x_values, y_numerical)
plot.show()