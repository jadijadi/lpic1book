---
Title: Why Does Elegant Look The Way It Does?
Subtitle:
Slug: look-and-feel
Category: Contributing
Tags: design philosophy, distraction, cognitive overload, information overload
Date: 2019-07-03 20:07
Summary: Elegant has been purposefully crafted to follow a specific set of design principles.  This article discusses those design principles.
Keywords:
Authors: Jack De Winter
---

[TOC]

## Discussion

Elegant is theme that is largely inspired by the following articles/tweets:

- [Nicholas Carr's Experiments in delinkification](http://www.roughtype.com/?p=1378) <!-- yaspeller ignore -->
- [Neha Narula response to Carr Article](https://pdos.csail.mit.edu/~neha/hyperlinks/main-no.html) <!-- yaspeller ignore -->
- [Collection of responses to Carr Article](https://aroundthesphere.wordpress.com/2010/06/08/give-your-blog-posts-some-ritalin/) <!-- yaspeller ignore -->

In the first source, Nicholas makes a solid argument that embedded hyperlink tags,
<a href="http://www.roughtype.com/?p=1378">such as this one</a>, break the reader's
concentration while reading. He also mentions that studies have been performed which measured
reading comprehension of articles with and without visible hyperlinks.

From his article:

> Even if you don’t click on a link, your eyes notice it, and your frontal cortex has to fire up a bunch of neurons to decide whether to click or not. You may not notice the little extra cognitive load placed on your brain, but it’s there and it matters. People who read hypertext comprehend and learn less, studies show, than those who read the same material in printed form. The more links in a piece of writing, the bigger the hit on comprehension.

Inspired by the article, the Elegant theme was created as an extension of the suggestions in
the
Carr <!-- yaspeller ignore -->
article combined with some of the concerns of the responses. Allowing the user a
clean flow of reading through the body of the article is considered the highest priority for
Elegant theme decisions.

When present, the links are shown in a muted manner to minimize the
impact on the cognitive load of the reader. Carrying that design choice forward results in
two subsequent design choices: muted colors and sidebars for extra information.

Following the spirit of the article, Elegant reduces any distraction by blending all elements
with the background and elevating the article’s content against the background. Instead of a
distracting bright-blue hyperlink showing a link to an external source, a dotted underline and
a slightly darker font color is used. Instead of using bold colors for the text and
background of the admonitions and code blocks, lighter colors are used for both.

Elegant also reduces the distractions by relocating the extra information contained in an
article's [Table of Contents]({filename}../Components/table-of-contents.md)
to the left sidebar and displaying it in a smaller font. This allows the table to retain it's
usefulness to the reader while not intruding on the article. In a similar fashion, the right
sidebar is used to relate any other extra information about the article to the user. Elements
that regularly appear in the right sidebar include:

- Category
- Last Updated time
- "Monthly Updates" opt-in
- Published time
- [Reading Time]({filename}../Supported Plugins/reading-time.md)
- [Series section]({filename}../Supported Plugins/multi-part-plugin.md)
- ["Stay in Touch" icons]({filename}../Connecting With Your Readers/social-profiles-sidebar-svg.md) <!-- yaspeller ignore -->
- Tags
