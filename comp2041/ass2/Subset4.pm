#!/usr/bin/perl -w

# Made by John Dao z5258962 
# August 2020
# This is the perl file that handles all functions associated with subset4

=function list
    This file handles these declarations for subset04
        - rm
        - no other examples were tested for within the examples :/

=cut

package Subset4;

use warnings;
use strict;
use Scalar::Util qw(looks_like_number);

use Helper;

# local variable print 
sub localLine {
    my ($localString) = @_;

    # get proper indentation
    my $whiteSpace = Helper::getWhitespace($localString);

    #remove local to get args and split
    $localString =~ s/local //;
    my @arguments = split(' ', $localString);
    
    #print beginning of statement
    print($whiteSpace);
    print("my (");

    # print all args except last
    foreach my $argument (@arguments[0 .. $#arguments - 1]) {
        print("\$$argument, ");
    }
    print("\$$arguments[$#arguments]);\n")
}

# get args specifically for sub functions. Just prints out arg @_ line
sub getArgs {
    my ($argString) = @_;
    my $whiteSpace = Helper::getWhitespace($argString);
    $argString = Helper::removeWhitespace($argString);
    
    $argString =~ s/\$/\$_[/g;
    $argString =~ s/=/ = /;
    $argString = "\$" . $argString;
    # deincrement int
    $argString =~ s/(\d+)$/$1 - 1/e;
    print($whiteSpace);
    print("$argString];\n")

}

sub testLine {
    my ($testString) = @_;

    # remove test
    $testString =~ s/test //g;
    # remove brackets
    $testString =~ s/[(,),]//g;

    # sort string to appropriate perl style
    $testString =~ s/\% /\% \$/g;
    $testString =~ s/-eq/==/g;
    $testString =~ s/&&/and/g;

    # print with indentation
    print("$testString;\n");
}

# untested rm line that i saw in subset4
sub rmLine {
    my ($rmLine) = @_;
    my $whiteSpace = Helper::getWhitespace($rmLine);
    $rmLine = Helper::removeWhitespace($rmLine);

    print($whiteSpace);
    print("system \"$rmLine\";\n");
}

1;