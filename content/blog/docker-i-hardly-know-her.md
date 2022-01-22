+++
date = 2017-07-08T05:00:00Z
categories = ["Archive"]
images = []
title = "Docker? I Hardly Know Her!"
+++

That may or may not be the last pun on this page, turn back now if you can't handle the highest form of comedy known to man.  

Alrighty, so Docker.  It's neat, it's hip, it's the cool new lingo you hear on the buzzword streets.  I got the pleasure of starting to delve into Docker a couple weeks ago, and it is super awesome once you start seeing ways it can simplify your life.  Thanks to Docker, instead of spending tons of time figuring out how to configure nginx and WSGI or whatever they are on AWS for my Flask sms2sheets project, a neat Docker [image](https://hub.docker.com/r/tiangolo/uwsgi-nginx-flask/)
lets you pretty much just plug in your app and let it run on a much more robust server than the one built into Flask.  

You can also use it to run filesystems/ubuntu/etc and have a very light-weight VM (There are some big distinctions between the containers Docker uses and VMS, but that is beyond the scope of what I want to say and has been covered by much smarter people).  

One good use for Docker is to allow you to run scripts/commands in an environment that is separate from your PC, which can allow you to play without much risk just like a VM.  You can even bind mount directories and files, so if you want something output or to bring files in to use it's totally doable!