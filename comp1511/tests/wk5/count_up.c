//This program will count up from ranges given by the user
//John Dao z5258962 July 2019

#include <stdio.h>

int main (void) {
    int lower = 0;
    int upper = 0;
    int counter = 0;
    
    //Requests user inputs of lower and upper limits
    printf("Enter lower: ");
    scanf("%d", &lower);
    
    counter = lower + 1;
    
    printf("Enter upper: ");
    scanf("%d", &upper);
    
    while (counter < upper) {
        printf("%d\n", counter);
        counter++;
    }

    return 0;
}
