#include <stdio.h>
#include <stdlib.h>
#include <spawn.h>
#include <string.h>

#define slashes 2

int main (int argc, char *argv[]) {

    //Gets home directory and sets the default directory
    //char *home = getenv("HOME");
    char *home = getenv("HOME");
    if (home == NULL) {
        home = ".";
    }

    //Accessing into file
    char *file_name = ".diary";
    int diary_char_len = strlen(home) + strlen(file_name) + 2;
    char diary_path[diary_char_len];
    snprintf(diary_path, sizeof diary_path, "%s/%s", home, file_name);


    //Opening file to edit and checking it doesnt lead to nothing
    FILE *toappend = fopen(diary_path, "a");
    if (toappend == NULL) {
        perror(diary_path);
        return 1;
    }

    int counter = 1;
    while (counter < argc) {
        fprintf(toappend, "%s", argv[counter]);
        fprintf(toappend, " ");
        counter++;
    }
    fprintf(toappend, "\n");
    fclose(toappend);

    return 0;
}