# pylint: disable= C0103, C0303, W0601, C0301, W0602, W0603, W0404, W0611, W0612, W0613, W0703, W0621, W0631, E0602, R0912
#Same pylint disables as server.py

"""
Created on Mon Sep 30 13:49:23 2019

@author: z5211275, z5260304
"""
#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import time
import pickle
import datetime
import os
import sched
#import pytz
import channels
import class_user
import class_messages
import call_error
import server
import helperfunctions

#Send a message from authorised_user to the channel specified by channel_id automatically at a specified time in the future
def message_sendlater(token, channel_id, message_to_be_sent_later, time_sent):
    all_channels = server.get_channels()
    users = server.get_users()
    u_id = class_user.find_u_id_from_token(token)
    u = class_user.find_user_from_u_id(u_id, users)
    current_channel = helperfunctions.valid_channel(channel_id, all_channels)
    # raise ValueError if message is more than 1000 characters
    if len(message_to_be_sent_later) > 1000:
        call_error.long_message()
    # raise ValueError if time_sent is a time in the past
    if float(time_sent) < datetime.datetime.timestamp(datetime.datetime.now()):
        call_error.wrong_time_sent()
    # raise AccessError if the authorised user has not joined the channel yet
    if current_channel not in u.get_channel_list():
        call_error.not_member_of_channel()
    # send the message at certain time, need to implement
    message = class_messages.Message(channel_id, message_to_be_sent_later)
    message.set_u_id(u.get_u_id())
    message.set_time_sent(time_sent)
    message.set_time_created(datetime.datetime.timestamp(datetime.datetime.now()))
    time.sleep(float(time_sent)-float(message.time_created))
    current_channel.add_message(message)
    mess_id = message.get_message_id()
    return {'message_id': mess_id
            }

#Send a message from authorised_user to the channel specified by channel_id
def message_send(token, channel_id, message_to_be_sent):
    all_channels = server.get_channels()
    users = server.get_users()
    u_id = class_user.find_u_id_from_token(token)
    u = class_user.find_user_from_u_id(u_id, users)
    # raise ValueError if message is more than 1000 characters
    if len(message_to_be_sent) > 1000:
        call_error.long_message()
    current_channel = helperfunctions.valid_channel(channel_id, all_channels)
    # raise AccessError if the authorised user has not joined the channel yet
    helperfunctions.authorised_user(u_id, current_channel)
    message = class_messages.Message(channel_id, message_to_be_sent)
    message.set_u_id(u.get_u_id())
    message.set_time_created(datetime.datetime.now().timestamp())
    message.set_time_sent(datetime.datetime.now().timestamp())
    current_channel.add_message(message)
    mess_id = message.get_message_id()
    return {'message_id': mess_id
            }

#Given a message_id for a message, this message is removed from the channel
def message_remove(token, message_id):
    all_channels = server.get_channels()
    users = server.get_users()
    u_id = class_user.find_u_id_from_token(token)
    u = class_user.find_user_from_u_id(u_id, users)

    #raise valueerror if the message_id doesn't exist
    current_channel = helperfunctions.valid_message_id(message_id, all_channels)[0]
    current_message = helperfunctions.valid_message_id(message_id, all_channels)[1]

    # raise AccessError if authorised user did not send the message and
    # the authorised user is not an admin or owner of the channel
    if u in current_channel.get_owner_members() or helperfunctions.is_sender(u_id, current_message):
        current_channel.messages.remove(current_message)
    else:
        call_error.message_remove()
    return {}

#Given a message, update it's text with new text
def message_edit(token, message_id, message_to_be_edited):
    all_channels = server.get_channels()
    users = server.get_users()
    u_id = class_user.find_u_id_from_token(token)
    u = class_user.find_user_from_u_id(u_id, users)
    find_message = False
    # raise valueerror if the message_id doesn't exist
    current_channel = helperfunctions.valid_message_id(message_id, all_channels)[0]
    current_message = helperfunctions.valid_message_id(message_id, all_channels)[1]
    helperfunctions.authorised_user(u_id, current_channel)
    # if the message is not empty or null then edit the message, otherwise remove the message
    if message_to_be_edited and message_to_be_edited.strip():
        current_message.message = message_to_be_edited
        return {}
    else:
        message_remove(token, message_id)

