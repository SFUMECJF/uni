# A simple Webserver by John Dao z5258962
from socket import *
import sys

if (len(sys.argv) > 2):
    raise ValueError ("Improper usage")

port = int(sys.argv[1])

serverSocket = socket(AF_INET, SOCK_STREAM)

# binds port onto local host and creates server socket
serverSocket.bind(('127.0.0.1', port))

# Enable server to listen for connection requests
serverSocket.listen(1)
print("Webserver on 127.0.0.1:" + str(port) + " is ready to recieve transmission\n")

while (1):
    # attempts to get data from client
    connectionSocket, addr = serverSocket.accept()
    message = connectionSocket.recv(1024)

    try:
        filename = message.decode().split(" ")[1][1:]
        with open(filename,'rb') as file:
            data = file.read()
            file.close()
        # file successfully recieved
        connectionSocket.send(("HTTP/1.1 200 OK \r\n").encode())

        # sending data after getting its type
        if 'png' in str(filename):
            connectionSocket.send(b'Content-Type: image/png \r\n\r\n')
        else:
            connectionSocket.send(b'Content-Type: image/png \r\n\r\n')
        connectionSocket.send(data)
        connectionSocket.close()

    except IOError:
        # Error wrong file/file not found
        connectionSocket.send(("HTTP/1.1 404 File Not Found \r\n").encode())
        connectionSocket.send("Content-Type: text/html \r\n\r\n".encode())
        connectionSocket.send("<html><h1>404 File Not Found Try Again with the an existing filetype HTML or PNG</h1></html>".encode())
        connectionSocket.close()
    