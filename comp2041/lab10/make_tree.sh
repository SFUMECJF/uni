#!/bin/sh
arg=(make $arg)
cd ./$1
find * -type f -name 'makefile' -o -name 'Makefile' -printf "Running make in $1/%h\n" -exec bash -c "cd $(dirname "{}"); make $2" \;
