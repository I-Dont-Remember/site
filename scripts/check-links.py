#!/usr/bin/env python3
"""
Internal link checker for the Hugo-generated public/ directory.
Checks that all internal href and src attributes resolve to real files.
Also checks fragment links (#id) resolve to IDs that exist on the page.

Usage: python3 scripts/check-links.py [public-dir]
Exits 1 if broken links are found.
"""

import os
import sys
import re
from html.parser import HTMLParser
from urllib.parse import urlparse, unquote
from collections import defaultdict


PUBLIC_DIR = sys.argv[1] if len(sys.argv) > 1 else "public"


class LinkExtractor(HTMLParser):
    """Extracts href, src attributes and element IDs from HTML."""

    def __init__(self):
        super().__init__()
        self.links = []   # (attr, value) tuples
        self.ids = set()

    def handle_starttag(self, tag, attrs):
        attr_dict = dict(attrs)
        # Collect IDs for fragment checking
        if "id" in attr_dict:
            self.ids.add(attr_dict["id"])
        # Collect links
        for attr in ("href", "src", "action"):
            if attr in attr_dict:
                self.links.append((attr, attr_dict[attr]))


def is_external(url):
    return url.startswith(("http://", "https://", "//", "mailto:", "tel:", "javascript:", "#"))


def resolve_path(url, page_path, public_dir):
    """
    Given a URL from a page at page_path, return the filesystem path it should resolve to.
    Returns None if the URL is external or otherwise not checkable.
    """
    if not url or is_external(url):
        return None

    parsed = urlparse(url)
    path = unquote(parsed.path)

    if not path:
        return None  # Fragment-only or empty

    if path.startswith("/"):
        # Absolute path: resolve from public root
        fs_path = os.path.join(public_dir, path.lstrip("/"))
    else:
        # Relative path: resolve from page's directory
        page_dir = os.path.dirname(page_path)
        fs_path = os.path.normpath(os.path.join(page_dir, path))

    return fs_path


def path_exists(fs_path):
    """Check if path exists, also trying path/index.html for directory-style URLs."""
    if os.path.isfile(fs_path):
        return True
    if os.path.isfile(fs_path + "/index.html"):
        return True
    if os.path.isdir(fs_path):
        return True
    return False


def check_fragment(fragment, ids, page_file):
    """Return True if fragment (without #) exists as an ID in the page."""
    return fragment in ids


def main():
    if not os.path.isdir(PUBLIC_DIR):
        print(f"Error: '{PUBLIC_DIR}' directory not found. Run 'make build' first.")
        sys.exit(1)

    broken = []
    total_links = 0
    total_pages = 0

    # Walk all HTML files
    for root, dirs, files in os.walk(PUBLIC_DIR):
        # Skip admin and other non-content dirs
        dirs[:] = [d for d in dirs if d not in ("admin",)]
        for filename in files:
            if not filename.endswith(".html"):
                continue

            page_path = os.path.join(root, filename)
            total_pages += 1

            try:
                with open(page_path, "r", encoding="utf-8", errors="replace") as f:
                    content = f.read()
            except OSError:
                continue

            parser = LinkExtractor()
            parser.feed(content)

            for attr, url in parser.links:
                if not url:
                    continue

                total_links += 1
                parsed = urlparse(url)

                # Fragment-only link: check ID exists on this page
                if url.startswith("#"):
                    fragment = parsed.fragment
                    if fragment and fragment not in parser.ids:
                        rel_page = os.path.relpath(page_path, PUBLIC_DIR)
                        broken.append((rel_page, attr, url, "fragment ID not found on page"))
                    continue

                # Skip external URLs
                if is_external(url):
                    total_links -= 1  # Don't count externals in total
                    continue

                fs_path = resolve_path(url, page_path, PUBLIC_DIR)
                if fs_path is None:
                    continue

                if not path_exists(fs_path):
                    rel_page = os.path.relpath(page_path, PUBLIC_DIR)
                    rel_target = os.path.relpath(fs_path, PUBLIC_DIR)
                    broken.append((rel_page, attr, url, f"target not found: {rel_target}"))

    # Report
    print(f"Checked {total_links} internal links across {total_pages} pages.")

    if broken:
        # Group by page for readability
        by_page = defaultdict(list)
        for page, attr, url, reason in broken:
            by_page[page].append((attr, url, reason))

        print(f"\nFound {len(broken)} broken link(s):\n")
        for page in sorted(by_page):
            print(f"  {page}")
            for attr, url, reason in by_page[page]:
                print(f"    [{attr}] {url}")
                print(f"         → {reason}")
        print()
        sys.exit(1)
    else:
        print("All internal links OK.")


if __name__ == "__main__":
    main()
