#!/bin/sh

echo start the ssh server
/usr/sbin/sshd

echo start the backend app
cd Backend
python manage.py syncdb
python manage.py seed
# python manage.py runserver --host 0.0.0.0 &
uwsgi --ini uwsgi.ini &
cd ..

echo start the frontend app
cd Frontend
# The port must be specified, otherwise 502 Bad Gateway error will occur after deployed to Web App for Containers
ng serve --host=0.0.0.0 --port 4200 --disable-host-check &
cd ..

echo start nginx
nginx -g "daemon off;"