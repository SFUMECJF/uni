#include <stdio.h>
int main (void) {
    int numOne;
    int numTwo;
    int result;
    scanf("%d %d", &numOne, &numTwo);
    
    result = ((numOne > numTwo) * (numOne) +  (numTwo > numOne) * (numTwo)) + (numOne == numTwo) * numOne;
    printf("%d", result);
    
    return 0;
}
