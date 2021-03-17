// Schedule ADT implementation

#include <stdio.h>
#include <stdlib.h>
#include <math.h>

#include "Schedule.h"
#include "Time.h"
#include "Tree.h"
bool testFound (Time test, Time t);
bool testOne (Time t1, Time orig);
struct schedule {
    Tree times;
    int  count;
};

// Creates a new schedule
Schedule ScheduleNew(void) {
    Schedule s = malloc(sizeof(*s));
    if (s == NULL) {
        fprintf(stderr, "Insufficient memory!\n");
        exit(EXIT_FAILURE);
    }

    s->times = TreeNew();
    s->count = 0;
    return s;
}

// Frees all memory associated with a given schedule
void ScheduleFree(Schedule s) {
    TreeFree(s->times);
    free(s);
}

// Gets the number of times added to the schedule
int  ScheduleCount(Schedule s) {
    return s->count;
}

// Attempts to schedule a new landing time. Returns true if the time was
// successfully added, and false otherwise.
bool ScheduleAdd(Schedule s, Time t) {
    // TODO: Modify the following code
    // Check time for validity
    if (s->count == 0) {
        TreeInsert(s->times, t);
        s->count++;
        return true;
    }
    Time floor = TreeFloor(s->times, t);
    Time ceil = TreeCeiling(s->times, t);
    if (testFound(floor, t) == true || testFound(ceil, t) == true) {
        return false;
    } else if (floor == NULL || ceil == NULL) {
        if (testOne(floor, t) == true || testOne(ceil, t) == true) {
            TreeInsert(s->times, t);
            s->count++;
            return true;
        } else {
            return false;
        }
    } else if (floor != NULL && ceil != NULL) {
        if (testOne(floor, t) == true && testOne(ceil, t) == true) {
            TreeInsert(s->times, t);
            s->count++;
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

bool testFound(Time test, Time t) {
    if (test == NULL) {
        return false;
    }
    if (TimeCmp(test, t) == 0) {
        return true;
    }
    return false;
}

//Tests two Times to find out if they are 15 minutes apart
bool testOne (Time t1, Time orig) {
    if (t1 == NULL) {
        return false;
    }
    int t1Cmp[4] = {0, 1, 1, 0};
    int origCmp[4] = {0, 1, 1, 0};
    int counter = 0;
    while (counter < 5) {
        Time t1Time = TimeNew(t1Cmp[0], t1Cmp[1], t1Cmp[2], t1Cmp[3]);
        Time origTimeCmp = TimeNew(origCmp[0], origCmp[1], origCmp[2], origCmp[3]);
        if (counter < 3) {
            t1Cmp[counter] += abs(TimeCmp(t1Time, t1));
            origCmp[counter] += abs(TimeCmp(origTimeCmp, orig));
        } else if (counter == 3) {
            t1Cmp[3] += abs(TimeCmp(t1Time, t1)) * 100;
            origCmp[3] += abs(TimeCmp(origTimeCmp, orig)) * 100;
        }
        else if (counter == 4){
            t1Cmp[3] += abs(TimeCmp(t1Time, t1));
            origCmp[3] += abs(TimeCmp(origTimeCmp, orig));
        }
        int t1dif = abs(t1Cmp[counter] - origCmp[counter]);
        
        if (counter < 3 && t1dif > 0) {
            // Valid difference of year, month, day, hour
            return true;
        } else if (counter == 4) {
            //Comparing minutes (where hours are equal)
            if (abs(t1Cmp[3] - origCmp[3]) > 10) {
                return true;
            } else {
                return false;
            }    
        } 
        counter++;
    }
    return false;
}

// Shows  all  the landing times in the schedule. If mode is 1, only the
// times are shown. If mode is 2, the underlying data structure is shown
// as well.
void ScheduleShow(Schedule s, int mode) {
    if (mode == 1) {
        TreeList(s->times);
    } else if (mode == 2) {
        TreeShow(s->times);
    }
}
