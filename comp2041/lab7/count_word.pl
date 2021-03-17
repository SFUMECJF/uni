#!/usr/bin/perl

$args = lc("$ARGV[0]");
$total = 0;

while (<STDIN>) {
	chomp;
	my @string = split("[^a-zA-Z]", $_);

	foreach (@string) {
		if (lc("$_") eq $args) {
			$total++;
		}
	}
}

print ("$ARGV[0] occurred $total times\n");