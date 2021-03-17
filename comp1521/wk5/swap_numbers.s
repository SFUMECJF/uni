# read 10 numbers into an array
# swap any pairs of of number which are out of order
# then print the 10 numbers

# i in register $t0,
# registers $t1 - $t3 used to hold temporary results

main:

    li $t0, 0           # i = 0
loop0:
    bge $t0, 10, end0   # while (i < 10) {

    li $v0, 5           #   scanf("%d", &numbers[i]);
    syscall             #

    mul $t1, $t0, 4     #   calculate &numbers[i]
    la $t2, numbers     #
    add $t3, $t1, $t2   #
    sw $v0, ($t3)       #   store entered number in array

    add $t0, $t0, 1     #   i++;
    b loop0             # }

end0:


    # PUT YOUR CODE HERE
    li $t0, 0           # i = 1

swap_loop:
    bge $t0, 10, end_swap   # while (i < 10) {

    mul $t1, $t0, 4     #   calculate &numbers[i]
    la $t2, numbers     #
    add $t3, $t1, $t2   #
    
    #gets number[i]
    lw $t5, ($t3)  

    #gets number[i-1]
    sub $t4, $t3, 4
    lw $t6, ($t4)

    blt $t5, $t6, swap_numbers
    
    add $t0, $t0, 1     #   i++;
    j swap_loop    # }

swap_numbers:
    move $a0, $t5
    move $a1, $t6

    #numbers[i] = y;
    sw $a1, ($t3)  
    #number[i-1] = x;
    sw $a0, ($t4)

    add $t0, $t0, 1     #   i++;

    j swap_loop

end_swap:
    li $t0, 0           # i = 0

print_loop:
    #while (i < 10) 
    bge $t0, 10, end1

    #finds the next number and pulls to be printed
    mul $t1, $t0, 4     #   calculate &numbers[i]
    la $t2, numbers     #
    add $t3, $t1, $t2   #
    lw $a0, ($t3)       #   store entered number in array
    
    li $v0, 1           #   printf("%d", numbers[i])
    syscall

    li   $a0, '\n'      #   printf("%c", '\n');
    li   $v0, 11
    syscall

    #i++;
    add $t0, $t0, 1
    
    j print_loop
end1:

    jr $31              # return

.data

numbers:
    .word 0 0 0 0 0 0 0 0 0 0  # int numbers[10] = {0};

