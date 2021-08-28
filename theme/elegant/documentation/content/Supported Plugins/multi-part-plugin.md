---
Title: Displaying a Series Information for Your Multipart Articles
Subtitle: Deprecated
Tags: pelican-plugin, navigation, web-design, deprecated
Category: Supported Plugins
Date: 2014-04-20 18:18
Slug: how-to-use-multi-part-plugin
Summary: Elegant can be configured to provide a series section on the right sidebar. Only visible in articles that are labelled as part of a series, this indicator allows navigation between the articles in the series.
Authors: Talha Mansoor, Jack De Winter
---

!!! important "Deprecation"

    The `multi-part` plugin has been deprecated in favor of the `series`
    plugin. For an up-to-date article on using the `series` plugin, [go
    here]({filename}./series-plugin.md).

When writing articles about certain topics, it is advantageous to split a single article into
multiple articles. Without splitting the article up, the author would be forced to cram all
of the content into a denser and much longer article, reducing its effectiveness and
readability in the process. Splitting the article allows the author to focus on a specific
concept of the larger article, thereby increasing the overall appearance and readability.

Elegant provides the ability to present a view of the articles in the series in the middle of
the right sidebar. This section starts with the name of the series, followed by one bullet
point for each of the articles in the series. The text for the article is prefaced with
"Part N: " (where N is the index of the article) and then the title for the article. To make
navigation easier, the current article is presented in italics, with the other articles being
presented as links to their respective articles.

Here is an example of what the Series section may look like:

![series example in the sidebar]({static}/images/elegant-theme_multi-part-sidebar.png)

## Configuration

To enable the reading time for your articles, you need to add `multi-part` to the `PLUGINS`
configuration variable in your Pelican configuration.

```python
PLUGINS = ['multi-part']
```

In addition, the `SERIES_TITLE` configuration variable can be set to specify the title used for
the Series section, regardless of the series.

```python
SERIES_TITLE = "More In This Series"
```

## Article Metadata

Once the configuration for Series is enabled in the configuration file, using this feature for
a given set of articles requires that the article contains the `series`
[metadata]({filename}../Advanced Features/metadata.md) field value.

The text assigned to the `series` metadata field is the title of the series. When the page is
created, Pelican provides Elegant with a list of all pages that have the same value for the
`series` metadata field. By default, Elegant sorts that list according to the publish date for
each article. The titles for those pages is then displayed in sorted order, with the current
page presented in _italics_ and the other pages presented as a link to those pages.

```markdown
series: Maximizing Elegant
series_index: 2
```

If there is a reason to override the ordering of the articles, the `series_index` metadata
field is required. It is recommended that you use the part number you want displayed for the
article as the value to assign to the field.
