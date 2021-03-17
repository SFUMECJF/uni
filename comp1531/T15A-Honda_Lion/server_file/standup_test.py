#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# pylint: disable= C0103, C0301, C0303, W0601, C0301, W0602, W0603, W0404, W0611, W0612, W0613, W0703, W0621, W0631, E0602, R0912
#Same pylint disables as server.py

"""
Created on Sun Nov  10 11:18:17 2019

@author: z5257478
"""

import http.client
import urllib
import json
import random
import pytest
import server
import class_user
import user_profile
#import ChannelTestHelper as helper
import standup
import channels
import auth
import message
from datetime import datetime, timedelta

URL = "127.0.0.1:5002"
headers = {"Content-type": "application/x-www-form-urlencoded",
           "Accept": "text/plain"}
'''
Helpers
'''
def longstring():
    return 'dudedudedudedudedudedudedudedududedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudededudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedudedude'
'''
standup/active tests - 2 tests
GET request
tests: Channel ID is not a valid channel
       Valid Test
'''
def test_standup_active_1():
    server.clear_users()
    server.clear_channels()
    # User 1 registers
    register_dic = auth.auth_register("validemail@gmail.com", "password", "First", "Last", URL)
    token = register_dic['token']
    # User 1 creates channel
    channel_dic = channels.channels_create(token, "testchannel", True)
    channel_id = channel_dic['channel_id']
    # User 1 starts standup
    time = datetime.now() + timedelta(seconds = 1)
    time = time.timestamp()
    assert(standup.standup_start(token, channel_id, time)) is not None
    assert(standup.standup_active(token, channel_id)) is not None
    # Invalid channel
    with pytest.raises(Exception, match=r"*"):
        standup.standup_active(token, "-1", time)

def test_standup_active_2():
    server.clear_users()
    server.clear_channels()
    # User 1 registers
    register_dic = auth.auth_register("validemail@gmail.com", "password", "First", "Last", URL)
    token = register_dic['token']
    # User 1 creates channel
    channel_dic = channels.channels_create(token, "testchannel", True)
    channel_id = channel_dic['channel_id']
    # User 1 starts standup
    time = datetime.now() + timedelta(seconds = 0)
    time = time.timestamp()
    assert(standup.standup_active(token, channel_id)) is not None

'''
standup/start tests - 3 tests
POST request
tests: Start standup in invalid channel
       Start standup when standup is already active
       Valid Test
'''
def test_standup_start_1():
    server.clear_users()
    server.clear_channels()
    # User 1 registers
    register_dic = auth.auth_register("validemail@gmail.com", "password", "First", "Last", URL)
    token = register_dic['token']
    # User 1 creates channel
    channel_dic = channels.channels_create(token, "testchannel", True)
    channel_id = channel_dic['channel_id']
    # User 1 starts standup (invalid channel, valid, already active)
    time = datetime.now() + timedelta(seconds = 1)
    time = time.timestamp()
    with pytest.raises(Exception, match=r"*"):
        standup.standup_start(token, "-1", time)
    assert(standup.standup_start(token, channel_id, time)) is not None
    with pytest.raises(Exception, match=r"*"):
        standup.standup_start(token, channel_id, time)
    
