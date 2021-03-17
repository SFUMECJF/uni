//This program will read read a positive integer, print a permutation
//That minimises the eucidean distance and print that euclidean distance
//This will all be based on the user's input
//John Dao z5258962 04/07/2019

#include <stdio.h>
#include <math.h>

double distance (int length, int vector1[length], int vector2[length]);

int main(void) {
    int length;
    int vector1[999] = {};
    int vector2[999] = {};
    int perm [999] = {};
    int counter = 0;
    int result[999] = {};
    //Req & scan vector length
    printf("Enter vector length: ");
    scanf("%d", &length);
    
    //Req & scan vectors
    printf("Enter vector1: ");
    while (counter < length) {
        scanf("%d", &vector1[counter]);
        counter++;
    }

    counter = 0;
    
    printf("Enter vector2: ");
    while (counter < length) {
        scanf("%d", &vector2[counter]);
        counter++;
    }
    
    counter = 0;
    
    //Req & scan optimal permutation
    printf("Optimal permutation: ");
    while (counter < length) {
        scanf("%d", &perm[counter])     ;
        counter++;
    }
    
    counter = 0;
    
    //Resorts the vector by position into a new array
    while (counter < length) {
        int exit = 0;
        int sorter = 0;
        while (exit == 0 && sorter < length) {
            if (perm[sorter] == counter) {
                result[sorter] = vector1[counter];
                exit++;
            }
            sorter++;   
        }
        
        counter++;
    }
    printf("\n");
    printf("Euclidean distance = %lf\n", distance(length, result, vector2));
    return 0;
}

//This function will calculate the Eulidean distance with vector2 and vector1
//which has gone through permutation

double distance (int length, int array1[length], int array2[length]) {
    double distance;
    int counter = 0;
    int sum = 0;
        
    while (counter < length) {
        sum += (array1[counter] - array2[counter]) * (array1[counter] - array2[counter]);
        counter++;
    }
    
    distance = sqrt(sum);

    return distance;
}

