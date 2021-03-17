#!/usr/bin/perl -w

use LWP::Simple;

# get course data for comparing & parsing
$courseCode = $ARGV[0];
$courses = get("http://timetable.unsw.edu.au/current/".$courseCode."KENS.html");

$descEnd = "</a></td";

my %seen = ();
# prints out all lines with course code
foreach $line (split("\n", $courses)) {

    # is not sorting. i have no idea why this doesn't sort :/

    # course not ending in number. Checks for 4 ending non-digit chars 
    if ($line =~ /href="($courseCode\d{4}[^#]+\D{1})$descEnd/ && !$seen{$1}) {
        # checks as found
        $seen{$1}++;
        # store as temp to be able to edit
        $temp = $1;
        # remove extranious .html"> and replaces it with " " (space)
        $temp =~ s/.html">/ /;    
        #print 
        print "$temp\n";
    }
    #checks for ending in number. Checks for 1 ending digit
    elsif ($line =~ /href="($courseCode\d{4}[^#]+\D{1}\d{1})$descEnd/ && !$seen{$1}) {
        #same thing happens here
        $seen{$1}++;
        $temp = $1;
        $temp =~ s/.html">/ /;    
        print "$temp\n";
   }
}