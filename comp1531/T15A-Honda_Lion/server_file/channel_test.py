#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Tue Nov  5 13:40:17 2019

@author: z5211275
"""

import http.client
import urllib
import json
import random
import server
import class_user
import auth
import pytest
import channels
import message

URL = "127.0.0.1:5009"

"""
CHANNEL/INVITE BACKEND TESTS
"""

# valid invite
def test_backend_channel_invite_1():
    # user 1 registers
    email = "validemail@gmail.com"
    password = "password"
    name_first = "First"
    name_last = "Last"
    # get user 1 u_id
    register_dic = auth.auth_register(email, password, name_first, name_last, URL)
    assert (register_dic) is not None
    u_id = register_dic['u_id']
    
    # user 2 registers, logs on
    email2 = "validemail2@gmail.com"
    password = "password"
    name_first = "First"
    name_last = "Last"
    assert (auth.auth_register(email2, password, name_first, name_last, URL)) is not None
    login_dic = auth.auth_login(email2, password)
    assert (login_dic) is not None
    token = login_dic['token']
    # user 2 creates channel
    channel_dic = channels.channels_create(token, "testchannel", True)
    channel_id = channel_dic['channel_id']
    assert (channel_id) is not None
    # user 2 invites user 1
    assert (channels.channel_invite(token, channel_id, u_id)) is not None
    server.clear_users()


"""
CHANNEL/DETAILS BACKEND TESTS
"""
# valid channel
def test_backend_channel_details_1():
    # user registers, logs on
    email = "validemail@gmail.com"
    password = "password"
    name_first = "First"
    name_last = "Last"
    assert (auth.auth_register(email, password, name_first, name_last, URL)) is not None
    login_dic = auth.auth_login(email, password)
    assert (login_dic) is not None
    token = login_dic['token']
    # user creates channel
    channel_dic = channels.channels_create(token, "testchannel", True)
    channel_id = channel_dic['channel_id']
    assert (channel_id) is not None
    assert (channels.channel_details(token, channel_id)) is not None
    server.clear_users()

"""
CHANNEL/MESSAGES BACKEND TESTS
"""
# valid channel and valid start
def test_backend_channel_messages_1():
    # user registers, logs on
    email = "validemail@gmail.com"
    password = "password"
    name_first = "First"
    name_last = "Last"
    assert (auth.auth_register(email, password, name_first, name_last, URL)) is not None
    login_dic = auth.auth_login(email, password)
    assert (login_dic) is not None
    token = login_dic['token']
    # user creates channel
    channel_dic = channels.channels_create(token, "testchannel", True)
    channel_id = channel_dic['channel_id']
    assert (channel_id) is not None
    # send message
    assert (message.message_send(token, channel_id, "testmessage")) is not None
    assert (channels.channel_messages(token, channel_id, 0)) is not None
    server.clear_users()

# valid channel and invalid start
def test_backend_channel_messages_2():
    # user registers, logs on
    email = "validemail@gmail.com"
    password = "password"
    name_first = "First"
    name_last = "Last"
    assert (auth.auth_register(email, password, name_first, name_last, URL)) is not None
    login_dic = auth.auth_login(email, password)
    assert (login_dic) is not None
    token = login_dic['token']
    # user creates channel
    channel_dic = channels.channels_create(token, "testchannel", True)
    channel_id = channel_dic['channel_id']
    assert (channel_id) is not None
    # send message
    assert (message.message_send(token, channel_id, "testmessage")) is not None
    with pytest.raises(Exception, match=r"*"):
        channels.channel_messages(token, channel_id, 50)
    server.clear_users()

# valid channel, more than 50 messages
def test_backend_channel_messages_3():
    # user registers, logs on
    email = "validemail@gmail.com"
    password = "password"
    name_first = "First"
    name_last = "Last"
    assert (auth.auth_register(email, password, name_first, name_last, URL)) is not None
    login_dic = auth.auth_login(email, password)
    assert (login_dic) is not None
    token = login_dic['token']
    # user creates channel
    channel_dic = channels.channels_create(token, "testchannel", True)
    channel_id = channel_dic['channel_id']
    assert (channel_id) is not None
    # send 101 messages
    for x in range(102):
        assert (message.message_send(token, channel_id, "testmessage")) is not None
    assert (channels.channel_messages(token, channel_id, 50)) is not None
    server.clear_users()

"""CHANNEL/LEAVE BACKEND TESTS"""

# valid leave
def test_backend_channel_leave_1():
    # user registers, logs on
    email = "validemail@gmail.com"
    password = "password"
    name_first = "First"
    name_last = "Last"
    assert (auth.auth_register(email, password, name_first, name_last, URL)) is not None
    login_dic = auth.auth_login(email, password)
    assert (login_dic) is not None
    token = login_dic['token']
    # user creates channel
    channel_dic = channels.channels_create(token, "testchannel", True)
    channel_id = channel_dic['channel_id']
    assert (channel_id) is not None
    # user leaves the channel
    assert (channels.channel_leave(token, channel_id)) is not None
    server.clear_users()

# leave when invited
def test_backend_channel_leave_2():
    # user 1 registers
    email = "validemail@gmail.com"
    password = "password"
    name_first = "First"
    name_last = "Last"
    # get user 1 u_id
    register_dic = auth.auth_register(email, password, name_first, name_last, URL)
    assert (register_dic) is not None
    u_id = register_dic['u_id']
    register_token = register_dic['token']
    
    # user 2 registers, logs on
    email2 = "validemail2@gmail.com"
    password = "password"
    name_first = "First"
    name_last = "Last"
    assert (auth.auth_register(email2, password, name_first, name_last, URL)) is not None
    login_dic = auth.auth_login(email2, password)
    assert (login_dic) is not None
    token = login_dic['token']
    # user 2 creates channel
    channel_dic = channels.channels_create(token, "testchannel", True)
    channel_id = channel_dic['channel_id']
    assert (channel_id) is not None
    # user 2 invites user 1
    assert (channels.channel_invite(token, channel_id, u_id)) is not None
    # user 1 leaves
    assert (channels.channel_leave(register_token, channel_id)) is not None
    server.clear_users()

""" CHANNEL/JOIN BACKEND TESTS """
# joining public channel
def test_backend_channel_join_1():
    # user 1 registers
    email = "validemail@gmail.com"
    password = "password"
    name_first = "First"
    name_last = "Last"
    # get user 1 u_id
    register_dic = auth.auth_register(email, password, name_first, name_last, URL)
    assert (register_dic) is not None
    u_id = register_dic['u_id']
    register_token = register_dic['token']
    
    # user 2 registers, logs on
    email2 = "validemail2@gmail.com"
    password = "password"
    name_first = "First"
    name_last = "Last"
    assert (auth.auth_register(email2, password, name_first, name_last, URL)) is not None
    login_dic = auth.auth_login(email2, password)
    assert (login_dic) is not None
    token = login_dic['token']
    # user 2 creates channel
    channel_dic = channels.channels_create(token, "testchannel", "True")
    channel_id = channel_dic['channel_id']
    assert (channel_id) is not None
    # user 1 joins channel
    assert (channels.channel_join(register_token, channel_id)) is not None
    server.clear_users()

# joining private channel
def test_backend_channel_join_2():
    # user 1 registers
    email = "validemail@gmail.com"
    password = "password"
    name_first = "First"
    name_last = "Last"
    # get user 1 u_id
    register_dic = auth.auth_register(email, password, name_first, name_last, URL)
    assert (register_dic) is not None
    u_id = register_dic['u_id']
    register_token = register_dic['token']
    
    # user 2 registers, logs on
    email2 = "validemail2@gmail.com"
    password = "password"
    name_first = "First"
    name_last = "Last"
    assert (auth.auth_register(email2, password, name_first, name_last, URL)) is not None
    login_dic = auth.auth_login(email2, password)
    assert (login_dic) is not None
    token = login_dic['token']
    # user 2 creates channel
    channel_dic = channels.channels_create(token, "testchannel", "False")
    channel_id = channel_dic['channel_id']
    assert (channel_id) is not None
    # user 1 tries joining channel
    with pytest.raises(Exception, match=r"*"):
        channels.channel_join(register_token, channel_id)
    server.clear_users()

""" CHANNEL/ADDOWNER BACKEND TESTS """
# valid user
def test_backend_channel_addowner_1():
    # user 1 registers
    email = "validemail@gmail.com"
    password = "password"
    name_first = "First"
    name_last = "Last"
    # get user 1 u_id
    register_dic = auth.auth_register(email, password, name_first, name_last, URL)
    assert (register_dic) is not None
    u_id = register_dic['u_id']
    
    # user 2 registers, logs on
    email2 = "validemail2@gmail.com"
    password = "password"
    name_first = "First"
    name_last = "Last"
    assert (auth.auth_register(email2, password, name_first, name_last, URL)) is not None
    login_dic = auth.auth_login(email2, password)
    assert (login_dic) is not None
    token = login_dic['token']
    # user 2 creates channel
    channel_dic = channels.channels_create(token, "testchannel", True)
    channel_id = channel_dic['channel_id']
    assert (channel_id) is not None
    # user 2 invites user 1
    assert (channels.channel_invite(token, channel_id, u_id)) is not None
    # user 2 makes user 1 an owner
    assert (channels.channel_addowner(token, channel_id, u_id)) is not None
    server.clear_users()

# user not onwer in channel
def test_backend_channel_addowner_2():
    # user 1 registers
    email = "validemail@gmail.com"
    password = "password"
    name_first = "First"
    name_last = "Last"
    # get user 1 u_id
    register_dic = auth.auth_register(email, password, name_first, name_last, URL)
    assert (register_dic) is not None
    u_id = register_dic['u_id']
    register_token = register_dic['token']
    # user 2 registers, logs on
    email2 = "validemail2@gmail.com"
    password = "password"
    name_first = "First"
    name_last = "Last"
    assert (auth.auth_register(email2, password, name_first, name_last, URL)) is not None
    login_dic = auth.auth_login(email2, password)
    assert (login_dic) is not None
    token = login_dic['token']
    # user 2 creates channel
    channel_dic = channels.channels_create(token, "testchannel", True)
    channel_id = channel_dic['channel_id']
    assert (channel_id) is not None
    # user 2 invites user 1
    assert (channels.channel_invite(token, channel_id, u_id)) is not None
    # user 1 makes user 1 an owner
    with pytest.raises(Exception, match=r"*"):
        channels.channel_addowner(register_token, channel_id, u_id)
    server.clear_users()

# user already an owner
def test_backend_channel_addowner_3():
    # user 1 registers
    email = "validemail@gmail.com"
    password = "password"
    name_first = "First"
    name_last = "Last"
    # get user 1 u_id
    register_dic = auth.auth_register(email, password, name_first, name_last, URL)
    assert (register_dic) is not None
    u_id = register_dic['u_id']
    register_token = register_dic['token']
    # user 2 registers, logs on
    email2 = "validemail2@gmail.com"
    password = "password"
    name_first = "First"
    name_last = "Last"
    assert (auth.auth_register(email2, password, name_first, name_last, URL)) is not None
    login_dic = auth.auth_login(email2, password)
    assert (login_dic) is not None
    token = login_dic['token']
    # user 2 creates channel
    channel_dic = channels.channels_create(token, "testchannel", True)
    channel_id = channel_dic['channel_id']
    assert (channel_id) is not None
    # user 2 invites user 1
    assert (channels.channel_invite(token, channel_id, u_id)) is not None
    # user 2 makes user 1 an owner
    assert (channels.channel_addowner(token, channel_id, u_id)) is not None
    # user 2 tries to make user 1 an owner again
    with pytest.raises(Exception, match=r"*"):
        channels.channel_addowner(token, channel_id, u_id)
    server.clear_users()

""" CHANNELS/REMOVEOWNER BACKEND TESTS """

# valid owner
def test_backend_channel_removeowner_1():
    # user 1 registers
    email = "validemail@gmail.com"
    password = "password"
    name_first = "First"
    name_last = "Last"
    # get user 1 u_id
    register_dic = auth.auth_register(email, password, name_first, name_last, URL)
    assert (register_dic) is not None
    u_id = register_dic['u_id']
    register_token = register_dic['token']
    # user 2 registers, logs on
    email2 = "validemail2@gmail.com"
    password = "password"
    name_first = "First"
    name_last = "Last"
    assert (auth.auth_register(email2, password, name_first, name_last, URL)) is not None
    login_dic = auth.auth_login(email2, password)
    assert (login_dic) is not None
    token = login_dic['token']
    # user 2 creates channel
    channel_dic = channels.channels_create(token, "testchannel", True)
    channel_id = channel_dic['channel_id']
    assert (channel_id) is not None
    # user 2 invites user 1
    assert (channels.channel_invite(token, channel_id, u_id)) is not None
    # user 2 makes user 1 an owner
    assert (channels.channel_addowner(token, channel_id, u_id)) is not None
    # user 2 removes user 1 as an owner
    assert (channels.channel_removeowner(token, u_id, channel_id)) is not None
    server.clear_users()

# authorised user not an owner
def test_backend_channel_removeowner_2():
    # user 1 registers
    email = "validemail@gmail.com"
    password = "password"
    name_first = "First"
    name_last = "Last"
    # get user 1 u_id
    register_dic = auth.auth_register(email, password, name_first, name_last, URL)
    assert (register_dic) is not None
    u_id = register_dic['u_id']
    register_token = register_dic['token']
    # user 2 registers, logs on
    email2 = "validemail2@gmail.com"
    password = "password"
    name_first = "First"
    name_last = "Last"
    assert (auth.auth_register(email2, password, name_first, name_last, URL)) is not None
    login_dic = auth.auth_login(email2, password)
    assert (login_dic) is not None
    token = login_dic['token']
    login_u_id = login_dic['u_id']
    # user 2 creates channel
    channel_dic = channels.channels_create(token, "testchannel", True)
    channel_id = channel_dic['channel_id']
    assert (channel_id) is not None
    # user 2 invites user 1
    assert (channels.channel_invite(token, channel_id, u_id)) is not None
    # user 1 tries to remove user 2 as an owner
    with pytest.raises(Exception, match=r"*"):
        channels.channel_removeowner(register_token, login_u_id, channel_id)
    server.clear_users()

# trying to remove when already not an owner
def test_backend_channel_removeowner_3():
    # user 1 registers
    email = "validemail@gmail.com"
    password = "password"
    name_first = "First"
    name_last = "Last"
    # get user 1 u_id
    register_dic = auth.auth_register(email, password, name_first, name_last, URL)
    assert (register_dic) is not None
    u_id = register_dic['u_id']
    register_token = register_dic['token']
    # user 2 registers, logs on
    email2 = "validemail2@gmail.com"
    password = "password"
    name_first = "First"
    name_last = "Last"
    assert (auth.auth_register(email2, password, name_first, name_last, URL)) is not None
    login_dic = auth.auth_login(email2, password)
    assert (login_dic) is not None
    token = login_dic['token']
    # user 2 creates channel
    channel_dic = channels.channels_create(token, "testchannel", True)
    channel_id = channel_dic['channel_id']
    assert (channel_id) is not None
    # user 2 invites user 1
    assert (channels.channel_invite(token, channel_id, u_id)) is not None
    # user 2 makes user 1 an owner
    assert (channels.channel_addowner(token, channel_id, u_id)) is not None
    # user 2 removes user 1 as an owner
    assert (channels.channel_removeowner(token, u_id, channel_id)) is not None
    # user 2 tries to remove user 1 as an owner again
    with pytest.raises(Exception, match=r"*"):
        channels.channel_removeowner(token, u_id, channel_id)
    server.clear_users()


""" CHANNEL/LIST BACKEND TEST """

# valid test
def test_backend_channel_list_1():
    # user registers, logs on
    email = "validemail@gmail.com"
    password = "password"
    name_first = "First"
    name_last = "Last"
    assert (auth.auth_register(email, password, name_first, name_last, URL)) is not None
    login_dic = auth.auth_login(email, password)
    assert (login_dic) is not None
    token = login_dic['token']
    # user creates channel
    channel_dic = channels.channels_create(token, "testchannel", True)
    channel_id = channel_dic['channel_id']
    assert (channel_id) is not None
    # get channel list
    assert (channels.channel_list(token)) is not None
    server.clear_users()

""" CHANNEL/LISTALL BACKEND TEST """

# valid test
def test_backend_channel_listall_1():
    # user registers, logs on
    email = "validemail@gmail.com"
    password = "password"
    name_first = "First"
    name_last = "Last"
    assert (auth.auth_register(email, password, name_first, name_last, URL)) is not None
    login_dic = auth.auth_login(email, password)
    assert (login_dic) is not None
    token = login_dic['token']
    # user creates channel
    channel_dic = channels.channels_create(token, "testchannel", True)
    channel_id = channel_dic['channel_id']
    assert (channel_id) is not None
    # get channel list
    assert (channels.channel_listall(token)) is not None
    server.clear_users()

""" CHANNELS/CREATE BACKEND TEST """

# testing for channel name longer than 20 characters
def test_backend_channels_create_1():
    # user registers, logs on
    email = "validemail@gmail.com"
    password = "password"
    name_first = "First"
    name_last = "Last"
    assert (auth.auth_register(email, password, name_first, name_last, URL)) is not None
    login_dic = auth.auth_login(email, password)
    assert (login_dic) is not None
    token = login_dic['token']
    # user tries creating channel
    with pytest.raises(Exception, match=r"*"):
        channels.channels_create(token, "testchannellongerthantwentycharacters", True)
    server.clear_users()
