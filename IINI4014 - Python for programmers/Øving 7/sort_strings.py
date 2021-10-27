# A simple program with the main purpose of sorting a list of words by size and lexicographically
from tabulate import tabulate


def generate_list_from_file(filename):
    with open(filename) as file:
        # This removes all the special characters and splits all the lines into a list
        listOfLines = file.read().translate(
            dict.fromkeys(map(ord, u",!.;?:"))).splitlines()
        ListWithoutEmptyLines = list(filter(None, listOfLines))
    return ListWithoutEmptyLines


# This method swaps two elements in a list
def swap_elements(unsorted_list, index_one, index_two):
    unsorted_list[index_one], unsorted_list[index_two] = unsorted_list[index_two], unsorted_list[index_one]
    # Old method would be to create a copy, but the code above looks so much cleaner
    """ temp = unsorted_list[index_one]
    unsorted_list[index_one] = unsorted_list[index_two]
    unsorted_list[index_two] = temp """


def bubblesort(unsorted_list):  # Standard bubblesort
    sorted_list = []
    for x in unsorted_list:
        sorted_list.append(x)
    for i in range(len(sorted_list) - 1, 0, -1):
        for j in range(i):
            if len(sorted_list[j]) > len(sorted_list[j + 1]):
                # If the first word is longer than the second, swap places
                swap_elements(sorted_list, j, (j + 1))
            elif len(sorted_list[j]) == len(sorted_list[j + 1]):
                # If the words has the same length, sort lexicographically
                if sorted_list[j] > sorted_list[j + 1]:
                    swap_elements(sorted_list, j, (j + 1))
    return sorted_list


def main():
    filename = "./Strings.txt"
    unsorted_list = generate_list_from_file(filename)
    sorted_list = bubblesort(unsorted_list)
    print(tabulate(zip(unsorted_list, sorted_list),
                   headers=["Usortert", "Sortert"]))


if __name__ == "__main__":
    main()
