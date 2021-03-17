// A program to track statistics of pets
// Written for COMP1511 tutorials by 
// Marc Chee (marc.chee@unsw.edu.au)
// July 2019

#include <stdio.h>
#include <string.h>
#include <stdlib.h>

#define MAX_NAME_LENGTH 50
#define MAX_TYPE_LENGTH 50

struct pet {
    char name[MAX_NAME_LENGTH];
    char type[MAX_TYPE_LENGTH];
    int age;
    int weight;
};

// function declarations, do not change these
void setup_pet(struct pet *my_pet);
void print_pet(struct pet *my_pet);

// do not change any code in the main function
int main(void) {
    struct pet new_pet;
    setup_pet(&new_pet);
    print_pet(&new_pet);
}

// A function that reads two lines then two
// ints from standard input, storing them
// in the pet struct 
void setup_pet(struct pet *my_pet) {
    fgets(my_pet->name, MAX_NAME_LENGTH, stdin);
    my_pet->name[strlen(my_pet->name) - 1] = 0;
    fgets(my_pet->type, MAX_TYPE_LENGTH, stdin);
    my_pet->type[strlen(my_pet->type) - 1] = 0;
    scanf("%d %d", &my_pet->age, &my_pet->weight);
}

// a function that prints out a human readable
// description of the pet:
// "<name> is a <type> that is <age> years old and weighs <weight>kg\n"
void print_pet(struct pet *my_pet) {
    printf("%s", my_pet->name);
    printf(" is a ");
    printf("%s", my_pet->type);
    printf(" who is %d years old and ", my_pet->age);
    printf("weighs %dkg \n", my_pet->weight);
}
