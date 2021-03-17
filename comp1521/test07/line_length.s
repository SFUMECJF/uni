# read a line and print its length

main:
    la   $a0, str0       # printf("Enter a line of input: ");
    li   $v0, 4
    syscall

    la   $a0, line
    la   $a1, 256
    li   $v0, 8          # fgets(buffer, 256, stdin)
    syscall              #

    la   $a0, str1       # printf("Line length: ");
    li   $v0, 4
    syscall

    #counter = 0;
    li $t0, 0
    #string_len = 0
    li $t9, 0
count_loop:
    la $t1, line
    add $t2, $t1, $t0
    lb $t3, ($t2)

    beq $t3, 0, print

    add $t9, $t9, 1

    add $t0, $t0, 1
    j count_loop

print:
    move   $a0, $t9         # printf("%d", i);
    li   $v0, 1
    syscall

    li   $a0, '\n'       # printf("%c", '\n');
    li   $v0, 11
    syscall

    li   $v0, 0          # return 0
    jr   $31


.data
str0:
    .asciiz "Enter a line of input: "
str1:
    .asciiz "Line length: "


# line of input stored here
line:
    .space 256

