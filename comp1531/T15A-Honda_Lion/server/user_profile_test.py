"""
Created on Mon Sep 30 15:40:33 2019

@author: z5211275, 5204850
"""
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# pylint: disable = C0301, W0105, C0116
import pytest
import user_profile
"""
    PYLINT DISABLE ERRORS

    C0301: Line too long
        # Needed long string for testing purposes
    W0105: String statement has no effect
        # Using it for commenting block
    C0106: Missing function or method docstring

"""
# Patrick's tests for invalid arguments
def test_user_profile_first_name():
    with pytest.raises(ValueError, match=r"First*"):
        user_profile.user_profile_setname("ERYR12845zvc", "aidgfiagbfajibfjbabbagvfaygsyfvbaysvfyagvyvayvfyadfavfyavbvavygcyagygaygygaggqiygiaisfdgiag", "Son")

def test_user_profile_last_name():
    with pytest.raises(ValueError, match=r"Last*"):
        user_profile.user_profile_setname("ERYR12845zvc", "Goku", "aidgfiagbfajibfjbabbagvfaygsyfvbaysvfyagvyvayvfyadfavfyavbvavygcyagygaygygaggqiygiaisfdgiag")

def test_user_profile_setemail():
    with pytest.raises(ValueError, match=r"Email*"):
        user_profile.user_profile_setemail("ERYR12845zvc", "z5211275unsw.com")

def test_user_profile_sethandle():
    with pytest.raises(ValueError, match=r"Email*"):
        user_profile.user_profile_sethandle("ERYR12845zvc", "sgs4567")

# Daniel's tests

def test_user_profile1():
	# testing a valid user ID - should return user's email, first name, last name and handle when function is complete
    user_profile.user_profile("agdfuy84728", 4)

def test_user_profile2():
	# testing an invalid user ID - should raise value error
    invalid_token = "999"
    invalid_u_id = 999
    with pytest.raises(ValueError, match=r"*"):
        user_profile.user_profile(invalid_token, invalid_u_id)

def test_user_profile_setname1():
	# testing a valid token, valid first name and valid last name
    valid_token = "1"
    valid_first_name = "FirstName"
    valid_last_name = "LastName"
    user_profile.user_profile_setname(valid_token, valid_first_name, valid_last_name)

def test_user_profile_setname2():
	# testing a valid token, valid first name and invalid last name
    valid_token = "1"
    valid_first_name = "FirstName"
    invalid_last_name = "aidgfiagbfajibfjbabbagvfaygsyfvbaysvfyagvyvayvfyadfavfyavbvavygcyagygaygygaggqiygiaisfdgiag"
    with pytest.raises(ValueError, match=r"*"):
        user_profile.user_profile_setname(valid_token, valid_first_name, invalid_last_name)

def test_user_profile_setname3():
    # testing a valid token, invalid first name and valid last name
    valid_token = "1"
    invalid_first_name = "aidgfiagbfajibfjbabbagvfaygsyfvbaysvfyagvyvayvfyadfavfyavbvavygcyagygaygygaggqiygiaisfdgiag"
    valid_last_name = "LastName"
    with pytest.raises(ValueError, match=r"*"):
        user_profile.user_profile_setname(valid_token, invalid_first_name, valid_last_name)


def test_user_profile_setname4():
    # testing a valid token, invalid first name and invalid last name
    valid_token = "1"
    invalid_first_name = "aidgfiagbfajibfjbabbagvfaygsyfvbaysvfyagvyvayvfyadfavfyavbvavygcyagygaygygaggqiygiaisfdgiag"
    invalid_last_name = "aidgfiagbfajibfjbabbagvfaygsyfvbaysvfyagvyvayvfyadfavfyavbvavygcyagygaygygaggqiygiaisfdgiag"
    with pytest.raises(ValueError, match=r"*"):
        user_profile.user_profile_setname(valid_token, invalid_first_name, invalid_last_name)

    # should we also be testing invalid tokens? even though the spec currently says it does not give a value error
    # maybe we can say in assumptions that we assume the token is valid


def test_user_profile_setemail1():
    # testing a valid token and valid email that is not in use
    valid_token = "1"
    valid_email = "validemail3@gmail.com"
    user_profile.user_profile_setemail(valid_token, valid_email)

def test_user_profile_setemail2():
    # testing a valid token but an invalid email
    valid_token = "1"
    invalid_email = "invalidemailgmail.com"
    with pytest.raises(ValueError, match=r"*"):
        user_profile.user_profile_setemail(valid_token, invalid_email)

def test_user_profile_setemail3():
    # testing a valid token but valid email that is already in use
    valid_token = "1"
    valid_email_in_use = "validemail1@gmail.com"
    with pytest.raises(ValueError, match=r"*"):
        user_profile.user_profile_setemail(valid_token, valid_email_in_use)

    # like the last function, an invalid token does not raise a value error
    # include in assumptions?


def test_user_profile_sethandle1():
	# testing a valid token and valid handle_str
	# i think the value error for invalid handle should be >20 characters not less than but i think the spec has an error
	# we will treat the spec as it is and write it in the assumptions
    valid_token = "1"
    valid_handle_str = "handlehandlehandlehandle"
    user_profile.user_profile_sethandle(valid_token, valid_handle_str)

def test_user_profile_sethandle2():
    # testing a valid token and invalid handle_str
    valid_token = "1"
    invalid_handle_str = "invalidhandle"
    with pytest.raises(ValueError, match=r"*"):
        user_profile.user_profile_sethandle(valid_token, invalid_handle_str)
