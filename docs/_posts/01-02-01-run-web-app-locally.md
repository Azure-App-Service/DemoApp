---
title: How to run the Web App Locally
description: 
category: RUN
---

{% include header.md %}

## Prepare

1. Install Docker.

   To run the the Web App locally, please install Docker first. The Docker Community Edition is sufficent. You can get it here: [https://www.docker.com/community-edition](https://www.docker.com/community-edition).

2. Choose 2 ports.

   We will build the Dockerfile and run the Docker image locally. Two ports on the local computer are required to be mapped to ports inside the Docker container.

   * Web App Port: for example 8080

   * SSH Port: for example 22

   Please choose two ports that are not used by other processes.

3. Register OAuth applications.

   Follow [Register OAuth applications]({{'/setup/2001/01/02/register-oauth-applications.html' | prepend: site.baseurl}}) to register GitHub and LinkedIn OAuth Applications with the following parameters:

   * GitHub OAuth Application:

     * Name: Developer Finder - Local

     * Homepage: http://127.0.0.1:<*Web-App-Port*>

     * Callback URL: http://127.0.0.1:<*Web-App-Port*>/complete/github/

   * LinkedIn OAuth Application:

     * Name: Developer Finder - Local

     * Website URL: http://127.0.0.1:<*Web-App-Port*>

     * Redirect URL: http://127.0.0.1:<*Web-App-Port*>/complete/linkedin-oauth2/

4. Clone or download the source code to you computer.


## Build the Dockerfile and Run the Docker image

1. Open a Terminal window and navigate to the source code root folder.

2. Build the Dockerfile by executing the following command:

   ```sh
   docker build -t developer-finder .
   ```

3. Run the Docker image by executing the following command:

   ```Sh
   docker run \
       -p <Web-App-Port>:80 \
       -p <SSH-Port>:2222 \
       -e USE_SQLITE_DATABASE=true \
       -e SOCIAL_AUTH_GITHUB_KEY=<GitHub-ClientID> \
       -e SOCIAL_AUTH_GITHUB_SECRET=<GitHub-Client-Secret> \
       -e SOCIAL_AUTH_LINKEDIN_OAUTH2_KEY=<LinkedIn-ClientID> \
       -e SOCIAL_AUTH_LINKEDIN_OAUTH2_SECRET=<LinkedIn-Client-Secret> \
       developer-finder
   ```

   Replace the placehoders with the ports you chose and the Client Id & Client Secrets you created.

   > Note:
   >
   > `-e USE_SQLITE_DATABASE=true` tells the backend app to use a SQLite database. If you want to use a MySQL database, please replace it with the command text below: 
   >
   > ```
   > -e MYSQL_HOSTNAME=<Your-MySQL-Hostname> \
   > -e MYSQL_USERNAME=<Your-MySQL-Username> \
   > -e MYSQL_PASSWORD=<Your-MySQL-Password> \ 
   > -e MYSQL_DATABASE=<Your-MySQL-Database> \  
   > ```
   {: .blockquote .alert-info}

4. Open [http://127.0.0.1:<*Web-App-Port*>]() in your web browser.


## Stop the Docker container

1. Open a new Terminal window.

2. Run:

   ```Sh
   docker ps
   ```

   The output will look like this:

   ```
   CONTAINER ID        IMAGE               COMMAND             CREATED
   d8ac8bd6fbab        developer-finder    "/opt/startup.sh"   4 minutes ago
   ```

3. Copy the CONTAINER ID value, then run:

   ```Sh
   docker stop <CONTAINER ID>
   ```

   > Please replace <*CONTAINER ID*> with the container ID you copied.
   {: .blockquote .alert-info}