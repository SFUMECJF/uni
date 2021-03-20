#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sun Sep 29 20:20:00 2019

@author: z5211275
"""

# pylint: disable = C0116
# (missing function or docstring)

# Test for password
#   Checking for a non-empty string, full correct password
#   and the length of it.

from check import check_password

def test_none():
    assert check_password("") == "Invalid Password"

def test_short():
    assert check_password("1234") == "Invalid Password"

def test_exact():
    assert check_password("123ab") == "Valid Password"

def test_long():
    assert check_password("1243768idgsayfughia") == "Valid Password"
