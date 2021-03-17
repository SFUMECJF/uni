/*
    Created by John Dao (z5258962)
        z5258962@ad.unsw.edu.au
    File made on Oct. 2019
    Made for ass1 for Comp1521, 2019 T3
*/

#include "emu.h"
#include "ram.h"
#include "registers.h"
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <inttypes.h>
#include "asgnheader.h"

//Simple function that converts bits to a decimal number via a limit
int bits_to_decimal(char *bits, int num_of_bits) {
    
    int number = 0;
    int counter = 0;    
    while (counter < num_of_bits) {
        number = number << 1;
        number = number|(bits[counter] - ASCII_OFFSET);
        counter++; 
    }

    return number;
}

//Simple function that gets an instruction and range and returns a string of bits
//In that range
//DOES NOT INCLUDE THE ACCESS OF THE START AND END
//SO MAKE SURE TO +1 WHERE NEEDED
char *get_bits(uint32_t instruction, int start, int end, int amount) {
    char *bits = "0";
    bits = malloc(sizeof(char)* 33);
    int counter = 0;
    int printer = amount - 1;

    while (counter < N_BITS) {
        if (counter > start && counter < end) {
            if (instruction & 1) {
                bits[printer] = '1';
            } else {
                bits[printer] = '0';
            }
            printer--;
        }
        counter++;
        instruction = instruction >> 1;
    }

    bits[amount] = '\0';

    return bits;
}

//Initial category sorter. Sorts if its 15, 1 or 2.
int sort_category(char *category) {
    int category_number = -1;
    if (strcmp(category, "000000") == 0) {
        category_number = 1;
    } else if (strcmp(category, "000001") == 0) {
        category_number = 2;
    } else if (strcmp(category, "011100") == 0) {
        category_number = 15;
    } else {
        category_number = -1;
    }
    return category_number;
}


/*
 * print a MIPS instruction (no newline)
 * run reference implementation if unsure what to print
 * Ran as a source file for the 'main' function of execute instruction
 */
void print_instruction(uint32_t instruction) {
    sort_instruction(instruction);
}

//This function seperates the executed code with the three main categories
//These are category 1, 2 and 3-21
//Defined in README.md
void sort_instruction(uint32_t instruction) {

    //Initiates a string of ones and zeros (in ascii form)
    //Also assigns it space to work with
    //Note that this is for 6 bits!
    char *category = "0";
    category = malloc(sizeof(char)* 7);
 
    //Get bits for category. 6 targeted bits gathered
    category = get_bits(instruction, INSTRUCT_BEGIN, N_BITS, CMD_BIT_LEN);

    //Set of if statements to determing category of instruction
    //Whether it is 1(incs 15) or 2, or 3 to 21 (else).
    //NUMBER IN IF STATEMENT IS THE CATEGORY. NO USE IN DEFINING THESE
    int tester = sort_category(category);
    if (tester == 1 || tester == 15) {
        //Will be cat 1 or 15
        category_ints(category, instruction);
    } else if (tester == 2) {
        print_category_two(category, instruction);
    } else {
        sift_category_rest(category, instruction);
    }
}

//Decifers which funcition is called for category 1 and 2.
//NOTE THAT CATEGORY CAN ONLY BE 1 OR 2.
void category_ints(char *category, uint32_t instruction) {

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
    
    //Runs through converter and converts them into ints
    int8_t var_one = bits_to_decimal(int_one, VAR_BIT_LEN);
    int8_t var_two = bits_to_decimal(int_two, VAR_BIT_LEN);
    int8_t var_three = bits_to_decimal(int_three, VAR_BIT_LEN);
    
    //Sending category one to print category
    //Else if category 15, print multiply to low
    //Else go to category_two
    char *category_one = "000000";
    char *category_15 = "011100";
    if (strcmp(category, category_one) == 0) {
        print_category_one(category, var_one, var_two, var_three, instruction);
    } else if (strcmp(category, category_15) == 0) {
        printf("mul $%d, $%d, $%d", var_one, var_three, var_two);
    } else {
        print_category_two(category, instruction);
    }
}

