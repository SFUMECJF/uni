//Tests for individual functions

#include <stdio.h>
#include <string.h>
#include <stdlib.h>

int main(void) {
    char *six_bits;
    six_bits = malloc(sizeof(char)* 6);
    six_bits = "00000";
    int number = 0;
    int counter = 0;       
    while (counter < 5) {
        number = number << 1;
        number = number|(six_bits[counter] - 48);
        counter++; 
    }
    printf("%d", number);
    return number;
}