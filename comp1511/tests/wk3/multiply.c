//This program reads 2 integers and prints their absolute multiple
//John Dao z5258962 24/06/2019

#include <stdio.h>
int main (void) {
    //Introducing the two integers and result
    int numOne;
    int numTwo;
    int result;
    //Test example does not ask user for input so will go straight to scaning
    scanf("%d %d", &numOne, &numTwo);
    //Basic multiplication of two integers
    result = numOne * numTwo;
    //Printing resulting multiplication with result of 0 printing "zero"
    if (result == 0) {
        printf("zero\n");
    } else if (result < 0) {
        //ensuring that the result is printed as an absolute if negative
        
        result = -1 * result;
        printf("%d\n", result);
    } else {
        printf ("%d\n", result);
    }
    
    return 0;
}
