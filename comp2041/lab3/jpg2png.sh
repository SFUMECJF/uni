#!/bin/bash

for file in *.jpg; do
	fileName="${file%%.*}"
	if test -f "${fileName}.png"; then
		echo "${fileName}.png already exists"
		exit 1
	fi
done


for file in *.jpg; do
	fileName="${file%%.*}"
	
	convert "${fileName}.jpg" "${fileName}.png"
	rm -rf "$file"
done