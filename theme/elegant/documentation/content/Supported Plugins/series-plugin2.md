---
Title: Displaying Multi-Part Articles - Part 2
Tags: pelican-plugin, navigation, web-design
Category: Supported Plugins
Date: 2019-12-08
Slug: how-to-use-series-plugin-2
Comment_id: 3ws2xke-how-to-use-series-plugin-2
Subtitle:
Summary: Elegant can be configured to provide a series section on the right sidebar. Only visible in articles that are labelled as part of a series, this indicator allows navigation between the articles in the series.
Keywords:
Authors: Jack De Winter
series: Article Series
series_index: 2
---

## And Now Back to Your Regular Programming

To show how this feature works, with a concrete example, this article was purposefully
split into two parts. The first part of this article can be accessed by looking under
the section labelled `Article Series` on the right toolbar. This `Part 1` article is
displayed using normal text, while the following `Part 2` article is shown in an
italicized text. Click on the `Part 1` article text on the right toolbar to go to the
previous article.

## Article Metadata

Once the configuration for Series is enabled in the configuration file, using this feature for
a given set of articles requires that the article contains the `series`
[metadata]({filename}../Advanced Features/metadata.md) field value.

The text assigned to the `series` metadata field is the title of the series. When the page is
created, Pelican provides Elegant with a list of all pages that have the same value for the
`series` metadata field. By default, Elegant sorts that list according to the publish date for
each article. The titles for those pages is then displayed in sorted order, with the current
page presented in _italics_ and the other pages presented as a link to those pages.

```Markdown
series: Maximizing Elegant
series_index: 2
```

If there is a reason to override the ordering of the articles, the `series_index` metadata
field is required. It is recommended that you use the part number you want displayed for the
article as the value to assign to the field.
