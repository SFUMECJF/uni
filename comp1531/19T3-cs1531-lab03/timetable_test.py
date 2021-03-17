#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Tue Oct  8 00:34:38 2019

@author: z5258962
"""

from timetable import timetable
from datetime import date, time, datetime

def test_timetable_oneDate_oneTime():
    #Test 1 date 1 time
    assert(timetable([date(2019,1,1)], [time(11,11)])) == [datetime(2019,1,1,11,11)]
    pass

def test_timetable_oneDate_twoTimes():
    #Test 1 date 2 times
    assert(timetable([date(2019,1,1)], [time(11,11), time(12,00)])) == [datetime(2019,1,1,11,11), datetime(2019,1,1,12,00)]
    pass
    
def test_timetable_twoDates_oneTime():
    #Test 2 dates 1 time
    assert(timetable([date(2019,1,1), date(2019,2,28)], [time(11,11)])) == [datetime(2019,1,1,11,11), datetime(2019,2,28,11,11)]
    pass

def test_timetable_twoDates_twoTimes():
    #Test given 2 dates 2 times
    assert(timetable([date(2019,9,27), date(2019,9,30)], [time(14,10), time(10,30)])) == [datetime(2019,9,27,14,10), datetime(2019,9,27,10,30), datetime(2019,9,30,14,10), datetime(2019,9,30,10,30)]
    pass
