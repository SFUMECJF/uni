// A Modified Snap game
// The user will input numbers one at a time
// The program will remember previous input from the user
// If the current input matches any previous, the program will say "Snap!"
// Marc Chee (marc.chee@unsw.edu.au) 14/3/2019, modified June 2019

#include <stdio.h>

#define NUM_TURNS 10  
void numberCheck (int prevNums[NUM_TURNS], int checkNum);

int main (void) {
    int prevNums[NUM_TURNS] = {};

    printf("Welcome to my game of Snap!\n");
    printf("You can type in any number until %d turns are over.\n", NUM_TURNS);
    printf("If I've seen that number before, I will say SNAP!\n");

    // the main game loop. Each turn of the game is one iteration
    int i = 0;
    while (i < NUM_TURNS) {
        printf("Please type in a number: ");
        int input;
        scanf("%d", &input);
        numberCheck(prevNums, input);
        prevNums[i] = input;
        i++;
    }
    return 0;
}

//numberCheck will go through an array and print "SNAP!" if the input number is
//in the array

void numberCheck (int prevNums[NUM_TURNS], int checkNum) {
    int i = 0;
    while (i < NUM_TURNS) {
        if (prevNums[i] == checkNum) {
            printf("SNAP!\n");
        }
        i++;
    }

}
