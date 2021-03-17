#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Mon Sep 30 12:58:07 2019

@author: z5211275, z5257478
"""
# pylint: disable= C0103, C0303, W0601, W0602, W0603, W0404, W0611, W0612, W0613, W0703, W0621, W0631, E0602, R0912

#pylint disables from server

from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from flask_mail import Mail, Message
import time
import jwt
import random
import string
import class_user
import pickle
import os
import check
import call_error
import server
import helperfunctions

APP = Flask(__name__, static_url_path='/static/')
CORS(APP)

# Given a registered users' email and password and generates a valid token for
# the user to remain authenticated
def auth_login(email, password):
    users = server.get_users()
    if check.check_email(email) == 'Invalid Email':
        #Raise ValueError for invalid email
        call_error.invalid_email()
    login_user = helperfunctions.is_login_valid(users, email, password)
    # Set selected users u_id and token
    u_id = login_user.get_u_id()
    token = login_user.get_token()
    return {'u_id':u_id,
            'token':token,
             }

# Given a user's first and last name, email address, and password, create a new
# account for them and return a new token for authentication in their session.
# A handle is generated that is the concatentation of a lowercase-only first 
# name and last name. If the concatenation is longer than 20 characters, it is 
# cutoff at 20 characters. If the handle is already taken, you may modify the 
# handle in any way you see fit to make it unique.
def auth_register(email, password, name_first, name_last, backend_url):
    users = server.get_users() 
    # Set u_id, email, password, name_first, name_last
    register_user = class_user.User(email, password)
    register_user.set_name_first(name_first)
    register_user.set_name_last(name_last)

    # Check for valid email, used email, short password,
    # wrong name_first length, wrong name_last length:
    helperfunctions.is_register_valid(register_user, users)

    # Check same handle as other user
    unique = True
    for u in users:
        if register_user.get_name_first()+register_user.get_name_last() == u.get_handle_str():
            unique = False
    if not unique:
        # Add u_id to end of handle if same handle
        register_user.set_handle_str(register_user.get_name_first()+register_user.get_name_last()+str(register_user.get_u_id()))
    else:
        # If name_first+name_last original, make it handle
        register_user.set_handle_str(register_user.get_name_first()+register_user.get_name_last())
    register_user.set_profile_img_url("http://"+backend_url+"/static/icon_default.jpg")
    register_user.token = register_user.generate_token()
    # Add registered user to list of all users
    users.append(register_user)
    # Return u_id + token
    u_id = register_user.get_u_id()
    token = register_user.get_token()
    return {'u_id' : int(u_id),
            'token' : token,
            } 

# Given an active token, invalidates the token to log the user out
# if a valid token is given and the user is successfully logged out,
# it returns True, otherwise it returns False
def auth_logout(token):
    users = server.get_users()
    # Get u_id from token
    u_id = class_user.find_u_id_from_token(token)
    # Find user with given u_id
    u = class_user.find_user_from_u_id(u_id, users)
    if token == u.get_token():
        # If given token is the same as the token extracted from user, logout
        u.token = u.invalidate_token()
        return {'is_success':True
                }
    else:
        return {'is_success':False
                }

APP.config.update(
    MAIL_SERVER='smtp.gmail.com',
    MAIL_PORT=465,
    MAIL_USE_SSL=True,
    MAIL_USERNAME='hondalion33@gmail.com',
    MAIL_PASSWORD="HondaLion123"
)

def auth_passwordreset_request(email):
    users = server.get_users()
    current_user = None
    code = setresetcode()
    for u in users:
        if str(email) == str(u.get_email()):
            current_user = u
    current_user.set_resetcode(code)
    mail = Mail(APP)
    mail.init_app(APP)
    try:
        msg = Message("Send Mail Test!",
                    sender="hondalion33@gmail.com",
                    recipients=[email])
        msg.body = code
        mail.send(msg)
    except Exception as e:
        print('email sent failed')
    return {}


# Given a reset code for a user, set that user's new password 
# to the password provided
def auth_passwordreset_reset(reset_code, new_password):
    users = server.get_users()
    valid_code = False
    # Check if reset code valid
    for u in users:
        if str(u.get_resetcode()) == str(reset_code):
            current_user = u
            valid_code = True
    if not valid_code:
        # Raise error if invalid reset code
        call_error.invalid_reset()
    if len(new_password) < 6:
        # Raise error if new password is too short
        call_error.short_password()
    # Set new password
    current_user.set_password(new_password)
    return {}

def setresetcode():
    """Generate a reset code with the combination of lowercase and uppercase letters """
    letters = string.ascii_letters
    return ''.join(random.choice(letters) for i in range(8))
    