+++
title = "Throwaway tools have no excuse for bad UX any longer"
date = 2026-01-28T06:00:00.000Z
description = ""
+++

Now that LLMs have gotten relatively consistent at producing quality code in one shot *(depending on the size & type of problem)*, I'm having to retrain my brain to realize that I should:

1. Be making many more throwaway one-off tools
2. I should care about the UX of them since it's basically free to invest an extra 1 minute in adding those nice touches into the prompt

## A simple example from work

 I could have spent a while digging in a raw CSV to "vibecheck" the data that was coming back from a generative process. That's how I would have done it in the past.

Instead, I had an LLM write a Python script which turned the CSV into an interactive HTML page and including a bunch of extra sorting & quality of life improvements which surfaced insights I am not confident I would have noticed on my own, or I wouldn't have invested the human time & energy to find them if the tooling hadn't surfaced it.

Something like this also has very little risk from hallucinations or bad code, since they are often read operations, and/or the scripts will be acting on code in version control so you can revert any weird outcomes.

I will never use that specific script again, and that is OK - though the hoarder in me is sad because he wants to find a re-use for everything.

## Update 3/13

I heard Patio11 make a similar comment on his recent [podcast episode on inference engineering](https://www.complexsystemspodcast.com/episodes/inference-engineering-with-philip-kiely/). I love his word choice of *"economically irrational"*.

> *"You can ask them to write software that would have been **economically irrational** to write before—cases where the expected lifetime of that software is anywhere from a day down to a **single execution**"* - Patrick McKenzie
