---
Title: Comments -- Disable Comments in an Article
Tags: interaction
date: 2019-01-12 16:29
comments: false
Slug: disable-comments-per-article
Category: Connecting With Your Readers
authors: Talha Mansoor
---

If you remove your comment service configuration, say you set `DISQUS_SITENAME` to empty string, then comments will disappear from all the articles.

Sometimes you want to disable comments on selected articles. In which case, you can set `comments` variable in the article metadata to `false`.

Here is an example,

```yaml
Title: Disable Comments
date: 2019-01-12 16:29
comments: false
Category: Commenting
```
