import os
from os.path import dirname, abspath, join

SECRET_KEY = 'random-secret-key'
SESSION_COOKIE_NAME = 'psa_session'
DEBUG = True
DEBUG_TB_INTERCEPT_REDIRECTS = False
SESSION_PROTECTION = 'basic'

USE_SQLITE_DATABASE = os.environ.get('USE_SQLITE_DATABASE', 'false')
SQLITE_DATABASE_URI = '%s/db.sqlite3' % dirname(abspath(join(__file__, '..')))

MYSQL_HOSTNAME = os.environ.get('MYSQL_HOSTNAME')
MYSQL_USERNAME = os.environ.get('MYSQL_USERNAME')
MYSQL_PASSWORD = os.environ.get('MYSQL_PASSWORD')
MYSQL_DATABASE = os.environ.get('MYSQL_DATABASE')

SOCIAL_AUTH_LOGIN_URL = '/'
SOCIAL_AUTH_LOGIN_REDIRECT_URL = '/done/'
SOCIAL_AUTH_USER_MODEL = 'app.models.user.User'
SOCIAL_AUTH_STORAGE = 'social_flask_peewee.models.FlaskStorage'

SOCIAL_AUTH_AUTHENTICATION_BACKENDS = (
    'social_core.backends.github.GithubOAuth2',
    'social_core.backends.linkedin.LinkedinOAuth2'
)

# http://python-social-auth.readthedocs.io/en/latest/backends/github.html?highlight=client
# https://github.com/settings/developers
SOCIAL_AUTH_GITHUB_KEY = os.environ.get('SOCIAL_AUTH_GITHUB_KEY')
SOCIAL_AUTH_GITHUB_SECRET = os.environ.get('SOCIAL_AUTH_GITHUB_SECRET')

# http://python-social-auth.readthedocs.io/en/latest/backends/linkedin.html#oauth2
# https://www.linkedin.com/developer/apps
SOCIAL_AUTH_LINKEDIN_OAUTH2_KEY = os.environ.get('SOCIAL_AUTH_LINKEDIN_OAUTH2_KEY')
SOCIAL_AUTH_LINKEDIN_OAUTH2_SECRET = os.environ.get('SOCIAL_AUTH_LINKEDIN_OAUTH2_SECRET')
SOCIAL_AUTH_LINKEDIN_OAUTH2_SCOPE = ['r_basicprofile', 'r_emailaddress'] #r_fullprofile
SOCIAL_AUTH_LINKEDIN_OAUTH2_FIELD_SELECTORS = [
    'industry',
    'location',
    'num-connections',
    'num-connections-capped',
    'skills',
    'site-standard-profile-request',
    'positions',
    'public-profile-url'
]

SOCIAL_AUTH_TRAILING_SLASH = True

SOCIAL_AUTH_PIPELINE = (
    'social_core.pipeline.social_auth.social_details',
    'social_core.pipeline.social_auth.social_uid',
    'social_core.pipeline.social_auth.auth_allowed',
    'social_core.pipeline.social_auth.social_user',
    'social_core.pipeline.user.get_username',
    #'app.pipeline.require_email',
    'social_core.pipeline.mail.mail_validation',
    'social_core.pipeline.user.create_user',
    'social_core.pipeline.social_auth.associate_user',
    'social_core.pipeline.debug.debug',
    'social_core.pipeline.social_auth.load_extra_data',
    'social_core.pipeline.user.user_details',
    'app.pipeline.create_or_update_profile',
    'social_core.pipeline.debug.debug'
)

RUBY_CHAT_URL = os.environ.get("RUBY_CHAT_URL")
TRACK_CUSTOM_EVENT_FUNCTION_URL = os.environ.get("TRACK_CUSTOM_EVENT_FUNCTION_URL")
SEND_SMS_LOGIC_APP_URL = os.environ.get("SEND_SMS_LOGIC_APP_URL")