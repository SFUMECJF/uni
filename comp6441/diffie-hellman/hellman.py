# given a particular secret number, mod and remainder,
# will return the power that will
# equal to the remainder when the secret number is powered

# get inputs
print ('Input your secret number:')
secretNumber = int(input())

# get inputs
print ('Input their secret number:')
secretNumberTheir = int(input())

print ('Input mod (n or p): ')
mod = int(input())

print('Input base (g):')
base = int(input())

# recalculate your secret number based on what the other person sends
sentNumber = (base ** secretNumberTheir) % mod

print ('the shared secred is:', (sentNumber ** secretNumber) % mod)
