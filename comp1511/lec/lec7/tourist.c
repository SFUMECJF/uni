// A heavily modified version of paint.c for Assignment 1

// This is starter code for the Tourist Program

// This program was written by Marc Chee (marc.chee@unsw.edu.au)
// in June 2019
//

#include <stdio.h>

// The dimensions of the map
#define N_ROWS 10
#define N_COLS 10

// Helper Function: Print out the canvas.
void printMap(int map[N_ROWS][N_COLS], int posR, int posC);


int main(void) {
    int map[N_ROWS] [N_COLS] = {0};
    int posR = 5, posC = 5;
    printMap (map, posR, posC);
    ;


    int exit = 0;

    while (exit == 0) {
        map[posR][posC] = 1;
        int input;
        printf("Please enter a direction on the numpad or 0 to exit; ");
        scanf("%d", &input);
        if ((posR + 1) == N_ROWS) {
            printf("You have walked off the world! You lose!\n");
            return 0;
        } else if ((posR - 1)  < 0) {
            printf("You have walked off the world! You lose!\n");
            return 0;
        } else if ((posC + 1) == N_COLS) {
            printf("You have walked off the world! You lose!\n");
            return 0;
        } else if ((posC - 1) < 0) {
            printf("You have walked off the world! You lose!\n");
            return 0;
        }
        
        if (input == 2) {
            posR++;
        } else if (input == 8) {
            posR--;
        } else if (input == 6) {
            posC++;
        } else if (input == 4) {
            posC--;
        } else if (input == 0) {
            printf("You have exited the game\n");
            exit = 1;
        } else {
            printf("You have inputed an invalid direction\n");
            map[posR][posC] = 0;
        }

        printMap (map, posR, posC);
        
        if (map[posR][posC] == 1) {
            printf("YOU LOSE!\n");
            exit++;
        }
        
    }
    return 0;
}    

// Prints the map, by printing the integer value stored in
// each element of the 2-dimensional map array.
// Prints a T instead at the position posR, posC
void printMap(int map[N_ROWS][N_COLS], int posR, int posC) {
    int row = 0;
    while (row < N_ROWS) {
        int col = 0;
        while (col < N_COLS) {
            if(posR == row && posC == col) {
                printf("T ");
            } else {
                printf("%d ", map[row][col]);
            }            
            col++;
        }
        row++;
        printf("\n");
    }
	    }