//Sorts through the category one via the last 6 bits and prints out 
//Appropriate command.
void print_category_one(char *category, int d, int t, int s, uint32_t instruction) {

    char *subset = "0";
    subset = malloc(sizeof(char)* 7);

    //Getting bits for subset command and converting it to comparable integer.
    subset = get_bits(instruction, START_GET_BITS, CAT_ONE_INSTRUCT_END + 1, 6);
    int command = bits_to_decimal(subset, CMD_BIT_LEN);

    //Sifting through all category one commands
    //Printing accordingly
    if (command == CAT_ONE_ADD) {
        printf("add $%d, $%d, $%d", d, s, t);
    } else if (command == CAT_ONE_SUB) {
        printf("sub $%d, $%d, $%d", d, s, t);
    } else if (command == CAT_ONE_AND) {
        printf("and $%d, $%d, $%d", d, s, t);
    } else if (command == CAT_ONE_OR) {
        printf("or $%d, $%d, $%d", d, s, t);
    } else if (command == CAT_ONE_XOR) {
        printf("xor $%d, $%d, $%d", d, s, t);
    } else if (command == CAT_ONE_SLLV) {
        printf("sllv $%d, $%d, $%d", d, t, s);
    } else if (command == CAT_ONE_SRLV) {
        printf("srlv $%d, $%d, $%d", d, t, s);
    } else if (command == CAT_ONE_SLT) {
        printf("slt $%d, $%d, $%d", d, s, t);
        //SLL AND SRL are special cases for category one and are 
        //operated on below.
    } else if (command == CAT_ONE_SLL) {
        shift_left_right(command, instruction);
    } else if (command == CAT_ONE_SRL) {
        shift_left_right(command, instruction);
    
        //Syscall and jump registry
    } else if (command == CAT_ONE_SYSCALL) {
        printf("syscall");
    } else if (command == CAT_ONE_JR) {
        printf("jr $%d", s);
    } else {
        printf("\n \n \n !!!!FAILED!!! \n \n \n");
    }
}

//Special cases for SLL and SRL
void shift_left_right(int command, uint32_t instruction) {
    
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
    int8_t var_one = bits_to_decimal(int_one, VAR_BIT_LEN);
    int8_t var_two = bits_to_decimal(int_two, VAR_BIT_LEN);
    int8_t var_three = bits_to_decimal(int_three, VAR_BIT_LEN);

    if (command == CAT_ONE_SLL) {
        printf("sll $%d, $%d, %d", var_two, var_three, var_one);
    } else if (command == CAT_ONE_SRL) {
        printf("srl $%d, $%d, %d", var_two, var_three, var_one);
    }
}

void print_category_two(char *category, uint32_t instruction) {

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

    //Converting from bits to decimal
    int16_t i_var = bits_to_decimal(I_bits, IMD_BIT_LEN);
    int8_t cmd_int = bits_to_decimal(int_one, VAR_BIT_LEN);
    int8_t s_int = bits_to_decimal(int_two, VAR_BIT_LEN);

    if (cmd_int == 0) {
        printf("bltz $%d, %d", s_int, i_var);
    } else {
        printf("bgez $%d, %d", s_int, i_var);
    }
}

//Sifter for the rest of the other categories (3 to 21).
//Works via if statements and going through each category.
//Each one works independently unless more complicated or repetitive
//In that case, new function was made to cater.
void sift_category_rest(char *category, uint32_t instruction){

    if (strcmp(category, "000010") == 0) {
        //Category 3
        char *X_bits = "0";
        X_bits = malloc(sizeof(char)* 7);
        X_bits = get_bits(instruction, START_GET_BITS, INSTRUCT_BEGIN + 1, JUMP_BIT_LEN);
        int x_var = bits_to_decimal(X_bits, JUMP_BIT_LEN);
        printf("j 0x%X", x_var);
    } else if (strcmp(category, "000011") == 0) {
        //Category 4
        char *X_bits = "0";
        X_bits = malloc(sizeof(char)* 7);
        X_bits = get_bits(instruction, START_GET_BITS, INSTRUCT_BEGIN + 1, JUMP_BIT_LEN);
        int x_var = bits_to_decimal(X_bits, JUMP_BIT_LEN);
        printf("jal 0x%X", x_var);
    } else if (strcmp(category, "000100") == 0) {
        //Category 5
        branch_category(category, instruction);
    } else if (strcmp(category, "000101") == 0) {
        //Category 6
        branch_category(category, instruction);
    } else if (strcmp(category, "000110") == 0) {
        //Category 7
        branch_category(category, instruction);
    } else if (strcmp(category, "000111") == 0) {
        //Category 8
        branch_category(category, instruction);
    
        //AND OR CATEGORY (includes lui and slti)
    } else if (strcmp(category, "001000") == 0) {
        //Category 9
        and_or_category(category, instruction);
    } else if (strcmp(category, "001010") == 0) {
        //Category 10
        and_or_category(category, instruction);
    } else if (strcmp(category, "001100") == 0) {
        //Category 11
        and_or_category(category, instruction);
    } else if (strcmp(category, "001101") == 0) {
        //Category 12
        and_or_category(category, instruction);
    } else if (strcmp(category, "001110") == 0) {
        //Category 13
        and_or_category(category, instruction);
    } else if (strcmp(category, "001111") == 0) {
        //Category 14
        and_or_category(category, instruction);  

        //LOAD AND STORE CATEGORY. CATEGORY 15 in CATEGORY_INTS
    } else if (strcmp(category, "100000") == 0) {
        //Category 16
        load_and_store(category, instruction);
    } else if (strcmp(category, "100001") == 0) {
        //Category 17
        load_and_store(category, instruction);
    } else if (strcmp(category, "100011") == 0) {
        //Category 18
        load_and_store(category, instruction);
    } else if (strcmp(category, "101000") == 0) {
        //Category 19
        load_and_store(category, instruction);
    } else if (strcmp(category, "101001") == 0) {
        //Category 20
        load_and_store(category, instruction);
    } else if (strcmp(category, "101011") == 0) {
        //Category 21
        load_and_store(category, instruction);
    }

}

