# Given a 2 input strings, will attempt to discover a similar ending
# will keep adding spaces until there is a match larger than 5 and will only print matche larger than 2
# assumes sha will always be 64 chars long
from hashlib import sha256
import time

# Compares 2 hashes and returns number of matching at the end
def checkMatching(hash1, hash2):
    counter = 63
    matches = 0
    while True:
        # characters match
        if (hash1[counter] == hash2[counter]):
            matches += 1
            counter -= 1
        # dont match
        else :
            break

    return matches


def main(concat, minimum):
    last = 63
    start = time.time()
    file1 = open('confession_real.txt', 'r').read()
    file2 = open('confession_fake.txt', 'r').read()
    hash1 = sha256(file1.encode()).hexdigest()
    counter = 0
    while True:
        hash2 = sha256((file2 + (concat * counter)).encode()).hexdigest()
        if ((hash2[last] == hash1[last]) and (hash2[last - 1] == hash1[last - 1])):
            matches = checkMatching(hash1, hash2)
            if (matches >= minimum):
                print (matches, ' matches after', round(time.time() - start, 2) ,'seconds, adding ', counter, ("'" + concat+ "' characters"))
                print('Found for hashes: \nReal: ', hash1, '\nFake: ', hash2, '\n')
        counter += 1

if __name__ == '__main__':
    print("Please enter the character to use: ")
    concat = input()
    print("Please enter the minimum number of matches (4 is recomended): ")
    minimum = input()
    print("Now Running! Exit with ctr-c\n")
    main(str(concat), int(minimum))