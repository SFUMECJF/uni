//This program will read 3 integers and print them from smallest to largest
//Not permitted to use if statements & loops & calls other than prinf and scanf
//Not permitted to use printf & assign variables inside expressions 
//Not permitted to use define functions
//John Dao z5258962 21/06/2019
/*
This program will utilise a general program I have developed that will determine
the highest number between two unknowns. It relies on the idea that if a statement 
is true within a mathematical statement replaced by such unknowns, the c program 
will autotomatically define the value of it as 1 or 0 representative of 
true and false. 

The program is shown below;
    
    result = ((numOne > numTwo) * (numOne) +  (numTwo > numOne) * (numTwo)) + 
    (numOne == numTwo) * numOne;
    
As implied, the two unknown integers will replace numOne and numTwo respectively

NOTE THAT In this program, integers 'a', 'b' and 'c', were used knowingly 
against recommendation to allow the reduction of character use.
*/



#include <stdio.h>
int main (void) {
    //3 main inputs
    int a;
    int b;
    int c;
    //Requesting 1st and second inputs
    printf("Enter integer: ");
    scanf("%d", &a);
    printf("Enter integer: ");
    scanf("%d", &b);
    //Finding the minimum of 'a' and 'b', setting 'c' and 'a' as current minimum 
    //and maxium respectively. This renders 'b' as a number that needs to be
    //re-established as 'b' could end up being equal to 'a'.
    c = (a + b) - ((a > b) * (a) +  (b > a) * (b) + (a == b) * a);
    a = (a > b) * (a) +  (b > a) * (b) + (a == b) * a;
    //This insert integer requests a new input to replace the now
    //useless 'b'.
    printf("Enter integer: ");
    scanf("%d", &b);
    //Printing of the prestatement
    printf("The integers in order are : ");
    //Printing the smallest value between c, the smallest of the initial 2 #,
    //and the new number 'b',
    printf ("%d ", (b + c) - ((b > c) * (b) +  (c > b) * (c) + (b == c) * b));
    //This calculates the largest number between c and b and ensures that 
    //the lowest number is eliminated from the equation from then on.
    b = ((c > b) * (c) +  (b > c) * (b) + (c == b) * c);
    //This prints what number is in the middle of the presumed highest numbers
    //'a' and 'b'.
    printf("%d ", (a + b) - ((a > b) * (a) +  (b > a) * (b) + (a == b) * a));
    //This prints out the overall max and prints it out as the last number of
    //the order.
    printf("%d\n", ((a > b) * (a) +  (b > a) * (b) + (a == b) * a));
    
    return 0;
}
