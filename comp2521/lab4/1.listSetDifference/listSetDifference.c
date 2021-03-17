
#include "list.h"

void addToList(List L, int number);
bool findDifference(Node one, Node two, List l);


List listSetDifference(List l1, List l2) {
	List diffList = newList();
	//Handling empty list cases
	if (l1 == NULL && l2 == NULL) {
		return NULL;
	}
	else if (l1 == NULL) {
		return l2;
	} else if (l2 == NULL) {
		return l1;	
	} else {
		for (Node copy1 = l1->head; copy1 != NULL; copy1 = copy1->next) {
			if (copy1 != NULL) {
				findDifference(copy1, l2->head, diffList);
			}
		}
	}
	//printf("Done");
	
	return diffList;
}

bool findDifference(Node one, Node two, List l) {
	
	if (two == NULL) {
		addToList(l, one->value);
		return false;
	} else if (one->value != two->value) {
		findDifference(one, two->next, l);
	} else if (one->value == two->value) {
		return true;
	}
	return true;
}

//adds number to start of list
void addToList(List L, int number) {
	bool found = false;
	
	for (Node copy = L->head; copy != NULL; copy = copy->next) {
		if (copy->value == number) {
			found = true;
			break;
		}
	}
	if (found == false) {
		Node newNumber = newNode(number);
		newNumber->next = L->head;
		L->head = newNumber;
	}
	
}