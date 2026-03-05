# Nice-to-Have Improvements

Compiled: 2026-03-05. These are potential improvements that require a decision before implementation — not bugs or broken things, but things that could be meaningfully better. Organized loosely by area.

---

## Hugo & Developer Experience

### Render hooks to replace template hacks
- [ ] **`layouts/_default/_markup/render-heading.html`** — `themes/hugo-goa/layouts/partials/content.html:74` uses a regex replace (`replaceRE`) to inject anchor links into headings after the fact. A proper render hook would be cleaner, more maintainable, and fix the broken `ariaLabel` camelCase bug in the same pass. The existing regex approach also passes rendered HTML through `safeHTML` which is a smell.
- [ ] **`layouts/_default/_markup/render-codeblock.html`** — Highlight.js is loaded externally for syntax highlighting, but Hugo has built-in Chroma highlighting that works at build time (no JS needed). Using a codeblock render hook + Chroma would eliminate the Highlight.js CDN dependency and work without JavaScript.

### Hugo config / build
- [ ] **Enable `enableRobotsTXT = true`** in `config.toml:25` — currently disabled, which means no `robots.txt` is generated. The site currently has no robots.txt at all. Low risk to enable.
- [ ] **Rename `config.toml` → `hugo.toml`** — Hugo 0.110+ prefers `hugo.toml` as the config filename. Purely cosmetic, both work, but aligns with current Hugo conventions.
- [ ] **Pagination on the blog list** — `content/blog/` has 100+ posts and the list page renders all of them on a single page. Setting `paginate = 20` in config.toml would split into pages. Requires decision: do you want paginated blog list, or do you prefer the current "all in one" behavior?
- [ ] **Goldmark unsafe HTML** — `config.toml:4-7` has unsafe HTML rendering commented out with a TODO and a suppressed warning. Decide: enable it properly (allows raw HTML in markdown, which you may already be using via shortcodes instead), or remove the suppressed warning if it's not needed.

### Hugo asset pipeline
- [ ] **Run `main.css` through Hugo pipes** — `themes/hugo-goa/static/css/main.css` is served as a raw static file (no minification, no fingerprinting). `assets/css/ilc.css` is already processed with `minify | fingerprint`. Doing the same for `main.css` would add cache-busting and reduce payload size. Requires moving `main.css` from `static/` to `assets/`.

### Developer workflow
- [ ] **Expand the archetype** — `archetypes/default.md` is only 4 lines and uses YAML, but posts use TOML. Expanding it with standard fields (`description`, `categories`, `tags`, `images`, `draft`, `featured`, `toc`) would reduce friction when creating new posts.
- [ ] **Wire up the existing markdownlint config** — `.markdownlint.json` exists but nothing actually runs it. A `make lint` target would let you catch formatting issues without CI setup. markdownlint-cli can be run via npx since Node is already available.
- [ ] **Add `.editorconfig`** — not present. Would enforce consistent indentation and trailing whitespace handling across editors/tools, useful since the repo mixes TOML, YAML, Markdown, HTML, and TypeScript.
- [ ] **Pre-commit hooks** — no pre-commit validation exists. Low-friction option: add a `.pre-commit-config.yaml` that runs markdownlint on changed `.md` files. Requires `pre-commit` to be installed locally.
- [ ] **`make clean` target** — no way to wipe `public/` and Hugo's resource cache from the Makefile. Minor convenience.

### Tina CMS
- [ ] **Decide on Tina's future** — it runs on every Netlify deploy (`npx tinacms build`) but is rarely used. Options: fully remove it (simplify the build), keep it as-is, or upgrade to a current version. Removing it would simplify `netlify.toml` and `package.json`, and eliminate Node from the build chain.

---

## Content & Site Architecture

### Missing section index pages
- [ ] **`content/recipes/_index.md`** — the `recipes/` section exists but has no `_index.md`, so it has no section metadata (title, description). Minor, but gives Hugo a proper anchor for the section page.

### Content organization
- [ ] **Stale sections review** — the generated `public/` directory shows sections like `great-reads/`, `lessons/`, `firsts/`, `open-questions/`, `links/`, `uses/`, `wc/`. Worth confirming: are these intentional, actively maintained, and linked from navigation? If some are abandoned or private-ish, they may benefit from being drafted or removed.
- [ ] **Draft post from 2023** — `content/blog/my-backup-plan-if-dex-crm-goes-kaput.md` has been `draft = true` since ~2023. Finish, archive, or delete. (Also in tech-debt.md, listing here as content decision.)

### `README.md`
- [ ] Update `README.md` — it mentions "eventually want to connect to forestry" which is outdated (Forestry is dead, `.forestry/` is already there and abandoned). The README could reflect the current state of the site better.

---

## SEO Enhancements

- [ ] **Per-page meta descriptions** — `header.html:11` only renders the global site description. Blog posts have a `description` frontmatter field, but it's not used in `<meta name="description">`. A simple conditional (`{{ with .Description }}...{{ else }}...{{ end }}`) would make post-level descriptions work for search previews.
- [ ] **Structured data (JSON-LD)** — no Schema.org markup anywhere on the site. Adding `Article` type to blog post singles and `Person` to the homepage would improve rich result eligibility in search engines. Optional and no guarantee of results, but low implementation cost via a new partial.
- [ ] **OG image dimensions** — the default OG image (`img/kq-fun-default-site-img.png`) is 1024x1024. The recommended OG image size is 1200x630. Social platforms crop/scale it, but having the right dimensions avoids cropping on Twitter/LinkedIn previews. Adding `og:image:width` and `og:image:height` meta tags would also help platforms optimize without downloading the full image.
- [ ] **`twitter:creator` tag** — the internal Twitter Card template doesn't set a `twitter:creator` field (author attribution). Useful if posts are shared by others, shows "by @maybekq" on the card.
- [ ] **Author email for RSS** — `config.toml` has no `author.email` set. The RSS template tries to render `managingEditor` from it. Minor, but completes the RSS metadata.

