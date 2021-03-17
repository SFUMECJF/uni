#!/usr/bin/perl -w

use warnings;
use strict;
#use File::DirCompare;

my @dir1 = <"$ARGV[0]/*">;
my @dir2 = <"$ARGV[1]/*">;
my $dirFile1 = '';
my $dirFile2 = '';

foreach $dirFile1 (@dir1) {
    my $copy1 = $dirFile1;
    $copy1 =~ s/.*\///;
    foreach $dirFile2 (@dir2) {
        my $copy2 = $dirFile2;
        $copy2 =~ s/.*\///;
        #$dirFile2 =~ s/.*\///;
        if ($copy1 eq $copy2) {
            if (read_file($dirFile1) eq read_file($dirFile2)) {
            print("$copy1\n");
            last;
            }
        }
    }     
    
}

sub read_file {
    my ($file) = @_;
    open my $F, '<', $file or die "cannot open file";
    my @lines = <$F>;
    close $F;
    return join "", @lines;
}