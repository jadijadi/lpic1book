---
authors: Pablo Iranzo Gómez, Talha Mansoor
title: Amazon OneLink Support
tags: amazon, affiliates, income
date: 2019-01-02 22:47:47 +0100
comments: true
category: Monetizing Your Blog
description:
slug: amazon-onelink
comment_id: amazon-onelink
---

Elegant supports [Amazon OneLink](https://affiliate-program.amazon.com/onelink/), so that you may monetize your traffic using affiliate links.

Visit Amazon website and create your OneLink account. Amazon will provide you a code snippet similar to following,

```html
<div id="amzn-assoc-ad-$UUID"></div>
<script
  async
  src="//z-na.amazon-adsystem.com/widgets/onejs?MarketPlace=US&adInstanceId=$UUID"
></script>
```

Pay close attention to the `amzn-assoc-ad-` part. The value following it is your Amazon OneLink id.

In your pelican configuration, preferably in the file `publishconf.py`, set `AMAZON_ONELINK` to your Amazon OneLink id, for example,

```py
AMAZON_ONELINK = "b63a2115-85f7-43a9-b169-5f4c8c275655"
```

When the site is generated, `$UUID` in the snippet above is substituted with your id. Thus, ensuring that correct referral code is passed to the script.

Now, when international visitors of your site click on a link on your site to buy from Amazon, they are redirected to their local or nearest Amazon market place.
For example, original link (Python book):

This is an optional feature. If you do not set the variable then Amazon OneLink script is not added to the rendered output.

You, as a content creator, should be aware of GDPR or other regulations.
[Section 5 of the Operating
Agreement](https://affiliate-program.amazon.com/help/operating/agreement) for
Amazon Associates states that you need to disclose your affiliation with Amazon and that you earn from qualifying purchases.

To conform to this rule in the agreement, Elegant automatically adds the disclaimer in the footer of the website if `AMAZON_ONELINK` variable is set. It looks like this,

![Amazon OneLink Disclosure]({static}/images/amazon-online-disclaimer.png)
