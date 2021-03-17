#!/bin/dash

echo line1 > text
echo line2 > text1
echo line3 > text2
echo line4 > text3

./shrug-init

./shrug-add text text1
./shrug-commit -m "first commit"

./shrug-commit -m "failed second commit"

./shrug-add text2 text3
./shrug-commit -m "second commit"

./shrug-log
