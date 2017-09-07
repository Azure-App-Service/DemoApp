---
title: GitHub Authorization
description:
category: SETUP
---

{% include header.md %}

1. Generate Token:

   - Open [https://github.com/settings/tokens](https://github.com/settings/tokens) in your web browser.

   - Sign into GitHub.

   - Fork this repository to your GitHub account.

   - Click **Generate Token**.

   - Enter a value in the **Token description** text box.

   - Select the following scopes (your selections should match the screenshot below):

     - repo -> repo:status, repo_deployment, public_repo

     - user -> read:user, user:emial, user:follow

       > Note: the user scope itself must be selected.
       {: .blockquote .alert-warning }

       ![]({{site.baseurl}}/img/github-new-personal-access-token.png)

2. Add the GitHub Token to Azure in the Azure Resource Explorer:

   * Open [https://resources.azure.com/providers/Microsoft.Web/sourcecontrols/GitHub](https://resources.azure.com/providers/Microsoft.Web/sourcecontrols/GitHub) in your web browser

   * Log in with your Azure account

   * Selected the correct Azure subscription

   * Select **Read/Write** mode

   * Click **Edit**

   * Paste the token into the **token parameter**

     ![]({{site.baseurl}}/img/update-github-token-in-azure-resource-explorer.png)

   * Click **PUT**