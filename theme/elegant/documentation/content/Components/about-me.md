---
authors: Talha Mansoor
Title: Home Page -- Write About Me
Tags: remarkable, unique, home
Date: 2019-07-01 01:12
comments: false
Slug: write-about-me
Category: Components
---

!!! Important "Define `LANDING_PAGE_TITLE`"

    "About Me" section works only if you have defined `LANDING_PAGE_TITLE` in your Pelican configuration. [Read here.]({filename}./welcome.md)

To write about me section, create a page. See [Pelican documentation](http://docs.getpelican.com/en/stable/content.html#pages) on how to create a page.

The slug of the page should be `landing-page-about-hidden` and `status` should be `hidden`. Example,

```yaml
---
author: Talha Mansoor
title: What Is Elegant
layout: page
date: 2019-01-14 7:30:47 +0100
status: hidden
slug: landing-page-about-hidden
---

```

The content of this will become your "About me" section, and title will become the heading. You can write content in any markup language, like Markdown, AsciiDoc or reST, as long as Pelican has supports it.

![Home Page Sample]({static}/images/elegant-theme_home-page-features.png)

### Deprecated

!!! Danger "Warning: Legacy Variable"

    `LANDING_PAGE_ABOUT` was available in Elegant V2.5.0. It has since been passed out in favour of `landing-page-about-hidden`. The new method lets you write "About Me" in your favourite markup language.

You can write up your own About me section using `LANDING_PAGE_ABOUT` variable
in your configuration. It is a dictionary that has two keys `title` and
`details`.

Value of `title` is displayed in the header of the home page, like
in the above example it is "I design and build software products for iOS and
OSX".

`details` is the text that appears under "About me" heading. You can add raw HTML to it.
