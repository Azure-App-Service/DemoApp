FROM sdelements/lets-chat

# This image is created specially for Web App on Linux.
# Exposing more than one non-80 ports leads the Web App on Linux could not configure the reverse proxy correctly.
# The line below overrides the expose of the parent image.
EXPOSE 8080

CMD ["npm", "start"]