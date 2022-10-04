+++
categories = ["Guides"]
date = 2022-05-07T04:00:00Z
description = "A simple guide to self-host a NocodDB Airtable alternative in just a few minutes, for free."
draft = false
images = ["/uploads/nocodb-fly_io-smaller.png"]
tags = ["fly.io", "nocodb", "self-hosting"]
title = "How to Self-Host NocoDB on Fly.io"
toc = true
+++
You want to [self-host](https://www.reddit.com/r/selfhosted/) apps for fun or privacy - but not the *‘running servers in your garage’* type of self-hosted. In 2022 we live in a Golden Era of low-cost VPCs and hosting providers, and there has never been a better time for people looking to offload the frustrating parts of self-hosting, while still operating on a shoe-string budget (or free!).

So you want to host your own [NocoDB Airtable alternative](https://www.nocodb.com/)? Love it! Let’s get you rolling. This guide will set you up on [Fly.io](http://Fly.io) with a SQLite backend.  [NocoDB](https://www.nocodb.com/) has so many uses cases, but one feature I want to call out is how handy it is that it comes with a built-in API for items right out of the gate. Can anyone say speedy MVPs?

> 😢  _**SQLite??? Is that even production ready??**_
> 
> _You’d be surprised how much traffic you can support with SQLite - [NomadList & RemoteOK](https://www.nocsdegree.com/pieter-levels-learn-coding/#what-technologies-does-pieter-levels-use) both run on it and pull in significant revenue ($millions) and handle tons of traffic.  Read more in [Consider SQLite](https://blog.wesleyac.com/posts/consider-sqlite) and how [Michael Lynch uses SQLite + Litestream to never worry about backups](https://mtlynch.io/litestream/)._
> 

![An open Nocodb table showing the interface - Excel on steroids](/uploads/nocodb-fly_io-smaller.png)

Now let’s get your server running & get you back to whatever more important things you’re avoiding!

## 🛠️ [Fly.io](http://Fly.io) account setup

We need to take a quick detour to ensure you have an account with [Fly.io](http://Fly.io).

- [Install](https://fly.io/docs/getting-started/installing-flyctl/) the `flyctl` CLI tool.
- Authenticate with `flyctl auth signup` (for newbies), or `flyctl auth login` (existing accounts).

    > ⚠️ _You will have to add credit card information to the account, so if that’s enough to keep you from using a **free** service 🤷- keep your usage to the free tier and you’ll have no issues._
    > 

## 🤸Deploying NocoDB to Fly.io

With account setup out of the way, we will have a running instance of NocoDB on the interwebs in just 4 quick CLI commands.  For reference,  the [Docker instructions for NocoDB](https://docs.nocodb.com/getting-started/installation/#docker).

- **Create a new directory & initialize the project with fly.toml.**

    ```
     mkdir fly-nocodb/
    cd fly-nocodb
    flyctl launch --image=nocodb/nocodb:latest --no-deploy
    ```

- **Create the volume for persistent storage.**

    > ℹ️ *I set this to volume of 1 GB since I am deploying multiple apps on Fly, but the free tier supports up to [3GB for your account](https://fly.io/docs/about/pricing/#free-allowances).*
    > 

    ```
    flyctl volumes create nocodb_vol --size 1 -r ord
    ```

- **Manually edit `fly.toml`: Update the mounts to [use the new volume](https://fly.io/docs/reference/configuration/#the-mounts-section).**

    ```
    [mounts]
        source="nocodb_vol"
        destination="/usr/app/data"
    ```

- **(Optional) Manually edit `fly.toml`:  update any relevant [NoCODB production variables](https://docs.nocodb.com/getting-started/installation/#environment-variables).**

    I chose to disable telemetry and remove the initial loading screen, but you can also set variables to connect to AWS S3, change security settings, connect other database, and more.

    ```
    [env]
        NC_DISABLE_TELE = "true"
        NC_MIN = "true"
    ```

- 🪄 Deploy your new app - `flyctl deploy`.

    ```
    ...
    ....
    ==> Creating release
    --> release v2 created
    
    --> You can detach the terminal anytime without stopping the deployment
    ==> Monitoring deployment
    
     1 desired, 1 placed, 1 healthy, 0 unhealthy [health checks: 1 total, 1 passing]
    --> v0 deployed successfully
    ```

You now have a live app running on [Fly.io](http://Fly.io)!  Not needed, but if you already forgot the URL (like me), anytime you can run `flyctl info` to check on your shiny new app.

    ```
    19:16:50:~/work/fly-nocodb: [0]▶ flyctl info
    App
      Name     = bold-bird-3731
      Owner    = personal
      Version  = 0
      Status   = running
      Hostname = bold-bird-3731.fly.dev

    Services
    PROTOCOL PORTS
    TCP      80 => 8080 [HTTP]
             443 => 8080 [TLS, HTTP]
    
    IP Adresses
    TYPE ADDRESS             REGION CREATED AT
    v4   37.16.5.93                 1m23s ago
    v6   2a09:8280:1::3:3873        1m23s ago
    ```

## 🌴NocoDB live on Fly.io

With a few commands and almost no thought required, I have a self-hosted Airtable alternative [NocoDB](https://www.nocodb.com/) live and ready for use. The sky is the limit from here.

## Other quick options

Fly is not the only simple hosting provider out there - there’s a gluttony of choice, and you as the customer are winning! A few other options include:

- [Railway - 1 Click Deploy](https://railway.app/new/starters/nocodb)
- [Render](https://render.com/)
- [Heroku - 1 Click Deploy](https://docs.nocodb.com/getting-started/installation/#1-click-deploy-to-heroku)
- [Hostman](https://hostman.com)
