"""Flask server"""
# pylint: disable= C0103, C0303, C0301, W0601, W0602, W0603, W0404, W0611, W0612, W0613, W0703, W0621, W0631, E0602, R0912
# This pylint disable is utilised throughout the backend

#!/usr/bin/env python3
# -*- coding: utf-8 -*-

#Handled imports
import os
import pickle
import datetime
import time
import sys
from json import dumps
from flask import Flask, request, jsonify, send_from_directory
from werkzeug.exceptions import HTTPException
import jwt
from flask_cors import CORS
from flask_mail import Mail, Message
import check
import auth
import channels
import message
import user_profile
import standup

"""
PYLINT IGNORE STATEMENTS AND REASONINGS FOR SERVER.PY:
    C0103 = Constant naming expressions
        #Nature of server not contained in main.
    C0303 = Whitespace errors
        #Due to comments in server. Pylint refuses to allow valid spacing.
    W0601 = Global variables
        #Due to nature of server, global variables must be used. Issue is known
    W0602 = Global variables
        #All for global channel. Issue is known but useless error.
    W0603 = Global variables
        #Same as W0601
    W0404 = Reimport error
        #Reimport needed for Flask app
    W0611 = Unused module
        #Modules may be used in later iterations as jsonify is a must
    W0612 = Unused variable
        #Issue is known. Member is placeholder for now
    W0613 = Unused variable
        #Issue is known but variable will be used later. Possible removal.
    W0703 = Broad Exception
        #Issue is known but code is needed for operational backend
    W0621 = Redefined from outer scope
        #Issue is due to nature of how we are storing variables.
    W0631 = Loop operator may be undefined
        #Checked all and they are defined. Useless error.
    W0602 = Undefined variable
        #Checked and is defined. 
    R0912 = Too many branches
        #Checked and logic behind function. 
        #Currently there are no other known methods

Created on Tue Oct 29 17:29:38 2019

@author: z5258962,z5211275
"""


APP = Flask(__name__, static_url_path='/static/')
CORS(APP)
    
"""
_______________________________________________________________________________

    BEGINNING OF GLOBAL FUNCTIONS

    TOTAL FUNCTIONS: 5
_______________________________________________________________________________

"""
backendurl = ""
users = []
all_channels = []
def get_users():
    global users
    return users

def get_channels():
    global all_channels
    return all_channels

def clear_users():
    global users
    users = []
    return users

def clear_channels():
    global channels
    channels = []
    return channels

"""
_______________________________________________________________________________

BEGINNING OF AUTH FUNCTIONS

TOTAL FUNCTIONS: 5
_______________________________________________________________________________

"""
@APP.route('/getlocalhost')
def get_localhost():
    global backendurl
    backendurl = request.host
    return backendurl

@APP.route('/auth/login', methods=['POST'])
def auth_login():
    # Get given email and password and try to login with them
    result = auth.auth_login(request.form.get('email'), request.form.get('password'))
    # If successful, dumps u_id and token, else raise appropriate error
    return dumps(result)
            
@APP.route('/auth/register', methods=['POST'])
def auth_register():
    # Give auth.py email, password, name_first and name_last
    result = auth.auth_register(request.form.get('email'), request.form.get('password'), request.form.get('name_first'), request.form.get('name_last'), request.host)
    # On success, dumps u_id and token, else raise appropriate error
    return dumps(result)
    
@APP.route('/auth/logout', methods=['POST'])
def auth_logout():
    # Get token
    token = request.form.get('token')
    # Dumps result of logging out with token (is_success: 'True'/'False')
    return dumps(auth.auth_logout(token))
    
@APP.route('/auth/passwordreset/request', methods=['POST'])
def auth_passwordreset_request():
    resetpassgmail = request.form.get('email')
    return dumps(auth.auth_passwordreset_request(resetpassgmail))
    
@APP.route('/auth/passwordreset/reset', methods=['POST'])
def auth_passwordreset_reset():
    # Get users reset_code and new_password
    reset_code = request.form.get('reset_code')
    new_password = request.form.get('new_password')    
    # Reset with users reset_code + new_password, if reset_code is valid + new
    # password is correct length, set new password, else, raises appr. errors
    return dumps(auth.auth_passwordreset_reset(reset_code, new_password))

