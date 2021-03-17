#!/bin/sh

egrep "name" $1 | cut -d "\"" -f4 | sort | uniq