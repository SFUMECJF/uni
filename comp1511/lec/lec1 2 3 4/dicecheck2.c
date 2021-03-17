//Dice checking application
//John D.A Dao
//Will take 2 inputs from a user and add them together
//It will then compare target number with a secret number
//And report it back as equal, larger or smaller
#import <stdio.h>
#define SECRET_NUMBER 50

int main (void) {
    int result1;
    int result2;
    int total;
    int truth;
    int truth2;
    //input of user results
  roll:
    printf("Enter your first test result: \n");
    scanf("%d", &result1);
    printf("Now enter in your second test result: \n");
    scanf("%d", &result2);
    total = result1 + result2 ;
    printf("So you scored %d.\nIs this correct? (1 for Yes or 0 for No): ", total);
    //user confirmation of answer
    scanf("%d", &truth);
    //determination of the result. Whether the user passed or failed
Check:
    if (truth == 1 & & total >= SECRET_NUMBER) {
    printf("Your roll was larger than the cutoff. Congratulations, you have made it to the next stage\n");
}
    //message of success
    else if (truth == 0) {
    goto roll; 
    }
    //wrong entry. Retry of result
    else if (truth == 1 && total <= SECRET_NUMBER){
    printf("Your roll was under the cuttoff. Sorry, but you have failed to make the cutoff. We advise you to attempt the course again.. \n");
    }
    //Failure of Yes or no Input

    else {
Invalid:
    printf("Your input was invalid. Please check if your result is larger than the one listed below and enter 1 if correct and 0 otherwise: \n %d", total);
    }
    scanf("%d", &truth2);
    if (truth == 0){
    goto roll;
    else if (truth = 1){
    goto Check;
    }
    else {
    goto Invalid
    }}
    }
