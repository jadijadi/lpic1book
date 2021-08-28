---
Title: LiveReload Elegant Documentation Using Gulp.js
Tags: gulp
Date: 2019-07-19 23:17
Slug: live-reload-elegant-documentation-using-gulpjs
Category: Contributing
Authors: Talha Mansoor
---

Elegant has setup [gulp.js](https://gulpjs.com/) and [BrowserSync](https://www.browsersync.io/) for LiveReload feature to its developers and documentation writers. This is a better alternative to the [Python LiveReload solution that Pelican offers by default]({filename}./live-reload-python.md).

## Prerequisites

You need to run following steps only once, to setup the LiveReload using gulp.

### Step 1: Install NodeJS and Yarn <!-- yaspeller ignore -->

Install [Node.js](https://nodejs.org/en/download/) and [Yarn](https://yarnpkg.com/en/docs/install) on your system.

If you are on Windows then try installing them with [scoop.sh](https://scoop.sh/). It saves time and makes update easier.

### Step 2: Install gulp

Run this command from your command line terminal.

```bash
yarn global add gulp-cli
```

### Step 3: Install Dependencies

In the root of the Elegant repository, run

```bash
yarn install
```

`yarn` will create `node_modules` folder in the root.

## Use LiveReload

Run `gulp` command in the root of the elegant repository.

```bash
gulp
```

It will launch the browser and open the home page. Now when you edit the templates, CSS rules, JavaScript files, Markdown, or reStructuredText files, all opened tabs will automatically reload and reflect the change.

It is set to serve the documentation at <http://localhost:9001>.

## Why BrowserSync is better than Python-LiveReload

BrowserSync supports pretty URLs, which [Python-LiveReload doesn't]({filename}./live-reload-python.md#known-issue).

BrowserSync has number of additional powerful features.

### Interaction Sync

This is an extremely powerful and useful feature.

> Your scroll, click, refresh and form actions are mirrored between browsers while you test.

What it means is when you have URL open in more than one tabs or browsers. If you scroll in one tab, other tabs mirror the scroll movement.

You can use this feature to test your website in desktop and mobile widths simultaneously. Open a link in one tab normally, and in other tab in responsive mode.

### Browser Based UI

BrowserSync offers and easy to use UI. To access it, run `gulp`, open <http://localhost:9002/> in your browser.

### Debug CSS

You can add simple and depth CSS outlines to elements, or overlay CSS grid using BrowserSync. Open <http://localhost:9002/remote-debug> in your browser.

### Network Throttle

You can test website on a slower network connection. To access open <http://localhost:9002/network-throttle>

## Is gulp.js necessary to use?

We have plans to use gulp.js to utilize tools like
PostCSS <!-- yaspeller ignore -->
and
Autoprefixer <!-- yaspeller ignore -->
, in future. Currently we use gulp.js to watch for file changes.

Pelican helper scripts does not watch for file changes. BrowserSync only watches the files that it servers, i.e. HTML, CSS and JS files. This means you need an external tool like gulp.js to watch Markdown and Jinja2 files.

## Can I avoid using gulp.js?

No. You shouldn't. Because the alternate is not nice.

We tried to use BrowserSync without gulp.js but due to limitation in Pelican helper scripts, it didn't pan out.

We installed BrowserSync. Then on one terminal, from `documentation` folder, we ran

```bash
invoke regenerate
```

In other terminal, from `documentation` folder, we ran

```bash
browser-sync start --server output --files output
```

`regenerate` task compiles Markdown files to HTML. BrowserSync automatically picks the changed HTML files and reload the URLs.

Unfortunately, `regenerate` keeps "regenerating" even if no file has changed. As a result, BrowserSync keeps reloading the URL every second. It becomes useless because you cannot inspect HTML elements, view console or change CSS rules from the browser, because the URL is constantly overloading.

This forced us to resort to gulp.js for file watching.
