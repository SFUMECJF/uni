#!/bin/dash

./shrug-init

echo line1 > text
echo line2 > text1
echo line3 > text2
echo line4 > text3

./shrug-commit -a -m "get everything in here first commit"
./shrug-commit -a -m "get nothing in here failed second commit"

echo line5 > text4

./shrug-add text4
./shrug-status
./shrug-commit -m "third commit"
./shrug-status
./shrug-log


