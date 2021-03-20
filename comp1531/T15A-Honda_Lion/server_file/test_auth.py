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

# pylint: disable = C0301, C0103
"""
    PYLINT DISABLE ERRORS
    C0301: Line too long
        # Needed for test coverage
    C0103: Constant name UPPERCASE
        #
"""

URL = "127.0.0.1:5009"
#URL = server.get_localhost()
headers = {"Content-type": "application/x-www-form-urlencoded",
           "Accept": "text/plain"}

'''
other functions
'''
# Register user, get token (for logout tests)
def register_token(email, password):
    register_user = class_user.User(email, password)
    return register_user.generate_token()

'''
auth_register tests - 8 tests
POST request
tests: registering with invalid email
       registering with short password (5 characters)
       registering with no first name
       registering with no last name
       registering with long first name
       registering with long last name
       registering with valid email, password, first + last name (pass)
       registering with used email
'''

# backend test for auth register
def test_backend_auth_register_1():
    server.clear_users()
    email = "validemail@gmail.com"
    password = "password"
    name_first = "First"
    name_last = "Last"
    assert (auth.auth_register(email, password, name_first, name_last, URL)) is not None
    server.clear_users()

# backend test for invalid email
def test_backend_auth_register_2():
    server.clear_users()
    email = "invalidemailgmail.com"
    password = "password"
    name_first = "First"
    name_last = "Last"
    with pytest.raises(Exception, match=r"*"):
        auth.auth_register(email, password, name_first, name_last, URL)
    server.clear_users()

# backend test for short password
def test_backend_auth_register_3():
    server.clear_users()
    email = "validemail@gmail.com"
    password = "12345"
    name_first = "First"
    name_last = "Last"
    with pytest.raises(Exception, match=r"*"):
        auth.auth_register(email, password, name_first, name_last, URL)
    server.clear_users()

# backend test for no first name
def test_backend_auth_register_4():
    server.clear_users()
    email = "validemailgmail.com"
    password = "password"
    name_first = ""
    name_last = "Last"
    with pytest.raises(Exception, match=r"*"):
        auth.auth_register(email, password, name_first, name_last, URL)
    server.clear_users()

# backend test for no last name
def test_backend_auth_register_5():
    server.clear_users()
    email = "validemail@gmail.com"
    password = "password"
    name_first = "First"
    name_last = ""
    with pytest.raises(Exception, match=r"*"):
        auth.auth_register(email, password, name_first, name_last, URL)
    server.clear_users()

# backend test for long first name
def test_backend_auth_register_6():
    server.clear_users()
    email = "validemail@gmail.com"
    password = "password"
    name_first = "longerthanfiftycharacterslongerthanfiftycharacterslongerthanfiftycharacterslongerthanfiftycharacters"
    name_last = "Last"
    with pytest.raises(Exception, match=r"*"):
        auth.auth_register(email, password, name_first, name_last, URL)
    server.clear_users()

# backend test for long last name
def test_backend_auth_register_7():
    server.clear_users()
    email = "validemail@gmail.com"
    password = "password"
    name_first = "First"
    name_last = "longerthanfiftycharacterslongerthanfiftycharacterslongerthanfiftycharacterslongerthanfiftycharacters"
    with pytest.raises(Exception, match=r"*"):
        auth.auth_register(email, password, name_first, name_last, URL)
    server.clear_users()

# backend test for used email
def test_backend_auth_register_8():
    server.clear_users()
    email = "validemail@gmail.com"
    password = "password"
    name_first = "First"
    name_last = "Last"
    assert (auth.auth_register(email, password, name_first, name_last, URL)) is not None
    with pytest.raises(Exception, match=r"*"):
        auth.auth_register(email, password, name_first, name_last, URL)
    server.clear_users()

