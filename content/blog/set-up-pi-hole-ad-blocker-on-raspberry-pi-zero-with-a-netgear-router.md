+++
categories = ["Guides"]
date = 2021-12-11T05:00:00Z
description = "Learn how to set-up the Pi-hole ad blocker on a headless Raspberry Pi Zero and connect your Android and Windows devices for maximum adblock protection!"
draft = false
images = ["/uploads/pihole-dashboard.png"]
tags = ["pi-hole", "raspberry pi", "privacy"]
title = "Set Up Pi-hole Ad Blocker on Raspberry Pi Zero with a Netgear Router"

+++
After taking a break for a couple years from [Pi-hole](https://pi-hole.net), I'm back baby! My Raspberry Pi Zero has been sitting in a box for a while and it deserves to be back in use as an ad blocker.

Why did I originally stop? I had Pi-hole enabled for my entire apartment, but got numerous complaints from the curmudgeonly dwellers that certain popular sites, like Instagram, wouldn't work even after I tried to whitelist. Eventually I pulled the plug and went back to drowning in ads (not really, [uBlock Origin](https://github.com/gorhill/uBlock/wiki/Can-you-trust-uBlock-Origin%3F) is a hero 🦸).

This time, I'm setting it manually per device to avoid disrupting anyone but myself. First we'll do the generic Raspberry Pi setup, install and configure Pi-hole, then manually connect my devices.

## Pre-reqs

* Raspberry Pi
* SD card (8+ GB)
* adapter to use SD card with your computer

## Setting up the Raspberry Pi

These steps assume you want to have your Pi connected to your local Wi-Fi network. It turns out it's also possible to connect directly over a USB connection! These are [the directions](https://howchoo.com/pi/raspberry-pi-gadget-mode) if you want to try it - it changes the Pi config so you are able to SSH over the USB connection as if it was Ethernet, how cool! On to the regular people steps:

1. Install the [Raspberry Pi official imaging tool](https://www.raspberrypi.com/software/).
2. Load SD card into adapter and connect to your computer.
3. Using the imaging tool, [load the standard Raspberry Pi OS](https://www.youtube.com/watch?v=ntaXWS8Lk34).
4. You should now see a `boot` drive available. You'll know you're in the right place if you see several `*.elf` files. We'll make a couple small tweaks to enable headless Wi-Fi access.
   1. Create an empty file named `ssh` . This tells the Pi to enable SSH on startup.
   2. Create `wpa_supplicant.conf`, then add the following config after updating it to match your network:

          country=US
          ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
          update_config=1
          network={
            ssid="Wifi Network Name"
            psk="wifinetworkpassword"
            key_mgmt=WPA-PSK
          }

5. Boot up your Pi and try connecting to the default address: `ssh pi@raspberry.local`.
6. Once you're inside, you'll want to use `sudo raspi-config` to edit the password as well as the hostname, for security reasons and to avoid conflicts if you end up with more Pis in the future. After making your changes, reboot, and try to `ssh pi@<new_hostname>.local.`
7. **(Optional)** Security people will tell you should also set up your own user that isn't `pi` and remove `pi` so an attacker trying default Raspberry Pi credentials can't get into your machine.

You're ready to get Pi-hole running!

## Configuring Pi-hole

The maintainers of the project do an excellent job keeping this step as friction free as possible.

1. Set a static IP in the Netgear dashboard.

   > Head to `http://192.168.1.1` (might be slightly different for your router) and login with admin credentials, which can be found on the back of the device.
   > Under `Advanced > LAN Setup` there is an option to set `Address Reservation` for devices. Add one for your Pi, if this is your first one it should be fine to just use the address it's already assigned.
2. After `ssh`ing to the Pi, run [the install script](https://github.com/pi-hole/pi-hole#alternative-install-methods). Make sure to save the password it gives you.

Once loading and setup have finished, reboot the Pi. Give it a minute or two, then in your browser try navigating to `http://<static_ip>/admin`. If everything went well, you should be greeted by the Pi-hole admin dashboard!

## Connecting devices and blocking ads

[There are several ways to use Pi-hole on your network to protect devices](https://discourse.pi-hole.net/t/how-do-i-configure-my-devices-to-use-pi-hole-as-their-dns-server/245), as I mentioned earlier, we'll only be covering the manual device configuration here. If you're dipping your toes into the idea and live with others, I do recommend this approach to start and deciding to expand later on.

* **Android phone**
  * In router settings, like we did in [Configuring Pi-hole](#configuring-pi-hole "Configuring Pi-hole"), I set a static IP for my phone.
  * On the phone, open `Settings > Wi-Fi` , find your connection, click the ⚙️ icon, then edit. Change the `IP settings` from DHCP to Static, which will allow you to set advanced configuration. Set `IP address` to the previous step's value, and `DNS 1` to your Pi address (I added `1.1.1.1` as a backup, which is [Cloudflare](https://www.cloudflare.com/learning/dns/what-is-1.1.1.1/)).

    ![Android Wi-Fi Settings page](/uploads/android-static-ip-small.png)

* [**Windows desktop over Ethernet**](https://www.windowscentral.com/how-change-your-pcs-dns-settings-windows-10)
* **Linux laptop** - followed the steps to edit network DNS servers from [the article above](https://discourse.pi-hole.net/t/how-do-i-configure-my-devices-to-use-pi-hole-as-their-dns-server/245).

## Wrap up

One of the most interesting things I find from running network-level ad blocking is seeing the amount of background activity as you browse. Even simple pages might load a chat client, feature flag, crash-reporting, telemetry, and more. I've noticed this to be especially true for mobile devices. It may look like they're sitting quietly while you sleep, but they are actually a hum of activity all night. You'll run into all sorts of fun here, so welcome to the world of Pi-hole - adventure awaits!