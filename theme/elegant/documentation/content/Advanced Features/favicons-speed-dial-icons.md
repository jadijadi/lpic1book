---
Title: How to set Shortcut Icons
Tags: web-design
Category: Advanced Features
Date: 2014-04-24 16:42
Slug: how-to-set-shortcut-icons
Comment_id: x0giyfl-how-to-set-shortcut-icons
Summary: Elegant lets you set Favicon, Opera Speed Dial icon, and shortcut icons for Apple iOS and Android devices.
authors: Talha Mansoor
---

Elegant supports Favicon, Opera Speed Dial, and shortcut or launcher icons on
Apple iOS and Android devices. These are disabled by default to avoid
unnecessary HTTP requests on sites that do not use them.

To enable, set `USE_SHORTCUT_ICONS` in your configuration

    :::python
    USE_SHORTCUT_ICONS = True

Place your images in `content/theme/images` directory, and define `STATIC_PATHS`
variable in your configuration

    :::python
    STATIC_PATHS = ['theme/images', 'images']

Your images should have these names,

1. `apple-touch-icon-152x152.png`
1. `apple-touch-icon-144x144.png`
1. `apple-touch-icon-120x120.png`
1. `apple-touch-icon-114x114.png`
1. `apple-touch-icon-76x76.png`
1. `apple-touch-icon-72x72.png`
1. `apple-touch-icon-57x57.png`
1. `apple-touch-icon.png`
1. `favicon.ico`

I highly recommend you to use
[Iconifier.net](http://iconifier.net/) <!-- yaspeller ignore -->
to generate the set of images.
