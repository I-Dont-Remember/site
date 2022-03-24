+++
title = "Product Ideas: Find Anything at Work as Quick as Googling"
categories = ["Product Ideas"]
date = 2022-03-24T12:00:00Z
description = "An engine that unlocks the knowledge already within your company, no matter if it's in people or tools."
draft = false
images = [""]
tags = ["startups", "search", "bootstrappers", "indiehackers"]
+++
It should be as easy to find information at work as it is to Google. 

Heck, sometimes I’ll search something I already know where to find an example/how-to because it’s so fast to go from question → answer with search engines. In many companies, the information you need is nowhere near that easy to find.  People create docs, but we can’t find them. It’s buried in 50 different apps, at links you don’t know you need, some of it is outdated, and it’s just a mess 🗑️.  From talking with friends and my own experiences, this problem seems to affect companies across every industry, of every size from 4 to 40,000 people. What might the experience look like in a better world?

## North star: one stop shop for answers

Google is incredibly powerful because from the user’s perspective, they took a single simple action: fill out a textbox and hit `Submit`.  Spotlight Search on Mac is another great example. All the complexity is abstracted away and lets the user get back to what they were doing. So what’s the idea here? We’ll call it Blink for now so it’s easy to refer to.

> **“Find what you need in the Blink of an eye”** 
> 
> *C’mon, you expected me to NOT make a tagline for an imaginary product?*


Blink should be as simple as typing in a simple phrase and start finding what the searcher needs. It should be the engine that unlocks the knowledge already within your company, whether that's in existing information sinks or stored in brains as tribal knowledge.  It should encourage creating & maintaining quality documentation, while at the same time ensuring it can be found when needed.

Remember those 50 tools you use at work? Well the beauty here is the majority of them have search built right in - so you don’t have to reinvent every wheel yourself.


Take existing sources with search:

- Code - (Github, Gitlab, etc.)
- Knowledge Base - (Stack Overflow, Discourse, etc.)
- Conversations - (Slack, Teams, etc.)
- Project Management - (Jira, Asana, etc.)
- Wikis - (Confluence, Notion, etc.)
- Files - (Box, Dropbox, etc.)
- Users - (Outlook, GMail groups, etc.)
- Email

and layer on company-generated data:

- Internal links - power of URL shortener + search
- Decisions - the “How” and “Why” behind them
- Glossary/terms/acronyms
- Point of contacts
- Generic FAQ answers to common queries

Now you have a way to search across your company’s knowledge from one place.

## What would I be able to find?

To make sure we’re on the same page, this is a non-exhaustive list of what I would hope to be able to find in a single search, the Jobs to be Done I have seen pop up at work. 

- Documentation on processes, how to do things at the company
    - *“How do I onboard to < internal tool >”*
- Find who can help me with an issue
    - *“Who is the point of contact to do < x process >”*
- Developer docs
    - Code examples, SOPs, how to deploy
- Links for actions I need to take rarely
    - *“I want to submit expense report”*
    - *“report issue to HR”*
- The list goes on. If it doesn’t cover 95+% of use cases throughout the day, then it’s not doing the job.

## Naysayers & Pitfalls

Plenty of reasons people will say this is too complicated or why it won’t work, so here’s a few to get out ahead of them.

- You may be a bookmark wizard 🧙‍♂️, but no, bookmarks aren’t a perfect alternative to this. There are plenty of situations where you need to find information you’ve never accessed before.
- If the results aren't good, or missing things they expect, then people will think it's a garbage tool — even if the underlying sources are what provides bad data. User assumes it's an issue with what they interact with, even if  that's not the culprit.
- Data privacy
    - Concerns will surface about how & where data might be getting exposed to new attack surfaces in this tool.
- Data quality - conflicting, duplicated, out of date information.
    - People have to trust the information returned is relevant and not out of date.
        - 🤔 Could potentially have a thumbs up/thumbs down ‘Is this still relevant?’ question, and can display that at the top ‘Created March 2017, Last useful - March 2022’.
- Permissions - should you be able to search for content you don’t have permission to access?
    - What if an item reveals information just by seeing it exists? e.g. *“Layoff Plan for Q1”*.

## Incremental benefits

These notes only matter if the core idea is useful.

- With the right UX, could help people learn to use advanced search within tools like Slack or Github to better refine their results. Ideally you’d find a way to do it under the hood.
- Metadata about results, both from existing tools and human-generated.
- Analytics on what your team is searching for, which could prompt making it easier to find certain information, or add quality answers to search results.
- Page ranking and other SEO stats become available within the company, which could improve the search experience even on top of tools which already have search.
- Suggest relevant information or similar searches user might not have thought of.
- With metadata, can mark results as out of date, duplicates, useful, all sorts of creative ways to provide more value and improve search result relevance.

## Existing solutions

Not every solution is a product, sometimes a simple solution is how people are already solving this problem. Doesn’t mean it’s being solved well, but it’s what people are using.

- Bookmarks + searching through tools like Slack individually to hopefully find what they’re looking for.
- Internal Wikis & intranet tools
    - These are great - so long as they don’t become fragmented into multiple tools.  Many still suffer from conflicting or duplicated information.
- [Command E](https://getcommande.com/about-us/) - Tied for closest to the experience described above, though it’s been acquired by Dropbox so it’s yet to see if they kill any of it’s potential for integrating with other tools.
- [Xobalabs](https://www.xobalabs.com/,) - Tied for closest to the experience described above.
- [Algolia](https://www.algolia.com/blog/ux/improve-enterprise-workplace-search-efficiency/) - Enterprise Search feature seems similar, but honestly from their marketing it's hard to tell. Clearly they haven't taken over.
- Numerous large companies have internal search tools (of varying quality) - source: grapevine of friends.
- [SourceGraph](https://about.sourcegraph.com/) & Github Code Search - awesome for developers, but not as good for other roles.

## Is there a market for this?

Based on the conversations I’ve seen in my work experience and the numerous companies in the search space, I’m not the only one frustrated with the gulf between how quickly I can find answers on the internet vs the tedious process of digging for internal information. Now if every company I work for during my career could use this magic tool, that would be great 😁.

---

## Inspiration

- Mac Spotlight Search - incredibly convenient.
- [Golinks.io](http://Golinks.io) - internal url shorteners are powerful, now if you could layer a search experience on top of that, wow 😻.
- [You.com](http://You.com) - really like their redesign of search result layouts.
- [The Document Culture of Amazon](https://www.justingarrison.com/blog/2021-03-15-the-document-culture-of-amazon/) - thinking about docs.