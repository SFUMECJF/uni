'''
    Return structure for REST API specifically for taskitems.
    Built via Django's rest framework. Refer to documents at:
    https://www.django-rest-framework.org/
'''
from rest_framework import serializers
from tasks.models import Task

# Task Item API returns structure
# Ordered by deadline (refer tasks model @ tasks/models.py)
class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'title', 'summary', 'state', 'created_date',
                  'due_date', 'completed_date', 'created_by', 'assigned_to', 'is_read', 'task_tag', 'priority', 'story_points']
