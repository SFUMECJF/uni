//This program will reorder a set of integers inputed to the permutation
//given by the user
//John Dao z5258962 02/07/2019

#include <stdio.h>

int error(int length, int perms[length]);

int main(void) {
    int length;
    int counter = 0;
    int array1[999] = {0};
    int array2[999] = {0};
    int result[999] = {0};
    
    //Requesting input length, vectors and permutation by user
    printf("Enter vector length: ");
    scanf("%d", &length);
    
    printf("Enter vector: ");
    
    while (counter < length) {
        scanf("%d", &array1[counter]);
        counter++;
    }
    
    counter = 0;
    
    printf("Enter permutation: ");
    
    while (counter < length) {
        scanf("%d", &array2[counter]);
        counter++;       
    }
  
    //Determines if the permutation given by user is valid  
    if (error(length, array2) == 1) {
        return 0;
    } 
    counter = 0;
    
    //Resorts the vector by position into a new array
    while (counter < length) {
        int exit = 0;
        int sorter = 0;
        while (exit == 0 && sorter < length) {
            if (array2[sorter] == counter) {
                result[sorter] = array1[counter];
                exit++;
            }
            sorter++;   
        }
        
        counter++;
    }
    
    counter = 0;
    
    //Prints the new array
    while (counter < length) {
        printf("%d ", result[counter]);
        counter++;
    }
    
    printf("\n");
      
    return 0;
}


//This function will determine if the permutation is valid
//It does this by determining if the total sum of the permutation is correct
//and returns a number (1 for fail and 0 for success) if the perm is as such
int error(int length, int perm[length]) {
    int counter = 0;
    int sum = 0;
    int check = 0;
    int exit = 0;
    while (counter < length) {
        check = check + (counter);
        sum = sum + perm[counter]; 
        counter++;
    }
    
    if (check != sum) {
        printf("Invalid permutation\n");
        exit = 1;
        return exit; 
    }
    exit = 0;
    return exit;
}


