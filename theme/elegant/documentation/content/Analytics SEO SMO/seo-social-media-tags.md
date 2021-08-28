---
Title: Search Engine and Social Media Optimization
Tags: crawler, social-media, web-analytics
Category: Analytics, SEO and SMO
Date: 2014-04-20 16:31
Slug: search-engine-and-social-media-optimization
Comment_id: 7mh4xjn-search-engine-and-social-media-optimization
Summary:
Keywords:
authors: Talha Mansoor
---

[TOC]

Search Engine Optimization(SEO) is a moving target which is often
misunderstood. Rise of social media has changed the traditional SEO
techniques. Changes in search algorithms has made several SEO techniques
obsolete.

Elegant does its best to leverage all available search and social media tags to
give your site higher ranking in search results and optimize it for sharing via
social media.

## Social Media Optimization (SMO)

Inspired by the post ["What is the New SEO? Pubcon 2013 <!-- yaspeller ignore -->
Takeaways"](https://medium.com/on-startups/f15264e5d790), I looked into the
tags that social media sites use. They can be broadly divided into two
categories, [Open Graph protocol](http://ogp.me/) and [Twitter
Cards](https://dev.twitter.com/docs/cards).

### Open Graph protocol

Elegant uses following tags,

1. `og:url` is set to article URL
1. `og:type` is set to "article"
1. `og:title` is set to article tile and optional subtitle
1. `og:site_name` is set to `SITENAME` from your Pelican configuration
1. `og:description` is set to article summary
1. `og:article:author` is set to article author
1. `og:article:published_time` is set to article date
1. `og:image` is an optional tag. It is set to value of `featured_image`

`featured_image` should be the complete URL of an image. This image is
displayed with the article link on most social sites.

Elegant looks for it first in the article metadata, here is metadata for an
example reST formatted file.

    :::reST
    :featured_image: http://oncrashreboot.com/images/article-1-image.jpg

Then it looks for `FEATURED_IMAGE` in Pelican configuration. If it finds
neither, `og:image` is not used.

If you want to use `og:image` tag then make sure you define `featured_image` in
your article metadata. You should also define `FEATURED_IMAGE` in your
Pelican configuration to be used as a generic image in case an article does not
have `featured_image` defined.

### Twitter Cards

Elegant uses following tags,

1. `twitter:card` is set to "summary"
1. `twitter:title` is set to article title and optional subtitle
1. `twitter:creator` is set to `TWITTER_USERNAME` if defined in Pelican
   configuration
1. `twitter:description` is set to article summary
1. `twitter:image` is set to `featured_image`. The `featured_image` discussion
   above is also applicable in this case

Please note you need to be
[approved](https://dev.twitter.com/docs/cards/validation/validator) by Twitter
before you can start using Twitter Cards.

## Search Engine Optimization (SEO)

Elegant puts tags and category of your article in keywords tag `<meta name="keywords"`.

You can add your own keywords by defining `keywords` in article metadata.

`SITE_DESCRIPTION` and article `summary` is used in description tag `<meta name="description"`.

Your `AUTHOR` name is used in copyright tag `<meta name="copyright"`.
