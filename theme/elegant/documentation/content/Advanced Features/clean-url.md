---
authors: Talha Mansoor
Title: Clean URL
Tags: unique
Date: 2019-08-10 20:44
Slug: clean-url
Category: Advanced Features
---

Out of the box, Pelican generated URLs are [unclean](https://en.wikipedia.org/wiki/Clean_URL), i.e. they have `.html` appended. Elegant lets you use clean URLs with minimal configuration.

!!! Important "Mandatory"

    To use clean URLs, you server must support it.

## Categories, Tags and Archives

In your Pelican configuration set following values

```python
TAGS_URL = "tags"
CATEGORIES_URL = "categories"
ARCHIVES_URL = "archives"
```

With it set, your categories, tags and archives will be served from following links,

1. [`/categories`](/categories)
1. [`/tags`](/tags)
1. [`/archives`](/archives)

If you do not set the variables then the URLs will become

1. [`/categories.html`](/categories.html)
1. [`/tags.html`](/tags.html)
1. [`/archives.html`](/archives.html)

## Articles

For clean URLs for articles, just set

```python
ARTICLE_URL = "{slug}"
```

## Pages

For pages, set

```python
PAGE_URL = "{slug}"
PAGE_SAVE_AS = "{slug}.html"
```

## Search

For search page, set

```python
SEARCH_URL = "search"
```
