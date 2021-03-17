#!/bin/sh

lower=$1
upper=$2
file=$2

while [$lower -le $upper]
do
    echo $lower\n >> $file
    lower = $lower + 1