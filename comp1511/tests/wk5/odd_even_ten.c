//This program will scan 10 numbers given by user and output the odd and
//even numbers
//John Dao z5258962 July 2019

#include <stdio.h>

int main (void) {
    int input[10] = {};
    int odd[10] = {};
    int oddcounter = 0;
    int evencounter = 0;
    int even[10] = {};
    int check = 0;
    int counter = 0;
    
    while (counter < 10) {
        scanf("%d", &input[counter]);
        check = input[counter] % 2;
        if (check == 0) {
            even[evencounter] = input[counter];
            evencounter++;
        } else {
            odd[oddcounter] = input[counter];
            oddcounter++;
        }
        counter++;
    }
    
    counter = 0;
    printf("Odd numbers were: ");
    while (counter < oddcounter) {
        printf("%d ", odd[counter]);
        counter++;
    }
    counter = 0;
    printf("\nEven numbers were: ");
    while (counter < evencounter) {
        printf("%d ", even[counter]);
        counter++;
    }
    printf("\n");
    return 0;
}

