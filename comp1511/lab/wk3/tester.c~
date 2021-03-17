//This program will read 3 integers and print them from smallest to largest
//Not permitted to use if statements & loops & calls other than prinf and scanf
//Not permitted to use printf & assign variables inside expressions 
//Not permitted to use define functions
//
//John Dao z5258962 21/06/2019

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
    /*
      Now finding the overall minimum of the three, this keeps c as a minimum
      Note that we can print numbers our individually, not just all at once.
      This is demonstrated with the reuse of 'c' as the printed variable as it
      is being constantly redefined. 
    */
    printf ("%d ",(b + c) - ((b > c) * (b) +  (c > b) * (c) + (b == c) * b));
    //This finds what number is in the middle of the presumed highest numbers
    //'a' and 'b'.
    b = ((c > b) * (c) +  (b > c) * (b) + (c == b) * c);
    printf("%d ", (a + b) - ((a > b) * (a) +  (b > a) * (b) + (a == b) * a));
    //This finds out the overall max and prints it out as the last number of
    //the order.
    printf("%d\n", ((a > b) * (a) +  (b > a) * (b) + (a == b) * a));
    
    return 0;
}
