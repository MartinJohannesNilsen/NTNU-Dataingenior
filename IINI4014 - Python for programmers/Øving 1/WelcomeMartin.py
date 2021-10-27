def __main__():
    task(userInput())


def userInput():
    return input("Hva er ditt fulle navn?\n")


def task(name):
    nameArray = name.split()
    """ 
    #First function I created
    initials = ''
    for x in nameArray:
        initials += list(x)[0]
    """
    # print(''.join([(list(i)[0]) for i in nameArray])) #Oneliner
    # Oneliner with lambda
    print(''.join(map(lambda x: list(x)[0], nameArray)))

    # Print a welcome message, some different combinations of variables and strings
    firstName = nameArray[0]
    #print("Velkommen %s" % (firstName))
    #print("Velkommen {}".format(firstName))
    print(f"Velkommen {firstName}")


__main__()
