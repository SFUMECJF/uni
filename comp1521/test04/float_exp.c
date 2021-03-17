#include "float_exp.h"

// given the 32 bits of a float return the exponent
uint32_t float_exp(uint32_t f) {
    //int counter = 0;
    uint8_t exponent = 0;
    
    f = f >> 23;
    exponent = exponent|f;
    return exponent;
}