# backend test for same name
def test_backend_auth_register_9():
    server.clear_users()
    email = "validemail@gmail.com"
    password = "password"
    name_first = "First"
    name_last = "Last"
    assert (auth.auth_register(email, password, name_first, name_last, URL)) is not None
    email2 = "validemail2@gmail.com"
    assert (auth.auth_register(email2, password, name_first, name_last, URL)) is not None
    email3 = "validemail3@gmail.com"
    name_first = "First1"
    assert (auth.auth_register(email3, password, name_first, name_last, URL)) is not None
    server.clear_users()

"""

FRONTEND AUTH/REGISTER TESTS

"""
"""
# registering with an invalid email
def test_auth_register_1():
    server.clear_users()
    params = urllib.parse.urlencode({'email': "invalidemail.com", 'password': "password",
                                     'name_first': "First", 'name_last': "Last"})
    conn = http.client.HTTPConnection(URL)
    conn.request("POST", "/auth/register", params, headers)
    response = conn.getresponse()
    assert(response.status) == 400
    assert(response.reason) == "BAD REQUEST"

# registering with a password with less than 6 characters
def test_auth_register_2():
    server.clear_users()
    params = urllib.parse.urlencode({'email': "auth_register_2@gmail.com", 'password': "12345",
                                     'name_first': "First", 'name_last': "Last"})
    conn = http.client.HTTPConnection(URL)
    conn.request("POST", "/auth/register", params, headers)
    response = conn.getresponse()
    assert(response.status) == 400
    assert(response.reason) == "BAD REQUEST"

# registering with no first name provided
def test_auth_register_3():
    server.clear_users()
    params = urllib.parse.urlencode({'email': "auth_register_3@gmail.com", 'password': "password",
                                     'name_first': "", 'name_last': "Last"})
    conn = http.client.HTTPConnection(URL)
    conn.request("POST", "/auth/register", params, headers)
    response = conn.getresponse()
    assert(response.status) == 400
    assert(response.reason) == "BAD REQUEST"

# registering with no last name provided
def test_auth_register_4():
    server.clear_users()
    params = urllib.parse.urlencode({'email': "auth_register_4@gmail.com", 'password': "password",
                                     'name_first': "First", 'name_last': ""})
    conn = http.client.HTTPConnection(URL)
    conn.request("POST", "/auth/register", params, headers)
    response = conn.getresponse()
    assert(response.status) == 400
    assert(response.reason) == "BAD REQUEST"

# registering with a first name that is longer than 50 characters
def test_auth_register_5():
    server.clear_users()
    params = urllib.parse.urlencode({'email': "auth_register_5@gmail.com", 'password': "password",
                                     'name_first': "longerthanfiftycharacterslongerthanfiftycharacterslongerthanfiftycharacterslongerthanfiftycharacters",
                                     'name_last': "Last"})
    conn = http.client.HTTPConnection(URL)
    conn.request("POST", "/auth/register", params, headers)
    response = conn.getresponse()
    assert(response.status) == 400
    assert(response.reason) == "BAD REQUEST"
    server.clear_users()

# registering with a last name that is longer than 50 characters
def test_auth_register_6():
    server.clear_users()
    params = urllib.parse.urlencode({'email': "auth_register_6@gmail.com", 'password': "password",
                                     'name_first': "First",
                                     'name_last': "longerthanfiftycharacterslongerthanfiftycharacterslongerthanfiftycharacterslongerthanfiftycharacters"})
    conn = http.client.HTTPConnection(URL)
    conn.request("POST", "/auth/register", params, headers)
    response = conn.getresponse()
    assert(response.status) == 400
    assert(response.reason) == "BAD REQUEST"

# registering for the first time
def test_auth_register_7():
    server.clear_users()
    rand = str(random.randint(10, 1000000))
    params = urllib.parse.urlencode({'email': "auth_register_"+ rand + "@gmail.com",
                                     'password': "password",
                                     'name_first': "First",
                                     'name_last': "Last"})
    conn = http.client.HTTPConnection(URL)
    conn.request("POST", "/auth/register", params, headers)
    response = conn.getresponse()

    assert(response.status) == 200
    assert(response.reason) == "OK"

# registering the same email again (fail)
def test_auth_register_8():
    server.clear_users()

    params2 = urllib.parse.urlencode({'email': "auth_register_8@gmail.com", 'password': "password",
                                      'name_first': "First", 'name_last': "Last"})
    conn2 = http.client.HTTPConnection(URL)
    conn2.request("POST", "/auth/register", params2, headers)


    params = urllib.parse.urlencode({'email': "auth_register_8@gmail.com", 'password': "password",
                                     'name_first': "First", 'name_last': "Last"})
    conn = http.client.HTTPConnection(URL)
    conn.request("POST", "/auth/register", params, headers)

    params = urllib.parse.urlencode({'email': "auth_register_8@gmail.com", 'password': "password",
                                     'name_first': "First", 'name_last': "Last"})
    conn = http.client.HTTPConnection(URL)
    conn.request("POST", "/auth/register", params, headers)

    response = conn.getresponse()
    assert(response.status) == 400
    assert(response.reason) == "BAD REQUEST"
"""
'''
auth/login tests - 4 tests
POST request
tests: logging in with invalid email
       logging in with unregistered account
       logging in with incorrect password
       logging in with valid email + password (pass)
'''

