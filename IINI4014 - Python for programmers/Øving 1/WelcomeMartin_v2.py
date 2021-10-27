class helloWorld:
    def __init__(self):
        self.inputFromUser = input('Hva heter du?')

    def findInitials_v1(self):
        arrayOfNameComponents = self.inputFromUser.split()
        self.initials = map(lambda x: x[0].upper(), arrayOfNameComponents)
        return list(self.initials)

    def findInitials_v2(self):
        self.initials = ''.join(
            map(lambda x: (x[0].upper()), self.inputFromUser.split()))
        return self.initials

    def findFirstName(self):
        self.firstName = self.inputFromUser.split()[0]

    def printmsg(self):
        self.findFirstName()
        print(f'Hello there {self.firstName}')


h = helloWorld()
print(h.findInitials_v2())
h.printmsg()
