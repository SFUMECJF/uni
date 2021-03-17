#!/usr/bin/perl -w

# Made by John Dao z5258962 
# August 2020
# This is the perl file that handles all functions associated with subset0

=function list
    This subset covers basic echo build in and line functions which are
        - echo
        - ls
        - pwd
        - date
        - id
        - variable declarations
    NOTE!!!! subset 2 and 3 echo is build in already into echoLine :)
    NOTE!!!! Subset 3 and 4 var declaration is also build into here

=cut

package Subset0;

use warnings;
use strict;

    ### BUILD IN FUNCTIONS ###

sub echoLine {
    # get echo input
    my ($echoString) = @_;

    my $printString = $echoString;
    
    # remove possible &&
    $printString =~ s/&&/or/g;
    # remove single quotes. check for double quotes else as you cant
    # have both at the same time
    if ($printString =~ s/'//g == 0) {
        $printString =~ s/"//g;
    }
    
    # replace doublequotes with \" to avoid conflict
    $printString =~ s/"/\\"/g;
    # add print onto string
    $printString = $printString =~ s/echo /print "/r;

    # in case of argument with number, change with argv. Else do normal
    if ($printString =~ /\$[\d]/) {
        # integer arg
        $printString =~ s/\$/\$ARGV[/g;
        # deincrement integer
        $printString =~ s/(\d+)$/$1 - 1/e;
        print("$printString]\\n\";\n");
    }else {
        print("$printString\\n\";\n");
    }

}

    ### STATEMENTS ###

# Statements with syntax. Most conform to changing string to appropriate 
# in perl and printing. Else will comment in functions

# ls
sub lsLine {
    my ($lsString) = @_;
    $lsString =~ s/ls/System \"ls/g;
    if ($lsString =~ /\$\@/) {
        # @ arg
        $lsString =~ s/"\$\@"/\@ARGV/g;
    } 
    print("$lsString\";\n");
}

# pwd 
sub pwdLine {
    my ($pwdString) = @_;
    $pwdString =~ s/pwd/System \"pwd/g;
    print("$pwdString\";\n");
}

# date
sub dateLine {
    my ($dateString) = @_;
    $dateString =~ s/date/System \"date/g;
    print("$dateString\";\n");
}

# id
sub idLine {
    my ($idString) = @_;
    $idString =~ s/id/System \"id/g;
    print("$idString\";\n");
}

# variables.
sub varLine {
    my ($varString) = @_;
    my $whiteSpace = $varString;
    # gets indentation and prints
    $whiteSpace =~ s/[^\s](.*)//g;
    print($whiteSpace);
    if ($varString =~ /\$[\d]/) {
        # integer arg
        $varString =~ s/\$/\$ARGV[/g;
        # deincrement integer
        $varString =~ s/(\d+)$/$1 - 1/e;
        # add bracket to end
        $varString = $varString . "\]";

    }

    # gets variable by removing whitespace and etc
    $varString =~ s/^\s+//;
   
    # prints proper statement with indentation
    $varString = "\$" . $varString;
    if ($varString =~ /=\$/ || $varString =~ /expr/) {
        # if its an expr or (()) var increment
        if ($varString =~ /\d/ || $varString =~ s/expr //g) {
            # removing and replacing to suit perl syntax
            $varString =~ s/expr //g;
            $varString =~ s/[(,)]//g;
            $varString =~ s/\`//g;
            $varString =~ s/=/ = /;
            # check if normal increment. if not its arg value
            if (($varString =~ s/(\d) /$1; /) == 0) {
                print("$varString;\n");
                return;
            }
            # prints if its a normal increment and etc
            print("$varString\n");
            return
        }
        # else its a $ var
        $varString =~ s/[(,),]//g;
        $varString =~ s/=/ = /;
        print("$varString;\n");
    } else {
        # value declaration
        if ($varString =~ /=\d/) {
            $varString =~ s/=/ = /;
            print("$varString\;\n");
        # normal declaration subset0
        } else {
            $varString =~ s/=/ = '/;
            print("$varString\';\n");
        }
    }
}

1;