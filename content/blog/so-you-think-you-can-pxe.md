+++
date = 2017-06-05T05:00:00Z
categories = ["Archive"]
images = []
title = "So you think you can PXE?"
description = "Don't hate the title hate the game"
+++

No, I did not, considering I had never even heard of PXE booting until I started my co-op.  Apparently being able to boot over a network is super useful in many ways, and I got to learn how to set it up.  

Some of the details I don't feel should be shared, not that they are hush-hush important but it still feels wrong to discuss anything involving the company, so this won't be step-by-step, more a general overview.  

With that out of the way, we can begin! Like so many of these posts, I will have to update them in the future with more details, as many of them are lost in the stack of post-its I call my life plan.

The main takeaway was creating an ubuntu server VM, installing `tftpd-hpa` and `udhcpd`, former to handle file transfer and the latter used to hand out a static IP to the secondary NIC on my machine.  This then let any embedded board connect directly to that NIC and have the same IP every time, and that made booting as easy as power and ethernet.
