#!/usr/bin/perl -w

my @input = <STDIN>;

for $string (@input) {
    if ($string =~ s/^\s*#//g) {
        $string = $input[$string-1];
    }
    print("$string");
}
