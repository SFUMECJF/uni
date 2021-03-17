//This program if read in a size and display a Danish flag of that size
//This program will also adjust the size of the danish flag in ratio of 
//the users input
//John Dao z5258962 25/06/2019

#include <stdio.h>
int main (void) {
    int input;
    
    //Standard input and scan of user
    printf("Enter the flag size: ");
    scanf ("%d", &input);
    

    int line = -1 + (3 * input);
    int height = -1 + (2 * input);  
    int second_line = (6 * input) - 1;
    int middle = line + second_line + 2;
    int counter = 1;
    int global = 0;
    
    //This first while function allows the below function to run
    //twice. The below function prints one half of the flag     
    while (global <= 1) {
        //This while prints the first block in ratio given by input
        while (counter <= height) {
            //Printing the first block & space in the half
            int linecount = 0;
            while (linecount <= line) {
                if (linecount < line) {
                    printf("#");
                }
                if (linecount == line ) {
                    printf("  ");
                }
                linecount++;
            }
            //Printing the second block of the half
            int second_half = 0;
            while (second_half <= second_line) {
                if (second_half < second_line) {
                    printf("#");
                }
                second_half++;
                
            }
            
            
            if (global <= 1) {
                printf("\n");
            }
            
            counter++;
        }
        
        //This prints out the space between the lines once
        
        if (global == 0) {
            int twoWhite = 1;
            while (twoWhite <= 2) {
                int white_count = 0;
                while (white_count <= middle) {
                    if (white_count <= middle) {
                        printf(" ");
                    }
                    
                    if (white_count == middle) {
                        printf("\n");
                    }
                    white_count++;
                }
                twoWhite++;
            }   
        }
        counter = 1;
        global++;
    }
    
    return 0;
}
