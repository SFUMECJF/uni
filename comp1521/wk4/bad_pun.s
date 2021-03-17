#A simple program that attempts to be punny

main:
    #Gets string address
    la $a0, string 
    #Calling print function
    li $v0, 4 
    syscall

    #Return value
    jr $ra 

    .data
string:
    .asciiz "I MIPS you!\n"