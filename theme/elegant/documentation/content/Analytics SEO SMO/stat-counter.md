---
Title: How to use StatCounter
Tags: web-analytics
Category: Analytics, SEO and SMO
Date: 2013-11-11 23:05
Slug: how-to-use-statcounter-analytics
Comment_id: 4kv80xq-how-to-use-statcounter
Subtitle:
Summary: Elegant Pelican theme supports StatCounter out of the box. This articles describes how to set them up.
Keywords:
authors: Talha Mansoor
---

Elegant has support for popular web tracking service,
[StatCounter](http://statcounter.com/).

You need two codes from StatCounter - project ID and security code.

Create a project inside StatCounter. Click on _Config_, _Reinstall Code_ and then
_Default Guide_.

It will show you a [standard
code](http://statcounter.com/support/knowledge-base/14/)
that a website must have in order to use StatCounter.

    :::javascript
    <!-- Start of StatCounter Code for Default Guide -->
    <script>
    var sc_project=5555555;
    var sc_invisible=1;
    var sc_security="XXXXXXXX";
    ...
    <!-- End of StatCounter Code for Default Guide -->

Assign `sc_project` value to `STAT_COUNTER_PROJECT` and `sc_security` to `STAT_COUNTER_SECURITY`.

    :::python
    STAT_COUNTER_PROJECT = 5555555
    STAT_COUNTER_SECURITY = u'XXXXXXXX'

That's it. Elegant will take care of the rest.