"""

BACKEND AUTH/LOGIN TESTS

"""

# valid log in (pass)
def test_backend_auth_login_1():
    # register
    server.clear_users()
    email = "validemail@gmail.com"
    password = "password"
    name_first = "First"
    name_last = "Last"
    assert (auth.auth_register(email, password, name_first, name_last, URL)) is not None
    # login
    assert (auth.auth_login(email, password)) is not None
    server.clear_users()

# logging in with invalid email (fail)
def test_backend_auth_login_2():
    # register
    server.clear_users()
    email = "validemail@gmail.com"
    password = "password"
    name_first = "First"
    name_last = "Last"
    assert (auth.auth_register(email, password, name_first, name_last, URL)) is not None
    # login
    with pytest.raises(Exception, match=r"*"):
        auth.auth_login("invalidemail.com", password)
    server.clear_users()

# logging in with unregistered account (fail)
def test_backend_auth_login_3():
    # login
    server.clear_users()
    with pytest.raises(Exception, match=r"*"):
        auth.auth_login("validemail@gmail.com", "password")
    server.clear_users()

# logging in with incorrect password (fail)
def test_backend_auth_login_4():
    # register
    server.clear_users()
    email = "validemail@gmail.com"
    password = "password"
    name_first = "First"
    name_last = "Last"
    assert (auth.auth_register(email, password, name_first, name_last, URL)) is not None
    # login
    with pytest.raises(Exception, match=r"*"):
        auth.auth_login(email, "password1")
    server.clear_users()

""" TESTING AUTH/LOGOUT BACKEND """

# valid logout
def test_backend_auth_logout_1():
    # register
    server.clear_users()
    email = "validemail@gmail.com"
    password = "password"
    name_first = "First"
    name_last = "Last"
    assert (auth.auth_register(email, password, name_first, name_last, URL)) is not None
    # login
    login_dic = auth.auth_login(email, password)
    assert login_dic is not None
    token = login_dic['token']
    logout_dic = auth.auth_logout(token)
    assert (logout_dic['is_success'] is True)
    server.clear_users()
"""
# invalid logout
    # register
    email = "validemail@gmail.com"
    password = "password"
    name_first = "First"
    name_last = "Last"
    assert (auth.auth_register(email, password, name_first, name_last, URL)) is not None
    # login
    login_dic = auth.auth_login(email, password)
    assert login_dic is not None
    token = "token"
    logout_dic = auth.auth_logout(token)
    assert (logout_dic['is_success'] is False)
    server.clear_users()
"""

""" TESTING AUTH/PASSWORDRESET BACKEND """

