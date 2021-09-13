from django.shortcuts import get_object_or_404

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status

from friendship.models import Friend, FriendshipRequest
from .utils import remove_friend

from users.utils import get_user_object

from friendships.serializers import (SentFriendRequestSerializer, ReceivedFriendRequestSerializer, FriendSerializer)
from users.models import CustomUser

import copy
#/receivedfriendrequests
class ReceivedFriendRequests(APIView):
    serializer_class = ReceivedFriendRequestSerializer
    lookup_field = 'id'

    # get friend request query search 
    def get_queryset(self):
        user = self.request.user
        return FriendshipRequest.objects.select_related('from_user', 'to_user').filter(
            to_user=user, rejected__isnull=True).all()

    # Gets a username
    def get_object(self):
        username = self.request.query_params.get('username', None)
        if username is None:
            raise Exception(missing_query_param="username")

        queryset = self.get_queryset()

        obj = get_object_or_404(queryset, from_user__username=username)
        self.check_object_permissions(self.request, obj.to_user)
        return obj

    # Return list of received friend requests
    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    # Accept a friend request from the user passed in to the 'username' query parameter
    def post(self, request, *args, **kwargs):
        received_friend_request = self.get_object()
        received_friend_request.accept()

        return Response(status=status.HTTP_201_CREATED)  # Created since we're creating a Friend

    # Reject a friend request from the user passed in to the 'username' query parameter
    def delete(self, request, *args, **kwargs):
        received_friend_request = self.get_object()
        received_friend_request.cancel()

        serializer = self.serializer_class(received_friend_request)
        return Response(serializer.data, status=status.HTTP_200_OK)


# sentfriendrequests
class SentFriendRequests(APIView):
    serializer_class = SentFriendRequestSerializer
    lookup_field = 'id'

    # get queryset for sent friend requests
    def get_queryset(self):
        user = self.request.user
        return FriendshipRequest.objects.select_related('from_user').filter(
            from_user=user, rejected__isnull=True).all() 

    # get via username for query
    def get_object(self):
        username = self.request.query_params.get('username', None)
        if username is None:
            raise Exception(missing_query_param="username")

        queryset = self.get_queryset()

        obj = get_object_or_404(queryset, to_user__username=username)
        self.check_object_permissions(self.request, obj.from_user)
        return obj

    # Return list of sent friend requests
    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

    # Send a new friend request to the user passed in to the 'username' query parameter
    def post(self, request, *args, **kwargs):
        other_user = get_user_object(username=self.request.query_params.get('username'))

        # Send a friend request from currentUser to otherUser
        try:
            friend_request = Friend.objects.add_friend(
                request.user,
                other_user)
        except Exception as e:
            raise Exception(str(e))

        serializer = self.serializer_class(friend_request)
        return Response(serializer.data, status=status.HTTP_201_CREATED) # Created since we're creating a FriendRequest

    # Cancel a sent friend request to the user passed in to the 'username' query parameter
    def delete(self, request, *args, **kwargs):
        sent_friend_request = self.get_object()
        sent_friend_request.cancel()

        serializer = self.serializer_class(sent_friend_request)
        return Response(serializer.data, status=status.HTTP_200_OK)


# friends
class FriendsList(APIView):
    serializer_class = FriendSerializer
    lookup_field = 'id'

    # get query set of friends lists
    def get_queryset(self):
        return Friend.objects.select_related('from_user', 'to_user').filter(to_user=self.request.user).all()

    # override get request to get queryset instead
    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)

     # Delete the friend passed in to the 'username' query parameter
    def delete(self, request, *args, **kwargs):
        other_user = get_user_object(username=self.request.query_params.get('username'))

        try:
            remove_friend(request.user, other_user)
            return Response({'message':'User was deleted from friends'}, status=status.HTTP_200_OK)
        except Exception as e:
            raise Exception(str(e))
