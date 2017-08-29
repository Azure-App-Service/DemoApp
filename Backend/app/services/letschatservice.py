from app import settings
import httplib
import urllib
import json


class LetsChatService():

    def create_user(self, username, password, email, firstname, lastname):
        """create a user, return user token and user id"""
        is_ok = self.__create_user(
            username, password, email, firstname, lastname)
        if is_ok == "success":
            token = self.__get_token(username, password)
            if token != None:
                user_id = self.__get_user_id(token)
                return {"id": user_id, "token": token}

    def create_room(self, token, name, no, description=""):
        """get user id, must called with token"""
        conn = httplib.HTTPConnection(settings.LETS_CHAT_HOST)
        params = urllib.urlencode({'name': name,
                                "slug": no,
                                "description": description})
        headers = {"Content-type": "application/x-www-form-urlencoded",
                "Authorization": "Bearer %s" % (token)}
        conn.request("POST", "/rooms", params, headers)
        response = conn.getresponse()
        if response.status == httplib.CREATED:
            data = json.load(response)
            return data["id"]


    def send_message(self, token, room_id, text):
        """send message with room_id, must called with token"""
        conn = httplib.HTTPConnection(settings.LETS_CHAT_HOST)
        params = urllib.urlencode({'room': room_id,
                                "text": text})
        headers = {"Content-type": "application/x-www-form-urlencoded",
                "Authorization": "Bearer %s" % (token)}
        conn.request("POST", "/messages", params, headers)
        response = conn.getresponse()
        return response.status == httplib.CREATED


    def get_messages(self, token, room_id, since_id="", skip=0, take=500, reverse=True):
        """get messages with room_id, from & to is not used, must called with token"""
        conn = httplib.HTTPConnection(settings.LETS_CHAT_HOST)
        params = urllib.urlencode({'room': room_id,
                                'since_id': since_id,
                                'skip': skip,
                                'take': take,
                                'reverse': reverse})
        headers = {"Content-type": "application/x-www-form-urlencoded",
                "Authorization": "Bearer %s" % (token)}
        conn.request("GET", "/messages", params, headers)
        response = conn.getresponse()
        if response.status == httplib.OK:
            data = json.load(response)
            return data

    def __create_user(self, username, password, email, firstname, lastname):
        """create a user"""
        conn = httplib.HTTPConnection(settings.LETS_CHAT_HOST)
        params = urllib.urlencode({'username': username,
                                   "email": email,
                                   "display-name": "%s %s" % (firstname, lastname),
                                   "first-name": firstname,
                                   "last-name": lastname,
                                   "password": password,
                                   "password-confirm": password})
        headers = {"Content-type": "application/x-www-form-urlencoded"}
        conn.request("POST", "/account/register", params, headers)
        response = conn.getresponse()
        data = json.load(response)
        if response.status == httplib.CREATED:
            return data["status"]
        else:
            return data["message"]

    def __get_token(self, username, password):
        """get token of user, must call after user creation"""
        conn = httplib.HTTPConnection(settings.LETS_CHAT_HOST)
        params = urllib.urlencode({'username': username,
                                   "password": password})
        headers = {"Content-type": "application/x-www-form-urlencoded"}
        conn.request("POST", "/account/login", params, headers)
        response = conn.getresponse()
        if response.status == httplib.OK:
            data = json.load(response)
            if data["status"] == "success":
                cookie = response.getheader("Set-Cookie")
                # get token
                headers = {"Cookie": cookie,
                           "Content-type": "application/x-www-form-urlencoded"}
                conn.request("POST", "/account/token/generate", "", headers)
                response = conn.getresponse()
                if response.status == httplib.OK:
                    data = json.load(response)
                    return data["token"]

    def __get_user_id(self, token):
        """get user id, must called with token"""
        conn = httplib.HTTPConnection(settings.LETS_CHAT_HOST)
        headers = {"Authorization": "Bearer %s" % (token)}
        conn.request("GET", "/account", None, headers)
        response = conn.getresponse()
        if response.status == httplib.OK:
            data = json.load(response)
            return data["id"]