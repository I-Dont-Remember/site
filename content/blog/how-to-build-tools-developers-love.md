+++
title = "How to Build Tools Developers Love"
categories = ["DevEx&UX"]
date = 2022-03-31T05:00:00Z
description = "Lessons in developer experience learned from the best and worst tools."
draft = false
images = []
tags = ["Software Engineering"]
+++

Wanna build tools with horrible developer experience? Of course not!

Yet despite all the positive intentions, we've all run into tools that frustrate the living daylights out of us (if not, you're a lucky S.O.B.). Fortunately, negative experiences are often the best opportunities for learning — take the bad, and do the opposite! In so doing, the hours spent on frustrating tools have helped compile these lessons on what the great tools did right.

## Lessons in developer experience

- **Treat user concerns with empathy 👂**
    - Listen to your user's concerns with empathy, rather than "*My way or the highway*". Make it clear their feedback matters through action.
- **There are exceptions to every rule, provide escape hatches 🐣**
    - Whether it's new best practices, business requirements, or what have you, there will always be something that doesn't fit quite right. Better to provide an option for incremental adoption than a hard stop. This is especially important when dealing with legacy code.
- **Give bumpers 🎳, not brick walls 🧱**
    - Provide sensible defaults for the 80% of people who just want to accomplish basic tasks, but don't block power users from diving deeper.
- **Have excellent and up-to-date documentation 📚**
    - This is a benefit for the platform team building the tools, unless they enjoy 90% of their time debugging the same failures and answering the same questions. To get in front of the obvious response: no, people don't read, but it's easier to forward a link than write up the same answer again.
    - Especially important  to  make it ❗**OBVIOUS**❗ if you know of areas with surprising constraints (aka gotchas), or are inconsistent across parts of the tool which appear they should operate the same. Likely the builders will be too used to their own tool to recognize many of these spots, another reason actually listening to your users is valuable.
- **Validate as early as possible 🌅**
    - Whether it's config files, code, or arguments, ensure it's a valid set as early as possible in development cycle. It's incredibly frustrating to get through development and deployment to multiple environments only to find out you had an incorrectly spelled argument for production. Wastes a lot of time when multiplied by the many developers using your tool.
- **Undocumented or arbitrary requirements frustrate users 😠**
    - If I find out about undocumented requirements deep in the process, and am pointed to examples with no indication that field/line/etc has to be a certain way, I will not be saying nice things about your tool. Make requirements explicit, or I will get explicit 🤬.
    - Avoid arbitrary requirements if you can, and provide docs & explanation if you can't. Teams with code in production don't take kindly to extra work or frustrating changes based on an "*I said so*".
- **["*Give your users super powers*"](https://manassaloi.com/2020/04/15/user-superpower.html) 🦸**
    - It's often mentioned for building consumer products, but at the end of the day, developers are human, too. We want frustrating tasks to be easy, and to be able to do awesome things in the blink of an eye.

## Are you adding to the 💩 pile?

Someday, we'll live in a world where every developer tool is a pleasure to use, with helpful error messages, no weird ‘Gotchas', and we all ride unicorns to work 🦄.  For now,  consider the following lessons the next time you're building a tool for developers. Don't add to the 💩 pile.
