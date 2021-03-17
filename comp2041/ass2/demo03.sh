#!/bin/dash

# a simple demo for correct implementations
# while loop statements with test returns and if statements

counter=0
randArg=$1
while test $counter -lt $randArg
do
    if test -d /rand
    then
        echo $counter
        # remove file and exit
        rm -f $rand 
        exit 0
    else 
        echo EXIT IF 42 FAIL NO RANDOM
    fi
    counter=$((counter + 1))
    
done

exit 1 # fail exit