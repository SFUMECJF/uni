#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Mon Sep 30 12:58:07 2019

@author: z5211275, z5257478
"""

from check import check_password
from check import check_email

# pylint: disable = C0116, C0301, W0105, W0104
"""
    PYLINT DISABLE ERRORS

    C0116: Missing function or method docstring
        #
    C0301: Line too long
        # Needed for test coverage
    W0105: String statement has no effect
        # Needed for comment blocks
    W0104: Statement seems to have no effect
        # Used to mimic logout
"""
USER = [
    {
        "email" : "test1@gmail.com",
        "password" : "test1",
        "token" : "1"   ## To logout
    }, {
        "email" : "test2@gmail.com",
        "password" : "test2",
        "token" : "2"  ## To logout
    }, {
        "email" : "test3@gmail.com",
        "password" : "test3",
        "token" : "3"   ## To logout
    },
]
def auth_login(email, password):
    if check_email(email) == "Invalid Email":
        raise ValueError("Email not valid")
    #raise value error when Email entered does not belong to a user
    used_email = False
    # Loop through emails in "user" dictionary
    for users in USER:
        if email == users['email']:
            used_email = True
    if used_email is not True:
        raise ValueError("Email does not belong to a user")
#raise value error when Password is not correct
    for users in USER:
        if email == users['email'] and password != users['password']:
            raise ValueError("Password is incorrect")
    # returning any u_id and token
    token = "123"
    return {'u_id':"1", 'token': token}
def auth_logout(token):
    for users in USER:
        if users['token'] == token:
            users['token'] == "0"
    return {}
def auth_register(email, password, name_first, name_last):
    if check_email(email) == "Invalid Email":
        raise ValueError("Email not valid")
    for users in USER:
        if users['email'] == email:
            raise ValueError("Email address is already being used by another user")
    # raise value error when Password entered is not a valid password
    if check_password(password) == "Invalid Password":
        raise ValueError("Password not valid")
    # raise value error when name_first is more than 50 characters
    if len(name_first) > 50:
        raise ValueError("First Name is too long")
    # raise value error when name_last is more than 50 characters
    if len(name_last) > 50:
        raise ValueError("Last Name is too long")
    return {"u_id":4, "token":"126gdahfg"}
def auth_passwordreset_request(email):
    # send a email with verification code to the user who requires to reset password
    if check_email(email) == "Invalid Email":
        raise ValueError("Email not valid")
    for users in USER:
        if users['email'] == email:
            # mimic send email with verif code: T35T
            users.update({"code" : "T35T"})
    return {}
def auth_passwordreset_reset(reset_code, new_password):
    # raise value error when reset_code is not a valid reset code
    # T35T will be the only valid reset_code for now
    if reset_code != "T35T":
        raise ValueError("Reset code is not valid")
    # raise value error when Password entered is not a valid password
    if check_password(new_password) == "Invalid Password":
        raise ValueError("Password not valid")
    # change the old password to the new one
    for users in USER:
        users.update({"password" : new_password})
    return {}
