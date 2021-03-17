#!/usr/bin/perl -w
my $input = '';
use Scalar::Util qw(looks_like_number);

while ($input = <STDIN>) {
    @numbers = $input =~ /(\d+(?:\.\d+)?)/g;
    foreach $toRound(@numbers){
        $rounded = int($toRound + 0.5);
        $input =~ s/$toRound/$rounded/;
    }
    print($input);
}



