#!/bin/sh

egrep "$1" |
cut -d\| -f3|
uniq -c|
cut -d, -f2|
cut -d\  -f2|
sort
