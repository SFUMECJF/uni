#!/bin/dash

./shrug-commit -a -m "get nothing in nowhere failed first commit"
./shrug-status
./shrug-log

echo line1 > text
echo line2 > text1
echo line3 > text2
echo line4 > text3

./shrug-commit -a -m "get everything in nowhere failed first commit"
./shrug-status
./shrug-log

./shrug-init
./shrug-commit -a -m "get everything in here first commit"
./shrug-log


