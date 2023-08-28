+++
title = "Learning Platform Risk the Hard Way - Lessons from Workflow Buddy's Demise"
date = 2023-08-28T05:00:00.000Z
description = "Slack is shutting down the functionality that powers the open-source app I built for Workflow Builder , their Nocode automation tool. I (hopefully) learned some lessons about what makes a good problem, the joy of enthusiastic customers, time-sensitive opportunities, and platform risk."
+++


> `TL;DR:` _Slack is shutting down the functionality that powers the [open-source app](https://github.com/happybara-io/WorkflowBuddy) I built for [Workflow Builder](https://slack.com/features/workflow-automation), their Nocode automation tool. I (hopefully) learned some lessons about what makes a good problem, the joy of enthusiastic customers, time-sensitive opportunities, and platform risk._

In 2018, Slack acquired a [neat app](https://www.robotsandpencils.com/work/high-tech/missions/) & then released it in 2019 as a Nocode automation platform (Workflow Builder)  -  right in Slack!  I was super excited when I started playing with Workflow Builder, and as a developer myself, I was eager for them to release updates that would enable power users to get creative with new Workflows & using their `Steps from Apps` feature to plug into so many other tools. Sadly, Workflow Builder started off strong.... and then seemed to just drift, hardly adding any new capabilities.

Tinkering with Workflow Builder had given me a bunch of ideas to improve the user experience & features, and which seemed possible to implement without working internally at Slack thanks to the hero who added the `Steps from Apps` functionality, allowing regular Slack Apps to hook into Workflow lifecycles & actions.

## 👷 Building the MVP

The very first version was just enough to test the ideas I thought might work (such as adding `Steps` for HTTP Requests, event proxying, etc.) _**ACTUALLY**_ did what was expected. It had dirty hacks, like using a JSON file as a DB. Once I confirmed all my ideas were possible, my eyes lit up, and I was off to the races. I won't bore you with the details, but I got excited and started sprucing up the codebase & documenting the tool in the hopes of releasing it. It needed a name - 30 seconds later, `Workflow Buddy` was born.

I released it as open-source from the start, with no reasoning behind it other than _"I wanted to"_. I've benefited tremendously from the open-source world, and I've always wanted to share a little something back. In the past, I've struggled with perfectionism in projects and getting too into the weeds. With Buddy, I tried to combat this by pushing it out while I was still unhappy with the developer experience, the code base, the testing, the documentation - all of it needed work!

## Lesson 1: Good problems don't require perfectly optimized solutions

Workflow Buddy was frustrating to self-host, even though I tried to keep things relatively simple. Users who wanted to test it out it needed to:

- _Figure out how to create a Slack app, especially if they've never done it before_
- _Cloning a git repo and making changes_
- _Put all the secrets in the right places_
- _Be allowed to deploy to Fly.io at work, or know enough to figure out an alternative deployment strategy for the Docker container_
- _and more..._

I'm leaving out a lot here, but you get the gist. It was at least an hour-long endeavor to set up Buddy just to try it. If Twitter had taken an hour before you could use it, it would be dead in the water! Luckily for me, after posting it on Reddit, I actually had a trickle of people brave enough to try.

It turns out people will push through a lot of hurdles if they really want to solve something. You don't need to have the perfect onboarding flow, or documentation, or feature set, or whatever micro-optimization you're considering. **Good problems don't require a perfectly optimized solution if you nail the core functionality.** I'd almost go so far as to say your ideas SHOULD have a crappy landing page, ugly UX, missing features _(as long as the core idea is rock solid)_. Why? If the product is ugly or difficult to use and solves a problem, it will get used. If it's difficult and only marginally useful, it will get dropped. If a product is pretty and has great UX but is marginally useful, people might occasionally use it and give you false signals that it's worth pursuing.

## Lesson 2: enthusiastic users are intoxicating

When Workflow Buddy didn't immediately get 50 billion installs, I was disappointed. I had built a lofty vision in my head, which despite being wildly unrealistic, still hurt when it didn't happen. I started to lose a bit of steam on the project, when all of a sudden - my first GitHub Issue appears! This turned out to be the beginning of many interactions with **J** _(name changed for privacy)_ from https://www.iculture.nl/ - who taught me that **enthusiastic users are intoxicating**.

As a developer of tools, much of the time it feels like chucking work into a silent void. Even if you run a SaaS and can see people using the tool, it's pretty silent up in the cockpit unless you break something critical. J had gone through the trouble of setting up Workflow Buddy to solve one of their frustrating problems, and had tons of feedback and ideas. Even though the app only had a few users, I was super motivated to keep improving it and documenting it because of J's enthusiasm and appreciation for my work. Maybe I'm just a sucker for a pat on the head, who knows.

## Lesson 3: Build what you need, not what you can

With my excitement around the tool, my mind was racing with ideas for new `Step Action`s I could add. Looking back though, the overwhelming majority of Workflow Buddy usage is around the HTTP Request step, and I didn't need to add tons of other `Actions` because no one was using them, or even asking for them. Adding features comes at a cost of increased complexity and decreased flexibility to make changes in your app. Users only use a small fraction of the capabilities of your app, so **build what you need, not what you can**.

## Lesson 4: opportunities are time-sensitive

I sat on the idea without attempting it, because at the time, I kept my calendar full with productive procrastination & consuming startup articles in the hopes they would magically make things happen, and [didn't leave myself any slack](https://fs.blog/slack/) _(not the company! 😄)_ in life to experiment in new directions. Eventually, in Sept 2022 I finally gave myself the chance to build and launch an MVP. Spoiler, you're reading this in 2023 (or later) because Slack chose to deprecate the functionality. For the short time it was around, Workflow Buddy was beginning to show good signs of life - a small number of enthusiastic customers, a good problem, and I even had the product Manager of Workflow Builder at the time reach out to chat about Buddy!

I obviously can't predict alternate timelines, but if I had released it a couple years earlier when Workflow Builder was getting more investment from Slack... I can't help but feel like it could have had a more interesting outcome. **Opportunities are time-sensitive, and won't wait if you're "busy".**

## Lesson 5: Platform Risk sucks when it's your turn

Warning signs had been on the horizon for a while. Slack had been putting out info about a new automation platform, including changes to Workflow Builder. I had continued contributing to Workflow Buddy in spite of the ominous dark clouds, because I didn't want to repeat the mistake of being dissuaded from a project on the off chance it would get change drastically.

In August, Slack released [their official statement](https://api.slack.com/changelog/2023-08-workflow-steps-from-apps-step-back) announcing `Steps from Apps` _(which powers Workflow Buddy)_ would be shut down on Sept 12, 2024. I had seen mentions of it in other places, but reading it officially felt like a kick in the teeth. **[Platform risk](https://www.startupillustrated.com/Archive/Platform-Risk/) sucks when the reaper calls your name**.

## The ride comes to an end

Building on a platform like Slack has been a wonderful experience, and I knew the risks going in. I don't regret giving it a shot, I only regret not building it sooner to see what it could have become.

Workflow Buddy gave me a chance to build out a full-fledged open source product, to practice writing good documentation & tutorials to ease onboarding new customers, learned some important lessons, and I even got a chance to meet the Product Manager for Workflow Builder at the time. 

## What's next for Workflow Buddy?

I'll be keeping the hosted version of Workflow Buddy operational right up until Slack shuts things down on Sept 12, 2024. In the meantime, I'll be exploring Slack's new platform and seeing if I can port Workflow Buddy's functionality over.
