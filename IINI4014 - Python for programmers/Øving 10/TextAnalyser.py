"""In this class I will create an analyzing tool for text analysis. 
I could have created only a script, but since we will need a histogram throughout the script I think this is better embeded as a class"""
import os
from nltk import RegexpTokenizer, collections, data
sent_detector = data.load(os.path.join(os.path.dirname(__file__), './data/punkt/PY3/english.pickle'))


class TextAnalyser:
    """Class for analysing a given text using a referencetext"""

    def __init__(self, relativePathToHistogram):
        self.createHistogram(relativePathToHistogram)

    def createHistogram(self, relativePathToHistogram):
        """
        Creates the Histogram for comparing later on

        The dictionary is stored in the self.histogram-parameter, with
        all the words in the referencetext and the associated number of occurences.
        The dictionary also includes one key called "totalWordsInFile" in which has the total count
        """
        self.histogram = collections.defaultdict(int)
        count = 0
        # Use one double for-loop for efficiency reasons
        with open(os.path.join(os.path.dirname(__file__), relativePathToHistogram), mode='r', encoding='utf-8-sig') as file:
            for sentence in file.read().splitlines():
                # Removes non-words, and splits hyphenated words using nltk
                for word in RegexpTokenizer(r'\w+').tokenize(sentence):
                    self.histogram[word.lower()] += 1
                    count += 1
        self.histogram['totalWordsInFile'] = count

    def analyze(self, relativePathToFile):
        """
        Analyzes the text using the NLTK package

        Returns a dictionary including the following keys:

            - Average sentence length in words
            - Percentage of easy words
            - Percentage of difficult words
            - Percentage of unique words
            - Average paragraph length in sentences
        """
        self.words = self.easyWords = self.difficultWords = self.sentences = self.paragraphs = 0
        self.uniqueWords = list()
        pathToFile = os.path.join(os.path.dirname(__file__), relativePathToFile)
        self.fileName = os.path.splitext(relativePathToFile)[0].split('/')[-1]

        with open(pathToFile, mode='r', encoding='utf-8-sig') as file:
            # Uses NLTK for splitting into sentences with trained model
            for sentence in sent_detector.tokenize(file.read()):
                self.sentences += 1
                if '\n\n' in sentence:
                    self.paragraphs += 1
                # Removes non-words, and splits hyphenated words using nltk
                for word in RegexpTokenizer(r'\w+').tokenize(sentence):
                    self.words += 1
                    self.appendUniqueWords(word)
                    if self.isEasyWord(word):
                        self.easyWords += 1
                    elif self.isDifficultWord(word):
                        self.difficultWords += 1
            # As we reach the end of the file, we add a paragraph as the last line(s) also are a paragraph
            self.paragraphs += 1

        result = {
            'Average sentence length in words': self.words/self.sentences,
            'Percentage of easy words': (self.easyWords*100)/self.words,
            'Percentage of difficult words': (self.difficultWords*100)/self.words,
            'Percentage of unique words': (len(self.uniqueWords)*100)/self.words,
            'Average paragraph length in sentences': self.sentences/self.paragraphs
        }

        return result

    def appendUniqueWords(self, word):
        if word.lower() not in self.uniqueWords:
            self.uniqueWords.append(word)

    def isEasyWord(self, word, tolerance=1/100):
        """If word has an occurency of higher than than 1/100 it is considered an easy word by the standard tolerance"""
        if self.histogram[word.lower()] >= self.histogram['totalWordsInFile']*tolerance:
            return True
        return False

    def isDifficultWord(self, word, tolerance=1/1000):  # 1/10000
        """If word has an occurency of lower than 1/1000 it is considered a difficult word by the standard tolerance"""
        if self.histogram[word.lower()] <= self.histogram['totalWordsInFile']*tolerance:
            return True
        return False


if __name__ == '__main__':
    referenceFile = "./Books/The Adventures of Tom Sauer.txt"
    analyzeFile = "./Books/the Metamorphosis.txt"
    TA = TextAnalyser(referenceFile)
    result = TA.analyze(analyzeFile)
    print(f'Analyzing "{TA.fileName}":')
    for value in result:
        print(f'{value} is {"%.1f" % (result[value])}')

    """
    Disclaimer: 
    It is a fairly large inaccuracy in the calculations done; as for example
    - '\n\n' is the only way I think I can try to determine a paragraph, 
        tried implementing nltk.corpus but was way to cumbersome to work with.
        I also tried using '\n' but this gave me an average of 1.2, which is even worse.
    - I have set my tolerances for easy and difficult words by myself, 
        I have no clue whether these tolerances are the most precise ones
    - I use sentencesplitting with nltk's own methods based on an unsupervised
        algorithm.
    """
