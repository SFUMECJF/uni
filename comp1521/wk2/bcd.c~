#include <stdio.h>
#include <stdint.h>
#include <stdlib.h>
#include <assert.h>

#define N_BITS 16
#define asciiOffset 48

int bcd(int bcd_value);

int main(int argc, char *argv[]) {

    for (int arg = 1; arg < argc; arg++) {
        long l = strtol(argv[arg], NULL, 0);
        assert(l >= 0 && l <= 0x0909);
        int bcd_value = l;

        printf("%d\n", bcd(bcd_value));
    }

    return 0;
}

// given a  BCD encoded value between 0 .. 99
// return corresponding integer
int bcd(int bcd_value) {
    
    char *string = "0";
    string = malloc(sizeof (char)*17);
    int counter = 0;
    int printer = 15;
    while (counter < N_BITS) {
        if (bcd_value & 1) {
            string[printer] = '1';    
        } else {
            string[printer] = '0';
        }
        counter++;
        printer--;
        bcd_value = bcd_value >> 1;
    }
    string[counter] = '\0';
    
    counter = 0;
    int tens = 0;
    while (counter < 8) {
        tens = tens << 1;
        tens = tens|(string[counter] - asciiOffset);
        counter++;
    }

    int ones = 0;
    while (counter < 16) {
        ones = ones << 1;
        ones = ones|(string[counter] - asciiOffset);
        counter++;
    }
    
    int final = (tens * 10) + ones;
    
    return final;
    
}
