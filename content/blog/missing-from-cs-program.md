+++
categories = ["Software Development"]
date = 2022-04-30T05:00:00Z
description = "Widely useful skills & tools you will be asked to use in your career."
images = []
tags = ["career"]
title = "What My CS Program Didn't Teach"
toc = true

+++
There are skills, tools, and ideas my CS program didn't teach and which I hope to gather here in case someone in the future finds it useful. They should be be ubiquitous and help you solve problems. Think of it like teaching your grandma she doesn't have to print every web page she visits - was her system functional before? Yeah, but it can be so much easier for her. I won't suggest any programming languages or frameworks because they all end up being fads and have strong opinions on both sides, but aim to fill this with core concepts that help regardless of what company you work for.

This is a living list, and is updated whenever I'm reminded of another.

## Things I Wish I learned in my CS Program

### Knowing where to look for answers

It's a common meme that developers are just really good at copy+pasting from Stack Overflow or Google, but it hints at the truth. An important part of programming is not memorizing details, but knowing where (and how) to look for the answers.

### Version Control - Git/GitHub

Takes a very small time investment to learn, but pays off immensely when you are comfortable with the tools you will likely use every single day at a real job.

### Basic command-line/shell usage

You don't need to be a Unix wizard, just get the basics down, learn enough to be dangerous, and you can build from there as you run into unique situations.

90% of the commands you run will fit in a very short list:

    # Moving around
    cd
    
    # Knowing your surrounds
    pwd,ls,cat
    
    # Modifying files
    touch,rm,vim/emacs

While learning (ha, you'll always be learning), [Explain Shell](https://explainshell.com/) can be a handy resource for exploring what is happening in complicated commands.

### Basic scripting

Much like learning to write an Excel formula, knowing a small amount of scripting gives you a swiss army knife to save yourself time in all sorts of random situations.

Bash is gonna be the most universal since it's on almost every Macbook command line (people love their Apple) and easy enough to access from Windows with WSL. Python scripting is handy as well, but I often find that I end up needing a 3rd-party package and am back to having to deal with regular programming language stuff that's not as quick as Bash scripting.

### Making the computer do what you want

My early instruction in Computer Sciences was all done with the Eclipse IDE, writing programs that printed out input. I had no concept of how the things I was writing could be used to actually control the computer to do things I wanted it to. It wasn't until I wrote a program that opened 50 Rick Astley' YouTube tabs that I felt the spark of _"Coding gives me super powers."_ I don't have much advice here other than try to keep that in mind, and attempt to find that spark. I've heard [Automate the Boring Stuff](https://automatetheboringstuff.com/) is a good book for learning how to connect your day-to-day life with the programming you're learning.

### Common situations you will encounter

> _As a software developer, you may be called upon to perform some of these tasks in your career._
>
> _How well a CS degree prepares you for these tasks (and whether it even should prepare you for these) is left as an exercise to the reader._
>
> 🧵
> _1/  -_ [_Twitter🐦_](https://twitter.com/norootcause/status/1475518692041510915)
>
> * _Read the full list in the_ [_'Resources'_](#backup-of-twitter-thread) _section below._

### Markdown

Used all over the place in READMEs and other documentation, takes very little time to get comfortable with it, makes you more productive than popping open another Google Doc.

### MIT: Missing Semester of Your CS Education

_Feb 2023:_ Looks like MIT had a similar idea: ["The Missing Semester of Your CS Education"](https://missing.csail.mit.edu/). Haven't gone through it myself, but upon skimming it seems like a wonderful resource.

* **1/13/20**: [Course overview + the shell](https://missing.csail.mit.edu/2020/course-shell/)
* **1/14/20**: [Shell Tools and Scripting](https://missing.csail.mit.edu/2020/shell-tools/)
* **1/15/20**: [Editors (Vim)](https://missing.csail.mit.edu/2020/editors/)
* **1/16/20**: [Data Wrangling](https://missing.csail.mit.edu/2020/data-wrangling/)
* **1/21/20**: [Command-line Environment](https://missing.csail.mit.edu/2020/command-line/)
* **1/22/20**: [Version Control (Git)](https://missing.csail.mit.edu/2020/version-control/)
* **1/23/20**: [Debugging and Profiling](https://missing.csail.mit.edu/2020/debugging-profiling/)
* **1/27/20**: [Metaprogramming](https://missing.csail.mit.edu/2020/metaprogramming/)
* **1/28/20**: [Security and Cryptography](https://missing.csail.mit.edu/2020/security/)
* **1/29/20**: [Potpourri](https://missing.csail.mit.edu/2020/potpourri/)
* **1/30/20**: [Q&A](https://missing.csail.mit.edu/2020/qa/)

## Advice for those in a college CS program

For those entering or in the middle of college, I have written up my [thoughts and action steps on how I would approach college CS if I could re-do it](/blog/advice-for-college-cs-students/).

***

## Footnotes & resources

### Backup of Twitter Thread

The list of "Common situations you will encounter", in case the tweet is ever deleted:

* Make a behavioral change to a medium-to-large system that you don't understand. 
* The system is "slow". Figure out why.
* Review a colleague's code and provide meaningful feedback. The code may be in a part of the codebase that you don't have any personal experience with.
* Write user-facing documentation (this includes API docs).
* The system is down. Help get it back up as quickly as possible.
* The system is down. To get it back up, you will need to perform a number of repetitive manual actions. Alternately, you can write a script to automate them. Determine which approach to use.
* Solicit advice from a colleague about a design problem you're facing, given that you've thought about the problem for a lot longer than they have. 

   Identify that progress will require a meeting, organize the meeting, run it, and capture the outcome.
* Propose, in writing, your favored solution to the technical problem. Solicit and address concerns from your colleagues.
* Communicate the status of your work-in-progress to your manager in a way that both reflects your uncertainty and is useful for your manager.
* Take part in quarterly planning of development work, prioritizing a set of proposed work.
* Advocate for reliability-related work, since it will never be driven by customer asks (although they will be upset if the service goes down).
* Analyze a system outage to understand how it happened (one of my personal favorites).
* Migrate your service from one platform to another without impacting customers.
* Convince a team that consumes a platform you provide to migrate from the old version to the new one, and then retire it.
* Figure out how to interface the system you are working on with another system, that is poorly documented.
* Make a change to a system that was implemented in a language/platform that you have little-to-no experience with.
* Debug a build that broke inexplicably.
* Review someone else's design proposal, and provide meaningful feedback. 19/
* A technical decision needs to be made, and the stakeholders are sharply divided on the proposed approaches.
* Marshall support for your proposed technical approach through one-on-one conversations with potential supporters. 
* Identify how your organization's power dynamics constrains the types of technical solutions that are actually possible, so you don't try to do something that has no practical chance of succeeding.
* Use the whiteboard to help bring your peers to a shared understanding of some technical issue that you are working on.
* Effectively coordinate with your peers when dealing with an ongoing outage or other incident. (Hit the tweet limit, so stopping for now).
* Instrument your code to make it easier to reason about its behavior when it's running (i.e., improve operability).
* Describe, in writing, examples of the human activities that your software system is intended to support. 
* Develop a deeper understanding of a system that you now work on but didn't build. 
*  Look into the history of how an internal system came to be implemented the way it was.