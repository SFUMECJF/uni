//This program will read 3 integers one by one and print the middle integer
//John Dao z5258962 28/06/2019 

#include <stdio.h>
int main (void) {
    int numOne;
    int numTwo;
    int numThree;
    int box = 0;
    
    //Requests and scans the user's input number
    printf("Enter integer: ");
    scanf("%d", &numOne);
    
    printf("Enter integer: ");
    scanf("%d", &numTwo);
    
    printf("Enter integer: ");
    scanf("%d", &numThree);
    
    
    if (numOne < numTwo) {
        box = numTwo;
    } else if (numOne > numTwo) {
        box = numOne;
        numOne = numTwo;
    } else {
        box = numOne;
    }
    
    if (numThree < box) {
        numTwo = numThree;
        box = numThree;
    } else {
        numTwo = box;
    }
    
    if (numTwo < numOne) {
        box = numOne;
        numTwo = numOne;
        numTwo = box;
    }
    printf ("Middle: %d\n", numTwo);

    return 0; 
}
