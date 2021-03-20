''' check.py '''
import re

# pylint: disable = C0116, W1401, R1705, W0105, C0103

"""
    PYLINT DISABLE ERRORS

    C0116: Missing function or method docstring
        #
    W1401: Anomalous backslash
        # needed for regex
    W0105: String statement has no effect
        # Needed for comment blocks
    R1705: Unnecessary else after 'return'
        # Easier to follow code / readability
    C0103: Constant naming does not conform

"""

# Make a regular expression
# for validating an Email
regex = '^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$'

# Define a function for
# for validating an Email
def check_email(email):

    # pass the regualar expression
    # and the string in search() method
    if re.search(regex, email):
        return "Valid Email"
    else:
        return "Invalid Email"

# Define a function for
# for validating a password
def check_password(password):
    if len(password) >= 5:
        return "Valid Password"
    else:
        return "Invalid Password"
