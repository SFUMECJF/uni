# COMP3331 Assignment source code. Forum server and client
# for COMP3331 20T2
# By John Dao z5258962 
# created November 2020

# This file is the TCP server
# usage : python3 server.py [server port] [admin_psswd]

# necessary imports
import sys
import os
from _thread import *
import threading
from socket import *
import time
import json
import clientHandler as helper

# stores all users and their associated passwords
users = {}

# stores all active users
activeUsers = []

# stores all cons
clients = set()

# list to store thread names
threads = []

# list to store file names
files = []

# tracks serverState and adminPassword
serverState = False
adminPsswd = ''

# handler for client requests
# recieves packet/json request from client and deciphers its type and executes
# the request
def clientHandler(con, address):
    global users
    global threads
    global activeUsers
    global serverState
    global adminPsswd
    global files
    while True:
        codedRequest = con.recv(1024)
        if not codedRequest:
            print ('user with address at', address[0], 'disconnected')
            break
        else :
            request = json.loads(codedRequest.decode('utf-8'))
        
        print (request['user'], 'issued', request['type'], 'command')
        # login request
        if request['type'] == 'auth':
            users, activeUsers = helper.handleAuth(request, con, users, activeUsers)
        # LST
        elif request['type'] == 'LST':
            helper.handleLST(threads, con)
        # CRT
        elif request['type'] == 'CRT':
            threads = helper.handleCRT(threads, request['name'], con, request['user'])
        # MSG
        elif request['type'] == 'MSG':
            helper.handleMSG(threads, request, con)
        # RDT
        elif request['type'] == 'RDT':
            helper.handleRDT(threads, request, con)
        # DLT
        elif request['type'] == 'DLT':
            helper.handleDLT(threads, request, con)
        # EDIT
        elif request['type'] == 'EDT':
            helper.handleEDT(threads, request, con)
        # RMV
        elif request['type'] == 'RMV':
            threads = helper.handleRMV(threads, request, con)
        # UPD
        elif request['type'] == 'UPD':
            files = helper.handleUPD(threads, request, files, con)
        # DWN
        elif request['type'] == 'DWN':
            helper.handleDWN(threads, request, files, con)
        # XIT
        elif request['type'] == 'XIT':
            activeUsers.remove(request['user'])
            print ("User %s exited" % (request['user']))
            if len(activeUsers) == 0:
                print ("waiting for clients")
        # SHT
        elif request['type'] == 'SHT':
            if request['adminPassword'] == adminPsswd:
                helper.sendResponse({'statusCode' : 200}, con)
                activeUsers.clear()
                print ("Server shutdown initiated by %s" % request['user'])
                serverState = False
                helper.handleSHT(threads, files)
                for c in clients:
                    helper.sendResponse({'statusCode' : -1}, c)
                    c.close()
                break
            else:
                print ("Server shutdown failed by %s due to incorrect password" % request['user'])
                helper.sendResponse({'statusCode' : 401}, con)

#handler for startup
def startupHandler(serverPort, adminPsswd):
    global serverState

    # begining starting of server on TCP socket.
    soc = socket(AF_INET, SOCK_STREAM)
    soc.bind(('localhost', serverPort))
    soc.settimeout(0.6)
    soc.listen(10)
    serverState = True

    print ('Server Initialised. Now awaiting client connection')

    # loop to accept client connections
    while serverState:
        try:
            con, address = soc.accept()
            print ('Client connected to server from address', address[0])
            clients.add(con)
            thread = threading.Thread(target=clientHandler, args=[con, address], daemon=True)
            thread.start()

        except timeout:
            pass
    
    soc.close()
    print ('Server shut down')
# main event starter
if __name__ == '__main__':
    if len(sys.argv) != 3:
        print ('incorrect usage. Correct usage: python3 server.py [server port] [admin_psswd]')
        exit()

    # getting all data required to start server.
    serverPort = int(sys.argv[1])
    adminPsswd = str(sys.argv[2])

    # in case that there is no credentials txt file
    if not os.path.exists('credentials.txt'):
        with open('credentials.txt', 'w'): pass

    # getting all credentials and putting them into dictionary
    # initialised starting credentials
    with open('credentials.txt', 'r+') as file:
        for user in file.readlines():
            userAndPassword = user.split(' ')
            users[userAndPassword[0]] = userAndPassword[1].strip()
    threads = []
    # begining startup for server
    startupHandler(serverPort, adminPsswd)
