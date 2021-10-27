from oppgave2 import create_matrix
import numpy as np
import math
import matplotlib.pyplot as plt
from constants import L, w, d, g, E, I, beam_weight
np.set_printoptions(precision=16)

if __name__ == "__main__":
    #antall intervaller
    n = 10.0

    #Oppretter A-matrisen
    A = create_matrix(int(n))

    #Lengden på et segment gitt n
    h = L / n

    factor = math.pow(h, 4) / (E * I)

    b_matrix = np.zeros(int(n))
    #Setter inn verdier til b-matrisen (kraft per segment)
    for i in range(0, int(n)):
        b_matrix[i] = beam_weight * factor

    #Løser likningssystemet
    print("Løsning av likningssystemet: ")
    answer = np.linalg.solve(A, b_matrix)
    newTab = [0]
    for i in range(0, 10):
        newTab.append(answer[i])
        print(answer[i])



    # Showing the graph
    plt.plot([0.0, 0.2, 0.4, 0.6, 0.8, 1.0, 1.2, 1.4, 1.6, 1.8, 2.0], newTab, linestyle='-', marker='.', color='b')
    plt.ylabel('Vertikal forskyvning i meter')
    plt.xlabel('Steglengde h i meter')
    plt.show()