# valid email
def test_backend_auth_passwordreset_request_1():
    # register
    server.clear_users()
    email = "validemail@gmail.com"
    password = "password"
    name_first = "First"
    name_last = "Last"
    assert (auth.auth_register(email, password, name_first, name_last, URL)) is not None
    assert (auth.auth_passwordreset_request(email)) is not None
    server.clear_users()

# invalid email
def test_backend_auth_passwordreset_request_2():
    # register
    server.clear_users()
    email = "validemail@gmail.com"
    password = "password"
    name_first = "First"
    name_last = "Last"
    assert (auth.auth_register(email, password, name_first, name_last, URL)) is not None
    with pytest.raises(Exception, match=r"*"):
        auth.auth_passwordreset_request("email")
    server.clear_users()

""" TESTING PASSWORDRESET/RESET """

# valid code
def test_backend_auth_passwordreset_reset_1():
    # register
    server.clear_users()
    email = "validemail@gmail.com"
    password = "password"
    name_first = "First"
    name_last = "Last"
    register_dic = auth.auth_register(email, password, name_first, name_last, URL)
    token = register_dic['token']
    # request a code
    assert (auth.auth_passwordreset_request(email)) is not None
    # find the code
    u_id = class_user.find_u_id_from_token(token)
    users = server.get_users()
    user = class_user.find_user_from_u_id(u_id, users)
    reset_code = user.get_resetcode()
    assert (auth.auth_passwordreset_reset(reset_code, "newpassword")) is not None
    server.clear_users()

# invalid code
def test_backend_auth_passwordreset_reset_2():
    # register
    server.clear_users()
    email = "validemail@gmail.com"
    password = "password"
    name_first = "First"
    name_last = "Last"
    register_dic = auth.auth_register(email, password, name_first, name_last, URL)
    token = register_dic['token']
    # request a code
    assert (auth.auth_passwordreset_request(email)) is not None
    # find the code
    u_id = class_user.find_u_id_from_token(token)
    users = server.get_users()
    user = class_user.find_user_from_u_id(u_id, users)
    reset_code = user.get_resetcode()
    with pytest.raises(Exception, match=r"*"):
        auth.auth_passwordreset_reset("1023", "newpassword")
    server.clear_users()

# short password
    # register
    server.clear_users()
    email = "validemail@gmail.com"
    password = "password"
    name_first = "First"
    name_last = "Last"
    register_dic = auth.auth_register(email, password, name_first, name_last, URL)
    token = register_dic['token']
    # request a code
    assert (auth.auth_passwordreset_request(email)) is not None
    # find the code
    u_id = class_user.find_u_id_from_token(token)
    users = server.get_users()
    user = class_user.find_user_from_u_id(u_id, users)
    reset_code = user.get_resetcode()
    with pytest.raises(Exception, match=r"*"):
        auth.auth_passwordreset_reset(reset_code, "short")
    server.clear_users()

