#!/usr/bin/perl

use warnings;
use strict;
my @strings = <STDIN>;
my $string = '';
my $string2 = '';
my $char = '';

foreach $string (@strings) {
    chomp($string);
    my @split = split(/ /, $string);
    foreach $string2 (@split) {
        my %seen;
        my $new='';
        my @split2 = split (//, $string2);
        $seen{$_}++ foreach (split //, $string2);
        foreach (split //, $string2) { $new.=$_ if $seen{$_}==$seen{$split2[0]}}
        #print "$new and $string2\n";
        if ($new eq $string2) {
            print "$string2 "
        }
    }
    print ("\n");
}
