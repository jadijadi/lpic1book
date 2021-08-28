Title: Permalinks To Headings
Tags: navigation,
Category: Components
Date: 2019-12-02 11:05
Slug: permalinks-to-headings
Subtitle:
Summary:
Keywords:

First, you need to enable the `toc` extension for Markdown in your Pelican configuration.

```python
MARKDOWN = {
  'extension_configs': {
    'markdown.extensions.toc': {}
  }
}
```

Then enable `permalink` option available for the `toc` extension.

```python
MARKDOWN = {
  'extension_configs': {
    'markdown.extensions.toc': {
      'permalink': 'true',
    }
  }
}
```

Enabling the `permalink` option will provide direct links to each heading.

Hover over following example heading to see the permalink.

## Example Heading

You would get this,

![Permalinks example using Markdown]({static}/images/elegant-theme-toc-permalinks.png)

!!! Tip Recommendation

    When set to True the paragraph symbol `¶` or `&para;` is used by Python markdown.
    This becomes part of the RSS feed.

    We recommend setting permalink option to a space.

```python
MARKDOWN = {
  'extension_configs': {
    'markdown.extensions.toc': {
      'permalink': ' ',
    }
  }
}
```
