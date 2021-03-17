// Print out characters in lower case.
// Created by
//  ... (z5258962)
//  ... (z0000000)
// Created on August 2019
// Tutor's name (dayHH-lab)

#include <stdio.h>

int lowercase(int c);

// DO NOT CHANGE THIS MAIN FUNCTION
int main(int argc, char *argv[]) {

    // Scan in the first character.
    int c = getchar();

    // Loop until there are no more characters to scan.
    while (c != EOF) {
        // Print the character, in lowercase.
        putchar(lowercase(c));

        // Get the next character.
        c = getchar();
    }

    return 0;
}

// Returns the specified character `c`, in lowercase.
int lowercase(int c) {
    int result = c;
    if (c >= 'A' && c <= 'Z') {
        int difference = c - 'A';
        result = difference + 'a';
    }
    return result;
}
