#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# pylint: disable= C0103, C0303, W0601, C0301, W0602, W0603, W0404, W0611, W0612, W0613, W0703, W0621, W0631, E0602, R0912
#Same pylint disables as server.py


"""
REASONINGS BEHIND PYLINT DISABLES
    W0511 = Comment errors
        #Raises unneccesary pylint error for written todos
    C0303 = Whitespace next line
        #Unneeded error
    W0613 = Unused argument
        #All raised for tokens which are not refreshed
    C0116 = Unused docstring
        #Neccessary for filler arguments. These functions cannot be removed for independant function
    C0301 = Long lnes
        #Functions cannot be moved. Issues known.
    C0103 = CONSTANT NAMES
        #Functions are build without main. Issue known and cannot be changed
    W0611 = Unused modue
        #Allowed for future iterations and possible adjustments

Created on Mon Sep 30 13:19:21 2019

@author: z5211275
"""
import datetime
import os
import pickle
import jwt
import call_error
import class_channel
import check
import class_user
import server
import helperfunctions

#Invites a user (with user id u_id) to join a channel with ID channel_id. 
#Once invited the user is added to the channel immediately
def channel_invite(token, channel_id, u_id):
    all_channels = server.get_channels()
    users = server.get_users()
    us_id = class_user.find_u_id_from_token(token)
    u = class_user.find_user_from_u_id(us_id, users)
    # If inviting someone to a channel which doesn't exist, call error
    current_channel = helperfunctions.valid_channel(channel_id, all_channels)

    # If trying to invite a u_id that belongs to 
    # more than one user/ no users, call error
    invite_user = helperfunctions.valid_user(u_id, users)

    # If the inviter is not in the channel, call error
    helperfunctions.authorised_user(us_id, current_channel)
        
    # If the channel being invited to exists and
    # and the u_id being invited is valid (only one user)
    # and the inviter is a member for the channel being invited to

    # Add the channel_id to users 'channel_list'
    invite_user.add_channel(current_channel)
    # Add the user to channels 'users'
    current_channel.add_user(invite_user)
    # Add invited user to channels 'all_members'
    current_channel.add_member(invite_user)
    return {}
    
#Given a Channel with ID channel_id that the authorised user is part of, 
#provide basic details about the channel
def channel_details(token, channel_id):
    all_channels = server.get_channels()
    users = server.get_users()
    owner_member = []
    owner_list = []
    all_member = []
    all_member_list = []
    u_id = class_user.find_u_id_from_token(token)
    u = class_user.find_user_from_u_id(u_id, users)
    # If the channel doesn't exist then raise error, if not return with the current channel
    current_channel = helperfunctions.valid_channel(channel_id, all_channels)

    #Raises AccessError for unauthorised user
    helperfunctions.authorised_user(u_id, current_channel)

    desired_keys = ('u_id', 'name_first', 'name_last', 'profile_img_url')

    for owner in current_channel.get_owner_members():
        # Adding owners into owner_member list
        owner_member.append(vars(owner))

    for ow in owner_member:
        ow = {key: value for key, value in ow.items() if key in desired_keys}
        owner_list.append(ow)

    for member in current_channel.get_members():
        # Adding members into all_member list
        all_member.append(vars(member))

    for mem in all_member:
        mem = {key: value for key, value in mem.items() if key in desired_keys}
        all_member_list.append(mem)

    return {'name' : current_channel.get_name(),
            'owner_members' : owner_list,
            'all_members' : all_member_list,
            }
    
#Given a Channel with ID channel_id that the authorised user is part of, return up to 50 
#messages between index "start" and "start + 50".
#Message with index 0 is the most recent message in the channel. 
#This function returns a new index "end" which is the value of "start + 50", or, 
#if this function has returned the least recent messages in the channel, 
#returns -1 to indicate there are no more messages to load after this return.
def channel_messages(token, channel_id, start):
    all_channels = server.get_channels()
    users = server.get_users()
    u_id = class_user.find_u_id_from_token(token)
    message_list = []
    current_channel = helperfunctions.valid_channel(channel_id, all_channels)
    if int(start) > len(current_channel.get_messages()):
        # If index 'start' is greater/equal to total no. of messages in channel
        start = len(current_channel.get_messages())
        call_error.start_index_exceed()

    helperfunctions.authorised_user(u_id, current_channel)

    if (start+50) >= len(current_channel.get_messages()):
        end = len(current_channel.get_messages())-1
    else:
        end = start + 50
    
    counter = 0
    messages = []
    for a_message in current_channel.get_messages():
        messages.append(vars(a_message))
        counter += 1
        end = -1
        if counter > 50:
            end = start + 50
            break
    desired_keys = ('message_id', 'u_id', 'message', 'time_created', 'reacts', 'is_pinned')
    for mess in messages:
        mess = {key: value for key, value in mess.items() if key in desired_keys}
        message_list.append(mess)
    # the most recent message should appear at the bottom, thanks for the help on the piazza :)
    message_list.reverse()
    return       {'messages' : message_list,
                  'start':start,
                  'end': end,
                 }
    
