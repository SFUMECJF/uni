
def count_char(input):
    '''
    Counts the number of occurrences of each character in a string. The result should be a dictionary where the key is the character and the dictionary is its count.

    For example,
    >>> count_char("HelloOo!")
    {'H': 1, 'e': 1, 'l': 2, 'o': 2, 'O': 1, '!': 1}
    '''
    
    alphabet = {  
    }
    if len(input) == 0:
        return {}
    elif type(input) is str:
        for char in input:
            if type(char) is str:
               alphabet[char] = alphabet[char] + 1 if char in alphabet else 1              
        for x in alphabet:
            return alphabet   
    else:
        return 'ERROR. TYPE IS NOT LIST'
    

    