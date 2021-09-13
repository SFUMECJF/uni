"""APIbackend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from collections import UserList
from tasks import views as TaskViews
from users import views as UserViews
from friendships import views as FriendshipViews
from message import views as MessageViews

from rest_framework import routers
from django.urls import include, path
from rest_framework.authtoken.views import obtain_auth_token
from django.conf.urls import url

# Endpoint setup for the router
# Higher level setup
# Automates the setup of the endpoints so that they can be
# quickly built
# Add endpoints as they're needed
router = routers.DefaultRouter()
router.register(r'task', TaskViews.TaskDetailViewSet, basename='task')
router.register(r'auth/signup', UserViews.SignupViewSet)
router.register(r'user', UserViews.UserDetailViewSet)
router.register(r'message', MessageViews.MessageDetailViewSet, basename='message')


# Endpoints and their patterns
# Add endpoints as they're needed
urlpatterns = [
    path('', include(router.urls)),
    # path('auth/', include('rest_framework.urls')),
    # url(r'^friendship/', include('friendship.urls')),
    url(
        regex=r'^receivedfriendrequests/$',
        view=FriendshipViews.ReceivedFriendRequests.as_view(),
        name='receivedfriendrequests-list'
    ),

    url(
        regex=r'^sentfriendrequests/$',
        view=FriendshipViews.SentFriendRequests.as_view(),
        name='sentfriendrequests-list'
    ),

    url(
        regex=r'^friends/$',
        view=FriendshipViews.FriendsList.as_view(),
        name='friends-list'
    ),
    path('tasks', TaskViews.TaskList.as_view(), name="tasks"),
    path('users', UserViews.UserList.as_view(), name="users"),
    path('auth/login', UserViews.CustomAuthToken.as_view(), name='login'),
    path('auth/password_reset',
         include('django_rest_passwordreset.urls', namespace='password_reset')),
]
