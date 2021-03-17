// If you use C library functions add includes here.

#include "emu.h"
#include "ram.h"
#include "registers.h"
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <inttypes.h>
#include "asgnheader.h"

/**
 * execute a MIPS instruction
 *
 * This function should:
 *
 * get register values by calling `get_register(register_type register_number)`
 * change registers by calling `set_register(register_type register_number, uint32_t value)`
 *
 * get memory values by `calling get_byte(uint32_t address)`
 * changes memory by `set_byte(uint32_t address, uint8_t value)`
 *
 * updates program_counter to address of next instruction
 *
 * returns 1 if an exit syscall is executed, 0 otherwise
 */

/*
    This program will use a similar architecture as print_instructions 
    and its concurrent sorting system.
    In fact, some code is going to be stemmed from that particular
    function file.
    THIS WILL BE TREATED AS THE MAIN FUNCTION AS I HAVE NONE TO WORK WITH
*/

int execute_instruction(uint32_t instruction, uint32_t *program_counter) {

    char *category = "0";
    category = malloc(sizeof(char)* 7);

    //Gets bit for category, 6 targeted bits at beginning
    category = get_bits(instruction, INSTRUCT_BEGIN, N_BITS, CMD_BIT_LEN);

    //Attempts to find the category via first 6 bits.
    int tester = sort_category(category);
    if (tester == 1 || tester == 15) {
        sort_execute_one_fifteen(tester, instruction, program_counter);
    } else if (tester == 2) {
        execute_category_two(instruction, program_counter);
    } else {
        execute_rest(category, instruction, program_counter);
    }

    // Update program_counter to address of next instructions
    // Most instructions will simply do the following:
    (*program_counter) += 4;
    // Jump & Branch instructions will do something different

    // 0 should be returned, unless an exit syscall is executed
    return 0;
}

//Sorts out whether command is for category 1 or for 15
//Runs through the code snipes given in spec
//Sends integers to function execute_one for it to use. 
int sort_execute_one_fifteen(int category, uint32_t instruction, uint32_t *counter) {
    
    //Initialising strings of bits
    char *int_one = "0";
    int_one = malloc(sizeof(char)* 6);
    char *int_two = "0";
    int_two = malloc(sizeof(char)* 6);
    char *int_three = "0";
    int_three = malloc(sizeof(char)* 6);

    //Gets the integers from the instruction in int form
    int_one = get_bits(instruction, ONE_VAR_BEGIN, TWO_VAR_BEGIN + 1, VAR_BIT_LEN);
    int_two = get_bits(instruction, TWO_VAR_BEGIN, THREE_VAR_BEGIN + 1, VAR_BIT_LEN);
    int_three = get_bits(instruction, THREE_VAR_BEGIN, INSTRUCT_BEGIN + 1, VAR_BIT_LEN);
    
    int32_t var_one = bits_to_decimal(int_one, VAR_BIT_LEN);
    int32_t var_two = bits_to_decimal(int_two, VAR_BIT_LEN);
    int32_t var_three = bits_to_decimal(int_three, VAR_BIT_LEN);

    if (category == 15) {
        uint32_t s_uint = get_register(var_three);
        uint32_t t_uint = get_register(var_two);
        uint32_t function = s_uint * t_uint;
        set_register(var_one, function);
    } else {
        execute_one(var_one, var_three, var_two, instruction, counter);
    }
    (*counter) += 4;
    return 0;
}

//Executes category one
//Runs through the code snipes given in spec
//Sorts via bit sections
int execute_one(int d_var, int s_var, int t_var, uint32_t instruction, uint32_t *cntr) {
    char *subset = "0";
    subset = malloc(sizeof(char)* 7);

    //Getting bits for subset command and converting it to comparable integer.
    subset = get_bits(instruction, START_GET_BITS, CAT_ONE_INSTRUCT_END + 1, 6);
    int command = bits_to_decimal(subset, CMD_BIT_LEN);
    uint32_t function = 0;
    uint32_t s_uint = get_register(s_var);
    uint32_t t_uint = get_register(t_var);
    //Sifting through all category one commands
    //Executing accordingly
    if (command == CAT_ONE_ADD) {
        //add
        function = s_uint + t_uint;
    } else if (command == CAT_ONE_SUB) {
        //sub
        function = s_uint - t_uint;
    } else if (command == CAT_ONE_AND) {
        //and
        function = s_uint & t_uint;
    } else if (command == CAT_ONE_OR) {
        //or
        function = s_uint|t_uint;
    } else if (command == CAT_ONE_XOR) {
        //xor
        function = s_uint ^ t_uint;
    } else if (command == CAT_ONE_SLLV) {
        //sllv
        function = t_uint << s_uint;
    } else if (command == CAT_ONE_SRLV) {
        //srlv
        function = t_uint >> s_uint;
    } else if (command == CAT_ONE_SLT) {
        //slt
        function = (s_uint < t_uint);


    //SLL AND SRL are special cases for category one and are operated on below.
    } else if (command == CAT_ONE_SLL) {
        //SLL
        execute_shift_left_right(command, instruction, cntr);
    } else if (command == CAT_ONE_SRL) {
        execute_shift_left_right(command, instruction, cntr);

    } else if (command == CAT_ONE_SYSCALL) {
        //SYSCALL
        //printf("syscall");
    } else if (command == CAT_ONE_JR) {
        //jr
        (*cntr) = s_var;
        return 0;
    } else {
        printf("\n \n \n !!!!FAILED!!! \n \n \n");
    }
    set_register(d_var, function);
    (*cntr) += 4;
    return 0;
}

