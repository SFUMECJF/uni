#!/usr/bin/perl

use warnings;
use strict;
use Scalar::Util qw(looks_like_number);

my %seen = ();
my $string = '';
my $word = '';
my @strings = <STDIN>;

my $str1 = -1;
my $str2 = -1;

my $replace1 = '';
my $replace2 = '';

foreach $string (@strings) {
    my @allNums = $string =~ /(\d+)/g;
    if (scalar(@allNums) >= 2) {
        #print ("FOUND");
        my $first = $allNums[0];
        my $second = $allNums[scalar(@allNums) -1];
        $string =~ s/$second/$first/;
        $string =~ s/$first/$second/;
    }
    print ("$string");
}


