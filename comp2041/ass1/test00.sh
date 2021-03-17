#!/bin/dash

./shrug-show
./shrug-add file1
./shrug-commit -m "subset0 failure"
./shrug-log
./shrug-show :file1
