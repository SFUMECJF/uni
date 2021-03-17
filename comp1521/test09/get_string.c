#include <stdio.h>

#include "get_string.h"

// print a line from stream using fgetc (only)
// reads  in at  most one less than size characters from stream and stores them into the
// buffer pointed to by s.  Reading stops after an EOF or a newline.  If a newline is read, it  is
// stored  into  the buffer.  A terminating null byte ('\0') is stored after the last character in the buffer.
void get_string(char *s, int size, FILE *stream) {
    int ended = 0;
    int counter = 0;
    while (counter < size - 1) {
        s[counter] = fgetc(stream);
        if (s[counter] == '\0') {
            break;
        } else if (s[counter] == '\n') {
            s[counter + 1] = '\0';
            ended = 1;
            break;
        }
        else {       
            counter++;
        }
    }
    if (counter < size && ended == 0) {
        s[counter] = '\0'; 
    } else if (ended == 0) {
        s[size - 1] = '\0';
    }
}
    
