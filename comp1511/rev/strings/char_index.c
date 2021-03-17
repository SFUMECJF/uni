// Find the index of a character in a given string.
// Created by
//  ... (z5258962)
//  ... (z0000000)
// Created on August 2019
// Tutor's name (day_hH-lab)

#include <stdio.h>

#define BUFFER_LENGTH 1024
#define NOT_IN_STRING -1

void read_line(int buffer_len, char *buffer);
int char_index(int c, char *string);

// DO NOT CHANGE THIS MAIN FUNCTION
int main(int argc, char *argv[]) {
    // Declare a buffer
    char buffer[BUFFER_LENGTH] = {0};

    // Read in a line...
    printf("Enter a line: ");
    read_line(BUFFER_LENGTH, buffer);

    // Get a character
    printf("Enter a character: ");
    int ch;
    ch = getchar();

    // Find and print character index or "not in string"
    int index = char_index(ch, buffer);
    if (index == NOT_IN_STRING) {
        printf("Character '%c' is not in the string.\n", ch);
    } else {
        printf("Index of character '%c': %d\n", ch, index);
    }

    return 0;
}


// Read a line of input into `buffer`, excluding the newline;
// ensures that `buffer` is a null-terminated string.
void read_line(int buffer_len, char *buffer) {
    int counter = 0;
    int holder = 0;
    int exit = 0;
    while (counter < buffer_len && exit == 0) {
        holder = getchar();
        if (holder == '\n') {
            buffer[counter] = '\0';
            exit = 1; 
        } else if (counter == buffer_len - 1) {
            exit = 1;
            buffer[counter] = '\0';
        } else {
            buffer[counter] = holder;
            counter++;
        }
    }
}

// Return the index of the first occurrence of
// character `c` in the string, or `NOT_IN_STRING`
int char_index(int c, char *string) {
    int counter = 1;
    int result = NOT_IN_STRING;
    if (string[0] == c) {
        result = 0;
    }
    
    while (string[counter] != '\0' && result == NOT_IN_STRING) {
        if (string[counter] == c) { 
            result = counter;
        } else {
            result = NOT_IN_STRING;
        }
        counter++;
    }
    
    return result;
}
