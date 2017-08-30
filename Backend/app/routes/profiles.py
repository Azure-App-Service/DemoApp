from app import api
from app.models.friend import Friend
from app.models.profile import Profile
from app.models.position import Position
from app.services.logger_service import logger
from flask import request
from flask_login import login_required, current_user
from flask_restful import Resource, reqparse
from functools import reduce
import operator
from peewee import Clause, SQL, Param, prefetch, fn
from playhouse.shortcuts import model_to_dict


def safe_split_strip_remove_empty(value, separator=','):
    if isinstance(value, str): 
        return [x.strip() for x in value.split(separator) if x.strip()]
    else:
        return []

class ProfilesResource(Resource):
    
    api_url = '/api/profiles'

    @login_required
    def get(self):
        logger.log_python_api_get(ProfilesResource.api_url)
        skills = request.args.get('skills')
        role = request.args.get('role')        
        location = request.args.get('location')
        company = request.args.get('company')
        name = request.args.get('name')
        hireable = request.args.get('hireable')

        clauses = []
        if skills:
            skills_clauses = [Profile.skills.contains(skill) for skill in safe_split_strip_remove_empty(skills)]
            if any(skills_clauses):
                clauses.append(reduce(operator.or_, skills_clauses))
        if role:
            subquery = Position.select(Param('1')).where(Position.profile == Profile.id, Position.title.contains(role))
            clauses.append(Clause(SQL('EXISTS'), subquery))
        if company:
            clauses.append(Profile.company.contains(company))
        if location:
            clauses.append(Profile.location.contains(location))
        if name:
            clauses.append(Profile.name.contains(name))
        if hireable:
            hireable_clauses = []
            for value in hireable.split(','):
                value = value.strip().lower()            
                if value == 'yes':
                    hireable_clauses.append(Profile.hireable == True)
                elif value == 'no':
                    hireable_clauses.append(Profile.hireable == False)
                elif value == 'unknown':
                    hireable_clauses.append(Profile.hireable >> None)
            if any(hireable_clauses):
                clauses.append(reduce(operator.or_, hireable_clauses))
                
        profiles = Profile.select()
        if any(clauses):
            profiles = profiles.where(reduce(operator.and_, clauses))
        positions = Position.select()
        profiles_with_positions = prefetch(profiles, positions)

        return list(map(lambda p: self.profile_to_dict(p), profiles_with_positions))

    def profile_to_dict(self, profile):
        d = model_to_dict(profile)
        d['positions'] = [p.title for p in profile.positions_prefetch]
        return d

class ProfileResource(Resource):
    
    api_url = '/api/profiles/<int:id>'

    @login_required
    def get(self, id):
        logger.log_python_api_get(ProfileResource.api_url)
        profile = Profile.get(id=id) 
        d = model_to_dict(profile)
        d['positions'] = [p.title for p in profile.positions]
        return d


class SuggestedProfilesResource(Resource):

    api_url = '/api/profiles/suggested'

    @login_required
    def get(self):
        logger.log_python_api_get(SuggestedProfilesResource.api_url)
        current_user_profile = Profile.get(id=current_user.id)
        skills_list = safe_split_strip_remove_empty(current_user_profile.skills)
        location_part_list = safe_split_strip_remove_empty(current_user_profile.location)
        position_title_list = [p.title for p in current_user_profile.positions]

        clauses = [Profile.id != current_user.id] 

        or_clauses = []
        for skill in skills_list:
            or_clauses.append(Profile.skills.contains(skill))
        for location_part in location_part_list:
            or_clauses.append(Profile.location.contains(location_part))
        if any(position_title_list):
            subquery = Position.select(Param('1')).where(Position.profile == Profile.id, Position.title << position_title_list)
            or_clauses.append(Clause(SQL('EXISTS'), subquery))
        if any(or_clauses):
            clauses.append(reduce(operator.or_, or_clauses))
        
        friends = Friend.select(Friend.friend).where(Friend.user == current_user.id).execute()
        clauses.append(~(Profile.id << [f.friend.id for f in friends]))

        profiles = Profile.select().where(reduce(operator.and_, clauses)).order_by(fn.Rand()).limit(100)
        for profile in profiles:
            profile.score = 0
            for skill in skills_list:
                if profile.skills and skill in profile.skills:
                    profile.score += 10
            for part in location_part_list:
                if profile.location and part in profile.location:
                    profile.score += 10
            if any(position_title_list):
                profile.position_fetch = profile.positions.execute()
                for position_title in position_title_list:
                    if any(position.title == position_title for position in profile.position_fetch):
                        profile.score += 10

        suggested_profiles = sorted(profiles, key=lambda profile: -profile.score)[:2]
        
        return list(map(lambda p: self.profile_to_dict(p), suggested_profiles))

    def profile_to_dict(self, profile):
        d = model_to_dict(profile)
        positions = profile.position_fetch if hasattr(profile, 'position_fetch') else profile.positions.execute()
        d['positions'] = [p.title for p in positions]
        return d


api.add_resource(ProfilesResource, ProfilesResource.api_url)
api.add_resource(ProfileResource, ProfileResource.api_url)
api.add_resource(SuggestedProfilesResource, SuggestedProfilesResource.api_url)