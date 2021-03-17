// COMP1521 19T3 ... lab 1
// cat4: Copy input to output

#include <stdio.h>
#include <stdlib.h>


static void copy(FILE *, FILE *);

int main(int argc, char *argv[]) {
    if (argc == 1) {
        copy (stdin, stdout);
    } else {
        int counter = 1;
        while (counter < argc) {
            FILE *input = fopen(argv[counter], "r");
            if (input == NULL) {
                printf("Can't read %s", argv[counter]);
            } else {
                copy(input, stdout);
                fclose(input);    
            }
            counter++;
        } 
    }
    
    return EXIT_SUCCESS;
}


// Copy contents of input to output, char-by-char
// Assumes both files open in appropriate mode
static void copy (FILE *input, FILE *output) {

    char *string[BUFSIZ] = {};
    int n = 0;
    
    while (n != -1) {
        n = fgets(string, BUFSIZ, input);
        if (n != -1) {
            fputs(string, output);
        }
    }
}
