---
Title: Code Snippets -- Change Theme
Tags: unique
Date: 2019-07-03 20:18
Slug: change-syntax-highlight-theme
Category: Components
authors: Talha Mansoor
---

Elegant uses [Solarized theme](http://ethanschoonover.com/solarized) for syntax
highlighting. To replace it, copy contents of your preferred theme's CSS style
sheet into `custom.css`.

Alternatively, you can replace contents of `pygments.css` with your theme's
style sheet.

If you feel like experimenting with different themes then [this
repository](https://github.com/uraimo/pygments-vimstyles) has Pygments CSS of
Vim themes. [This one](https://github.com/richleland/pygments-css) has Pygments
CSS of built-in styles. Do not forget to change `.codehilite` CSS class
identifier to `.highlight`. Code blocks in Pelican generated HTML use
`.highlight` class.
