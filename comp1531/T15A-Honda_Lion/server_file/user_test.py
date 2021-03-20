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
import auth
import channels

URL = "127.0.0.1:5002"
headers = {"Content-type": "application/x-www-form-urlencoded",
           "Accept": "text/plain"}

'''
Helper functions
'''
'''
def new_mail():
    rand = str(random.randint(10, 1000000))
    email_ret = "auth_register_"+ rand + "@gmail.com"
    return email_ret

def new_handle():
    rand = str(random.randint(10, 1000000))
    return 'hand' + rand
'''


'''
user/profile tests - 2 test
GET request
tests: putting in u_id that does not belong to user
       putting in u_id that belongs to user (pass)
'''
def test_user_profile_1():
    server.clear_users()
    server.clear_channels()
    # User 1 registers
    register_dic = auth.auth_register("validemail@gmail.com", "password", "First", "Last", URL)
    token = register_dic['token']
    u_id = register_dic['u_id']
    # Get profile of invalid user
    with pytest.raises(Exception, match=r"*"):
        user_profile.user_profiles(token, "-1")
    profile = user_profile.user_profiles(token, u_id)
    assert (profile) is not None
    
'''
# Putting in u_id that does not belong to user
def test_user_profiles_1():
    # User 1 registers, logs in
    email = helper.reg_helper()
    returned_dic = helper.login_helper(email, 'password')
    token = returned_dic['token']
    u_id = returned_dic['u_id']
    
    params = urllib.parse.urlencode({'token': token, 'u_id': -10})

    url = 'http://' + URL + '/user/profile' + '?' + params
    # User 1 tries to get profile of invalid u_id "-10"
    try:
        response = urllib.request.urlopen(url)
        
    except urllib.error.HTTPError as err:
        print(err.read())
        err = str(err)
        assert(err) == 'HTTP Error 400: BAD REQUEST'

# Putting in u_id that belongs to user (pass)
def test_user_profiles_2():
    # User 1 registers, logs in
    email = helper.reg_helper()
    returned_dic = helper.login_helper(email, 'password')
    token = returned_dic['token']
    u_id = returned_dic['u_id']
    
    params = urllib.parse.urlencode({'token': token, 'u_id': u_id})

    url = 'http://' + URL + '/user/profile' + '?' + params
    # User 1 gets profile of valid user
    response = urllib.request.urlopen(url)
    
    assert(response.status) == 200
    assert(response.reason) == "OK"
'''
'''
user/profile/setname tests - 4 tests
PUT request
tests: setting name_first too short <1
       setting name_first too long >50
       setting name_last too short <1
       setting name_last too long >50
       setting valid name (pass)
'''
def test_user_profile_setname_1():
    server.clear_users()
    server.clear_channels()
    # User 1 registers
    register_dic = auth.auth_register("validemail@gmail.com", "password", "First", "Last", URL)
    token = register_dic['token']
    u_id = register_dic['u_id']
    # Set users names
    with pytest.raises(Exception, match=r"*"):
        user_profile.user_profile_setname(token, "", "Lastname")
    with pytest.raises(Exception, match=r"*"):
        user_profile.user_profile_setname(token, "thisistoolongthisistoolongthisistoolongthisistoolongthisistoolongthisistoolong", "Lastname")
    with pytest.raises(Exception, match=r"*"):
        user_profile.user_profile_setname(token, "Firstname", "")
    with pytest.raises(Exception, match=r"*"):
        user_profile.user_profile_setname(token, "Firstname", "thisistoolongthisistoolongthisistoolongthisistoolongthisistoolongthisistoolong")
    assert(user_profile.user_profile_setname(token, "Goodfirst", "Goodlast")) is not None
    
