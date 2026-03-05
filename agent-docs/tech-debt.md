# Tech Debt Tracker

Audited: 2026-03-04. Issues found across accessibility, performance, and general tech debt. Check items off as resolved.

---

## Accessibility

### Iframes missing `title` attribute
- [x] [MED] `themes/hugo-goa/layouts/partials/email-form.html:18` — Beehiiv iframe was already commented out; now using Kit.com JS embed (no iframe). Non-issue.
- [x] [MED] `layouts/shortcodes/giphy.html` — fixed: added `title="Giphy GIF embed"`
- [x] [MED] `layouts/shortcodes/tenor-gif.html` — Added a MutationObserver that watches for Tenor's dynamically injected iframe and sets `title="Tenor GIF embed"` on it. Observer is guarded by `window._tenorTitleObserver` so it only registers once even if the shortcode appears multiple times on a page.
- [x] [LOW] `static/bin/bus.html:59` — fixed: added `title="Chicago Transit bus tracker"`

### Missing `lang` attribute on `<html>` tag
- [x] [MED] `static/bin/index.html` — fixed
- [x] [MED] `static/bin/bus.html` — fixed
- [x] [MED] `static/bin/points-depreciation.html` — fixed

### Broken or incorrect ARIA
- [x] [HIGH] `themes/hugo-goa/layouts/partials/content.html:74` — fixed: `ariaLabel=` → `aria-label=`; affects all blog post heading anchors
- [x] [LOW] `themes/hugo-goa/layouts/partials/header.html:81` — logo `<img>` has both `alt` and `aria-label`; remove `aria-label`, `alt` is sufficient

### Images with empty or missing alt text
- [x] [HIGH] `themes/hugo-goa/layouts/partials/content.html:66` — post images now use `alt="{{ $.Title }}"` (the post title) as a fallback. Per-image alt text would require adding an `images_alt` front matter field and updating the template — noted as a possible future improvement but the title fallback is a significant improvement over empty string.

### Missing form labels
- [x] [MED] `layouts/partials/pricing-calculator.html` — added `<label for="numUsersInput">` wrapping the "Total Users" text

### Video accessibility
- [x] [LOW] `layouts/shortcodes/video.html` — added `<track kind="captions">` element. Note: no actual caption files exist for any video; this satisfies the HTML validator but a screen reader user would still get no captions. Real fix requires per-video `.vtt` files.

### Broken icon rendering
- [x] [MED] `themes/hugo-goa/layouts/partials/header.html:41` — re-enabled FontAwesome 4.6.3 CSS; social icons (Twitter, GitHub) now render correctly again.

---

## Performance

### Image optimization
- [ ] [HIGH] Multiple large images in `static/uploads/` not converted to WebP. Worst offenders:
  - `error-blame-game-tennis.png` — 760K
  - `chestertons-fence-illustrated.png` — 517K
  - `recurring-venmo-payments-smaller.png` — 525K
  - `hai-nguyen-lszfnpvzjtw-unsplash.jpg` — 637K
  - `hugo-site-random-button-small.jpg` — 489K
  - `pihole-dashboard.png` — 370K
- [ ] [MED] Images in `static/img/` also not WebP:
  - `puma-puff-cropped.png` — 211K
  - `kq-fun-default-site-img.png` — 149K

### Lazy loading
- [x] [MED] `themes/hugo-goa/layouts/_default/_markup/render-image.html` — rendered images have no `loading="lazy"` attribute; add it to defer offscreen images

### Missing SRI hashes (security + cache integrity)
- [x] [MED] `themes/hugo-goa/layouts/partials/footer.html:31` — switched jQuery CDN from `ajax.googleapis.com` to `code.jquery.com` (official jQuery CDN) and added `integrity="sha256-ZosEbRLbNQzLpnKIkEdrPv7lOy9C27hHQ+Xp8a4MxAQ=" crossorigin="anonymous"`
- [x] [MED] `themes/hugo-goa/layouts/partials/footer.html:20` — upgraded Highlight.js from 9.12.0 → 11.11.1, added `integrity="sha384-RH2xi4eIQ/gjtbs9fUXM68sLSi99C7ZWBRX1vDrVv6GQXRibxXLbwO2NGZB74MbU" crossorigin="anonymous"`, updated deprecated `hljs.initHighlightingOnLoad()` → `hljs.highlightAll()`, and also uncommented + updated the Highlight.js CSS link in `header.html` to 11.11.1 (was commented out, meaning code blocks had no syntax highlighting theme applied)

### Google Fonts API
- [x] [LOW] `themes/hugo-goa/layouts/partials/header.html:39` — Fonts URL has a duplicate `rel` attribute (both `rel="stylesheet"` and `rel="preconnect"` on the same tag) and is missing `display=swap`. Fix: split into a `<link rel="preconnect">` and a separate `<link rel="stylesheet" href="...&display=swap">`.

---

## Tech Debt

### Severely outdated CDN dependencies
These are load-bearing and will require careful testing if upgraded. The site's styling is tightly coupled to Bootstrap 3.

- [ ] [HIGH] **Bootstrap 3.3.7** (2014) — used in `themes/hugo-goa/layouts/partials/header.html` + `footer.html`. Current: Bootstrap 5.x. Upgrading is a breaking change to grid classes and component markup; track separately if attempted.
- [ ] [LOW] **jQuery 1.12.4** (2016) — now on official jQuery CDN with SRI. No custom site JS uses jQuery directly — it's only there because Bootstrap 3 JS requires it. Cannot remove without also upgrading Bootstrap. Downgraded to LOW since it's now an inherent dependency of Bootstrap 3, not a standalone risk.
- [x] [MED] **Highlight.js 9.12.0** (2017) — upgraded to 11.11.1. See SRI notes above.

### Dead code: IE9 compatibility shims
- [x] [LOW] `themes/hugo-goa/layouts/partials/header.html:48-52` — HTML5shiv and Respond.js loaded via conditional comments for IE8/9. IE is dead (EOL 2022). Safe to delete the entire block.
- [x] [LOW] `themes/hugo-goa/static/css/main.css` — contains `@-ms-viewport` and `@-o-viewport` rules for Windows Phone / Opera Mobile. Dead code, safe to remove.
- [x] [LOW] `themes/hugo-goa/static/js/main.js:3` — IE10 Mobile viewport fix. Safe to remove.

### Dead CMS config
- [x] [LOW] `.forestry/` — Forestry.io was acquired/deprecated. This directory is entirely dead config. Safe to delete.

### Tina CMS config issues
- [x] [LOW] `tina/config.ts:5` — hardcoded `"main"` as the branch name, but this repo uses `master`. Should be `process.env.HEAD || "master"`.
- [x] [LOW] `tina/config.ts:6` — fallback token is `"blech"` (a placeholder). Fine locally, but worth removing the fallback so it fails loudly in misconfigured environments.

### Stale content
- [ ] [LOW] `content/blog/my-backup-plan-if-dex-crm-goes-kaput.md` — has been `draft = true` since 2023. Post looks complete (explains plan, has screenshots). Needs owner decision: publish it, or delete it. Dex CRM still exists as of 2026 so it's still relevant.

### Node version
- [x] [LOW] `.nvmrc` specifies `18.12.0` (Oct 2022). `mise.toml` overrides this locally with `node = "latest"`. Update `.nvmrc` to a current LTS (20.x or 22.x) so it doesn't mislead.

### Netlify deploy previews
- [x] [LOW] `netlify.toml` — deploy preview context has a `# TODO: doesn't work` comment. Either fix or remove the `[context.deploy-preview]` block to avoid confusion. Removed the block entirely.
