#!/usr/bin/perl

use warnings;
use strict;

my $distinct=0;
my $lines=$ARGV[0];
my $read = 0;
my %seen;

my $arg = '';

while ($arg = <STDIN>) {
    # remove whitespace
    $arg =~ s/ //g;
    # convert to lower case
    $arg =~ tr/[A-Z]/[a-z]/;

    if (!($seen{$arg})) {
        $distinct++;
        $seen{$arg} = 1;
    }

    $read++;
    # break if distinct lines are found
    last if ($distinct == $lines);
    

}

if($distinct != $lines) {
    print "End of input reached after $read lines read - $lines different lines not seen.\n";
} else {
    print "$lines distinct lines seen after $read lines read.\n";
}

