//This is me testing out how to use atoi & argv
//John Dao july 2019

#include <stdio.h>
#include <string.h>
#include <stdlib.h>

int main (int argc, char * argv[]) {
    int ltrToNumber  = 0;
    ltrToNumber = atoi(argv[1]);
    printf("%c\n", ltrToNumber);
    
    return 0;
}

