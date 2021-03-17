// testList.c - testing DLList data type
// Written by John Shepherd, March 2013

#include <assert.h>
#include <stdio.h>
#include <stdlib.h>

#include "DLList.h"

void testOne(DLList testList, int last);

int main (void)
{
	//Creates new empty list
	printf("Press ctr-d to begin test\n");
	DLList myList = getDLList(stdin);
	assert(validDLList(myList));

	//All Valid tests
	//Empty list

	
	//Insert after empty
	printf("testing functions with empty list\n");
	DLListAfter(myList, "afterEmpty");
	printf("This should show one line being afterEmpty\n");
	putDLList (stdout, myList);
	assert(validDLList(myList));

	//Setting list as empty
	DLListDelete(myList);

	//Insert before empty	
	DLListBefore(myList, "beforeEmpty");
	assert (validDLList(myList));
	printf("This should show one line, beforeEmpty\n");
	putDLList (stdout, myList);

	printf("finished testing empty\n");

	//Geting list ready
	DLListDelete(myList);
	DLListAfter(myList, "oneLine");

	//Testing functions with one line.
	printf("Now testing functions with one line\n");
	testOne(myList, 1);
	printf("finished testing one line\n\n");

	//Geting ready to test for two lines
	DLListAfter(myList, "twoLine");
	DLListMove(myList, -1);

	//Testing same tbhibg into list with two lines
	printf("now testing two lines\n\n");
	testOne(myList, 1);
	printf("testing second case of two lines\n\n");
	
	DLList mySecList = getDLList(stdin);
	DLListAfter(mySecList, "oneLine");
	DLListAfter(mySecList, "twoLine");
	assert (validDLList(mySecList));
	testOne(mySecList, 2);
	freeDLList(myList);
	freeDLList(mySecList);
	
	return EXIT_SUCCESS;
}

void testOne(DLList testList, int last) {
	
	if (last == 99) {
		DLListMove(testList, 1);
	}
	DLListBefore(testList, "beforeOne");
	putDLList (stdout, testList);
	assert (validDLList(testList));
	printf("This should show lines with one being beforeOne\n\n");
	putDLList (stdout, testList);

	DLListMove(testList, 1);

	assert (validDLList(testList));
	printf("now testing functions\n");
	DLListAfter(testList, "afterOne");
	assert (validDLList(testList));
	printf("This should show lines in correct position, with both before and after\n\n");
	putDLList (stdout, testList);
	
	printf("Now returning to original list\n\n");
	//Deletes created lines around the one original line
	DLListDelete(testList);
	assert (validDLList(testList));
	DLListMove(testList, -1);
	if (last == 1) {
		DLListMove(testList, -1);	
	}
	DLListDelete(testList);
	
	printf("This should show original line/s\n");
	putDLList (stdout, testList);
	printf("finished testing function\n\n\n\n\n");

}
