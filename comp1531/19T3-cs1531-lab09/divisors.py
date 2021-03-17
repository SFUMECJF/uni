def divisors(n):
    '''
    Given some number n, this generator yields all positive integer divisors of n in ascending order. For example:
    >>> list(divisors(12))
    [1, 2, 3, 4, 6, 12]
    '''

    counter = 1
    while counter <= n:
        if n % counter == 0:
            yield counter
        counter += 1

    pass