#Given a channel ID, the user removed as a member of this channel
def channel_leave(token, channel_id):
    all_channels = server.get_channels()
    users = server.get_users()
    u_id = class_user.find_u_id_from_token(token)
    u = class_user.find_user_from_u_id(u_id, users)
    current_channel = helperfunctions.valid_channel(channel_id, u.get_channel_list())
    helperfunctions.authorised_user(u_id, current_channel)

    # if they are an owner - remove them as a channel owner
    for owner in current_channel.get_owner_members():
        if str(owner.get_u_id()) == str(u.get_u_id()):
            current_channel.delete_owner(owner)

    # if they are a member(not an owner) remove them as a member of the channel
    for member in current_channel.get_members():
        if str(member.get_u_id()) == str(u.get_u_id()):
            current_channel.delete_member(member)

    # remove them as a user of the channel
    # owners and members are included in this user list
    for us in current_channel.get_users():
        if str(us.get_u_id()) == str(u.get_u_id()):
            current_channel.delete_user(us)

    u.channel_list.remove(current_channel)    
            
    return {}
    
#Given a channel_id of a channel that the authorised user can join, adds them to that channel
def channel_join(token, channel_id):
    all_channels = server.get_channels()
    users = server.get_users()
    u_id = class_user.find_u_id_from_token(token)
    u = class_user.find_user_from_u_id(u_id, users)
    current_channel = helperfunctions.valid_channel(channel_id, all_channels)
    if current_channel.get_is_public() != "True":
        call_error.private_channel()
    u.add_channel(current_channel)
    current_channel.add_member(u)
    current_channel.add_user(u)
    return {}
    
#Make user with user id u_id an owner of this channel
def channel_addowner(token, channel_id, u_id):
    all_channels = server.get_channels()
    users = server.get_users()
    us_id = class_user.find_u_id_from_token(token)
    u = class_user.find_user_from_u_id(us_id, users)
    invite_user = helperfunctions.valid_user(u_id, users)
    current_channel = helperfunctions.valid_channel(channel_id, all_channels)

    # raise AccessError if the authorised user (login user) is not
    # an owner of the slackr or an owner of the channel 
    if u not in current_channel.get_owner_members():
        call_error.unauthorised_user()

    # raise ValueError when u_id is already owner of channel 
    if invite_user in current_channel.get_owner_members():
        call_error.existing_owner()
    # else make them the owner
    current_channel.add_owner(invite_user)
    return {}
     
#Remove user with user id u_id an owner of this channel
def channel_removeowner(token, u_id, channel_id):
    all_channels = server.get_channels()
    users = server.get_users()
    us_id = class_user.find_u_id_from_token(token)
    u = class_user.find_user_from_u_id(us_id, users)
    current_channel = helperfunctions.valid_channel(channel_id, all_channels)
    # raise AccessError if the authorised user (login user) is not
    # an owner of the slackr or an owner of the channel 
    if u not in current_channel.get_owner_members():
        call_error.unauthorised_user()
    # find the user that needs to be removed from owner list of the channel
    # raise ValueError when u_id is not an owner of channel 
    owner_to_remove = helperfunctions.valid_user(u_id, current_channel.get_owner_members())         
    # else remove them as the owner
    current_channel.owner_members.remove(u)
    return {}
    
#Provide a list of all channels (and their associated details) that the authorised user is part of
def channel_list(token):
    all_channels = server.get_channels()
    users = server.get_users()
    #Returns channel list for user
    u_id = class_user.find_u_id_from_token(token)
    u = class_user.find_user_from_u_id(u_id, users)
    ch_list = []
    new_ch_list = []
    for ch in u.get_channel_list():
        ch_list.append(vars(ch))
    for cha in ch_list:
        cha = dict((key, value) for key, value in cha.items() if key == 'channel_id' or key == 'name')
        new_ch_list.append(cha)
    return {'channels' : new_ch_list,
            }
    
#Provide a list of all channels (and their associated details)
def channel_listall(token):
    all_channels = server.get_channels()
    users = server.get_users()
    u_id = class_user.find_u_id_from_token(token)
    u = class_user.find_user_from_u_id(u_id, users)
    #Returns all channels that exist
    chs_list = []
    new_chs_list = []
    for ch in all_channels:
        chs_list.append(vars(ch))
    for chs in chs_list:
        chs = dict((key, value) for key, value in chs.items() if key == 'channel_id' or key == 'name')
        new_chs_list.append(chs)
    return {'channels' : new_chs_list,
            }
    
#Creates a new channel with that name that is either a public or private channel
def channels_create(token, name, is_public):
    all_channels = server.get_channels()
    users = server.get_users()
    u_id = class_user.find_u_id_from_token(token)
    u = class_user.find_user_from_u_id(u_id, users)
    # raise ValueError if name is more than 20 characters long
    if len(name) > 20:
        call_error.long_name()
    new_channel = class_channel.Channel(name, is_public)
    new_channel.add_owner(u)
    new_channel.add_member(u)
    new_channel.add_user(u)
    all_channels.append(new_channel)
    u.add_channel(new_channel)
    channel_id = new_channel.channel_id
    return {'channel_id': channel_id,
            }
    
    

    
    
