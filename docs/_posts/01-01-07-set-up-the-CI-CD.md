---
title: Set up the CI/CD
description:
category: SETUP
---

{% include header.md %}

1. Navigate to the resource group you just created and deployed, then click the **developer-finder-[suffix]** Web App:

   ![]({{site.baseurl}}/img/web-app.png)

2. Click **Continuous Delivery**, then click **Configure**:

   ![]({{site.baseurl}}/img/web-app-cd.png)

3. Click **Choose container registry**, the pre-configured private registry will be loaded:

   ![]({{site.baseurl}}/img/configure-cd-01.png)

4. Click **OK** (the right one).

5. Click **Configure continuous delivery**:

   ![]({{site.baseurl}}/img/configure-cd-02.png)

   * Code repository: choose **GitHub**.
   * Repository: choose this GitHub repository that you forked.
   * Branch: choose **master**.
   * Dockerfile path: change it to **Dockerfile**.

6. Click **OK** (the right one).

7. Click **Select a Team Service account**:

   ![]({{site.baseurl}}/img/configure-cd-03.png)

   * Create a new account or using an existing one.
   * Create a new project or using an existing one.
8. Click **OK** (the right one).

9. Click **OK**.

   > **Note:** It takes a few minutes to finish:
   {: .blockquote .alert-info }

   ![]({{site.baseurl}}/img/configure-cd-done.png)