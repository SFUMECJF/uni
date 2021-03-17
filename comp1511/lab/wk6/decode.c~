//This program will decrypt caesar text using the cipher given by the user input 
//John Dao z5258962 July 2019

#include <stdio.h>
#include <string.h>

int reorganiser(int ltr, int cipher[26]);

int main (int argc, char * argv[]) {
    int counter = 0;
    int result[1000] = {};
    int proceed = 1;
    int ltr;
    int printCtr = 0;
    while (proceed != -1) {
        proceed = getchar();
        ltr = proceed;
        result[counter] = reorganiser(ltr, argv);
        counter++;
    }

    while (printCtr < counter) {
        putchar(result[printCtr]);
        printCtr++;
    }
    return 0;
}

int reorganiser(int ltr, int cipher[26]) {
    int newLtr = 0; 
    int shifted = 0;
    
    
    if (ltr >= 'a' && ltr <= 'z') {
        shifted = ltr - 'a';
    } else if (ltr >= 'A' && ltr <'Z') {
        shifted = ltr - 'A';
    }
    if (ltr >= 'a' && ltr <= 'z') {
        newLtr = cipher[shifted];
    } else if (ltr >= 'A' && ltr <'Z') {
        newLtr = cipher[shifted] + 32 ;
    } else {
        newLtr = ltr;
    }
    
    
    return newLtr;
}

