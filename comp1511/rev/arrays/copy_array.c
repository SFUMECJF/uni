// Copy an array.
//  ... (z0000000)
// Created on 2019-??-??
// Tutor's name (day_hH-lab)

#include <stdio.h>
#include <assert.h>

#define MAX_SIZE 1000

void scan_array(int size, int array[size]);
void show_array(int size, int array[size]);
void copy_array(int size, int from_array[size], int to_array[size]);

// DO NOT CHANGE THIS MAIN FUNCITON
int main(int argc, char *argv[]) {

    // Create the arrays.
    int array1[MAX_SIZE];
    int array2[MAX_SIZE];

    // Get the array size.
    int size;
    printf("Enter array size: ");
    assert(scanf("%d", &size) == 1);
    assert(size > 0);

    // Scan in the values for the array.
    printf("Enter array values: ");
    scan_array(size, array1);

    // Print the values of the first array.
    show_array(size, array1);

    // Copy the values from array1 to array2.
    copy_array(size, array1, array2);

    // Print the copied values.
    show_array(size, array2);

    return 0;
}

// Copy `size` elements from `from_array` into `to_array`.
void copy_array(int size, int from_array[size], int to_array[size]) {
    int counter = 0;
    
    while (counter < size) {
        to_array[counter] = from_array[counter];
        counter++;
    }
}


// This function reads in values from standard input into an array.
void scan_array(int size, int array[size]) {
    int scan = 1;
    int counter = 0;
    
    while (scan == 1) {
        scan = scanf("%d", &array[counter]);
        counter++;
    }
}

// This function prints the array in the format
// [1, 2, 3, ...]
void show_array(int size, int array[size]) {
    int counter = 0;
    printf("[ ");
    while (counter < size - 1) {
        printf("%d, ", array[counter]);
        counter++;
    }
    printf("%d]\n", array[counter]);
}
