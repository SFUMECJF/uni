#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Mon Sep 30 15:38:59 2019

@author: z5211275, z5257478
"""
import pytest
import auth

# pylint: disable = C0116, C0301, W0105
"""
 PYLINT DISABLE ERRORS

    C0116: Missing function or method docstring
        #
    C0301: Line too long
        # Needed for test coverage
    W0105: String statement has no effect
        # Needed for comment blocks
"""

def test_auth_passwordreset_reset_wrong_reset():
    with pytest.raises(ValueError, match=r"Incorrect*"):
        auth.auth_passwordreset_reset('dadsad', 'dasdsad')
def test_auth_passwordreset_request_valid():
    assert(auth.auth_passwordreset_request('test1@gmail.com')) == {}

def test_auth_register_used_email():
    with pytest.raises(ValueError, match=r"Email*"):
        auth.auth_register('test1@gmail.com', 'test1', 'Rdsadsad', 'bdsadsad')

def test_auth_register_valid():
    assert((auth.auth_register('test23@gmail.com', 'test221', 'rassa',\
                               'rsdda')) == {"u_id": 4, "token": "126gdahfg"})

def test_invalidate_token_wrong_token():
    assert(auth.auth_logout('123')) == {}

def test_invalidate_token_valid():
    assert(auth.auth_logout('1')) == {}

def test_auth_login_invalid_password():
    with pytest.raises(ValueError, match=r"Incorrect*"):
        auth.auth_login('test1@gmail.com', 'test2')

def test_auth_login_valid():
    assert(auth.auth_login('test1@gmail.com', \
                           'test1')) == {'u_id' : "1", 'token' : "123"}

def test_auth_login_email_1():
    with pytest.raises(ValueError, match=r"Email*"):
        auth.auth_login("", "187t2gfiag")

def test_auth_login_email_2():
    with pytest.raises(ValueError, match=r"Email*"):
        auth.auth_login("gmail", "187t2gfiag")

def test_auth_login_email_3():
    with pytest.raises(ValueError, match=r"Email*"):
        auth.auth_login("auqug1234-.com", "187t2gfiag")

def test_auth_login_email_4():
    with pytest.raises(ValueError, match=r"Email*"):
        auth.auth_login("@", "187t2gfiag")

def test_auth_login_email_5():
    with pytest.raises(ValueError, match=r"Email*"):
        auth.auth_login(" @ ", "187t2gfiag")

def test_auth_login_email_6():
    with pytest.raises(ValueError, match=r"Email*"):
        auth.auth_login("validemail1@gmail.com", "validpassword1")

def test_auth_login_email_7():
    with pytest.raises(ValueError, match=r"Password*"):
        auth.auth_login("test1@gmail.com", "test")

def test_auth_login_password_1():
    assert auth.auth_register("validemail1@gmail.com",\
                                           "validpassword1", "validfirstname",\
                                           "validlastname")
    with pytest.raises(ValueError, match=r"Password*"):
        auth.auth_login("validemail1@gmail.com", "validpassword1000")

def test_auth_login_password_2():
    assert auth.auth_register("validemail1@gmail.com", \
                                           "validpassword1", "validfirstname",\
                                           "validlastname")
    with pytest.raises(ValueError, match=r"Password*"):
        auth.auth_login("validemail1@gmail.com", \
                        "password100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000")

def test_auth_login_password_3():
    assert auth.auth_register("validemail1@gmail.com", "validpassword1", \
                              "validfirstname", "validlastname")
    with pytest.raises(ValueError, match=r"Password*"):
        auth.auth_login("validemail1@gmail.com", "pw")

def test_auth_login_password_4():
    assert auth.auth_register("validemail1@gmail.com", "validpassword1", \
                              "validfirstname", "validlastname")
    with pytest.raises(ValueError, match=r"Password*"):
        auth.auth_login("validemail1@gmail.com", "")

def test_auth_register_email_1():
    auth.auth_register("validemail1@gmail.com", "validpassword1", \
                       "validfirstname", "validlastname")
    with pytest.raises(ValueError, match=r"Email*"):
        auth.auth_register("", "187t2gfiag", "Goku", "Son")

def test_auth_register_email_2():
    with pytest.raises(ValueError, match=r"Email*"):
        auth.auth_register("auqug1234-.com", "187t2gfiag", "Kocho", "Shinobu")

def test_auth_register_email_3():
    with pytest.raises(ValueError, match=r"Email*"):
        auth.auth_register("gmail", "187t2gfiag", "Luffy", "MonkeyD")

def test_auth_register_email_4():
    with pytest.raises(ValueError, match=r"Email*"):
        auth.auth_register("@", "187t2gfiag", "Edward", "Elric")

def test_auth_register_email_5():
    with pytest.raises(ValueError, match=r"Email*"):
        auth.auth_register(" @ ", "187t2gfiag", "Naruto", "Uzumaki")

def test_auth_register_password_1():
    with pytest.raises(ValueError, match=r"Password*"):
        auth.auth_register("z5211275@unsw.com", "18", "Lelouch", "Lamperouge")

def test_auth_register_password_2():
    with pytest.raises(ValueError, match=r"Password*"):
        auth.auth_register("z5257478@ad.unsw.edu.au", "", "Daniel", "Ngo")

def test_auth_register_firstname_1():
    auth.auth_register("z5257478@ad.unsw.edu.au", "validpassword1", \
                       "D"*50, "validlastname")
    with pytest.raises(ValueError, match=r"First*"):
        auth.auth_register("z5211275@unsw.com", \
                           "agfsi47", \
                           "aidgfiagbfajibfjbabbagvfaygsyfvbaysvfyagvyvayvfyadfavfyavbvavygcyagygaygygaggqiygiaisfdgiag",\
                           "Son")

def test_auth_register_firstname_2():
    auth.auth_register("z5257478@ad.unsw.edu.au", "validpassword1", "D", "validlastname")

def test_auth_register_lastname_1():
    auth.auth_register("z5257478@ad.unsw.edu.au", "validpassword1", "validfirstname", "lastnamelastnamelastnamelastnamelastnamelastnamela")
    with pytest.raises(ValueError, match=r"Last*"):
        auth.auth_register("validemail@gmail.com", "bestpw", "doyouknowjoe", \
                           "joemamajoemamajoemamajoemamajoemamajoemamajoemamajoemamajoemama")

def test_auth_register_lastname_2():
    auth.auth_register("z5257478@ad.unsw.edu.au", "validpassword1", "D",\
                       "validlastname")

def test_auth_passwordreset_request_email_1():
    auth.auth_passwordreset_request("validemail1@gmail.com")
    with pytest.raises(ValueError, match=r"Email*"):
        auth.auth_passwordreset_request("invalidemail")

def test_auth_passwordreset_reset_password_1():
    auth.auth_passwordreset_reset("T35T", "validpassword1")
    with pytest.raises(ValueError, match=r"Password*"):
        auth.auth_passwordreset_reset("T35T", "123")

def test_auth_passwordreset_reset_password_2():
    with pytest.raises(ValueError, match=r"Password*"):
        auth.auth_passwordreset_reset("T35T", "")

def test_auth_passwordreset_reset_password_3():
    auth.auth_passwordreset_reset("T35T", \
                                  "twicetwicetwicetwicetwicetwtwicetwiceicetwicetwice")

def test_auth_passwordreset_reset_code_1():
    with pytest.raises(ValueError, match=r"Code*"):
        auth.auth_passwordreset_reset("T35T!!!", "validpassword1")

def test_auth_passwordreset_reset_code_2():
    with pytest.raises(ValueError, match=r"Code*"):
        auth.auth_passwordreset_reset("%$^!!!", "validpassword1")

def test_auth_passwordreset_reset_code_3():
    with pytest.raises(ValueError, match=r"Code*"):
        auth.auth_passwordreset_reset("", "validpassword1")

def test_auth_passwordreset_reset_code_4():
    with pytest.raises(ValueError, match=r"Code*"):
        auth.auth_passwordreset_reset(" ", "validpassword1")
