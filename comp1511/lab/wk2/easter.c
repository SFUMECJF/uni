//Easter 
//Allows user to enter a year, then calculates the date of Easter sunday for that year
//John Dao z5258962 17/06/2019

#include <stdio.h>
int main (void){
    int year;
    int a;
    int b;
    int c;
    int d;
    int e;
    int f;
    int g;
    int h;
    int i;
    int k;
    int l;
    int m;
    int p;
    int month;
    int date;
    printf("Enter year: ");
    scanf("%d", &year);
    a=year%19;
    b=year/100;
    c=year%100;
    d=b/4;
    e=b%4;
    f=(b+8)/25;
    g=(b-f+1)/3;
    h=(19*a+b-d-g+15)%30;
    i=c/4;
    k=c%4;
    l=(32+2*e+2*i-h-k)%7;
    m=(a+11*h+22*l)/451;
    month = (h+l-7*m+114)/31;
    p=(h+l-7*m+114)%31;
    date = p+1;
    
    printf("Easter is ");
    
    if (month == 1){
        printf("January ");
    } else if (month == 2){
        printf("Feburary ");
    } else if (month == 3){
        printf("March ");
    } else if (month == 4){
        printf("April ");
    } else if (month == 5){
        printf("May ");
    } else if (month == 6){
        printf("June ");
    } else if (month == 7){
        printf("July ");
    } else if (month == 8){
        printf("August ");
    } else if (month == 9){
        printf("September ");
    } else if (month == 10){
        printf("October ");
    } else if (month == 11){
        printf("November ");
    } else if (month == 12){
        printf("December ");
    }
    printf("%d", date);
    printf (" in %d.\n", year);
    return 0;
    
}

