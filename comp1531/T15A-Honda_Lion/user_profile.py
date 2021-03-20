""" User Profile Tests """
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# pylint: disable= R0401, R0801, C0103, C0303, W0601, R0913, C0301, W0602, W0603, W0404, W0611, W0612, W0613, W0703, W0621, W0631, E0602, R0912
#Same pylint disables as server.py

import urllib
import pickle
import os
from io import BytesIO
from json import dumps
import requests
from PIL import Image
from flask import Flask, request
import check
import class_user
import call_error
import server
import image
import helperfunctions
"""
Created on Mon Sep 30 14:19:43 2019

@author: z5211275, z5204850
"""

#For a valid user, returns information about their email, first name, last name, and handle
def user_profiles(token, u_id):
    users = server.get_users()
    # Get the current user, if u_id given is invalid then raise an error
    current_user = helperfunctions.valid_user(u_id, users)
    email = current_user.get_email()
    name_first = current_user.get_name_first()
    name_last = current_user.get_name_last()
    handle_str = current_user.get_handle_str()
    profile_img_url = current_user.get_profile_img_url()
    return {'u_id':int(u_id),
            'email':email,
            'name_first':name_first,
            'name_last':name_last,
            'handle_str':handle_str,
            'profile_img_url':profile_img_url,
            }

#Update the authorised user's first and last name
def user_profile_setname(token, name_first, name_last):
    users = server.get_users()
    u_id = class_user.find_u_id_from_token(token)
    u = class_user.find_user_from_u_id(u_id, users)
    # Check if the first name and last name are valid or not
    if helperfunctions.valid_first_last_name(name_first, name_last):
        u.set_name_first(name_first)
        u.set_name_last(name_last)
    return {}

#Update the authorised user's email address
def user_profile_setemail(token, email):
    users = server.get_users()
    u_id = class_user.find_u_id_from_token(token)
    u = class_user.find_user_from_u_id(u_id, users)
    if check.check_email(email) == 'Invalid Email':
        call_error.invalid_email()
    # Check if email is used
    if helperfunctions.used_email(email, users):
        #Raise ValueError for used email
        call_error.used_email()
    u.set_email(email)
    return {}

#Update the authorised user's handle (i.e. display name)
def user_profile_sethandle(token, handle_str):
    users = server.get_users()
    u_id = class_user.find_u_id_from_token(token)
    u = class_user.find_user_from_u_id(u_id, users)
    if len(handle_str) < 3 or len(handle_str) > 20:
        call_error.user_profile_invalid_handle_str()
    for us in users:
        if us.handle_str == handle_str:
            call_error.user_profile_used_handle_str()
    u.set_handle_str(handle_str)
    return {}

def user_profile_user_all(token):
    users = server.get_users()
    u_id = class_user.find_u_id_from_token(token)
    u = class_user.find_user_from_u_id(u_id, users)
    us_list = []
    user_list = []
    desired_keys = ('u_id', 'email', 'name_first', 'name_last', 'handle_str', 'profile_img_url')
    for us in users:
        us_list.append(vars(us))
    for use in us_list:
        use = {key: value for key, value in use.items() if key in desired_keys}
        user_list.append(use)
    return {
        'users' : user_list,
    }

#Given a URL of an image on the internet, 
#crops the image within bounds (x_start, y_start) and (x_end, y_end). Position (0,0) is the top left.
def user_profile_uploadphoto(token, img_url, x_start, y_start, x_end, y_end, backendurl):
    users = server.get_users()
    u_id = class_user.find_u_id_from_token(token)
    u = class_user.find_user_from_u_id(u_id, users)
    response = requests.get(img_url)
    if response.status_code != 200:
        call_error.invalid_http_status()
    image.image_process(img_url, x_start, y_start, x_end, y_end, u_id)
    u.profile_img_url = "http://"+backendurl+f"/static/icon{u_id}.jpg"
    return {}
    