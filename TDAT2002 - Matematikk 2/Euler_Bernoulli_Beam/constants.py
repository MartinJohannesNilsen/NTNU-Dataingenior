import math
#Bredden på bjelken
w = 0.3

# Tykkelsen på bjelken
d = 0.03

#Lengde på bjelken
L = 2.0

#Youngs modulus
E = 1.3e10

#Areal-momentet
I = (w*(d**3)) / 12.0

#Gravitasjonskraften
g = 9.81

#Egenmassen til bjelken
beam_weight = -480 * w * d * g

# For bruk med sinushauger. Dette er den totale vekten av hele haugen.
p = 100

#Sinus-haugen
sinus_force = lambda x: -p * g * math.sin((math.pi * x) / L)

#Eksakt løsning
exact_solution = lambda x: (beam_weight / (24 * E * I)) * (x ** 2) * ((x ** 2) - (4 * L * x) + (6 * (L ** 2))) - (
            (g * p * L) / (E * I * math.pi)) * (
                                       ((L ** 3) / (math.pi ** 3)) * math.sin((math.pi * x) / L) - ((x ** 3) / 6) + (
                                           (L * x ** 2) / 2) - (((L ** 2) * x) / (math.pi ** 2)))