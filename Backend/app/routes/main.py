from flask import render_template, redirect, request
from flask_login import login_required, logout_user, current_user

from social_flask.utils import load_strategy
from social_flask_peewee.models import FlaskStorage

from app import app
from app.models.friend import Friend
from app.models.position import Position
from app.models.profile import Profile
from app.models.user import User


@app.route('/')
def main():
    return render_template('home.html')


@login_required
@app.route('/done/')
def done():
    return render_template('home.html')


@app.route('/email')
def require_email():
    strategy = load_strategy()
    partial_token = request.args.get('partial_token')
    partial = strategy.partial_load(partial_token)
    return render_template('home.html',
                           email_required=True,
                           partial_backend_name=partial.backend,
                           partial_token=partial_token)


@login_required
@app.route('/logout/')
def logout():
    """Logout view"""
    if current_user.is_authenticated:
        user_id = current_user.id
        logout_user()
        if request.args.get('clear') == 'true':
            Friend.delete().where(Friend.user == user_id).execute()
            Friend.delete().where(Friend.friend == user_id).execute()
            Position.delete().where(Position.profile == user_id).execute()
            Profile.delete().where(Profile.id == user_id).execute()
            FlaskStorage.user.delete().where(FlaskStorage.user.user == user_id).execute()
            User.delete().where(User.id == user_id).execute()
    return redirect('/')
