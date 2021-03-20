
def reverse_words(string_list):
    '''
    Given a list of strings, return a new list where the order of the words is reversed.

    For example,
    >>> reverse_words(["Hello World", "I am here"])
    ['World Hello', 'here am I']
    '''

    storage = []
    for x in string_list:
        storage.append(' '.join(reversed(x.split(' '))))
    return storage



def test_reverse():
    #Tests for one normal input
    assert reverse_words(["Hello World"]) == ['World Hello']
    #Tests for two normal inputs
    assert reverse_words(["Hello World", "I am here"]) == ["World Hello", "here am I"]
    #Tests for multiple inputs 
    assert reverse_words(["Hello World", "I am here", "Thus are you"]) == ["World Hello", "here am I", "you are Thus"]
    #Tests for empty
    assert reverse_words([""]) == ['']
    #Tests for nothing
    assert reverse_words([]) == []
    #Tests for other strings (no characters)
    assert reverse_words(["123! 456! ~@#$"]) == ['~@#$ 456! 123!']

