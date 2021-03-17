
#include "tree.h"


Tree adjustToDepth(Tree t, int depth, int totalDepth, Tree new);
int maxDepth(Tree t);
int max (int a, int b);

Tree TreeCopy(Tree t, int depth) {
	if (depth < 0) {
		return NULL;
	}
	struct node *new = calloc(1, sizeof (struct node));
	int totalDepth = max(maxDepth(t->left), maxDepth(t->right));
	return adjustToDepth(t, depth, totalDepth, new);;
}

int max (int a, int b) {
	if (a >= b) {
		return a;
	} else {
		return b;
	}
}

int maxDepth(Tree t) {
	if (t == NULL) {
		return 0;
	} else {
		return 1 + max(maxDepth(t->left), maxDepth(t->right));
	}
}

Tree adjustToDepth(Tree t, int depth, int totalDepth, Tree new) {
	static int currDepth  = 0;
	if (t == NULL || currDepth > totalDepth || currDepth > depth) {
		return NULL;
	} 
//Memory leak due to allocating memory and not using it. This is due to it acting as a null, which means the memory is never freed.
	if (depth >= currDepth) {
		new->value = t->value;
		if (depth != currDepth) {
			currDepth++;
			//Find a way to fix this...
			//Maybe an if structure?
			new->left = calloc(1, sizeof (struct node));
			new->left = adjustToDepth(t->left, depth, totalDepth, new->left);
			new->right = calloc(1, sizeof (struct node));
			new->right = adjustToDepth(t->right, depth, totalDepth, new->right);
			currDepth--;		
		}
	}
	return new;
}

