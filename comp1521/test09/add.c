#include <stdio.h>
#include <stdint.h>
#include <assert.h>

#include "add.h"

// return the MIPS opcode for add $d, $s, $t
uint32_t add(uint32_t d, uint32_t s, uint32_t t) {

    uint32_t instruct = 0;
    instruct = instruct << 10;
    instruct = instruct|s;
    instruct = instruct << 5;
    instruct = instruct|t;
    instruct = instruct << 5;
    instruct = instruct|d;
    instruct = instruct << 11;
    instruct = instruct|32;

    return instruct;

}
