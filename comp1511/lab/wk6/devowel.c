//This program will read a character from its input and 
//rewrite the string with its vowels removed
//John Dao z5258962 July 2019

#include <stdio.h>
#include <string.h>

int is_vowel (int ltr);

int main (void) {
    int proceed = 1;
    int sequence = 0;
    while (proceed == 1) {
        sequence = getchar();
        if (sequence == -1) {
            proceed = 0;
        }
        if (is_vowel(sequence) == 0) {
            putchar(sequence);
        }
    }
    
    return 0;
}

int is_vowel (int ltr) {
    if (ltr == 'a' || ltr == 'e' || ltr == 'i' || ltr == 'o' || ltr == 'u') {
        return 1;
    } else if (ltr == -1) {
        return 1;
    } else {
        return 0;
    }

}
