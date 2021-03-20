/*
    A program made to capture the history of cowrie
    Made by John Dao z5258962
    NOV 2019
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


//Adds a command stamp onto the file at $HOME/.cowrie_history
//Simply opens file and appends words onto it...
void add_history(char **words, int *execs) {
    //Gets home directory and sets the default directory
    //char *home = getenv("HOME");
    char *home = getenv("HOME");
    if (home == NULL) {
        home = ".";
    }

    //Accessing into file
    char *file_name = ".cowrie_history";
    int path_char_len = strlen(home) + strlen(file_name) + 2;
    char history_path[path_char_len];
    snprintf(history_path, sizeof history_path, "%s/%s", home, file_name);

    
    //Opening file to edit and appending file separated by new line
    //Note that this method of opening the file will force it to exist. 
    //This is due to the nature of the "ab" option for fopen.
    FILE *toappend = fopen(history_path, "ab");
    if (toappend == NULL) {
        perror(history_path);
    }

    //Appending through all the words
    int counter = 0;
    while (words[counter] != NULL) {
        fprintf(toappend, "%s ", words[counter]);
        counter++;
    }
    //Incrementing the overall executions, adding last newline and closing file.
    (*execs)++;
    fprintf(toappend, "\n");
    fclose(toappend);

}

//Uses words to return the users intended command from previously.
//Simply counts the number of lines and returns the appropriate line to be
//executed
char *get_history(char **words, int *execs) {
    //Gets home directory and sets the default directory
    //char *home = getenv("HOME");
    char *home = getenv("HOME");
    if (home == NULL) {
        home = ".";
    }

    //Accessing into file directory
    char *file_name = ".cowrie_history";
    int path_char_len = strlen(home) + strlen(file_name) + 2;
    char history_path[path_char_len];
    snprintf(history_path, sizeof history_path, "%s/%s", home, file_name);
    

    //Opening file to edit and checking it doesnt lead to nothing
    //NOTE add_history HAS to run beforehand as this function doesnt support "ab"
    FILE *toread = fopen(history_path, "r");  
    
    //Loops through and gets appropriate line number. Returns it for execution
    int line_number = 0;
    if (words[1] == NULL) {
        line_number = *execs - 1;
    } else {
        line_number = atoi(&words[1][0]);
        //Checks to see if the number is currently at the 10s.
        //Not sure if it works for numbers ending with 0...
        if (&words[1][1] != NULL && atoi(&words[1][1]) > 0) {
            line_number = (line_number * 10) + atoi(&words[1][1]);
        }
    }
    //Actual loop to get line number. Prints it for main and returns it
    int count = 0;
    if (toread != NULL ) {
        char *command_line = "";
        command_line = malloc(sizeof(char)* 1024);
        //Reading the line and stopping when line has been found.
        while (fgets(command_line, MAX_LINE_CHARS, toread) != NULL) {
            if (count == line_number) {
                printf("%s", command_line);
                return command_line;
            }
            else {
                count++;
            }
        }
        //Closing file
        fclose(toread);
    }
    //Fail return to signify that a command has not been found.
    return "FAIL";
}

//Cycles through given range of previous history and prints it.
//Simply loops through every history line until the range stops it.
//Range is given by limit (user input). If none, it will default to 10
void history(char *limit, int *execs) {
    //Gets home directory and sets the default directory
    //char *home = getenv("HOME");
    char *home = getenv("HOME");
    if (home == NULL) {
        home = ".";
    }

    //Accessing into file
    char *file_name = ".cowrie_history";
    int path_char_len = strlen(home) + strlen(file_name) + 2;
    char history_path[path_char_len];
    snprintf(history_path, sizeof history_path, "%s/%s", home, file_name);

    //Setting actual limit
    int printer = DEFAULT_HISTORY_OFFSET;
    if (limit != NULL) {
        printer = atoi(limit);
    }

    //Opening file to edit and checking it doesnt lead to nothing
    //Getting every line and printing it when it is in range.
    FILE *toread = fopen(history_path, "r");
    int adjuster = *execs - printer;
    int counter = 0;
    char command_line[MAX_LINE_CHARS];
    while (counter < *execs) {
        fgets(command_line, MAX_LINE_CHARS, toread);
        if (counter >= adjuster && counter < *execs) {
            printf("%d: %s", counter, command_line);
        }
        counter++;
    }
}

