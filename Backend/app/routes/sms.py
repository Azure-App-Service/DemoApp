from app import api, settings
from flask import request
import requests
from flask_login import login_required, current_user
from flask_restful import Resource
from twilio.rest import Client
from app.services.logger_service import logger

class SmsResource(Resource):
    
    api_url = '/api/sms'

    @login_required
    def post(self):
        logger.log_python_api_post(SmsResource.api_url)
        key_msg='message'
        key_to = 'to'
        to = request.json[key_to]
        message = request.json[key_msg]
        ret = requests.post(settings.SEND_SMS_LOGIC_APP_URL,json={key_msg:message,key_to:to})
        return ret.json()

api.add_resource(SmsResource,SmsResource.api_url)