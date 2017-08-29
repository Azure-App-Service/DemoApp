# Use an official Python runtime as a parent image
FROM python:3.6-alpine

# Copy the current directory contents into the container at /code
ADD . /code

# Set the working directory to /code
WORKDIR /code

# Install any needed packages specified in requirements.txt
RUN apk add --no-cache git
RUN pip install -r requirements.txt

# Make port 80 available to the world outside this container
EXPOSE 80

# Define environment variables
# ENV NAME World

# sync db and seed data
RUN python manage.py syncdb
RUN python manage.py seed

# Run manage.py when the container launches
CMD ["python", "manage.py", "runserver", "--host", "0.0.0.0", "--port", "80"]