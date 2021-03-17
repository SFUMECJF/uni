//This is a program intended to test random crap
//John Dao z5258962

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define MAX_NAME_LENGTH 10
struct person {
    int age;
    int height;
    char name[MAX_NAME_LENGTH];
};

int main (void) {
    struct person *person = malloc (sizeof(struct person));
    int age;
    printf("Enter age of person: ");
    scanf("%d", &age);
    person->age = age;
    
    int height;
    printf("Enter height of person: " );
    scanf("%d", &height);
    person->height = height;
    

    
    printf("Enter name of person: ");
    char name[MAX_NAME_LENGTH];
    while (fgetstr (name, MAX_NAME_LENGTH, stdin) != NULL) {
    
    }
    strcpy(person->name, name);
    int counter = 0;
    
    while (counter < 3) {
        if (counter == 0) {
            printf("\nThis person's name is %s.\n", person->name);    
        } else if (counter == 1) {
            printf("%s's age is %d", person->name, person->age);
        } else if (counter == 2) {
            printf(" and his height is %d.\n", person->height);
        }
        counter++;
    }
}
