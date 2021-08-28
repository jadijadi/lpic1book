---
Title: Code Snippets -- Include code from file
Tags: code-snippets, plugins, liquid-tags
Date: 2020-02-02 20:53
comments: false
Slug: code-snippets-include-code-from-file
authors: Talha Mansoor
Category: Supported Plugins
---

Elegant supports [`liquid_tags.include_code` plugin](https://github.com/getpelican/pelican-plugins/tree/master/liquid_tags#include-code).

## Example 1

<!-- yaspeller ignore:start -->

{% include_code square-root.py lang:python Calculate square root of 8 %}

<!-- yaspeller ignore:end -->

## Example 2 -- Without Filename

<!-- yaspeller ignore:start -->

{% include_code alias-sed.fish :hidefilename: Fish Shell alias for sed %}

<!-- yaspeller ignore:end -->

## Example 3 -- Without Download Link

<!-- yaspeller ignore:start -->

{% include_code alias-sed.fish :hidelink: Fish Shell alias for sed %}

<!-- yaspeller ignore:end -->

## Example 4 -- Without Filename and Download Link

<!-- yaspeller ignore:start -->

{% include_code alias-sed.fish :hidefilename: :hidelink: Fish Shell alias for sed %}

<!-- yaspeller ignore:end -->

## Example 5 -- Without Metadata

<!-- yaspeller ignore:start -->

{% include_code square-root.js lang:js :hideall: Compute square-root %}

<!-- yaspeller ignore:end -->
