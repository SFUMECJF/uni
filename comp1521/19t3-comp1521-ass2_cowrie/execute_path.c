/*
    Functions that enable the possibility to search and execute paths as 
    child processes.
    Made by John Dao z5258962.
    New file made for Ass2 1521 T3
    Created NOV 2019
*/

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


//Simple program that executes the given path. It is almost impossible for
//This to get an invalid path.
void execute_path(char **words, char **path, char **environment, char *program) {
    pid_t pid;
    int fail = 0;
    
    //Simple code that runs child process of given program.
    if (posix_spawn(&pid, program, NULL, NULL, words, environment) != 0) {
        fprintf(stderr, "%s: command not found", words[0]);
        fail = 1;
    }
    //Get response from waitpid
    if (fail == 0) {
        int status;
        if (waitpid(pid, &status, 0) == -1) {
            perror("waitpid");
        }
        printf("%s exit status = %d\n", program, WEXITSTATUS(status));
    }

}