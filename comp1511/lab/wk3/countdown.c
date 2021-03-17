//This program counts down the numbers from 1 to 17
//John Dao z5258962 21/6/2019

#include <stdio.h>
int main (void) {
    //introduces counter as #1
    int counter = 10;
    //Loop up to 17
    while (counter >= 0) {
        //Print statement
        printf("%d\n", counter);
        counter = counter - 1;
    }

    return 0;
}
