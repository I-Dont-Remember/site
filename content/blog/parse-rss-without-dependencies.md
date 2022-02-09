+++
categories = ["TIL"]
date = 2022-02-03T05:00:00Z
description = "Parsing RSS with Python standard library."
draft = false
images = []
tags = ["Hugo", "rss", "python"]
title = "Python Parse RSS Feed With No Dependencies"
toc = false
+++

I recently wanted to parse an RSS feed as a part of a larger script. Luckily, that boils down to just working with regular-old XML. Despite the proliferation of great libraries like BeautifulSoup, whenever possible I try to stick to the standard library. Not that using Pipenv or another Python dependency tool is necessarily a ton of work, it just feels like excess overhead. Plus, it's just fun to explore libs I haven't had the pleasure of interacting with.

## Parsing RSS with Python standard library

For my use case, I wanted to parse the RSS file, then pull data from the latest article as well as randomly select a few of the older pieces. The `minidom` module is our friend for this task, and as always a helpful [Stack Overflow led the way](https://codereview.stackexchange.com/questions/182363/parse-atom-rss-feed-with-xml-dom-minidom).

```
from xml.dom import minidom
import random

FILE_PATH = 'public/index.xml'
NUM_FEATURED = 3
rss_dom = minidom.parse(FILE_PATH)
article_items = rss_dom.getElementsByTagName('item')

article_data = []
for item in article_items:
    title = item.getElementsByTagName('title')[0].firstChild.nodeValue
    link = item.getElementsByTagName('link')[0].firstChild.nodeValue
    article_data.append({'title': title, 'link': link})

print('main', article_data[0])


featured = []
for i in range(0, NUM_FEATURED):
    rand = random.choice(article_data)
    featured.append(rand)
    article_data.remove(rand)

print(featured)

```
