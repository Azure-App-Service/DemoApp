from app import api
from app.models.profile import Profile
from flask import request
from flask_login import login_required, current_user
from flask_restful import Resource
from playhouse.shortcuts import model_to_dict
from app.services.logger_service import logger

class MeResource(Resource):
    
    api_url = '/api/me'
    
    @login_required
    def get(self):
        logger.log_python_api_get(MeResource.api_url)
        profile, created = Profile.get_or_create(id=current_user.id) 
        profile_dict = model_to_dict(profile)
        profile_dict["positions"] = [p.title for p in profile.positions]
        return profile_dict

    @login_required
    def post(self):
        logger.log_python_api_post(MeResource.api_url)
        # parser = reqparse.RequestParser()
        # parser.add_argument('phone_number', required=True, help="Phone number cannot be blank!")
        # args = parser.parse_args()
        # phone_number = args['phone_number']
        skills = request.json['skills']
        phone_number = request.json['phone_number']
        
        profile, created = Profile.get_or_create(id=current_user.id)
        profile.skills = skills
        profile.phone_number = phone_number
        profile.save()

        return model_to_dict(profile)

api.add_resource(MeResource,MeResource.api_url)