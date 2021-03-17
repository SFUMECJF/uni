#include "sign_flip.h"

// given the 32 bits of a float return it with its sign flipped
uint32_t sign_flip(uint32_t f) {
    uint32_t new_f = 0;
    uint32_t save_f = f;

    f = f >> 31;
    if (f & 1) {
        new_f = new_f|0;
    } else {
        new_f = new_f|1;
    }
    new_f = new_f << 31;
    save_f = save_f << 1;
    save_f = save_f >> 1;
    new_f = new_f|save_f;

    return new_f; // REPLACE ME WITH YOUR CODE
}
