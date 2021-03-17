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
from datetime import datetime, timedelta

URL = "127.0.0.1:5009"

""" MESSAGE/SENDLATER BACKEND TESTS """

# valid message and time
def test_backend_message_sendlater_1():
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
    # try to send a message later
    time = datetime.now() + timedelta(seconds = 1)
    time = time.timestamp()
    assert (message.message_sendlater(token, channel_id, "testmessagesendlater", time)) is not None
    server.clear_users()

# message more than 1000 characters
def test_backend_message_sendlater_2():
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
    # try to send a message later
    time = datetime.now() + timedelta(seconds = 1)
    time = time.timestamp()
    with pytest.raises(Exception, match=r"*"):
        message.message_sendlater(token, channel_id, "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Na", time)
    server.clear_users()

# wrong timestamp (in the past)
def test_backend_message_sendlater_3():
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
    # try to send a message later
    time = datetime.now() - timedelta(seconds = 1)
    time = time.timestamp()
    with pytest.raises(Exception, match=r"*"):
        message.message_sendlater(token, channel_id, "testmessagesendlater", time)
    server.clear_users()

# user has not joined channel
def test_backend_message_sendlater_4():
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
    # user 1 tries sending a message later
    time = datetime.now() + timedelta(seconds = 1)
    time = time.timestamp()
    with pytest.raises(Exception, match=r"*"):
        message.message_sendlater(register_token, channel_id, "testmessagesendlater", time)
    server.clear_users()

""" MESSAGE/SEND BACKEND TESTS """

# message more than 1000 characters
def test_backend_message_send_1():
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
    # try to send a message more than 1000 characters
    with pytest.raises(Exception, match=r"*"):
        message.message_send(token, channel_id, "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Na")
    server.clear_users()

""" MESSAGE/REMOVE BACKEND TESTS """

# valid message
def test_backend_message_remove_1():
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
    # user sends a message
    message_dic = message.message_send(token, channel_id, "testmessage")
    assert (message_dic) is not None
    message_id = message_dic['message_id']
    # user removes the message
    assert (message.message_remove(token, message_id)) is not None
    server.clear_users()

# user did not send the message
def test_backend_message_remove_2():
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
    # user 2 sends a message
    message_dic = message.message_send(token, channel_id, "testmessage")
    assert (message_dic) is not None
    message_id = message_dic['message_id']

    # user 1 tries to removes the message
    with pytest.raises(Exception, match=r"*"):
        message.message_remove(register_token, message_id)
    server.clear_users()

""" MESSAGE/EDIT BACKEND TESTS """

# valid edit
def test_backend_message_edit_1():
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
    # user sends a message
    message_dic = message.message_send(token, channel_id, "testmessage")
    assert (message_dic) is not None
    message_id = message_dic['message_id']
    # user edits the message
    assert (message.message_edit(token, message_id, "edited")) is not None
    server.clear_users()

# message edited to be empty
def test_backend_message_edit_2():
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
    # user sends a message
    message_dic = message.message_send(token, channel_id, "testmessage")
    assert (message_dic) is not None
    message_id = message_dic['message_id']
    # user edits the message
    assert (message.message_edit(token, message_id, "")) is None
    server.clear_users()


""" MESSAGE/REACT BACKEND TESTS """
# valid react
def test_backend_message_react_1():
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
    # user sends a message
    message_dic = message.message_send(token, channel_id, "testmessage")
    assert (message_dic) is not None
    message_id = message_dic['message_id']
    # user reacts to message
    assert (message.message_react(token, message_id, 1)) is not None
    server.clear_users()

# trying to react when already reacted   
def test_backend_message_react_2():
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
    # user sends a message
    message_dic = message.message_send(token, channel_id, "testmessage")
    assert (message_dic) is not None
    message_id = message_dic['message_id']
    # user reacts to message
    assert (message.message_react(token, message_id, 1)) is not None
    # try to react again
    with pytest.raises(Exception, match=r"*"):
        message.message_react(token, message_id, 1)
    server.clear_users()

