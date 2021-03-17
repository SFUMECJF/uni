# Read a number and print positive multiples of 7 or 11 < n

main:                  # int main(void) {

    la $a0, prompt     # printf("Enter a number: ");
    li $v0, 4
    syscall

    li $v0, 5           # scanf("%d", number);
    syscall
    
    li $t1 1  #initiates number t1 = 1
    li $t2 1  #initiates number t2 = 1
    li $t3 1  #initiates counter t3 = 1

    move $t0, $v0   #moves number into new temp number
    j loop

loop:
    bgt $t3, $t0, end   #if counter is more than input, jump to end
    
    #modulate by 7
    rem $t1, $t3, 7 

    #modulate by 11
    rem $t2, $t3, 11 

    beqz $t1, seven
    beqz $t2, eleven

increment:
    add $t3, $t3 1      #increment by 1
    j loop

seven: 
    #prints the integer divisible by seven
    move $a0, $t3
    li $v0, 1
    syscall 

    li $a0, '\n'
    li $v0, 11
    syscall

    j increment

eleven:
    #prints the integer divisible by eleven
    move $a0, $t3
    li $v0, 1
    syscall

    li $a0, '\n'
    li $v0, 11
    syscall
    
    j increment

end:

    jr   $ra           # return

    .data
    
prompt:
    .asciiz "Enter a number: "
