---
Title: Comments -- Enable CommentBox
Tags: interaction
Category: Connecting With Your Readers
Date: 2020-02-05 22:35
Slug: enable-commentbox-comments
Summary: Elegant offers CommentBox comments out of the box with few unique features
authors: Talha Mansoor
comment_id: 3a307b7d45
commentbox_filter: off
---

You can use [CommentBox](https://commentbox.io/) for comments. You have to set `COMMENTBOX_PROJECT` to your CommentBox project ID.

That's it. Elegant will take care of the rest.

You can see a working example of CommentBox comments in this article.

## Show CommentBox comments by default

Just set `COMMENTBOX_PROJECT` variable.

## Hide CommentBox comments by default

Unset `COMMENTBOX_PROJECT` variable.

This is the default setting.

## Hide CommentBox comments by default. Show on Selected

1. Set `COMMENTBOX_PROJECT`
1. Set `COMMENTBOX_FILTER` to `True`

This will hide CommentBox form on all pages.

Now to show CommentBox form on selected posts, in article metadata set

```yaml
commentbox_filter: off
```

## Show CommentBox comments by default. Hide on Selected

1. Set `COMMENTBOX_PROJECT`
1. Remove `COMMENTBOX_FILTER` or set it to `False` which is its default value

This will hide CommentBox form on all pages.

Now to hide CommentBox form on selected posts, in article metadata set

```yaml
commentbox_filter: on
```
