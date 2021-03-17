#!/usr/bin/env python3
# -*- coding: utf-8 -*-

# pylint: disable= C0103, C0303, W0601, W0602, W0603, W0404, W0611, W0612, W0613, W0703, W0621, W0631, E0602, R0912
#SAME PYLINT EXCEPTIONS AND RESONINGSAS SERVER.PY

# pylint: disable= C0114, C0115, C0116, W0622

"""
PYLINt IGNORE STATEMENTS AND REASONINGS FOR CALL_ERROR
    C0114 = Missing class
        #Due to class error within ValueError. Needed error
    C0115 = Same as C0114
        #Same as C0114
    C0116 = Same as C0114
        #Same as C0114
    W0622 = Redef of class
        #Due to class error within ValueError and its redef. Needed error.
"""

from json import dumps
from flask_mail import Mail, Message
from flask_cors import CORS
from flask import Flask, request, jsonify
from werkzeug.exceptions import HTTPException

def defaultHandler(err):
    response = err.get_response()
    response.data = dumps({
        "code": err.code,
        "name": "System Error",
        "message": err.get_description(),
    })
    response.content_type = 'application/json'
    return response

APP = Flask(__name__)
APP.config['TRAP_HTTP_EXCEPTIONS'] = True
APP.register_error_handler(Exception, defaultHandler)
CORS(APP)

class ValueError(HTTPException):
    code = 400
    message = 'No message specified'
    
class AccessError(HTTPException):
    code = 401
    message = 'No message specified'

"""
Created on Sun Oct 20 20:56:08 2019

@author: z5258962 John Dao, z5211275 Patrick Dong



This program was made to call errors from server. 
It relies on the use of server to call said error.
It is not designed to work independently.

_______________________________________________________________________________

                            Authentication Errors

    Raised ValueErrors: 11
    Raised AccessErrors: 0
    
        Total Errors: 11   
_______________________________________________________________________________

"""

#VALUE ERRORS

@APP.route("/invalidemail")
def invalid_email():
    #Raises ValueError for invalid email
    raise ValueError(description="Provided email not valid")

@APP.route("/unregisteredemail")
def unregistered_email():
    #Raises ValueError for non-exist or unregistered email
    raise ValueError(description="Provided email does not exist")
    
@APP.route("/incorrectword")
def incorrect_password():
    #Raises ValueError for incorrect input of word
    raise ValueError(description="Incorrect word")

@APP.route("/usedemail")
def used_email():
    #Raises ValueError for an already registered email
    raise ValueError(description="Email already in use")
    
@APP.route("/shortword")
def short_password():
    #Raises ValueError for short word
    raise ValueError(description="word entered is too short")
    
@APP.route("/shortfirstname")
def short_first_name():
    #Raises ValueError for short first name
    raise ValueError(description="First name entered is too short")
    
@APP.route("/longfirstname")
def long_first_name():
    #Raises ValueError for long first name
    raise ValueError(description="First name entered is too long")
    
@APP.route("/shortlastname")
def short_last_name():
    #Raises ValueError for short last name
    raise ValueError(description="Last name entered is too short")
    
@APP.route("/longlastname")
def long_last_name():
    #Raises ValueError for long last name
    raise ValueError(description="Last name entered is too long")

@APP.route("/invalidreset")
def invalid_reset():
    #Raises valueError for invalid reset code
    raise ValueError(description="Incorrect reset code")

@APP.route("/simpleword")
def simple_word():
    #Raises ValueError for word that is too simple
    raise ValueError(description="word too simple")
    
#ACCESS ERRORS 
    #NULL
"""
_______________________________________________________________________________
import check.check ,auth.auth, channel.channels, message.message, user.user_profile, standup.standup
                                Channel Errors
                                
    Raised ValueErrors: 6 
    Raised AccessErrors: 3
    
        Total Errors: 9    
_______________________________________________________________________________

"""

#VALUE ERRORS
@APP.route("/invaliduser")
def invalid_user():
    #Raises ValueError for invalid user id
    raise ValueError(description="Invalid user id")
    
@APP.route("/invalidchannel")
def invalid_channel():
    #Raises ValueError for invalid channel id
    raise ValueError(description="Invalid channel ID")
    
@APP.route("/existingowner")
def existing_owner():
    #Raise ValueError for user is already owner
    raise ValueError(description="The user is alredy owner of this channel")
     
@APP.route("/invalid_owner")
def invalid_owner():
    #Raise error for attempting to remove an owner who isnt an owner
    raise ValueError(description="The user is not an owner of this channel")
     
@APP.route("/startindexexceed")
def start_index_exceed():
    #Starting index is longer than actual, raise error
    raise ValueError(description="Start index exceed")
    
