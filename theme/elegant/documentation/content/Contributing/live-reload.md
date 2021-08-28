---
Title: What is LiveReload
Date: 2019-07-19 21:17
Slug: what-is-live-reload
Category: Contributing
Authors: Talha Mansoor
---

What does LiveReload do?

> LiveReload monitors changes in the file system. As soon as you save a file, it is pre-processed as needed, and the browser is refreshed.

Elegant documentation is LiveReload ready. This feature saves a lot of time. Next time when you are writing or updating an article for Elegant documentation,

1. just open a browser on one side of your monitor (or on secondary monitor)
1. open URL of your article in the browser, for example <http://localhost:9001/what-is-live-reload>
1. open the Markdown file of your article and start typing
1. when you save the file, your markdown file will be compiled into HTML using Pelican, then your browser tab will reload automatically and show you the changes

There are two ways to get LiveReload working for Elegant documentation.

1. [Using gulp.js (Recommended)]({filename}./live-reload-gulp.md)
1. [Using Pelican]({filename}./live-reload-python.md)
