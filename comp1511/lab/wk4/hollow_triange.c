//This program will print a hollow triangle based on the input given by the user
//John Dao z5258962 28/06/2019

#include <stdio.h>

int main (void) {
    int input;
    
    //This will ask for user input of the triangle
    printf("Enter size: ");
    scanf("%d", &input);
    
    printf("*\n**\n");
    
    int counter = 1;
    
    while(counter <= (input - 3) && input != 3) {
        int clmb = 1;
            
        printf("*");
        
        while (clmb <= (input - 3) && clmb <= (counter)) {
            printf(" ");
            clmb++;
        }
    
        printf("*\n");
        
        counter++;
        clmb = 1;
        
        
    }        
  
    int bottom = 0;
    while (bottom < (input)) {
        printf("*");
        bottom++;
    }            
    
    printf("\n");
    
     
    return 0;
}
