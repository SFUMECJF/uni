#!/usr/bin/perl -w

use warnings;
use strict;

my $lower = $ARGV[0];
my $higher = $ARGV[1];

open (my $FILE, ">", $ARGV[2]) or die "CANNOT OPEN FILE";

while ($lower <= $higher) {
    print $FILE "$lower\n";
    $lower++;
}

close ($FILE);