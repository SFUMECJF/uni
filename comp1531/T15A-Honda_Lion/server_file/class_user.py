# pylint: disable= C0103, C0303, W0601, R0902, R0904, C0115, C0301, W0602, W0603, W0404, W0611, W0612, W0613, W0703, W0621, W0631, E0602, R0912
#Same pylint disables as server.py

"""
Created on Tue Oct 29 16:19:43 2019

@author: z5211275
"""
import pickle
import time
import jwt

class User:
    id = 0
    @staticmethod
    def get_new_id():
        # Start at u_id = 1
        User.id += 1
        return User.id
    
    def __init__(self, email, password):
        # Get new u_id, email, password
        self.u_id = User.get_new_id()
        self.email = email
        self.password = password
        # Set user first as blank slate
        self.name_first = ''
        self.name_last = ''
        self.handle_str = self.name_first + self.name_last
        self.token = None
        self.resetcode = ''
        self.channel_list = []
        self.profile_img_url = ''
        self.permission_id = 1

    def generate_token(self):
        payload = {'u_id': self.u_id,
                   'timestamp':time.time(),
                   'is_login':True,
                   }
        encoded = jwt.encode(payload, 'activate', algorithm='HS256')
        return encoded.decode('utf-8')

    def invalidate_token(self):
        decoded = jwt.decode(self.token, 'activate', algorithm='HS256')
        decoded['is_login'] = False
        encoded = jwt.encode(decoded, 'activate', algorithm='HS256')
        return encoded.decode('utf-8')

    def get_u_id(self):
        return self.u_id

    def get_email(self):
        return self.email

    def get_password(self):
        return self.password

    def get_name_first(self):
        return self.name_first

    def get_name_last(self):
        return self.name_last

    def get_handle_str(self):
        return self.handle_str

    def get_token(self):
        return self.token

    def get_resetcode(self):
        return self.resetcode

    def get_channel_list(self):
        return self.channel_list

    def get_profile_img_url(self):
        return self.profile_img_url

    def get_permission_id(self):
        return self.permission_id

    def set_email(self, email):
        self.email = email

    def set_password(self, password):
        self.password = password

    def set_name_first(self, first_name):
        self.name_first = first_name

    def set_name_last(self, last_name):
        self.name_last = last_name

    def set_handle_str(self, handle_str):
        self.handle_str = handle_str

    def set_resetcode(self, resetcode):
        self.resetcode = resetcode

    def set_permission_id(self, permission_id):
        self.permission_id = permission_id

    def add_channel(self, channel):
        self.channel_list.append(channel)

    def set_profile_img_url(self, profile_img_url):
        self.profile_img_url = profile_img_url

    def find_user_from_password(self, users):
        # Return False if no passwords match, True if a password matches
        match_password = False
        for u in users:
            if self.password == u.password:
                match_password = True
        return match_password

    def find_user_from_email(self, users):
        # Return False if no emails match, True if an email matches
        match_email = False
        for u in users:
            if self.email == u.email:
                match_email = True
        return match_email

def find_user_from_u_id(u_id, users):
    # If given u_id matches with another users u_id, return the matched user
    for u in users:
        if u_id == u.u_id:
            return u
    
def find_u_id_from_token(token):
    decoded = jwt.decode(token, 'activate', algorithm='HS256')
    return decoded['u_id']
    