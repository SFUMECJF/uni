#!/bin/sh

args=$@

for line in "${args[@]}"
do
    echo $line

done | sort