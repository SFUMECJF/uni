def bad_interview():
    '''
    A generator that yields all numbers from 1 onward, but with some exceptions:
    * For numbers divisible by 3 it instead yields "Fizz"
    * For numbers divisible by 5 it instead yields "Buzz"
    * For numbers divisible by both 3 and 5 it instead yields "FizzBuzz"
    '''
    counter = 1
    while True:
        if counter % 3 == 0 and counter % 5 == 0:
            yield "FizzBuzz"
        elif counter % 3 == 0:
            yield "Fizz"
        elif counter % 5 == 0:
            yield "Buzz"
        else:
            yield counter
        counter += 1

    pass
    