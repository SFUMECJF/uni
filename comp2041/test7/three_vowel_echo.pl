#!/usr/bin/perl -w

use warnings;
use strict;


my $string = '';
foreach $string (@ARGV) {
    if ($string =~ /[AEIOUaeiou]{3,}/) {
        print("$string ");
    }
}

print("\n");
