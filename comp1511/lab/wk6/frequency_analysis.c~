//This program will analyse the string of letters and print out the occurence 
//For each of the 26 letters 'a'..'z'
//John Dao z5258962 July 2019

#include <stdio.h>
#include <string.h>

int letter_to_number(int ltr);

int main (void) {
    int input[1000] = {};
    double frequency[27] = {};
    int conv = 0;
    double result = 0;
    int counter = 0;
    double amount = 0;
    int proceed = 1;
    int checker = 0;

    while (proceed == 1) {
        input[counter] = getchar();
        checker = input[counter];
        conv = letter_to_number(input[counter]);
        frequency[conv] += 1;
        counter++;
        if (checker == -1) {
            proceed = 0;
        }
    }
    amount = counter - frequency[26];
    counter = 0;
    
    while (counter < 26) {
        int letter = 'a' + counter;
        result = frequency[counter] / amount;
        printf("'%c' %lf %.0lf\n",letter, result ,frequency[counter]);  
        counter++;
    }
    return 0;
}

int letter_to_number(int ltr) {
    int conv = 0;
    if (ltr >= 'a' && ltr <= 'z') {
        conv = ltr - 'a';
    } else if (ltr >= 'A' && ltr <= 'Z') {
        conv = ltr - 'A';
    } else {
        conv = 26;
    }
    return conv;
}
        
