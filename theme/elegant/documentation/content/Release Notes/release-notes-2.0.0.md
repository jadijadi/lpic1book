---
Title: Version 2.0.0
authors: Pablo Iranzo Gómez, Talha Mansoor, Matija Šuklje
Tags: change-log, project-management
layout: post
date: 2019-02-10 05:59
comments: false
Slug: elegant-2-0-0-release-notes
Summary: Big improvements on all fronts – loads of bug fixes, improved W3C conformance, a community development model, and a new website.
Category: Release Notes
---

[TOC]

# Introduction

With more than 4 years in the making, this release started "better late then never", but it turned out to _so **much**_ more than that.

With the [community spark re-ignited][announcement_community], this has become the biggest release since probably 1.0. And as such a very worthy release to carry the 2.0 crown.

[announcement_community]: {filename}../Contributing/community-driven-project.md

# Elegant v 2.0 is finally here!

A lot has happened since the last release of elegant theme and a great effort was also done and new steps for the future have been set as the way forward.

V2 is not only a new set of bytes but also features and probably, the most important step has been evolving elegant into a community effort.

Talha, who created the elegant theme, helped this movement by setting a new home for the repository and the documentation as well as adding some next steps towards evolving the theme faster in the future by removing some dependencies.

A brave set of collaborators have helped shape this future via new issue creation, review of pending pull requests and defining how the community and project should continue.

This has been noticed in the last months activity in the repository, the opened issues, and zapping the old ones not to lose any contribution, either from their original authors or resubmitting them on their behalf.

A lot of things are remain to be done that will allow pelican 4.0 compatibility, removal of legacy code inherited from bootstrap, etc

Don't hesitate to give Elegant a new try, testing the new version or experimenting it at our brand new documentation/demo site at <https://pelican-elegant.github.io>.

And of course let us know if something is not as you would expect or wish so that we can have Elegant become your pelican theme.

Thanks to all our contributors mentioned either at Authors document <https://github.com/Pelican-Elegant/elegant/blob/master/AUTHORS.md> or at <https://github.com/Pelican-Elegant/elegant/graphs/contributors>

# Stats

**119 issues** were [closed in the 2.0 release][milestone-2.0] – an impressive number, even if we take into account that many of the bugs were of an organizational nature, as Pelican Elegant has changed the development and governance model (more on that in a [separate post][announcement_community]). Compare that to [1.3 release][milestone-1.3], which consisted of 4 issues, or the total amount of closed issues so far, which amount to 133.

[milestone-2.0]: https://github.com/Pelican-Elegant/elegant/milestone/3?closed=1
[milestone-1.3]: https://github.com/Pelican-Elegant/elegant/milestone/1?closed=1

Up until [1.3 release][contrib_to-1.3], the only person to commit was [Talha Mansoor][talha131] with 357 commits.

From 1.3 release until the [2.0 release][contrib_to-2.0] there were **316 new commits in total** and divided as follows (excluding merge commits):

- [Talha Mansoor – "talha131"][talha131]: 264 commits
- [Pablo Iranzo Gómez – "iranzo"][iranzo]: 8 commits
- [Calf Zhou – "calfzhou"][calfzhou]: 7 commits <!-- yaspeller ignore -->
- [Andrew Wegner – "AWegnerGitHub"][awegnergithub]: 6 commits <!-- yaspeller ignore -->
- [Matija Šuklje – "silverhook"][silverhook]: 5 commits <!-- yaspeller ignore -->
- [Jeremy Thurgood – "jerith"][jerith]: 1 commit <!-- yaspeller ignore -->
- [Mobile Developer – "0x8BADFOOD"][0x8badfood]: 1 commit
- [Leo Torres – "leotrs"][leotrs]: 1 commit <!-- yaspeller ignore -->
- [Gan Shen – "gshen42"][gshen42]: 1 commit <!-- yaspeller ignore -->
- [Gert van Dijk – "gertvdijk"][gertvdijk]: 1 commit <!-- yaspeller ignore -->
- [Miguel Lechón – "debiatan"][debiatan]: 1 commit <!-- yaspeller ignore -->

[contrib_to-1.3]: https://github.com/Pelican-Elegant/elegant/graphs/contributors?to=2013-10-11&type=c
[contrib_to-2.0]: https://github.com/Pelican-Elegant/elegant/graphs/contributors?from=2013-10-12&to=2018-12-27&type=c

