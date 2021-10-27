from oppgave2 import create_matrix
import numpy as np
import math
import matplotlib.pyplot as plt
from constants import w, d, L, g, E, I, beam_weight

np.set_printoptions(precision=16)

#Den optimale verdien for n fra oppgave 6
n = 1280

A = create_matrix(n)

h = L / n

# Vekten på personen
weight_person = 50

#Lengde på foten
length_foot = 0.3

factor = math.pow(h, 4) / (E * I)

#Kraft per segment for personen
force_per_unit = g * (weight_person / length_foot)


b_matrix = beam_weight * np.ones(n)
index = n - 1


while h * index >= L - length_foot:
    b_matrix[index] = b_matrix[index] - force_per_unit
    index = index - 1

#Løser ligningssytemet
answer = np.linalg.solve(A, b_matrix * factor)

count = h
tab1 = []
while count <= 2:
    tab1.append(count)
    count += h

#Printer ut grafen
plt.plot(tab1, answer, color='b')
plt.ylabel('Vertikal forskyvning i meter')
plt.xlabel('Steglengde h i meter')
plt.show()

#Printer ut svaret på oppgaven
print(answer[-1])
