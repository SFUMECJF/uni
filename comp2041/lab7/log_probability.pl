#!/usr/bin/perl

use File::Basename;

$args = $ARGV[0];

foreach $txt (glob "lyrics/*.txt") {
    # get filename
	$basename = basename($txt, ".txt");
	open(f, "<", "$txt") or die $1;
    
	$basename =~ s/_/ /g;
	$total = 0;
	$current = 0;
	
    # Loop to find freq. Same stuff
	while (<f>) {
		chomp;
		my @string = split("[^a-zA-Z]", $_);

		foreach (@string) {

			if (lc("$_") eq $args) {
				$current++;
			}
			if ($_ ne "") {
				$total++;
			}
		}
	}

    # fin and print results. Calc log function
	printf("log((%d+1)/%6d) = %8.4f %s\n", $current, $total, log(($current + 1)/$total), $basename);
    close(file);
}
