//This program prints all positive integers divisible by 3 or 5 within a given
//range input by the user.
//John Dao z5258962 21/06/2019

#include <stdio.h>
int main (void) {
    //introduces counter & counter limit
    int limit;
    int counter = 1;
    //Requests user i nput of counter limit
    printf("Enter number: ");
    scanf("%d", &limit);
    
    while (limit > counter) {
        //Separating the integers divisible by 3 or 5
        int div3;
        int div5;
        div3 = counter % 3;
        div5 = counter % 5;
        //Printing out the numbers if the counter is in fact divisible by 3 or 5
        if (div3 == 0) {
            printf("%d\n", counter);
        } else if (div5 == 0) {
            printf("%d\n", counter);
        }
        counter = counter + 1;
    }
    return 0;
}
