def check_password(password):
    '''
    Takes in a password, and returns a string based on the strength of that password.

    The returned value should be:
    * "Strong password", if at least 12 characters, contains at least one number, at least one uppercase letter, at least one lowercase letter.
    * "Moderate password", if at least 8 characters, contains at least one number.
    * "Poor password", for anything else
    * "Horrible password", if the user enters "password", "iloveyou", or "123456"
    '''
    checker = {
        "upperCase" : False,
        "totalChars" : 0,
        "totalNumbs" : 0
    }
    if len(password) is 0:
        return 'NO PASSWORD INPUT'
    if password is "password" or password is "iloveyou" or password is "123456":
        return "Horrible password"
    elif type(password) is str:
        
        for char in password:
            if char.isdigit():
                checker['totalNumbs'] += 1
            elif char.isupper():
                checker['upperCase'] = True
                checker['totalChars'] += 1
            elif char.islower():
                checker['totalChars'] += 1
    else:
        return 'List is not valid'
    
    if checker['upperCase'] and checker['totalChars'] > 11 and checker['totalNumbs'] > 0:
        return 'Strong password'
    elif checker['totalChars'] > 7 and checker['totalNumbs'] > 0:
        return 'Moderate password'
    else:
        return 'Poor password'
        
  
def test_password():
    assert check_password("ihearttrimester") == "Poor password"
    assert check_password("iloveyou") == "Horrible password"
    assert check_password("") == "NO PASSWORD INPUT"
    assert check_password("asdfzcvn1") == "Moderate password"
    assert check_password("@!#!@^$*&@!#(@!$@") == "Poor password"
    assert check_password("Thisisastrongpassword0") == "Strong password"


                         
