/*This programs reads 3 numbers and indicates whether they are strictly or 
  decreasing
*/
//John Dao z5258962 24/06/2019

#include <stdio.h>
int main (void) {
    //introducing the three integers (doubles)
    double numOne;
    double numTwo;
    double numThree;
    //Requesting and scanning input from user
    printf("Please enter three numbers: ");
    scanf("%lf %lf %lf", &numOne, &numTwo, &numThree);
    //Using ifs to print the correct statement based on the order
    //Main 'else if' statements will contain only outputs of 'up' or 'down'
    if (numOne > numTwo && numTwo > numThree) {
        printf("down\n");
    } else if (numOne <numTwo && numTwo < numThree) {
        printf("up\n");
    } else {
        printf("neither\n");
    }

    return 0;
}
