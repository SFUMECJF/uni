""" User Profile Tests """
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# pylint: disable = W0511, W0611, C0116, W0105
import urllib
from io import BytesIO
from json import dumps
from urllib.request import urlopen
import requests
from PIL import Image
from flask import Flask, request
from check import check_email
"""
Created on Mon Sep 30 14:19:43 2019

@author: z5211275, z5204850
"""
"""
    PYLINT DISABLE ERRORS

    W0511: FIXME error
        # Comments have ToDos to show what we had to implement
    W0611: Unused Import
        # Will have to use some of these imports in later iterations
    C0116: Missing function or method Docstring
        #
    W0105: Pointless string statement
        # Used to make this comment block
"""


APP = Flask(__name__)


#For a valid user, returns information about their email, first name, last name, and handle

@APP.route('/user/profile', methods=['GET'])
def user_profile(token, u_id):
    valid_user_ids = [1, 2, 3, 4, 5]
    #ToDo: raise value error when User with u_id is not a valid user
    if u_id not in valid_user_ids:
        raise ValueError("Not a valid user")
    #ToDo: return user's email, first name, last name and handle

#Update the authorised user's first and last name
def user_profile_setname(token, name_first, name_last):
    #ToDo: raise value error when name_first is more than 50 characters
    if len(name_first) > 50:
        raise ValueError("First name too long")
    #ToDo: raise value error when name_last is more than 50 characters
    if len(name_last) > 50:
        raise ValueError("Last name too long")
    #ToDo: update user's first name and last name

#Update the authorised user's email address
def user_profile_setemail(token, email):
    existing_emails = ["validemail1@gmail.com", "validemail2@gmail.com"]
    users = {'email':'validemail1@gmail.com'}

    #ToDo: raise value error when Email entered is not a valid email.
    if check_email(email) == "Invalid Email":
        raise ValueError("Email not valid")
    if email in existing_emails:
        raise ValueError("Email address already belongs to another user")
    #ToDo: update user's email address

#Update the authorised user's handle (i.e. display name)
def user_profile_sethandle(token, handle_str):
    #ToDo: raise value error when handle_str is no more than 20 characters
    if len(handle_str) <= 20:
        raise ValueError("Invalid handlement")
    #ToDo: update user's handle
