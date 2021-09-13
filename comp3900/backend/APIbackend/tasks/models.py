"""
    Defines schema for the models needed.
    Models are utilised to get data from database.
    You can treat them as 'tables' in SQL.
"""
from django.db import models
from django.db import DEFAULT_DB_ALIAS, models
from django.conf import settings
import datetime
from django.urls import reverse

# States for tasks
# 4 states
STATE_CHOICES = [('NS', 'Not Started'), ('IP', 'In Progress'),
                 ('B', 'Blocked'), ('C', 'Completed')]

# Item model (Primary keys are automatically generated)
# Deadline is the ending date for the task
# Title is the name of task
# Summary is the description of the task
# State refers to the state_choices and is the state of the task
# is_read is a read script (not utilised for there for possible implementation)
# task_tag is the sorting tag (not utilised but there for possible implementation)
# story_points is weighting of how hard a task is
# Created by is the user associated with the request token
# assigned to is defaulted to same user with the token
class Task(models.Model):
    title = models.CharField(max_length=100, blank=True, default='')
    summary = models.CharField(max_length=5000, blank=True, default='')
    state = models.CharField(choices=STATE_CHOICES,
                             default='NS', max_length=100)
    created_date = models.DateTimeField(auto_now_add=True)
    due_date = models.DateTimeField(blank=True, null=True)
    completed_date = models.DateTimeField(blank=True, null=True)
    
    is_read = models.BooleanField(blank=False, default=False)
    task_tag = models.CharField(max_length=20, blank=True)
    priority = models.CharField(max_length=20, blank=True)
    story_points = models.CharField(max_length=3, blank=True)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        null=True,
        blank=True,
        related_name="todo_created_by",
        on_delete=models.CASCADE,
        auto_created=True
    )
    assigned_to = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        blank=True,
        null=True,
        related_name="todo_assigned_to",
        on_delete=models.CASCADE,
    )

    # Auto-set the Task creation / completed date
    def save(self, **kwargs):
        # If Task is being marked complete, set the completed_date
        # if self.completed:
        #     self.completed_date = datetime.datetime.now()
        super(Task, self).save()

# order by created_date first as deadline is (possibly) added later
class Meta:
    ordering = ['created_date']
