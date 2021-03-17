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
	
    # Loop to find freq
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

    # fin and print results
	printf("%4d/%6d = %.9f %s\n", $current, $total, $current/$total, $basename);
    close(file);
}