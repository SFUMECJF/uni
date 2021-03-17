# pylint: disable= C0103, C0303, W0601, R0902, C0115, C0301, W0602, W0603, W0404, W0611, W0612, W0613, W0703, W0621, W0631, E0602, R0912
#Same pylint disables as server.py

"""
Created on Mon Sep 30 14:19:43 2019

@author: z5211275
"""
import time
import jwt

class Channel:
    id = -1
    @staticmethod
    def get_new_id():
        Channel.id += 1
        return Channel.id

    def __init__(self, name, is_public):
        #Locally initialised variables
        self.channel_id = Channel.get_new_id()
        #Variables pulled from outer sources
        self.name = name
        self.owner_members = []
        self.members = []
        self.users = []
        self.messages = []
        self.is_public = is_public
        self.standup = None

    def set_name(self, name):
        self.name = name

    def add_owner(self, owner):
        self.owner_members.append(owner)

    def add_member(self, member):
        self.members.append(member)

    def add_user(self, user):
        self.users.append(user)

    def add_message(self, message):
        self.messages.append(message)

    def set_is_public(self, is_public):
        self.is_public = is_public

    def set_standup(self, standup):
        self.standup = standup

    def get_channel_id(self):
        return self.channel_id

    def get_name(self):
        return self.name

    def get_owner_members(self):
        return self.owner_members

    def get_members(self):
        return self.members

    def get_users(self):
        return self.users

    def get_messages(self):
        return self.messages

    def get_is_public(self):
        return self.is_public

    def get_standup(self):
        return self.standup

    def delete_owner(self, user):
        self.owner_members.remove(user)

    def delete_member(self, user):
        self.members.remove(user)

    def delete_user(self, user):
        self.users.remove(user)
