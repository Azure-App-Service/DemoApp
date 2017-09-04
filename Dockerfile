FROM appsvc/demoapp-base:latest

### SSH Server
RUN echo "root:Docker!" | chpasswd \
     && apk update \
     && apk add --update openssh-server
COPY sshd_config /etc/ssh/

RUN ssh-keygen -t dsa -f /etc/ssh/ssh_host_dsa_key
RUN ssh-keygen -t rsa -f /etc/ssh/ssh_host_rsa_key
RUN ssh-keygen -t ecdsa -f /etc/ssh/ssh_host_ecdsa_key
RUN ssh-keygen -t ed25519 -f /etc/ssh/ssh_host_ed25519_key

### Backend
ADD ./Backend /app/Backend
WORKDIR /app/Backend
RUN apk add --no-cache git
RUN pip install -r requirements.txt

### Frontend
RUN npm install -g @angular/cli
ADD ./Frontend /app/Frontend
WORKDIR /app/Frontend
RUN npm install

### Nginx
RUN apk add --update --no-cache build-base linux-headers \
    && pip install uwsgi \
    && mkdir /var/log/uwsgi
COPY backend_uwsgi.ini /app/Backend/uwsgi.ini
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 2222 80 

###startup.sh
WORKDIR /app
COPY startup.sh /opt/
RUN chmod 755 /opt/startup.sh
CMD ["/opt/startup.sh"]