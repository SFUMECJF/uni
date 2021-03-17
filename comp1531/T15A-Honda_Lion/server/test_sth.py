#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Mon Sep 30 15:40:10 2019

@author: z5258962
"""

import pytest
import standup
from Error import AccessError

# pylint: disable = C0116, C0301, W0107, W0105
"""
    PYLINT DISABLE ERRORS

    C0116: Missing function or method docstring
        #
    C0301: Line too long
        # Needed for test coverage
    W0107: Unnecessary pass statement
        #
    W0105: String statement has no effect
        # Needed for comment blocks

"""

"""
_______________________________________________________________________________

                                STANDUP PYTESTS

Running tests: 30

Expected pass: 30

IMPORTANT NOTES:
    - These tests are written with assumptions to updating token

    - Symbol tests are placeholders for possible updates to how uid is stored

        + Symbol tests should always work when comparing sytings and can
          possibly be made redundant as python treats all strings the same
          regardless of char type.

    - This pytest was made to pass EVERY TEST and any tests that do fail with
      the supplied funciton code should be reviewed for errors

    - The supplied code standup.py has been written to function independantly
      and as such, it must be noted that inputs and results given from running
      tests have been intitiated within the program and not pulled from
      another file

     - These tests assume the channel id given is an integer. As no errors
       were indicated with invalid input data, no code has been written to
       ensure inputs are of the correct type.

     - As admin_userpermission_change utilises token to compare u_id, u_id has
       been made a string to smoothen the process.
         + This will change in the next iteration if need be so with map()
     ___________________________________________________________________
"""
"""
[Standup Start tests]

Running tests: 5

Expected pass: 5

"""

def test_standup_start_allinv():
    #Test for no valid inputs
    with pytest.raises(ValueError, match=r"Channel*"):
        standup.standup_start("", -1)
    pass

def test_standup_start_inv_channel():
    #Test for non-existent channel
    with pytest.raises(ValueError, match=r"Channel*"):
        standup.standup_start("0", 1)
    pass

def test_standup_start_member():
    #Test for non-existent member string AccessError
    with pytest.raises(AccessError, match=r"User*"):
        standup.standup_start("1", 0)
    pass

def test_standup_start_channel_inv_memsymb():
    #Test for non-existen mem string (symbol). Returns same as above
    with pytest.raises(AccessError, match=r"User*"):
        standup.standup_start("!", 0)
    pass

def test_standup_start_valid():
    #Tests for all valid inputs
    assert(standup.standup_start("0", 0)) == {}
    pass

"""
[Standup send tests]

Running tests: 8

Expected pass: 8

"""

def test_standup_send_none():
    #Test for no valid inputs for ch id and token
    with pytest.raises(ValueError, match=r"Channel*"):
        standup.standup_send("1", 1, "s")
    pass

def test_standup_send_channel():
    #Test for standard non-existent channel value error
    with pytest.raises(ValueError, match=r"Channel*"):
        standup.standup_send("0", 1, "")
    pass

def test_standup_send_token():
    #Test for token exceeding 15 minute time limit
    #THIS DOES NOT SEND UPDATED TOKEN
    #ONLY TESTS FOR INVALID TOKEN
    with pytest.raises(AccessError, match=r"Standup*"):
        standup.standup_send("0 time:0", 0, "4")
    pass

def test_standup_send_message():
    #Test for message over 1000 characters
    with pytest.raises(ValueError, match=r"Message*"):
        standup.standup_send("0", 0, "ngerogujenkjfdjasjdsajdjsaoidjsaoidjsaoidjoisajdoijsadoiajsdoijdsaoijoidsajoisajdoijdsaoijsadoijsaoidjosaijdoisajdojsadoisajodjsajdoisajdoisajdoisajdoisajoidjsaoidjoisadjsaojdsajdoijsaoidjsaoidjsaoidjoisadjoisadjoisadjoisajdoisajdoisajodijsaodjsaidjoisajdsajdslajdlsajdolsajdlsajdisolajdolisajdolisadjoisajdoisajdlsajdolsajdlasojdsaolidjasoidjaoisdjsoliadjolisajdolisajdolisadjoisadkjsnsandksandkjnsakjdnsadkjnsakjdnsakjdnkjsandkjsandkjsandkjnsakjdnsadnsakndkjsandkjsandkjsandknsadjknsakjdnsakndkjsandkjsandksankjdnsakjdnsakjdnkjsadnkjsandkjsandkjsandkjsandkjsankjdnsakjdnsakjdnsadnkjsandkjsandkjsandkjsandkjnsakjdnsakdnksajdnskjndkjsandjsadkjnsadkjnsadkjnsakjdnsakjdnsakjdnsakjdnsakjdnkjsandkjsandkjsandkjsandkjsandknsakdngfdsngifdngidsanfindsagindsaiugndsaiugfndsaifndsaifndsaiunfiudsnfiudsanfundsafldsanfkjlndsafkjndsafkjndsakjfndsakjfndskjfndsajnfinfinfdsainfidsanfidsanfikjdsnfiuewnfinsafindsaifndsaifnwiufniudsanfdsanfkjdsnfkjdsanfkjdsanfkjdsanfiuewnfknsfkjdsanfkewanfindsaflkjdsanfkjndsaiufnwaifnadsjfnldsaf")
    pass
def test_standup_send_message_symbols():
    #Tests for message over 1000 but with symbols. Should return same as above
    with pytest.raises(ValueError, match=r"Message**"):
        standup.standup_send("0", 0, "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@######################################################################################$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&**********************************************************************************************************************(((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((((()))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))))__________________________________________________________________++++++++++++")
    pass

def test_standup_send_inv_mem():
    #Test for standard non-existent member ValueError
    with pytest.raises(AccessError, match=r"User*"):
        standup.standup_send("1", 0, "")
    pass

def test_standup_send_inv_memsymb():
    #Test for non-existent member ValueError (symbol)
    with pytest.raises(AccessError, match=r"User*"):
        standup.standup_send("!", 0, "")
    pass

def test_standup_send_valid():
    #Test for all valid inputs
    #THIS DOES NOT SEND UPDATED TOKEN
    #ONLY TESTS WITH VALID TOKEN
    assert(standup.standup_send("0 time:1", 0, "4")) == {}
    pass

"""
[Search tests]

