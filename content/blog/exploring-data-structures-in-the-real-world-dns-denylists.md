+++
categories = ["Software Development"]
date = 2023-01-22T06:00:00Z
description = "DNS sinkholes like Pi-hole have to rapidly decide whether a new URL is allowed - what data structures might they use under the hood to enable quick responses?"
draft = false
images = []
tags = ["data structures", "dns", "pi-hole"]
title = "Exploring Data Structures in the Real World: DNS Denylists"

+++
As a long time user of [Pi-hole](https://pi-hole.net/) (and now [NextDNS](https://nextdns.io)) to unclog my network from all the garbage ads the internet serves, I've always been amazed at the speed at which their systems operate. It has to take a target URL request and compare it against huge block lists of thousands of bad domains[^1], all in the span of a few ms. Otherwise, we would get frustrated and go back to browsing the web naked & afraid.

## Potential Data Structures

With speed such an important factor, using an appropriate data structure would have been an important early decision for Pi-hole & NextDNS. What are some potential data structures that can provide a speedy answer to _"is this URL in the long list of blocked domains_"?

### Dictionary

Each domain could have a dictionary entry - lookup is O(1), but you will have a pretty big space requirement - it also doesn't handle regex blocking like `*.optimizely.com` very well in the naïve implementation - you would have to get creative with what keys you add and checking sub strings of the target URL.

### Reverse trie/ Radix tree

A potential search strategy could be using a reverse trie - so starting from the end of the target URL to check, step through your trie to see if it matches by suffix .e.g. `m-o-c-.-y-l-e-z-i-m-i-t-p-o` for `optimizely.com`.

This search is then O(m) where m is the length of the target URL - and you can even make it faster by cutting off early if you have regex rules such as _"all subdomains of X URL"_.

Since we know our use case is URLs and not just any arbitrary strings, we likely would be better off storing chunks at each node, rather than individual letters - e.g. `com` -> `google` -> `api` for `api.google.com` - _(I have now learned this is called a Radix tree!)_.

* [A Stack Overflow answer digging into the performance of tries](https://stackoverflow.com/questions/5434813/longest-prefix-matches-for-urls)

### Bloom filters

Digging around a little, I found a suggestion I hadn't heard of before - [Bloom Filters](https://en.wikipedia.org/wiki/Bloom_filter)! This data structure is neat because it's fast, space-efficient, and one of the outputs is probabilistic:  `possibly in set` , or `definitely NOT in set`. Using a bloom filter would let you check the most common case (_URL not in the blocklist_) in `O(k)` complexity- which is very close to `O(1)` since `k` is only the number of hash functions used.

As far as I understand, we would still need to handle the  `possibly in set` outcome with a deterministic data structure, but the filter significantly cuts down the frequency of a more time expensive operation - not as clear how it helps with space complexity if you still need a second data structure.

* [A Stack Overflow example of using a Bloom filter for detecting malicious URLs](https://stackoverflow.com/questions/4282375/what-is-the-advantage-to-using-bloom-filters )

## Open question: how does Pi-hole do it?

Pi-hole is open-source, so if we dig far enough, we can find out how a real world DNS sinkhole keeps it's lookup operations speedy - if you find it before I do, let me know so I can link directly to it! Otherwise, here's the link to the [Github organization](https://github.com/pi-hole) and the [FTL repo]() which I believe is where it resides.

[^1]: _While thousands of URLs isn't a ton of data to search through for a computer, when operating at the DNS level and the insane speed it requires, they probably don't want to waste any time._