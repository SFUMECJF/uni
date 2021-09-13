'''
    Defining endpoints for API.
    Built via Django's rest framework. Refer to documents at:
    https://www.django-rest-framework.org/
'''
from django.shortcuts import render

# Task items requirement imports
from tasks.models import Task
from tasks.serializers import TaskSerializer
from rest_framework import viewsets
from rest_framework import generics
from rest_framework import permissions
from django.db.models import Q
import json

# Enables ability to create, view, modify or delete specific task items
class TaskDetailViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    # Require that a valid token is provided with the request to access
    #permission_classes = [permissions.IsAuthenticated]

    def create(self, request):
        request.data.update({"created_by": self.request.user.id})

        if "assigned_to" not in request.data:
            request.data.update({"assigned_to": self.request.user.id})

        return super().create(request)

    def get_queryset(self):
        query = Q()
        query |= Q(created_by=self.request.user)
        query |= Q(assigned_to=self.request.user)
        return Task.objects.filter(query)


# Get a list of tasks items
class TaskList(generics.ListAPIView):
    serializer_class = TaskSerializer
    # permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """
        Optionally restricts the returned task items to a given user,
        by filtering against the query parameters in the URL.
        """
        # get the params of the query search from url of request
        searched_id = self.request.query_params.get('id')
        searched_title = self.request.query_params.get('title')
        searched_summary = self.request.query_params.get('summary')
        searched_state = self.request.query_params.get('state')
        searched_created_by = self.request.query_params.get('created_by')
        searched_assigned_to = self.request.query_params.get('assigned_to')
        searched_deadline = self.request.query_params.get('deadline')

        query = Q()

        #query |= Q(created_by=self.request.user.id)
        #query |= Q(assigned_to=self.request.user.id)

        # search id
        if searched_id is not None:
            query &= Q(id=searched_id)
        
        # title search
        if searched_title is not None:
            query &= Q(title__icontains=searched_title)

        # summary search
        if searched_summary is not None:
            query &= Q(summary__icontains=searched_summary)

        # state search
        if searched_state is not None:
            query &= Q(state=searched_state)

        # created by search id
        if searched_created_by is not None:
            query &= Q(created_by=searched_created_by)

        # searched assigned to id
        if searched_assigned_to is not None:
            query &= Q(assigned_to=searched_assigned_to)

        # deadline search
        if searched_deadline is not None:
            query &= Q(due_date__icontains=searched_deadline)

        # queryset run with filter of query
        queryset = Task.objects.filter(query)

        return queryset
