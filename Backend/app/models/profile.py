from .base_model import BaseModel
from datetime import datetime
from peewee import CharField, TextField, BooleanField, DateTimeField, IntegerField, ForeignKeyField

class Profile(BaseModel):

    phone_number = CharField(null=True)
    skills = TextField(null=True)

    # from GitHub and LinkedIn
    name = CharField(null=True)
    company = CharField(null=True)
    location = CharField(null=True)

    # from GitHub
    github_profile_url = CharField(null=True)
    blog_url = CharField(null=True)
    hireable = BooleanField(null=True)
    bio = TextField(null=True)
    public_repos = IntegerField(null=True)
    public_gists = IntegerField(null=True)
    followers = IntegerField(null=True)
    following = IntegerField(null=True)
    avatar_url = CharField(null=True)

    # from LinkedIn
    industry = CharField(null=True)
    num_connections = IntegerField(null=True)
    num_connections_capped = BooleanField(null=True)
    linkedin_standard_profile_url = CharField(null=True)
    linkedin_public_profile_url = CharField(null=True)