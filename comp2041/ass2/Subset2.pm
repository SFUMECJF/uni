#!/usr/bin/perl -w

# Made by John Dao z5258962 
# August 2020
# This is the perl file that handles all functions associated with subset2

=function list
    This subset covers all if statements and introduces no new built u
    in functions.
    Subset 3 ifstatements are also handled in here

=cut


package Subset2;

use warnings;
use strict;
use Scalar::Util qw(looks_like_number);

use Helper;

# if statement
sub ifLine {
    my ($ifLine) = @_;

    # handles elif as well
    if ($ifLine =~ /if/) {
        if ($ifLine =~ s/\[ //g) {
            $ifLine =~ s/ \]//g;
        }
        
        # get arguments for if statement
        my $copy = $ifLine;
        $copy =~ s/if //;
        my @arguments = split(' ', $copy);

        # get start if statement with whitespace/indentation
        $ifLine =~ s/test .*//;
        $ifLine =~ s/-d .*//;
        $ifLine =~ s/-r .*//;
        # check for elif
        $ifLine =~ s/elif/} elsif/g;

        # print starting if line
        print("$ifLine\(");
        
        # print arguments with = sign and closing bracket
        foreach my $argument (@arguments) {
            if ($argument =~ /=/) {
                print(" eq ");
            } elsif ($argument =~ /^-r/) {
                print("-r ");
            }  elsif ($argument =~ /-d/) {
                print("-d ");
            } elsif (($argument =~ /test/) == 0) {
                print("'$argument'");
            }
        }
        print(") ");
    }
    
    # then line
    elsif ($ifLine =~ /then/) {
        #$ifLine = Helper::getWhitespace($ifLine);
        #print($ifLine);
        print("{\n");
    }

    # else line
    elsif ($ifLine =~ /else/) {
        $ifLine = Helper::getWhitespace($ifLine);
        print($ifLine);
        print("} else {\n");
    }
    elsif ($ifLine =~ /fi/) {
        $ifLine = Helper::getWhitespace($ifLine);
        print($ifLine);
        print("}\n");
    }
}

1;