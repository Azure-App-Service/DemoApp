from app import settings
import json,requests
import socket


class LoggerService(object):

    def log_ruby_api(self,APIName):
        return self.log_api(APIName,'Ruby Chat')
    
    def log_python_api(self,APIName):
        return self.log_api(APIName,'Python App')

    def log_python_api_get(self,APIName):
        return self.log_api(APIName + " - get",'Python App')

    def log_python_api_post(self,APIName):
        return self.log_api(APIName + " - post",'Python App')

    def log_api(self,APIName,environment):
        if settings.TRACK_CUSTOM_EVENT_FUNCTION_URL: 
            requests.post(settings.TRACK_CUSTOM_EVENT_FUNCTION_URL,json={
                'EventName':'Python REST API Status',
                'Properties':{
                    'Description':'{0} REST API invoked - {1} invoked'.format(environment,APIName),
                    'LogType': 'Status Log',
                    'Host':socket.gethostname(),
                    'Status':'Success'
                }
            })

logger = LoggerService()