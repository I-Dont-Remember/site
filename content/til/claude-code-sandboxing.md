+++
title = "I gotta stop raw-dogging Claude Code"
date = 2026-03-31T05:00:00.000Z
tags = [ "llm", "security", "claude-code" ]
+++

I started playing with Claude Code a month ago, and to my horror I think I've been raw-dogging the experience with no protections. After hearing a few horror stories of important files being wiped, my incredibly risk-averse mind jumped into high gear looking for all the different ways to add layers of protection into using Claude on my personal machines. You will not catch me `--dangerously-skip-permissions`ing and giving OpenClaw all my personal information, that's for sure.

## Options I see

There's quite a few ways to skin this cat, some of which can be combined together:

- Trust the Claude Code `sandbox` in your `~/.claude/settings.json`
    - _I've heard this described as "trusting the fox to watch the hen house". I haven't done research beyond the anecdotal stories of it maybe escaping or just not working as one expects, so I think this is out._
- Claude Code for web
    - _This is useful for small self-contained changes, but I also want to be able to work from my laptop & be interactive with Claude & my code._
- Create a separate user with Unix user permissions
    - _This feels a bit clunky, and it doesn't feel as simple as some of the other solutions. It feels easier to screw this up and either miss something, or make my life more difficult than it needs to be._
- Run on a different machine
    - _[Fly.io Sprites](https://sprites.dev/)_
    - _Use my locally running Raspberry Pi as a dev box & connect with `tailscale`._
- Use a local sandboxing tool
    - _`jai`: they even have a nice [summary](https://jai.scs.stanford.edu/comparison.html#summary) how this compares to other options. tl;dr: more lightweight, but not as secure as container or separate VM._
    - _`bubblewrap`: people seem to be writing custom scripts that wrap `bubblewrap`, this is supposedly what Claude's `sandbox` feature uses under the hood._
    - _Others I haven't heard of yet._
- Use containers
    - _`yoloai`: runs agent in YOLO mode inside a container; you get to check the diff before bringing it back into real file system [website](https://yoloai.dev/), [readme](https://github.com/kstenerud/yoloai?tab=readme-ov-file)._
        - _This sounds neat; though I often develop on WSL2 on an older Windows laptop, so spinning up Docker as well does add a bit of resource overhead to this that I try to avoid most of the time._
    - _custom scripts I write for Docker containers or bubblewrap._

## What I will use

I'm trying to avoid letting _"perfect be the enemy of good"_ here, so I want to pick some easy options and iterate on it in the future. My plan is:

- **Everywhere**: enable Claude Sandbox as a lightweight backup. Seems to have minimal downside to have a "defense in depth" of multiple approaches layered on each other.
- **Laptop**: install `jai` and update my bash aliases to have `alias clanker=jai claude'`.
    - _This quickly ended: it looks like they don't have package releases for Debian, only Arch, and it can't be that mature of a tool if you are forced to build it from source just to use it. I'll definitely keep an eye on this tool to see if it continues getting investment from the author._
- **Desktop (beefier machine)**:
    - Experiment with container sandboxing tools since I have way more RAM available. First one is `yoloai`.
- **Experiment to consider**:
    - Try Fly.io Sprites and see if they are cheap enough to be a common part of dev process
    - Set up Tailscale & SSH so i can just use my desktop machine from laptop & phone easily. Let me benefit from the better RAM and CPU for all my development.
    - I'm averse to developing on mobile, but I feel like I need to get over that millenial feeling of "big screen tasks". I should get comfy directing Claude from the apps with Dispatch and the web version.
