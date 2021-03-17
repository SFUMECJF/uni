#!/bin/dash
# this is a test for some subset 2 and 3 functions

echo "memememe"
# lots of  nestings
while test $current -le $end
do
    for n in files
    do 
        if test -r /yippie/yay
        then

            if [ -d /yay/moreyay ]
            then
                echo "yippie"
            elif [ -d /yay/none ]
            then 
                echo "boo"
            else
                exit 1
            fi
        fi
    done
done

