#!/bin/dash

# a simple demo for correct implementations
# nested while loop in for loop that counts to 10 everytime theres
# something in the list

max=$1

for something in anArray
do
    counter=0
    while test $counter -le $max
    do
        echo $counter
        # increment
        counter=`expr $counter + 1`
    done
done
