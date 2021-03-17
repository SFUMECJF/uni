#!/usr/bin/perl -w


use warnings;
use strict;

open(my $F, '<', $ARGV[0]) or die ("Cannot open file $ARGV[0]");

my @input = <$F>;
close ($F);


my $lines = 0;
my $string = '';
for $string (@input) {
    $lines++;
}


if ($lines % 2 == 0 && $lines != 0) {
    print($input[- 1 + ($lines / 2)]);
    print($input[$lines / 2]);
} elsif ($lines != 0) {
    print($input[$lines / 2]);
}