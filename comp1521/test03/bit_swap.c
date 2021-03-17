// swap pairs of bits of a 64-bit value, using bitwise operators

#include <assert.h>
#include <stdint.h>
#include <stdlib.h>

/// return value with pairs of bits swapped
uint64_t bit_swap(uint64_t value) {
    int counter = 0;
    uint64_t save_value = value;
    uint64_t new_value = 0;
    value = value >> 1;
    
    while (counter < 64) {
        if (counter % 2 == 0) {
            if (value & 1) {
                new_value = new_value|1;
            } else {
                new_value = new_value|0;
            }
        } else {
            if (save_value & 1) {
                new_value = new_value|1;
            } else {
                new_value = new_value|0;
            }
        }
        value = value >> 1;
        save_value = save_value >> 1;
        new_value = new_value << 1;
        counter++;
    }

    uint64_t reversed = 0;
    counter = 0;

    while (counter < 64) {
        if (new_value & 1) {
            reversed = reversed|1;
        } else {
            reversed = reversed|0;
        }
        reversed = reversed << 1;
        new_value = new_value >> 1;
        counter++;
    }
    
    return reversed;
}