main:
    li $v0, 5           #   scanf("%d", &x);
    syscall             #
    move $t0, $v0

    #int i = 0;
    li $t1, 0

outer_loop:
    #while (i < x)
    bge $t1, $t0, end
    #int j = 0;
    li $t2, 0

inner_loop:
    bge $t2, $t0, end_inner_loop

    li $a0, '*'         #   printf("%d\n", 42);
    li $v0, 11
    syscall

    #j = j + 1
    add $t2, $t2, 1

    j inner_loop

end_inner_loop: 
    add $t1, $t1, 1
    li   $a0, '\n'      #   printf("%c", '\n');
    li   $v0, 11
    syscall
    j outer_loop

end:

    li $v0, 0           # return 0
    jr $31
