//This program will print a pattern of stericks in the shape on an "l"
//based on the input size given by the user
//John Dao z5258962 28/06/2019

#include <stdio.h>
int main (void) {
    int size;
    
    //Requesting size input from user
    printf("Enter size: ");
    scanf("%d", &size);
    
    //This will loop will print the straight line
    int counter = 0;
    
    while (counter <= size) {
        int bottom = 0;
        //This prints the main down line of the 'l' minus the last row
        if (counter < (size - 1)){
            printf("*\n");
        }
        
        //This line will print out the end of the 'l' when the counter reaches
        //the size of the input given
        if (counter == size) {
            while (bottom < size) {
                printf("*");
                bottom++;
            }        
        }
        
        counter++;
    }
    
    //This will print the ending space
    printf("\n");
    
    return 0;
}

