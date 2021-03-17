// Convert a character to uppercase.
// Created by ... (z5258962)
// Created on August 2019
// Tutor's name (dayHH-lab)

#include <stdio.h>

int uppercase(int c);

// DO NOT CHANGE THIS MAIN FUNCTION
int main(int argc, char *argv[]) {

    // Get the character
    int c = getchar();

    // Loop until end of characters
    while (c != EOF) {
        // print the character in uppercase
        putchar(uppercase (c));

        // get the next character
        c = getchar();
    }

    return 0;
}
// END OF MAIN FUNCTION

int uppercase(int c) {
    int result = c;
    if (c >= 'a' && c <= 'z') {
        int difference = c - 'a';
        result = 'A' + difference;
    }

    return result; // change to your return value
}
