from app import api,settings
from datetime import datetime
import time,json,requests
from app.models.message import Message
from app.models.messageSummary import MessageSummary
from app.models.profile import Profile
from flask import request
from flask_login import login_required, current_user
from flask_restful import Resource

def buildRubyApi(api):
    return "{0}/{1}".format(settings.RUBY_CHAT_URL,api)

def requestRest(api,type,data):
    requestUrl = buildRubyApi(api)
    if type == 'get':
        ret = requests.get(requestUrl,params=data)
    elif type == 'post':
        ret = requests.post(requestUrl,json=data)
    return ret.json()

def toMessage(msg):
    m = Message(msg["id"],msg["from"],msg["to"],msg["body"],msg["created_at"])
    return m

def toSummary(summary):
    userProfile, created = Profile.get_or_create(id=summary["from"])
    return MessageSummary(summary["from"],userProfile.name,summary["unread_messages_count"])

class MessagesResource(Resource):
    
    @login_required
    def get(self,id):
        uid=current_user.id
        unreadMsgs = requestRest('/api/messages/unread','get',{"to":uid,"from":id})
        unreadMsgs = map(lambda m:toMessage(m),unreadMsgs)
        return list(map(lambda m:m.toJson() ,unreadMsgs))

class MessagePostResource(Resource):
    
    @login_required
    def post(self):
        messageContent = request.json['content']
        fromUser = current_user.id
        toUser= request.json['to']
        resp = requestRest('/api/messages','post',{'from':fromUser,'to':toUser,'body':messageContent})
        return toMessage(resp).toJson()

class MessageSummaryResource(Resource):
    @login_required
    def get(self):
        notifications = requestRest('/api/messages/summary','get',{'to':current_user.id})
        messageSummarys = map(lambda n:toSummary(n),notifications)
        return list(map(lambda m:m.toJson() , messageSummarys))

api.add_resource(MessagePostResource, '/api/messages')
api.add_resource(MessagesResource, '/api/messages/<int:id>')
api.add_resource(MessageSummaryResource, '/api/messageSummaries')