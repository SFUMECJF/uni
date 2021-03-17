//Numbers to words
//John Dao z5258962 11/06/2019

#include <stdio.h>

int main (void){
    int n;
    printf("Please enter an integer: ");
    scanf("%d", &n);
    if (n == 1) {
        printf("You entered one. \n");
    }   else if (n == 2) {
        printf("You entered two. \n");
    }   else if (n == 3) {
        printf("You entered three. \n");
    }   else if (n == 4) {
        printf("You entered four. \n");
    }   else if (n == 5) {
        printf("You entered five. \n");
    }   else if (n < 1) {
        printf("You entered a number less than one. \n");
    }   else{
        printf("You entered a number greater than five. \n");
    }        
    
    
    return 0;
}
