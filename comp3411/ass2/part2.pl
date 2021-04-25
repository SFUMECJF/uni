/* 
 * COMP 3411 assignment part2
 * By John Dao
 * z5258962
*/

:- op(300, xfx, <-).
/* given inter_construction function */
inter_construction(C1 <- B1, C2 <- B2, C1 <- Z1B, C2 <- Z2B, C <- B):-
    C1 \= C2,
    intersection(B1, B2, B),
    gensym(z, C),
    subtract(B1, B, B11),
    subtract(B2, B, B12),
    append(B11, [C], Z1B),
    append(B12, [C], Z2B).


/* if the first list is empty, just return the second list with empty z */
intra_construction(C1 <- [], C1 <- B2, C1 <- B2, D <- [], D <- []):-
    gensym(z, D).

/* Valid intraconstruction lists! */
intra_construction(C1 <- B1, C1 <- B2, C1 <- B, D <- Z1B, D <- Z2B):-
    B1 \= B2,
    intersection(B1, B2, Z),
    gensym(z, D),
    append(Z, [D], B),
    subtract(B1, B, Z1B),
    subtract(B2, B, Z2B).
    

/* if the first list is empty, then just return the second list and an empty list as absorption */
absorption(C1 <- [], C2 <- B2, C1 <- B2, C2 <- []).

/* valid absorbtion lists! */
absorption(C1 <- B1, C2 <- B2, C1 <- Z1B, C2 <- Z2B) :-
    C1 \= C2,
    intersection(B1, B2, Z2B),
    subtract(B1, Z2B, Temp),
    append([C2], Temp, Z1B).


/* Empty first list means there is no intersection! We return the second list as well as an empty list to signify as such */
idenitification(C1 <- [], C1 <- B2, C1 <- B2, y <- []).

/* else there is a valid list to attempt to identify */
identification(C1 <- B1, C1 <- B2, C1 <- Z1B, y <- Z2B) :-
    B1 \= B2,
    intersection(B1, B2, TestIden),
    /* Since we can assume the order of the lists with the second ALWAYS being the one with
     * Identification, we just have to test number 2 
    */
    subtract(B2, TestIden, TestB2Iden),
    /* Find the length of the list and if it is 0, then we have idenfified it! */
    length(TestB2Iden, 1),
    append(TestIden, TestB2Iden, Z1B),
    subtract(B1, TestIden, Z2B).


/* if the first list is empty, you can just return the second list as it is as there are
 * No intersections */
dichotomisation(C1 <- [], C2 <- B2, C1 <- [], C2 <- B2, D1 <- [], not(D1) <- []):-
    C1 \= C2,
    gensym(z, D1).
    
/* There exists one so do the dochotomisation
 * Assumes that the unique variable will always be in B2*/
dichotomisation(C1 <- B1, C2 <- B2, C1 <- Z1B, C2 <- Z2B, D1 <- Z3B, not(D1) <- Z4B):-
    C1 \= C2,
    gensym(z, D1),
    intersection(B1, B2, Intersect),
    /* Get the first list subtraction and appends */
    subtract(B1, Intersect, Z3B),
    subtract(B1, Z3B, FirstSubtract),
    append(FirstSubtract, [D1], Z1B),
    /* Get the second intersection and appends */
    subtract(B2, Intersect, Z4B),
    subtract(B2, Z4B, SecondSubtract),
    append(SecondSubtract, [not(D1)], Z2B).
    

/* empty first list means there is no intersection */
truncation(C1 <- [], C1 <- [_], C1 <- []).

/* Else just returns the intersection of the two lists */
truncation(C1 <- B1, C1 <- B2, C1 <- ZB):-
    B1 \= B2,
    intersection(B1, B2, ZB).
