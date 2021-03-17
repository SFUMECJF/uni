//This program will read a character from its input and write the characters
//tto its output encrypted with a Caesar cipher
//John Dao z5258962 July 2019

#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <math.h>
int caesar_shift (int shift, int ltr);

int main (int argc, char * argv[]) {
    int proceed = 1;
    int ltr;
    int new_ltr;
    int shift = atoi(argv[1]);
    printf("%d\n", shift);
    while (proceed == 1) {
        ltr = getchar();
        new_ltr = caesar_shift(shift, ltr);
        if (new_ltr != -1) {
            putchar(new_ltr);
        } else {
            proceed = 0;
        }   
    }
        
    return 0;
}

int caesar_shift (int shift, int ltr) {
    int new_ltr;
    int corrected_shift = 0;
    
    corrected_shift = shift;
    
    if (corrected_shift < 0) {
        corrected_shift = abs(shift);
        corrected_shift = 26 - (corrected_shift % 26);
    } else if (corrected_shift > 26) {
        corrected_shift = corrected_shift % 26;
    }
    
    if (ltr >= 'a' && ltr <= 'z') {
        new_ltr = (ltr + corrected_shift);
        if (new_ltr > 'z') {
            new_ltr = new_ltr - 26;
        }
    } else if (ltr >= 'A' && ltr <= 'Z') {
        new_ltr = (ltr + corrected_shift);
        if (new_ltr > 'Z') {
            new_ltr = new_ltr - 26;
        }
    } else {
        new_ltr = ltr;
    }
     
    
    return new_ltr;
}
