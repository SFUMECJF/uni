#include <stdio.h>
#include <stdlib.h>

int main (int argc, char *argv[]) {
    char *address = getenv(argv[1]);

    if (address != NULL && address[0] != '\0') {
        printf("%d\n", 1);
    } else {
        printf("%d\n", 0);
    }
    return 0;
}