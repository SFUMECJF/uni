#!/usr/bin/perl -w

# Made by John Dao z5258962 
# August 2020
# This is the perl file that contains some helper functions

=function list
    getWhitespace Gets all of indentation for given string
    removeWhitespace removes indentation from a string and returns
=cut

package Helper;

# gets whitespace indentation from string. Mainly used for functions that
# need to change beginning of string (indentation is lost)
sub getWhitespace {
    my ($line) = @_;
    my $copy = $line;
    $copy =~ s/[^\s+](.*)//g;
    return $copy;
}

# removes whitespace/indentation from given string and returns
sub removeWhitespace {
    my ($line) = @_;;
    $line =~ s/^\s+//;
    return $line;
}

1;