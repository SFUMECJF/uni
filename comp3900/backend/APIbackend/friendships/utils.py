# friendships/utils.py
from django.core.exceptions import ObjectDoesNotExist

from friendship.models import Friend
from users.models import CustomUser
from django.core.cache import cache
from django.db.models import Q

# checks if two different users are friends
def users_are_friends(current_user, other_user_uuid):
    try:
        other_user = CustomUser.objects.get(uuid=other_user_uuid)
        if Friend.objects.are_friends(current_user, other_user):
            return True
    except ObjectDoesNotExist:
        pass

    return False

# Columns in the tables
BUST_CACHES = {
    "friends": ["friends"],
    "followers": ["followers"],
    "blocks": ["blocks"],
    "blocked": ["blocked"],
    "following": ["following"],
    "blocking": ["blocking"],
    "requests": [
        "requests",
        "unread_requests",
        "unread_request_count",
        "read_requests",
        "rejected_requests",
        "unrejected_requests",
        "unrejected_request_count",
    ],
    "sent_requests": ["sent_requests"],
}

# Input types in columns
CACHE_TYPES = {
    "friends": "f-%s",
    "followers": "fo-%s",
    "following": "fl-%s",
    "blocks": "b-%s",
    "blocked": "bo-%s",
    "blocking": "bd-%s",
    "requests": "fr-%s",
    "sent_requests": "sfr-%s",
    "unread_requests": "fru-%s",
    "unread_request_count": "fruc-%s",
    "read_requests": "frr-%s",
    "rejected_requests": "frj-%s",
    "unrejected_requests": "frur-%s",
    "unrejected_request_count": "frurc-%s",
}

def bust_cache(type, user_pk):
    """
    Bust our cache for a given type, can bust multiple caches
    """
    bust_keys = BUST_CACHES[type]
    keys = [CACHE_TYPES[k] % user_pk for k in bust_keys]
    cache.delete_many(keys)

def remove_friend(from_user, to_user):
    """ Destroy a friendship relationship """
    try:
        qs = Friend.objects.filter(Q(to_user=to_user, from_user=from_user) | Q(to_user=from_user, from_user=to_user))
        # distinct_qs = qs.distinct().all()

        if qs:
            qs.delete()
            bust_cache("friends", to_user.pk)
            bust_cache("friends", from_user.pk)
            return True
        else:
            return False
    except Friend.DoesNotExist:
        return False