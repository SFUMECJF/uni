// Assignment 1 19T2 COMP1511: CS Paint
// paint.c
//
// This program was written by John Dao (z5258962) on July 2019

#include <stdio.h>
#include <math.h>
#include <stdlib.h>

// The dimensions of the canvas (20 rows x 36 columns).
#define N_ROWS 20
#define N_COLS 36
// Shades (assuming your terminal has a black background).
#define BLACK 0
#define WHITE 4
//The command array length
#define COMMAND_LENGTH 10

// Print out the canvas.
void printCanvas(int canvas[N_ROWS][N_COLS]);
// Set the entire canvas to be blank.
void setBlankCanvas(int canvas[N_ROWS][N_COLS]);
//A function that will determine if the input was valid
int invalid(int type, int input[7], int length);
//Return the smallest number of two inputs
int findMin(int numOne, int numTwo);
//Return 1 if the later of two given numbers is the lowest
int isSecondTheLowest(int numOne, int numTwo);
//Check if a diagonal is valid to draw
int diagCheck(int startLength, int startBase, int endLength, int endBase);
//Check if the paste is valid
int pasteCheck(int rowLength, int colLength, int pasteRow, int pasteCol);

int main(void) {
    int canvas[N_ROWS][N_COLS] = {}, copy[N_ROWS][N_COLS] = {};
    int input[COMMAND_LENGTH] = {};
    int global = 1;
    int startRow = 0, endRow = 0, startCol = 0, endCol = 0;
    int shade = 0, cancel = 0, counter = 0;
    int largerRow = 0, largerCol = 0;
    //Setting copy canvas & normal canvas to blank
    setBlankCanvas(canvas);
    setBlankCanvas(copy);
    
    while (global == 1) {
        //Standard input of commands by user
        while (counter < 5 && cancel == 0) {
            global = scanf("%d ", &input[counter]);
            if (input[0] == 3) {
                cancel = 1;
                scanf("%d", &shade);
                if (shade == -1) {
                    shade = 4;
                }
            }
            counter++;
        }
        //Specifc extenstion of command length if copy paste is requested
        if (input[0] == 4 && cancel == 0) {
            while (counter < 7) {
                global = scanf("%d ", &input[counter]);    
                counter++;
            } 
        }
        //Testing of the command for any invalid ranges 
        //should they be given by the user
        if (input[0] != -1) {
            input[0] = invalid(input[0], input, counter);
        }
        
        //These if statemnts will determine which stage will run based on input
        //
        //Lines & diagonals. Stage One and Two
        //
        //This initialises the proper variables needed for stage one and two.
        if (input[0] == 1 || input[0] == 2) {
            startRow = input[1];
            endRow = input[3];
            startCol = input[2];
            endCol = input[4];
        }
        //This will notify the main line function of the nature of the
        //coordinates (if the end coordinates are smaller than the start...etc
        
        if (input[0] == 1) {
            largerRow = isSecondTheLowest(startRow, endRow);
            largerCol = isSecondTheLowest(startCol, endCol);
            input[0] = diagCheck(startRow, startCol, endRow, endCol);
        }
        //Main line if function
        //Works by printing from left to right (if larger is not applicable)
        //and vice versa if larger is true
        if (input[0] == 1) {
            int exit = 0;    
            while (exit == 0) {
                canvas[startRow][startCol] = shade;

                if (startRow > endRow && largerRow == 1) {
                    startRow--;
                } else if (startRow < endRow) {
                    startRow++;
                }
                
                if (startCol > endCol && largerCol == 1) {
                    startCol--;
                } else if (startCol < endCol) {
                    startCol++;
                }
                
                if (startCol == endCol && startRow == endRow) {
                    canvas[startRow][startCol] = shade;
                    exit = 1;
                }
            }
        }

        //Filled Rectangles. Stage 2
        //
        //Main rectangle if function
        //Works by determining the start and end corners of rectangle
        //and prints each line until corner is reached
        if (input[0] == 2) {
            int heightCnt = findMin(startRow, endRow);
            int printCnt = findMin(startCol, endCol);
            endRow = startRow + endRow - heightCnt;
            endCol = startCol + endCol - printCnt;
            //This will print the rectangle line by line
            while (heightCnt <= endRow) {
                while (printCnt <= endCol) {
                    canvas[heightCnt][printCnt] = shade;
                    printCnt++;
                }
                printCnt = startCol;
                heightCnt++;
            }
        }   
           
        //Copy and paste functions. Stage 3
        //
        //This determines the start and end of the copy.
        //It also checks if ranges are within the valid canvas limits
        if (input[0] == 4) {
            startRow = findMin(input[1], input[3]);
            startCol = findMin(input[2], input[4]);
            endRow = input[1] + input[3] - startRow;
            endCol = input[2] + input[4] - startCol;
            int rowDis = endRow - startRow;
            int colDis = endCol - startCol;
            //Range check
            input[0] = pasteCheck(rowDis, colDis, input[5], input[6]);  
        } 
        //Main if copy and paste function
        //This program will copy one section of the canvas onto a 'copy canvas'
        //that is then pasted onto the original canvas to retain integrity
        if (input[0] == 4) {
            int heightCnt = input[5];
            int printCnt = input[6];
            //cped = copied
            int cpedR = findMin(input[1], input[3]);
            int cpedC = findMin(input[2], input[4]);
            //Transfer from original canvas to 'copy canvas'
            while (cpedR <= endRow) {
                while (cpedC <= endCol) {
                    copy[heightCnt][printCnt] = canvas[cpedR][cpedC];
                    printCnt++;
                    cpedC++;
                }
                cpedC = findMin(input[2], input[4]);
                cpedR++;
                printCnt = input[6];
                heightCnt++;
            }
            //Final transfer from 'copy canvas' to original canvas
            cpedR = input[5];
            cpedC = input[6];
            endRow = abs(input[1] - input[3]) + input[5];
            endCol = abs(input[2] - input[4]) + input[6];
            while (cpedR <= endRow) {
                while (cpedC <= endCol) {
                    canvas[cpedR][cpedC] = copy[cpedR][cpedC];
                    cpedC++;
                }
                cpedC = input[6];
                cpedR++;
            }
        }       
        //Reset statements to ensure smooth rerun of the main function       
        input[0] = -1;
        counter = 0;
        cancel = 0;
    }
    printCanvas(canvas);
}

