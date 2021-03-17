//This program lists all of the combinations between two dice
//John Dao z5258962 24/06/19

#include <stdio.h>
int main (void) {
    int dieOne;
    int dieTwo;
    
    printf("Please enter the number of sides on the first die: ");
    scanf("%d", &dieOne);
    
    printf("Please enter the number of sides on the second die: ");
    scanf("%d", &dieTwo);
    
    int countOne = 1;
    while (countOne <= dieOne) {
        int countTwo = 1;
        while (countTwo <= dieTwo) {
            printf("%d + %d = %d\n", countOne, countTwo, countOne  countTwo);
            countTwo++;
        }
        countOne++;
    }

    return 0;
}
