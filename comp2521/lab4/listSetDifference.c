
#include "list.h"

void addToList(List L, int number);
void findDifference(Node one, Node two, List l);


List listSetDifference(List l1, List l2) {
	List diffList = newList();
	//Handling empty list cases{
	for (Node copy1 = l1->head; copy1 != NULL; copy1 = copy1->next) {
		findDifference(copy1, l2->head, diffList);
	}

	return diffList;
}

//Format behind function can be improved to be more clear.
void findDifference(Node one, Node two, List l) {
	if (two == NULL) {
		addToList(l, one->value);
	} else if (one->value != two->value) {
		findDifference(one, two->next, l);
	}
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