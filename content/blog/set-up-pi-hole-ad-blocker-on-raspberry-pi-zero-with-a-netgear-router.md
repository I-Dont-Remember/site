+++
categories = ["Guides"]
date = 2021-12-11T05:00:00Z
description = "Learn how to set-up the Pi-hole ad blocker on a headless Raspberry Pi Zero and connect your Android and Windows devices for maximum adblock protection!"
images = ["/uploads/setup-pi-hole-raspberrypi-og.png"]
tags = ["pi-hole", "privacy", "raspberrypi"]
title = "Set Up Pi-hole Ad Blocker on Raspberry Pi Zero with a Netgear Router"

+++
You want an awesome ad blocker on your local network using [Pi-hole](https://pi-hole.net), but don't want to dig for answers? You're in the right place. This quick guide will walk you through the generic Raspberry Pi setup, install and configure Pi-hole, then manually connect devices.

**Why manually connect devices instead of the Pi-hole default?** If you live with other people, they get frustrated when their browsing experience breaks inexplicably. In my experience, they are not amazed by how many ad requests you've blocked enough to warrant the interruptions.

---

## Pre-reqs

- Raspberry Pi
- SD card (8+ GB)
- adapter to use SD card with your computer

## Setting up the Raspberry Pi

These steps assume you want to have your Pi connected to your local Wi-Fi network and use SSH.

_Alternative: SSH over USB_
> _It turns out it’s also possible to connect directly over a USB connection! These are [the directions](https://howchoo.com/pi/raspberry-pi-gadget-mode) if you want to try it - it changes the Pi config so you are able to SSH over the USB connection as if it was Ethernet, how cool!_


1. **Install the [Raspberry Pi official imaging tool](https://www.raspberrypi.com/software/)**.

2. **Load SD card into adapter and connect to your computer**.

3. **Using the imaging tool, [load the standard Raspberry Pi OS](https://www.youtube.com/watch?v=ntaXWS8Lk34)**.

     > *You should now see a `boot` drive available. You’ll know you’re in the    right place if you see several* `*.elf` *files. We’ll make a couple small tweaks to enable headless Wi-Fi access.*

4. Boot up your Pi and try connecting to the default address
    ```
    ssh pi@raspberry.local
    ```

5. Once you’re inside, you’ll want to use `sudo raspi-config` to edit the password as well as the hostname, for security reasons and to avoid conflicts if you end up with more Pis in the future. After making your changes, reboot, and try connecting again.
    ```
    ssh pi@<new_hostname>.local
    ```


6. _(Optional) Security people will tell you should also set up your own user that isn’t `pi` and remove `pi` so an attacker trying default Raspberry Pi credentials can’t get into your machine._

🤖 You’re ready to get Pi-hole running!

## Configuring Pi-hole

The maintainers of the project do an excellent job keeping this step as friction free as possible.

1. **Set a static IP in the Netgear dashboard**.

2. After `ssh`ing to the Pi, run [the install script](https://github.com/pi-hole/pi-hole#alternative-install-methods). **⭐ Make sure to save the password it gives you**.

Once loading and setup have finished, reboot the Pi. Give it a minute or two, then in your browser try navigating to `http://<static_ip>/admin`. If everything went well, you should be greeted by the Pi-hole admin dashboard🥧🕳!

## Connecting devices and blocking ads

[There are several ways to use Pi-hole on your network to protect devices](https://discourse.pi-hole.net/t/how-do-i-configure-my-devices-to-use-pi-hole-as-their-dns-server/245), as I mentioned earlier, we’ll only be covering the manual device configuration here. If you’re dipping your toes into the idea and live with others, I do recommend this approach to start and deciding to expand later on.

- **Android phone**

- [**Windows desktop over Ethernet**](https://www.windowscentral.com/how-change-your-pcs-dns-settings-windows-10)

- **Linux laptop** - followed the steps to edit network DNS servers from [the article above](https://discourse.pi-hole.net/t/how-do-i-configure-my-devices-to-use-pi-hole-as-their-dns-server/245).

## Wrap up

One of the most interesting things I find from running network-level ad blocking is seeing the amount of background activity as you browse. Even simple pages might load a chat client, feature flag, crash-reporting, telemetry, and more! I’ve noticed this to be especially true for mobile devices. It may look like they’re sitting quietly while you sleep, but they are actually a hum of activity all night. You’ll run into all sorts of fun here, so welcome to the world of [Pi-hole](https://pi-hole.net) - adventure awaits!