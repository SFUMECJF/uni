#!/bin/dash
# this is a test for some subset 3 and 4 functions

rm -f $something

arg1=$1
arg99=$99

setNum=$something
setNum=$((setNum + 1))

echo /yes/yes/eyes

ls -las "$@"

testsub() {
    local some thing
    arg1=$1
    arg99=$99
    num=1
    test $((num % arg1)) -eq 100 && return 0

    return 1
}