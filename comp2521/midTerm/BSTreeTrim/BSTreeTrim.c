
#include <stdio.h>
#include <stdlib.h>

#include "BSTree.h"

//Guess that algorithm is O(2n)?? through normal in order tree traversal.
//And worst case successor

//For some reason, when original root node is changed
//Its in order successor is also changed???
//Dont know where bug is from. Possibly from recursive call?? in BSTreeTrim?
BSTree leftEnd(BSTree node);
BSTree deleteNode(BSTree node);

BSTree BSTreeTrim(BSTree t, int lower, int upper) {
	// TODO: Add your code here and change the return
	//       statement if needed.  You may add helper
	//       functions if you wish.
	//Empty tree/null return
	if (t == NULL) {
		return t;
	}
	//Changes left and right subtrees recursively to find values of range
	t->left = BSTreeTrim(t->left, lower, upper);
	t->right = BSTreeTrim(t->right, lower, upper);

	//Deletes node if value is in range
	if (t->value >= lower && t->value <= upper) {
		return deleteNode(t);
	}
	return t;
}

//Finds new successor
//Simply loops through to find what the next succesor could be.
//If no left exists, the current node then has to be the successor
//as per index rules.
BSTree successor (BSTree node) {
	BSTree check = node;
	if (check == NULL) {
		return NULL;
	}
	while (check->left != NULL) {
		check = check->left;
	}
	return check;
}

//Standard node deletion via inOrderSuccessor.
//Finds what the possible next successor via recursion 
//and will shift everything up. 
//Acts according to 3 possibilities.
BSTree deleteNode(BSTree node) {
	if (node->left == NULL) {
		//left node doesnt exists so frees current and right node is new root
		BSTree rightTree = node->right;
		free(node);
		return rightTree;
	} else if (node->right == NULL) {
		//right node doesnt exist so frees current and left node is now new root
		BSTree leftTree = node->left;
		free(node);
		return leftTree;
	}

	//Both exist
	
	//Changes node to new variable in order of successor (inOrderSuc)
	BSTree inOrderSuc = successor(node->right);
	node->value = inOrderSuc->value;

	//Calls recursively to adjust the rest of the tree
	node->right = deleteNode(node->right);

	return node;
}
