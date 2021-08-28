---
Title: Code Snippets -- Highlight Lines
Tags: markdown, code-snippets, gist
Date: 2020-02-02 20:12
comments: false
Slug: code-snippets-highlight-lines
authors: Talha Mansoor
Category: Components
---

[Python-Markdown](https://github.com/Python-Markdown/markdown/) uses
[CodeHilite](https://python-markdown.github.io/extensions/code_hilite/) <!-- yaspeller ignore -->
extension for syntax highlighting.

This extension lets you highlight specific lines in your code snippets. You can read the instructions [here](https://python-markdown.github.io/extensions/code_hilite/#colons).

Elegant supports this feature.

    :::python hl_lines="1 3"
    # This line is emphasized
    # This line isn't
    # This line is emphasized

Another example,

    :::html hl_lines="2"
    <div
      class="elegant-gallery"
      itemscope
      itemtype="http://schema.org/ImageGallery"
    >
    </div>

Another example,

    #!python hl_lines="2"
    # Code goes here ..
    # This line is emphasized
    # This line isn't
