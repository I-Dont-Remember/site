.PHONY: build validate lint snapshot diff-snapshot clean setup serve serve-drafts tina screenshot pr-screenshots

# Prefer local binaries: repo's hugo/ dir and node_modules/.bin take precedence over system PATH.
# This lets make targets work without requiring mise or system-installed tools.
export PATH := $(PWD)/hugo:$(PWD)/node_modules/.bin:$(PATH)

# Install all language runtimes (via mise) and Node dependencies
setup:
	mise install
	npm install

build:
	hugo --gc --minify --printPathWarnings

# Build then check all internal links in the generated output
validate: build
	python3 scripts/check-links.py

# Lint markdown content (uses .markdownlint.json config)
lint:
	npx markdownlint-cli "content/**/*.md"

# Save a copy of the current build for later diffing.
# Use before a risky change (library upgrade, CSS refactor), then run diff-snapshot after.
snapshot:
	rm -rf public-snapshot
	cp -r public public-snapshot
	@echo "Snapshot saved. Make your changes, then run 'make diff-snapshot'."

# Rebuild and show which HTML files changed vs the snapshot
diff-snapshot: build
	@test -d public-snapshot || (echo "No snapshot found — run 'make snapshot' first." && exit 1)
	@diff -r --brief public-snapshot/ public/ || true

# Remove all generated output for a clean build
clean:
	rm -rf public public-snapshot resources/_gen

serve:
	hugo server -b localhost:1313

serve-drafts:
	hugo server -D -b localhost:1313

tina:
	npx tinacms dev -c "hugo server -b localhost:1313"

# Take a screenshot. Requires 'make serve' running in another terminal.
# Usage: make screenshot URL=http://localhost:1313 [OUT=tmp/screenshot.png]
screenshot:
	@test -n "$(URL)" || (echo "Usage: make screenshot URL=http://localhost:1313 [OUT=tmp/screenshot.png]" && exit 1)
	bash scripts/playwright-screenshot.sh $(URL) $(or $(OUT),tmp/screenshot.png)

# Take homepage + a blog post screenshot for PR descriptions.
# Requires 'make serve' running in another terminal.
# Blog post URL can be overridden: make pr-screenshots POST=http://localhost:1313/blog/your-post/
pr-screenshots:
	bash scripts/playwright-screenshot.sh http://localhost:1313 tmp/pr-homepage.png
	bash scripts/playwright-screenshot.sh $(or $(POST),http://localhost:1313/blog/) tmp/pr-blog.png
	@echo "Screenshots saved: tmp/pr-homepage.png and tmp/pr-blog.png"