"""
_______________________________________________________________________________

    BEGINNING OF CHANNEL FUNCTIONS

    TOTAL FUNCTIONS: 10
______________________________________________________________________________

"""
@APP.route('/channel/invite', methods=['POST'])
def channel_invite():
    token = request.form.get('token')
    channel_id = int(request.form.get('channel_id'))
    u_id = int(request.form.get('u_id'))
    return dumps(channels.channel_invite(token, channel_id, u_id))
    
@APP.route('/channel/details', methods=['GET'])
def channel_details():
    token = request.args.get('token')
    channel_id = int(request.args.get('channel_id'))
    return dumps(channels.channel_details(token, channel_id))
    
@APP.route('/channel/messages', methods=['GET'])
def channel_messages():
    token = request.args.get('token')
    channel_id = int(request.args.get('channel_id'))
    start = int(request.args.get('start'))
    return dumps(channels.channel_messages(token, channel_id, start))

@APP.route('/channel/leave', methods=['POST'])
def channel_leave():
    token = request.form.get('token')
    channel_id = int(request.form.get('channel_id'))
    return dumps(channels.channel_leave(token, channel_id))
    
@APP.route('/channel/join', methods=['POST'])
def channel_join():
    token = request.form.get('token')
    channel_id = int(request.form.get('channel_id'))          
    return dumps(channels.channel_join(token, channel_id))

@APP.route('/channel/addowner', methods=['POST'])
def channel_addowner():
    # have to request for the user(u_id) that you want to add as owner
    token = request.form.get('token') 
    channel_id = int(request.form.get('channel_id'))
    u_id = int(request.form.get('u_id'))
    return dumps(channels.channel_addowner(token, channel_id, u_id))

@APP.route('/channel/removeowner', methods=['POST'])
def channel_removeowner():
    token = request.form.get('token')
    u_id = int(request.form.get('u_id'))
    channel_id = int(request.form.get('channel_id'))  
    return dumps(channels.channel_removeowner(token, u_id, channel_id))

@APP.route('/channels/list', methods=['GET'])
def channel_list():
    #Returns channel list for user
    token = request.args.get('token')
    return dumps(channels.channel_list(token))
    
@APP.route('/channels/listall', methods=['GET'])
def channel_listall():
    #Returns all channels that exist
    token = request.args.get('token')
    return dumps(channels.channel_listall(token))

@APP.route('/channels/create', methods=['POST'])
def channels_create():
    token = request.form.get('token')
    name = request.form.get('name')
    is_public = request.form.get('is_public')
    return dumps(channels.channels_create(token, name, is_public))
        
"""
_______________________________________________________________________________

BEGINNING OF MESSAGE FUNCTIONS

TOTAL FUNCTIONS: 8
______________________________________________________________________________

"""

@APP.route('/message/sendlater', methods=['POST'])
def message_sendlater():
    token = request.form.get('token')
    channel_id = request.form.get('channel_id')
    message_to_be_sent_later = request.form.get('message')
    time_sent = request.form.get('time_sent')
    return dumps(message.message_sendlater(token, channel_id, message_to_be_sent_later, time_sent))    

@APP.route('/message/send', methods=['POST'])
def message_send():
    token = request.form.get('token')
    channel_id = request.form.get('channel_id')
    message_to_be_sent = request.form.get('message')
    return dumps(message.message_send(token, channel_id, message_to_be_sent))        

@APP.route('/message/remove', methods=['DELETE'])
def message_remove():
    token = request.form.get('token')
    message_id = request.form.get('message_id')
    return dumps(message.message_remove(token, message_id))
    
@APP.route("/message/edit", methods=['PUT'])
def message_edit():
    token = request.form.get('token')
    message_id = request.form.get('message_id')
    message_to_be_edited = request.form.get('message')
    return dumps(message.message_edit(token, message_id, message_to_be_edited))

