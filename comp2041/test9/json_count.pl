#!/usr/bin/perl

use warnings;
use strict;

my $filename = '';

my $arg = '';
foreach $arg (@ARGV) {
    if ($arg =~ /.json$/) {
        $filename = $arg;
    }
}

open my $whales, $filename or die "$filename cannot be opened\n";

my $total = 0;
my $count = 0;

while (my $whale = <$whales>) {
    if ($whale =~ /"how_many": (\d+)/i) {
        $count = $1;
    }
    if ($whale =~ /"species": "(.*)"/i) {
        if ($1 eq $ARGV[0]) {
            $total += $count;
        }
    }
}

print ("$total\n");
