#!/bin/dash
# this is a test for some subset 1 and 2 functions

cd /tester

for n in integers
do 
    echo its an integer!
    pwd
    date
    if test n = good
    then
        echo 2!
    elif test n = 3
    then 
        echo 3!
    else 
        echo not 2 or 3!
    fi
done