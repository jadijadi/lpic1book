---
Title: How To Improve the Download Time For Your Pages
Tags: pelican-theme, pelican-plugin, page-speed
Category: Supported Plugins
Date: 2014-03-24 14:09
Slug: avoid-unnecessary-http-requests
Comment_id: hk9m5eq-avoid-unnecessary-http-requests
Subtitle:
Summary: Pelican can be configured to compile multiple assets for your website into one single asset. When these assets are combined together, they are reduce to only their necessary components, and can be fetched by the browser in a single call.
Keywords:
Authors: Talha Mansoor, Jack De Winter
---

When a webpage is created, webpage authors and static page generators will often grab
low-level asset files from a trusted location. Between Pelican and Elegant, these files will
often number between 8 and 15 CSS or JavaScript files. While these files are
essential to the proper look and feel of a properly designed website, the overhead of this
content being in separate files is that separate requests are made for each of them to the
server.

!!! Important

    **Elegant comes with a compressed and concatenated CSS stylesheet**, so that only one request is made to fetch the CSS stylesheets. **Following instruction is redundant for most users.**

    But if you have decided to [customize the theme using `custom.css`]({filename}../Advanced Features/custom-style.md) then follow these instruction.

Pelican provides a plugin that takes the various CSS and JavaScript files and compiles each
group of them into a single file. Not only does this process reduce the number of calls to
retrieve files from the server, but it minifies or reduces the overall size of
those files as well.

## Configuration

To enable Asset Management for your website, add `assets` to the `PLUGINS` configuration
variable in your Pelican configuration.

```python
PLUGINS = ['assets']
```

!!! note

    The [assets plugin](https://github.com/getpelican/pelican-plugins/blob/master/assets/Readme.rst) requires the Python `webassets` and `cssmin` packages to be installed.
