//This program will show the combinations between two dice that equate to an
//input by the user
//John Dao z5258962 24/06/2019

#include <stdio.h>
int main (void) {
    int dieOne;
    int dieTwo;
    int target;
    
    printf("Please enter target die number: ");
    scanf("%d", &target);
    
    printf("Please enter the number of sides on the first die: ");
    scanf("%d", &dieOne);
    
    printf("Please enter the number of sides on the second die: ");
    scanf("%d", &dieTwo);
    
    int countOne = 1;
    while (countOne <= dieOne) {
        int countTwo = 1;
        while (countTwo <= dieTwo) {
            if (countTwo + countOne == target) {
                printf("%d + %d = %d\n", countOne, countTwo, countOne + countTwo);
                countTwo++;
            } else {
                countTwo++;
            }
        }
        countOne++;
    }

    return 0;
}
