# given a base, mod a remainder, will try to brute force a solution for the power to
# the base that gives the remainder when moded

print ('Input base:')
base = int(input())

print ('Input remainder:')
remainder = int(input())

print ('Input mod')
mod = int(input())

counter = 0
while True:
    if (base ** counter) % mod == remainder:
        print('The lowest power is:', counter)
        break
    counter += 1