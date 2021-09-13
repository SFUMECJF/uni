'''
    Defining endpoints for message API
'''
from django.shortcuts import render

# Message item imports
from message.models import Message
from message.serializers import MessageSerializer
from rest_framework import viewsets, generics, permissions
from django.db.models import Q

# main API viewset of the message
# all messages can be identified and edited via subfield of the url
# messages can be queried via a reference_id
class MessageDetailViewSet(viewsets.ModelViewSet):
    serializer_class = MessageSerializer

    # Require that a valid token is provided with the request to access
    permission_classes = [permissions.IsAuthenticated]
    def create(self, request):
        request.data.update({"message_sender": self.request.user.id})
        return super().create(request)

    # queryset override to allow get of messages via reference_id
    def get_queryset(self):
        query = Q()

        searched_message_reference = self.request.query_params.get('reference_id')
        if searched_message_reference is not None:
            query |= Q(reference_id=searched_message_reference)
        
        return Message.objects.filter(query)
