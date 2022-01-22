+++
date = 2017-06-21T05:00:00Z
categories = ["Archive"]
images = ["/uploads/daemon-exorcism-small.jpg"]
title = "Killing the Daemon"
+++

Where I work, KDE plasma is the desktop that so happens to reside on my machine.  This will be in no way a complainer post about KDE, since I liked Kubuntu so much I switched my home dual boot over to it.  

Somehow, in the course of setting up the Kubuntu image we use with all the right software versions/removing other software, a daemon was able to survive the purge.  It showed itself very rarely, but every so often when closing out a virtual machine or opening certain apps on the desktop would trigger an annoying popup about the KDE Wallet.  This was perplexing since there seemed to be no KDE wallet software installed on the machine.  Nevertheless, I knew it was my duty to slay this beast before it tore our workplace apart.  

After fruitless searching, I eventually had stumbled upon enough info to finish it.

In `~/.config/kwalletrc` set `Enabled=false`.  

Then, find the daemon:

```  
ps -e | grep wallet   
// should be kwallet something
```

and finish it off with the dreaded `pkill <daemon name>`.

![Daemon Exorcism](/uploads/daemon-exorcism-small.jpg#center)

It has been vanquished.
