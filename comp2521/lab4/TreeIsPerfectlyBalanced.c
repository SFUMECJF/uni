
#include <stdlib.h>

#include "tree.h"
#include "math.h"

int max(int a, int b);

int cntH(Tree t);
int cntN(Tree t);
bool TreeIsPerfectlyBalanced(Tree t) {
	// TODO
	if (t == NULL) {
		return true;
	}
	int a = cntH(t->right);
	int b = cntH(t->left);
	int diff = cntN(t->left) - cntN (t->right);

	if (abs(a - b) <= 1 && TreeIsPerfectlyBalanced(t->left) && TreeIsPerfectlyBalanced(t->right) && abs (diff) <= 1) {
		return true;
	} else {
		return false;
	}
}

int max (int a, int b) {
	if (a >= b) {
		return a;
	} else {
		return b;
	}
}

int cntN(Tree t) {
	if (t == NULL) {
		return 0;
	} else {
		return 1 + cntN(t->left) + cntN(t->right);
	}
}

int cntH(Tree t) {
	if (t == NULL) {
		return 0;
	} else {
		return 1 + max(cntH(t->right),cntH(t->left));

	}
}


