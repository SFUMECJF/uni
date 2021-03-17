// Sample solution for COMP1521 lab exercises
//
// generate the opcode for an addi instruction

#include <stdio.h>
#include <stdint.h>
#include <stdlib.h>
#include <assert.h>

#include "addi.h"

// return the MIPS opcode for addi $t,$s, i
uint32_t addi(int t, int s, int i) {
    uint32_t instruction = 0;
    uint16_t i_instruct = 0;
    i_instruct = i_instruct|i;

    //int counter = 0;
    instruction = instruction << 6;
    instruction = instruction|8;
    instruction = instruction << 5;
    instruction = instruction|s;
    instruction = instruction << 5;
    instruction = instruction|t;
    instruction = instruction << 16;
    instruction = instruction|i_instruct;

    return instruction; // REPLACE WITH YOUR CODE

}
