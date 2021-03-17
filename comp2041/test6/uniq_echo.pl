#!/usr/bin/perl -w

my %seen = ();

foreach $arg (@ARGV) {
    if (!$seen{$arg}) {
        print("$arg ");
        $seen{$arg} = 1;
    }
}
print("\n");