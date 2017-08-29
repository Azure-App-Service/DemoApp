from .base_model import BaseModel
from datetime import datetime
from flask_login import UserMixin
from peewee import CharField, BooleanField, DateTimeField

# the user model specifies its fields (or columns) declaratively, like django
class User(BaseModel, UserMixin):
    username = CharField(unique=True)
    password = CharField(null=True)
    email = CharField(null=True)
    active = BooleanField(default=True)
    join_date = DateTimeField(default=datetime.now)

    class Meta:
        order_by = ('username',)