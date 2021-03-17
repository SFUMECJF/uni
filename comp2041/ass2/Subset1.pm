#!/usr/bin/perl -w

# Made by John Dao z5258962 
# August 2020
# This is the perl file that handles all functions associated with subset1

=function list
    This subset covers for loops and extra line and built in functions of
        - exit
        - read

=cut

package Subset1;

use warnings;
use strict;
use Scalar::Util qw(looks_like_number);

use Helper;

        ### BUILD IN FUNCTIONS ##$

# sub for exitLine case
sub exitLine {
    my ($exitString) = @_;
    print("$exitString\n")
}

# sub for read case
sub readLine {
    my ($readString) = @_;
    $readString =~ s/read /\$/g;
    
    # gets indentation amount
    my $whiteSpace = $readString;
    $whiteSpace =~ s/[^\s+]//g;
    
    # removes indentation from var string read so that 
    # whitespace can be used instead
    $readString =~ s/^\s+//;

    # print
    print("$whiteSpace");
    print("$readString = <STDIN>;\n");
    print("$whiteSpace");
    print("chomp $readString;\n");
}

    ### statements ###

# Statements with syntax. Most conform to changing string to appropriate 
# in perl and printing. Else will comment in functions

# cd
sub cdLine {
    my ($cdString) = @_;
    $cdString =~ s/cd /chdir '/g;
    print("$cdString\';\n");
}

# for loop
# also covers while doop do and done
sub forLine {
    my ($forString) = @_;
    # for statement
    if ($forString =~ /for/) {
        my $iterator = $forString;
        # get the iterator name
        $iterator =~ s/for (.*?) in.*$/$1/;

        # gets all of the arguments for loop
        my @arguments = split(' ', $1) if $forString =~ /in (.*)/s;;

        # gets indentation and removes it from the iterator
        my $whiteSpace = Helper::getWhitespace($iterator);
        $iterator = Helper::removeWhitespace($iterator);

        # prints starting line for for loop with appropriate indentation
        print($whiteSpace);
        print("foreach \$$iterator (");
        # print all arguments to iterate through. 
        # Adds quote marks for strings
        foreach my $argument (@arguments[0 .. $#arguments - 1]) {
            if (looks_like_number($argument)) {
                print("$argument, ");
            } else {
                print("'$argument', ");
            }
        }
        # prints last variable without the , and '
        if (looks_like_number($arguments[$#arguments])) {
            print("$arguments[$#arguments]");
        } else {
            print("'$arguments[$#arguments]')");
        }
    }
    # done HAS TO BE FIRST AS do has DONE in it. IF it isnt DONE then its do
    elsif ($forString =~ /done/) {
        my $whiteSpace = Helper::getWhitespace($forString);
        print($whiteSpace);
        print("}\n");
    }

    # start statement do
    elsif ($forString =~ /do/) {
        print(" {\n");
    }
}

1;