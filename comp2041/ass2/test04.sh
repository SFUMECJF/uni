#!/bin/dash
# this is a test for some edge/ridiculous cases covered by all 4 subsets
# it also hits things not tested by other tests

rand_sub() {
    rand=$99
    test $((rand % 2)) -eq 1 && return 1
    return 0
}

while test $bigEurrent -le $bigEnd
do
    echo '"listen to me please" they yelled'
    num=2
    num=$((num + 1))
    newDiv=`expr $num / 1000`
    newMod=`expr $num % 1000`
    numAdd=`expr $num + 1000`
    newSub=`expr $num - 1000`
    for something in anything
    do
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
    done
done
