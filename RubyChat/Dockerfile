FROM ruby:2.4.1

# Copy the current directory contents into the container at /code
ADD . /code

# Set the working directory to /code
WORKDIR /code

# Install any needed packages
RUN bundle install

# Make port 80 available to the world outside this container
EXPOSE 3000

#COPY startup.sh /opt/
RUN chmod 755 /code/startup.sh
CMD ["/code/startup.sh"]