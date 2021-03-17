#!/bin/dash

# this file tests more subset0 commands

echo line1 > text
echo line2 > text1
echo line3 > text2
echo line4 > text3

./shrug-init

./shrug-add text text1
./shrug-commit -m "first_commit"
./shrug-show first_commit:text
./shrug-show first_commit:text1

./shrug-add text2 text3
./shrug-commit -m "second_commit"
./shrug-show
./shrug-show first_commit:text2
./shrug-show first_commit:text3

echo moreline >> text
echo moreline >> text2

./shrug-add text1 text3
./shrug-commit -m "nothing"
./shrug-show first_commit:text1
./shrug-show first_commit:text3

./shrug-show :text1
./shrug-show :text3

./shrug-add text text2
./shrug-commit -m "third_commit"
./shrug-show third_commit:text
./shrug-show third_commit:text

./shrug-log
