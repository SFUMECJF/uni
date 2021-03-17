//This program reorders 3 random numbers and prints out the accendind order
//John Dao z5258962

#include <stdio.h>
int main (void) {
    int numOne;
    int numTwo;
    int numThree;
    //Scans of the three numbers
    printf("Enter integer: ");
    scanf("%d", &numOne);

    printf("Enter integer: ");
    scanf("%d", &numTwo);
    
    printf("Enter integer: ");
    scanf("%d", &numThree);
    
    //Printing out 3 outcomes of orders numOne, numTwo and numThree
    if (numOne > numTwo && numTwo > numThree) {
        printf("The integers in order are: %d %d %d\n", numThree, numTwo, numOne);
    } else if (numOne > numThree && numTwo < numThree) {
        printf("The integers in order are: %d %d %d\n", numTwo, numThree, numOne);
    } else if (numOne < numTwo && numOne > numThree) {
        printf("The integers in order are: %d %d %d\n", numThree, numOne, numTwo);
    } else if (numOne < numTwo && numTwo < numThree) {
        printf("The integers in order are: %d %d %d\n", numOne, numTwo, numThree);
    } else if (numOne == numTwo && numTwo < numThree) {
        printf("The integers in order are: %d %d %d\n", numOne, numTwo, numThree);
    } else if (numOne == numTwo && numTwo > numThree) {
        printf("The integers in order are: %d %d %d\n", numThree, numOne, numTwo);
    } else if (numOne == numThree && numTwo > numThree) {
        printf("The integers in order are: %d %d %d\n", numOne, numThree, numTwo);
    } else if (numOne == numThree && numTwo < numThree) {
        printf("The integers in order are: %d %d %d\n", numTwo, numOne, numThree);
    } else if (numTwo == numThree && numTwo < numOne) {
        printf("The integers in order are: %d %d %d\n", numTwo, numThree, numOne);
    } else if (numTwo == numThree && numTwo > numOne) {
        printf("The integers in order are: %d %d %d\n", numOne, numTwo, numThree);
    } else if (numTwo == numThree && numTwo == numOne) {
        printf("The integers in order are: %d %d %d\n", numOne, numTwo, numThree);
    } else if (numOne < numThree && numOne > numTwo) {
        printf("The integers in order are: %d %d %d\n", numTwo, numOne, numThree);
    } else if (numOne < numTwo && numTwo > numThree) {
        printf("The integers in order are: %d %d %d\n", numOne, numThree, numTwo);
    }
     else {
        printf("ERROR");
    }


    return 0;
}
