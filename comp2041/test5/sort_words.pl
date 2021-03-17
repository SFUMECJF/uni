#!/usr/bin/perl -w

my $string;
foreach my $line (<STDIN>) {
    chomp($line);
    my @split = split(' ', $line);
    @split = sort @split;
    foreach $sorted (@split) {
        print("$sorted ");
    }
    print("\n");
    
}