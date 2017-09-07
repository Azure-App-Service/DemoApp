---
title: Geo-Replication
description:
category: ARCHITECTURE
---

{% include header.md %}

Because this is a sample application that is designed for anyone in the world to deploy their own isolated instance, the databases in the application are created each time the ARM template deploys the solution.  The web apps are tied directly to the databases that are deployed.

Since this is the case, if you Geo-Replicate the solution, each Geo-Location will have a separate copy of the databases.  You are still able to demonstrate Geo-Replicating the app as part of the demo, but if you Geo-Replicate the solution then subsequently logged into an instance of the app in the US with one user, and logged into an instance of the App in China with another user, they would not be able to see each other in search results or chat because they are interacting with separate databases.

In a real production scenario, there would be a common database, or multiple databases with a database sync.  This would provide the ability to use the Traffic Manager to load balance traffic across multiple Geo-Locations and achieve global scale with the solution.  You can re-architect the solution to provide these capabilities.