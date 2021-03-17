//This program will print a hollow triangle based on the input given by the user
//John Dao z5258962 28/06/2019

#include <stdio.h>

int main (void) {
    int input;
    
    //This will ask for user input of the triangle
    printf("Enter size: ");
    scanf("%d", &input);
    
    //This prints the first two lines whos results will always be the same
    printf("*\n**\n");
    
    int counter = 1;
    
    //This will only run with parts that include the middle
    while(counter <= (input - 3) && input != 3) {
        int clmb = 1;
        
        //This will print out the starting asterix
        printf("*");
        
        while (clmb <= (input - 3) && clmb <= (counter)) {
            printf(" ");
            clmb++;
        }
    
        //This prints out the ending space
        printf("*\n");
        
        counter++;
        clmb = 1;
    }        
    
    //This prints the last line of the triangle which will aways not
    //contain hollow parts
    int bottom = 0;
    while (bottom < (input)) {
        printf("*");
        bottom++;
    }            
    
    //The endspace is printed here
    printf("\n");
    
     
    return 0;
}
