#!/usr/bin/perl -w

my $string = '';
my %seen = ();
my $limit = $ARGV[0];
my $tracker = ();
while ($string = <STDIN>) {
    if ($seen{$string}) {
        if ($tracker{$string} == ($limit - 1)) {
            print("Snap: $string");
            last;
        } else {
            $tracker{$string} ++;
        }
    } else {
        $seen{$string} = 1;
        $tracker{$string} = 1;
    }
}