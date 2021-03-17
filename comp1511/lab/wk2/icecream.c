//Ordering icecream scoops
//John Dao 11/6/2019 z5258962

#include <stdio.h>

int main (void){
    int scoops;
    int cost;
    int total;
    printf("How many scoops? ");
    scanf("%d", &scoops);
    printf("How many dollars does each scoop cost? ");
    scanf("%d", &cost);
    total = scoops * cost;
    if (total <= 10) {
        printf("You have enough money!\n");
    } else 
        printf("Oh no, you don't have enough money :(\n");
    
    return 0;
}
