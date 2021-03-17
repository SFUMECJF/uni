#!/usr/bin/perl -w

open (my $F, '<', $ARGV[0]) or die "CANNOT OPEN FILE";

my @input = <$F>;
my @output;
foreach $line (@input) {
    $line =~ s/[0-9]{1}/\#/g;
    push (@output, $line);
}

close $F;

open (my $FILE, '>', $ARGV[0]) or die "CANNOT OPEN FILE";

foreach $line (@output) {
    print $FILE $line;
}
close $FILE;