#!/bin/dash

./shrug-init

echo line1 > text

./shrug-rm text
./shrug-rm --force text
./shrug-rm --cached text
./shrug-rm --force --cache text

./shrug-add text
./shrug-commit -m "unchanged text commit1"

echo lineadd >> text

./shrug-add text 
./shrug-rm text
./shrug-rm --force text
./shrug-rm --cached text
./shrug-rm --force --cache text

./shrug-commit -m "commit2 after failed rm"
./shrug-log 

./shrug-rm --force text 
./shrug-add text 
./shrug-commit -m "fail commit3 after rm"

echo lineadd >> text
./shrug-commit -m "fail commit3 after recreation staged changes"
./shrug-status
./shrug-log
./shrug-show :text




