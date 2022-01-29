+++
categories = ["Atomic"]
date = 2022-01-28T05:00:00Z
description = "Add search to your static site in 5 minutes, the 80/20 effort-saving guide. No dependencies needed here."
draft = false
images = []
tags = ["Hugo", "static-site", "search"]
title = "Add Search to Hugo Static Site in 5 Minutes with No Dependencies"
toc = false
+++

Having search on your site is a big plus for the user experience _(and for finding that piece of content I remember writing but can't find!)_.
My site isn't big enough that it's worth spending much effort setting up a real search solution like [Algolia](https://www.algolia.com/), [Meilisearch](https://www.meilisearch.com/), or even [LunrJS](https://lunrjs.com/).

Instead, I got inspiration from the past - let a search engine do the work for me, like so many sites in the 2000s. This is the **80/20 version** of adding search to your site - a good enough option with minimal effort.

## What are we adding

![Search bar on site](/uploads/searchbar-yellow-bg.png#center)

Search engines provide the option to search within a single website with `site:<domain>`. We will use that as our base - then sync an input box with a clickable link containing user text. On click, it takes them to the search engine page with the search filled for them:

```
site:kevinquinn.fun <user-input-text-here>
```

Total additions to your codebase - **3**.

1. An input box, styled to your liking.
2. A link tag.
3. And a short script.

## Show me an example

This site is built with an older version of Boostrap, but the core element is the `<script>` from this [handy dandy Stack Overflow post](http://stackoverflow.com/questions/7097573/ddg#7097818), then attach it to your input box.

```
<div class="input-group">
    <input id='search-input' type="text" class="form-control" placeholder="Search for...">
    <span class="input-group-btn">
    <a id='generated-link' target="_blank" class="btn btn-default" href="https://duckduckgo.com/">Go!</a>
    </span>
</div>
<script type="text/javascript">
    var link= document.getElementById('generated-link');
    var input= document.getElementById('search-input');
    input.onchange=input.onkeyup= function() {
        link.search= '?q=site%3Akevinquinn.fun+'+encodeURIComponent(input.value);
    };
</script>
```

## Search in under 5 minutes 😎

You just added search to your website in no time, give yourself a pat on the back! Is it the most amazing search in the world? No, not really - but it does the job. Most developer blogs only have a couple _Hello World!_ posts anyway, so Algolia might just be a tiny, _tiny_, bit overkill. Now take that time you saved and get back to scrolling Hacker News.
