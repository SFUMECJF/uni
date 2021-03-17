#!/bin/sh

lower=$1
upper=$2
file=$3

while ((lower <= upper))
do
    echo $lower >> $file
    lower=$((lower+1))
    
done