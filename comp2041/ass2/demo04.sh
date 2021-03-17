#!/bin/dash

# a simple demo for correct implementations
# for loop in stub that is called in while loop

rand_sub() {
    rand=$1
    if test $rand = 42
    then
        echo GOOD
        return 0
    else 
        echo NOT GOOD
        return 1
    fi
}

counter=0
echo 'testing for existance of must have file yes'
if -r eyes/yes
then 
    while test $counter -lt 1000
    do
        randSub $counter && echo 42??
        counter=$((counter + 1))
    done
fi
