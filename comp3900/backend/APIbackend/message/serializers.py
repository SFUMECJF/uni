'''
    Return structure for REST API specifically for messageitems.
    Built via Django's rest framework. Refer to documents at:
    https://www.django-rest-framework.org/
'''
from rest_framework import serializers
from message.models import Message

# Message returns structure
# returns all the fields of the message
class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['id', 'reference_id', 'message_text', 'message_sender', 'created_date', 'reaction' ]