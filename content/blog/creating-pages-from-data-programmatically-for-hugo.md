+++
categories = [ "Guides" ]
date = 2022-04-13T04:00:00.000Z
description = "Ways to programmatically generate pages from data for Hugo. Automate your page creation."
draft = false
images = [ ]
tags = [ "hugo", "static-site-generator" ]
title = "Creating Pages from Data Programmatically for Hugo"
+++

So you're using the [Hugo](https://gohugo.io/) static site generator and interested in auto-generating pages from data, similar to [Gatsby's programmatic generation](https://www.gatsbyjs.com/docs/programmatically-create-pages-from-data/) or [Middleman's Dynamic Pages](https://middlemanapp.com/advanced/dynamic-pages)? As of late 2021, Hugo does not have built-in support, and since the topic has been in [discussion since *at least* 2013](https://github.com/gohugoio/hugo/issues/140), don't hold your breath. Luckily, there's options available to accomplish the same task, from premade tools to writing your own simple scripts.

## How it Works

While Hugo itself may not have support for creating pages from a data source, as long as you generate files in locations it expects, you end up with the same outcome. The following approaches all follow the process of taking input data (often in JSON or YAML), generating Markdown files based off it, and placing them into the `content/` folder. Though it's the most common case, it's not only for Markdown, the same process could be used for HTML template files, or any other file Hugo recognizes.

## Programmatically creating pages

### Github: Hugo-Data-to-Pages

[A Node.js project](https://github.com/kidsil/hugo-data-to-pages) which handles the content generation process, all you need to do is install it's dependencies and you're ready to go. I would have used this option if I had found it before I created my custom script.

### Dedicated CMS + Build Plugin

For easier content management than a JSON file, explore the many CMS's available in the wild. Check if they have the capability to connect with your website hosting provider's build process, then it can generate pages from your data each time it builds the site. One combination with an extensive tutorial is [Hugo + Sanity.io + Netlify](https://www.sanity.io/guides/sanity-and-hugo-with-netlify-plugins).

### Custom Script

If you want direct control of exactly what's happening with your files, you can write your own custom script in whatever language you choose. I personally chose to use a Python script + a YAML data file for my first version, but unfortunately `pyyaml` isn't in the standard library. If you don't want to bother with managing Python dependencies (I'm in that same boat), there is an improved script below that uses only `JSON` for the configuration files. 

Whether the config is handled through YAML, JSON, or whatever flavor of the month, I use a simple `Makefile` to handle the process: generating new pages, cleaning out existing content, and putting the fresh set in.

```
build:
	hugo --gc --minify

serve:
	hugo server -D -b localhost:1313

update-ideas:
	- rm ./page_gen/*
	- rm ./content/idea/*
	python tools.py
	cp ./page_gen/* ./content/idea/
```

### Using YAML (1 Python Dependency)

For the script using YAML, an abridged version of `tools.py` looks like:

```
import re, yaml

GENERATION_DIR = "page_gen"
IDEA_FILE = "data/ideas.yml"

def main():
    yml_content = fetch_data(IDEA_FILE)
    for k,v in yml_content.items():
        if k == 'ideas':
            print(f"[*] found {len(v)} ideas to create")
            for idea in v:
                print("idea: " + idea['title'])
                try:
                    content = generate_idea_page_content(idea)
                except Exception:
                    print(f"[!] Broken Idea: {idea}")
                    raise
                safe_title = re.sub('[^a-zA-Z0-9_\\n\\.]', '', idea['title'].lower().replace(' ', '_'))
                print(safe_title)
                path = f"{GENERATION_DIR}/{safe_title}.md"
                print(f"[*] creating page: {path}")
                create_idea_page(path, content)
            print(f"[*] created pages for {len(v)} ideas")
        else:
            print(f"[!] unknown key: {k}")

def fetch_data(yaml_file_path):
    yaml_file = open(yaml_file_path, "r")
    return yaml.load(yaml_file, Loader=yaml.FullLoader)

def create_idea_page(path, contents):
    with open(path,'w') as f:
        f.write(contents)
    print(f"[*] finished writing page: {path}")

def generate_idea_page_content(idea):
    # generate the frontmatter
    front_matter = ""
    for k,v in idea.get('fm', {}).items():
        front_matter += f"{k}: {v}\\n"

    page_content = f"""---
layout: 'idea'
title: "{idea['title']}"
date: '{idea.get('date', '2020-12-05')}'
{front_matter}
---
{idea.get('raw_content', '')}
"""
# TODO: do more interesting stuff with page template based on different keys, the sky is the limit
    return page_content

if __name__ == "__main__":
    main()
```

### Using JSON (No dependencies)

Another version I've written uses JSON and moves the templates out of the Python script and into their own file:

```

import json
import pathlib
from string import Template
import logging

logging.basicConfig(level=logging.INFO)

TEMPLATE_FILE = "templates/example-tmpl.md"
DATA_FILE = "page-data/examples.json"
DEST_DIR = "./docs/"
DEFAULT_PAGE_DATE = "2023-02-05"

def apply_page_to_template(page_defaults: dict, page_info: dict, template_file: str):
    curr_contents = None
    with open(template_file, 'r') as f:
        curr_contents = f.read()
    tmpl = Template(curr_contents)
    new_contents = tmpl.substitute(page_defaults, **page_info)

    slug = page_info.get('slug') or page_info["title"].lower().replace(" ", "-")
    assert slug is not None
    p = pathlib.Path(DEST_DIR)
    p.mkdir(parents=True, exist_ok=True)
    new_file_path = p / f"{slug}.md"
    logging.info(f'Writing new file: {new_file_path}')
    with open(new_file_path, "w", encoding ="utf-8") as wf:
        wf.write(new_contents)

def main():
    pages_data = None
    with open(DATA_FILE, 'r') as df:
        pages_data = json.load(df)

    pages = pages_data["pages"]
    page_defaults = pages_data["page_defaults"]
    logging.info(f'Num pages: {len(pages)} Pages desc: {pages_data["desc"]}...')

    for page_info in pages:
        apply_page_to_template(page_defaults, page_info, TEMPLATE_FILE)

if __name__ == "__main__":
    main()
```

\
And the corresponding template file `tmpl.md`:

```
---
title: ${title}
description: ${description}
date: ${page_date}
---

... add even more options here, the sky is the limit!

```

And corresponding data file examples.json:

```
{
  "desc": "blah.",
    "page_defaults": {
    "description": "Generic Desc.",
      "page_date": "2023-02-06"
  },
  "pages": [
    {
      "title": "Twitter",
      "slug": "twitter",
      "repo_link": "https://github.com/",
      "docs_link": "https://example.com"
    }
  ]
}
```

## Next steps for Hugo auto-generated pages

You should now have a enough of an understanding of the current landscape to make the best choice for your circumstances. Despite Hugo not offering built-in support, there's plenty of alternatives to programmatically generate pages. Whether you decide to write your own or use existing tools, there's no bad option, choosing any of them will save you the time and frustration of manual creation.

## Resources

* A number of ideas show up in this thread '*Build pages from data source*' [https://github.com/gohugoio/hugo/issues/5074](http://tools.py "http://tools.py")
* A Discourse discussion on the topic from 2018 [https://discourse.gohugo.io/t/automatically-generate-pages-from-json-data-file/13494](http://tools.py "http://tools.py")
* Hugo does have the capability to work with Data Templates, but from what I understand they aren't currently set up to easily generate files. It seems to be for dynamic content on existing pages [https://gohugo.io/templates/data-templates/](http://tools.py "http://tools.py"), seen here as well, a [blog post walking through example code](https://novelist.xyz/tech/hugo-data-files/).
