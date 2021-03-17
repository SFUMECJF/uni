//This program calculates the marks that a student got in an exam
//John Dao z5258962 21/6/2019

#include <stdio.h>
int main (void) {
    double tMark;
    double sMark;
    double pct;
    //Requests user input of total marks in the exam
    printf("Enter the total number of marks in the exam: ");
    scanf("%lf", &tMark);
    //Requests user input of the student's marks
    printf("Enter the number of marks the student was awarded: ");
    scanf("%lf", &sMark);
    //calulates the percentage mark
    pct = 100.00*(sMark/tMark);
    //Prints score on the exam
    printf("The student scored %.0lf%% in this exam.\n", pct);
    
    return 0;
}
