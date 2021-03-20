/*
    A program made to run glob for cowrie
    Made by John Dao z5258962
    NOV 2019
*/

#include <glob.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <assert.h>
#include <fcntl.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <sys/wait.h>

// PUT EXTRA `#include'S HERE
#include <dirent.h>
#include <errno.h>
#include <spawn.h>

#include "gfunc.h"

//Simply checks whether the given argument is able to be filtered through glob
//Just returns true or false
int glob_check(char word[MAX_LINE_CHARS]) {
    int is_glob = FALSE;
    if (strchr(word, '*') != NULL || strchr(word, '?') != NULL) {
        is_glob = TRUE;
    } else if (strchr(word, '[') != NULL || strchr(word, '~') != NULL) {
        is_glob = TRUE;
    } else {
        is_glob = FALSE;
    }

    return is_glob;
    
}

//Sifts through and gets the possible outcomes from given argument.
//Sifts through whether there is one, or more possibilities.
//Executes the change on words based on those possibilities.
void get_glob(char **words) {
    //All matches held in this struct
    glob_t matches;
    
    //Sorting through to get right outcome.
    //ps. i hate realloc.
    if (words[1] != NULL && glob_check(words[1]) == TRUE) {
        int result = glob(words[1], GLOB_NOCHECK|GLOB_TILDE, NULL, &matches);
        if (result != 0) {
            printf("glob returns %d\n", result);
        } else if (matches.gl_pathc == 1) {
            strcpy(words[1], matches.gl_pathv[0]);
        } else {
            char cmd_tmp[MAX_LINE_CHARS];
            strcpy(cmd_tmp, words[0]);
            *words = realloc(*words, (sizeof(matches.gl_pathv) * matches.gl_pathc + 1));
            strcpy(words[0], cmd_tmp);
            for (int i = 0; i < matches.gl_pathc; i++) {
                words[i] = matches.gl_pathv[i];
            }
        } 
    }   
}