# invalid react ID
def test_backend_message_react_3():
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
    # user sends 2 messages
    message_dic = message.message_send(token, channel_id, "testmessage")
    assert (message_dic) is not None
    message_id = message_dic['message_id']
    assert (message.message_react(token, message_id, 1)) is not None
    # second message
    message_dic = message.message_send(token, channel_id, "testmessage")
    assert (message_dic) is not None
    message_id = message_dic['message_id']
    # user reacts to message with invalid react ID
    with pytest.raises(Exception, match=r"*"):
        message.message_react(token, message_id, 0)
    server.clear_users()

""" MESSAGE/UNREACT BACKEND TESTS """

# valid unreact
def test_backend_message_unreact_1():
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
    # user sends a message
    message_dic = message.message_send(token, channel_id, "testmessage")
    assert (message_dic) is not None
    message_id = message_dic['message_id']
    # user reacts to message
    assert (message.message_react(token, message_id, 1)) is not None
    # user unreacts to message
    assert (message.message_unreact(token, message_id, 1)) is not None
    server.clear_users()

# message not reacted yet
def test_backend_message_unreact_2():
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
    # user sends a message
    message_dic = message.message_send(token, channel_id, "testmessage")
    assert (message_dic) is not None
    message_id = message_dic['message_id']
    # user unreacts to message not reacted yet
    with pytest.raises(Exception, match=r"*"):
        message.message_unreact(token, message_id, 0)
    server.clear_users()

# invalid react ID
def test_backend_message_unreact_3():
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
    # user sends a message
    message_dic = message.message_send(token, channel_id, "testmessage")
    assert (message_dic) is not None
    message_id = message_dic['message_id']
    # user reacts to message
    assert (message.message_react(token, message_id, 1)) is not None
    # user unreacts to invalid message_id
    with pytest.raises(Exception, match=r"*"):
        message.message_unreact(token, message_id, 0)
    server.clear_users()

""" MESSAGE/PIN BACKEND TESTS """

# valid pin
def test_backend_message_pin_1():
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
    # user sends a message
    message_dic = message.message_send(token, channel_id, "testmessage")
    assert (message_dic) is not None
    message_id = message_dic['message_id']
    # user pins message
    assert (message.message_pin(token, message_id)) is not None
    server.clear_users()

# already pinned
def test_backend_message_pin_2():
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
    # user sends a message
    message_dic = message.message_send(token, channel_id, "testmessage")
    assert (message_dic) is not None
    message_id = message_dic['message_id']
    # user pins message
    assert (message.message_pin(token, message_id)) is not None
    # user tries to pin message again
    with pytest.raises(Exception, match=r"*"):
        message.message_pin(token, message_id)
    server.clear_users()

# user not owner
def test_backend_message_pin_3():
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
    # user 2 sends a message
    message_dic = message.message_send(token, channel_id, "testmessage")
    assert (message_dic) is not None
    message_id = message_dic['message_id']
    # user 1 tries pinning message
    with pytest.raises(Exception, match=r"*"):
        message.message_pin(register_token, message_id)
    server.clear_users()

""" MESSAGE/UNPIN BACKEND TESTS """
# valid unpin
def test_backend_message_unpin_1():
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
    # user sends a message
    message_dic = message.message_send(token, channel_id, "testmessage")
    assert (message_dic) is not None
    message_id = message_dic['message_id']
    # user pins message
    assert (message.message_pin(token, message_id)) is not None
    # user unpins message
    assert (message.message_unpin(token, message_id)) is not None
    server.clear_users()

# already unpinned
def test_backend_message_unpin_2():
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
    # user sends a message
    message_dic = message.message_send(token, channel_id, "testmessage")
    assert (message_dic) is not None
    message_id = message_dic['message_id']
    # user tries to unpin message
    with pytest.raises(Exception, match=r"*"):
        message.message_unpin(token, message_id)
    server.clear_users()

# not owner
def test_backend_message_unpin_3():
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
    # user 2 sends a message
    message_dic = message.message_send(token, channel_id, "testmessage")
    assert (message_dic) is not None
    message_id = message_dic['message_id']
    # user 2 pins message
    assert (message.message_pin(token, message_id)) is not None
    # user 1 tries unpinning message
    with pytest.raises(Exception, match=r"*"):
        message.message_unpin(register_token, message_id)
    server.clear_users()
