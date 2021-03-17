#!/bin/dash

./shrug-init

./shrug-add nothing
./shrug-commit -m "failed first"

echo someline > 0.dasdsad
echo someline > 1.dsadasd

./shrug-add 0.dasdsad 1.dsadasd
./shrug-commit -m "random filetype first commit"
./shrug-show :0.dasdsad
./shrug-show :1.dasdsad

echo mumbojumbo#*@!&(@!* >> 0.dasdsad
echo mumbojumbo#*@!&(@!* >> 1.dsadasd

./shrug-add 0.dasdsad 1.dsadasd
./shrug-commit -m "mumbojumbo second commit"
./shrug-show :0.dasdsad
./shrug-show :1.dasdsad

./shrug-log
