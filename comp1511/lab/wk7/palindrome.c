//This program will read the same strihg forwards and backwards 
//and will return if the string is a palindrome or not

#include <stdio.h>
#include <string.h>
#include <stdlib.h>

int palindromeCheck(int length, char input[length], char reverseInput[length]);

int main (void) {
    char reverseInput[4096] = {};
    char input[4096] = {};
    int counter = 0, reverseCounter = 0, length = 0;
    int proceed = 1;
    printf("Enter a string: ");
    while (proceed == 1) {
        input[counter] = getchar();
        if (input[counter] == '\n' || input[counter] == EOF) {
            proceed = 0;
        }
        counter++;
        
    }
    length = counter;
    reverseCounter = counter - 1;
    counter = 0;
    
    while (counter < length) {
        reverseInput[counter] = input[reverseCounter];
        counter++;
        reverseCounter = reverseCounter - 1;
    }
    

    if (palindromeCheck(length, input, reverseInput) == 1) {
        printf("String is a palindrome\n");
    } else {
        printf("String is not a palindrome\n");
    }
    
    return 0;
}

int palindromeCheck(int length, char input[length], char reverseInput[length]) {
    int counter = 0;
    int reverseCounter = 1;
    int palindrome = 1;
    while (counter < length - 1) {
        if (input[counter] != reverseInput[reverseCounter]) {
            palindrome = 0;
        }
        counter++;
        reverseCounter++;
    }
    
    return palindrome;

}

