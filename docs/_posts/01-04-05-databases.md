---
title: Databases
description:
category: ARCHITECTURE
---

{% include header.md %}

## MySQL Database

The MySQL Database is used by the Web App. It contains the following tables.

| Table          | Description                              |
| -------------- | ---------------------------------------- |
| user           | Stores user info, like username and email |
| usersocialauth | Stores users' connected social account info, like provider and uid<br>It contains a foreign key column user_id referencing the primary key column of the user table |
| profile        | Stores users' profiles                   |
| position       | Stores users' positions<br>It contains a foreign key column profile_id referencing the primary key column of the profile table. |
| friend         | Stores friends relationship <br>Its 2 columns, user_id and friend_id, are foreign keys referencing the primary key column of the user table |
{: .table .table-sm .table-striped}

>**Note:** In a true production environment, the data in the usersocialauth table would most likely be stored in a separate database to make the solution more secure.  In this sample, it is stored in the same database to simplify the solution and the deployment process.
{: .blockquote .alert-info}

The **profile** table contains several columns which are divided into 5 groups:

* Primary key:
  * id: matches the id column value in the user table
* Values managed by My Profile page:
  * phone_number: user’s phone number
  * skills: comma separated string, for example: *c#, Python, Ruby*
* Values retrieved from GitHub and LinkedIn accounts:
  * company: user’s current company
  * location: user's location
  * name: user display name
* Values are retrieved from GitHub only:
  * github_profile_url: the URL to user’s GitHub profile page
  * blog_url: the URL to user's blog
  * hireable: boolean indicating if the user is hireable
  * bio: user's biography
  * public_repos: the number of public repos
  * public_gists: the number of public gists
  * followers: the number of followers
  * following: the number of users the user is following
  * avatar_url: the URL to the user’s avatar
* Values are retrieved from LinkedIn only:
  * industry: The industry the member belongs to
  * num_connections: the number of LinkedIn connections the member has, capped at 500.  See 'num-connections-capped' to determine if the value returned has been capped.
  * num_connections_capped: returns 'true' if the member's 'num-connections' value has been capped at 500', or 'false' if 'num-connections' represents the user's true value
  * linkedin_standard_profile_url: the URL to the member's authenticated profile on LinkedIn.  You must be logged into LinkedIn to view this URL.
  * linkedin_public_profile_url: the URL to the member's public profile on LinkedIn

## PostgreSQL Database

The PostgreSQL database is used by the Chat App. It is very simple and only contains 2 tables:

| Table                | Description                         |
| -------------------- | ----------------------------------- |
| messages             | Stores all the messages             |
| message_read_records | Records users' last read message id |
{: .table .table-sm .table-striped}