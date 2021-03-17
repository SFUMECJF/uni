// COMP1521 19T3 ... lab 1
// cat1: Copy input to output

#include <stdio.h>
#include <stdlib.h>

static void copy(FILE *, FILE *);

int main(void) {
    copy (stdin, stdout);
    return EXIT_SUCCESS;
}

// Copy contents of input to output, char-by-char
// Assumes both files open in appropriate mode
static void copy (FILE *input, FILE *output) {
    char one;
    int n = 0;
    
    while (n != -1) {
        n = fscanf(input, "%c", &one);
        if (n != -1) {
            fprintf(output, "%c", one);
        }
    }
}
