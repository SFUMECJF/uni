//This program will read characters from its input and write the same character
//but will convert lower case to higher case and vice versa
//John Dao z5258962 July 2019

#include <stdio.h>
#include <string.h>

int swap_cases(int ltr);

int main (void) {
    int proceed = 1;
    int ltr = 0;
    int newltr = 0;
    while (proceed == 1) {
        ltr = getchar();
        newltr = swap_cases(ltr);
        if (newltr != 0) {
            putchar(newltr);
        }
        if (ltr == -1) {
            proceed = 0;
        }
    }
    
    return 0;
}

int swap_cases(int ltr) {
    int position = 0;
    
    if (ltr >= 'a' && ltr <= 'z') {
        position = 65 + (ltr - 'a');
    } else if (ltr >= 'A' && ltr <= 'Z') {
        position = (ltr - 'A') + 97;
    } else if (ltr == -1) {
        position = 0;
    } else {
        position = ltr;
    }
    
    return position;
}