//Covers categories 5 to 8
//Sorts through the branch category via the category from sift_category_rest
void branch_category(char *category, uint32_t instruction) {
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

    int16_t i_var = bits_to_decimal(i_bits, IMD_BIT_LEN);
    int8_t int_one = bits_to_decimal(one_bits, VAR_BIT_LEN);
    int8_t int_two = bits_to_decimal(two_bits, VAR_BIT_LEN);
        
    //Sifting through via category to print correct command
    if (strcmp(category, "000100") == 0) {
        //Category 5
        printf("beq $%d, $%d, %d", int_two, int_one, i_var);
    } else if (strcmp(category, "000101") == 0) {
        //Category 6
        printf("bne $%d, $%d, %d", int_two, int_one, i_var);
    } else if (strcmp(category, "000110") == 0) {
        //Category 7
        printf("blez $%d, %d", int_two, i_var);
    } else if (strcmp(category, "000111") == 0) {
        //Category 8
        printf("bgtz $%d, %d", int_two, i_var);
    }
}

//Sifter for and/or categories
//Sorts through the and/or category via the category from sift_category_rest
void and_or_category(char *category, uint32_t instruction) {
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

    //Converting bits to decimals
    int16_t i_var = bits_to_decimal(i_bits, IMD_BIT_LEN);
    int8_t int_one = bits_to_decimal(one_bits, VAR_BIT_LEN);
    int8_t int_two = bits_to_decimal(two_bits, VAR_BIT_LEN);


    //Sorting and printing via 6 category bits. 
    if (strcmp(category, "001000") == 0) {
        //Category 9
        printf("addi $%d, $%d, %d", int_one, int_two, i_var);
    } else if (strcmp(category, "001010") == 0) {
        //Category 10
        printf("slti $%d, $%d, %d", int_one, int_two, i_var);
    } else if (strcmp(category, "001100") == 0) {
        //Category 11
        printf("andi $%d, $%d, %d", int_one, int_two, i_var);
    } else if (strcmp(category, "001101") == 0) {
        //Category 12
        printf("ori $%d, $%d, %d", int_one, int_two, i_var);
    } else if (strcmp(category, "001110") == 0) {
        //Category 13
        printf("xori $%d, $%d, %d", int_one, int_two, i_var);
    } else if (strcmp(category, "001111") == 0) {
        //Category 14
        printf("lui $%d, %d", int_one, i_var);
    }
        
}

//Sorts and prints out the load and store functions
//Sorts through the load/store category via the category from sift_category_rest
void load_and_store(char *category, uint32_t instruction) {
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

    //Converting bits to decimal
    int16_t i_var = bits_to_decimal(i_bits, IMD_BIT_LEN);
    int8_t int_one = bits_to_decimal(one_bits, VAR_BIT_LEN);
    int8_t int_two = bits_to_decimal(two_bits, VAR_BIT_LEN);
        
    //Sifts through via the category from sift_category_rest and prints function
    if (strcmp(category, "100000") == 0) {
        //Category 16
        printf("lb $%d, %d($%d)", int_one, i_var, int_two);
    } else if (strcmp(category, "100001") == 0) {
        //Category 17
        printf("lh $%d, %d($%d)", int_one, i_var, int_two);
    } else if (strcmp(category, "100011") == 0) {
        //Category 18
        printf("lw $%d, %d($%d)", int_one, i_var, int_two);
    } else if (strcmp(category, "101000") == 0) {
        //Category 19
        printf("sb $%d, %d($%d)", int_one, i_var, int_two);
    } else if (strcmp(category, "101001") == 0) {
        //Category 20
        printf("sh $%d, %d($%d)", int_one, i_var, int_two);
    } else if (strcmp(category, "101011") == 0) {
        //Category 21
        printf("sw $%d, %d($%d)", int_one, i_var, int_two);
    }
}
