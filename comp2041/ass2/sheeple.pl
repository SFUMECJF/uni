#!/usr/bin/perl -w

# Made by John Dao z5258962 
# August 2020

# This is the main file "sorter" for ass2.
# Handles the parcing and sorting of shell script lines and runs their 
# specific packages
# assumes that the shell file will be appropriately styled 
# and execute correctly

# also handles the basic cases not needed to be supported with subsets
use strict;
use warnings;

use Cwd qw( abs_path );
use File::Basename qw( dirname );
use lib dirname(abs_path($0));

# import supported subsets as separate packages
use Subset0;
use Subset1;
use Subset2;
use Subset3;
use Subset4;

# open requested file
my $shellScript;
open $shellScript, '<', "$ARGV[0]" or die "File '$ARGV[0]' cannot be opened\n";
my @script = <$shellScript>;

my $sortLine;
my $lineNumb = 0;

# loops through the entire script line by line and runs the sorting function
while (my $sortLine = $script[$lineNumb]) {
    # removes newline endings
    chomp($sortLine);
    sortLine($sortLine);
    $lineNumb++;
}

close $shellScript;

# sorts given line given the command/prefix
sub sortLine {
    my ($line) = @_;
    # convert initial shell declaration to perl
    if ($line =~ /^\#\!\/bin\/dash/) { 
        print("#!/usr/bin/perl -w\n"); 
    }

    # comment
    elsif ($line =~ /^\#/) {
        print("$line\n")       
    }

    # empty line/ only new line
    elsif ($line =~ /^$/) {
        print("\n");
    }

    # echo
    elsif($line =~ /echo /) {
        Subset0::echoLine($line);
    }
    
    # if statements
    elsif ($line =~ /if/ || $line =~ /then/ || $line =~ /else/ 
            || $line =~ /fi$/ || $line =~ /elif/) {
        Subset2::ifLine($line);
    }

    # var declaration
    elsif($line =~ /=/) {
        Subset0::varLine($line);
    }

    # ls
    elsif($line =~ /ls/) {
        Subset0::lsLine($line);
    }
    
    # pwd
    elsif ($line =~ /pwd/) {
        Subset0::pwdLine($line);
    }

    # date 
    elsif ($line =~ /date/) {
        Subset0::dateLine($line);
    }

    # id
    elsif ($line =~ /id/) {
        Subset0::idLine($line);
    }

    # cd
    elsif ($line =~ /cd/) {
        Subset1::cdLine($line);
    }

    # rm (untested)
    elsif ($line =~ /rm -f/) {
        Subset4::rmLine($line);
    }

    # for loop
    # also covers while loop do and done
    elsif ($line =~ /for/ || $line =~ /done/ || $line =~ /do/) {
        Subset1::forLine($line);
    }
    # exit 
    elsif ($line =~ /exit/) {
        Subset1::exitLine($line)
    }
    # print
    elsif ($line =~ /read/) {
        Subset1::readLine($line);
    }

    # while loop
    elsif ($line =~ /while/) {
        Subset3::whileLine($line);
    }
    # local variable
    elsif ($line =~ /local/) {
        Subset4::localLine($line);
    }
    # else its a sub
    elsif ($line =~ s/[(,)]//g) {
        handleSub($line);
    }
}

# handles case that the function is a sub declaration
# will continue to parce script separately 
# until the end of the sub is detected
sub handleSub {
    my ($line) = @_;
    # get beginning of sub. Note that subs always begin with 0 indent
    $line =~ s/[(,)]//g;
    print("sub $line\n");
    while (($line =~ /}/) == 0) {
        $lineNumb++;
        $line = $script[$lineNumb];
        chomp($line);
        
        #sort subset4 specific lines

        # get argument input as ends in int
        if ($line =~ /\$[\d]/) {
            Subset4::getArgs($line);
        # case of end return or } bracket to end sub
        } elsif ($line =~ /return [\d]$/ || $line =~ /}/) {     
            #test line
            if ($line =~ /test/) {
                Subset4::testLine($line);
            } else {
                print("$line");
                if (($line =~ /}/) == 0) {
                    print(";");
                }
                print("\n");
            }
            
        # else its an already implemented function
        } else {
            sortLine($line);
        }
        
    }
}