'''
# Start standup in invalid channel
def test_standup_start_1():
    # User 1 registers, logs in
    email = helper.reg_helper()
    returned_dic = helper.login_helper(email, 'password')
    token = returned_dic['token']
    u_id = returned_dic['u_id']
    # User 1 creates channel
    channel_id = helper.create_channel_helper(token, "any", state='True')
    # User 1 creates standup in invalid channel_id "-1"
    params = urllib.parse.urlencode({'token': token,
                                     'channel_id': -1,
                                     'length': 1,
                                    })
    conn = http.client.HTTPConnection(URL)
    conn.request("POST", "/standup/start", params, headers)
    response = conn.getresponse()

    assert(response.status) == 400
    assert(response.reason) == "BAD REQUEST"  

# Start standup when standup is already active
def test_standup_start_2():
    # User 1 registers, logs in
    
    email = helper.reg_helper()
    returned_dic = helper.login_helper(email, 'password')
    token = returned_dic['token']
    u_id = returned_dic['u_id']
    
    # User 2 registers, logs in
    
    email2 = helper.reg_helper()
    returned_dic2 = helper.login_helper(email2, 'password')
    token2 = returned_dic2['token']
    u_id2 = returned_dic2['u_id']
    # User 2 creates valid channel
    channel_id = helper.create_channel_helper(token2, "new channel", state='True')
    
    #print(channel_id)
    # User 2 invites user 1 to channel
    helper.invite_helper(token2, channel_id, u_id)
    # User 1 creates standup
    params = urllib.parse.urlencode({'token': token,
                                     'channel_id': channel_id,
                                     'length': 10,
                                     })
    conn = http.client.HTTPConnection(URL)
    conn.request("POST", "/standup/start", params, headers)
    # User 2 creates standup, with prev standup still active
    params = urllib.parse.urlencode({'token': token2,
                                     'channel_id': channel_id,
                                     'length': 1,
                                     })
    conn = http.client.HTTPConnection(URL)
    conn.request("POST", "/standup/start", params, headers)
    response = conn.getresponse()
    assert(response.status) == 400
    assert(response.reason) == "BAD REQUEST"  

# Valid test
def test_standup_start_3():
    # User 1 registers, logs in
    email = helper.reg_helper()
    returned_dic = helper.login_helper(email, 'password')
    token = returned_dic['token']
    u_id = returned_dic['u_id']
    # User 1 creates channel
    channel_id = helper.create_channel_helper(token, "any", state='True')
    # User 1 creates standup
    params = urllib.parse.urlencode({'token': token,
                                     'channel_id': channel_id,
                                     'length': 1,
                                     })
    conn = http.client.HTTPConnection(URL)
    conn.request("POST", "/standup/start", params, headers)
    response = conn.getresponse()

    assert(response.status) == 200
    assert(response.reason) == "OK"
'''
    



'''
def test_standup_active_1():
    # User 1 reg, logs in
    email = helper.reg_helper()
    returned_dic = helper.login_helper(email, 'password')
    token = returned_dic['token']
    u_id = returned_dic['u_id']
    # User 1 creates channel
    channel_id = helper.create_channel_helper(token, "new channel 3", state='True')
    # User 1 gets active standup
    params = urllib.parse.urlencode({'token': token, 'channel_id': -1})
    url = 'http://' + URL + '/standup/active' + '?' + params
    try:
        response = urllib.request.urlopen(url)
    except urllib.error.HTTPError as err:
        print(err.read())
        err = str(err)
        assert(err) == 'HTTP Error 400: BAD REQUEST'

# Valid test
def test_standup_active_2():
    # User 1 reg, log in
    email = helper.reg_helper()
    returned_dic = helper.login_helper(email, 'password')
    token = returned_dic['token']
    u_id = returned_dic['u_id']
    # User 1 creates channel
    channel_id = helper.create_channel_helper(token, "new channel 2", state='True')
    # User 1 gets active standup
    params = urllib.parse.urlencode({'token': token, 'channel_id': channel_id})
    url = 'http://' + URL + '/standup/active' + '?' + params
    response = urllib.request.urlopen(url)
    
    assert(response.status) == 200
    assert(response.reason) == "OK"
'''
'''
standup/send tests - 5 tests
POST request
tests: Channel ID is not a valid channel
       Message is more than 1000 characters
       An active standup is not currently running in this channel
       The authorised user is not a member of the channel that the message is within
       Valid Test
'''
def test_standup_send_1():
    server.clear_users()
    server.clear_channels()
    # User 1 registers
    register_dic = auth.auth_register("validemail@gmail.com", "password", "First", "Last", URL)
    token = register_dic['token']
    # User 1 creates channel
    channel_dic = channels.channels_create(token, "testchannel", True)
    channel_id = channel_dic['channel_id']
    # Invalid channel
    with pytest.raises(Exception, match=r"*"):
        standup.standup_send(token, "-1", "invalid channel")
    # Not active standup
    with pytest.raises(Exception, match=r"*"):
        standup.standup_send(token, channel_id, "no active standup")
    # User 1 starts standup
    time = datetime.now() + timedelta(seconds = 1)
    time = time.timestamp()
    assert(standup.standup_start(token, channel_id, time)) is not None
    # Valid stand up send
    assert (standup.standup_send(token, channel_id, "sendlatertest")) is not None
    with pytest.raises(Exception, match=r"*"):
        standup.standup_send(token, channel_id, longstring())
    register_dic2 = auth.auth_register("validemail2@gmail.com", "password", "First", "Last", URL)
    token2 = register_dic2['token']
    with pytest.raises(Exception, match=r"*"):
        standup.standup_send(token2, channel_id, "user2notinchannel")
