---
Title: Footer -- Show Your Host Information
authors: Talha Mansoor
Tags: nuances
date: 2019-06-30 11:54
comments: false
Slug: show-host-information
Summary: Show the host of your website
Category: Components
---

You can optionally display the host of your website in the footer.

To do so, define a dictionary `HOSTED_ON` in your Pelican configuration. It has two keys,

1. `name`: mandatory. Value type is string
1. `url`: optional. Value type is string

For example,

```python
HOSTED_ON = {
    "name": "Netlify",
    "url": "https://www.netlify.com/"
    }
```

It will appear in the footer as

![Demonstration of HOSTED_ON variable]({static}/images/hosted-on.png)

If `url` is present then Elegant will add link to your host in the footer with `nofollow` attribute. Otherwise Elegant will display the name without any link.