"""

FRONTEND AUTH/LOGIN TESTS

"""
"""
# email entered is not a valid email
def test_auth_login_1():
    server.clear_users()
    params = urllib.parse.urlencode({'email': "invalidemail.com", 'password': "password",
                                    })
    conn = http.client.HTTPConnection(URL)
    conn.request("POST", "/auth/login", params, headers)
    response = conn.getresponse()
    assert(response.status) == 400
    assert(response.reason) == "BAD REQUEST"

# email entered is not registered yet
def test_auth_login_2():
    server.clear_users()
    params = urllib.parse.urlencode({'email': "auth_login_2@gmail.com", 'password': "password",
                                    })
    conn = http.client.HTTPConnection(URL)
    conn.request("POST", "/auth/login", params, headers)
    response = conn.getresponse()
    assert(response.status) == 400
    assert(response.reason) == "BAD REQUEST"

# password is incorrect
def test_auth_login_3():
    server.clear_users()
    #auth.auth_register("auth_login_3@gmail.com", "password", "First", "Last", URL)
    params = urllib.parse.urlencode({'email': "auth_login_3@gmail.com", 'password': "password",
                                     'name_first': "First", 'name_last': "Last"})
    conn = http.client.HTTPConnection(URL)
    conn.request("POST", "/auth/register", params, headers)

    params = urllib.parse.urlencode({'email': "auth_login_3@gmail.com", 'password': "incorrect",
                                    })
    conn = http.client.HTTPConnection(URL)
    conn.request("POST", "/auth/login", params, headers)
    response = conn.getresponse()
    assert(response.status) == 400
    assert(response.reason) == "BAD REQUEST"

# testing if login works - valid email and password
def test_auth_login_4():
    server.clear_users()

    #auth.auth_register("auth_login_4@gmail.com", "password", "First", "Last", URL)

    params = urllib.parse.urlencode({'email': "auth_login_4@gmail.com", 'password': "password",
                                     'name_first': "First", 'name_last': "Last"})
    conn = http.client.HTTPConnection(URL)
    conn.request("POST", "/auth/register", params, headers)

    params = urllib.parse.urlencode({'email': "auth_login_4@gmail.com", 'password': "password",
                                    })
    conn = http.client.HTTPConnection(URL)
    conn.request("POST", "/auth/login", params, headers)

    response = conn.getresponse()

    #print('-------------')
    #print(response.read())

    assert(response.status) == 200
    assert(response.reason) == "OK"

'''
auth/logout tests - 1 test
POST request
tests: valid test
'''

# testing to see if successful
def test_auth_logout_1():
    server.clear_users()
    #auth.auth_register("auth_login_4@gmail.com", "password", "First", "Last", URL)
    # Registering

    params = urllib.parse.urlencode({'email': "auth_login_4@gmail.com", 'password': "password",
                                     'name_first': "First", 'name_last': "Last"})
    conn = http.client.HTTPConnection(URL)
    conn.request("POST", "/auth/register", params, headers)

    # Logging in
    params = urllib.parse.urlencode({'email': "auth_login_4@gmail.com", 'password': "password",
                                    })
    conn = http.client.HTTPConnection(URL)
    conn.request("POST", "/auth/login", params, headers)
    response = conn.getresponse()
    assert(response.status) == 200
    assert(response.reason) == "OK"

    # Data extracted from response
    raw_data = response.read()
    # Decode data with utf8, extract dictionary from string with json
    new_dic = json.loads(raw_data.decode('utf8'))
    tok = new_dic['token']

    params = urllib.parse.urlencode({'token': tok})
    conn = http.client.HTTPConnection(URL)
    conn.request("POST", "/auth/logout", params, headers)
    response = conn.getresponse()

    assert(response.status) == 200
    assert(response.reason) == "OK"

'''
auth/passwordreset/reset - 2 tests
POST request
tests: resetting password with invalid reset code
       resetting password with invalid password (< 6)
'''

# reset code is not valid
def test_auth_passwordreset_reset_1():
    params = urllib.parse.urlencode({'email': "invalidemail.com"})
    headers = {"Content-type": "application/x-www-form-urlencoded",
                "Accept": "text/plain"}
    conn = http.client.HTTPConnection(URL)
    conn.request("POST", "/auth/passwordreset/reset", params, headers)
    response = conn.getresponse()
    assert(response.status) == 400
    assert(response.reason) == "BAD REQUEST"

# not valid password
def test_auth_passwordreset_reset_2():
    params = urllib.parse.urlencode({'email': "validmail@gmail.com"})
    headers = {"Content-type": "application/x-www-form-urlencoded",
                "Accept": "text/plain"}
    conn = http.client.HTTPConnection(URL)
    conn.request("POST", "/auth/passwordreset/reset", params, headers)
    response = conn.getresponse()
    assert(response.status) == 400
    assert(response.reason) == "BAD REQUEST"
"""
