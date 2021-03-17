#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# pylint: disable= C0103, C0303, W0601, C0301, W0602, W0603, W0404, W0611, W0612, W0613, W0703, W0621, W0631, E0602, R0912
#Same pylint disables as server.py

"""
Created on Mon Sep 30 14:55:46 2019

@author: z5211275

"""

import os
import pickle
import re
import datetime
import time
import call_error
import class_user
import class_standup
import server
import class_messages
import message
import helperfunctions
"""
    PYLINT DISABLE ERRORS

    W0511: FixMe ToDos
        # Needed for comments
    W0105: String statement has no effect
        # Needed for comment block
    C0116: Missing function or method docstring
        #
    R1720: Unnecessary else after 'raise'
        # Easier to follow code / readability
    C0103: Constant name does not conform to upper_case
        #
    W0613: Unused argument
        # Will use in future
"""
now = None
duration = 0
send_finish = False
#Assumptions are given to the channel id list actually exists and that members
#and are given
#Assumptions are also made
#That any token contains the name of the member

#For a given channel, start the standup period whereby for the next 15 minutes
#if someone calls "standup_send" with a message,
#it is buffered during the 15 minute window then at the end of the 15 minute
#window a message will be added to the message
#queue in the channel from the user who started the standup.
def standup_start(token, channel_id, length):
    global now, duration, send_finish
    send_finish = False
    duration = length
    all_channels = server.get_channels()
    users = server.get_users()
    u_id = class_user.find_u_id_from_token(token)
    u = class_user.find_user_from_u_id(u_id, users)
    current_channel = helperfunctions.valid_channel(channel_id, all_channels)
    helperfunctions.authorised_user(u_id, current_channel)
    if current_channel.get_standup() is not None:
        if (current_channel.get_standup()).is_active is True:
            call_error.stand_up_already_run()
    now = datetime.datetime.now()
    time_finish = datetime.datetime.timestamp(now+datetime.timedelta(seconds=int(length)))
    new_standup = class_standup.Standup(channel_id, length, u)
    new_standup.set_is_active(True)
    new_standup.set_time_finish(time_finish)
    current_channel.set_standup(new_standup)
    return {'time_finish':time_finish
            }

#Sending a message to get buffered in the standup queue, assuming a standup is
#currently active
def standup_send(token, channel_id, message_content):
    all_channels = server.get_channels()
    users = server.get_users()
    u_id = class_user.find_u_id_from_token(token)
    u = class_user.find_user_from_u_id(u_id, users)
    current_channel = helperfunctions.valid_channel(channel_id, all_channels)
    if standup_active(token, channel_id)['is_active'] == False:
        call_error.stand_up_not_run()
    helperfunctions.authorised_user(u_id, current_channel)
    mess = class_messages.Message(channel_id, message_content)
    if len(mess.get_message()) > 1000:
        call_error.message_too_long()
    mess.set_u_id(u.get_u_id())
    mess.set_time_created(datetime.datetime.now().timestamp())
    mess.set_time_sent(datetime.datetime.now().timestamp())
    (current_channel.standup).add_message(mess)
    return {}

def standup_finish_send(token, channel_id):
    all_channels = server.get_channels()
    users = server.get_users()
    u_id = class_user.find_u_id_from_token(token)
    u = class_user.find_user_from_u_id(u_id, users)
    for ch in all_channels:
        if str(ch.get_channel_id()) == str(channel_id):
            current_channel = ch
    standup_message = ""
    for messa in (current_channel.get_standup()).get_messages():
        message_user = class_user.find_user_from_u_id(messa.get_u_id(), users)
        username = message_user.get_handle_str()
        message_cont = messa.get_message()
        standup_message = standup_message + f"{username}: {message_cont}\n"
    start_member = (current_channel.get_standup()).get_start_member()
    message.message_send(start_member.get_token(), channel_id, standup_message)
    return {}

#Given a query string, return a collection of messages that match the query
def search(token, query_str):
    all_channels = server.get_channels()
    users = server.get_users()
    u_id = class_user.find_u_id_from_token(token)
    u = class_user.find_user_from_u_id(u_id, users)
    search_message = []
    message_list = []
    for ch in all_channels:
        for mess in ch.get_messages():
            if query_str in mess.get_message():
                search_message.append(vars(mess))
    desired_keys = ('message_id', 'u_id', 'message', 'time_created', 'reacts', 'is_pinned')
    for messa in search_message:
        messa = {key: value for key, value in messa.items() if key in desired_keys}
        message_list.append(messa)
    return {'messages':message_list
            }

#Given a User by their user ID, set their permissions to new permissions
#described by permission_id
def user_permission_change(token, u_id, permission_id):
    all_channels = server.get_channels()
    users = server.get_users()
    us_id = class_user.find_u_id_from_token(token)
    u = class_user.find_user_from_u_id(us_id, users)
    count = 0
    for us in users:
        if str(us.get_u_id()) == str(u_id):
            count += 1
            if us.get_permission_id() != 1 or us.get_permission_id() != 2:
                call_error.user_permission_not_admin_owner()
    if count != 1:
        call_error.invalid_user()
    if permission_id != (1, 2, 3):
        call_error.invalid_permission_id()
    u.set_permission_id(permission_id)
    return {}

def standup_active(token, channel_id):
    global now, duration, send_finish
    all_channels = server.get_channels()
    users = server.get_users()
    us_id = class_user.find_u_id_from_token(token)
    u = class_user.find_user_from_u_id(us_id, users)
    current_channel = helperfunctions.valid_channel(channel_id, all_channels)
    standup = current_channel.get_standup()
    if standup is None:
        time_finish = None
        is_active = False
    else:
        time_finish = standup.time_finish
        if datetime.datetime.timestamp(datetime.datetime.now()) - datetime.datetime.timestamp(now) >= float(duration):
            standup.set_is_active(False)
            standup.set_time_finish(None)
            if not send_finish:
                standup_finish_send(token, channel_id)
                send_finish = True
        else:
            standup.set_is_active(True)
        is_active = standup.get_is_active()
    return {
        'is_active':is_active,
        'time_finish':time_finish
    }
