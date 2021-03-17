// How long is a (piece of) string?
// Created by
//  ... (z5258962)
//  ... (z0000000)
// Created on 2017-08-??
// Tutor's name (dayHH-lab)

#include <assert.h>
#include <stdio.h>

int string_length(char *string);

int main(int argc, char *argv[]) {

    // Some simple assert-based tests.
    // You probably want to write some more.
    assert(string_length("") == 0);
    assert(string_length("!") == 1);
    assert(string_length("Hello, world!") == 13);
    assert(string_length("17... seventeen.\n") == 17);

    printf("All tests passed.  You are awesome!\n");

    return 0;
}

// Takes a string and finds its length, excluding the null-terminator.
int string_length(char *string) {
    int length = 0;
    int checker = string[0];
    int counter = 1;
    while (checker != '\0') {
        checker = string[counter];
        length++;
        counter++;
    }
    return length;
}
