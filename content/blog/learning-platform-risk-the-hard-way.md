+++
title = "Learning Platform Risk the Hard Way - Lessons from Workflow Buddy's Demise"
date = 2023-08-28T05:00:00.000Z
description = "Slack is shutting down the functionality that powers the open-source app I built for Workflow Builder , their Nocode automation tool. I (hopefully) learned some lessons about what makes a good problem, the joy of enthusiastic customers, time-sensitive opportunities, and platform risk."
+++

> `TL;DR:` *Slack is shutting down the functionality that powers the [open-source app](https://github.com/happybara-io/WorkflowBuddy) I built for [Workflow Builder](https://slack.com/features/workflow-automation), their Nocode automation tool. I (hopefully) learned some lessons about what makes a good problem, the joy of enthusiastic customers, time-sensitive opportunities, and platform risk.*

In 2018, Slack acquired a [neat app](https://www.robotsandpencils.com/work/high-tech/missions/), then released it in 2019 as a Nocode automation platform (*[Workflow Builder](https://slack.com/features/workflow-automation)*)  -  right in Slack!  I was super excited when I started playing with Workflow Builder. As a developer, I was eager for updates enabling power users to get creative with new Workflows, and to use  Steps from Apps to plug into other tools. Sadly, Workflow Builder started off strong.... and then seemed to drift along, hardly adding any new capabilities.


Tinkering with Workflow Builder got my brain spinning with ideas. It felt like there were plenty of quick wins to improve the capabilities & user experience. Thanks to the hero who added Steps from Apps (connects regular Slack Apps to Workflows) it seemed possible for an outsider to contribute.

## Building the MVP

The first version was super basic, just enough to make sure my ideas actually worked in the real world like they did in my head. It had dirty hacks like using a JSON file as a database, for simplicity & speed. When I saw the app finally chugging along running `Steps`, my eyes lit up, and I was off to the races. It needed a name - 30 seconds later, `Workflow Buddy` was born.

I released it as open-source from the start, with no reasoning behind it other than *"I wanted to"*. I've benefited tremendously from the open-source world, and I've always wanted to share a little something back. In the past, I've struggled with perfectionism in projects and getting too into the weeds. With Buddy, I tried to combat this by releasing before I felt comfortable. There were so many places I could optimize & perfect:  the developer experience, the code base, the testing, the documentation.  People can't benefit from your project if you never release it!


## Lesson 1: Good problems don't require perfectly optimized solutions

Workflow Buddy was frustrating to self-host, even though I tried to keep things relatively simple. Users who wanted to test it out it needed to:

* *Figure out how to create a Slack app, especially if they've never done it before*
* *Clone a git repo and make changes*
* *Put all the secrets in the right places*
* *Be allowed to deploy to Fly.io at work, or know enough to figure out an alternative deployment strategy for the Docker container*
* *and more...*

I'm leaving out a lot here, but you get the gist. It was at least an hour-long endeavor to set up Buddy just to try it. If Twitter had taken an hour before you could use it, it would be dead in the water. Luckily for me, after posting it on Reddit, I actually had a trickle of people brave enough to try.

It turns out people will push through a lot of hurdles if they really want to solve something. You don't need the perfect onboarding, docs, features, or whatever micro-optimization you're considering. **Good problems don't require a perfectly optimized solution if you nail the core functionality.** I'd almost go so far as to say your ideas SHOULD have a crappy landing page, ugly UX, missing features *(as long as the core idea is rock solid)*. Why? If the product is ugly or difficult to use and solves a problem, it will get used. If it's difficult and only marginally useful, it will get dropped. If a product is pretty and has great UX but is marginally useful, people might occasionally use it and give you false signals that it's worth pursuing.

## Lesson 2: enthusiastic users are intoxicating

When Workflow Buddy didn't immediately get 50 billion installs, I was disappointed. I had built a lofty vision in my head, which despite being wildly unrealistic, still hurt when it didn't happen. I started to lose a bit of steam on the project, when all of a sudden - my first GitHub Issue appears! This turned out to be the beginning of many interactions with **J** *(name changed for privacy)* from https://www.iculture.nl/ - who taught me that **enthusiastic users are intoxicating**.

As a developer of tools, much of the time it feels like chucking work into a silent void. Even if you run a SaaS and can see people using the tool, it's pretty silent up in the cockpit, unless you break something critical. J had gone through the trouble of setting up Workflow Buddy to solve one of their frustrating problems, and had tons of feedback and ideas. Enthusiastic users are both a strong signal that your onto something with the project, and also incredibly motivating. Even though the app only had a few users, I was super excited to keep improving it because of J's enthusiasm and appreciation for my work.

## Lesson 3: Build what you need, not what you can

With my excitement around the tool, my mind was racing with ideas for new `Step Action`s I could add. Looking back though, the overwhelming majority of Workflow Buddy usage is around the HTTP Request step, and I didn't need to add tons of other `Actions` because no one was using them, or even asking for them. Adding features comes at a cost of increased complexity and decreased flexibility to make changes in your app. Users only use a small fraction of the capabilities of your app, so **build what you need, not what you can**.

## Lesson 4: opportunities are time-sensitive

I sat on the idea for many months without attempting it. At the time, I kept my calendar full with productive procrastination & consuming startup articles, in the hopes they would magically make things happen. I [didn't leave myself any slack](https://fs.blog/slack/) *(not the company! )* in life to experiment in new directions. In Sept 2022 I finally gave myself the chance to build and launch an MVP. Spoiler, you're reading this in 2023 (or later) because Slack chose to deprecate the functionality. For the short time it was around, Workflow Buddy had good signs of life - a small number of enthusiastic customers, a good problem, and growing traffic. I even had Slack's Product Manager for Workflow Builder (at the time) reach out to chat about Buddy!


I obviously can't predict alternate timelines, but if I had released it a couple years earlier when Workflow Builder was getting more investment from Slack... I can't help but feel like it could have had a more interesting outcome. **Opportunities are time-sensitive, and won't wait if you're "busy".**

## Lesson 5: Platform Risk sucks when it's your turn


Warning signs had been on the horizon for a while. Slack had been putting out info about a new automation platform, including changes to Workflow Builder. I continued contributing to Workflow Buddy in spite of the ominous dark clouds. I didn't want to repeat my past mistakes of dissuading myself from projects before I even start.

In August, Slack released [their official statement](https://api.slack.com/changelog/2023-08-workflow-steps-from-apps-step-back) announcing `Steps from Apps` *(which powers Workflow Buddy)* would be shut down on ***Sept 12, 2024***. I had seen mentions of it in other places, but reading it officially felt like a kick in the teeth. **[Platform risk](https://www.startupillustrated.com/Archive/Platform-Risk/) sucks when the reaper calls your name**.

If you want to build on top of a platform, make sure you've considered what would happen if it all changed tomorrow, and where it would leave you. It's fine to take risks, as long as you take steps to minimize the potential damage, e.g. don't take out a humongous loan you can only pay back if the platform doesn't change.

## The ride comes to an end

Building on a platform like Slack has been a wonderful experience, and I knew the risks going in. I don't regret giving it a shot, I only regret not building it sooner to see what it could have become.

Workflow Buddy gave me a chance to build out a full-fledged open source product, to practice writing good documentation & tutorials to ease onboarding new customers, learned some important lessons, and I even got a chance to meet the Product Manager for Workflow Builder at the time.
