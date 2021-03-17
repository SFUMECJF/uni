#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Mon Sep 30 14:55:46 2019

@author: z5258962

"""
# pylint: disable = W0511, W0105, C0116, R1720, C0103, W0613
import re
from Error import AccessError

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

#Assumptions are given to the channel id list actually exists and that members
#and are given
#Assumptions are also made
#That any token contains the name of the member
#Dud values are input below but later, should be called from another function

channel_data = {
        "chs" : [0],
        "ch0mem" : ["0"],
        "ch0msgs" : ["a", "b", "a", "i am groot", "i am groot",
                     "thus with a kiss i die", "!", "@", "@@@", "@@@ @@@"]
    }


#For a given channel, start the standup period whereby for the next 15 minutes
#if someone calls "standup_send" with a message,
#it is buffered during the 15 minute window then at the end of the 15 minute
#window a message will be added to the message
#queue in the channel from the user who started the standup.
def standup_start(token, channel_id):
    #Checks if channel exists in the server
    checker = {
        "id_exists" : False,
        "channel_exists" : False
    }
    for i in channel_data["chs"]:
        if i is channel_id:
            checker["channel_exists"] = True
    if checker["channel_exists"] is False:
        raise ValueError("Channel does not exist")
    else:
    #If channel exists, checks if user is a valid member of the channel
        for person in channel_data["ch0mem"]:
            if person in token:
                checker["id_exists"] = True

        if checker["id_exists"] is False:
            raise AccessError("User is not member of this channel")
    return {}

#Sending a message to get buffered in the standup queue, assuming a standup is
#currently active
def standup_send(token, channel_id, message):
    checker_one = {
        "id_exists" : False,
        "channel_exists" : False
    }
    for j in channel_data["chs"]:
        if j is channel_id:
            checker_one["channel_exists"] = True
    #Checks if channel exists in the server
    if checker_one["channel_exists"] is False:
        raise ValueError("Channel does not exist")
    else:
    #If channel exists, checks if user is a valid member of the channel
        for person in channel_data["ch0mem"]:
            if person in token:
                checker_one["id_exists"] = True
        if checker_one["id_exists"] is False:
            raise AccessError("User is not member of this channel")

    #Raises value error when Message is more than 1000 characters
    if len(message) > 1000:
        raise ValueError("Message invalid")

    #Raises access error when If the standup time has Exceeded limit
    #NOTE THAT THIS TEST SHOULD BE CALLING FROM AN UPDATE TOKEN BUT ISN'T
    if "time:0" in token:
        raise AccessError("Standup time has been exceeded (15 minutes)")

    return {}

    #ToDo: send a message to get buffered in the standup queue

#Given a query string, return a collection of messages that match the query
def search(token, query_str):
    counter = 0
    matched_query = []
    matched_queryline = []
    for string in channel_data["ch0msgs"]:
            #To save the line of the matched query
            #never used or returned so now a stub function for later use
        counter += 1
        if re.search(query_str, string):
            matched_query.append(string)
            matched_queryline.append(counter)

    return matched_query

#Given a User by their user ID, set their permissions to new permissions
#described by permission_id
def admin_userpermission_change(token, u_id, permission_id):
    #Raise value error when u_id does not refer to a valid user
    #Assumes channel data is given in token. NOTE THAT TOKEN IS NOT USED IN
    #THIS PROGRAM BUT CHANNEL IS DEFERED TO CHANNEL 0
    #This program assumes new perm leads to a valid perm
    checker_two = {
        "id_exists" : False,
        "channel_exists" : False
    }
    for k in channel_data["ch0mem"]:
        if k == str(u_id):
            checker_two["id_exists"] = True
    if permission_id not in ('1', '2', '3', '4'):
        raise ValueError("New permission doesnt exist")
    elif checker_two["id_exists"] is False:
        raise ValueError("User is not a member of this channel")
    #Raise access error when The authorised user is not an admin or owner
    elif "1" in token or "2" in token:
        #Call function to change perms
        return {}
    else:
        raise AccessError("User not authorised to make changes")
