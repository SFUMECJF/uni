#!/usr/bin/perl -w

my $largest = 0;

push @numbers, /\-?(?:\d+\.?\d*|\.\d+)/g foreach @lines = <STDIN>;
exit if !(@numbers);
$largest = (sort {$b <=> $a} @numbers)[0];
(sort {$b <=> $a} /\-?(?:\d+\.?\d*|\.\d+)/g)[0] == $largest && print foreach @lines;
