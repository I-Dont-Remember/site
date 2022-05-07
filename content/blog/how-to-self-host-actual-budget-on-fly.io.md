+++
categories = ["Guides"]
date = 2022-05-07T04:00:00Z
description = "A simple guide to self-host an Actual server in just a few minutes, for free."
draft = false
images = ["/uploads/actual-budget-demo-data-smaller.png"]
tags = ["fly.io", "self-hosting"]
title = "How to Self-Host Actual Budget on Fly.io"
toc = true
+++
You want to [self-host](https://www.reddit.com/r/selfhosted/) apps for fun or privacy - but not the _‘running servers in your garage’_ type of self-hosted. In 2022 we live in a Golden Era of low-cost VPCs and hosting providers, and there has never been a better time for people looking to offload the frustrating parts of self-hosting, while still operating on a shoe-string budget (or free!).

Speaking of budgeting, you’re here because you want to host [Actual](https://actualbudget.com/) and take control of your finances! These deployment instructions are available [on the repo as well](https://github.com/actualbudget/actual-server), but I wanted an excuse to go through the process of deploying onto [Fly.io](http://Fly.io) and documenting. Plus, now I can add pretty pictures, and who doesn’t love pretty pictures and see what they’re getting themselves into?

![Landing screen for Actual once you have data in it](/uploads/actual-budget-demo-data-smaller.png)

## 🛠️ Local setup

Your first step is to get the Actual server code on your machine and running.

```
    git clone git@github.com:actualbudget/actual-server.git
    cd actual-server/
    docker build -t actual-server .
    docker run -p 5006:5006 actual-server
    ....
    <lots of Docker output>
    ....
```

At this point, you should be able to navigate to _[localhost:5006](http://localhost:5006)_ and see the Actual application! Awesome!

Now kill that process with `Ctrl+C` and let’s put it somewhere with more longevity.

## 🛠️ [Fly.io](http://Fly.io) account setup

We need to take a quick detour to ensure you have an account with [Fly.io](http://Fly.io).

* [Install](https://fly.io/docs/getting-started/installing-flyctl/) the `flyctl` CLI tool.
* Authenticate with `flyctl auth signup` (for newbies), or `flyctl auth login` (existing accounts).

  > ⚠️ _You will have to add credit card information to the account, so if that’s enough to keep you from using a **free** service 🤷- keep your usage to the free tier and you’ll have no issues._

## 🤸Deploying Actual to [Fly.io](http://Fly.io)

We’re back on track! You should be back in the same `actual-server/` directory for the rest of the process. Deploying to Fly requires a few small tweaks to a config file, a couple commands, and then you’ll have a live app on the interwebs!

* `cp fly.template.toml fly.toml`
* `flyctl launch --no-deploy`
  ```
      21:51:14:~/work/actual-server:(master) [1]▶ flyctl launch --no-deploy
      An existing fly.toml file was found for app actualbudget-otter
      ? Would you like to copy its configuration to the new app? Yes
      Creating app in /home/idk/work/actual-server
      Scanning source code
      Detected a Dockerfile app
      ? App Name (leave blank to use an auto-generated name):
      Automatically selected personal organization: Kevin
      ? Select region: ord (Chicago, Illinois (US))
      Created app lively-meadow-7214 in organization personal
      Wrote config file fly.toml
      Your app is ready. Deploy with `flyctl deploy`
  ```
* `flyctl volumes create actualbudget_vol --size 1 -r ord`

  > ℹ️ _I set this to volume of 1 GB since I am deploying multiple apps on Fly, but the free tier supports up to_ [_3GB for your account_](https://fly.io/docs/about/pricing/#free-allowances)_._
  ```
      21:53:07:~/work/actual-server:(master) [130]▶ flyctl volumes create actualbudget_vol --size 1 -r ord
              ID: vol_<redacted>
            Name: actualbudget_vol
             App: lively-meadow-7214
          Region: ord
            Zone: 4f52
         Size GB: 1
       Encrypted: true
      Created at: 07 May 22 01:53 UTC
  ```
* Update the mounts section in the `fly.toml` , `source` will be the name of your sweet new volume, and `destination` is [defined by Actual](https://github.com/actualbudget/actual-server#persisting-server-data). Now is also a great time to edit the app name - I got the fantastic `lively-meadow-7214`, but not everyone will be that lucky.
  ```
      [mounts]
        source="actualbudget_vol"
        destination="/data"
  ```
* The big moment you’ve been waiting for - deployment! Run `flyctl deploy` and watch the magic work.
  ```
      21:55:35:~/work/actual-server:(master) [0]▶ flyctl deploy
      ==> Verifying app config
      --> Verified app config
      ==> Building image
      ==> Creating build context
      --> Creating build context done
      ==> Building image with Docker
      ....
      --> Pushing image done
      image: registry.fly.io/lively-meadow-7214:deployment-1651888549
      image size: 242 MB
      ==> Creating release
      --> release v2 created
      
      --> You can detach the terminal anytime without stopping the deployment
      ==> Monitoring deployment
      
       1 desired, 1 placed, 1 healthy, 0 unhealthy [health checks: 1 total, 1 passing]
      --> v0 deployed successfully
  ```

Now you have a live app running on [Fly.io](http://Fly.io)!

## 🌴Actual live on [Fly.io](http://Fly.io)

With a few commands and almost no thought required, I have a self-hosted Actual live and ready for use. Oh, the pretty pictures I promised!

The very first thing you’re greeted with is Actual prompting for server configuration, explained [in more depth in the repo](https://github.com/actualbudget/actual-server#configuring-the-server-url). **TL;DR** You can just pick `Use this domain` and not worry about it.

![Opening screen for Actual budgeting software prompting for server URL](/uploads/actual-budget-landing-smaller.png)

After that, I chose the option to fill Actual with demo data so I could play around and actually check out it’s features (see the image at top of page again).

## Fin

I gotta hand it to the team at Fly, they’ve made it a very slick process for your first apps. Also thanks & congrats to [@jlongster](https://twitter.com/jlongster) for building out a slick little tool and [open-sourcing it for the community](https://news.ycombinator.com/item?id=31206536). Best of luck to them both.

Questions? Concerns? Big hugs? Let me know what you’re thinking on [Twitter](https://twitter.com/maybekq).
