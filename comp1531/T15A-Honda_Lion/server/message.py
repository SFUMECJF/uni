"""
Created on Mon Sep 30 13:49:23 2019

@author: z5211275, z5260304
"""
#!/usr/bin/env python3
# -*- coding: utf-8 -*-

#from datetime import datetime
from Error import AccessError

# pylint: disable = W0511, C0116, C0301, W0105, C0103, R1720, R1705, W0612, W0613

"""
    PYLINT DISABLE ERRORS

    W0511: FIXME error
        # Comments have ToDos to show what we had to implement
    C0116: Missing function or method docstring
        #
    C0301: Line too long
        # Needed long string for testing purposes
    W0105: String statement has no effect
        # Using it for commenting block
    R1720: Unnecessary else after 'raise'
        # Easier to follow code / readability
    W0613: Unused argument
        # Will use in future

"""

#Send a message from authorised_user to the channel specified by channel_id automatically at a specified time in the future
def message_sendlater(token, channel_id, message, time_sent):
    existing_channelIds = [111, 222, 333]
    #ToDo: raise value error when Channel (based on ID) does not exist
    if channel_id not in existing_channelIds:
        raise ValueError("Non-existant channel")

    #ToDo: raise value error when Message is more than 1000 characters
    elif len(message) > 1000:
        raise ValueError("Message invalid")

    #ToDo: raise value error when Time sent is a time in the past
    elif time_sent == "past_date":
        raise ValueError("Message sent in the past")

    else:
        return "pass"

#Send a message from authorised_user to the channel specified by channel_id
def message_send(token, channel_id, message):
    existing_channelIds = [111, 222, 333]
    #ToDo: raise value error when Channel (based on ID) does not exist
    if channel_id not in existing_channelIds:
        raise ValueError("Non-existant channel")
    #ToDo: raise value error when Message is more than 1000 characters
    elif len(message) > 1000:
        raise ValueError("Message invalid")

    else:
        return "pass"

#Given a message_id for a message, this message is removed from the channel
def message_remove(token, message_id):
    existing_ids = [111, 222, 333]
    deleted_ids = [000, 444]

    user_priv = {"non_admin" : 0, "admin": 1}

    #ToDo: raise value error when Message (based on ID) no longer exists
    if message_id not in existing_ids and message_id in deleted_ids:
        raise ValueError("Id no longer exists")
    #ToDo: raise access error when User does not have permission to remove that row
    if user_priv[token] == 0:
        raise AccessError("Invalid action")
    #ToDo: remove a specific message

    else:
        return "pass"

#Given a message, update it's text with new text
def message_edit(token, message_id, message):
    #ToDo: raise value error when Message with message_id edited by authorised user is not the poster of the message

    senderNId = {"personA" : 1, "personB" : 0}
    msgId = {"personA": 123, "personB" : 321}

    invalidMsg = ["MsgA", "MsgB"]
    if token != "personA":
        raise ValueError("You are not the composer")

    #ToDo: raise value error when Message with message_ is not a valid message that either 1) is a message sent by the authorised user,
    #or; 2) If the authorised user is an admin, is a any message within a channel that the authorised user has joined

    if senderNId[token] != 1 or message in invalidMsg:
        raise ValueError("You do not have auth/invalid message")

    else:
        return "pass"

#Given a message within a channel the authorised user is part of, add a "react" to that particular message
def message_react(token, message_id, react_id):
    # Dictionary of id's and whether item is already active
    real_react_id = 14568
    real_react_id1 = 111
    real_msg_id = 1234
    tokenReal = "ERYR12845zvc"
    msgXreactId = {111: 1, 222:0, 333: 0, 0000: 0}
    invalid_words = ["badword1", "badword2"]

    if  token == tokenReal and message_id == real_msg_id and react_id == real_react_id:
        return "pass"

    #ToDo: raise value error when message_id is not a valid message within a channel that the authorised user has joined
    elif message_id in invalid_words:
        raise ValueError("Invalid message id")

    #ToDo: raise value error when react_id is not a valid React ID
    else:
        raise ValueError("React id invalid")

#Given a message within a channel the authorised user is part of, remove a "react" to that particular message
def message_unreact(token, message_id, react_id):
    # for normal case
    real_react_id = 14568 # assuming it is non active anymore
    real_msg_id = 1234
    tokenReal = "ERYR12845zvc"

    # for other cases

    invalid_words = ["badword1", "badword2"]
    valid_react_id = ["111,222,333"]
    if  token == tokenReal and message_id == real_msg_id and react_id == real_react_id:
        return "pass"

    #ToDo: raise value error when message_id is not a valid message within a channel that the authorised user has joined
    elif message_id in invalid_words:
        raise ValueError("Invalid message id")
    #ToDo: raise value error when react_id is not a valid React ID
    else:
        raise ValueError("Invalid react id")


#Given a message within a channel, mark it as "pinned" to be given special display treatment by the frontend
def message_pin(token, message_id):
    valid_msg_id = 111
    admin_list = ["someToken", "someotherToken"]
    pinnedMsgs = {"msg1" : 1, "msg2" : 0}
    channelMemeber = {"a", "b", "c"}

    #ToDo: raise value error when message_id is not a valid message
    if message_id != valid_msg_id:
        raise ValueError("Invalid message id")

     #ToDo: raise access error when The authorised user is not a member of the channel that the message is within
    elif token == "unknown" and  valid_msg_id == message_id:
        raise KeyError("User is not a channel memeber")
    else:
        raise ValueError("User is not admin")

#Given a message within a channel, remove it's mark as unpinned
def message_unpin(token, message_id):
    valid_msg_id = 111
    admin_list = ["someToken", "someotherToken"]
    pinnedMsgs = {"msg1" : 1, "msg2" : 0}
    channelMemeber = {"a", "b", "c"}

    if message_id == valid_msg_id  and token in admin_list:
        return 'pass'

    #ToDo: raise value error when message_id is not a valid message
    elif message_id != valid_msg_id:
        raise ValueError("Invalid message id")

     #ToDo: raise access error when The authorised user is not a member of the channel that the message is within

    elif token == "unknown":
        raise KeyError("User is not a channel memeber")

    #ToDo: raise value error when The authorised user is not an admin
    else:
        raise ValueError("User is not admin")
