//This program will print out all of the moves possible in a knight grid
//John Dao z5258962

#include <stdio.h>
#include <string.h>
#include <math.h>

#define MAX_BOARD_LENGTH 8

void setChessboard(int board[MAX_BOARD_LENGTH][MAX_BOARD_LENGTH]);

int main (int argc, char* argv[]) {
    int board[MAX_BOARD_LENGTH][MAX_BOARD_LENGTH] = {};
    setChessboard(board);
    printf("%d\n", board[7][0]);
}

void setChessboard(int board[MAX_BOARD_LENGTH][MAX_BOARD_LENGTH]) {
    int rowCounter = 0;
    int columnCounter = 0;
    
    while (rowCounter < MAX_BOARD_LENGTH) {
        while (columnCounter < MAX_BOARD_LENGTH) {
            int fill = (10 * rowCounter) + (8-columnCounter);
            board[rowCounter][columnCounter] = fill;
            columnCounter++;
        }
        rowCounter++;
        columnCounter = 0;
    }
    
}
