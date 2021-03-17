#include <stdlib.h>
#include <stdio.h>
#include "BSTree.h"

int getCount(BSTree tree);

int BSTreeGetKth(BSTree t, int k) {
	if (k == getCount(t->left)) {
		return t->value;
	} else if (k < getCount(t->left)) {
		return BSTreeGetKth(t->left, k);
	} else {
		k = k - getCount(t->left) - 1;
		return BSTreeGetKth(t->right, k);
	}
}

int getCount(BSTree tree) {
	//If t = null, returns 0, else returns a recursive count of +1 from given node.
	if (tree == NULL) {
		return 0;
	} else {
		return 1 + getCount(tree->left) + getCount(tree->right);
	}
}
