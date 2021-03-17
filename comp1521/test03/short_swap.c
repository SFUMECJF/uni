// Swap bytes of a short

#include <stdint.h>
#include <stdlib.h>
#include <assert.h>

// given uint16_t value return the value with its bytes swapped
uint16_t short_swap(uint16_t value) {
    // PUT YOUR CODE HERE
    uint8_t left = 0;
    uint8_t right = 0;

    right = right|value;
    value = value >> 8;
    left = left|value;

    uint16_t new_value = 0;
    new_value = new_value|right;
    new_value = new_value << 8;
    new_value = new_value|left;


    return new_value;
}
