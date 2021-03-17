//
// Sample solution for COMP1521 lab exercises
//
// Convert string of binary digits to 16-bit signed integer

#include <stdio.h>
#include <stdint.h>
#include <string.h>
#include <assert.h>

#define N_BITS 16
#define asciiOffset 48


int16_t sixteen_in(char *bits);

int main(int argc, char *argv[]) {

    for (int arg = 1; arg < argc; arg++) {
        printf("%d\n", sixteen_in(argv[arg]));
    }

    return 0;
}

//
// given a strings of binary digits ('1' and '0')
// return corresponding signed 16 bit integer
//
int16_t sixteen_in(char *bits) {

    int counter = 0;
    int16_t number = 0;
    while (counter < N_BITS) {
        number = number << 1;
        number = number|(bits[counter] - asciiOffset);
        counter++;
    }
    
    return number;
}

