---
Title: Gallery -- Embed Instagram Post
authors: Talha Mansoor, Pablo Iranzo Gómez
Tags: nuances, images, gallery, instagram
Date: 2020-02-07 13:17
Slug: gallery-embed-instagram-post
Category: Components
---

Pelican-Elegant has built in support for Instagram post.

## Article contents

To embed Instagram post, just define a div in this manner,

```html
<div class="elegant-instagram" data-instagram-id="BwWo35fAcR3"></div>
```

`<div>` class should be `elegant-instagram`.

Value of `data-instagram-id` attribute is taken from Instagram post URL, for example:

If URL is <https://www.instagram.com/p/OzF8OwS43q/> then set `data-instagram-id` to `OzF8OwS43q`.

Instagram URL can be a single or multiple pictures post.

Here is how Elegant will render your Instagram posts.

## A Post With Multiple Images

<div class="elegant-instagram" data-instagram-id="BwWo35fAcR3"></div>

It's code is

```html
<div class="elegant-instagram" data-instagram-id="BwWo35fAcR3"></div>
```

## Single Image Post

<div class="elegant-instagram" data-instagram-id="B7yh4IdItNd"></div>

It's code is

```html
<div class="elegant-instagram" data-instagram-id="B7yh4IdItNd"></div>
```
