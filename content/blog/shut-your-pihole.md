+++
date = 2017-09-20T05:00:00Z
categories = ["Archive"]
images = []
title = "Shut your PiHole!"
+++

At my apartment we have a new friend...Pi Hole!  

[PiHole Github](https://github.com/pi-hole/pi-hole)  

My Raspberry Pi has been gathering dust since none of my recent projects have had any use for it, so I figured until such time as I have an idea for it it will provide a black hole function for us.  It was quite simple to setup, all it takes is to run the installer (you were good and didn't pipe to bash right?)  
[Don't Pipe to Your Shell](https://www.seancassidy.me/dont-pipe-to-your-shell.html)  

  and when prompted assign it a static ip outside of your routers DHCP range (usually easily searchable by brand).  Then you can enter the router configuration site and under DHCP/ DNS settings set the static ip for DNS to be the assigned address of the Pi from before.  And just like that you're up and running!  

  The biggest challenge for us to start was we forgot to add an initial whitelist, so the only things that were on it were the ad-list domains.  After sitting down and collecting many of the most common from around the web everything is running smoothly.  

  I highly recommendd looking into it, it's quite fun to start seeing data about ads and your household network.
