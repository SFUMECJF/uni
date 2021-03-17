//Challenge Exercise: Dice range
//John Dao z5258962 11/06/2019 

#include <stdio.h>
int main (void) {
    int sides;
    int rolls;
    int range;
    double avg;
    printf("Enter the number of sides on your dice: ");
    scanf("%d", &sides);
    printf("Enter the number of dice being rolled: ");
    scanf("%d", &rolls);
    range = sides * rolls;
    avg = (range+rolls)/2.0;
    if (range <= 0) {
        printf("These dice will not produce a range. \n");
    }  else{
        printf("Your dice range is %d to %d. \n", rolls, range);
        printf("The average value is %lf \n", avg);
    }
    
    return 0;
}
