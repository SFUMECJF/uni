//This program will print all ASCII integers from 0-31
//John Dao z5258962

#include <stdio.h>
#include <string.h>


int main (void) {
    int output = 32;
    int counter = 32;
    
    while (counter < 127) {
        printf("%d 0x%x %c", counter, output, output);
        
//        putchar(output);
        printf("\n");
        counter++;
        output++;
    }       
    
}

