
#include <stdio.h>
#include <stdlib.h>
#include <math.h>

#include "list.h"

void addNewNode(List a, int value);
bool checkAbnor(int a, int b, int c, int thr);

/*
	abnormal if

	The absolute difference between the value and the previous value is 
	greater than or equal to the given threshold

	The absolute difference between the value and 
	the next value is greater than or equal to the given threshold
*/
List listGetAbnormals(List l, int threshold) {
	// TODO: Add your code here and change the return
	//       statement if needed.  You may add helper
	//       functions if you wish.
	
	//Will return empty list as no comparisons can be made.
	if (l == NULL || l->size == 0 || l->size == 1 || l->size == 2) {
		return newList();
	}
	//Since size will be greater than three
	Node before = l->first;
	Node curr = before->next;
	Node after = curr->next;
	List abnor = newList();

	while (after != NULL) {
		if (checkAbnor(before->value, curr->value, after->value, threshold)) {
			addNewNode(abnor, curr->value);
		}
		before = before->next;
		curr = curr->next;
		after = after->next;
	}
	return abnor;
}

bool checkAbnor(int a, int b, int c, int thr) {
	int diffBef = abs(a - b);
	int diffAf = abs(b - c);
	if (diffBef >= thr && diffAf >= thr) {
		return true;
	} else {
		return false;
	}
}

void addNewNode(List a, int value) {
	if (a->size == 0) {
		a->first = newNode(value);
		a->last = a->first;
		a->size += 1;
	} else {
		Node new = newNode(value);
		a->last->next = new;
		new->prev = a->last;
		a->last = new;
		a->size++;
	}
}

