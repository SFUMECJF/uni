// Find and print the first, middle, and last elements of an array.
// Created by
//  ... (z5258962)
//  ... (z0000000)
// Created on August 2019
// Tutor's name (dayHH-lab)

#include <stdio.h>
#include <stdlib.h>

#define MAX_LENGTH 1024

void print_first_middle_last(int size, int array[MAX_LENGTH]);

// DO NOT CHANGE THIS MAIN FUNCTION
int main(int argc, char *argv[]) {
    // Get the array size.
    int size;
    printf("Enter array size: ");
    scanf("%d", &size);

    // Declare the array.
    int array[MAX_LENGTH];

    printf("Enter array values: ");
    // Intialise the array values.
    int i = 0;
    while (i < size) {
        scanf("%d", &array[i]);
        i = i + 1;
    }

    print_first_middle_last(size, array);

    return 0;
}

// Print the first, middle, and last values of an array,
// on separate lines.
void print_first_middle_last(int size, int array[MAX_LENGTH]) {
    int oddOrEven = 0;
    int ERROR = 0;
    oddOrEven = size % 2;
    
    
    if (size == 1) {
        printf("%d\n%d\n%d\n", array[0], array[0], array[0]);
        ERROR = 1;
    } else if (size == 2) {
        printf("%d\n%d\n%d\n", array[0], array[1], array[1]);
        ERROR = 1;
    } else if (size == 3) {
        printf("%d\n%d\n%d\n", array[0], array[1], array[2]);
        ERROR = 1;
    }
    
    if (ERROR == 0) {
        if (oddOrEven == 0) {
            printf("%d\n", array[0]);
            printf("%d\n", array[size/2 + 1]);
            printf("%d\n", array[size-1]);
        } else if (oddOrEven > 0) {
            int odded = (size - 1) / 2;
            printf("%d\n", array[0]);
            printf("%d\n", array[odded]);  
            printf("%d\n", array[size-1]);  
        }
    }
 
}
