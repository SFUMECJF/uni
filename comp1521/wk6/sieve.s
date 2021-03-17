# Sieve of Eratosthenes
# https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes
main:
    #i = 0;
    li $t0, 1

setting_loop:
    #While (i < 1000) {
    bge $t0, 1000, end_set

    #Get value of prime[i]
    #gets via formula (row * sizeof(int))
    mul $t1, $t0, 4
    la $t2, prime
    add $t3, $t1, $t2
    
    #prime[i] = 1
    li $t9, 1
    sw $t9, ($t3)

    #i++;
    add $t0, $t0, 1

    j setting_loop

end_set:
    #i = 2
    li $t0, 2
    

recount_loop: 
    #while (i < 1000)
    bge $t0, 1000, end_all

prime_loop:
    #Get value of prime[i]
    #gets via formula (row * sizeof(int))
    mul $t1, $t0, 4
    la $t2, prime
    add $t3, $t1, $t2

    #getting prime[i] now rep by #t3
    lw $t3, ($t3)

    #if (prime[i] == 1)
    beq $t3, 1, pre_j
    
    #i++;
    #else will just go and try recount_loop again
    add $t0, $t0, 1
    j recount_loop

pre_j:
    #printf("%d", i);
    move $a0, $t0
    li $v0, 1
    syscall
    
    #printf("\n");
    li $a0, '\n'
    li $v0, 11
    syscall

    #int j= 2 * i
    li $t4, 2
    mul $t4, $t4, $t0

    j j_loop

j_loop:
        
    bge $t4, 1000, end_j_loop
    #Get value of prime[j]
    #gets via formula (row * sizeof(int))
    mul $t1, $t4, 4
    la $t2, prime
    add $t3, $t1, $t2

    #prime[j] = 0;
    li $t9, 0
    sw $t9, ($t3)

    #j = j + i
    add $t4, $t4, $t0
    j j_loop

end_j_loop:
    #i++;
    add $t0, $t0, 1
    j recount_loop

end_all:

    j $31

.data
prime:
    .space 1000