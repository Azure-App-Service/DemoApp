from app import api
from app.services.logger_service import logger
from flask_login import login_required, current_user
from flask_restful import Resource
from social_flask_peewee.models import FlaskStorage

class ConnectedAccountsResource(Resource):
    api_url = "/api/connected-accounts"

    @login_required
    def get(self):
        logger.log_python_api(ConnectedAccountsResource.api_url)
        user = current_user._get_current_object()
        users = FlaskStorage.user.get_social_auth_for_user(user)
        return list(map(lambda u: u.provider, users))

api.add_resource(ConnectedAccountsResource,ConnectedAccountsResource.api_url)