---
Title: How does modified metadata works
Tags: web-design, metadata, date
Category: Advanced Features
Date: 2014-04-19 14:52
Slug: how-does-modified-metadata-works
Comment_id: q4nz2k0-how-does-modified-metadata-works
Summary: Use modified metadata to show the date at which you last updated the article
authors: Talha Mansoor
---

You need to update your articles time and again. Sometimes it makes sense to
display the date when you updated the article.

Pelican release [v3.4.0](http://docs.getpelican.com/en/stable/changelog.html#id9) has a new
[ metadata field `modified`](https://github.com/getpelican/pelican/pull/1148). Type of
its value is `datetime`.

You can show the last updated
date of the article by defining `modified` in your article metadata.

This is how it is displayed in the side bar,

![Modified Date]({static}/images/elegant-theme_last-modified.png)

Depending on your
[`DATE_FORMATS`](http://docs.getpelican.com/en/latest/settings.html#basic-settings)
setting you can put modified date in your reST formatted file as

    :::Rest
    :modified: 2014-01-22 14:30

Elegant will process it and display the last updated as "Jan 22, 2014".

!!! important "Condition to Display Last Updated"

    Last Updated is only displayed if the difference between `article.modifed`
    and `article.date`is more than or equal to a day.

    This means if you modify and article the same day you add it, then Last
    Updated will not be displayed.

!!! tip

    You may want to enable
    [`filetime_from_git`](https://github.com/getpelican/pelican-plugins/tree/master/filetime_from_git)
    Pelican plugin to auto fill the modified field for your Git commit history.

### Deprecated

!!! Danger "Warning: Legacy Variable"

    Pelican versions prior to 3.4 does not have `modified` metadata in which case type of its
    value is string.

If you are using old version of Pelican, i.e 3.3 or less, make
sure you assign it a value exactly the way you want it to appear.
Whatever you type, it will appear as it is.

Taking the
example from above, metadata in your reST formatted file should be,

    :::Rest
    :modified: Jan 22, 2014

You can also assign raw HTML to it. For example,

    :::html
    :modified: <a href="https://github.com/talha131/onCrashReboot/" title="Revision History">Aug 29, 2013</a>

But I do **not** recommend it because it will break on newer versions of
Pelican. In fact, you should ditch Pelican 3.3 or less and move to a higher
version if you require `modified` metadata.
