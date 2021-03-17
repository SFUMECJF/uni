"""
Created on Mon Sep 30 15:39:47 2019

@author: z5211275, z5260304
"""
#!/usr/bin/env python3
# -*- coding: utf-8 -*-

from datetime import datetime
import pytest
from Error import AccessError
import message

# pylint: disable = C0116, W0105

"""
    PYLINT DISABLE ERRORS

    C0116: Missing function or method docstring
        #
    W0105: String statement has no effect
        # Needed for comment blocks

"""

def test_message_sendlater_0():
    string = "Hello"
    # Normal case
    assert message.message_sendlater("ERYR12845zvc", 111, string, datetime.now()) == "pass"


def test_message_sendlater_1():
    with pytest.raises(ValueError, match=r"Message*"):
        string = "Hello"
        # Message too long
        message.message_sendlater("ERYR12845zvc", 111, (string*400), datetime.now())

def test_message_sendlater_2():
    string = "Hello"
    with pytest.raises(ValueError, match=r"Message*"):
        # Non existant channel
        message.message_sendlater("ERYR12845zvc", 000, string, datetime.now())

def test_message_sendlater_3():
    string = "Hello"
    with pytest.raises(ValueError, match=r"Message*"):
    # Past Message
        message.message_sendlater("ERYR12845zvc", 111, string, "past_date")

def test_message_send_0():
    string = "hello"
    #normal case
    assert message.message_send("ERYR12845zvc", 111, string) == "pass"

def test_message_send_1():
    with pytest.raises(ValueError, match=r"Message*"):
        string = "Hello"
        # too long
        message.message_send("ERYR12845zvc", 111, (string*400))


def test_message_send_2():
    with pytest.raises(ValueError, match=r"Message*"):
        string = "Hello"
        # Non existant channel
        message.message_send("ERYR12845zvc", 123, string)

def test_message_remove_0():
    assert message.message_remove("admin", 111) == "pass"

def test_message_remove_1():
    with pytest.raises(ValueError):
        # No longer existing id
        message.message_remove("admin", 000)

def test_message_remove_2():
    with pytest.raises(AccessError):
        # Un-authed user
        message.message_remove("non_admin", 111)


def test_message_edit_0():
    assert message.message_edit("personA", 123, "hey") == "pass"

def test_message_edit_1():
    with pytest.raises(ValueError):
        # un-allowed edit
        # personB with id 321 edit 'hey' message(no his)
        message.message_edit("personB", 321, "hey")

def test_message_edit_2():
    with pytest.raises(ValueError):
        # both/ or case invalide user and incorrect msg, bit id is correct
        message.message_edit("personB", 123, "MsgA")

def test_message_edit_3():
        # both/ or case invalide user and incorrect msg, bit id is correct
    assert message.message_edit("personA", 123, "hefuq") == "pass"

def test_message_edit_4():
    with pytest.raises(ValueError):
        # both/ or case invalide user and incorrect msg, bit id is correct
        message.message_edit("personA", 123, "MsgA")

def test_message_react_0():
    # pass case
    assert  message.message_react("ERYR12845zvc", 1234, 14568) == "pass"



def test_message_react_1():
    with pytest.raises(ValueError):
        # message id  invalid
        message.message_react("ERYR12845zvc", "badword1", 0000)

def test_message_react_2():
    with pytest.raises(ValueError):
        # react id invalid
        message.message_react("ERYR12845zvc", 1234, 0000)

def test_message_react_3():
    with pytest.raises(ValueError):
        # active id error
        message.message_react("ERYR12845zvc", 1234, 111)

def test_message_react_4():
    with pytest.raises(ValueError):
        # active id error
        message.message_react("ERYR12zvc", 1234, 11)

def test_message_unreact_0():
    # pass case
    assert  message.message_unreact("ERYR12845zvc", 1234, 14568) == "pass"


def test_message_unreact_1():
    with pytest.raises(ValueError):
        # Message id invalid
        message.message_unreact("ERYR12845zvc", "badword1", 111)

def test_message_unreact_2():
    with pytest.raises(ValueError):
        # React id invalid
        message.message_unreact("ERYR12845zvc", "goodId", 444)


def test_message_unreact_3():
    with pytest.raises(ValueError):
        # No active react id
        message.message_unreact("ERYR12845zvc", "goodId", 222)

def test_message_pin_1():
    with pytest.raises(ValueError):
        # Invalid message id
        message.message_pin("someToken", 000)
def test_message_pin_2():
    with pytest.raises(ValueError):
        # Non admin memeber
        message.message_pin("non_admin_token", 111)

def test_message_pin_3():
    with pytest.raises(ValueError):
        # Message already pinned
        message.message_pin("someToken", "msg1")

def test_message_pin_4():
    with pytest.raises(KeyError):
        # Non-member user
        message.message_pin("unknown", 111)

def test_message_unpin_0():
    assert message.message_unpin("someToken", 111)

def test_message_unpin_1():
    with pytest.raises(ValueError):
        # Invalid message id
        message.message_unpin("someToken", 000)

def test_message_unpin_2():
    with pytest.raises(ValueError):
        # Non admin memeber
        message.message_unpin("non_admin_token", 111)

def test_message_unpin_3():
    with pytest.raises(ValueError):
        # Message already unpinned
        message.message_unpin("someToken", "msg2")

def test_message_unpin_4():
    with pytest.raises(KeyError):
        # Non-member user
        message.message_unpin("unknown", 111)
