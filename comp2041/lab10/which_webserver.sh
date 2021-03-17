#!/bin/sh

for url in "$@"
do
    printf $url
    curl -v --silent $url 2>&1 | grep erver:| cut -f2- -d:
done