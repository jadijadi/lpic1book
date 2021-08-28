---
Title: Displaying Multi-Part Articles - Part 1
Tags: pelican-plugin, navigation, web-design
Category: Supported Plugins
Date: 2019-12-07
Slug: how-to-use-series-plugin
Comment_id: 3ws2xke-how-to-use-series-plugin
Subtitle:
Summary: Elegant can be configured to provide a series section on the right sidebar. Only visible in articles that are labelled as part of a series, this indicator allows navigation between the articles in the series.
Keywords:
Authors: Jack De Winter
series: Article Series
series_index: 1
---

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

To enable the reading time for your articles, you need to add `series` to the `PLUGINS`
configuration variable in your Pelican configuration.

```python
PLUGINS = ['series']
```

In addition, the `SERIES_TITLE` configuration variable can be set to specify the title used for
the Series section, regardless of the series.

```python
SERIES_TITLE = "More In This Series"
```

## To Be Continued

To show how this feature works, with a concrete example, this article was purposefully
split into two parts. The second part of this article can be accessed by looking under
the section labelled `Article Series` on the right toolbar. This `Part 1` article is
displayed using italicized text, while the following `Part 2` article is shown using
normal text. Click on the `Part 2` article on the right toolbar to go to the next
article.
