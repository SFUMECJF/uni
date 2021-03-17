# COMP3331 Assignment source code. Forum server and client
# for COMP3331 20T3
# By John Dao z5258962 
# created November 2020
# Please read report.pdf before preceeding to read source code

# This file is the Client
# usage: python3 client.py [IP address] [PORT]

# necessary imports
import os
import sys
from socket import *
import time
import json
import threading

# custom helper input
import requestHandler as helper

# filled out when successfully logged in
userData = {
    'username' : '',
    'password' : ''
}

# all commands and their execs
commands = {
    "LST" : "helper.requestLST(soc, userData)",
    "CRT" : "helper.requestCRT(userInput.split()[1], soc, userData)",
    "MSG" : "helper.requestMSG(userInput[4:], userData, soc)",
    "RDT" : "helper.requestRDT(userInput.split()[1], userData, soc)",
    "DLT" : "helper.requestDLT(userInput.split()[1], userInput.split()[2], userData, soc)",
    "EDT" : "helper.requestEDT(userInput[4:], userData, soc)",
    "RMV" : "helper.requestRMV(userInput.split()[1], userData, soc)",
    "XIT" : "helper.requestXIT(userData, soc)",
    "SHT" : "helper.requestSHT(userInput.split()[1], userData, soc)",
    "UPD" : "helper.requestUPD(userInput[4:], userData, soc)",
    "DWN" : "helper.requestDWN(userInput[4:], userData, soc)"
}

# main filter for client sending requests to TCP server on
# established thread
def requestHandler(soc):
    while True:
        
        request = {}
        userInput = input('Enter one of the following commands below: CRT, MSG, DLT, EDT, LST, RDT, UPD, DWN, RMV, XIT, SHT.\n>')
        # not an existing command
        if userInput.split()[0] not in commands:
            print ('Invalid Command')
        # 1 argument commands
        elif len(userInput.split()) != 1 and userInput.split()[0] in ('LST'):
            print ('Incorrect usage for', userInput.upper().split()[0])
        # 2 argument commands
        elif len(userInput.split()) != 2 and userInput.split()[0] in ('CRT', 'RDT', 'RMV', 'SHT'):
            print ('Incorrect usage for', userInput.split()[0])
        elif len(userInput.split()) != 3 and userInput.split()[0] in ('DLT'):
            print ('Incorrect usage for', userInput.split()[0])
        # MSG must be more than 2 args. 
        elif len(userInput.split()) <= 2 and userInput.split()[0] in ('MSG', 'UPD', 'DWN'):
            print ('Incorrect usage for', userInput.split()[0])
        # EDT must be more than 3 args.
        elif len(userInput.split()) <= 3 and userInput.split()[0] in ('EDT'):
            print ('Incorrect usage for', userInput.split()[0])
        
        # correct commands
        # client exit
        elif userInput == 'XIT':
            print ('Now disconnecting due to client request')
            exec(commands[userInput.split()[0]])
            break
        # shutdown
        elif userInput.split()[0] == 'SHT':
            if helper.requestSHT(userInput[4:], userData, soc):
                break
        else:
            exec(commands[userInput.split()[0]])

    # exit true
    return True

# handles user login via json message
def loginHandler(soc):
    # user auth input
    username = input('Enter username: ')

    # json formation for send
    request = { 
        'username' : username,
        'user' : username,
        'type' : 'auth'
    }

    # send to tcp for response
    soc.send(bytes(json.dumps(request), encoding='utf-8'))
    codedResponse = soc.recv(1024)
    response = json.loads(codedResponse.decode('utf-8'))

    # checks to see if user is already logged in or is new user.
    # recursively calls login handler again to reattempt
    password = ''
    if response['type'] == 'a':
        print ('User already logged in')
        loginHandler(soc)
    elif response['type'] == 'n':
        password = input('Enter new password: ')
    else:        
        password = input('Enter password: ')
    
    # sends password
    request['password'] = password
    soc.send(bytes(json.dumps(request), encoding='utf-8'))
    # requesting response from server and deciphering whether 
    # the user entered credentials were successful.
    codedResponse = soc.recv(1024)
    response = json.loads(codedResponse.decode('utf-8'))

    # the response was successful
    if response['statusCode'] == 200:
        # new user login
        if response['type'] == 'n':
            print ('Created new user', request['username'], 'Welcome to the forum')
        # auth login
        elif response['type'] == 's':
            print ('Login Successful, welcome to the forum')
        userData['username'] = request['username']
        userData['password'] = request['password']
    # incorrect login credentials
    else:
        # wrong password
        if response['type'] == 'p':
            print ('Invalid password')
            loginHandler(soc)
            
# function to allow for possible simultanenous connection closure
# blocked by input() not getting out of the way
def testDead(soc):
    while True:
        try:
            codedRequest = soc.recv(1024)
            request = json.loads(codedRequest.decode('utf-8'))
            if request['statusCode'] == -1:
                print ("EXITING")
                sys.exit()
        except timeout:
            pass

# handles new client connection
def connectHandler(serverIP, serverPort):
    # opens socket and connects to TCP server via TCP connection (connect())
    soc = socket(AF_INET, SOCK_STREAM)
    soc.connect((serverIP, serverPort))
    soc.settimeout(0.6)
    # attempts to initialise login password connection to server
    loginHandler(soc)

    # threads to allow for possible simultanenous connection closure
    # blocked by input() not getting out of the way
    #thread = threading.Thread(target=testDead, args=(soc,), daemon= True)
    #thread.start()

    # if login is successful, the connection is authed
    # Requests can now be sent over TCP
    disconnecting = False
    while not disconnecting:
        disconnecting = requestHandler(soc)
    
    print ('Connection closed')
    soc.close()


# function starter
if __name__ == '__main__' :
    if len(sys.argv) != 3 :
        print ('incorrect usage. Correct usage: python3 client.py [IP address] [PORT]')
        exit()

    # initialise the connection with the TCP server
    serverIP = sys.argv[1]
    serverPort = int(sys.argv[2])
    connectHandler(serverIP, serverPort)
