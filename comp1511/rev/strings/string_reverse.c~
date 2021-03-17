// CONVERT A STRING TO UPPERCASE
// CREATED BY
//  ... (Z0000000)
//  ... (Z0000000)
// CREATED ON 2017-08-??
// TUTOR'S NAME (DAYHH-LAB)

#include <stdio.h>

/// THIS WON'T WORK!
///
/// str only points to a string literal, which it is not legal to change.
/// If you attempt to modify it on Linux you will get a runtime error.
//
// char *str = "Hello!"
// string_reverse(str)

void string_reverse(char *buffer);

int main(int argc, char *argv[]) {
    char str[] = ".'neetneves' :egassem terces A";
    string_reverse(str);
    printf("%s\n", str);
    return 0;
}

// Takes a string in `buffer`, and reverses it in-place.
void string_reverse(char *buffer) {
    int storage[999] = {};
    int counter = 0;
    
    while (buffer[counter] != '\0') {
        storage[counter] = buffer[counter];
        counter++;
    }
    counter--;
    int reversalCounter = 0;
    while (counter >= 0) {
        buffer[reversalCounter] = storage[counter];
        reversalCounter++;
        counter--;
    }
}