//Special cases for SLL and SRL
//HAVE NO IDEA WHY ITS NOT WORKING
//CHECKED ALL VARIABLES AND ALL ARE WORKING AND VALID.
//set_register IS IDENTIFIED AS A POSSIBLE CULPRIT
int execute_shift_left_right(int command, uint32_t instruction, uint32_t *cntr) {
    
    //Initialising strings of bits
    char *int_one = "0";
    int_one = malloc(sizeof(char)* 6);
    char *int_two = "0";
    int_two = malloc(sizeof(char)* 6);
    char *int_three = "0";
    int_three = malloc(sizeof(char)* 6);

    //Gets the integers from the instruction in int form
    int_one = get_bits(instruction, CAT_ONE_INSTRUCT_END, ONE_VAR_BEGIN + 1, VAR_BIT_LEN);
    int_two = get_bits(instruction, ONE_VAR_BEGIN, TWO_VAR_BEGIN + 1, VAR_BIT_LEN);
    int_three = get_bits(instruction, TWO_VAR_BEGIN, THREE_VAR_BEGIN + 1, VAR_BIT_LEN);
    
    //Runs through converter and converts them into ints
    int8_t i_var= bits_to_decimal(int_one, VAR_BIT_LEN);
    int8_t var_two = bits_to_decimal(int_two, VAR_BIT_LEN);
    int8_t var_three_signed = bits_to_decimal(int_three, VAR_BIT_LEN);

//    uint32_t var_two = get_register(var_two_signed);
    uint32_t var_three = get_register(var_three_signed);
    uint32_t function = 0;
    if (command == CAT_ONE_SLL) {
        function = var_three << i_var;
    } else if (command == CAT_ONE_SRL) {
        function = var_three >> i_var;
    }
    set_register(var_two, function);
    (*cntr) += 4;
    return 0;
}
//Executes category two
//Runs through the code snipes given in spec
int execute_category_two(uint32_t instruction, uint32_t *cntr) {

    //Initialising strings of bits
    char *int_one = "0";
    int_one = malloc(sizeof(char)* 6);
    char *int_two = "0";
    int_two = malloc(sizeof(char)* 6);

    char *I_bits = "0";
    I_bits = malloc(sizeof(char)* 17);

    //Getting bits for variables for category 2
    I_bits = get_bits(instruction, START_GET_BITS, IMD_BIT_LEN, IMD_BIT_LEN);
    int_one = get_bits(instruction, TWO_VAR_BEGIN, THREE_VAR_BEGIN + 1, VAR_BIT_LEN);
    int_two = get_bits(instruction, THREE_VAR_BEGIN, INSTRUCT_BEGIN + 1, VAR_BIT_LEN);

    //converting them to decimal
    int16_t i_var = bits_to_decimal(I_bits, IMD_BIT_LEN);
    int8_t cmd_int = bits_to_decimal(int_one, VAR_BIT_LEN);
    int8_t s_int = bits_to_decimal(int_two, VAR_BIT_LEN);

    //Running to code given in spec for bltz and bgez
    //As they only change counter, no registry is changed or set
    if (cmd_int == 0) {
        //bltz
        if (s_int < 0) {
            (*cntr) += i_var << 2;
        } else {
            (*cntr) += 4;
        }
    } else {
        //bgez
        if (s_int >= 0) {
            (*cntr) += i_var << 2;
        } else {
            (*cntr) += 4;
        }
    }

    return 0;
}

