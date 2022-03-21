+++
title = "Debugging Without a Razor"
categories = ["Software Development"]
date = 2022-03-21T05:00:00Z
description = "Lessons learned from a couple days spent debugging everything BUT the problem."
draft = false
images = []
tags = ["debugging", "devops", "developers"]
+++
My team was building a new product at work, and as a part of it, deploying an API to prod for the first time. Everything worked perfectly in QA, so we buckled up and started a pipeline build running for prod deployment... it worked!  Houston we have lift off 🚀. I went to do the final check that our UI could communicate with the API - drat. Timeouts. Even less fun than the ones I got as a child, since at least those had a clear answer of what went wrong. Time to roll up the sleeves and get the debugging train rolling.

## Pest control 🪲

Debugging commences. First question to answer is if the connection is breaking because of our code, or before it reaches it. 

```yaml
🖥️ UI - 🔃Timeouts ------(💥 here?)-------> 📜 API (💥 here?)
```

Since I could see a Lambda event each time I used the UI hidden among the health checks, I could tell the request was making it to our code. That eliminates a whole slew of frustrating debugging possibilities, including:

- misconfigured ALBs
- misconfigured Internal gateway
- CNAMEs not set correctly (or other DNS fun)
- ...all the other glue that holds the internet together

We're left to explore potential issues within our code. Some of the patterns I've run into in the past that my mind jumped to:

- Bug in the build tool
    - sorry, it was a “feature” (that was undocumented, and didn't happen in QA 🙄)
- YAML anchors in the build config not expanding in the way I expected
    - Like all code, what I imagine is happening in my head is not a 1:1 mapping to the code I write. Anchors are great for being DRY, but can be a bit harder to debug since you can't `CTRL+F` them like you could if you copy pasted the fields.
- Proxies when our code reaches out to downstream service
    - I've had the pleasure in the past of bug-hunting for days with a team member only to find out we were missing a single character on a domain in our `NO_PROXY` list.

## Finding clues 🕵️

Unfortunately, being a new service, our logging was not up to snuff to find clues. There was very little to go on, so could only confirm the Lambda itself was timing out and then causing the API timeouts. Since our product is still in development, we had the leeway to wait and deploy a PR with improved logging to track down exactly what was missing.  We're very lucky, since many applications don't have this luxury — once the info is gone, it's gone. Good luck.

 With the updated logging, we could see our prod Lambda was missing an environment variable we required, `ENV: PROD`. How could that be, I added it to the infra code myself! It must be the YAML anchors not working, but how? I checked about 50 times that the environment variables for prod were showing up in the YAML debugging output.

## Is it me? am I the problem? 😱

I was deep in the weeds and stuck in a loop of “**how is this possible, it's right there!**” when a friend looked at it for 10 seconds and said "oh, you have it, you just put it in the wrong spot." 🤦‍♂️ 

```yaml
- name: prod_infra_item
	# <<: *env_variables  <-- I needed it here

- name: prod_infra_item_other
	<<: *env_variables  # <-- I put it here 🤦‍♂️
```

Foiled by myself! My YAML was correct, I had just put it on the section right below where I needed it to be. Since it was technically valid and would show up in the debugging output, there were no explosions to alert me of my misstep.  I was staring at it the whole time, but couldn't recognize what I was seeing because I had blinders on.

## What did I learn?

Ok, so I made a silly mistake and spent a bunch of time debugging everything BUT the problem. What can I learn from this?

- **Occam's Razor** - As soon as I see a problem, my mind wants to start with all possibilities on the table, even the incredibly unlikely such as kernel bugs. Like shark attacks, they are interesting and stick in my mind, but the actual probability of having it happen is incredibly low — I'm better off searching in common places like user/developer error than hunting for the obscure.
    
    > **“When you hear hoofbeats in the night, look for horses — not zebras.”**


- **Observability/monitoring on your code is so critical** - eventually you will have bugs. Having to go through prod deployments of logs just to get the information you need is a luxury. It heavily delays your ability to triage, and in time-sensitive issues, those minutes hurt.
- **Attention to detail** - I struggle with it when I am honed in on a specific idea and can't see what's around me. The misplaced YAML anchor wasn't the only detail causing a delay in getting a functional prod API. I was so confident each min-problem I ran into was the last one on the way to the success build ✅, I forget to scan for silly things, like forgetting to change the QA database URL. I ended up hitting a new issue each time I solved one, when I could have knocked at least half of them out at once. I need to get better at coming up for air 🤿, taking a breath and looking at what else could happen before running full-speed into repeated brick walls like Wile Coyote.