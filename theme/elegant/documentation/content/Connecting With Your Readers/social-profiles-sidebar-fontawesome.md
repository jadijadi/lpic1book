---
Title: How to display your Social Media Profiles
Subtitle: Deprecated
Tags: pelican-theme, font-awesome, social-media, web-design
Category: Connecting With Your Readers
Date: 2014-01-27 00:28
Slug: how-to-display-your-social-media-profiles-deprecated
Comment_id: k7fpj4y-how-to-display-your-social-media-profiles
Summary: Elegant displays links to your social media profiles in sidebar in a customizable manner
authors: Talha Mansoor
---

Bloggers use different tools to connect with their readers, engage in
discussion with them, and create a loyal following of fans. These tools range
from fully blown social web apps like twitter to old school RSS feeds.

Bloggers add a social media widget to their blog which has links to all their
social media profiles; inviting readers to engage with them else where on the
web too. Most social widgets are loud and obtrusive. Their colors and placement
takes away readers' attention from the actual content.

<img class="align-right" style="width: 262.0px; height: 140.0px;"
src="{static}/images/social-profiles-sidebar-default.png" alt="Social
Profiles in the Sidebar" />

Elegant understands the importance of readers engagement but it makes sure
not to push author's _"online social karma"_ down readers' throats.

Elegant displays the widget in the sidebar. Each icon is a link to a social
media profile with an appropriate title attribute. Icons use muted color which
changes when user hovers over them.

<img class="align-right" style="width: 134.0px; height: 62.5px;"
src="{static}/images/social-profiles-sidebar-facebook.png" alt="Hover over
Facebook icon in the sidebar" />

<img class="align-right" style="width: 134.0px; height: 62.5px;"
src="{static}/images/social-profiles-sidebar-twitter.png" alt="Hover over
Twitter icon in the sidebar" />

Elegant uses scalable vector icons from [Font
Awesome](http://fortawesome.github.io/Font-Awesome/). You can instantly
customize the icons by tweaking the CSS. This customization can range from
changing size and color to adding drop shadow.

## How to configure the _widget_

Define `SOCIAL` in your `pelicanconf.py`. `SOCIAL` is list of tuple. Each tuple
has two items, title and URL.

    :::python

    SOCIAL = (('Twitter', 'http://twitter.com/talham_'),
        ('Github', 'http://github.com/talha131'))

In this example, `SOCIAL` has two tuples. First tuple is `('Twitter', 'http://twitter.com/talham_')`. First element of the tuple is the title
`Twitter` and second element is the URL.

Elegant picks icons from Font Awesome. Title of the tuple, for example
`Twitter`, is used to decide the icon of the social media profile.

`Twitter` will use `fa-twitter` CSS class, `Github` will use `fa-github`, and
`Facebook` will use `fa-facebook`.

You can see all the icons and their corresponding CSS classes in [Font Awesome
documentation](http://fortawesome.github.io/Font-Awesome/icons/#brand).

## How to customize the icon

What if the icon of your social media site is not available in Font Awesome?
What if the CSS class name does not follow `fa-<title>` convention, for example
`Stack Exchange` is different from `fa-stack-exchange`? What if you want to use
`fa-youtube-play` in place of `fa-youtube` for your YouTube profile?

The solution is to add a third element to the tuple. CSS class name.

    :::python

    SOCIAL = (('Twitter', 'http://twitter.com/talham_', 'twitter-square'),
        ('Youtube', 'http://example.com', 'youtube-play'))

This third element is optional. It should be equal to the Font Awesome CSS
class that you want to use for the social profile, minus the `fa` part from the
CSS class name.

## How to customize Social Profile Label

By default, Elegant labels social profile section as **Contact**. You can
change this label by defining a new variable `SOCIAL_PROFILE_LABEL` in your
`pelicanconf.py` file.

    :::python

    SOCIAL_PROFILE_LABEL = u'Stay in Touch'
