Title: How to use Heap Analytics
Tags: web-analytics
Category: Analytics, SEO and SMO
Date: 2019-03-31 16:45
Slug: how-to-use-heap-analytics
Comment_id: c8619dd-how-to-use-heap-analytics
Subtitle:
Summary: Elegant Pelican theme supports Heap Analytics out of
the box. This articles describes how to set it up.
Keywords:

Elegant supports the popular web tracking service,
[Heap Analytics](https://heap.io/).

From your [Heap console](https://heapanalytics.com/app/account), navigate to
_Settings_ → _Projects_. You need to copy the Project ID you want to log to.
Set `HEAP_ANALYTICS` in your configuration with this value.

    :::python
    HEAP_ANALYTICS = 1234567890

That's it. Elegant will take care of the rest.
