//This program is a simulation of a fight between ninjas
//There is a team of four ninjas turtles
//and the shredder

//This will use structs to represent any of the characters

//We will loop through fights between them
//until either side has run out of health

#include <stdio.h>
#include <string.h>

#define MAX_LENGTH 50
#define TEAM_SIZE 4

struct ninja {
    char name [MAX_LENGTH];
    char phrase [MAX_LENGTH];
    int power;
    int health;
};

int main (void) {
    struct ninja turtles[TEAM_SIZE];
    strcpy(turtles[0].name, "Leonardo");
    
    struct ninja shredder; 

    return 0;
}
