# Read 10 numbers into an array
# print 0 if they are in non-decreasing order
# print 1 otherwise

# i in register $t0

main:

    li $t0, 0           # i = 0
loop0:
    bge $t0, 10, end_assign   # while (i < 10) {

    li $v0, 5           #   scanf("%d", &numbers[i]);
    syscall             #

    mul $t1, $t0, 4     #   calculate &numbers[i]
    la $t2, numbers     #
    add $t3, $t1, $t2   #
    sw $v0, ($t3)       #   store entered number in array

    add $t0, $t0, 1     #   i++;
    b loop0             # }

end_assign:
    #int swapped = 0
    #i = 0;
    #then jumps to next loop
    li $t0, 1
    li $t1, 0
    j end0

end0:
    #while (i < 10) 
    bge $t0, 10, end_print

    mul $t2, $t0, 4     #   calculate &numbers[i] and numbers [i-1]
    la $t3, numbers     #
    add $t4, $t3, $t2   #
    lw $t6, ($t4)
    
    sub $t5, $t4, 4
    lw $t7, ($t5)

    blt $t6, $t7, set_swapped
    
    #i++;
    add $t0, $t0, 1

    j end0


set_swapped:
    li $t1, 1
    add $t0, $t0, 1
    j end0

end_print:
    #printf("%d", set_swapped);
    move $a0, $t1
    li $v0, 1 
    syscall

    li $a0, '\n'      #   printf("%c", '\n');
    li $v0, 11
    syscall
    
    j $31

.data

numbers:
    .word 0 0 0 0 0 0 0 0 0 0  # int numbers[10] = {0};

