from itertools import permutations

def permutations(string):
    '''
    For the given string, yield all permutations of the characters of that string in any order. For example:
    >>> sorted(list(permutations('ABC')))
    ['ABC', 'ACB', 'BAC', 'BCA', 'CAB', 'CBA']

    If a character occurs more than once in the input string, each occurrence is still considered distinct. For example:
    >>> sorted(list(permutations('ABB')))
    ['ABB', 'ABB', 'BAB', 'BAB', 'BBA', 'BBA']
    '''
    
    permutations = [''.join(p) for p in permutations(string)]

    for x in permutations:
        yield x
