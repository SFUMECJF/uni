#!/usr/bin/env python3
# -*- coding: utf-8 -*-

# pylint: disable= R1703, C0103, C0303, W0601, C0413, R0902, C0115, C0301, W0602, W0603, W0404, W0611, W0612, W0613, W0703, W0621, W0631, E0602, R0912
#Same pylint disables as server.py


"""
    PYLINT DISABLE ERRORS

    C0116: Missing function or method docstring
        #
    C0301: Line too long
        # Needed for test coverage
    W0105: String statement has no effect
        # Needed for comment blocks
"""

"""
Created on Mon Nov 11 20:03:01 2019

@author: z5211275
"""
import call_error
import check

# Check if the user is valid or not by the given user_id, if it's not valid then raise an error,
# if it's valid then return this user
def valid_user(u_id, users):
    valid_user = False
    for user in users:
        if str(u_id) == str(user.get_u_id()):
            current_user = user
            valid_user = True
    if not valid_user:
        call_error.user_profile_invalid_u_id()
    else:
        return current_user

# Check if the last name and first name are valid or not(valid first/last name should have length between 1-50),
# if it's not valid then raise error, if it's valid then go on
def valid_first_last_name(name_first, name_last):
    valid_first_last_name = True
    if len(name_first) < 1 or len(name_first) > 50:
        valid_first_last_name = False
        call_error.user_profile_invalid_first_name()
    if len(name_last) < 1 or len(name_last) > 50:
        valid_first_last_name = False
        call_error.user_profile_invalid_first_name()
    return valid_first_last_name

# Check if the email is used or not
def used_email(email, users):
    used_email = False
    for us in users:
        if email == us.get_email():
            used_email = True
    return used_email

# Check if the channel is valid or not
def valid_channel(channel_id, all_channels):
    channel_exists = False
    for channel in all_channels:
        if str(channel_id) == str(channel.get_channel_id()):
            current_channel = channel
            channel_exists = True
    # raise ValueError if channel_id is not a valid channel 
    if not channel_exists:
        call_error.invalid_channel()
    return current_channel

# Check if the user has been authorised in the channel, if it's not then raise an error, otherwise return the current channel
def authorised_user(u_id, current_channel):
    valid_access = False
    for us in current_channel.get_users():
        if str(u_id) == str(us.u_id):
            valid_access = True
    if not valid_access:
        #Raises AccessError for unauthorised user
        call_error.unauthorised_user()

# Check if the message id is valid or not given message id and channel list which contains all the channels in the app(slackr), if the message is valid then return a list which contains the current
# channel and the current message
def valid_message_id(message_id, all_channels):
    found_message = False
    # loop through all channels and messages to find message
    for ch in all_channels:
        for mess in ch.get_messages():
            if str(mess.get_message_id()) == str(message_id):
                current_channel = ch
                current_message = mess
                found_message = True
    # raise ValueError if message_id no longer exists 
    if not found_message:
        call_error.message_id_not_exist()
    return [current_channel, current_message]

# Check if the user is the sender of a message given his u id and a message object
def is_sender(u_id, current_message):
    if current_message.get_u_id() == u_id:
        return True
    else:
        return False

# Check for valid email, used email, short password,
# wrong name_first length, wrong name_last length:
def is_register_valid(register_user, users):
    # Check valid email
    if check.check_email(register_user.get_email()) == 'Invalid Email':
        #Raise ValueError for invalid email
        call_error.invalid_email()
    # Check email used
    elif register_user.find_user_from_email(users):
        #Raise ValueError for used email
        call_error.used_email()
    # Check short password
    elif check.check_password(register_user.password) == 'Invalid Password':
        #Raise ValueError for short password
        call_error.short_password()
    # Check short name_first
    elif len(register_user.get_name_first()) < 1:
        #Raise ValueError for short first name
        call_error.short_first_name()
    # Check long name_fist
    elif len(register_user.get_name_first()) > 50:
        #Raise ValueError for long first name
        call_error.long_first_name()
    # Check short name_last
    elif len(register_user.get_name_last()) < 1:
        #Raise ValueError for short last name
        call_error.short_last_name()
    # Check long name_last
    elif len(register_user.get_name_last()) > 50:
        #Raise ValueError for long last name
        call_error.long_last_name()

# check if the login is valid or not, if not then raise an error, if it's valid then give me back the current user
def is_login_valid(users, email, password):
    count = 0
    for u in users:
        if email == u.get_email():
            # Find user with given email
            count += 1
            if password == u.get_password():
                # Find user with given password and select u as login user
                # if both email and password match
                login_user = u
                count += 1
    if count == 0:
        #Raise ValueError for unregistered email/email doesn't belong to user
        call_error.unregistered_email()
    if count == 1:
        #Raise ValueError for incorrect password
        call_error.incorrect_password()
    return login_user
    