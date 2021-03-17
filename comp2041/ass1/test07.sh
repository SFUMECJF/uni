#!/bin/dash

./shrug-init

echo line1 > text
echo line2 > text1
echo line3 > text2
echo line4 > text3

./shrug-commit -a -m "get everything in here first commit"
./shrug-rm text
./shrug-status

./shrug-rm --cached text1
./shrug-status

./shrug-rm --force--cached text2
./shrug-status

./shrug-rm --force text3
./shrug-rm --force text3
./shrug-status

./shrug-rm text
./shrug-rm --force text
./shrug-rm --cached text
./shrug-status

