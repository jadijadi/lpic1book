---
Title: Code Snippets -- Display Line Numbers
Tags: markdown, reST, code-snippets, gist
Category: Components
Date: 2013-11-05 17:36
Slug: display-line-numbers-in-code-snippets
Summary: reStructuredText and Markdown have directives that generate line numbers for code blocks. Use them to display line numbers in code snippets.
Keywords: code-snippets, python-markdown
authors: Talha Mansoor
---

reStructuredText and Markdown have directives that generate line numbers for
code snippets. Install [Pygments](http://pygments.org/) to use these directives.

Following examples will generate this output,

    #!python
    def example():
        print 'Hello World'

## reStructuredText

reStructuredText has `code-block` directive to insert code snippets in your
markup. Use `linenos` flag to switch on line numbers for the snippet.

    :::reST
    .. code-block:: python
        :linenos:

        def example():
            print 'Hello World'

## Markdown

[Python-Markdown](https://github.com/Python-Markdown/markdown/) uses
[CodeHilite](https://python-markdown.github.io/extensions/code_hilite/) <!-- yaspeller ignore -->
extension for syntax highlighting. Setup
CodeHilite <!-- yaspeller ignore -->
, then use Shebang `#!` to
generate line numbers.

    :::markdown
    #!python
    def example():
        print 'Hello World'
