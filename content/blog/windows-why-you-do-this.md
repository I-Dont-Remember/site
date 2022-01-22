+++
date = 2017-08-04T05:00:00Z
categories = ["Archive"]
images = ["/uploads/dead-horse.jpg"]
title = "Windows, Why You Do This??"
+++

Since I have now had to fix my Windows 10/Linux dual boot
multiple times now, I figure I probably should start documenting
it to save time in the future (Also, what a great chance to gripe
about Windows amiright?).

Here's the dead horse I might be beating throughout this post:  
![Really dead horse](/uploads/dead-horse.jpg#center)  

So, Windows.  Apparently updating means it's totally acceptable to go
through and crush my boot manager like a lunk head drunk at an
old woman's tea party.  Definitely not cool.

The most important thing I learned the first run through was that in the BIOS, if you set a password, it will let you change the greyed-out values.  Really wish I would have known that before I got a scary looking lock when it tried to boot into ubuntu correctly the first time.  So set those BIOS passwords kids, and disable secure boot 'cuz Linux is more fun.  


For actually getting the boot to happen, ```efibootmgr``` is the angel you've always wanted.  Use that to adjust the boot order, and if things get funky you have to go into Windows (ew) and use the ```bcdedit``` command to make sure it uses grub as the boot manager instead of Windows.

< *This will be a work in progress post as I remember what steps I needed to take to un-crap my laptop each time* >









< *Disclaimer 2: Windows is software, I don't actually have a burning hatred for an inanimate tool.  I might not enjoy it as much as Linux, but I don't waste my time on pointless arguments.* >
