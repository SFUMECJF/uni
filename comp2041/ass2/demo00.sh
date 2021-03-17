#!/bin/dash

# a simple demo for correct implementations
# a simple counter that counts to given arg

echo 'testing for "max and min"'

max=$1
counter=0
while test $counter -le $max
do
    echo $counter
    # increment
    counter=`expr $counter + 1`
done

echo "now incrementing to min"

min=$2

while test $counter -le $min
do
    echo $counter
    # increment
    counter=`expr $counter + 1`
done
