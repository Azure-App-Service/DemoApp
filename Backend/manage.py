#!/usr/bin/env python
from flask_script import Server, Manager, Shell
from app import app, database


manager = Manager(app)
manager.add_command('runserver', Server())
manager.add_command('shell', Shell(make_context=lambda: {
    'app': app
}))


@manager.command
def syncdb():
    from app.models.user import User
    from app.models.friend import Friend
    from app.models.profile import Profile
    from app.models.position import Position
    from social_flask_peewee.models import FlaskStorage
    models = [
        User,
        Friend,
        Profile,
        Position,
        FlaskStorage.user
    ]
    for model in models:
        model.create_table(True)


@manager.command
def seed():    
    import json
    from app.models.profile import Profile
    from app.models.position import Position
    
    profiles = []
    with open('seed_data.json') as data_file:    
        data = json.load(data_file)
        profiles = data['profiles']
    
    for profile in profiles:
        # create profile if not exists
        query = Profile.select().where(Profile.id == profile['id'])
        if query.exists() == True:
            continue
        p = Profile.create(**profile)
        # create positions
        positions = profile.get('positions')
        if positions == None or len(positions) == 0:
            continue
        for position in positions:
            data = {
                "profile": p,
                "title": position
            }
            Position.create(**data)

 
if __name__ == '__main__':
    manager.run()