//recieves the category that has been guarenteed to not be from 1, 2 or 15. 
//Sifts through via the first 6 bits once more. 
//Redirects to the specific function for execution (via 'types')
int execute_rest(char *category, uint32_t instruction, uint32_t *cntr) {

    if (strcmp(category, "000010") == 0) {
        //Category 3
        char *X_bits = "0";
        X_bits = malloc(sizeof(char)* 7);
        X_bits = get_bits(instruction, START_GET_BITS, INSTRUCT_BEGIN + 1, JUMP_BIT_LEN);
        int x_var = bits_to_decimal(X_bits, JUMP_BIT_LEN);
        (*cntr) = (*cntr & 0xF0000000)|(x_var << 2);
    } else if (strcmp(category, "000011") == 0) {
        //Category 4 (NOT IMPLEMENTED)
        char *X_bits = "0";
        X_bits = malloc(sizeof(char)* 7);
        X_bits = get_bits(instruction, START_GET_BITS, INSTRUCT_BEGIN + 1, JUMP_BIT_LEN);
        int x_var = bits_to_decimal(X_bits, JUMP_BIT_LEN);
        printf("jal 0x%X", x_var);
    } else if (strcmp(category, "000100") == 0) {
        //Category 5
        execute_branch_category(category, instruction, cntr);
    } else if (strcmp(category, "000101") == 0) {
        //Category 6
        execute_branch_category(category, instruction, cntr);
    } else if (strcmp(category, "000110") == 0) {
        //Category 7
        execute_branch_category(category, instruction, cntr);
    } else if (strcmp(category, "000111") == 0) {
        //Category 8
        execute_branch_category(category, instruction, cntr);
    
    //AND OR CATEGORY (includes lui and slti)
    } else if (strcmp(category, "001000") == 0) {
        //Category 9
        execute_and_or_category(category, instruction, cntr);
    } else if (strcmp(category, "001010") == 0) {
        //Category 10
        execute_and_or_category(category, instruction, cntr);
    } else if (strcmp(category, "001100") == 0) {
        //Category 11
        execute_and_or_category(category, instruction, cntr);
    } else if (strcmp(category, "001101") == 0) {
        //Category 12
        execute_and_or_category(category, instruction, cntr);
    } else if (strcmp(category, "001110") == 0) {
        //Category 13
        execute_and_or_category(category, instruction, cntr);
    } else if (strcmp(category, "001111") == 0) {
        //Category 14
        execute_and_or_category(category, instruction, cntr);  

    //LOAD AND STORE CATEGORY. CATEGORY 15 in CATEGORY_INTS
    } else if (strcmp(category, "100000") == 0) {
        //Category 16
        execute_load_and_store(category, instruction, cntr);
    } else if (strcmp(category, "100001") == 0) {
        //Category 17
        execute_load_and_store(category, instruction, cntr);
    } else if (strcmp(category, "100011") == 0) {
        //Category 18
        execute_load_and_store(category, instruction, cntr);
    } else if (strcmp(category, "101000") == 0) {
        //Category 19
        execute_load_and_store(category, instruction, cntr);
    } else if (strcmp(category, "101001") == 0) {
        //Category 20
        execute_load_and_store(category, instruction, cntr);
    } else if (strcmp(category, "101011") == 0) {
        //Category 21
        execute_load_and_store(category, instruction, cntr);
    }

    return 0;
} 

//Sorts and executes the instructions from branch category. 
int execute_branch_category(char *category, uint32_t instruction, uint32_t *cntr) {
    //Initiating strings of bits
    char *one_bits = "0";
    one_bits = malloc(sizeof(char)* 6);
    char *two_bits = "0";
    two_bits = malloc(sizeof(char)* 6);

    char *i_bits = "0";
    i_bits = malloc(sizeof(char)* 17);

    //Getting bits for variables
    i_bits = get_bits(instruction, START_GET_BITS, IMD_BIT_LEN, IMD_BIT_LEN);
    one_bits = get_bits(instruction, TWO_VAR_BEGIN, THREE_VAR_BEGIN + 1, VAR_BIT_LEN);
    two_bits = get_bits(instruction, THREE_VAR_BEGIN, INSTRUCT_BEGIN + 1, VAR_BIT_LEN);

    //Converting them to decimal
    int16_t i_varble = bits_to_decimal(i_bits, IMD_BIT_LEN);
    int8_t int_one = bits_to_decimal(one_bits, VAR_BIT_LEN);
    int8_t int_two = bits_to_decimal(two_bits, VAR_BIT_LEN);
    
    //Using get_register and assigning them to unsigned variables of 32 bit
    uint32_t t_uint = get_register(int_one);
    uint32_t s_uint = get_register(int_two);
    uint32_t i_var = get_register(i_varble);
    //Sifting through via category to print correct command.
    //Code executed is given in spec
    if (strcmp(category, "000100") == 0) {
        //Category 5 beq
        if (s_uint == t_uint) {
            (*cntr) += i_var << 2;
        } else {
            (*cntr) += 4;
        }
        
    } else if (strcmp(category, "000101") == 0) {
        //Category 6 bne
        if (s_uint != t_uint) {
            (*cntr) += i_var << 2;
        } else {
            (*cntr) += 4;
        }
    } else if (strcmp(category, "000110") == 0) {
        //Category 7 blez
        if (s_uint <= 0) {
            (*cntr) += i_var << 2;
        } else {
            (*cntr) += 4;
        }
    } else if (strcmp(category, "000111") == 0) {
        //Category 8 bgtz
        if (s_uint > 0) {
            (*cntr) += i_var << 2;
        } else {
            (*cntr) += 4;
        }
    }

    return 0;
}

