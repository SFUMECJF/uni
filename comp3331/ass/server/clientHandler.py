# COMP3331 Assignment source code. Forum server and client
# for COMP3331 20T3
# By John Dao z5258962 
# created November 2020
# Please read report.pdf before preceeding to read source code

# This file a helper file to hancle client requests

import sys
import os
import threading
from socket import *
import time
import json

# handles user authentication
# sends json of response in regards to username and password
def handleAuth(request, con, users, activeUsers):
    response = {
        'statusCode' : 200,
        'type' : ''
    }
    if request['username'] in activeUsers:
            response['statusCode'] = 401
            response['type'] = 'a'
            print (request['username'], 'already logged in')
            sendResponse(response, con)
            return users, activeUsers
    elif request['username'] not in users:
            response['type'] = 'n'
    
    # gets password 
    sendResponse(response, con)

    codedRequest = con.recv(1024)
    request = json.loads(codedRequest.decode('utf-8'))

    # sorts the login type and returns appropriate status code
    # 401 unauth if incorrect pass and 200 if ok
    # Also returns a type to determine the ok/not found error type
    if request['username'] in users:
        # successful login 200 ok s type
        if request['password'] == users[request['username']]:
            response['type'] = 's'
            print (request['username'], 'successful login')
            loginStatus = True
            # adds to list of active users
            activeUsers.append(request['username'])
        # unsuccessful login
        else:
            # incorrect password 401 unauthorized
            response['statusCode'] = 401
            response['type'] = 'p'
            print (request['username'], 'incorrect password')

    else: 
        # creates new user if user does not exist
        response['type'] = 'n'
        response['statusCode'] = 200
        print ("Created new user", request['username'])
        # writes the new user into the credentials.txt file for storage
        with open('credentials.txt', "a+") as file:
            file.write('\n%s %s' % (request['username'], request['password']))
        
        # adds new user to the dicationary of current users. 
        users[request['username']] = request['password']
        # adds new user to list of active users
        activeUsers.append(request['username'])

    sendResponse(response, con)
    return users, activeUsers

# handles the return of the list of threads
def handleLST(threads, con):
    response = {
        'statusCode' : 200
    }
    # if there are no threads, return 404 'not found' for any threads
    if not threads:
        response['statusCode'] = 404
    else:
        response['threads'] = threads
    sendResponse(response, con)

# handles the creation of new threads and returns to main database
def handleCRT(threads, threadName, con, creator):
    response = {
        'statusCode' : 200
    }

    # tries to create a thread. Returns 200 if success. 403 if exists dupe
    if threadName in threads:
        # forbidden duplicate record
        response['statusCode'] = 403
        print ('thread %s exists' % threadName)
    else:
        # creates new record
        # first string in thread will be the creator
        threads.append(threadName)
        with open(threadName, "w+") as thread:
            thread.write("%s\n" % (creator))
        print ('thread %s created' % threadName)
    
    sendResponse(response, con)
    return threads

# handles the posting of new messages to threads
def handleMSG(threads, request, con):
    response = {
        'statusCode' : 200
    }

    # thread doesn't exist
    if request['threadName'] not in threads:
        response['statusCode'] = 404
    
    # Adding new message onto existing thread.
    # first message starts at index 1 not 0 
    else:
        totalMessages = 0
        with open(request['threadName']) as file:
            messages = file.readlines()
            for message in messages:
                message = list(message)
                if message[0].isdigit():
                    totalMessages += 1
        msgString = str(totalMessages + 1)
        msgString += ' '
        msgString += request['user']
        msgString += ': '
        msgString += request['messageString']
        with open(request['threadName'], "a+") as thread:
            thread.write("%s\n" % (msgString))
        print ('Message posted to', request['threadName'], 'by', request['user'])
    
    sendResponse(response, con)
    return threads

# handles the editing of messages requested by a client
# very similar to DLT
def handleEDT(threads, request, con):
    response = {
        'statusCode' : 200
    }

    if request['threadName'] not in threads or int(request['messageNumber']) <= 0:
        response['statusCode'] = 404
        print ('message cannot be edited')
    else:
        # gets message to edit
        with open(request['threadName'], "r") as thread:
            messages = thread.readlines()
        toEdit = ''
        lineNumber = -1
        counter = 0
        for message in messages:
            if str(message.split()[0]) == str(request['messageNumber']):
                toEdit = message
                lineNumber = counter
                break
            else:
                ''.join(message)
            counter += 1
        
        # User is unauthorised
        if toEdit.split()[1][:-1] != request['user']:
            print ('user is unauthorised to edit this message')
            response['statusCode']  = 401
        # edits message by replacing the message with requested string
        else :
            messages[lineNumber] = ('%s %s: %s\n' % (request['messageNumber'], request['user'], request['messageString']))
            with open(request['threadName'], 'w+') as thread:
                thread.writelines(messages)
            print ("%s has edited a message" % (request['user']))
    sendResponse(response, con)

    return threads

# handles the request of RDT. Returns an array of strings if successful.
# else, returns error 404 not found
def handleRDT(threads, request, con):
    response = {
        'statusCode' : 200,
        'threadMessages' : []
    }

    if request['threadName'] not in threads:
        print ('Incorrect thread specified')
        response['statusCode'] = 404
    else:
        with open(request['threadName'], 'r') as thread:
            messages = thread.readlines()
        response['threadMessages'] = messages

    sendResponse(response, con)