@APP.route("/longname")
def long_name():
    #Name is too long
    raise ValueError(description="Input name is too long")
    
#ACCESS ERRORS
@APP.route("/unauthoriseduser")
def unauthorised_user():
    # Raises AccessError for user attempting to access a channel without perm
    # also raising AccessError if it is not an owner of the channel and
        # a) trying to add an owner to the channel
        # b) trying to remove an owner of the channel
    raise AccessError(description="User not authorised in this channel")
    
@APP.route("/unauthorisedinvite")
def unauthorised_invite():
    #Raises AccessError for user not already in channel for invite
    raise AccessError(description="User is not authorised to invite users to channel")
    
@APP.route("/privatechannel")
def private_channel():
    #Unjoinable private channel. User not authorised to enter
    raise AccessError(description="The channel you tried to join is private")

"""
_______________________________________________________________________________

                                Message Errors
                                
    Raised ValueErrors: 14
    Raised AccessErrors: 0
    
        Total Errors: 14    
_______________________________________________________________________________

"""
#ValueErrors

@APP.route("/messagetoolong")
def long_message():
    raise ValueError(description="Message is too long")

@APP.route("/timesentinpast")
def wrong_time_sent():
    raise ValueError(description="Time sent is in the past")
    
@APP.route("/usernotmemberofthechannel")
def not_member_of_channel():
    raise AccessError(description="User is not member of the channel")
    
@APP.route("/messageidnotexist")
def message_id_not_exist():
    raise ValueError(description="Message id not exist")
    
@APP.route("/notauthorisedmessageremove")
def message_remove():
    raise AccessError(description="User doesn't have the right to remove this message")

@APP.route("/notauthorisedmessageedit")
def message_edit():
    raise AccessError(description="User doesn't have the right to edit this message")
    
@APP.route("/messageidnotvalid")
def invalid_message_id():
    raise ValueError(description="Message id invalid")
    
@APP.route("/invalidreactid")
def invalid_react_id():
    raise ValueError(description="React id invalid")
    
@APP.route("/reactidalreadyactive")
def react_id_already_active():
    raise ValueError(description="React id already active")

@APP.route("/reactidnotactive")
def react_id_not_active():
    raise ValueError(description="React id not active")

@APP.route("/usernotadmin")
def message_pin_not_admin():
    raise ValueError(description="User is not admin")

@APP.route("/messagealreadypinned")
def message_already_pinned():
    raise ValueError(description="Message already pinned")

@APP.route("/messagealreadyunpinned")
def message_already_unpinned():
    raise ValueError(description="Message already unpinned")

@APP.route("/messagetoolong")
def message_too_long():
    raise ValueError(description='Message too long')
    
#ACCESS ERRORS
    #NULL    

"""
_______________________________________________________________________________

                                User Profile Errors
                                
    Raised ValueErrors: 9
    Raised AccessErrors: 1
    
        Total Errors: 10    
_______________________________________________________________________________

"""
#ValueErrors
@APP.route("/useridisinvalid")
def user_profile_invalid_u_id():
    raise ValueError(description="User id is invalid")
    
@APP.route("/firstnameinvalid")
def user_profile_invalid_first_name():
    raise ValueError(description="First name is invalid")
    
@APP.route("/lastnameinvalid")
def user_profile_invalid_last_name():
    raise ValueError(description="Last name is invalid")

@APP.route("/handlestrinvalid")
def user_profile_invalid_handle_str():
    raise ValueError(description="Handle string is in valid")

@APP.route('/usedhandlestr')
def user_profile_used_handle_str():
    raise ValueError(description='Used handle')

@APP.route("/standupalreadyrunning")
def stand_up_already_run():
    raise ValueError(description='Stand up already running')    
    
@APP.route("/authorisedusernotmemberofthechannel")
def stand_up_authorise_error():
    raise ValueError(description='Authorised user is not member of the channel')
    
@APP.route("/standupnotrunning")
def stand_up_not_run():
    raise ValueError(description='Stand up not running')
    
@APP.route("/invalidpermissionid")
def invalid_permission_id():
    raise ValueError(description='Invalid permission id')
    
@APP.route("/invalidhttpstatus")
def invalid_http_status():
    raise ValueError(description="Invalid http status")

@APP.route("/imageoutofdimension")
def user_profile_image_out_of_dimension():
    raise ValueError(description="Image out of dimension")

@APP.route("/wrongimagetype")
def user_profile_wrong_imagetype():
    raise ValueError(description="Wrong image type")

#ACCESS ERRORS
@APP.route("/authorisedusernotadminowner")
def user_permission_not_admin_owner():
    raise AccessError(description="Authorised user is not an admin or owner")
