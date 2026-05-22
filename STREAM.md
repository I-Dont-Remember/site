# Publishing to Stream

Quick reference for adding a new stream post — works from GitHub mobile in under a minute.

## File location

```
content/stream/YYYY-MM-DD-keyword-thoughts.md
```

Example: `content/stream/2026-05-21-agents.md` — one-to-a-few word(s) that captures the topic. Multiple posts in a day just need different keywords.

## Minimal frontmatter

```toml
+++
date = 2026-05-21T14:30:00.000Z
+++

Your thought here. Aim for <250 words. No title needed.
```

## With tags (optional)

```toml
+++
date = 2026-05-21T14:30:00.000Z
tags = [ "ai", "productivity" ]
+++

Your thought here.
```

## Rules

- **No title** — the date is the identifier
- **No H1** — use H2 (`##`) if you need headings within a post
- Push to `master` → Netlify auto-deploys
