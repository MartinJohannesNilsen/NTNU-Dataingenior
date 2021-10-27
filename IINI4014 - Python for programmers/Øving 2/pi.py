import math

"""
Archimedes metode går ut på kunnskapen man har om sirkler og hexagon.
I en sirkel er omkretsen mellom 3 og 4 ganger diameteren, forestill deg f.eks et kvadrat med sider = diameteren.
Så satte han et hexagon (6 trekanter) i midten og ser at 6 sider, tilnærmet omkrets, delt på 2 som tilsier diagonalen, blir 3.
Jo flere trekanter i hexagonen jo mer nøyaktig, bruker pytagoras ettersom man kjenner hypotenus og en katet som alltid lik diagonalen
Fulgte MathWithoutBorder's metode: https://www.youtube.com/watch?v=_rJdkhlWZVQ&pbjreload=10

NB! Var litt usikker angående om man måtte lage et iteratorobjekt og bruke __iter__() og __next__(), men en for-loop i python gjør det for deg, så tenkte det holdt
"""


def __main__(iterasjoner):
    print('Kjører Archimedes metode med {} iterasjoner:'.format(iterasjoner))
    for x in archimedes(iterasjoner):
        print(x)


def archimedesEquation(number):
    return number * math.sin(math.radians(180)/number)


def archimedes(iterations):
    # initialize start value for each variable
    numberOfSides = 6
    lengthOfSide = 1
    sideDiv2 = lengthOfSide/2
    a = math.sqrt(1-(sideDiv2**2))
    b = 1-a
    newSide = math.sqrt((b**2)+(sideDiv2**2))
    perimeter = numberOfSides * lengthOfSide
    perimeterDivDiameter = perimeter / 2
    pi = [f"0: {perimeterDivDiameter}"]

    # Iterates x times, where x is equal to the variable 'iterations'
    # Uses enumerate for adding a index to the object
    for i, x in enumerate(range(iterations)):
        numberOfSides *= 2
        lengthOfSide = newSide
        sideDiv2 = lengthOfSide/2
        a = math.sqrt(1-(sideDiv2**2))
        b = 1-a
        newSide = math.sqrt((b**2)+(sideDiv2**2))
        perimeter = numberOfSides * lengthOfSide
        perimeterDivDiameter = perimeter / 2
        pi.append(f"{i+1}: {perimeterDivDiameter}")
    return pi


__main__(100)