//Beginning of function signatures
//
//This function determines if the user inputs are within the valid canvas
//Returns -1 to void if invalid and will return original command otherwise
int invalid(int type, int input[7], int length) {
    int newType = 0;
    int check = 0;
    int counter = 0;
    while (counter < length) {
        check = input[counter];
        if (check < 0 || check > 35) {
            newType = -1;
        }
        counter++;
    }
    if (newType != -1) {
        newType = type;
    }
    return newType;
}

//Determines the lowest of two numbers via if statements
int findMin(int numOne, int numTwo) {
    int min = 0;
    
    if (numOne < numTwo) {
        min = numOne;
    } else {
        min = numTwo;
    }
    
    return min;
}

//Will return 1 if the later of two numbers is lower than the first
int isSecondTheLowest(int numOne, int numTwo) {
    int lowest = 0;
    if (numTwo < numOne) {
        lowest = 1;
    }
    return lowest;
}

//Determines validity of diagonal by determining if forms a square
//Returns -1 to void if invalid and will return original command otherwise
int diagCheck(int startLength, int startBase, int endLength, int endBase){
    int newType = 1;
    int normalLine = 0;
    int distance = 0;
    if (startLength == endLength || startBase == endBase) {
        newType = 1;
        normalLine = 1;
    }
    
    distance = abs(startLength - endLength) - abs(startBase - endBase);
    
    if (distance != 0 && normalLine == 0) {
        newType= -1;
    }
    
    return newType;
}

//Determines given range for paste is valid (within defined boundaries)
//Returns -1 to void if invalid and will return original command otherwise
int pasteCheck (int rowLength, int colLength, int pasteRow, int pasteCol) {
    int newType = 4;
    if ((rowLength + pasteRow) > 19) {
        newType = -1;    
    } else if ((colLength + pasteCol) > 35) {
        newType = -1;
    }
    return newType;
}

// Prints the canvas, by printing the integer value stored in
// each element of the 2-dimensional canvas array.
void printCanvas(int canvas[N_ROWS][N_COLS]) {
    int row = 0;
    while (row < N_ROWS) {
        int col = 0;
        while (col < N_COLS) {
            printf("%d ", canvas[row][col]);
            col++;
        }
        row++;
        printf("\n");
    }
}

// Sets the entire canvas to be blank, by setting each element in the
// 2-dimensional canvas array to be WHITE (which is #defined at the top
// of the file).
void setBlankCanvas(int canvas[N_ROWS][N_COLS]) {
    int row = 0;
    while (row < N_ROWS) {
        int col = 0;
        while (col < N_COLS) {
            canvas[row][col] = WHITE;
            col++;
        }
        row++;
    }
}