Running tests: 9

Expected pass: 9

"""
def test_search_single():
    #Simple tests if matched query is found
    assert(standup.search("0", "b")) == ["b"]
    pass

def test_search_multiple():
    #Tests multiple inputs found
    assert(standup.search("0", "a")) == ["a", "a", "i am groot", "i am groot", "thus with a kiss i die"]
    pass

def test_search_invalid_single():
    #Tests for invalid single character
    assert(standup.search("0", "z")) == []
    pass

def test_search_single_strings():
    #Tests for single string inputs found
    assert(standup.search("0", "thus with a kiss i die")) == ["thus with a kiss i die"]
    pass

def test_search_multiple_strings():
    #Tests for multiple string inputs found
    assert(standup.search("0", "i am groot")) == ["i am groot", "i am groot"]
    pass

def test_search_invalid_strings():
    #Tests for invalid strings input
    assert(standup.search("0", "this string doesnt exist")) == []
    pass
def test_search_other():
    #Tests for search with non-letter symbols
    assert(standup.search("0", "!")) == ["!"]
    pass

def test_search_other_multiple():
    #Tests for many symbols
    assert(standup.search("0", "@")) == ["@", "@@@", "@@@ @@@"]
    pass

def test_search_none():
    #Tests for no valid search
    #Assumes that program will recognise -1 as no search
    assert(standup.search("0", "-1")) == []
    pass

"""
[Admin user perm tests]

Running tests: 8

Expected pass: 8

"""
def test_admin_serpermission_change_valid():
    #Tests valid token function
    assert(standup.admin_userpermission_change("1", "0", "3")) == {}
    pass

def test_admin_userpermission_change_invuid():
    #tests for non-existent uid
    with pytest.raises(ValueError, match=r"User*"):
        standup.admin_userpermission_change("0", "1", "3")
    pass

def test_admin_userpermission_change_inuidsymb():
    #Tests for non-existed uid but with symbol
    with pytest.raises(ValueError, match=r"user*"):
        standup.admin_userpermission_change("0", "!", "3")
    pass

def test_admin_userpermission_change_invcred():
    #Tests for invalid user credentials in token
    with pytest.raises(AccessError, match=r"User*"):
        standup.admin_userpermission_change("0", "0", "1")
    pass

def test_admin_userpermission_change_invcredsymb():
    #Tests for invalid cred but with symbol. Returns same as above
    with pytest.raises(AccessError, match=r"User*"):
        standup.admin_userpermission_change("!", "0", "1")

def test_admin_userpermission_change_invperm():
    #Tests for invalid new permission
    with pytest.raises(ValueError, match=r"New*"):
        standup.admin_userpermission_change("0", "0", "5")
    pass
def test_admin_userpermission_change_invpermsymb():
    #Tests for invalid new permission but with symbol. Returns same as above
    with pytest.raises(ValueError, match=r"New*"):
        standup.admin_userpermission_change("0", "0", "!")
    pass

def test_admin_userpermission_change_none():
    #test for all empty inputs
    with pytest.raises(ValueError, match=r"User*"):
        standup.admin_userpermission_change("", "", "")
    pass
