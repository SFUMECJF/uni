#!/usr/bin/env python3
# -*- coding: utf-8 -*-

#pylint: disable= W0511, C0303, W0613, C0116, C0301, C0103, W0611

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
from json import dumps
from flask import Flask, request
from Error import AccessError


Channel = Flask(__name__)
uidlist = [1253, 647256, 137856]
channelidlist = [1, 2, 3, 4, 5]
messageslist = ["lol", "howru", "gdaym8", "<3"]
#In this class, I assume that any token contains 1 is the owner of slackr, 2 is the owner of channel, 3 is the admin, 4 is the member

#Invites a user (with user id u_id) to join a channel with ID channel_id. Once invited the user is added to the channel immediately
@Channel.route('/channel/invite', methods=['POST'])
def channel_invite(token, channel_id, u_id):
    #ToDo: raise value error when channel_id does not refer to a valid channel that the authorised user is part of
    if "5" not in token:
        raise ValueError("Wrong channel id")
    #ToDo: raise value error when u_id does not refer to a valid user
    if u_id not in uidlist:
        raise ValueError("User id not valid")
    #ToDo: raise access error when the authorised user is not already a member of the channel 
    
    #ToDo: add user to the channel
    return {}
    
#Given a Channel with ID channel_id that the authorised user is part of, provide basic details about the channel
@Channel.route('/channel/details', methods=['GET'])
def channel_details(token, channel_id):
    #ToDo: raise value error when Channel (based on ID) does not exist
    if channel_id not in channelidlist:
        raise ValueError("Channel id not valid")
    #ToDo: raise access error when Authorised user is not a member of channel with channel_id
    if "4" not in token:
        raise AccessError("Not a member of the channel")
    return {'name':'Hondalion',
            'owner_members':[{'u_id':5211275,
                              'name_first':'Patrick',
                              'name_last':'Dong'
                              }],
            'all_members':[{'u_id':5211275,
                            'name_first':'Patrick',
                            'name_last':'Dong'
                            }]
            }
    
#Given a Channel with ID channel_id that the authorised user is part of, return up to 50 messages between index "start" and "start + 50".
#Message with index 0 is the most recent message in the channel. 
#This function returns a new index "end" which is the value of "start + 50", or, 
#if this function has returned the least recent messages in the channel, 
#returns -1 to indicate there are no more messages to load after this return.
@Channel.route('/channel/messages', methods=['GET'])
def channel_messages(token, channel_id, start):
    #ToDo: raise value error when Channel (based on ID) does not exist
    if channel_id not in channelidlist:
        raise ValueError("Channel id not valid")
    #ToDo: raise value error when start is greater than the total number of messages in the channel
    if start > len(messageslist):
        raise ValueError("Index error")
    #ToDo: raise access error when Authorised user is not a member of channel with channel_id
    if "4" not in token:
        raise AccessError("Not a member of the channel")
    #ToDo: return up to 50 channel messages that are most recent, return -1 afterwards(if I interpret the requirement correctly)
    return  {'messages':[{'message_id':134,
                          'u_id':5211275,
                          'message':'Oops!',
                          'time_created':datetime.datetime(2006, 6, 14, 8, 30, tzinfo=datetime.timezone.utc), 
                          'is_unread' : True
                          }],
             'start':0,
             'end':2
             }
    
#Given a channel ID, the user removed as a member of this channel
@Channel.route('/channel/leave', methods=['POST'])
def channel_leave(token, channel_id):
    #ToDo: raise value error when Channel (based on ID) does not exist
    if channel_id not in channelidlist:
        raise ValueError("Channel id not valid")
    #ToDo: remove the user from the channel(remove the authorisation from the token)
    return {}
    
#Given a channel_id of a channel that the authorised user can join, adds them to that channel
@Channel.route('/channel/join', methods=['POST'])
def channel_join(token, channel_id):
    #ToDo: raise value error when Channel (based on ID) does not exist
    if channel_id not in channelidlist:
        raise ValueError("Channel id not valid")
    #ToDo: raise access error when channel_id refers to a channel that is private (when the authorised user is not an admin)
    if "3" not in token:
        raise AccessError("Private channel")
    #ToDo: authorise the token and add the user to the channel
    return {}
    
#Make user with user id u_id an owner of this channel
@Channel.route('/channel/addowner', methods=['POST'])
def channel_addowner(token, channel_id, u_id):
    #ToDo: raise value error when Channel (based on ID) does not exist
    if channel_id not in channelidlist:
        raise ValueError("Channel id not valid")
    #ToDo: raise access error when the authorised user is not an owner of the slackr, or an owner of this channel
    if "1" not in token and "2" not in token:
        raise AccessError("Authorisation error")
    #ToDo: raise value error when user with user id u_id is already an owner of the channel
    if "2" in token:
        raise ValueError("Already an owner")
    #ToDo: authorise the user's token to be the owner of the channel
    return {}
     
#Remove user with user id u_id an owner of this channel
@Channel.route('/channel/removeowner', methods=['POST'])
def channel_removeowner(token, channel_id, u_id):
    #ToDo: raise value error when Channel (based on ID) does not exist
    if channel_id not in channelidlist:
        raise ValueError("Channel id not valid")
    #ToDo: raise access error when the authorised user is not an owner of the slackr, or an owner of this channel
    if "1" not in token and "2" not in token:
        raise AccessError("Authorisation error")
    #ToDo: raise value error when user with user id u_id is not an owner of the channel
    if "2" not in token:
        raise ValueError("Not an owner")
    #ToDo: remove user as a owner of the channel
    return {}
    
#Provide a list of all channels (and their associated details) that the authorised user is part of
@Channel.route('/channel/list', methods=['GET'])
def channels_list(token):
    #ToDo: list channels that user is in
    return [{'id':542,
             'name':'weeeeeeeeeeb'}]
    
#Provide a list of all channels (and their associated details)
@Channel.route('/channel/listall', methods=['GET'])
def channels_listall(token):
    #ToDo: list all channels
    return [{'id':542,
             'name':'weeeeeeeeeeb'}]
    
#Creates a new channel with that name that is either a public or private channel
@Channel.route('/channel/create', methods=['POST'])
def channels_create(token, name, is_public):
    #ToDo: raise value error when Name is more than 20 characters long
    if len(name) > 20:
        raise ValueError("Name too long")
    
    #ToDo: create a channel
    return 154
    