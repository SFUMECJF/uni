#!/bin/dash

./shrug-commit -a -m "subset1 failure"
./shrug-rm text
./shrug-rm --force text1
./shrug-rm --cached text2
./shrug-rm --force --cache text3
./shrug-commit -a -m "even more failure"
echo line1 > text
echo line2 > text1
echo line3 > text2
echo line4 > text3
./shrug-status