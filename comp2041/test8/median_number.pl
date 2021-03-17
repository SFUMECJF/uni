#!/usr/bin/perl

use warnings;
use strict;

my @args = @ARGV;

my @sorted = sort {$a <=> $b} @args;

print(@sorted[scalar(@sorted) / 2]);
print("\n");

