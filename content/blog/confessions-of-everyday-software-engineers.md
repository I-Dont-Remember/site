+++
categories = ["Software Development"]
date = 2023-01-12T06:00:00Z
description = "A small collection of confessions from everyday devs at companies across the industry. When impostor syndrome strikes, they can act as a reminder that we're all human."
draft = false
images = []
tags = ["FAANG", "Leetcode", "confessions", "software-engineering"]
title = "Confessions of Everyday Software Engineers"

+++
Impostor syndrome sucks, and without hearing from real people, you can easily assume every software engineer is a god-tier FAANG architect mage who eats Leetcode Hard problems for breakfast, and never makes a mistake (_or at least, I did)_. Luckily, there's some normal people out here, too, but we’re the quiet majority.

Read on for a small collection of real world confessions from anonymous devs. These people work at companies ranging from tiny 2 person startups, up to the FAANG companies you can't stop gushing over.

## Why am I minimally qualified to write this?

* I’ve been a software engineer at a Fortune 100 since 2019, had a couple internships in other companies, and been building side projects all the while.
* There are really smart developers at FAANG, Fortune X, and startups that let me hang out with them, for unknown reasons. Ostensibly for friendship, but I have a hunch they all need my kidneys.
* Reformed code purist - I used to feel like every codebase should have perfect test coverage, no linting errors, the most efficient architecture, and so on. Anyone who didn't was clearly a [lazy, terrible, no good, very bad](https://en.wikipedia.org/wiki/Alexander_and_the_Terrible,_Horrible,_No_Good,_Very_Bad_Day) developer. Guess what? Now **I’m** that lazy, terrible, no good dev without a perfect codebase!

## Confessions of real-world software engineers

Since I probably have to add this disclaimer:

> _This list is meant to be a transparent look into reality to help those with Impostor Syndrome. If you are trying to use this list in a negative way, I’ll be disappointed._
>
> _The `I...` is to make them easy to read, not claiming them as my own. A small number of the following are from myself, the rest are from friends, acquaintances, and reading between the lines of online posts on places like Reddit and Teamblind._

### Technical

* I Google 70% of my problems and take credit when the internet solves it for me.
* I can't remember how to write even simple syntax - I end up Googling _"how to read a csv with Python"_ once a month.
* I never use a debugger - I exclusively use `print()` / `console.log()` / `prinft()` and dig through whatever log system it shows up in. With high level languages, I'm always able to get enough context to understand where I screwed up.
  * Anonymous Mobile Developer: _"I hardly ever test with a real device. Always an emulator"_

  > _caveat: from my past experience this is less true the lower in the stack you go, as when I was working with C and embedded languages, stepping through a debugger was a godsend. There's a reason they exist._
* Code Reviews: they don't all get the same quality.
  * We need approval to merge into any branch, even dev/test ones. At this point, we just send links in our team group chat and someone clicks it, no review done.
  * The quality of my code review is heavily influenced by how important the service is, how impactful the change is, and how frequently we deploy/how quickly I could get a fix out if anything broke. Ask forgiveness, not permission - but for code. [LGTM 🙈](https://justtechdebt.com/articles/dev-already-abandoned-new-years-resolution-to-actually-read-prs/)!
* I write kludges, hacks, and hardcoded data into software.
  * Similar reasons to `Code Reviews` section. If the cost of a user hitting an error is minimal, and I can quickly push a fix - investing extra energy doesn’t seem worth it. Plus, if your product is still in the Explore of the “_Explore, Exploit_” framework, that feature might be thrown out soon anyway.
* I always use `if (true == x){} [in my code]`.
* Sometimes I don't fix errors or warnings.
  * It sucks to see the big red notifications over and over, but if they aren't murdering people with each invocation, is it worth the opportunity cost of the engineering time?
* At work, I build fairly simple tools that an entry-level web dev could run circles around.
  * This is true for friends at very large companies especially. The bar for getting in is **HIGH**, but once you're in, it's all about the business value that your work brings. A silly CRUD app helping bring in $50 million is gonna be valued higher than a Kubernetes masterpiece that doesn't need to exist.
  * This can make it frustrating when trying to bring in people you know have the skills you need, but don’t get hired because they struggle with getting past the Leetcode barrier to join you.
* I submitted a 1-line PR and became an open source contributor.
  * I didn't write the next Linux, [I let people use emojis easier](https://github.com/phibr0/obsidian-emoji-shortcodes/pull/24). Doesn't need to be a big splash on your first attempt.

### Business/Product/Agile

* I make contributions to code, but I don't really understand how the system works.
  * Someone with more context says _"this is a worthwhile change_" and I go "_OK_".
  * I don't think I'll ever completely understand how any one piece of software works. There's always things I don't know yet and i don’t know when that feeling will stop.
* I space out during Agile refinement meetings - then randomly guess 3pts for the story. Sometimes I'll have to B.S. for a bit if everyone else picked differently.
* Software engineer and software developer are the same thing - engineering just makes you sound important, but we're all building CRUD apps at the end of the day.
* I’m the only one on my team who really knows how to code, so I sometimes stretch work that should take a day by a couple extra to skew their view of how long certain projects will take me to complete.

## Impostor Syndrome

On a serious and unfortunate note, there is no cure for Impostor Syndrome. Like maintaining software, there will be updates and patches needed as you encounter new experiences. There are days where I feel like I am a fraud, and everyone around me is too nice to say that I write garbage code. In the end, we all write bugs and make dumb mistakes, so it's important to have a sense of humor and learn from them, rather than feeling guilty or embarrassed. Knowing others face the same doubts makes it just a little bit easier.