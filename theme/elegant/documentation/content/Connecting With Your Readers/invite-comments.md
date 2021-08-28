---
Title: Comments -- Invite Visitors To Comment
Tags: interaction
Date: 2014-04-21 16:39
comments: false
Slug: invite-visitors-comment
Category: Connecting With Your Readers
authors: Talha Mansoor
---

Instead of just throwing in comments form at the end of every article, Elegant
offers you a way to write introductory text that would appear right before comments.

![Introductory text to the comments]({static}/images/elegant-theme_comments-introduction.png)

Set your message to `comments_intro` in the article metadata. You may also
define `COMMENTS_INTRO` in Pelican configuration.

Write whatever you think is appropriate to invite the visitor to comment. Be
creative! You can even put a link to your twitter account or newsletter there.

Elegant first looks for `comments_intro` in article metadata, then for
`COMMENTS_INTRO` in configuration. If it finds neither then no message is
displayed.
