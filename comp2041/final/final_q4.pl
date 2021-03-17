#!/usr/bin/perl

use warnings;
use strict;

my %seen = ();
my $string = '';
my @strings = <STDIN>;
my %printed = ();

my @array;
foreach $string (@strings) {
    $string =~ s/^[^\|]*//;
    $seen{$string} += 1
}

foreach $string (@strings) {
    $string =~ s/^[^\|]*//;
    if ($seen{$string} == 2) {
        $string =~ s/\|//g;
        $string =~ s/[a-z].*//;
        $string =~ s/[A-Z]//g;
        if (!($printed{$string})) {
            push (@array, $string);
        }
        $printed{$string} ++;
    }
}

my @sorted = sort { $a <=> $b} @array;

foreach $string (@sorted) {
    print "$string";
}
