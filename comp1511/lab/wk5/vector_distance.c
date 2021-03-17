//This program will compute and print the euclidean distance between
//two vectors
//John Dao z5258962 02/07/2019 

#include <stdio.h>
#include <math.h>



int main(void) {
    int length;
    int counter = 0;
    int array1[1001] = {0};
    int array2[1001] = {0};
    
    printf("Enter vector length: ");
    scanf("%d", &length);
    
    printf("Enter vector 1: ");
    
    while (counter < length) {
        scanf("%d", &array1[counter]);
        counter++;
    }
    
    counter = 0;
    
    printf("Enter vector 2: ");
    
    while (counter < length) {
        scanf("%d", &array2[counter]);
        counter++;       
    }
    
    
    counter = 0;
    int sum = 0;
    while (counter < length) {
        sum += (array1[counter] - array2[counter]) * (array1[counter] - array2[counter]);
        counter++;
    }
    
    double distance = sqrt(sum);
    
    printf("Euclidean distance = %lf\n", distance);
    return 0;
}