#Given a message within a channel the authorised user is part of, add a "react" to that particular message
def message_react(token, message_id, react_id):
    all_channels = server.get_channels()
    users = server.get_users()
    u_id = class_user.find_u_id_from_token(token)
    u = class_user.find_user_from_u_id(u_id, users)
    foundChannel = False
    foundMessage = False
    react = {
        'react_id':'',
        'u_ids':[],
        'is_this_user_reacted':False,
    }
    # raise valueerror if the message_id doesn't exist(check both in user's channel list and all channel list)
    helperfunctions.valid_message_id(message_id, all_channels)
    current_channel = helperfunctions.valid_message_id(message_id, u.channel_list)[0]
    current_message = helperfunctions.valid_message_id(message_id, u.channel_list)[1]
    # raise ValueError when messages already contains an active
    # React with ID react_id
    for rea in current_message.get_reacts():
        if str(rea['react_id']) == str(1):
            call_error.react_id_already_active()
    # raise ValueError when react_id is not a valid react ID
    if str(react_id) != str(1):
        call_error.invalid_react_id()
    react['react_id'] = 1
    react['u_ids'].append(u.get_u_id())
    react['is_this_user_reacted'] = True
    current_message.add_react(react)
    return {}

#Given a message within a channel the authorised user is part of, remove a "react" to that particular message
def message_unreact(token, message_id, react_id):
    all_channels = server.get_channels()
    users = server.get_users()
    u_id = class_user.find_u_id_from_token(token)
    u = class_user.find_user_from_u_id(u_id, users)
    # raise valueerror if the message_id doesn't exist
    current_message = helperfunctions.valid_message_id(message_id, u.get_channel_list())[1]
    for rea in current_message.get_reacts():
        if str(rea['react_id']) == str(0):
            call_error.react_id_not_active()
        else:
            rea['react_id'] = 0
            rea['u_ids'].remove(u.u_id)
            rea['is_this_user_reacted'] = False
    if str(react_id) != str(1):
        call_error.invalid_react_id()
    return {}


#Given a message within a channel, mark it as "pinned" to be given special display treatment by the frontend
def message_pin(token, message_id):
    all_channels = server.get_channels()
    users = server.get_users()
    u_id = class_user.find_u_id_from_token(token)
    u = class_user.find_user_from_u_id(u_id, users)
    # raise valueerror if the message_id doesn't exist
    current_channel = helperfunctions.valid_message_id(message_id, u.get_channel_list())[0]
    current_message = helperfunctions.valid_message_id(message_id, u.get_channel_list())[1]
    if current_message.get_is_pinned():
        call_error.message_already_pinned()
    helperfunctions.authorised_user(u_id, current_channel)
    if u not in current_channel.get_owner_members():
        call_error.message_pin_not_admin()
    current_message.set_is_pinned(True)
    return {}

#Given a message within a channel, remove it's mark as unpinned
def message_unpin(token, message_id):
    all_channels = server.get_channels()
    users = server.get_users()
    u_id = class_user.find_u_id_from_token(token)
    u = class_user.find_user_from_u_id(u_id, users)
    # raise valueerror if the message_id doesn't exist
    current_channel = helperfunctions.valid_message_id(message_id, u.get_channel_list())[0]
    current_message = helperfunctions.valid_message_id(message_id, u.get_channel_list())[1]
    if not current_message.get_is_pinned():
        call_error.message_already_unpinned()
    helperfunctions.authorised_user(u_id, current_channel)
    if u not in current_channel.get_owner_members():
        call_error.message_pin_not_admin()
    current_message.set_is_pinned(False)
    return {}
