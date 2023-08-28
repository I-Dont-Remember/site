+++
title = "Learning Platform Risk the Hard Way - Lessons from Workflow Buddy's Demise"
date = 2023-08-28T05:00:00.000Z
description = "Slack is shutting down the functionality that powers the open-source app I built for Workflow Builder, their Nocode automation tool. I (hopefully) learned some lessons about time-sensitive opportunities, what makes a good problem, the joy of enthusiastic customers, and platform risk."
+++

\> TL;DR: Slack is shutting down the functionality that powers the open-source app I built for Workflow Builder, their Nocode automation tool. I (hopefully) learned some lessons about time-sensitive opportunities, what makes a good problem, the joy of enthusiastic customers, and platform risk.

A few years ago, Slack acquired a neat app & then released it as a Nocode automation platform (Workflow Builder)  -  right in Slack! There's lots of opportunities to automate day-to-day efforts in Slack, and making tools that let non-developers take part is a fantastic goal. I was super excited when I started playing with Workflow Builder, and as a developer myself, I was eager for them to release updates that would enable power users to get creative with new Workflows & using their \`Steps from Apps\` feature to plug in so many other tools. Sadly, Workflow Builder started off strong.... and then seemed to just drift along without adding many new capabilities.

Tinkering with Workflow Builder had given me a bunch of ideas for ways to improve it, and which seemed possible to implement without working internally at Slack thanks to the hero who added the \`Steps from Apps\` functionality, allowing regular Slack Apps to hook into Workflow lifecycles & actions. This is where I learned my first lesson.

\## Lesson 1: opportunities are time-sensitive

\*\*Opportunities are time-sensitive, and don't care if you're "busy".\*\* I sat on the idea without attempting it, because at the time, I kept my calendar full with productive procrastination & consuming startup articles in the hopes they would magically make things happen, and \[didn't leave myself any slack]\(https://fs.blog/slack/) \_(not the company! 😄)\_ in life to experiment in new directions. Eventually, in Sept 2022 I finally gave myself the chance to build and launch an MVP.

The very first version was super basic, just enough to test that the ideas I thought might work (such as adding \`Steps\` for HTTP Requests, event proxying, etc.) actually did what was expected. It had dirty hacks like using a JSON file as a DB, because it didn't need to be fancy. Once I confirmed it all worked, my eyes lit up and I was off to the races. I won't bore you with the details, but I got excited and started sprucing up the codebase & documenting the tool in the hopes of releasing it. It needed a name - so after 30 seconds of thought, it became Workflow Buddy.

I released it as open-source from the start, with no reasoning behind it other than \_"I wanted to"\_. I've benefited tremendously from the open-source world, and I've always wanted to share a little something back. In the past, I've struggled with perfectionism in projects and getting too into the weeds. With Buddy, I tried to combat this by pushing it out while I was still unhappy with the developer experience, the code base, the testing, the documentation - all of it needed work!

\## Lesson 2: Good problems don't require perfectly optimized solutions

Workflow Buddy was frustrating to self-host, even though I tried to keep things relatively simple. Users who just wanted to self-host and test it out it needed to:

\- Figure out how to create a Slack app, especially if they've never done it before

\- Cloning a git repo and making changes

\- Put all the secrets in the right places

\- Be allowed to deploy to Fly.io at work, or know enough to figure out an alternative deployment strategy for the Docker container

I'm leaving out a lot here, but you get the gist. Even just setting up to trial Buddy to see if it actually solved your problem was at least an hour endeavor. Luckily for me, after posting it on Reddit and a couple other places, I actually had a trickle of people using it! It turns out people will push through a lot of hurdles if they really wanna solve something, so you don't need to have the perfect onboarding flow, or documentation, or feature set, or whatever micro-optimization you're considering. \*\*Good problems don't require a perfectly optimized solution if you nail the core functionality.\*\* I'd almost go so far as to say your ideas SHOULD have a crappy landing page, ugly UX, missing features - as long as the core idea is rock solid.

\## Lesson 3: enthusiastic users are intoxicating

When Workflow Buddy didn't immediately get 50 billion installs, I was disappointed. I had built a lofty vision in my head, which despite being wildly unrealistic, still hurt when it didn't happen. I started to lose a bit of steam on the project, when all of a sudden - my first GitHub Issue appears! This turned out to be the beginning of many interactions with J \*(name changed for privacy)\* from https://www.iculture.nl/ - who taught me that \*\*enthusiastic users are intoxicating\*\*. 

As a developer of tools, much of the time it feels like chucking work into a silent void. Even if you run a SaaS and can see people using the tool, it's pretty silent up in the cockpit unless you break something critical. J had gone through the trouble of setting up Workflow Buddy to solve one of their frustrating problems, and had tons of feedback and ideas. Even though the app only had a few users, I was super motivated to keep improving it and documenting it because of J's enthusiasm and appreciation for my work. Maybe I'm just a sucker for a pat on the head, who knows.

\## Lesson 4: Platform Risk sucks when it's your turn

Warning signs had been on the horizon for a while. Slack had been putting out info about a new automation platform, including changes to Workflow Builder. I had built and continued contributing to Workflow Buddy in spite of the ominous dark clouds, because I've had too many situations in the past where I let a potential change (that never came to pass) dissuade me from starting.

In August, Slack released \[their official statement]\(https://api.slack.com/changelog/2023-08-workflow-steps-from-apps-step-back) announcing \`Steps from Apps\` \_(which powers Workflow Buddy)\_ would be shut down on Sept 12, 2024. I had seen mentions of it in other places, but reading it officially felt like a kick in the teeth. \*\*\[Platform risk]\(https://www.startupillustrated.com/Archive/Platform-Risk/) sucks when the reaper calls your name\*\*.

\## The ride comes to an end

Building on a platform like Slack has been a wonderful experience, and I knew the risks going in. I don't regret giving it a shot, I only regret not building it sooner to see what it could have become.

Workflow Buddy gave me a chance to build out a full-fledged open source product, to practice writing good documentation & tutorials to ease onboarding new customers, learned some important lessons, and I even got a chance to meet the Product Manager for Workflow Builder at the time. 

\## What's next for Workflow Buddy?

I'll be keeping the hosted version of Workflow Buddy operational right up until Slack shuts things down on Sept 12, 2024. In the meantime, I'll be exploring Slack's new platform and seeing if I can port Workflow Buddy's functionality over.
