from oppgave2 import create_matrix
import time
import numpy as np
import math
from scipy.linalg import solve, norm, inv
from scipy import inf
from constants import w, d, L, g, E, I, beam_weight

if __name__ == "__main__":
    # Initialiserer alle matrisene som skal fylles. Her kan man ogsaa bare bruke vanlige tabeller siden disse er endimensjonale.
    condNumber = np.empty([11, 1], dtype=float)
    error = np.empty([11, 1], dtype=float)
    nVal = np.empty([11, 1], dtype=int)
    # Eksakt løsning
    actualY = (beam_weight / (24 * E * I)) * math.pow(L, 2) * (math.pow(L, 2) - (4 * L * L) + (6 * L * L))

    k = 1
    while k <= 11:
        #Antall intervaller
        n = 10 * (2 ** k)
        # Tabell som holder oversikten over benyttede n-verdier
        nVal[k - 1] = n

        h = L / n

        A = create_matrix(n)
        b = np.empty([n, 1], dtype=float)

        # Finner faktoren b-matrisen skal ganges med, lager saa b-matrisen
        factor = math.pow(h, 4) / (E * I)
        for i in range(n):
            # Legger inn kraft per segment
            b[i] = beam_weight * factor

        # Tabell med alle kondisjonstallene
        condNumber[k-1] = norm(A, inf) * norm(inv(A), inf)
        # Løser ligningssystemet
        y_n = solve(A, b)
        # Tabell med feilene
        error[k - 1] = abs(y_n[n - 1] - actualY)

        print("n: " + str(n) + "\nh: " + str(h) + "\ncond: " + str(condNumber[k-1]) + "\nactualY: " + str(
            actualY) + "\nerror: " + str(error[k - 1]) + "\n")

        k += 1

    # Print ut feil og kondisjonstall for hver n-verdi
    print("n    |   error   |   condition number")
    for i in range(len(nVal)):
        print(str(nVal[i]) + "    |" + str(error[i]) + " | " + str(condNumber[i]))