+++
categories = [ "Software Development", "Bootstrapping" ]
date = 2023-01-26T06:00:00.000Z
description = "I naively thought I could apply the same complex & scalable solutions used by actual companies to my side projects. I was wrong."
images = [ ]
tags = [
  "software-engineering",
  "serverless",
  "bootstrapping",
  "side-projects"
]
title = "I Built my Side Projects Like Enterprise Software and Regretted It"
_template = "blog_post"
+++

I naively thought I could apply the same complex & scalable solutions used by actual companies to my side projects. I thought it would save me time and headaches in the future. I was wrong.

Having spent plenty of time living with my choices, I wish I would have started off following a few simple tenets:

* **🤴Simplicity is king**
  * Why? You have limited time and attention.
  * The more crap you add (lines of code, product features, vendors, etc), the less energy you have to focus on the core value of your project. This especially includes premature optimization that you won’t need.
* **👸Flexibility is queen**
  * Why? No plan survives contact with the enemy (or users).
  * Once you get your product/feature/documentation into actual use, you will quickly learn things that radically change your perspective. Set yourself up so changes are low cost to make, and you will be able to iterate quickly as you learn.
* **🚢Publish the 80/20 version and avoid perfectionism**
  * Why? Real feedback starts when you publish.
  * It’s so easy to fall into the productive procrastination of perfectionism - making those buttons pretty HAS to be useful, right? But people really care about the core of what your project does and will put up with a lot of imperfection if it’s useful.

## Headaches I created for myself

Since I had to learn that simplicity and flexibility are paramount through painful trial and error, I have a nice long list of headaches others can attempt to avoid.

* Using architecture designed for large scale applications with fleshed-out requirements.
  * _I was a Serverless fanboy, and dove head first into it. While it seems simple at first, complexity can quickly build up in the connections around your functions as you need to complete more complex operations. For a deeper dive, read_ [_why Alex moved from Serverless to a classic web framework_](https://frantic.im/back-to-rails/)_._
  * _Premature scaling and aiming for robustness, instead of flexibility. At big companies, it’s more important for them to protect the money train that is already flowing, than to save you a couple months of work. Side projects, not so much._
* Following coding best practices for the sake of them, rather than for my benefit.
  * _Splitting pieces into lots of repos because I read that monorepos were frowned upon._
  * _Trying to share an internal package with versioning. It can become a lot to manage as one person, and happened mainly because of the repo-splitting._
  * _Adding lots of unit tests & other quality-of-life additions that don’t move the project forward. I’m not against testing - but in a project’s infancy, there’s a good chance a lot of it will get thrown out in the near future, and there’s better uses of time._
* (**Bonus:** _not necessarily enterprise, just human_) Every feature is a “necessity”, and adding tons of them.
  * _Humans love additive solutions. It’s fun to create new things! But every line of code you write, every new feature you add, expands the surface area of what you are expected to maintain. Your attention is limited, a todo list is not._
  * _Plenty of “features” can be done in a simpler way until it’s clearly worth it to be automated. Common example is user account actions like updating an email - adding a self-service feature doesn’t make people like your project any better, and you could accomplish it manually for a long time without anyone caring._

My mistakes led me to appreciate simplicity, flexibility, and staying focused on the core value. The skills we learn at work and on side projects can complement each other - sometimes. As I’ve now learned, I should consider strengths & weaknesses before blindly diving in.
