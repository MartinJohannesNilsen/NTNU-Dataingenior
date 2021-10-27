import json


def getwordfreqs(filename):
    dictionary = dict()
    with open(filename) as file:
        # This removes all the special characters and splits all the words into a list
        content = file.read().translate(dict.fromkeys(map(ord, u",!.;?:"))).split()
    for word in content:
        if word not in dictionary.keys():
            dictionary[word] = 1
        else:
            dictionary[word] += 1
    print(f"The dictionary consists of {len(dictionary)} words")
    return dictionary


def getwordsline(filename, keyword, exact):
    # The attribute 'exact' is a bool for checking either if the word have to be exactly the same, or a sub-part of the string
    listOfWords = list()
    with open(filename) as file:
        # This removes all the special characters and splits all the lines into a list
        content = file.read().translate(dict.fromkeys(map(ord, u",!.;?:"))).splitlines()
    for i, row in enumerate(content, start=1):
        if(not exact and row.count(keyword) != 0):
            listOfWords.append(i)
        if(exact and row.split().count(keyword) != 0):
            listOfWords.append(i)
    print(
        f"The {'exact ' if exact else ''}word '{keyword}' was found in {len(listOfWords)} rows")
    return listOfWords


def main():
    filename = "Øvinger/Øving 5/ebook.txt"
    word = "The"

    # getwordfreqs(filename)
    #getwordsline(filename, word)
    printDictionaryToFile(getwordfreqs(filename))
    printListToFile(getwordsline(filename, word, True))


def printDictionaryToFile(dictionary):
    with open("Øvinger/Øving 5/results/dict.txt", "w") as file:
        print(dictionary, file=file)


def printListToFile(listOfWords):
    with open("Øvinger/Øving 5/results/list.txt", "w") as file:
        print(listOfWords, file=file)


if __name__ == "__main__":
    main()
