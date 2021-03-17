// count bits in a uint64_t

#include <assert.h>
#include <stdint.h>
#include <stdlib.h>

// return how many 1 bits value contains
// return how many 1 bits value contains
int bit_count(uint64_t value) {
    int counter = 0;
    int bit_count = 0;
    while (counter < 64) {
        if (value & 1) {
            bit_count++;
        }
        value = value >> 1;
        counter++;
    }
    
    return bit_count;
}