# handles DLT request command
def handleDLT(threads, request, con):
    response = {
        'statusCode' : 200
    }

    # Checks if the requested message is valid. returns 404 otherwise
    if request['threadName'] not in threads or int(request['messageNumber']) <= 0:
        response['statusCode'] = 404
        print ('Message cannot be deleted')
    # Thread and message exists. Now testing to see if the delete is valid
    else:
        with open(request['threadName'], "r") as thread:
            messages = thread.readlines()

        toDelete = ''
        lineNumber = -1
        counter = 0
        for message in messages:
            if str(message.split()[0]) == str(request['messageNumber']):
                toDelete = message
                lineNumber = counter
                break
            else:
                ''.join(message)
            counter += 1

        # User is unauthorised
        if toDelete.split()[1][:-1] != request['user']:
            print (toDelete.split()[1])
            response['statusCode'] = 401
            print ('Message cannot be deleted by this user')
        # line doesn't exist
        elif lineNumber == -1:
            response['statusCode'] = 404
            print ('Message cannot be found in thread')
        # deletes message and increments all the subsequent numbers
        else:

            # remove the message
            messages.pop(lineNumber)
            newMessages = []
            newMessages.append(messages[0])
            # deincrement all subsequent messages 
            # starting from deleted line number
            for message in messages[lineNumber:]:
                message = list(message)
                if message[0].isdigit():
                    newNumb = int(message[0]) - 1
                    message[0] = str(newNumb)
                    newMessages.append(''.join(message))
                else:
                    newMessages.append(''.join(message))
            with open(request['threadName'], 'w') as thread:
                thread.writelines(newMessages)
            print ('Message deleted from %s' % request['threadName'])
    sendResponse(response, con)

# handles the request to remove a thread
def handleRMV(threads, request, con):
    response = {
        'statusCode' : 200
    }
    if request['threadName'] not in threads:
        response['statusCode'] = 404
    else:
        with open(request['threadName'], "r") as thread:
            messages = thread.readlines()

    # thread doesnt exist 404 not found
    if request['threadName'] not in threads:
        response['statusCode'] = 404
    else:
        # not auth to remove. 401 unauth
        
        if messages[0].rstrip() != request['user']:
            response['statusCode'] = 401
        # else is auth to remove. 200 ok
        else:
            threads.remove(request['threadName'])
            os.remove(request['threadName'])
            print ("%s removed" % request['threadName'])
    
    sendResponse(response, con)
    return threads

def handleUPD(threads, request, files, con):
    response = {
        'statusCode' : 100
    }

    # thread doesn't exist
    if request['threadName'] not in threads:
        response['statusCode'] = 404
    else:
        # request ok for upload 100 continue
        sendResponse(response, con)
        # recieves file in packets
        downFile = open (request['threadName'] + '-' + request['fileName'], 'wb')
        file = con.recv(1024)

        # loop to get all data packets based on filesize
        total = 0
        while file:
            total += len(file)
            downFile.write(file)
            # file sent correctly
            if total == request['fileSize']:
                response['statusCode'] = 200
                break
            # file sent incorrectly. 500 internal error
            elif total > request['fileSize']:
                response['statusCode'] = 500
                break
            file = con.recv(1024)
        
        # message to verify status of server
        sendResponse(response, con)

        # writing string into RDT stream for thread
        msgString = request['user']
        msgString += ' uploaded '
        msgString += request['fileName']
        with open(request['threadName'], "a+") as thread:
            thread.write("%s\n" % (msgString))
        print (request['user'],'uploaded file', request['fileName'], 'to', request['threadName'] )

    files.append(request['threadName'] + '-' + request['fileName'])
    return files

# handles executing downloads
def handleDWN(threads, request, files, con):
    response = {
        'statusCode' : 200
    }
    # searches if file exists
    searchFile = request['threadName'] + '-' + request['fileName']
    print(searchFile)
    # file not found in existing files
    if searchFile not in files:
        response['statusCode'] = 404
        print ("requested file not found")
    else:
        # file exists. Sends filesize to client to prepare for dwn
        response['fileSize'] = os.path.getsize(searchFile)

    sendResponse(response, con)
        
    # download prompt
    if response['statusCode'] == 200:
        upFile = open (searchFile, 'rb')
        file = upFile.read(1024)
        while file:
            con.send(file)
            file = upFile.read(1024)

        codedResponse = con.recv(1024)
        response = json.loads(codedResponse.decode('utf-8'))

        if response['statusCode'] != 200:
            print ('File failed to download')
        else:
            print ("%s downloaded from thread %s" % (response['fileName'], response['threadName']))

# deletes all associated files to prepare for shutdown
# removes all threads, files and the crendentials.txt file
# removing credentials because the spec said so
def handleSHT(threads, files):
    for thread in threads:
        os.remove(thread)
    for file in files:
        os.remove(file)
    
    os.remove('credentials.txt')

# sends encoded JSON response via TCP connection
def sendResponse(response, con):
    con.send(bytes(json.dumps(response), encoding='utf-8'))