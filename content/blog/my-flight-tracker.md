+++
title = "Turns Out I Didn't Need AI to Build My Flight Tracker"
toc = true
date = 2026-06-15T05:00:00.000Z
categories = [ "Software Development" ]
tags = [ "flights", "Google Sheets", "AI" ]
+++

Recently I was procrastinating and my brain was searching for something to latch onto. After seeing a picture for a pretty looking flight tracker, I was sunk. I HAD to have one. It would not leave my mind no matter how much I told myself that it was silly and I'd probably never look at it.

_"Ah, so obviously you had AI build you a quick snazzy version?"_

No. As far as I see it, AI has made it cheaper to produce code, but it hasn't solved many of the other hurdles that come with maintaining personal software yet. I wanted to minimize the burden on my time & energy, since this is just a fun little app and not a critical utility.

After reviewing the potential approaches of using a flight tracker SaaS, open-source, and building my own, I ended up going with a Google Sheet as my platform of choice.

![Screenshot of the Flight tracking report in Google Sheets](/uploads/flight-tracker-google-sheet.jpg#center)

## Why Google Sheets over others?

I'm on the hook for this software's existence, so I wanted to choose a path which minimizes the mental bandwidth it could take up in the future. Knowing my history with projects, there was a good chance I'd run around for a couple days collecting the data to flesh this tracker out, and then look at it only 5 minutes per year. Do I really want to invest energy self-hosting/building something that I'll almost never use?

After reviewing my key requirements, Google Sheets won out. Really the only thing I'm missing is a pretty map with flight lines.

{{< bootstrap-table "table table-dark table-striped table-bordered" >}}

|                                              | FT SaaS | Open-source | Custom | Google Sheets |
| -------------------------------------------- | ------- | ----------- | ------ | ------------- |
| Data Privacy                                 | ❌       | ✅           | ✅      | ✅             |
| ⭐Maintenance (hosting, bugs, upgrades, etc.) | ❌       | ❌           | ❌      | ✅             |
| Personalized (stats, etc)                    | ❌       | ❌           | ✅      | ✅             |
| Pretty map with all the flight lines         | ✅       | ✅           | ✅      | ❌             |
| No-effort Auth                               | ✅       | ✅           | ❌      | ✅             |
| Backups                                      | ✅       | ✅           | ✅      | ✅             |
{{< /bootstrap-table >}}

## The process to decide

Since I have the attention span of a weak-willed goat, there's a good chance this is a passing fad. I didn't want to invest in anything that would require long-term upkeep beyond occasionally adding a flight.

_Do I want to use an existing Flight Tracker SaaS, a self-hosted service, or roll my own custom version?_

### Considering SaaS options

I first looked into SaaS offerings, since they satisfy my requirement of not having to maintain anything. I made an account with `my.flightradar24.com` so I could compare the actual experience of the tool. It's not bad, a little basic, but the main turnoff is the potential for privacy.

My data has already been spewed across the internet by a hundred services, so it might seem silly for me to care, but I don't want to provide a pristine, validated data source to whatever broker cares about flight information. I want those fuckers to work for it if they want my flight history. Google may not be a perfect alternative, but they already have a lot of data about me, and de-googling myself is going to be a larger effort than I'm ready to tackle for this one spreadsheet of data.

### Self-hosted open-source projects

[AirTrail](https://airtrail.johan.ohly.dk/) had really pretty screenshots on their repo and it looked like it was being maintained with care, so I figured I'd give it a shot. That said, of the various self-hosted options I found, they all seemed to basically do the same thing. Turns out there isn't a ton of innovation to be had in shoving flights into a list and showing them on a map.

The major negative here would be the potential maintenance burden of self-hosting an app for relatively simple data. I could do it on a VPS somewhere, but am I really going to go through all that for a service I'll check maybe a few times a year? I'd spend more time setting it up than I would using it!

Not to mention that in my experience, there's also a lot of "unknown unknowns" maintenance tasks that pop up when running a service and eat up time you didn't expect to spend. People downplay that time cost in the same way they minimize tech debt for software engineers, but it can slip away from you. That "no-effort" WordPress site you put up suddenly consumes 40 hours over the year patching hacked plugins.

### Custom code with AI

Sure, AI would let me spin up a beautiful service perfectly customized for me - but it comes with the same potential self-hosting burden which plagues the open-source approach.

Another danger I will face with a custom app is perfectionism. I just know that if I build this custom, even with AI, it will become a sinkhole sucking in my time with "just one more feature/polish". My brain always activates that mode, whether it's on the most important task of my life, or a fun little flight tracking app.

## 6 months in

I've been using the Google Sheet Flight Tracker for about 6 months, and I couldn't be happier with my choice. I was correct that once I put together the first version, I've only looked at the report once _(apart from occasionally adding new flight data)_.

Since I chose Google Sheets as my application, I've spent:

- `0 minutes` maintaining the core of an app (auth, hosting, etc.)
- `$0` on hosting services
- `my time` on other things I wanted to do

That is a price I can accept for a fun little project.

## Key takeaway

My major takeaway from this experience is that with AI agents making it almost free to produce code, it's more important than ever to exercise your judgement and ask **"SHOULD I"** build this thing, rather than **"CAN I"**. Unless it's also reducing your maintenance burden, the quick initial win might not be as fun later. Next time you're in the same boat, consider if _"Future You"_ will appreciate your decision.

## Further Reading for Software Engineers

- [James Shore: You Need AI That Reduces Maintenance Costs](https://www.jamesshore.com/v2/blog/2026/you-need-ai-that-reduces-your-maintenance-costs)
