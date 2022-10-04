+++
categories = ["Guides"]
date = 2022-10-04T05:00:00Z
description = "A simple guide to self-host n8n in just a few minutes on fly.io."
draft = false
images = ["/uploads/n8n-fly-io-working-ybg.png"]
tags = ["fly.io", "self-hosting", "n8n"]
title = "How to Self-Host n8n on Fly.io"

+++
You want to [self-host](https://www.reddit.com/r/selfhosted/) apps for fun or privacy - but not the _‘running servers in your garage’_ type of self-hosted. In 2022 we live in a Golden Era of low-cost VPCs and hosting providers, and there has never been a better time for people looking to offload the frustrating parts of self-hosting, while still operating on a shoe-string budget.

In this guide we'll be setting up your own instance of [n8n](https://n8n.io/), an alternative to Zapier. It will have minimum configuration options to get up and running with a SQLite backend, and should cost <$5/month (_Unfortunately it needs too much memory to run in the [fly.io](https://fly.io/pricing/) free tier._) If you want Postgres or MySQL, n8n has more information in their [generic Docker instructions](https://docs.n8n.io/hosting/installation/docker/) for how to connect.

> 😢  _**SQLite??? Is that even production ready??**_
> 
> _You’d be surprised how much traffic you can support with SQLite - [NomadList & RemoteOK](https://www.nocsdegree.com/pieter-levels-learn-coding/#what-technologies-does-pieter-levels-use) both run on it and pull in significant revenue ($millions) and handle tons of traffic.  Read more in [Consider SQLite](https://blog.wesleyac.com/posts/consider-sqlite) and how [Michael Lynch uses SQLite + Litestream to never worry about backups](https://mtlynch.io/litestream/)._
> 

![A n8n workflow open and ready for use](/uploads/n8n-fly-io-working-ybg.png)

Time to get your self-hosted **n8n** off the ground so you can get back to procrastinating!

## 🛠️ [Fly.io](http://Fly.io) account setup

We need to take a quick detour to ensure you have an account with [Fly.io](http://Fly.io).

- [Install](https://fly.io/docs/getting-started/installing-flyctl/) the `flyctl` CLI tool.
- Authenticate with `flyctl auth signup` (for newbies), or `flyctl auth login` (existing accounts).

    > ⚠️ _You will have to add credit card information to the account. It should cost < $5/month if you keep to the minimum server configuration settings. Supporting a team of people will of course have larger requirements._
    > 

## 🤸Deploying n8n to [Fly.io](http://Fly.io)

Now that you have an account & the CLI all set up - we can get to the real action!

### Create a new directory & initialize the project with fly.toml

I chose `jolly-n8n` for my app name, so wherever you see that value, swap it out with your own.
```
mkdir fly-n8n/
cd fly-n8n
flyctl launch --image n8nio/n8n --no-deploy
```

### Create the volume for persistent storage

> ℹ️ *I set this to volume of 1 GB since I am deploying multiple apps on Fly, but the free tier supports up to [3GB for your account](https://fly.io/docs/about/pricing/#free-allowances).*
> 

```
flyctl volumes create nocodb_vol --size 1 -r ord
```

### Increase the memory available for your instance

Unfortunately, n8n requires enough memory that if you try to run on the free tier of Fly, you end up hitting the memory limit:
```
💥[info] [ 24.178128] Out of memory: Killed process 528 (node) total-vm:10986500kB, anon-rss:194396kB, file-rss:0kB, shmem-rss:0kB, UID:1000 pgtables:5580kB oom_score_adj:0
```

For this guide, we'll just bump it up a single level to keep testing as cheap as possible, but if you're running it for any serious application, you'll want to consider using a beefier server.

```
flyctl scale memory 512 -a "jolly-n8n"
```

### Manually edit `fly.toml`: update the mounts to [use the new volume](https://fly.io/docs/reference/configuration/#the-mounts-section)

```
[mounts]
    source="n8n_vol"
    destination="/home/node/.n8n"
```

### Manually edit `fly.toml`: update necessary environment variables

```
[env]
    N8N_HOST = "jolly-n8n.fly.dev" # <your-app-name>.fly.dev
    WEBHOOK_URL = "https://jolly-n8n.fly.dev" # https://<your-app-name>.fly.dev
    TINI_SUBREAPER = "true"
    N8N_DIAGNOSTICS_ENABLED = "false" # optional
    N8N_HIRING_BANNER_ENABLED = "false" # optional
    # Find yours https://momentjs.com/timezone/
    GENERIC_TIMEZONE = "America/Chicago"
```

#### Why did we need to update these?

During initial deployment, I ran into a number of issues that you will hopefully avoid by updating these settings.

- 💥`TINI_SUBREAPER`: **clash between n8n process manager and Fly.**
    Here is the error I saw, in case someone stumbles on it in the future:
    ```
    [WARN tini (523)] Tini is not running as PID 1 and isn't registered as a child subreaper.
    [info] Zombie processes will not be re-parented to Tini, so zombie reaping won't work.
    [info] To fix the problem, use the -s option or set the environment variable TINI_SUBREAPER to register Tini as a child subreaper, or run Tini as PID 1.
    ```

    Why is this happening? Fly owns PID 1, so variable needs to be set so [Tini](https://github.com/n8n-io/n8n/blob/e30c78febeac8bfcfbe5f1c4c13122594d8a518e/docker/images/n8n/Dockerfile#L25) and Fly don't conflict.
    [This n8n forum discussion](https://community.fly.io/t/kernel-panic-starting-init-in-a-nix-built-container-with-tini-as-init/6328/3) got me pointed in the right direction to understand the `Why` behind the error.

    > _Use whichever you like! The only limitation you’re going to run into is that Fly.io owns your init (sorry!); we have to be PID 1. There are a bunch of process managers that want to replace init, and those’ll be tricky to get to work in a Fly.io app. [Fly](https://fly.io/docs/app-guides/multiple-processes/#there-are-so-many-other-process-managers)_

- 💥 `WEBHOOK_URL`: **override default config.**
    Internally, n8n builds the `WEBHOOK_URL` variable from a [number of other environment variables](https://docs.n8n.io/hosting/configuration/#webhook-url), but when it runs behind proxies like Caddy or Fly that address will be incorrect when displayed in the dashboard. Set it manually to avoid issues.

### 🚀 Deploy your new app

```
flyctl deploy
```

## 🌴n8n live on [Fly.io](http://Fly.io)

With almost no effort at all, I have a self-hosted [n8n](https://n8n.io) instance running!

![A n8n node after successfully executing on my self-hosted instance](/uploads/n8n-fly-io-functional-execution-ybg.png)

## Other quick options

Fly is not the only simple hosting provider out there - there’s a gluttony of choice, and you as the customer are winning! A few other options include:

- [Hosting n8n on Digital Ocean](https://docs.n8n.io/hosting/server-setups/digital-ocean/)
- [Railway](https://railway.app/)
- [Render](https://render.com/)
- [Hostman](https://hostman.com)

## Fin

I gotta hand it to the team at Fly, they’ve made it a very slick process for your first apps. Also shoutout to n8n for creating such a fantastic product and keeping it open-source so everyone can benefit from it. If you want to support them, check out their [hosted n8n Cloud service](https://n8n.io/cloud/) and/or their [community forum](https://community.n8n.io/).


Questions? Concerns? Big hugs? Let me know what you’re thinking on [Twitter](https://twitter.com/maybekq).
