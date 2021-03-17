#!/usr/bin/perl -w

# get all includes in file
sub getInclude {
	$file = $_[0];

	my @includes = ();

	open (parcedFile, "<" , "$file") or die $!;
	while (my $line = <parcedFile>) {
		if ($line =~ /^\s*#include \".*\"/) {		
			$line =~ /(\".*\")/;	
			# get ready to add	
			$include = $1;
			$include =~ s/\"//g;			
			$include =~s/\.h//g;	
			#push to stack	
			push (@includes, $include);
		}
	}
	close parcedFile;

	return @includes;
}

# construct the files 
open (Makefile, ">", "Makefile") or die $!;

$date = `date`;
print Makefile "#Makefile generated at $date\n";
print Makefile "CC = gcc\nCFLAGS = -Wall -g\n\n";

$main = "";
foreach $file (glob "*.c") {
	open (parcedFile, "<", $file) or die $!;
	while (my $line = <parcedFile>) {
		if ($line =~ /^\s*(int|void)\s*main\s*\(/) {
			$main = $file;
			$main =~ s/\.c//g;			
			last;
		}
	}	
	
	close (parcedFile);

	if (!$main eq "") {
		last;
	}
}


if ($main eq "") {
	exit 1;
}

my %objects = ($main, 1);
my @check = getInclude("$main.c");

while (1) {
	$size = @check;
	if ($size == 0) {
		last;
	}

	$o = pop(@check);
	if (!defined($objects{$o})) {
		@arr = getInclude("$o.h");
		push(@check, @arr);
	}

	$objects{$o} = 1;
}

print Makefile "$main:\t";
foreach my $key (keys %objects) {
	print Makefile "$key.o ";
}

print Makefile "\n\t\$(CC) \$(CFLAGS) -o \$@";
foreach my $key (keys %objects) {
	print Makefile " $key.o";
}

print Makefile "\n\n";

foreach my $object (keys %objects) {
	print Makefile "$object.o: ";

	my @arr = getInclude("$object.c");
	foreach (@arr) {
		print Makefile "$_.h ";
	}
	print Makefile "$object.c\n";
}

close(Makefile);