#include <stdio.h>
#include <stdint.h>
#include <stdlib.h>
#include <assert.h>

#define N_BCD_DIGITS 8
#define N_BITS 32
#define asciiOffset 48
uint32_t packed_bcd(uint32_t packed_bcd);

int getPower(int powerOf);

int main(int argc, char *argv[]) {

    for (int arg = 1; arg < argc; arg++) {
        long l = strtol(argv[arg], NULL, 0);
        assert(l >= 0 && l <= UINT32_MAX);
        uint32_t packed_bcd_value = l;

        printf("%lu\n", (unsigned long)packed_bcd(packed_bcd_value));
    }

    return 0;
}

// given a packed BCD encoded value between 0 .. 99999999
// return the corresponding integer
uint32_t packed_bcd(uint32_t packed_bcd_value) {
    
    //Initiates a string of ones and zeros (in ascii form)
    //Also assigns it space to work with
    //Note that this is 32 bit!
    char *string = "0";
    string = malloc(sizeof (char)* 33);
    int counter = 0;
    int printer = 31;
    
    //Cycles through the packed BCD value and assigns the value one by one
    //Note that this is backwards as the bitwise shift is >>
    //Does this by comparing if its 1 or not.
    while (counter < N_BITS) {
        if (packed_bcd_value & 1) {
            string[printer] = '1';
        } else {
            string[printer] = '0';
        }
         int places = 0;
    int numbers[N_BCD_DIGITS] = {};
    int internalCounter = 0;
    while (places < N_BCD_DIGITS) {        
        while (internalCounter < 4) {
            numbers[places] = numbers[places] << 1;
            numbers[places] = numbers[places]|(string[counter] - asciiOffset);
            counter++; 
            internalCounter++; 
        }
        internalCounter = 0;
        places++;
    }
         int places = 0;
    int numbers[N_BCD_DIGITS] = {};
    int internalCounter = 0;
    while (places < N_BCD_DIGITS) {        
        while (internalCounter < 4) {
            numbers[places] = numbers[places] << 1;
            numbers[places] = numbers[places]|(string[counter] - asciiOffset);
            counter++; 
            internalCounter++; 
        }
        internalCounter = 0;
        places++;
    }
         int places = 0;
    int numbers[N_BCD_DIGITS] = {};
    int internalCounter = 0;
    while (places < N_BCD_DIGITS) {        
        while (internalCounter < 4) {
            numbers[places] = numbers[places] << 1;
            numbers[places] = numbers[places]|(string[counter] - asciiOffset);
            counter++; 
            internalCounter++; 
        }
        internalCounter = 0;
        places++;
    }
    }    int places = 0;
    int numbers[N_BCD_DIGITS] = {};
    int internalCounter = 0;
    while (places < N_BCD_DIGITS) {        
        while (internalCounter < 4) {
            numbers[places] = numbers[places] << 1;
            numbers[places] = numbers[places]|(string[counter] - asciiOffset);
            counter++; 
            internalCounter++; 
        }
        internalCounter = 0;
        places++;
    }
    //Sets the end of the string of 1s and 0s
    string[counter] = '\0';
    
    //This cycles through the actual string and separates it into 8 separate #s
    //Since the numbers are only 4 bits in size, internal counter is limited
    //To 4.
    //NOTE THE ASCII OFFSET OF 48 AS THEY ARE INPUT AS ASCII 1 AND 0
    //This makes it easier to understand that purely inputing the number and 
    //doing it later. (You can also make a separate function to do this
    counter = 0;
    int places = 0;
    int numbers[N_BCD_DIGITS] = {};
    int internalCounter = 0;
    while (places < N_BCD_DIGITS) {        
        while (internalCounter < 4) {
            numbers[places] = numbers[places] << 1;
            numbers[places] = numbers[places]|(string[counter] - asciiOffset);
            counter++; 
            internalCounter++; 
        }
        internalCounter = 0;
        places++;
    }
    
    //Calculates the final number by shifting each number into its given
    //column.
    counter = 0;
    int finalCounter = 7;
    int final = 0;
    while (finalCounter >= 0) {
        final += numbers[finalCounter] * getPower(counter);
        finalCounter--;
        counter++;
    }

    return final;
}

//Getting the power of.
//Needed as calling other libraries is not allowed
int getPower(int powerOf) {
    
    int power = 1;
    int counter = 0;
    
    while (counter < powerOf) {
        power *= 10;
        counter++;
    }
    
    return power;       
    
}
