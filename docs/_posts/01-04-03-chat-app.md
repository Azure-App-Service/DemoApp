---
title: Chat App
description:
category: ARCHITECTURE
---

{% include header.md %}

The Chat App is a very simple chat back-end application implemented with Ruby-on-Rails.
It does not include an authorization/authentication module, and has no user interface.

* Built on [Ruby](https://www.ruby-lang.org/en/).
* Uses a [PostgreSQL database](https://www.postgresql.org/). 

The Chat App exposes the following APIs:

| Action | Path                                     | Description         |
| ------ | ---------------------------------------- | ------------------- |
| POST   | /api/messages                            | Send a new message  |
| GET    | /api/messages/summary?to=*\<receiver_id\>* | Get message summary |
| GET    | /api/messages/unread?from=*\<sender_id\>*&to=*\<receiver_id\>* | Get unread messages |
{: .table .table-sm .table-striped}

> **Note**: the Chat App is built into a Docker image and pushed to Docker Hub:
>
>  [https://hub.docker.com/r/appsvc/demoapp-rubychat/](https://hub.docker.com/r/appsvc/demoapp-rubychat/)
{: .blockquote .alert-info}