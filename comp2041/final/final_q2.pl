#!/usr/bin/perl

use warnings;
use strict;

my %seen = ();
my $string = '';
my @strings = <STDIN>;

foreach $string (@strings) {
    $string =~ s/^[^\|]*//;
    $seen{$string} += 1
}

foreach $string (@strings) {
    $string =~ s/^[^\|]*//;
    if ($seen{$string} == 2) {
        $string =~ s/\|.*//;
        $string =~ s/\|//g;
        print "$string\n";
    }
}
