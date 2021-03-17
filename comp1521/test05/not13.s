main:
    li $v0, 5           #   scanf("%d", &x);
    syscall             #
    move $t0, $v0

    li $v0, 5           #   scanf("%d", &y);
    syscall             #
    move $t1, $v0

    la $t2, ($t0)
    #i = x + 1
    add $t2, $t2, 1

print_loop:
    bge $t2, $t1, end

    bne $t2, 13, print_not_13

    add $t2, $t2, 1

    j print_loop

print_not_13:

    move $a0, $t2          #   printf("%d", 42);
    li $v0, 1
    syscall

    li   $a0, '\n'      #   printf("%c", '\n');
    li   $v0, 11
    syscall
    add $t2, $t2, 1

    j print_loop

end:

    li $v0, 0           # return 0
    jr $31
