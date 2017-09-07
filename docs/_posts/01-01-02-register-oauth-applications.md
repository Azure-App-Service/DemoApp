---
title: Register OAuth applications
description:
category: SETUP
---

{% include header.md %}

To start, you must register OAuth applications for GitHub and LinkedIn. These OAuth applications allow the application to authenticate to GitHub and LinkedIn and download user profile information stored in these systems.

## Register GitHub OAuth application

1. Sign into GitHub.
2. Open [https://github.com/settings/applications/new](https://github.com/settings/applications/new)
3. Fill the form with the following information:

   * Application name: **Developer Finder**

   * Homepage URL: **https://developer-finder-[suffix].azurewebsites.net**

      > **Note:** Replace the **[suffix]** placeholder with the one you choose to use. Use this same value throughout the deployment process.
      > 
      > **Example:**
      > 
      >   https://developer-finder-contoso.azurewebsites.net
      {: .blockquote .alert-info }

   * Authorization callback URL:

     **https://developer-finder-[suffix].azurewebsites.net/complete/github/**

     > **Note:** Replace the **[suffix]** placeholder with the one you choose to use.  Use this same value throughout the deployment process.
     > 
     > **Example:**
     > 
     >   https://developer-finder-contoso.azurewebsites.net/complete/github/
     {: .blockquote .alert-info }

4. Click **Register application**.
5. Copy aside the **ClientID** and **Client Secret**.

   > **Note:** These values will be used for the **OAuth GitHub Client Id** and **OAuth GitHub client Secret** ARM template parameters.
   {: .blockquote .alert-info }

## Register LinkedIn OAuth application

1. Sign into LinkedIn.

2. Open [https://www.linkedin.com/developer/apps/new](https://www.linkedin.com/developer/apps/new)

3. Fill the form with the following information:

   * Name: **Developer Finder**

   * Application Logo: download and use the image below

     ![]({{site.baseurl}}/img/developer-finder.png)

   * Website URL: **https://developer-finder-[suffix].azurewebsites.net**
      > **Note:** Replace the **[suffix]** placeholder with the one you choose to use.  Use this same value throughout the deployment process.
      > 
      > **Example:**
      > 
      >   https://developer-finder-contoso.azurewebsites.net
      {: .blockquote .alert-info }

4. Input the other required fields, then click **Submit**.

5. Add the OAuth 2 Authorized Redirect URL: 

   **https://developer-finder-[suffix].azurewebsites.net/complete/linkedin-oauth2/**

   > **Note:** Replace the **[suffix]** placeholder with the one you choose to use.  Use this same value throughout the deployment process.
   > 
   > **Example:**
   > 
   >   https://developer-finder-contoso.azurewebsites.net/complete/linkedin-oauth2/
   {: .blockquote .alert-info }

6. Click **Update**.

7. Copy aside the **ClientID** and **Client Secret**.

   > **Note:** These values will be used for the **OAuth LinkedIn Client Id** and **OAuth LinkedIn Client Secret** ARM template parameters.
   {: .blockquote .alert-info }