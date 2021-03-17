#!/usr/bin/perl -w

foreach $char (@ARGV) {
    next if $seen{$char};
    print("$char ");
    $seen{$char} = 1;
}
print("\n");
