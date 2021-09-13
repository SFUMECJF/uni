from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers

# User signup API returns structure


class SignupSerializer(serializers.ModelSerializer):
    # Return for structure API
    class Meta:
        model = get_user_model()
        fields = ['username', 'first_name', 'last_name', 'email', 'password', ]
        extra_kwargs = {
            'password': {'write_only': True}
        }

    # Ensures user chooses a secure password
    # def validate_password(self, value):
    #     validate_password(value)
    #     return value

    # Creates the user in the database
    def create(self, validated_data):
        user = get_user_model()(**validated_data)
        # Hash the user's password
        user.set_password(validated_data['password'])
        # Create new user with data provided
        user.save()

        return user

# User API Return seralizer
# Can be added upon to have more user data
class UserSerializer(serializers.ModelSerializer):

    # can attach additional data here from other tables
    class Meta:
        model = get_user_model()
        # Return fields for endpoint
        fields = ['id', 'username', 'email', 'profile_picture', 'first_name', 'last_name', 'company', 'isPrivate', "busyness_can_reply", "busyness_response"]
