#!/usr/bin/env python3
# -*- coding: utf-8 -*-
#pylint: disable= W0511, C0303, W0613, C0116, C0301, C0103, W0611
#SAME AS FOR CHANNELS.PY
"""
Created on Mon Sep 30 15:39:23 2019

@author: z5211275
"""
import datetime
import pytest
import channels
from Error import AccessError

# Channels invite tests include:
#   checking whether u_id and channel ids are valid, to 
#   allow a user to interact efficiently
# And a normal test case.



def test_channels_invite_token():
    #raise value error when channel_id does not refer to a valid channel that the authorised user is part of
    with pytest.raises(ValueError, match=r"Wrong*"):
        channels.channel_invite("ERYR1284zvc", 4, 1253)
    
def test_channels_invite_uid():
    #raise value error when u_id does not refer to a valid user
    with pytest.raises(ValueError, match=r"User*"):
        channels.channel_invite("ERYR1284zvc", 4, 1254)

def test_channels_invite_valid():
    #check for the normal case
    assert channels.channel_invite("ERYR12854zvc", 4, 1253) == {}

def test_channels_invite_invalid_uid():
    #raise value error when u_id does not refer to a valid user
    with pytest.raises(ValueError, match=r"User*"):
        channels.channel_invite("ERYR12854zvc", 4, 21)

# Channel details include:
#   Checking for valid channel ids, and whether the user is authed
#   as a memeber of the channel
# And a normal test case.



def test_channels_details_channelid():
    #raise value error when Channel (based on ID) does not exist
    with pytest.raises(ValueError, match=r"Channel*"):
        channels.channel_details("ERYR1284zvc", 6)
    
def test_channels_details_channelmember():
    #raise access error when Authorised user is not a member of channel with channel_id
    with pytest.raises(AccessError, match=r"Not*"):
        channels.channel_details("ERYR1285zvc", 5)
    
def test_channels_details_valid():
    #check for the normal case
    assert channels.channel_details("ERYR12854zvc", 4) == {'name':'Hondalion',
                                                           'owner_members':[{'u_id' : 5211275, 'name_first' : 'Patrick', 'name_last':'Dong'}],
                                                           'all_members':[{'u_id' : 5211275, 'name_first' : 'Patrick', 'name_last' : 'Dong'}]
                                                           }
    
# Tests for channels messages:
#   Checking valid channel ids, correct indexs and whether a user is a 
#   channel memeber
# And a normal test case.

def test_channels_messages_channelid():
    #raise value error when Channel (based on ID) does not exist
    with pytest.raises(ValueError, match=r"Channel*"):
        channels.channel_messages("ERYR1284zvc", 6, 0)

def test_channels_messages_indexerror():
    #raise value error when start is greater than the total number of messages in the channel
    with pytest.raises(ValueError, match=r"Index*"):
        channels.channel_messages("ERYR1284zvc", 5, 5)

def test_channels_messages_channelmember():
    #raise access error when Authorised user is not a member of channel with channel_id
    with pytest.raises(AccessError, match=r"Not*"):
        channels.channel_messages("ERYR1285zvc", 4, 0)
    
def test_channels_messages_valid():
    #test for normal case
    assert(channels.channel_messages("ERYR12845zvc", 4, 0)) == {'messages' : [{'message_id':134, 'u_id' : 5211275, 'message' : 'Oops!', 'time_created' : datetime.datetime(2006, 6, 14, 8, 30, tzinfo=datetime.timezone.utc), 'is_unread' : True}],
                                                                'start' : 0,
                                                                'end' : 2
                                                                }
# Tests for channels leave:
#   Checking valid channel ids.
# And a normal test case.

def test_channels_leave_channelid():
    #raise value error when Channel (based on ID) does not exist
    with pytest.raises(ValueError, match=r"Channel*"):
        channels.channel_leave("ERYR1284zvc", 6)
    
def test_channels_leave_valid():
    #test for normal case
    assert channels.channel_leave("ERYR1284zvc", 4) == {}
    
# Tests for channels join:
#   Checking valid channel ids including private channels.
# And a normal test case.

def test_channels_join_channelid():
    #raise value error when Channel (based on ID) does not exist
    with pytest.raises(ValueError, match=r"Channel*"):
        channels.channel_join("ERYR1284zvc", 6)

def test_channels_join_privatechannel():
    #raise access error when channel_id refers to a channel that is private (when the authorised user is not an admin)
    with pytest.raises(AccessError, match=r"Private*"):
        channels.channel_join("ERYR1284zvc", 3)
    
def test_channels_join_valid():
    #test for normal case
    assert channels.channel_join("ERYR12384zvc", 3) == {}
    
# Tests for addowner:
#   Checking valid channel ids, whether user is already an owner, or whether user 
#   is a part of the channel.
# And a normal test case.


def test_channels_addowner_channelid():
    #raise value error when Channel (based on ID) does not exist
    with pytest.raises(ValueError, match=r"Channel*"):
        channels.channel_addowner("ERYRzvc", 6, 1253)
    
def test_channels_addowner_alreadyowner():
    #raise access error when the authorised user is not an owner of the slackr, or an owner of this channel
    with pytest.raises(ValueError, match=r"Not*"):
        channels.channel_addowner("ERYR284zvc", 3, 1253)
    
def test_channels_addowner_authorizationerror():
    #raise value error when user with user id u_id is already an owner of the channel
    with pytest.raises(AccessError, match=r"Authorisation*"):
        channels.channel_addowner("ERYR84zvc", 3, 1253)
    
def test_channels_addowner_valid():
    #test for normal case
    assert channels.channel_addowner("ERYR184zvc", 3, 1253) == {}

# Tests for reomveowner:
#   Checking valid channel ids, whether user is not an owner, or whether user 
#   is a part of the channel.
# And a normal test case.

def test_channels_removeowner_channelid():
    #raise value error when Channel (based on ID) does not exist
    with pytest.raises(ValueError, match=r"Channel*"):
        channels.channel_removeowner("ERYRzvc", 6, 1253)

def test_channels_removeowner_alreadyowner():
    #raise access error when the authorised user is not an owner of the slackr, or an owner of this channel
    with pytest.raises(ValueError, match=r"Not*"):
        channels.channel_removeowner("ERYR184zvc", 3, 1253)
    
def test_channels_removeowner_authorizationerror():
    #raise value error when user with user id u_id is not an owner of the channel
    with pytest.raises(AccessError, match=r"Authorisation*"):
        channels.channel_removeowner("ERYR84zvc", 3, 1253)
    
def test_channels_removeowner_valid():
    #test for normal case
    assert channels.channel_removeowner("ERYR1284zvc", 3, 1253) == {}

# Tests for reomveowner:
#   Checking for name length(Less than 20)
# And a normal test case.

def test_channels_create():
    with pytest.raises(ValueError, match=r"Name*"):
        channels.channels_create("ERYR12845zvc", "aidgfiagbfajibfjbabbagvfaygsyfvbaysvfyagvyvayvfyadfavfyavbvavygcyagygaygygaggqiygiaisfdgiag", True)
    
def test_channels_channels_list_valid():
    #test for normal case
    assert channels.channels_list("ahusjfhue3") == [{'id':542, 'name':'weeeeeeeeeeb'}]
    
def test_channels_channels_listall_valid():
    #test for normal case
    assert channels.channels_listall("ahusjfhue3") == [{'id':542, 'name':'weeeeeeeeeeb'}]
    
def test_channels_create_valid():
    #test for normal case
    assert channels.channels_create("ERYR1284zvc", "weeeeb", True) == 154
    