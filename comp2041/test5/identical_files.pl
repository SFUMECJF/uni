#!/usr/bin/perl -w

use File::Compare;

my @args = @ARGV;

my $file1;
my $file2;

foreach $file1 (@args) {
    foreach $file2 (@args) {
        if (!(read_file($file1) eq read_file($file2))) {
            print("$file2 is not identical\n");
            exit;
        }
    }
}


print "All files are identical\n";

sub read_file {
    my ($file) = @_;
    open my $F, '<', $file or die "cannot open file";
    my @lines = <$F>;
    close $F;
    return join "", @lines;
}