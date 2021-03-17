//This program reads a year and then prints whether that year is a leap year
//John Dao z5258962 21/6/2019

#include <stdio.h>
int main (void) {
    int year;
    int yearby4;
    int yearby100;
    int yearby400;
    //Requests and scans for user input of year
    printf("Enter year: ");
    scanf("%d", &year);
    //Pre division (modulus) of year by 4, 100 and 400
    yearby4 = year%4;
    yearby100 = year%100;
    yearby400 = year%400; 
    //Leap year algorithm as given
    if (yearby4 > 0) {
        printf("%d is not a leap year.\n", year);
    } else if (yearby100 > 0) {
        printf("%d is a leap year.\n", year);
    } else if (yearby400 > 0) {
        printf("%d is not a leap year.\n", year);
    } else {
        printf("%d is a leap year.\n", year);
    }

    return 0;
}
