# pylint: disable= C0103, C0303, W0601, R0902, C0115, C0301, W0602, W0603, W0404, W0611, W0612, W0613, W0703, W0621, W0631, E0602, R0912
#Same pylint disables as server.py

"""
Data structure for message and messages data. 
Created as a class structure with individual functions.
Written by z5258962, z5211275 beginning Oct. 2019.
"""

import time
import jwt

class Message():
    id = -1
    @staticmethod
    def get_new_id():
        Message.id += 1
        return Message.id
        
    def __init__(self, channel_id, message):
        #Locally initialised variables
        self.message_id = Message.get_new_id()
        self.u_id = 0
        self.message = message
        self.time_created = 0
        self.time_sent = 0
        self.channel_id = channel_id
        #Variables pulled from outer sources
        self.reacts = []
        self.is_pinned = False     

    def get_message_id(self):
        return self.message_id

    def get_u_id(self):
        return self.u_id

    def get_message(self):
        return self.message

    def get_time_created(self):
        return self.time_created

    def get_time_sent(self):
        return self.time_sent

    def get_channel_id(self):
        return self.channel_id

    def get_reacts(self):
        return self.reacts

    def get_is_pinned(self):
        return self.is_pinned

    def set_u_id(self, u_id):
        self.u_id = u_id

    def set_message(self, message):
        self.message = message

    def set_time_created(self, time_created):
        self.time_created = time_created

    def set_time_sent(self, time_sent):
        self.time_sent = time_sent

    def set_channel_id(self, channel_id):
        self.channel_id = channel_id

    def add_react(self, react):
        self.reacts.append(react)

    def set_is_pinned(self, is_pinned):
        self.is_pinned = is_pinned
        