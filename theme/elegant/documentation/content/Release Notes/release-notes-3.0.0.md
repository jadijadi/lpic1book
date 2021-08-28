---
Title: Version 3.0.0
Tags: change-log, project-management
layout: post
date: 2019-07-03 23:54
comments: false
Slug: version-3-0-0-release-notes
Category: Release Notes
---

## [3.0.0](https://github.com/Pelican-Elegant/elegant/compare/V2.5.0...V3.0.0) (2019-07-03)

### Bug Fixes

- **admonition:** links should inherit the admonition color ([60c9184](https://github.com/Pelican-Elegant/elegant/commit/60c9184))
- **freelists:** use SUBSCRIBE_BUTTON_TITLE instead of generic GO ([c346d1f](https://github.com/Pelican-Elegant/elegant/commit/c346d1f))
- **home:** remove redundant title ([808cd1d](https://github.com/Pelican-Elegant/elegant/commit/808cd1d))

### Features

- **home:** write about me in markdown, reST or AsciiDoc ([9b5b2ec](https://github.com/Pelican-Elegant/elegant/commit/9b5b2ec)), closes [#85](https://github.com/Pelican-Elegant/elegant/issues/85)
- **menu:** set home URL to root if SITEURL is not ([23e0b94](https://github.com/Pelican-Elegant/elegant/commit/23e0b94))

### BREAKING CHANGES

- **home:** Previously LANDING_PAGE_ABOUT was a dictionary that contained html tags. We used it
  to create landing page. But users have demanded from the very beginning to be able to write the
  landing page in markdown. This patch adds this feature. But in order to use it, you have to update
  your configuration.
