//This program will read integers line by line and when it reaches the end 
//of input, it will print does integers in reverse order line by line
//John Dao z5258962 25/06/2019

#include <stdio.h>
int main (void) {
    int array[100] = {};
    int check_in = 1;
    int counter = 0;
    printf ("Enter numbers forwards: \n");
    while (counter <= 100 && check_in == 1) {
        check_in = scanf("%d", &array[counter]);
        if (check_in == 1) {
            counter++;
    
        }
                
    }
    
    printf("Reversed: \n");
    
    int reverse = counter - 1;
    while (reverse >= 0) {
        printf("%d\n", array[reverse]);
        reverse--; 
    }
         

    return 0;
}


