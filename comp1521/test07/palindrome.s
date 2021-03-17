
# i in $t0, j in $t1, k in $t2

# $t3, $t4, $t5, $t6, $t7 used for temporary values

main:
    la   $a0, str0       # printf("Enter a line of input: ");
    li   $v0, 4
    syscall

    la   $a0, line
    la   $a1, 256
    li   $v0, 8          # fgets(buffer, 256, stdin)
    syscall              #

    li   $t0, 0          # i = 0;
loop1:                   # while (line[i] != 0) {
    la   $t3, line
    add  $t4, $t3, $t0
    lb   $t5, ($t4)
    beq  $t5, 0, end1
    addi $t0, $t0, 1     #   i++;
    b loop1              # }
end1:

    li   $t1, 0          # j = 0;
    addi $t2, $t0, -2    # k = i - 2;
loop2:                   # while (j < k) {
    bge $t1, $t2, end2

    la   $t3, line
    add  $t4, $t3, $t1
    lb   $t5, ($t4)
    add  $t6, $t3, $t2
    lb   $t7, ($t6)
    beq  $t5, $t7, equal # if (line[j] != line[k]) {
    la   $a0, not_palindrome
    b    print_and_return
equal:
    addi $t1, $t1, 1     # j++;
    addi $t2, $t2, -1    # j--;
    b    loop2
end2:

    la   $a0, palindrome
print_and_return:
    li   $v0, 4
    syscall

    li   $v0, 0          # return 0
    jr   $31


.data
str0:
    .asciiz "Enter a line of input: "
palindrome:
    .asciiz "palindrome\n"
not_palindrome:
    .asciiz "not palindrome\n"


# line of input stored here
line:
    .space 256