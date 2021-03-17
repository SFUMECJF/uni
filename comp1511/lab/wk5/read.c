//

#include <stdio.h>

int scanf_array(int n, int array[n]);

int main (void) {
    int counter;
    while (counter < 1000) {
        int input;
        scanf("%d", &input);
        scanf_array(counter);
    counter++;
    }
    return 0;
}

int scanf_array(int n, int array[n]) {
    printf("%d", array[n];

    return 0;    
}