'''
# Setting name_first too short <1
def test_user_profile_setname_1():
    # User 1 registers, logs in
    email = helper.reg_helper()
    returned_dic = helper.login_helper(email, 'password')
    token = returned_dic['token']
    u_id = returned_dic['u_id']
    # Set first name as empty
    params = urllib.parse.urlencode({'token': token, 'name_first': '',
                                     'name_last':'boi'
                                    })
    conn = http.client.HTTPConnection(URL)
    conn.request("PUT", "user/profile/setname", params, headers)
    response = conn.getresponse()
    
    assert(response.status) == 400
    assert(response.reason) == "BAD REQUEST"

# Setting name_first too long >50
def test_user_profile_setname_2():
    # User 1 registers, logs in
    email = helper.reg_helper()
    returned_dic = helper.login_helper(email, 'password')
    token = returned_dic['token']
    u_id = returned_dic['u_id']
    # User 1 sets first name as > 50 characters
    longfirst = '1234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345namenamenamename'
    params = urllib.parse.urlencode({'token': token, 
                                     'name_first': longfirst,
                                     'name_last':''
                                    })
    conn = http.client.HTTPConnection(URL)
    conn.request("PUT", "user/profile/setname", params, headers)
    response = conn.getresponse()
    
    assert(response.status) == 400
    assert(response.reason) == "BAD REQUEST"

# Setting name_last too short <1
def test_user_profile_setname_3():
    # User 1 registers, logs in
    email = helper.reg_helper()
    returned_dic = helper.login_helper(email, 'password')
    token = returned_dic['token']
    u_id = returned_dic['u_id']
    # User 1 sets last name as empty
    params = urllib.parse.urlencode({'token': token, 'name_first': 'hey',
                                     'name_last':''
                                    })
    conn = http.client.HTTPConnection(URL)
    conn.request("PUT", "user/profile/setname", params, headers)
    response = conn.getresponse()
    
    assert(response.status) == 400
    assert(response.reason) == "BAD REQUEST"
    
# Setting name_last too long >50
def test_user_profile_setname_4():
    # User 1 registers, logs in
    email = helper.reg_helper()
    returned_dic = helper.login_helper(email, 'password')
    token = returned_dic['token']
    u_id = returned_dic['u_id']
    # User 1 sets last name as > 50 characters
    longLast = '1234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345123451234512345'
    params = urllib.parse.urlencode({'token': token, 'name_first': 'hey',
                                     'name_last':longLast
                                    })
    conn = http.client.HTTPConnection(URL)
    conn.request("PUT", "user/profile/setname", params, headers)
    response = conn.getresponse()
    
    assert(response.status) == 400
    assert(response.reason) == "BAD REQUEST"
    
# Setting valid name (pass)
def test_user_profile_setname_5():
    # User 1 registers, logs in
    email = helper.reg_helper()
    returned_dic = helper.login_helper(email, 'password')
    token = returned_dic['token']
    u_id = returned_dic['u_id']
    # User 1 sets valid names
    params = urllib.parse.urlencode({'token': token, 'name_first': 'hey',
                                     'name_last':'boi'
                                    })
    conn = http.client.HTTPConnection(URL)
    conn.request("PUT", "user/profile/setname", params, headers)
    response = conn.getresponse()
    
    assert(response.status) == 200
    assert(response.reason) == "OK"
'''
'''
user/profile/setemail tests - 3 tests
PUT request
tests: setting invalid email
       setting used email
       setting unused valid email (pass)
'''
def test_user_profile_setemail_1():
    server.clear_users()
    server.clear_channels()
    # User 1 registers
    register_dic = auth.auth_register("validemail@gmail.com", "password", "First", "Last", URL)
    token = register_dic['token']
    u_id = register_dic['u_id']
    # Set users emails
    with pytest.raises(Exception, match=r"*"):
        user_profile.user_profile_setemail(token, "invalidemail")
    with pytest.raises(Exception, match=r"*"):
        user_profile.user_profile_setemail(token, "validemail@gmail.com")
    assert(user_profile.user_profile_setemail(token, "validemail2@gmail.com")) is not None

