//This program will add two numbers together until the user requests the
//program to cease
//John Dao z5258962 July 2019

#include <stdio.h>

int main (void) {
    int numOne;
    int numTwo;
    int result;
    int proceed = 1;
    
    while (proceed == 1) {
        proceed = scanf("%d", &numOne);
        proceed = scanf("%d", &numTwo);
        
        if (proceed == 0) {
            return 
        }
        
        result = numOne + numTwo;
        printf("%d\n", result);
        numOne = 0;
        numTwo = 0;
    }
    return 0;
    
    
}
