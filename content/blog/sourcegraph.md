+++
title = "A Bull Case for Sourcegraph's Potential"
date = 2022-04-05T06:00:00.000Z
description = "Sourcegraph is a neat company building tools with great developer experience, but Github has CodeSearch, so why be bullish on Sourcegraph? "
tags = ["DevEx/UX", "search", "ideas-for-companies"]
+++

Sourcegraph is a neat company building tools with great developer experience, especially search, which is a critical part of a developer's day to day. Github has CodeSearch, so why be bullish on Sourcegraph? They’re getting creative and moving beyond search[^1], and I see a number of natural areas they could grow into to expand their share of a developer's day.

_Disclaimer: I'm not an investor, I don't work here, and hell, I don't even get to use the corporate version with all the bells & whistles - so this is armchair spitballing of ideas._

## What they do now (a non-exhaustive list)

- Give developers superpowers when reading & writing code
    - Code search
    - code intelligence for jumping to definitions, finding references etc - making it easier to work with, both reading & writing
    - batch changes
- Provide leadership information about the organization’s code
    - code insights
        - track if there are vulnerable log4j versions buried anywhere
        - Are we splintering with too many languages, could it be affecting our velocity or ability to hire new devs?
    - Vulnerability alerts

## Areas they could extend into

I'd love to see them try to make `Every developer a 10x developer`. What would that entail?

### Writing better code

- Would be smart for them to acquire [Sourcery.ai](http://Sourcery.ai) and extend their ownership of the ‘working with code’ space, have amazing refactoring capability
- Security - acquire one of the companies that provides suggestions of more secure code, falls into refactoring idea.
- Code & secret scanning - Github has this, seems like it may eventually become table stakes — also they have this in some capacity with the vulnerability alerts.

### Understanding a codebase with less effort

- One way could be exploring new ways to visualize code & how it fits into a broader picture. I really like the examples from this [Github article](https://next.github.com/projects/repo-visualization/), such as making a graph to tell at a glance _"oh, that folder is all shell files, and there's 2 hidden folder inside those other packages"_.
- Codebases can have components that go without being touched for a very long time - maybe that’s because that piece was such high quality it never needs another look by another pair of eyes....or the devs are busy with many other things on their plate. I always thought it would be interesting to have something like this [Trello plugin Pirate mode](https://support.atlassian.com/trello/docs/using-the-card-aging-power-up/) that shows you at a glance how long it’s been since different parts of the codebase have had any interaction.

![Trello card visual aging like old paper](/uploads/trello-pirate-card-aging.png#center)

### Help devs conquer legacy crappy codebases

There's so much critical legacy code out there that's companies will pay an arm & a leg to keep running. I'd love to see Sourcegraph be the go to tool that lets good devs conquer legacy/crappy codebases, rather than trying to find the right super senior SWE who still knows how it works.

- [Code Health](https://about.sourcegraph.com/use-cases/#boost-code-health) is already on their list of what they do, so it’s not that much of a stretch to dive deeper into the space.
- Would you like to be in charge of the [11k line single file tool](https://news.ycombinator.com/item?id=30898803)?

## Encourages creative extensions from community

Obsidian.md is a fantastic example of this - the community has gone hog wild with creating all sorts of amazing and creative plugins that enhance the power of the main tool by orders of magnitude - Sourcegraph has extensions, but from initial digging it doesn’t appear to be very many, and those that exist have a limited utility.  Much like my [Ballerina Lang suggestions](/blog/how-ballerina-lang-can-improve-their-developer-experience-adoption/), the chaff of random `hello world` ones is cluttering up their marketplace. I would also hope to see more of a push to get developers interested in creating their own ideas, Obisidan, Slack, Discord, are all great examples to learn from.

## Stretch Ideas

Ok these ones are kinda vague ideas, but are big markets with existing incumbents proving there is money to be had, if they want to go up against them.

### Stretch: Monitoring

They already [list a use case](https://about.sourcegraph.com/use-cases/#resolve-incidents-faster) for helping troubleshoot bugs more quickly with their search. What if... they also were the tool for monitoring? They'd be going up against some portion of Splunk, New Relic, Datadog, etc. depending on their features and positioning, but there's a lot of market there to take a slice from.

### Stretch: Documentation

Docs suck and are often scattered all around the place - I’ve [written about this a little](/blog/product-ideas-blink/), but search seems like the piece that takes care of human habits being messy and ending up all over. If you could always find the doc you’re looking for, then you wouldn’t duplicate it and less info would get out of date because you’re more likely to update the one source. Could be interesting to also have ability to create relations and “tie” docs from other tools to specific repos or code files, kinda like a Wiki.

---

[^1]: At the time of writing they had several job openings for batch changes and projects that sounded like new territory.
