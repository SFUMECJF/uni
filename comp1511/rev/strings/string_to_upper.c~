// CONVERT A STRING TO UPPERCASE
// CREATED BY
//  ... (z5258962)
//  ... (Z0000000)
// CREATED ON August 2019
// TUTOR'S NAME (DAYHH-LAB)

#include <stdio.h>

/// THIS WON'T WORK!
///
/// str only points to a string literal, which it is not legal to change.
/// If you attempt to modify it on Linux you will get a runtime error.
//
// char *str = "Hello!"
// string_to_upper(str)

void string_to_upper(char *buffer);
int main(int argc, char *argv[]) {
    char str[] = "Seventeen...  SEVENTEEN, I SAY!";
    string_to_upper(str);
    printf("%s\n", str);
    return 0;
}

// Convert the characters in `buffer` to upper case
void string_to_upper(char *buffer) {
    int counter = 0;
    int difference = 0;
    while (buffer[counter] != '\0') {
        if (buffer[counter] >= 'a' && buffer[counter] <= 'z') {
            difference = buffer[counter] - 'a';
            buffer[counter] = 'A' + difference;
        }
        counter++;
    }
}