@APP.route("/message/react", methods=['POST'])
def message_react():
    token = request.form.get('token')
    message_id = request.form.get('message_id')
    react_id = request.form.get('react_id')
    return dumps(message.message_react(token, message_id, react_id))
    
@APP.route("/message/unreact", methods=['POST'])
def message_unreact():
    token = request.form.get('token')
    message_id = request.form.get('message_id')
    react_id = request.form.get('react_id')
    return dumps(message.message_unreact(token, message_id, react_id))
                        
@APP.route("/message/pin", methods=['POST'])
def message_pin():
    token = request.form.get('token')
    message_id = request.form.get('message_id')
    return dumps(message.message_pin(token, message_id))
    
@APP.route("/message/unpin", methods=['POST'])
def message_unpin():
    token = request.form.get('token')
    message_id = request.form.get('message_id')
    return dumps(message.message_unpin(token, message_id))

"""
_______________________________________________________________________________

BEGINNING OF USER AND STANDUP FUNCTIONS

TOTAL FUNCTIONS: 13
______________________________________________________________________________

"""

@APP.route("/user/profile", methods=['GET'])
def user_profiles():
    token = request.args.get('token')
    u_id = int(request.args.get('u_id'))
    ret = user_profile.user_profiles(token, u_id)
    return dumps(ret)

@APP.route("/user/profile/setname", methods=['PUT'])
def user_profile_setname():
    token = request.form.get('token')
    name_first = request.form.get('name_first')
    name_last = request.form.get('name_last')
    return dumps(user_profile.user_profile_setname(token, name_first, name_last))

@APP.route("/user/profile/setemail", methods=['PUT'])
def user_profile_setemail():
    token = request.form.get('token')
    email = request.form.get('email')
    return dumps(user_profile.user_profile_setemail(token, email))
    
@APP.route("/user/profile/sethandle", methods=['PUT'])
def user_profile_sethandle():
    token = request.form.get('token')
    handle_str = request.form.get('handle_str')
    return dumps(user_profile.user_profile_sethandle(token, handle_str))

@APP.route("/user/profiles/uploadphoto", methods=['POST'])
def user_profile_uploadphoto():
    token = request.form.get('token')
    img_url = request.form.get('img_url')
    x_start = request.form.get('x_start')
    y_start = request.form.get('y_start')
    x_end = request.form.get('x_end')
    y_end = request.form.get('y_end')
    return dumps(user_profile.user_profile_uploadphoto(token, img_url, x_start, y_start, x_end, y_end, request.localhost))
    
@APP.route("/users/all", methods=['GET'])
def user_profile_user_all():
    token = request.args.get('token')
    return dumps(user_profile.user_profile_user_all(token))

@APP.route("/standup/start", methods=['POST'])
def standup_start():
    token = request.form.get('token')
    channel_id = request.form.get('channel_id')
    length = request.form.get('length')
    return dumps(standup.standup_start(token, channel_id, length))

@APP.route("/standup/active", methods=['GET'])
def standup_active():
    token = request.args.get('token')
    channel_id = request.args.get('channel_id')
    return dumps(standup.standup_active(token, channel_id))
    
@APP.route("/standup/send", methods=['POST'])
def standup_send():
    token = request.form.get('token')
    channel_id = request.form.get('channel_id')
    message = request.form.get('message')
    return dumps(standup.standup_send(token, channel_id, message))
    
@APP.route("/search", methods=['GET'])
def search():
    token = request.args.get('token')
    query_str = request.args.get('query_str')
    return dumps(standup.search(token, query_str))
    
@APP.route("/admin/userpermission/change", methods=['POST'])
def user_permission_change():
    token = request.form.get('token')
    u_id = request.form.get('u_id')
    permission_id = request.form.get('permission_id')
    return dumps(standup.user_permission_change(token, u_id, permission_id))

@APP.route('/static/<path:path>')
def send_js(path):
    return send_from_directory('', path)


if __name__ == '__main__':
    url_path = sys.argv[1]
    APP.run(port=(sys.argv[1] if len(sys.argv) > 1 else 5000), debug=True)
