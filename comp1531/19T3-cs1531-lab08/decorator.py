import sys

MESSAGE_LIST = []
TOKEN_USED = 0

def authorised(func):
    def get_authorised():
        #Basic decorator function that logs how many times token has been set
        global TOKEN_USED
        TOKEN_USED += 1
        func()

    return get_authorised

def get_messages(auth_token):
    if not authorised(auth_token):
        raise ValueError("Invalid authentication")
    return MESSAGE_LIST

def add_messages(auth_token, msg):
    global MESSAGE_LIST
    if not authorised(auth_token):
        raise ValueError("Invalid authentication")
    MESSAGE_LIST.append(msg)


@authorised
def set_token():
    return 'CrocodileLikesStrawberries'

if __name__ == '__main__':
    auth_token = ""
    auth_token = set_token()
    print(auth_token)
    if len(sys.argv) == 2:
        auth_token = sys.argv[1]

    add_messages(auth_token, "Hello")
    add_messages(auth_token, "How")
    add_messages(auth_token, "Are")
    add_messages(auth_token, "You?")
    print(get_messages(auth_token))
