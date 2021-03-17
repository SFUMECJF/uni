// Some useful array functions
// Created by
//  ... (z5258962)
//  ... (z0000000)
// Created on Aug 2019
// Tutor's name (day_hH-lab)

#include <stdio.h>
#include <assert.h>

#define SMALL_ARRAY 5
#define MEDIUM_ARRAY 20
#define LARGE_ARRAY 200

// Display useful facts about the array(changes the array)
void array_facts(int size, int array[]);

// Reading and showing arrays
void scan_array(int size, int array[]);
void show_array(int size, int array[]);

// Array functions without side effects
int array_max(int size, int array[]);
int array_min(int size, int array[]);
int array_sum(int size, int array[]);
int array_average(int size, int array[]);

// Changing the whole array
void array_add(int size, int array[], int num);
void array_scale(int size, int array[], int num);

int main(int argc, char *argv[]) {
    // Create an array with 5 elements.
    int array_a[SMALL_ARRAY] = {1, 2, 3, 4, 5};

    // Assert the min, max, and sum are what we expect.
    assert(array_min(SMALL_ARRAY, array_a) == 1);
    assert(array_max(SMALL_ARRAY, array_a) == 5);
    assert(array_sum(SMALL_ARRAY, array_a) == 15);
    assert(array_average(SMALL_ARRAY, array_a) == 3);

    // Add 1 to all of the values in the array.
    array_add(SMALL_ARRAY, array_a, 1);

    // Check the min/max/sum/average again.
    assert(array_min(SMALL_ARRAY, array_a) == 2);
    assert(array_max(SMALL_ARRAY, array_a) == 6);
    assert(array_sum(SMALL_ARRAY, array_a) == 20);
    assert(array_average(SMALL_ARRAY, array_a) == 4);

    // Create a medium-sized array to perform more unit tests.
    int array_b[MEDIUM_ARRAY] = {0};
    int b = 0;
    while (b < MEDIUM_ARRAY) {
        array_b[b] = b * b;
        b = b + 1;
    }

    // Check that the min/max/sum/average are what we'd expect.
    assert(array_min(MEDIUM_ARRAY, array_b) == 0);
    assert(array_max(MEDIUM_ARRAY, array_b) == 361);
    assert(array_sum(MEDIUM_ARRAY, array_b) == 2470);
    assert(array_average(MEDIUM_ARRAY, array_b) == 123);

    // Scale the array by -2, and then re-check the min/max/sum/average.
    array_scale(MEDIUM_ARRAY, array_b, -2);
    assert(array_min(MEDIUM_ARRAY, array_b) == -722);
    assert(array_max(MEDIUM_ARRAY, array_b) == 0);
    assert(array_sum(MEDIUM_ARRAY, array_b) == -4940);
    assert(array_average(MEDIUM_ARRAY, array_b) == -247);

    // Test an array with manual values
    int manual_array[MEDIUM_ARRAY] = {0};
    scan_array(MEDIUM_ARRAY, manual_array);
    array_facts(MEDIUM_ARRAY, manual_array);

    printf("All tests passed. You are Awesome!");

    return 0;
}

// Display some useful facts about an array.
// NOTE: this will change the array that is used.
void array_facts(int size, int array[]) {
    printf("The largest value in the array is %d\n",
            array_max(size, array));
    printf("The smallest value in the array is %d\n",
            array_min(size, array));
    printf("The sum of all values in the array is %d\n",
            array_sum(size, array));
    printf("The average value in the array is %d\n",
            array_average(size, array));

    int s = 0;
    while (s < 5) {
        printf("The array with %d added to all elements:\n", s);
        array_add(size, array, s);
        show_array(size, array);
        s = s + 1;
    }

    printf("The array with 10 subtracted from all elements:\n");
    array_add(size, array, -10);
    show_array(size, array);

    int m = 1;
    while (m <= 5) {
        printf("The array with all elements multiplied by %d:\n", m);
        array_scale(size, array, m);
        show_array(size, array);
        m = m + 1;
    }
}

// Read values from the screen, and store the values in an array.
void scan_array(int size, int array[]) {
    printf("Enter %d numbers: ", size);
    int scan = 1;
    int counter = 0;
    
    while (scan == 1) {
        scan = scanf("%d", &array[counter]);
        counter++;
    }
}

// Show an array on the screen.
// This should look like [0, 1, 2, 3, 4, 5]
void show_array(int size, int array[]) {
    int counter = 0;
    printf("[");
    while (counter < size - 1) {
        printf("%d, ", array[counter]);
        counter++;
    }
    printf("%d]\n", array[counter]);
}

// Return the largest value in an array.
int array_max(int size, int array[]) {
    int max = 0;
    int counter = 0;
    while (counter < size) {
        if (array[counter] > max) {
            max = array[counter];
        }
        counter++;
    }
    return max;
}

// Return the smallest value in the array.
int array_min(int size, int array[]) {
    int min = array[0];
    int counter = 1;
    while (counter < size) {
        if (array[counter] < min) {
            min = array[counter];
        }
        counter++;
    }
    return min;
}

// Return the sum of all values in the array.
int array_sum(int size, int array[]) {
    int counter = 0;
    int total = 0;
    while (counter < size) {
        total += array[counter];
        counter++;
    }
    return total;
}

// Return the average of all values in the array.
int array_average(int size, int array[]) {
    int counter = 0;
    int total = 0;
    double average = 0;
    while (counter < size) {
        total += array[counter];
        counter++;
    }
    average = total / size;
    
    return average;
}

// Add `num` to all values in the array.
void array_add(int size, int array[], int num) {
    int counter = 0;
    while (counter < size) {
        array[counter] += num;
        counter++;
    }
}

// Multiply all values in the array by num.
void array_scale(int size, int array[], int num) {
    int counter = 0;
    while (counter < size) {
        array[counter] *= num;
        counter++;
    }
}