As we can clearly see, by any metric this is a huge milestone for Elegant.

[pelican]: https://getpelican.com
[awegnergithub]: https://andrewwegner.com

[ashwinvis]: https://ashwinvis.github.io/ <!-- yaspeller ignore -->
[calfzhou]: http://gocalf.com <!-- yaspeller ignore -->
[talha131]: http://oncrashreboot.com
[iranzo]: https://iranzo.github.io/ <!-- yaspeller ignore -->
[silverhook]: https://matija.suklje.name <!-- yaspeller ignore -->
[jerith]: http://rhetoric.jerith.org/ <!-- yaspeller ignore -->
[0x8badfood]: https://0x8badfood.github.io/blog/
[leotrs]: http://leotrs.com/
[gshen42]: https://gshen42.github.io/ <!-- yaspeller ignore -->
[gertvdijk]: https://blog.g3rt.nl/ <!-- yaspeller ignore -->
[debiatan]: https://blog.debiatan.net/

# Highlights

Most issues belonged to bugs and dependency updates,
amongst <!-- yaspeller ignore -->
the biggest:

- support for HTTPS out of the box by making the links protocol agnostic
- fix for search to work again
- fix of accordion menus not opening up – fixes both issues with categories and comments
- fix of table of content
- much improved build speed
- support for Jinja 2.9 (and newer)

But also new features were added. To list just a few:

- article summaries in recent posts
- added links to social networks (if so desired)
- support for several analytics providers
- support for the `series` plugin (instead of the deprecated `multi_part` plugin)
- non-English languages are now possible as default, as well as having translations of articles
- big steps towards full W3C compliance
- support of LaTeX as input format
- support for Disqus comments
- new website and documentation (more on that in a [separate post][announcement_community])

For a full CHANGELOG, see below.

# Full CHANGELOG

Below is the full CHANGELOG:

## Version 2.0

- Link to your social profiles
- Upgraded to Twitter Bootstrap 2.3.2
- Upgraded to Tipue Search 3.1
- Support for `custom.css`
- [Stat Counter Analytics ](http://statcounter.com/) support
- Google Universal Analytics support
- Support for custom icons for social profiles
- Support for Pelican (>3.3) new metadata `modified`
- Support for Social Media Tags
- Support for Google Authorship
- Translations support
- `article.comments_intro` that overrides `COMMENTS_INTRO`. Now you can define
  article specific comments introduction
- Add Disqus comments to Pages
- All customizable variables consolidated in a single `_defaults.html`, making
  it easier for you to customize or even _localize_ the theme
- Adds author blurbs at the end of the article

### Performance

- 4x faster output
- Reduce number of HTTP requests using `assets` plugin
- Shortcut icons, like favicon, are disabled by default. Set
  `USE_SHORTCUT_ICONS` to true to enable it

### Visual Style

- Email newsletter subscriber form style matches rest of the theme
- Article images have a visible border
- Block quotes have a quote icon instead of a thick line on left
- Article's paragraph font size is bigger, for better readability
- Remove unnecessary padding in sidebar's tag list
- Archives page and recent posts on home page have better presentation
- Time stamps in categories and tags pages are justified
- Line number in code block is hidden on tablets and phones to save space for
  content
- More sizes of image for Apple Touch icons
- Fixed: Nested lists have different font sizes
- Fixed: CSS style rules for literal block in reST is missing
- Fixed: Long lines in code block will wrap to next line
- Fixed: Code block will not play nice with line numbers
- Fixed: Subscribe button changes its size on smaller screens
- Fixed: Articles under tag heading on tags page are not sorted
- Fixed: URL scheme for blogs which are not published to the root folder
- Fixed: Footer is always under the fold even on smaller length web pages
- Fixed: Site Name and top navigation menu move to left on wide displays
- Fixed: Page link is not active in the navbar if `SAVE_PAGE_AS` is not set to
  default

### Plugins

- Use `neighbor` plugin to show next and previous articles
- Use `assets` plugin to minify CSS and JS files
- Support for `share_post` plugin
- Support for `related_posts` plugin
- Support for `multi_part` plugin

### Behavior

- Search results link open in the same window, which is consistent with
  internet search engines
- Comments section message changes when user toggles it
- Fixed: Clicking Search button in 404.html does not trigger search
