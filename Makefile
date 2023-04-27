.PHONY: tina

build:
	hugo --gc --minify

serve:
	hugo server -b localhost:1313

serve-drafts:
	hugo server -D -b localhost:1313

tina:
	npx tinacms dev -c "hugo server -b localhost:1313"
