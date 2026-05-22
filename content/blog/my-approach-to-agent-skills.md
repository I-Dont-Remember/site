+++
title = "My approach to Agent Skills: Occam's Razor"
date = 2026-04-21T05:00:00.000Z
description = "I don't add Agent Skills unless I feel the pain of not having them. Vanilla Claude Code wins more often than the hype suggests."
categories = [ "AI" ]
tags = [ "agent-skills", "agents", "ai" ]
aliases = [ "/notes/my-approach-to-agent-skills/" ]
+++

My current approach to Agent Skills is to not include them unless I feel the pain without them. The majority of the time I'm running 1-3 instances of vanilla Claude Code.

To be clear, I'm not against Skills usage. I pull in Skills that have clear value, like helping agents use specific tools more effectively _(e.g.  `playwright-cli` Skill)_. My only hold up with AI Augments[^1] is that so few provide proof that they are better than using vanilla Claude Code.

## Every Skill looks the same on paper

So far I've found many Skills to be a lot of hype, but not a lot to back up their claims. Without clear measures, how am I supposed to distinguish between your amazing Skill you put a ton of effort into refining, and one that ostensibly does the same thing, but was one-shot prompted by a 12-year-old trying to promote their YouTube channel?

To be fair, many Skills help with activities which are genuinely hard to measure. But it feels like if they had _anything at all_ to show they're better than other Skills (or vanilla Claude Code), they'd be screaming it from the rooftops and you wouldn't be able to miss it. As it stands, even for a popular suite of skills like [Superpowers:  "An agentic skills framework & software development methodology that works"](https://github.com/obra/superpowers/) I struggle to find any concrete measures of WHY it's better than plain vanilla tools. Ditto for basically every other Skill i've considered pulling in. If we can't actually measure a Skill's quality, are we just fooling ourselves by tweaking the tokens we use to arrive at the same place?

It feels a bit like we're following the PKM trend, where people build up incredibly complex Obsidian/Notion workspaces to make them more productive, and at the end of it... they have a lot of artifacts of work, but not a lot of outcomes.

## Long-term hypothesis: vanilla wins

I also subscribe to the  hypothesis that the best Skills will eventually be eaten by the agent coding tools _(like Claude Code)_, so I'll end up getting the useful ones anyway. I could be wrong, but I believe we've already seen this happen with Claude Code with features like auto-memory, code execution, file tools like XLSX/PDF, scheduling routines, cloud agent runs, browser automation, as well as [pre-built Skills](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview#pre-built-agent-skills) which are bundled in without a user having to add them.

It's such a great vetting ground for the teams at Anthropic, OpenAI, etc. to watch which ones are rising to the top in popularity and then figure out how to bake them into the core product. Easier to acquire someone else's innovation than have all the ideas yourself.

---

[^1]: Skills, commands, whatever the next hotness is.