'''
standup_finish_send(token, channel_id) tests
'''
def test_standup_finish_send_1():
    server.clear_users()
    server.clear_channels()
    # User 1 registers
    register_dic = auth.auth_register("validemail@gmail.com", "password", "First", "Last", URL)
    token = register_dic['token']
    # User 1 creates channel
    channel_dic = channels.channels_create(token, "testchannel", True)
    channel_id = channel_dic['channel_id']
    time = datetime.now() + timedelta(seconds = 1)
    time = time.timestamp()
    assert(standup.standup_start(token, channel_id, time)) is not None
    assert (standup.standup_send(token, channel_id, "sendlatertest")) is not None
    assert (standup.standup_finish_send(token, channel_id)) is not None
'''
Search tests
'''
def test_search_1():
    server.clear_users()
    server.clear_channels()
    # User 1 registers
    register_dic = auth.auth_register("validemail@gmail.com", "password", "First", "Last", URL)
    token = register_dic['token']
    u_id = register_dic['u_id']
    # User 1 creates channel
    channel_dic = channels.channels_create(token, "testchannel", True)
    channel_id = channel_dic['channel_id']
    message_dic = message.message_send(token, channel_id, "testmessage")
    assert(standup.search(token, "message")) is not None
'''
user_permission_change tests
'''
def test_user_permission_change_1():
    server.clear_users()
    server.clear_channels()
    # User 1 registers
    register_dic = auth.auth_register("validemail@gmail.com", "password", "First", "Last", URL)
    token = register_dic['token']
    
    register_dic2 = auth.auth_register("validemail2@gmail.com", "password", "First", "Last", URL)
    token2 = register_dic2['token']
    u_id2 = register_dic2['u_id']
    # User 1 creates channel
    channel_dic = channels.channels_create(token, "testchannel", True)
    channel_id = channel_dic['channel_id']
    channels.channel_invite(token, channel_id, u_id2)
    with pytest.raises(Exception, match=r"*"):
        standup.user_permission_change(token, "-1", 2)
    with pytest.raises(Exception, match=r"*"):
        standup.user_permission_change(token, u_id2, 100)
    with pytest.raises(Exception, match=r"*"):
        standup.user_permission_change(token2, u_id, 3)
    
def test_user_permission_change_2():
    server.clear_users()
    server.clear_channels()
    # User 1 registers
    register_dic = auth.auth_register("validemail@gmail.com", "password", "First", "Last", URL)
    token = register_dic['token']
    u_id = register_dic['u_id']
    all_channels = server.get_channels()
    users = server.get_users()
    u = class_user.find_user_from_u_id(u_id, users)
    u.set_permission_id(1)
    
    register_dic2 = auth.auth_register("validemail2@gmail.com", "password", "First", "Last", URL)
    token2 = register_dic2['token']
    u_id2 = register_dic2['u_id']
    
    register_dic3 = auth.auth_register("validemail3@gmail.com", "password", "First", "Last", URL)
    token3 = register_dic3['token']
    u_id3 = register_dic3['u_id']
    
    # User 1 creates channel
    channel_dic = channels.channels_create(token, "testchannel", True)
    channel_id = channel_dic['channel_id']
    channels.channel_invite(token, channel_id, u_id2)
    channels.channel_invite(token, channel_id, u_id3)
    #assert(standup.user_permission_change(token, u_id3, 1)) is not None

