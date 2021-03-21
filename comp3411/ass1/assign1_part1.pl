%
%    COMP3411 Assignment 1 Part 1 - Prolog
%    Created by John Dao.
%    zid z5258962.
%    Created March 2021
%
%    Contains all exercises given for part 1
%

% change prolog tag for 1.2 to print longer strings
:- set_prolog_flag(answer_write_options, [max_depth(0)]).


%
%    1.1 List Processing Part 1
%    Sum the squares of only the even numbers in the list
%    Predicate ?- sumsq_even(List, Sum)
%

sumsq_even([], 0).
sumsq_even([X | Y], Sum) :-
    sumsq_even(Y, Total),
    (mod(X, 2) =:= 0 -> Sum is Total + X * X; 
        (mod(X, 2) =\= 0 -> Sum is Total + 0; true
        )
    ).

%
%    1.2. List processing Part 2. 
%    Transform list of strings and add "what makes you say".
%    Transformations are:
%        you -> i
%        me -> you
%        my -> your
%    Predicate ?- eliza1(List, X).
%

replace(_, [], _, []).
replace(you, i).
replace(me, you).
replace(my, your).
replace(NoChange, NoChange).

replaceAll([], []).
replaceAll([Head1 | Tail1], [Head2 | Tail2]) :-
    replaceAll(Tail1, Tail2),
	replace(Head1, Head2).

eliza1([], _).
eliza1(Input, Output) :-
    replaceAll(Input, TempList),
	append([what, makes, you, say], TempList, Output).

%
%    1.3. List Processing Part 3. 
%    Extract string from list, append and preappend extracted
%   Extractd words between first "you" and "me"
%   inserts extracted list between "you" and "me" in string "What makes you think <somewords> me"
%    Prediate ?- eliza2(List, X).
%

eliza2([], []).
eliza2(Input, Output):-
    append(_, [you|Temp1], Input),
	append(Temp3, [me|_], Temp1),
    append([what, makes, you, think,i], Temp3, Temp4),
    append(Temp4, [you], Output).

%
%    1.4. Prolog Terms.
%    Applies evaluation to mathmatical expressions.
%    Expressions are
%        - add
%        - mul
%        - sub
%        - div
%    This also includes nested expressions.
%    Predicate ?- eval(Expr, V).
%

% default put in number and get one out
eval(A, V):-
    number(A),
    V is A.

% add
eval(add(A, B), V) :-
    % recursively call on both A and B to make sure nested functions are run
    eval(A, Temp1),
    eval(B, Temp2),
    V is Temp1 + Temp2.
% subtract
eval(sub(A, B), V) :-
    % recursively call on both A and B to make sure nested functions are run
    eval(A, Temp1),
    eval(B, Temp2),
    V is Temp1 - Temp2.
% multiply
eval(mul(A, B), V) :-
    % recursively call on both A and B to make sure nested functions are run
    eval(A, Temp1),
    eval(B, Temp2),
    V is Temp1 * Temp2.
% divide
eval(div(A, B), V) :-
    % recursively call on both A and B to make sure nested functions are run
    % with divide by zero check
    eval(A, Temp1),
    eval(B, Temp2),
    (Temp2 =\= 0 -> V is (Temp1 / Temp2);
        (Temp2 =:= 0 -> write('Cannot divide by zero!'); break 
        )
    ).
