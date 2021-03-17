# Made for comp3331. PingClient.py is specified to send 15 ping requests to a server given in as an arguement.
# By John Dao z5258962

# imports
from socket import *
import time
from statistics import mean
import sys

# wrong usage. Should only have 3 total args
if (len(sys.argv)) < 3:
    raise ValueError("Improper usage")

host = sys.argv[1]
port = int(sys.argv[2])

clientSocket = socket(AF_INET, SOCK_DGRAM)

# UDP client startingsequence at 3331
seqNumb = 3331

# retrieve 15 pings
totalPings = 0
rtt = []
while (totalPings < 15):
    totalPings+= 1
    # ping msg
    startPing = time.time() * 1000
    message = "PING {0} {1}".format(seqNumb,str(startPing))

    # creates clientsocket and sets timeout to max 600ms.
    clientSocket.setblocking(0)
    clientSocket.sendto(message.encode('utf-8'),(host, port))
    clientSocket.settimeout(0.6)

    # attempts to get response from PingServer
    try:
        modifiedMessage, serverAddress = clientSocket.recvfrom(2048)
        endPing = time.time() * 1000
        duration = endPing - startPing
        rtt.append(duration)
        print(f'Ping to {host}, seq = {seqNumb}, rtt = {int(duration)} ms')
    except timeout:
        # special timeout response
        print(f'Ping to {host}, seq = {seqNumb}, time out')
    seqNumb += 1

# getting min max and avg and printing
if len(rtt) > 0 :
    print ('Minimum rtt is: ' + str(min(rtt)) + '\nMaximum of rtt is: ' + str(max(rtt)) + '\naverage rtt is: ' + str(mean(rtt)))
