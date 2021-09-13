from users.models import CustomUser


def get_user_object(**kwargs):
    try:
        return CustomUser.objects.get(**kwargs)
    except CustomUser.DoesNotExist:
        raise Exception("user")