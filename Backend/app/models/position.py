from .base_model import BaseModel
from .profile import Profile
from peewee import CharField, ForeignKeyField

class Position(BaseModel):
    profile = ForeignKeyField(Profile, related_name = 'positions')
    title = CharField()