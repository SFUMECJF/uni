#!/usr/bin/perl -w

open (my $F, '<', $ARGV[0]) or die "CANT OPEN FILE";

my @input = <$F>;
close ($F);

if (!@input) {
    exit;
}

my @alphaInput = sort @input;

my @final = sort {length $a <=> length $b} @alphaInput;

my $string = '';
foreach $string (@final) {
    print("$string");
}