---

## UX & Reading Experience

- [ ] **Pagination or infinite scroll on `/blog/`** — 100+ posts on one page is a lot of DOM. Options: Hugo pagination (pages), or a "show more" button powered by the existing JSON index. The current experience may be fine if users rely on search — worth deciding.
- [ ] **"Back to top" button** — no scroll-to-top affordance on long articles. A CSS-only or minimal-JS version would be easy to add to `content.html` or the footer.
- [ ] **Anchor link hover visibility** — `main.css:357` sets `.hanchor { visibility: hidden }` with a commented-out hover effect ("not working"). The anchor links are generated via regex in `content.html` but the CSS hover selector may not match. Either fix the hover or make anchors always visible at reduced opacity.
- [ ] **Table of contents default** — `toc = false` in config.toml disables TOC everywhere. Posts can opt in via frontmatter, but the shortcode and the feature aren't documented anywhere visible. Worth deciding: should long posts have TOC enabled by default, or opt-in only?
- [ ] **Self-hosted fonts** — Google Fonts are loaded from googleapis.com, which makes a third-party network request on every page load. Self-hosting the Lato and Roboto font files in `static/fonts/` would eliminate that dependency, improve load predictability, and remove Google as a third party for privacy-conscious readers. Requires downloading the font files once.
- [ ] **Lazy-load the JSON index** — `footer.html` fetches `/index.json` on every page load (for the Random Read button). This could be deferred to only run when the button is clicked, reducing unnecessary network requests on pages without the button visible.
- [ ] **Local search UI** — the search box delegates to DuckDuckGo (`site:kevinquinn.fun`). Hugo is already generating a `/index.json` with all content. A library like Fuse.js (~24KB) could enable real on-site search using that index. Bigger feature, but the infrastructure is already there.

---

## Shortcodes

- [ ] **YouTube embed shortcode** — no built-in YouTube shortcode (Hugo has one built-in: `{{< youtube id >}}`), but it's not documented or used. Worth noting it exists if you ever need it. Alternatively, add a custom one with `loading="lazy"` on the iframe.
- [ ] **`figcaption` shortcode** — no way to add captions to images in markdown. A `{{< fig src="..." caption="..." >}}` shortcode would be useful for illustrated posts.
- [ ] **`details` / collapsible shortcode** — no shortcode for `<details><summary>` expand/collapse blocks. Useful for FAQ-style content or long asides.
- [ ] **Consolidate callout shortcodes** — `bootstrap-panel.html` (Bootstrap 3 panels) and `notion-callout.html` (modern, CSS-custom-property-based) do overlapping things. `notion-callout` is clearly the better implementation. Decide whether to deprecate `bootstrap-panel`, and whether any existing posts use it.
- [ ] **Fix `bootstrap-table.html`** — it uses a string replace hack (`replace . "<table>" "<table class='table table-striped'>"`) to inject Bootstrap classes. This is fragile. Could be replaced with a cleaner wrapper or just a CSS rule targeting `article table`.

---

## Template Architecture

- [ ] **Split `header.html`** — at 151 lines it handles: `<head>` metadata, navbar, social sidebar, search, and analytics. Extracting the navbar and search into their own partials (`_navbar.html`, `_search.html`) would make each file easier to reason about.
- [ ] **DRY up taxonomy rendering** — the category/tag rendering loop (`range $i, $cat := sort $.Params.categories`) appears in at least 3 templates (`li.html`, `content.html`, possibly others). A `_taxonomy.html` partial could consolidate this.

---

## Security & Privacy

- [ ] **Security headers in `netlify.toml`** — no HTTP security headers are configured. Adding a `[[headers]]` block for `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, and `Permissions-Policy` would be low effort on Netlify. CSP would be higher effort given the mix of CDN dependencies, but even a basic policy would help.
- [ ] **`<meta name="referrer">`** — not currently set. Adding `<meta name="referrer" content="strict-origin-when-cross-origin">` to `header.html` matches modern browser defaults explicitly and makes the policy visible.
- [ ] **Consider self-hosting CDN assets** — Bootstrap, jQuery, and Highlight.js are loaded from external CDNs. Self-hosting them in `static/js/` and `static/css/` would eliminate those third-party requests and make the site work fully offline / in restrictive environments. Low urgency but aligns with the existing effort to not depend on CDNs (noted in CLAUDE.md).

---

## Static Tool Improvements

- [ ] **`static/bin/bus.html`** — contains ~40 lines of dead commented-out JavaScript (debugging code that was never cleaned up). Safe to delete.
- [ ] **`static/bin/bingo.html`** — no localStorage persistence. After a refresh, the entered words are gone. Adding a `localStorage.setItem` on input change would make the tool more useful in practice.
- [ ] **`static/bin/points-depreciation.html`** — if the Chart.js CDN fails, the page shows inputs but no chart. A fallback message or a `<table>` rendering of the same data would make it resilient.
