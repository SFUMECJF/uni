'''
    Main file that contains all busyness estimate
    data handling and model generation
'''
# import tasks to get them
from tasks import models as TaskModels
# get user models to reset all of their busyness_can_reply values
from django.contrib.auth import get_user_model

# Query set
from django.db.models import Q
import json
from django.http import JsonResponse
import datetime

# importing workload
from .nnwl import nnwl, predict
from .nnwl_main import main as nnwl_main

# Scheduling package and other misc requirements for scheduling
from apscheduler.schedulers.background import BackgroundScheduler
from django_apscheduler.jobstores import DjangoJobStore, register_events
from django.utils import timezone
from django_apscheduler.models import DjangoJobExecution
from apscheduler.triggers.cron import CronTrigger
import sys


# Main busyness function call
# Calls function to get taskData
# then passes taskData into processing to generate user data
# Passes userData into busyness function that will call ML model function
def Busyness(userId, busyness_response):
    # user task data
    # getting task data
    userTaskData = getUserTaskData(userId)

    # generating userData set based on taskData
    userData = processTaskData(userTaskData)

    # override with new data value
    userData['busyness'] = [int(busyness_response)]
    
    # calls ML model that returns busyness
    busyness = generateBusyness(userData)   

    return(busyness)

# Periotic update busyness model
# Run every sat @ 12AM based on latest data
def updateBusynessModelSchedule():
    scheduler = BackgroundScheduler()
    scheduler.add_jobstore(DjangoJobStore(), "default")
    # run this job sat @ 12AM
    scheduler.add_job(
            updateBusynessModel,
            trigger=CronTrigger(
                day_of_week="sat", hour="00", minute="00"
            ),  # Midnight on Monday, before start of the next work week.
            id="update_busyness_model",
            max_instances=1,
            replace_existing=True,
        )
    register_events(scheduler)
    isExistTable = False
    # make sure that table exists before running the scheduler
    try:
        from django.db import connection
        cursor = connection.cursor()
        cursor.execute('SELECT * FROM django_apscheduler_djangojob')
        cursor.close()
        isExistTable =True
    except Exception as e:
        print(e)

    # run if exists
    if isExistTable:
        try:
            print("Busyness interval update started...", file=sys.stdout)
            scheduler.start()
        except KeyboardInterrupt:
            print("Busyness interval shutdown successful", file=sys.stdout)
        scheduler.shutdown()

# updates the busyness model based on the total data of all users
def updateBusynessModel():
    # database task data    
    totalTaskData = getTotalTaskData()
    totalData = processTaskData(totalTaskData)

    # updating the model
    nnwl(totalData)
    print("Updated busyness model")

    # resetting all users busyness_can_reply values to true
    get_user_model().objects.filter(busyness_can_reply=False).update(busyness_can_reply=True)

# Provided a user id, will get all tasks associated with that user
def getUserTaskData(userId):
    query = Q()
    query |= Q(assigned_to=userId)
    queryset = TaskModels.Task.objects.filter(query).values()
    return list(queryset)

# gets entire task table
def getTotalTaskData():
    return list(TaskModels.Task.objects.filter(Q()).values())

# processes the data and returns 5 main points of return
# Total tasks
# deadlines this week
# no. of in progress
# no of high priority
# no completed in the week
def processTaskData(taskData):
    # Initiating counters that will be needed during processing of data
    # total tasks is implied to be the length of the array of objects
    totalTasks = 0
    deadlines = 0
    inProgress = 0
    highPriority = 0
    completed = 0

    # function to check whether or not the deadline is within the COMING week
    def checkWithinComingWeek(x):
        d = datetime.datetime.strptime(x.strftime('%Y-%m-%d %H:%M:%S'), '%Y-%m-%d %H:%M:%S') 
        now = datetime.datetime.now()
        # less than or equal to 7 days
        return (d - now).seconds < 604800
        
    # function to check whether or not the deadline is within the LAST week  
    def checkWithinLastWeek(x):
        d = datetime.datetime.strptime(x.strftime('%Y-%m-%d %H:%M:%S'), '%Y-%m-%d %H:%M:%S') 
        now = datetime.datetime.now()
        # less than or equal to 7 days
        return (now - d).seconds <= 604800

    # loop to process data
    # will check for due dates, high priorities and in_progress
    for task in taskData:
        if checkWithinLastWeek(task['created_date']):
            totalTasks += 1
        if task['due_date'] is not None: 
            if (checkWithinComingWeek(task['due_date'])):
                deadlines += 1
        # counts tasks that are high priority but not have been completed
        if task['priority'] == 'High' and task['state'] != 'C':
            highPriority += 1
        # counts all tasks that are in progress currently
        if task['state'] == 'IP':
            inProgress += 1
        # counts tasks that have been completed and have created in the last week
        if task['state'] == 'C' and checkWithinLastWeek(task['completed_date']):
            completed += 1
        
    # create userData dictionary that matches machine learning data struct set
    # to return back to the main busyness function
    usersData = {
        "usersData" : [[totalTasks, deadlines, inProgress, highPriority, completed]],
        "busyness" : [3]
    }

    return (usersData)

# placeholder function to call the machine learning model
# right now returns 100 every time for continual 100% busyness
def generateBusyness(userData):
    return (predict(userData))
