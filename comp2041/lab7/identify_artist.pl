#!/usr/bin/perl

use File::Basename;

%lyricFreq;

foreach $file (glob "lyrics/*.txt") {

    # Same stuff as before
	$basename = basename($file, ".txt");
	$basename =~ s/_/ /g;
	open(file, "<", "$file") or die $1;

    # total matched
	$total = 0;
	
	while (<file>) {

		chomp;
		my @string = split("[^a-zA-Z]", $_);

		foreach (@string) {

			$string = lc("$_");
			if ($string eq "") {
				next;
			}			
			$lyricFreq{$basename}{$string} += 1;	
			$total++;
		}
	}

    # Store
	$lyricFreq{$basename}{"_total"} = $total;
	close(file);
}

# Calc resembalnce
foreach $song (@ARGV) {

	open(file, "<", "$song") or die $1;
	my %possible;

	while (<file>) {
		chomp;
		my @string = split("[^a-zA-Z]", $_);
		foreach (@string) {
			$string = lc("$_");

			if ($string eq "") {
				next;
			}

			foreach $possability (keys %lyricFreq) {
				$test = ($lyricFreq{$possability}{$string} + 1)/$lyricFreq{$possability}{"_total"};
				$possible{$possability} += log($test);
			}
		}
	}

    # Loop to find highest

    my $highestPossible;
	my $highest;
	foreach $possability (keys %possible) {
		$tester = $possible{$possability};
		if (!defined $highest or $tester > $highest) {
			$highest = $tester;
			$highestPossible = $possability
		}
	}

	printf("$song most resembles the work of $highestPossible (log-probability=%.1f)\n", $highest);
	close(file);
}