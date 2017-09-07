---
title: Application Insights
description:
category: ARCHITECTURE
---

{% include header.md %}

Throughout the application, custom events are logged to Application Insights.

The following table describes the custom events logged to Application Insights at a high level.

| Source          | Triggers                                 |
| --------------- | ---------------------------------------- |
| Python Web App  | Python REST API, Function, and Logic App Calls |
| Python REST API | Python REST API, Function, and Logic App Calls |
| Logic App       | Start, Events Taking Place In Logic App, Complete |
{: .table .table-sm .table-striped}

This image shows custom events logged to Application Insights.

![]({{site.baseurl}}/img/application-insights-1.jpg)

The following image shows the detail of a custom event. In this example, the `/api/messages/summary` Python REST API was successfully invoked.

![]({{site.baseurl}}/img/application-insights-2.jpg)