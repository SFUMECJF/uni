//This program will echo the user's character input
//John Dao z5258962 August 2019

#include <stdio.h>
#include <string.h>

#define MAX_CHARACTER_LENGTH 999
int main (void) {
    char output[MAX_CHARACTER_LENGTH] = {};
    int counter = 0;
    char checker = 0;
    int printer = 0;
    while (checker != EOF) {
        output[counter] = getchar();
        checker = output[counter];
        counter++;
    }
    
    while (printer < counter - 1) {
        putchar(output[printer]);
        printer++;
    }
    
}
