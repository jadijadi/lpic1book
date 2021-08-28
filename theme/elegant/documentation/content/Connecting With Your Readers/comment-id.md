---
Title: Comments -- Thread ID
Tags: interaction
date: 2019-06-30 22:29
comments: false
Slug: comments-thread-id
Category: Connecting With Your Readers
authors: Talha Mansoor
---

Most Pelican themes pass article URL to Disqus as the [Disqus
identifier](http://help.disqus.com/customer/portal/articles/472098-javascript-configuration-variables#disqus_identifier).

This puts you at a disadvantage. If you are forced to change URL of an article
you will lose Disqus discussion for that article because Disqus identifier for
the article will change too.

Elegant offers you `comment_id` property that you can set in your
article metadata. Set it to any unique string you want. It won't be effected by
the article URL.

If you choose not to use `comment_id`, Elegant passes article URL to
Disqus.

## Legacy Variable

In previous versions, we had `disqus_identifier`. Though Elegant is backward compatible but we recommend you to change it to `comment_id`.
