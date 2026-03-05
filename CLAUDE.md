# CLAUDE.md

This is a personal website built with the static site generator Hugo.

## History of the repo

 It was originally started from a theme saved in `themes/hugo-goa/`, but over time this has morphed and been modified heavily, so I can't remember ever bothering to pull in updates from the original - and at this point, they might break more than they help.

At one point I added Tina, which lets you run a local CMS for easier editing. I also often just manually add new content in VSCode. There's also a legacy `.forestry/` directory from a previous CMS that's no longer in use.

Tina is rarely used day-to-day anymore — editing is almost always done directly in VSCode. Tina is still wired into the Netlify build (`npx tinacms build && hugo --gc --minify`), so it still runs on deploy.

## Environment

- `hugo` command is installed on my machine manually from a release. `v0.146.1`.
- The `hugo/` directory in the repo root is where the binary was originally unpacked — it should be .gitignored but currently isn't. The `hugo` command on the system PATH comes from there. This is only true if you are on my personal desktop, in other environments you may need to install Hugo.
- The `mise` tool is available for you to use. I have a version of Nodejs (used mainly for the Tina build step).
- It deploys to Netlify whenever a push is made to the main branch.
- `artifacts/` is for things I want to keep in the repo, but which don't get served on the site, e.g. original copies of Excalidraw files that were used as the source to generate images.
- I have added [playwright-cli](https://github.com/microsoft/playwright-cli) to the Node dependencies of this repo. You can use it once they're installed like `npx playwright-cli *`. You should have a skill for this already prepared.

## Repo info

- I like to occassionally add public HTML tools & pages to my site. Those end up in `/static/bin` since it's an easy way to host them.
- I host a sub-website with `content/indie-lurker/`, since I didn't want to maintain a separate domain any longer. It's treated as its own unique site, not meant to match the rest of the website.
- New blog posts are created manually in VSCode under `content/blog/`. Frontmatter can be either TOML (`+++` delimiters) or YAML (`---`) — no strong preference, but existing posts mostly use TOML. Standard fields: `title`, `date`, `description`, `categories`, `tags`, `images`, `draft`, `featured`, `toc`.
- Images for posts go in `/static/uploads/` (legacy Tina location) or `/static/img/`, and are referenced in content as `/uploads/filename.ext` or `/img/filename.ext`.
- Custom shortcodes live in `layouts/shortcodes/` — notable ones: `tenor-gif`, `giphy`, `video`, `twocol`, `bootstrap-panel`, `notion-callout`, `new_tab_link`.

## Developer info

- The site is using very old versions of Boostrap and other libraries, since it grew off of theme that I never updated. I have some slight concern about that, but also I don't want to update and ruin all the styling and things I already have in place, so it hasn't been a pressing issue for me. I might just archive a copy of those dependencies so that I have it in the repo if CDNs ever stop serving them.

## Testing

I don't have any unit tests for the repo, usually I make changes while running the Hugo live server, or running `make build` and then checking the outputted files in the generated `public/` directory. That is probably more effective for you.