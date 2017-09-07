---
title: Configure TrackCustomEvent function URL
description:
category: SETUP
---

{% include header.md %}

1. Get TrackCustomEvent function URL from the Function App.

   - Open the Function App in the Resource Group:

     ![]({{site.baseurl}}/img/function-app.png)

   - Expand the functions, then click **TrackCustomEvent**. Click **Get function URL** at the right.

     ![]({{site.baseurl}}/img/function-app-url.png)

   - Copy the URL on the popup.

2. Configure application settings of the Web App.

   - Open the Web App in the Resource Group:

     ![]({{site.baseurl}}/img/web-app.png)

   - Click **Application settings**

     ![]({{site.baseurl}}/img/web-app-settings.png)

   - Find the *TRACK_CUSTOM_EVENT_FUNCTION_URL* setting, paste the function URL you just copied to its value inputbox.

   - Click **Save**.