'''
# Setting invalid email
def test_user_profile_setemail_1():
    # User 1 registers, logs in
    email = helper.reg_helper()
    returned_dic = helper.login_helper(email, 'password')
    token = returned_dic['token']
    u_id = returned_dic['u_id']
    # User 1 sets invalid email
    params = urllib.parse.urlencode({'token': token, 'email': 'a'})
    conn = http.client.HTTPConnection(URL)
    conn.request("PUT", "user/profile/setemail", params, headers)
    response = conn.getresponse()
    
    assert(response.status) == 400
    assert(response.reason) == "BAD REQUEST"

# Setting used email
def test_user_profile_setemail_2():
    # User 1 registers, logs in
    email = helper.reg_helper()
    returned_dic = helper.login_helper(email, 'password')
    token = returned_dic['token']
    u_id = returned_dic['u_id']
    # User 1 sets used email
    params = urllib.parse.urlencode({'token': token, 'email': email})
    conn = http.client.HTTPConnection(URL)
    conn.request("PUT", "user/profile/setemail", params, headers)
    response = conn.getresponse()
    
    assert(response.status) == 400
    assert(response.reason) == "BAD REQUEST"

# Setting unused valid emial (pass)
def test_user_profile_setemail_3():
    # User 1 registers, logs in
    email = helper.reg_helper()
    returned_dic = helper.login_helper(email, 'password')
    token = returned_dic['token']
    u_id = returned_dic['u_id']
    # User 1 sets unused new email
    params = urllib.parse.urlencode({'token': token, 'email':  new_mail()})
    conn = http.client.HTTPConnection(URL)
    conn.request("PUT", "user/profile/setemail", params, headers)
    response = conn.getresponse()
    
    assert(response.status) == 200
    assert(response.reason) == "OK"
'''
'''
user/profile/sethandle - 3 tests
PUT request
test: setting short handle <3
      setting long handle >20
      setting valid handle (pass)
'''
def test_user_profile_sethandle_1():
    server.clear_users()
    server.clear_channels()
    # User 1 registers
    register_dic = auth.auth_register("validemail@gmail.com", "password", "First", "Last", URL)
    token = register_dic['token']
    u_id = register_dic['u_id']
    # Set users handles
    with pytest.raises(Exception, match=r"*"):
        user_profile.user_profile_sethandle(token, "FirstLast")
    with pytest.raises(Exception, match=r"*"):
        user_profile.user_profile_sethandle(token, "a")
    with pytest.raises(Exception, match=r"*"):
        user_profile.user_profile_sethandle(token, "toolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolongtoolong")
    assert(user_profile.user_profile_sethandle(token, "goodhandle123")) is not None


'''
# Setting short handle
def test_user_profile_setemail_4():
    # User 1 registers, logs in
    email = helper.reg_helper()
    
    returned_dic = helper.login_helper(email, 'password')
    token = returned_dic['token']
    u_id = returned_dic['u_id']
    # User 1 sets empty handle
    params = urllib.parse.urlencode({'token': token, 'handle_str':''})
    conn = http.client.HTTPConnection(URL)
    conn.request("PUT", "user/profile/sethandle", params, headers)
    response = conn.getresponse()
    
    assert(response.status) == 400
    assert(response.reason) == "BAD REQUEST"

# Setting long handle
def test_user_profile_setemail_5():
    # User 1 registers, logs in
    email = helper.reg_helper()
    
    returned_dic = helper.login_helper(email, 'password')
    token = returned_dic['token']
    u_id = returned_dic['u_id']
    # User 1 sets long handle
    lo = '12345678910111213141516'
    params = urllib.parse.urlencode({'token': token, 
                                     'handle_str':lo,
                                    })
    conn = http.client.HTTPConnection(URL)
    conn.request("PUT", "user/profile/sethandle", params, headers)
    response = conn.getresponse()
    
    assert(response.status) == 400
    assert(response.reason) == "BAD REQUEST"

# Setting valid handle
def test_user_profile_setemail_6():
    # User 1 registers, logs in
    email = helper.reg_helper()
    
    returned_dic = helper.login_helper(email, 'password')
    token = returned_dic['token']
    u_id = returned_dic['u_id']
    # User 1 sets valid handle
    params = urllib.parse.urlencode({'token': token, 'handle_str': new_handle()})
    conn = http.client.HTTPConnection(URL)
    conn.request("PUT", "user/profile/sethandle", params, headers)
    response = conn.getresponse()
    
    assert(response.status) == 200
    assert(response.reason) == "OK"
'''
'''
users/all - 1 tests
GET request
test: valid test
'''
def test_user_profile_user_all_1():
    server.clear_users()
    server.clear_channels()
    # User 1 registers
    register_dic = auth.auth_register("validemail@gmail.com", "password", "First", "Last", URL)
    token = register_dic['token']
    assert(user_profile.user_profile_user_all(token)) is not None
'''
user/profiles/uploadphoto - N/A tests
'''
