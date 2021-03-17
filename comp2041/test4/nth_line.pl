#!/usr/bin/perl -w

use warnings;
use strict;

my $line= $ARGV[0];

open (my $FILE, "<", $ARGV[1]) or die "CANNOT OPEN FILE";

my @lines = <$FILE>;

if ($line <= (scalar @lines)) {
    print ($lines[$line - 1]);
}

close ($FILE)
