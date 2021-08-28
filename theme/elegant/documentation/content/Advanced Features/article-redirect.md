---
Title: Article redirection
author: Pablo Iranzo Gómez
Tags: redirection
Category: Advanced Features
Date: 2018-11-30 10:32
Slug: article-redirect
Comment_id: hk9m5eq-article-redirect
Summary: Use Pelican redirect yaml preamble to point to new articles
---

We might want to redirect a visitor to another URL or article.

Ideally this is done via a `.htaccess` so that a proper 301 code is generated, but we might not have access to the web server configuration.

In Elegant we've included a `redirect` slug in the `yaml preamble` that allows to specify a target URL, that will be load with a http-refresh:

```html
<meta http-equiv="refresh" content="0;URL={{ article.redirect }}" />
```

The actual code to define a redirection in an article is to include `redirect` in the yaml preamble:

```yaml
---
Title: Article redirection
Slug: article-redirect
redirect: https://pelican-elegant.github.io/
---

```

When the article loads, it will refresh to the new URL defined in redirect, allowing you to still provide search engines and users a way to get to the new article.
