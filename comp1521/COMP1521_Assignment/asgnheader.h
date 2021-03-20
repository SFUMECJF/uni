/*
This function will contain all of the appropriate defs needed for two functions
Currently only implemented for print_instruction.
*/ 

//All defines needed for operation
#define ASCII_OFFSET 48
#define START_GET_BITS -1
#define N_BITS 32
#define CAT_ONE_INSTRUCT_BEGIN 0
#define CAT_ONE_INSTRUCT_END 5
#define ONE_VAR_BEGIN 10
#define TWO_VAR_BEGIN 15
#define THREE_VAR_BEGIN 20
#define INSTRUCT_BEGIN 25
#define VAR_BIT_LEN 5
#define CMD_BIT_LEN 6
#define IMD_BIT_LEN 16
#define JUMP_BIT_LEN 26

//Defines for category 1
#define CAT_ONE_ADD 32
#define CAT_ONE_SUB 34
#define CAT_ONE_AND 36
#define CAT_ONE_OR 37
#define CAT_ONE_XOR 38
#define CAT_ONE_SLLV 4
#define CAT_ONE_SRLV 6
#define CAT_ONE_SLT 42
#define CAT_ONE_SLL 0
#define CAT_ONE_SRL 2
#define CAT_ONE_SYSCALL 12
#define CAT_ONE_JR 8

// NOTES!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

/*

COMP 1521 Project

This repository is for the creation of COMP1521's project. It is made by John Dao (z5258962) and intended for the 2019 T3 iteration of the assessment.

TOTAL OF 33 DIFFERENT CALLS

#1.000000
    - Add.
    - Subtract
    -And
    -or
    -Xor
    -Shift left
    -Shift right
    -Set on less than
    -Shift left immediate
    -Shift right immediate
    -Jump register
    -System call 

#2.000001
    -Branch on less than zero
    -Branch on greater than zero  

#3.000010
    -Jump  

#4.000011
    -Jump and link  

#5.000100
    -Branch on equal  

#6.000101
    -Branch on not equal  

#7.000110
    -Branch less than or equal than zero  

#8.000111
    -Branch greater than zero  

#9.001000
    -Add intermediate  

#10.001010
    -Set on less than intermediate  

#11.001100
    -And with intermediate  

#12.001101
    -Or with intermediate  

#13.001110
    -Xor with intermediate  

#14.001111
    -Load upper intermediate  

#15.011100
    -Multiply to low  

#16.100000
    -Load byte  

#17.100001
    -Load half word  

#18.100011
    -Load word  

#19.101000
    -Store byte  

#20.101001
    -Store half  

#21.101011
    -Store word  

Categories are given as  

Category one:
    #1  

Category Two:
    #2 

Category Shift left and right:
    of #1
    -Shift left immediate
    -Shift right immediate    

Category branch:
    #5 to #8  

Category And/Or:
    #9 to #14  

Category Load and store:
    #16 to #21  

NOTE THAT Category 15 is in function category_ints

*/


/*

    ALL GENERAL PROTOTYPES AND FUNCTIONS NEEDED

*/

//GEN_FUNC FUNCTIONS ARE CALLED HERE

//Simple function that converts bits to a decimal number
int bits_to_decimal(char *bits, int num_of_bits);

//Simple function that gets an instruction and range and returns a string of bits
//In that range
char *get_bits(uint32_t instruction, int start, int end, int amount);

//Simple function that returns 1, 2, or 15 for respective cats. -1 for else.
int sort_category(char *category);



//PRINT_INSTRUCTIONS FUNCTIONS ARE CALLED HERE

//Gets category as specified by readme.md. Only runs for category 1 and 2.
void sort_instruction(uint32_t instruction);

//Gets the ints from category 1 structure of bits
void category_ints(char *category, uint32_t instruction);

//Decifers which function is called for category 1 and prints them with integers
void print_category_one(char *category, int d, int s, int t, uint32_t instruction);

//Prints category shift left and right inmmediate
void shift_left_right(int command, uint32_t instruction);

//Deciphers category 2 function
void print_category_two(char *category, uint32_t instruction);

//Sifter for the rest of the other categories (3 to 21).
void sift_category_rest(char *category, uint32_t instruction);

//Sifter for branch categories
void branch_category(char *category, uint32_t instruction);

//Sifter for and/or categories
void and_or_category(char *category, uint32_t instruction);

//Sifter for load and store categories
void load_and_store(char *category, uint32_t instruction);


//EXECUTE_INSTRUCTION and functions are CALLED HERE
int execute_instruction(uint32_t instruction, uint32_t *program_counter);

//Sorts categories 1 to 15
//Runs 15 in this function
int sort_execute_one_fifteen(int category, uint32_t instruction, uint32_t *counter);

//Executes category one
int execute_one(int d_var, int s_var, int t_var, uint32_t instruction, uint32_t *cntr);

//Executes shift left and right categories
int execute_shift_left_right(int command, uint32_t instruction, uint32_t *cntr);

//Executes category two
int execute_category_two(uint32_t instruction, uint32_t *cntr);

//Sorts and/or runs the rest of the categories (3 to 21 without 15)
int execute_rest(char *category, uint32_t instruction, uint32_t *cntr);

//Executes branch category
int execute_branch_category(char *category, uint32_t instruction, uint32_t *cntr);

//Executes and/or category
int execute_and_or_category(char *category, uint32_t instruction, uint32_t *cntr);

//Executes load and store category
int execute_load_and_store(char *category, uint32_t instruction, uint32_t *cntr);;
