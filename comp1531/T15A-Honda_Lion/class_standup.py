# pylint: disable= C0103, C0303, W0601, R0902, C0115, C0301, W0602, W0603, W0404, W0611, W0612, W0613, W0703, W0621, W0631, E0602, R0912
#Same pylint disables as server.py

"""
Created on Sun Nov 3 14:19:43 2019

@author: z5211275
"""
import pickle
import time
import jwt

class Standup:
    
    def __init__(self, channel_id, length, start_member):
        self.channel_id = channel_id
        self.length = length
        self.messages = []
        self.is_active = False
        self.time_finish = None
        self.start_member = start_member

    def set_is_active(self, is_active):
        self.is_active = is_active

    def set_time_finish(self, time_finish):
        self.time_finish = time_finish

    def add_message(self, message):
        self.messages.append(message)

    def get_channel_id(self):
        return self.channel_id

    def get_length(self):
        return self.length

    def get_messages(self):
        return self.messages

    def get_is_active(self):
        return self.is_active

    def get_time_finish(self):
        return self.time_finish

    def get_start_member(self):
        return self.start_member
    