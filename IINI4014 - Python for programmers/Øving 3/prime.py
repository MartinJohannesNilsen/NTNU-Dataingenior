import math
from tabulate import tabulate


def __main__(numberOfPrimes):
    print(f"Her er de første {numberOfPrimes} primtallene:")
    """ 
    for number in calculatePrimes(numberOfPrimes):
        print(number) 
    """
    primes = calculatePrimes(1000)
    print_list = []
    for index, number in enumerate(primes):
        print_list.append([f'{index+1}:', number])
    print(tabulate(print_list, headers=['Nummer', 'Primtall']))


def calculatePrimes(numberOfPrimes):
    n = 2  # This is our current number being checked
    primes = []
    # Checks incrementally until we have the amount of primes wanted
    while(len(primes) < numberOfPrimes):
        if(checkIfPrime(n)):
            primes.append(n)
        n += 1
    return primes


def checkIfPrime(n):
    x = 2
    while(x <= math.sqrt(n)):  # Checks incrementally if n is divisible with any number from 2 less or equal to square-root of n for efficiency reasons
        if(n % x == 0):
            return False
        x += 1
    return True


__main__(1000)
