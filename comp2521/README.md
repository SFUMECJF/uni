# LAB REPO for COMP2521 T1 2020
This is the main repo for comp2521 lab exercises created by John Dao z5258962.
Readme and general repo will be updated as more labs are released and developments are made to the progress/completion of labs.

## LABS GIVEN AND COMPLETED
Overview  

-lab #1 Completed.  
-lab #2 Completed.   
-lab #3 Completed.  
-lab #4 Completed.  
-lab #5 Incomplete.  
-lab #6 TBD.  
-lab #7 TBD.  
-lab #8 TBD.  
-lab #9 TBD.  
-lab #10 TBD.  

### lab #1

Mostly comprised of refreshes from 1511. Including cycling through linked lists, inserting and deleting from list

```
COMPLETED. 
No issues to be known.  
```

### lab #2

An introduction into doubly linked lists and the mechanisms behind utilising them. Mostly the same as normal linked lists but with the handling of a prev pointer within every node. 

```
COMPLETED. 
No issues to be known.  
```

### lab #3

An introduction into the movement and analysis of binary trees. A light introduction into the use of recursion to solve problems. Main way of thinking is via instances of functions and understanding what happens to a function when it is called recursively

```
COMPLETED.  
No issues to be known.  
Note!  
Always free when able to avoid memory leaks! Basic but vital!!  
```

### lab #4
Made to further explore the implementation of two ADS (abstract data sets) and Binary search trees. Testing and etc will also be used with the gathering of test data required.
```
COMPLETED.  
2 failed autotest errors via valgrind within exercise 4.  
Unfreed memory is due to NULL pointers being assigned past the extent of the tree. Callocing and assigning null that were pointed from null (null->right = NULL) will cause that node to never be freed.  
Also some formatting improvements to be made within 1. REMEMBER to not repeat yourself.  
```

### lab #5
Made to intoduce implementation of AVL Tree and to introduce some problems involving binary search trees. Also used to further deepen understand of ADTS and there role within AVL and BST trees. 
```
INCOMPLETE! DUE FRI 27 MARCH 20:00  
TODO:  
rotateLeft() and rotateRight() in Tree.c  
doInsert() in Tree.c  
treeFloor and treeCeiling in Tree.c  
```

### lab #6
TBD  

### lab #7
TBD  

### lab #8
TBD  

### lab #9
TBD  

### lab #10
TBD  


## ASSIGNMENT
The assignment will not be placed here and will be put into another repo for development. This is mainly for the rules regarding sharing code between students within this course.
As such, a link will be placed here after the completion of the assignment. 

## OTHER ACKNOWLEDGEMENTS
This repo was made for me to organise all of my work within this course.
For any concerns regarding code and use of code, just contact me

```
z5258962@ad.unsw.edu.au  
jdao54@gmail.com  
OR message me on FB  
```

