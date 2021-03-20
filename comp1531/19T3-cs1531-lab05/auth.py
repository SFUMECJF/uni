"""
This program will allow for the creation of a user account
"""

from flask import Flask, request
from json import dumps

APP = Flask(__name__)

users = {'password' : '',
         'secret' : '',
         'token' : '',
       }

auth = Flask(__name__)

@auth.route('/user/create', methods = ['POST'])

def create_user():
    global password, secret, users
    password = request.form.get('password')
    secret = request.form.get('secret')
    users['password'] = password
    users['secret'] = secret
    users['token'] = 'example12345abcd'
    
    return dumps( {'token' : 'example12345abcd'
            })
    
@auth.route('/user/connect', methods = ['PUT'])

def connect_user():
    global password, users
    password = request.form.get('password')
    if password == users['password']:
        return dumps ({'token' : users['token']
                       })
    else:
        print (password)
        print(users['password'])
        raise ValueError('incorrect password')
        

@auth.route('/user/secret', methods = ['GET'])

def secret_user():
    global token, users
    token = request.form.get('token')
    if users['token'] == token:
        return dumps ({ 'secret' : users['secret']
                       })
    else :
        raise ValueError('invalid User')
        
        
if __name__ == '__main__':
    auth.run(debug = True)
