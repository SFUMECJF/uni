//This program will demonstrate loops in a similar manner to python
//John Dao z5258962 July 2019

#include <stdio.h>
#include <string.h> 
int main (void) {
    int listA[1001] = {};
    int listB[1001] = {};
    int result[1001] = {};
    int listACtr = 0, listBCtr = 0, resultCtr = 0, adjustCtr = 0;
    int proceed = 1, invalid = 0, counter = 0;
    int sum = 0;
    //Retrieving inputs
    printf("Type -1 to enter into next array\n");
    while (proceed == 1) {
        scanf("%d", &listA[listACtr]);
        if (listA[listACtr] == -1) {
            proceed = 0;
        }
        listACtr++;
    }
    proceed = 1;
    while (proceed == 1) {
        proceed = scanf("%d", &listB[listBCtr]);
        
        if (listA[listBCtr] == -1) {
            proceed = 0;
        }
        listBCtr++;
    }
    
    //Checking if the input lengths are valid
    if (listACtr < listBCtr) {
        invalid = 1;
    }
    
    //calculating the result   
    while (adjustCtr <= listACtr - 3 && invalid != 1) {
        while (counter < listBCtr) {
            sum += listA[resultCtr] * listB[counter];
            counter++;
            resultCtr++;
        }
        result[adjustCtr] = sum;
        sum = 0;
        resultCtr = adjustCtr + 1;
        adjustCtr++;
    }
    counter = 0;
    while (counter < listBCtr) {
        printf("%d", result[counter]);
        counter++;
    }
    return 0;   
}
