from app import api,settings
from datetime import datetime
import time,json,requests
from app.models.message import Message
from app.models.message_summary import MessageSummary
from app.models.profile import Profile
from flask import request
from flask_login import login_required, current_user
from flask_restful import Resource
from app.services.logger_service import logger

def buildRubyApi(api):
    return "{0}/{1}".format(settings.RUBY_CHAT_URL,api)

def requestRest(api,type,data):
    logger.log_ruby_api(api)
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
    
    api_url = "/api/messages/<int:id>"
    
    @login_required
    def get(self,id):
        logger.log_python_api_get(MessagesResource.api_url)
        uid=current_user.id
        unreadMsgs = requestRest('/api/messages/unread','get',{"to":uid,"from":id})
        unreadMsgs = map(lambda m:toMessage(m),unreadMsgs)
        return list(map(lambda m:m.to_json() ,unreadMsgs))

class MessagePostResource(Resource):
    
    api_url =  '/api/messages'

    @login_required
    def post(self):
        logger.log_python_api_post(MessagePostResource.api_url)
        messageContent = request.json['content']
        fromUser = current_user.id
        toUser= request.json['to']
        resp = requestRest('/api/messages','post',{'from':fromUser,'to':toUser,'body':messageContent})
        return toMessage(resp).to_json()

class MessageSummaryResource(Resource):

    api_url = '/api/messages/summary'

    @login_required
    def get(self):
        logger.log_python_api(MessageSummaryResource.api_url)
        notifications = requestRest('/api/messages/summary','get',{'to':current_user.id})
        messageSummarys = map(lambda n:toSummary(n),notifications)
        return list(map(lambda m:m.to_json() , messageSummarys))

api.add_resource(MessagePostResource, MessagePostResource.api_url)
api.add_resource(MessagesResource, MessagesResource.api_url)
api.add_resource(MessageSummaryResource, MessageSummaryResource.api_url)