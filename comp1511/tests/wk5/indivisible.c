//This program reads number inputs from the user and outputs the numbers
//that are indivisible
//John Dao z5258962 July 2019

#include <stdio.h>

int indiv_check (int checked, int length, int input[length]); 

int main (void) {
    int length;
    int input[1000] = {};
    int indivs[1000] = {};
    int proceed = 1;
    int counter = 0;
    int indiv = 0;
    int indivctr = 0;
    while (proceed == 1) {
        proceed = scanf("%d", &input[counter]);
        counter++;
    }
    
    length = counter - 1;
    counter = 0;
    
    while(counter < length) {
        indiv = indiv_check(input[counter], length, input); 
        if (indiv == 1) {
            indivs[indivctr] = input[counter];
            indivctr++;
        
        }
        counter++;
    }
    
    counter = 0;
    
    printf("Indivisible numbers: ");

    while (counter < indivctr) {
        printf("%d ", indivs[counter]);
        counter++;
    }
    
    printf("\n");
    
    return 0;
}

int indiv_check(int checked, int length, int input[length]) {
    int result = 1;
    int counter = 0;
    int checker = 0;
    while (counter < length) {
        if (checked > input[counter]) {
            checker = checked % input[counter];
            if (checker == 0) {
                result = 0;
            }
        }
        counter++;
        
    }
    return result;
}
