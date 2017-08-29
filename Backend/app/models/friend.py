from .base_model import BaseModel
from .user import User
from peewee import CharField, IntegerField, ForeignKeyField

class Friend(BaseModel):
    user = ForeignKeyField(User, related_name = 'friends')
    friend = ForeignKeyField(User)