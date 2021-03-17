//This is a program that ramdomly tests functions that i have learned
//John Dao z5258962

#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <math.h>
#include <assert.h>

int main (void) {
    int size;
    int counter = 0;
    printf("Enter a size of array: ");
    scanf("%d", &size);

    
    int *array = malloc(sizeof(int) * size);
    if (array == NULL) {
        printf("unable to allocate memory\n");
        return 1;
    }    
    
    while (counter < size) {
        printf("Enter a number to place in array: ");
        scanf("%d", &array[counter]);
        counter++;
    }
    
    counter = 0;
    
    while (counter < size) {
        printf("Number %d in the array is %d\n", counter, array[counter]);
        counter++;
    }
    
    free(array);
    return 0;
       
    
}
