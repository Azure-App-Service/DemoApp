from social_core.pipeline.partial import partial
from .models.profile import Profile
from .models.position import Position

@partial
def require_email(strategy, details, user=None, is_new=False, *args, **kwargs):
    if kwargs.get('ajax') or user and user.email:
        return
    elif is_new and not details.get('email'):
        email = strategy.request_data().get('email')
        if email:
            details['email'] = email
        else:
            current_partial = kwargs.get('current_partial')
            return strategy.redirect(
                '/email?partial_token={0}'.format(current_partial.token)
            )

def create_or_update_profile(strategy, details, response, user=None, *args, **kwargs):
    if user == None or kwargs['new_association'] == False:
        return   
    profile, created = Profile.get_or_create(id=user.id)    
    backend_class_name = kwargs['backend'].__class__.__name__
    if backend_class_name == 'GithubOAuth2':
        profile.name = response.get('name')
        profile.company = response.get('company')
        profile.location = response.get('location')
        profile.github_profile_url = response.get('html_url')
        profile.blog_url = response.get('blog')
        profile.hireable = response.get('hireable')
        profile.bio = response.get('bio')
        profile.public_repos = response.get('public_repos')
        profile.public_gists = response.get('public_gists')
        profile.followers = response.get('followers')
        profile.following = response.get('following')
        profile.avatar_url = response.get('avatar_url')
    if backend_class_name == "LinkedinOAuth2":
        profile.name = '%s %s' % (response.get('firstName'), response.get('lastName'))
        location = response.get('location')
        if location:
            profile.location = location.get('name')
        profile.industry = response.get('industry')
        profile.num_connections = response.get('numConnections')
        profile.num_connections_capped = response.get('numConnectionsCapped')
        site_standard_profile_request = response.get('siteStandardProfileRequest')
        if site_standard_profile_request:
            profile.linkedin_standard_profile_url = site_standard_profile_request.get('url')
        profile.linkedin_public_profile_url = response.get('publicProfileUrl')
        # positions
        Position.delete().where(Position.profile == user.id).execute()
        positions = response.get('positions')
        if positions and positions.get('_total') > 0:
            for position in positions.get('values'):
                data = {
                    'profile': user.id,
                    'title': position.get('title')
                }
                Position.create(**data)
                if position['isCurrent'] == True:
                    company = position.get('company')
                    if company:
                        profile.company = company.get('name')
    profile.save()    