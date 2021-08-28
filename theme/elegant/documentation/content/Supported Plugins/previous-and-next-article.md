---
Title: Add Previous and Next Article Links
Tags: pelican-plugin, navigation, web-design
Category: Supported Plugins
Date: 2014-01-27 00:02
Slug: how-to-show-previous-and-next-article
Comment_id: p9ot4uz-how-to-show-previous-and-next-article
Subtitle:
Summary: Elegant can be configured to provide a Previous and Next article link at the bottom of your articles. This allows for easier navigation through the site if you are looking at articles in published date order.
Keywords:
Authors: Talha Mansoor, Jack De Winter
---

When reading a series of articles on a website, a reader often desires to view the articles in
chronological order by publish date.

Elegant provides the ability to provide navigation links to the previous and next articles at
the bottom of each article. These links provide a powerful way to keep visitors engaged
and guide them through your site.

Here is an example of what the Previous and Next Articles section may look like:

![Show next and previous articles]({static}/images/elegant-theme_previous-next-article.png)

## Configuration

To enable the Previous and Next Article links for your articles, add `neighbors` to the
`PLUGINS` configuration variable in your Pelican configuration.

```python
PLUGINS = ['neighbors']
```

When enabled, Elegant will show the links for Previous and Next articles at the very bottom of
every article, after any footnotes for the article, but before the footer for the website. The
link for the next oldest or Previous article is displayed on the left side and the next
youngest or Next article on the right side, being consistent with most languages being
Left-to-Right language. If there is no article that is newer or older than the current article,
the respective link will not be shown.