//Sifter for and/or categories
int execute_and_or_category(char *category, uint32_t instruction, uint32_t *cntr) {
    //Initiating variables
    char *one_bits = "0";
    one_bits = malloc(sizeof(char)* 6);
    char *two_bits = "0";
    two_bits = malloc(sizeof(char)* 6);

    char *i_bits = "0";
    i_bits = malloc(sizeof(char)* 17);

    //Getting bits for variables
    i_bits = get_bits(instruction, START_GET_BITS, IMD_BIT_LEN, IMD_BIT_LEN);
    one_bits = get_bits(instruction, TWO_VAR_BEGIN, THREE_VAR_BEGIN + 1, VAR_BIT_LEN);
    two_bits = get_bits(instruction, THREE_VAR_BEGIN, INSTRUCT_BEGIN + 1, VAR_BIT_LEN);

    int32_t i_var = bits_to_decimal(i_bits, IMD_BIT_LEN);
    int32_t t_var = bits_to_decimal(one_bits, VAR_BIT_LEN);
    int32_t int_two = bits_to_decimal(two_bits, VAR_BIT_LEN);

    uint32_t s_uint = get_register(int_two);
    uint32_t function = 0;

    if (strcmp(category, "001000") == 0) {
        //Category 9 addi
        function = s_uint + i_var;
    } else if (strcmp(category, "001010") == 0) {
        //Category 10 slti
        function = (s_uint < i_var);
    } else if (strcmp(category, "001100") == 0) {
        //Category 11 andi
        function = s_uint & i_var;
    } else if (strcmp(category, "001101") == 0) {
        //Category 12 ori
        function = (s_uint|i_var);
    } else if (strcmp(category, "001110") == 0) {
        //Category 13 xori
        function = s_uint ^ i_var;
    } else if (strcmp(category, "001111") == 0) {
        //Category 14 lui
        function = i_var << 16;
        set_register(t_var, function);
        (*cntr) += 4;
        return 0;
        }
    set_register(t_var, function);
    (*cntr) += 4;

    return 0;
}

//Sorts and prints out the load and store functions
int execute_load_and_store(char *category, uint32_t instruction, uint32_t *cntr) {
    //Initiating variables
    char *one_bits = "0";
    one_bits = malloc(sizeof(char)* 6);
    char *two_bits = "0";
    two_bits = malloc(sizeof(char)* 6);

    char *i_bits = "0";
    i_bits = malloc(sizeof(char)* 17);

    //Getting bits for variables
    i_bits = get_bits(instruction, START_GET_BITS, IMD_BIT_LEN, IMD_BIT_LEN);
    one_bits = get_bits(instruction, TWO_VAR_BEGIN, THREE_VAR_BEGIN + 1, VAR_BIT_LEN);
    two_bits = get_bits(instruction, THREE_VAR_BEGIN, INSTRUCT_BEGIN + 1, VAR_BIT_LEN);

    int32_t i_var = bits_to_decimal(i_bits, IMD_BIT_LEN);
    int32_t int_one = bits_to_decimal(one_bits, VAR_BIT_LEN);
    int32_t int_two = bits_to_decimal(two_bits, VAR_BIT_LEN);

    uint32_t b_var = get_register(int_two);
    if (strcmp(category, "100000") == 0) {
        //Category 16 lb
        uint8_t function = (b_var + i_var); 
        set_register(int_one, function);
    } else if (strcmp(category, "100001") == 0) {
        //Category 17 lh
        uint16_t function = (b_var + i_var);
        set_register(int_one, function);
    } else if (strcmp(category, "100011") == 0) {
        //Category 18 lw
        uint32_t function = (b_var + i_var);
        set_register(int_one, function);
    } else if (strcmp(category, "101000") == 0) {
        //Category 19 sb
        uint8_t function = (b_var + i_var);
        function = (int_one & 0xff);
        set_register(int_one, function);
    } else if (strcmp(category, "101001") == 0) {
        //Category 19 sh
        uint16_t function = (b_var + i_var);
        function = (int_one & 0xffff);
        set_register(int_one, function);
    } else if (strcmp(category, "101011") == 0) {
        //Category 21 sw
        //Category 19 sb
        uint8_t function = (b_var + i_var);
        function = int_one;
        set_register(int_one, function);
    }
    (*cntr) += 4;
    return 0;
}
