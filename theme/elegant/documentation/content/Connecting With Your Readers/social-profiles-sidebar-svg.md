---
Title: How to display your Social Media Profiles
Tags: pelican-theme, font-awesome, social-media, web-design
Category: Connecting With Your Readers
Date: 2019-08-12 13:13
Slug: how-to-display-your-social-media-profiles
Summary: Elegant displays links to your social media profiles in sidebar in a customizable manner
authors: Talha Mansoor
---

Bloggers use different tools to connect with their readers, engage in
discussion with them, and create a loyal following of fans. These tools range
from fully blown social web apps like twitter to old school RSS feeds.

Bloggers usually add a social media widget to their blog which has links to all their
social media profiles; inviting readers to engage with them else where on the
web too. Most social widgets are loud and obtrusive. Their colors and placement
takes away readers' attention from the actual content.

<img class="align-right" style="width: 35%;"
src="{static}/images/social-profiles-sidebar-svg-default.png" alt="Social
Profiles in the Sidebar" />

Elegant understands the importance of readers engagement but it makes sure
not to push author's _"online social karma"_ down readers' throats.

Elegant displays the widget in the sidebar. Each icon is a link to a social
media profile with an optional title attribute. Icons use muted color which
changes when user hovers over them. On hover, icon is also scaled up in size.

Here is an example of hovering over
LinkedIn <!-- yaspeller ignore -->
icon.

<img style="width:35%;"
src="{static}/images/social-profiles-sidebar-svg-hover-linkedin.png" alt="Hover over LinkedIn in the Sidebar" />

Following image shows these icons in color.

<img style="width:35%;"
src="{static}/images/social-profiles-sidebar-svg-hover.png" alt="Social Profiles in color" />

These SVG icons are [Super Tiny](https://github.com/edent/SuperTinyIcons). Most of them have sizes less than 500 bytes, and none of them exceeds 1 K bytes in size. This gives you increased website speed.

## How to configure the _widget_

Define `SOCIAL` in your `pelicanconf.py`. `SOCIAL` is list of tuple. Each tuple
has three items,

1. `key`, case insensitive, must match one of the available keys
1. `URL`
1. `title`, optional

```python
SOCIAL = (
    ('Email', 'example@example.com', 'My Email Address'),
    ("Github", "https://github.com/Pelican-Elegant/", "Elegant Github Repository"),
    ("RSS", SITEURL + "/feeds/all.atom.xml"),
    ("Facebook", "https://facebook.com/ExamplePage/"),
)
```

If `title` is defined then it is used to populate title attribute of the link.

## Available Keys

1. `Calendar`
1. `Email`
1. `Facebook`
1. `Github`
1. `GitLab`
1. `Gmail`
1. `Goodreads`
1. `HackerNews`
1. `Instagram`
1. `Keybase`
1. `LinkedIn`
1. `Mastodon`
1. `Reddit`
1. `RSS`
1. `Spotify`
1. `StackOverflow`
1. `Telegram`
1. `Twitch`
1. `Twitter`
1. `Wire`
1. `YouTube`

## How to customize Social Profile Label

By default, Elegant labels social profile section as **Contact**. You can
change this label by defining a new variable `SOCIAL_PROFILE_LABEL` in your
`pelicanconf.py` file.

    :::python

    SOCIAL_PROFILE_LABEL = u'Stay in Touch'

## Missing Social Profile?

What if the icon of your social media site is not available?

Migrating from [font-awesome to SVG icons]({filename}./social-profiles-sidebar-fontawesome.md) opened up a whole lot of possibilities. We are not limited to icons provided by the [font-awesome] project. Instead, we can use any SVG icon.

If you icon of your favorite site is missing then feel free to [open an issue](https://github.com/Pelican-Elegant/elegant/issues/new?labels=enhancement&title=Request:%20Add%20new%20social%20icon%20in%20the%20sidebar). We will add it for you as long as a SVG icon is available for it.
