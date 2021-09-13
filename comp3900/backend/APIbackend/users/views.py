from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from django.shortcuts import render
from rest_framework import mixins, viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import SignupSerializer, UserSerializer
from django.contrib.auth import get_user_model
from rest_framework import generics, viewsets
from django.db.models import Q, query
import json
from django.http import HttpResponse

# importing busyness function to run for user retrieve data
from .busyness import Busyness

"""
Returns a list of users
Optionally restricts the returned task items to a given user,
by filtering against the query parameters in the URL.
*This can also be changed to accept the fields from the request body*
"""
class UserList(generics.ListAPIView):
    # Queries the database based on a custom model to get all users
    serializer_class = UserSerializer

    # Gets all users
    def get_queryset(self):
        # Searched queries
        searched_username = self.request.query_params.get('username')
        searched_email = self.request.query_params.get('email')
        searched_token = self.request.query_params.get('token')

        if searched_token is not None:
            return [Token.objects.get(key=searched_token).user]

        query = Q()
        if searched_username is not None:
            query |= Q(username=searched_username)

        if searched_email is not None:
            query |= Q(email=searched_email)

        queryset = get_user_model().objects.filter(query)

        return queryset

    # override list to return busyness in queryset return
    def list(self, request, *args, **kwargs):
        try:
            # get queryset
            queryset = self.get_queryset()
            return_value = UserSerializer(queryset,many=True,context={'request': self.request}).data
            
            # Loop through all users to inject busyness number
            for user in return_value:
                user['busyness'] = Busyness(user['id'], user['busyness_response'])

            # return in a response 
            return Response(return_value, status=200)
        except Exception as E:
            return Response({'error': "could not run queryset"}, status=408)

# User details
# GET, PUT, POST, DELETE
# Access and manipulation for user data
class UserDetailViewSet(viewsets.ModelViewSet):
    # Queries the database based on a custom model to get all users
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer

    # override retrieve to insert busyness estimate
    def retrieve(self, request, *args, **kwargs):
        # do your customization here
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        user_data = serializer.data
        user_data["busyness"] = Busyness(user_data["id"], user_data["busyness_response"])
        return Response(user_data)

# Signup return values
# POST
# Signup post new data for new user
class SignupViewSet(mixins.CreateModelMixin,
                    viewsets.GenericViewSet):
    queryset = get_user_model().objects.all()
    permission_classes = [AllowAny]
    serializer_class = SignupSerializer

# Return 'very secure' token key
class CustomAuthToken(ObtainAuthToken):
    
    # Post API endpoint definition
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'first_name' : user.first_name,
            'last_name' : user.last_name,
            'id' : user.id
        })
