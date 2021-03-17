"""
Created on Sun Sep 29 22:10:11 2019

@author: z5211275
"""
#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from check import check_email

# pylint: disable = C0116
# (missing function or docstring)

# Test for emals:
#   Checking for a non-empty string, full correct mail
#   and the length of it.



def test_none():
    assert check_email("") == "Invalid Email"

def test_wrong():
    assert check_email("1234") == "Invalid Email"
    assert check_email("1234@gmailcom") == "Invalid Email"
    assert check_email("1234gamil.com") == "Invalid Email"

def test_exact():
    assert check_email("123ab@sffre.com") == "Valid Email"

def test_long():
    assert check_email("1243768idgsayfughia@aiushfiuahdufhaudfh.com") == "Valid Email"
