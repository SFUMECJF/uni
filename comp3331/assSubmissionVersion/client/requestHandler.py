# COMP3331 Assignment source code. Forum server and client
# for COMP3331 20T2
# By John Dao z5258962 
# created November 2020

# This is the main helper file for the client in sending requests to
# the TCP server

# imports
import sys
import os
import threading
from socket import *
import time
import json

# function that handles LST command
def requestLST(soc, userData):
    request = {
        'type': 'LST',
        'user' : userData['username']
    }

    response = sendRequest(request, soc)

    # 200 for successful return. else its empty (404)
    if response['statusCode'] != 200:
        print ('No threads to list')
    # 200 response
    else:
        for key in response['threads']:
            print (key)

# function to request the creation of a new thread
def requestCRT(threadName, soc, userData):
    request = {
        'type' : 'CRT',
        'name' : threadName,
        'user' : userData['username']
    }

    response = sendRequest(request, soc)

    # returns 200 if successful. 403 forbidden else (e.g exists)
    if response['statusCode'] != 200:
        print ('Cannot create new thread with name ', threadName, ". Thread already exists")
    else:
        print ('Thread', threadName, 'created')

# function to handle sending messages
def requestMSG(msgString, userData, soc):
    request = {
        'threadName' : msgString.split(' ', 1)[0],
        'messageString' : msgString.split(' ', 1)[1],
        'user' : userData['username'],
        'type' : 'MSG'
    }

    response = sendRequest(request, soc)

    # handles status codes
    if response['statusCode'] != 200:
        print ('Message could not be posted. Thread does not exist')
    else:
        print ('Message posted to', msgString.split(' ', 1)[0], "thread")

# function to handle the request to edit message
def requestEDT(edtString, userData, soc):
    print (edtString)
    request = {
        'threadName' : edtString.split(' ', 2)[0],
        'messageNumber' : int(edtString.split(' ', 2)[1]),
        'messageString' : edtString.split(' ', 2)[2],
        'type' : 'EDT',
        'user' : userData['username']
    }

    response = sendRequest(request, soc)

    if response['statusCode'] == 200:
        print ('Message has been edited')
    elif response['statusCode'] == 404:
        print ('Thread or message does not exist')
    elif response['statusCode'] == 401:
        print ('Message belongs to another user and cannot be edited')


# function to handle RDT command sent to server
def requestRDT(threadName, userData, soc):
    request = {
        'threadName' : threadName,
        'user' : userData['username'],
        'type' : 'RDT'
    }

    response = sendRequest(request, soc)

    # more status codes Appropriate prints as a result
    if response['statusCode'] != 200 or len(response['threadMessages']) <= 1:
        print ('Thread', threadName, 'does not exist or does not have any messages')
    else:
        for message in response['threadMessages'][1:]:
            print (message.rstrip())

# function to handle DLT command
def requestDLT(threadName, messageNumber, userData, soc):
    request = {
        'threadName' : threadName,
        'messageNumber' : messageNumber,
        'user' : userData['username'],
        'type' : 'DLT'
    }
    response = sendRequest(request, soc)

    # status codes from response
    if response['statusCode'] == 200:
        print ('Message has been deleted')
    elif response['statusCode'] == 404:
        print ('Thread or message does not exist')
    elif response['statusCode'] == 401:
        print ('Message belongs to another user and cannot be deleted')

# handles the send of a request to close thread
def requestRMV(threadName, userData, soc):
    request = {
        'threadName' : threadName,
        'user' : userData['username'],
        'type' : 'RMV'
    }
    response = sendRequest(request, soc)

    # status codes from response
    if response['statusCode'] == 200:
        print ('Thread has been removed')
    elif response['statusCode'] == 404:
        print ('Thread or not exist')
    elif response['statusCode'] == 401:
        print ('Thread belongs to another user and cannot be deleted')

# handles the shutdown request for server
def requestSHT(adminPassword, userData, soc):
    request = {
        'adminPassword' : adminPassword,
        "type" : 'SHT',
        'user' : userData['username']
    }

    response = sendRequest(request, soc)
    if response['statusCode'] == 401:
        print ('Access declined. Incorrect admin password')
        return False
    else:
        print ('Server shutting down. Disconnecting')
        return True

# sends a request to let server know of user disconnect
def requestXIT(userData, soc):
    request = {
        'user' : userData['username'],
        "type" : 'XIT'
    }
    soc.send(bytes(json.dumps(request), encoding='utf-8'))

# sends file for upload
def requestUPD(updString, userData, soc):
    if not os.path.exists(updString.split(' ', 1)[1]):
        print ('FILE DOESNT EXIST IN CLIENT DIRECTORY')
        return
    
    request = {
        'user' : userData['username'],
        'threadName' : updString.split(' ', 1)[0],
        'fileName' : updString.split(' ', 1)[1],
        'fileSize' : os.path.getsize(updString.split(' ', 1)[1]),
        'type' : 'UPD'
    }
    
    response = sendRequest(request, soc)

    # thread cannot be found 404
    if response['statusCode'] != 100:
        print ('Thread does not exist, Upload cannot be executed')
    # begin upload after 100 continue
    else:
        # sends the file in packets. Shuts down when finished
        upFile = open (updString.split(' ', 1)[1], 'rb')
        file = upFile.read(1024)
        while file:
            soc.send(file)
            file = upFile.read(1024)
        codedResponse = soc.recv(1024)
        response = json.loads(codedResponse.decode('utf-8'))
        if response['statusCode'] != 200:
            print("Upload failed")
        else:
            print (updString.split(' ', 1)[1], 'uploaded to', updString.split(' ', 1)[0], 'thread')

# function to handle DWN requests
def requestDWN(dwnString, userData, soc):
    request = {
        'user' : userData['username'],
        'threadName' : dwnString.split(' ', 1)[0],
        'fileName' : dwnString.split(' ', 1)[1],
        'type' : 'DWN'
    }

    response = sendRequest(request, soc)
    
    if response['statusCode'] != 200:
        print ("File not in thread")
    else:
        downFile = open (request['fileName'], 'wb')
        file = soc.recv(1024)

        # loop to get all data packets based on filesize
        total = 0
        while file:
            total += len(file)
            downFile.write(file)
            # file sent correctly
            if total == response['fileSize']:
                request['statusCode'] = 200
                print (request['fileName'], 'downloaded successfully')
                break
            # file sent incorrectly. 500 internal error
            elif total > response['fileSize']:
                request['statusCode'] = 500
                print (request['fileName'], 'downloaded failed')
                break
            file = soc.recv(1024)
        
        # message to verify status of server
        soc.send(bytes(json.dumps(request), encoding='utf-8'))


# sends request to server and returns response
def sendRequest(request, soc):
    # requests server to add retrieve messages
    soc.send(bytes(json.dumps(request), encoding='utf-8'))

    codedResponse = soc.recv(1024)
    response = json.loads(codedResponse.decode('utf-8'))

    return response

