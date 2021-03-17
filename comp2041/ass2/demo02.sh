#!/bin/dash

# a simple demo for correct implementations
# demos 3 nested if statements

if test this = rand
then
    if test this = stillgood
    then
        if test this = verygood
        then    
            echo verygood!
        else 
            echo stillgood
        fi
        exit 0;
    elif test this = good
    then
        echo good
        exit 0;
    fi
fi

exit 1;
