#!/usr/bin/perl -w

# Made by John Dao z5258962 
# August 2020
# This is the perl file that handles all functions associated with subset3

=function list
    Handles while loop. All other functionality for functions is
    already associated with other subsets and has been built in

=cut

package Subset3;

use warnings;
use strict;
use Scalar::Util qw(looks_like_number);

use Helper;

sub whileLine {
    my ($whileLine) = @_;

    if ($whileLine =~ s/\[ //g) {
            $whileLine =~ s/ \]//g;
        }
        
    # get arguments for while statement
    my $copy = $whileLine;
    $copy =~ s/while //;
    my @arguments = split(' ', $copy);
    
    # get start while statement with whitespace/indentation
    $whileLine =~ s/test .*//;
    $whileLine =~ s/-d .*//;
    $whileLine =~ s/-r .*//;

    # print starting while line
        print("$whileLine\(");
    foreach my $argument (@arguments) {
            if ($argument =~ /-le/) {
                print(" <= ");
            } elsif ($argument =~ /^-r/) {
                print("-r ");
            }  elsif ($argument =~ /^-d/) {
                print("-d ");
            }  elsif ($argument =~ /^-lt/) {
                print(" < ");
            } elsif (($argument =~ /test/) == 0) {
                print("$argument");
            }
        }
    print(")");
}

1;
