# pylint: disable= C0103, C0303, W0601, W0602, W0603, W0404, W0611, W0612, W0613, W0703, W0621, W0631, E0602, R0912
#Same pylint disables as server.py

"""
Created on Mon Sep 30 13:19:21 2019

@author: z5211275
"""

import http.client
import urllib
import json
import random
import server
import class_user

URL = "127.0.0.1:5034"
#URL = server.get_localhost()
headers = {"Content-type": "application/x-www-form-urlencoded",
           "Accept": "text/plain"}
           
# Register and return email used to register (password, names constant)
def reg_helper():
    rand = str(random.randint(10, 1000000))
    email_ret = "auth_register_"+ rand + "@gmail.com"
    params = urllib.parse.urlencode({'email': email_ret,
                                     'password': "password",
                                     'name_first': "First",
                                     'name_last': "Last"})
    conn = http.client.HTTPConnection(URL)
    conn.request("POST", "/auth/register", params, headers)
    response = conn.getresponse()

    # if registering fails (same email etc)
    while response.status == 400:
        rand = str(random.randint(10, 1000000))
        email_ret = "auth_register_"+ rand + "@gmail.com"
        params = urllib.parse.urlencode({'email': email_ret,
                                         'password': "password",
                                         'name_first': "First",
                                         'name_last': "Last"
                                         })
        conn = http.client.HTTPConnection(URL)
        conn.request("POST", "/auth/register", params, headers)
        response = conn.getresponse()

    assert(response.status) == 200
    assert(response.reason) == "OK"  
    return email_ret
    
# For Logging in, returns token
def login_helper(email, password):
    password = "password"
    params = urllib.parse.urlencode({'email':email, 'password': password})

    conn = http.client.HTTPConnection(URL)
    conn.request("POST", "/auth/login", params, headers)
    response = conn.getresponse()
    
    #print(response.read)
    
    assert(response.status) == 200
    assert(response.reason) == "OK"
    
    # Data extracted from response
    raw_data = response.read()
    # Decode data with utf8, extract dictionary from string with json
    new_dic = json.loads(raw_data.decode('utf8'))
    
    return new_dic

# For Logging out, takes token
def logout_helper(token):
    params = urllib.parse.urlencode({'token': token})
    conn = http.client.HTTPConnection(URL)
    conn.request("POST", "/auth/logout", params, headers)
    response = conn.getresponse()

    assert(response.status) == 200
    assert(response.reason) == "OK"

# For creating a channel
def create_channel_helper(token, channel_name, state):
    params = urllib.parse.urlencode({'token': token, 'name': channel_name,
                                     'is_public': state
                                     })
    conn = http.client.HTTPConnection(URL)
    conn.request("POST", "/channels/create", params, headers)
    response = conn.getresponse()
    assert(response.status) == 200
    assert(response.reason) == "OK"
    
    
    raw_data = response.read()
    new_dic = json.loads(raw_data.decode('utf8'))
    
    return new_dic['channel_id']
    
# Invite user to the channel
def invite_helper(token, channel_id, u_id):
    params = urllib.parse.urlencode({'token':token, 'channel_id': channel_id, 'u_id': u_id})
    
    conn = http.client.HTTPConnection(URL)
    conn.request("POST", "/channel/invite", params, headers)
    response = conn.getresponse()
  
    return response
    
    
# Leave channel helper
def leave_helper(token, channel_id):
    params = urllib.parse.urlencode({'token':token, 'channel_id': channel_id})
    
    conn = http.client.HTTPConnection(URL)
    conn.request("POST", "/channel/leave", params, headers)
    response = conn.getresponse()
  
    return response
     
# Join channel helper      
def join_helper(token, channel_id):
    params = urllib.parse.urlencode({'token':token, 'channel_id': channel_id})
    
    conn = http.client.HTTPConnection(URL)
    conn.request("POST", "/channel/join", params, headers)
    response = conn.getresponse()
  
    return response   
    
# Add owner    
def addowner_helper(token, channel_id, u_id):
    params = urllib.parse.urlencode({'token':token, 'channel_id': channel_id, 'u_id': u_id})
    
    conn = http.client.HTTPConnection(URL)
    conn.request("POST", "/channel/addowner", params, headers)
    response = conn.getresponse()
  
    return response  


# Add owner    
def removeowner_helper(token, channel_id, u_id):
    params = urllib.parse.urlencode({'token':token, 'channel_id': channel_id, 'u_id': u_id})
    
    conn = http.client.HTTPConnection(URL)
    conn.request("POST", "/channel/removeowner", params, headers)
    response = conn.getresponse()
  
    return response  

# send a test message
def message_send_helper(token, channel_id, message):
    params = urllib.parse.urlencode({'token': token, 'channel_id': channel_id, 'message': message})
    conn = http.client.HTTPConnection(URL)
    conn.request("POST", "/message/send", params, headers)
    response = conn.getresponse()
    assert(response.status) == 200
    assert(response.reason) == "OK"

    raw_data = response.read()
    dic = json.loads(raw_data.decode('utf8'))
    return dic

# remove a message
def message_remove_helper(token, message_id):
    params = urllib.parse.urlencode({'token': token, 'message_id': message_id})
    conn = http.client.HTTPConnection(URL)
    conn.request("DELETE", "/message/remove", params, headers)
    response = conn.getresponse()
    assert(response.status) == 200
    assert(response.reason) == "OK"

# react to a message
def message_react_helper(token, message_id, react_id):
    react_id = 1
    params = urllib.parse.urlencode({'token': token, 
                                     'message_id': message_id, 
                                     'react_id': react_id
                                     })
    conn = http.client.HTTPConnection(URL)
    conn.request("POST", "/message/react", params, headers)
    response = conn.getresponse()
    assert(response.status) == 200
    assert(response.reason) == "OK"

# pin a message
def message_pin_helper(token, message_id):
    params = urllib.parse.urlencode({'token': token, 'message_id': message_id})
    conn = http.client.HTTPConnection(URL)
    conn.request("POST", "/message/pin", params, headers)
    response = conn.getresponse()
    assert(response.status) == 200
    assert(response.reason) == "OK"

# unpin a message
def message_unpin_helper(token, message_id):
    params = urllib.parse.urlencode({'token': token, 'message_id': message_id})
    conn = http.client.HTTPConnection(URL)
    conn.request("POST", "/message/unpin", params, headers)
    response = conn.getresponse()
    assert(response.status) == 200
    assert(response.reason) == "OK"
    
# Create standup
def standup_start_helper(token, channel_id, length):
    params = urllib.parse.urlencode({'token': token,
                                     'channel_id': channel_id,
                                     'length': length,
                                     })
    conn = http.client.HTTPConnection(URL)
    conn.request("POST", "/standup/start", params, headers)
    response = conn.getresponse()
    assert(response.status) == 200
    assert(response.reason) == "OK"
