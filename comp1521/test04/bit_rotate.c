#include "bit_rotate.h"

// return the value bits rotated left n_rotations
uint16_t bit_rotate(int n_rotations, uint16_t bits) {
    uint16_t last_bit = bits;

    int rotations = 0;
    if (n_rotations > 0) {
        while (rotations < n_rotations) {
            last_bit = bits;
            last_bit = last_bit >> 15;
            bits = bits << 1;
            if (last_bit & 1) {
                bits = bits|1;
            }
            rotations ++;
        }
    } else {
        n_rotations = n_rotations * -1;
        while (rotations < n_rotations) {
            last_bit = bits;
            last_bit = last_bit << 15;
            last_bit = last_bit >> 15;
            bits = bits >> 1;
            if (last_bit & 1) {
                bits = bits|32768;
            }
            rotations++;
        }
    }
    

    return bits; //REPLACE ME WITH YOUR CODE
}
