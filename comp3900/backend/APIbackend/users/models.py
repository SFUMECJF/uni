"""
    Defines schema for the models needed.
    Models are utilised to get data from database.
    You can treat them as 'tables' in SQL.
"""

# Create your models here.
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.validators import UnicodeUsernameValidator
from .managers import CustomUserManager
from django.dispatch import receiver
from django.urls import reverse
from django_rest_passwordreset.signals import reset_password_token_created
from django.template.loader import render_to_string
from django.core.mail import EmailMultiAlternatives


# Schema used for users
# Username + username validator
# First name
# Last name
# Email
# Profile picture
# Based of custom users from users/managers.py
# busyness_can_reply allows users to submit once a week
# busyness_response is their last response to the busyness submisssion
class CustomUser(AbstractBaseUser, PermissionsMixin):

    # Username fields
    # Username validator
    username_validator = UnicodeUsernameValidator()
    # Username
    username = models.CharField(
        _('username'),
        max_length=20,
        unique=True,
        help_text=_(
            'Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.'),
        validators=[username_validator],
        error_messages={
            'unique': _("A user with that username already exists."),
        },
    )

    # First and last name
    # Both are required
    first_name = models.CharField(_('first name'), max_length=150, blank=False)
    last_name = models.CharField(_('last name'), max_length=150, blank=False)

    # Email
    # Must be unique and is required
    email = models.EmailField(_('email address'), blank=False, unique=True)
    
    
    # Not required fields
    # Company (as in where they work)
    company = models.CharField(_('company'), max_length=150, blank=True)
    # Profile picture. Restricted image field
    profile_picture = models.TextField(_('profile_picture'), blank=True)

    # Privacy
    # Defaults to public
    isPrivate = models.BooleanField(_('isPrivate'), blank=False, default=False)

    # busyness tracking values
    busyness_can_reply = models.BooleanField(_('busyness_can_reply'), blank=False, default=True)
    busyness_response = models.IntegerField(_('busyness_response'), blank=False, default=3)

    # Extra stuff
    # Email data
    EMAIL_FIELD = 'email'
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    objects = CustomUserManager()

    def __str__(self):
        return self.email

# Email sending features
# Creates a table for token to be used in user reset emails
@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):

    # send an e-mail to the user
    # Context for the template to be sent to the user
    context = {
        "current_user": reset_password_token.user,
        "username": reset_password_token.user.username,
        "email": reset_password_token.user.email,
        "reset_password_url" : "https://localhost:3000/passwordreset/" + reset_password_token.key,
        "reset_password_code": reset_password_token.key,
    }

    # render email text
    email_html_message = render_to_string(
        "email/user_reset_password.html", context)
    email_plaintext_message = render_to_string(
        "email/user_reset_password.txt", context)

    msg = EmailMultiAlternatives(
        # title:
        "Password Reset for {title}".format(title="Task Master"),
        # message:
        email_plaintext_message,
        # from:
        "<youremail>",
        # to:
        [reset_password_token.user.email],
    )
    msg.attach_alternative(email_html_message, "text/html")
    msg.send()
