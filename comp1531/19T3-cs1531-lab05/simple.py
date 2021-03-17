"""
Created on the 14/10/2019
by John Dao z5258962 
"""

from flask import Flask, request
from json import dumps

randomDict = {
        "names" : []
        }

simple = Flask(__name__)


@simple.route("/name/add", methods = ["POST"])

def addName():
    global name
    name = request.form.get('name')
    randomDict["names"].append(name)   
    return dumps({})

@simple.route("/names", methods = ["GET"])

def getName():

    return dumps(randomDict)

@simple.route("/name/remove", methods = ["DELETE"])

def removeName():
    global name
    name = request.form.get('name')
    for x in randomDict["names"]:
        if x is name:
            randomDict.remove(x)
    
    return dumps({})

if __name__ == "__main__":
    simple.run()