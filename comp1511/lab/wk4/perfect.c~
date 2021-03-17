//This program reads a positive integer n from standard input and prints
//all the factors of n, their sum and if indicates if n is a perfect number
//A perfect number is a positve integer that is equal to the sum of its
//positive divisors
//John Dao z5258962 25/06/2019

#include <stdio.h>
int main (void) {
    int input;
    int array[10000] = {};
    
    //Asks for and scans user input
    printf("Enter number: ");
    scanf("%d", &input);    
    
    //Printing out prestatement
    printf("The factors of %d are: \n", input);
    
    //This assigns a value for the array from 0 to 9999
    int counter = 1;
    int values = 0;
    while (counter <= 10000) {
        array[values] = counter;
        counter++;
        values++;
    }
    
    //This sorts the input with the array and prints out any factors
    //It also adds the sum of the factors
    int sort = 0;
    int perfect = 0;
    while (sort <= 9999) {
        int factor;
        factor = input % array[sort];
        if (factor == 0) {
            printf("%d\n", array[sort]);
            perfect = perfect + array[sort];
        }         
        sort++;
    }
     
    //Printing out the sum of all factors
    printf("Sum of factors = %d\n", perfect);
    
    //This prints out whether the input is a perfect number
    if (perfect == input || perfect/2 == input) {
        printf("%d is a perfect number\n", input);
    } else {
        printf("%d is not a perfect number\n", input);
    }
    
    return 0;
}
