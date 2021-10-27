import math
from sympy import *
from oppgave2 import create_matrix
from constants import w, d, L, g, E, I, beam_weight

import numpy as np

np.set_printoptions(precision=16)

A = create_matrix(10)
h = L / 10

correct_solution = lambda x: (beam_weight / (24.0 * E * I)) * math.pow(x, 2) * (math.pow(x, 2) - 4.0 * L * x + 6.0 * math.pow(L, 2))

b_matrix = []
for i in range(10):
    b_matrix.append(beam_weight)

# Oppgave C)
# Initialiserer y-vektorene vi kommer til å bruke
vector_y = []
vector_y_2 = []
i = 0.2
while i <= 2:
    vector_y.append(correct_solution(i))
    i = i + 0.2

factor = beam_weight / (E * I)

for i in range(10):
    vector_y_2.append(factor)

first_part = np.array(((1 / (math.pow(h, 4))) * A))
vector_y = np.array(vector_y)
vector_y_2 = np.array(vector_y_2)

numerisk_fjerde_deriverte = first_part.dot(vector_y)

# Oppgave d)
err = vector_y_2 - numerisk_fjerde_deriverte

foroverfeil = np.linalg.norm(err, np.inf)
relativt_foroverfeil = np.linalg.norm(err, np.inf) / np.linalg.norm(vector_y_2, np.inf)
# Maskin-epsilon
relativ_bakoverfeil = math.pow(2, (-52))
feilforstorring = relativt_foroverfeil / relativ_bakoverfeil
kondisjonstall_A = np.linalg.cond(A, np.inf)

# Printer ut dataen
print("Numerisk fjerdederiverte:")
for i in range(len(numerisk_fjerde_deriverte)):
    print(numerisk_fjerde_deriverte[i])
print("---------------------------")
print("Foroverfeil:")
print(str(foroverfeil))
print("---------------------------")
print("Relativ foroverfeil: ")
print(str(relativt_foroverfeil))
print("---------------------------")
print("Feilforstørringsfeil:")
print(str(feilforstorring))
print("---------------------------")
print("Kondisjonstallet til A: ")
print(str(kondisjonstall_A))
