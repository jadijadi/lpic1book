---
authors: Pablo Iranzo Gómez, Talha Mansoor
title: BestAzon Support
tags: amazon, affiliates, income
date: 2019-07-14 07:30:47 +0100
category: Monetizing Your Blog
description:
slug: amazon-bestazon
comment_id: amazon-bestazon
---

Elegant supports [BestAzon](https://bestazon.io/), so that you may monetize your traffic using affiliate links from Amazon.

Similar to [Amazon One Link]({filename}amazon-one-link.md), BestAzon provides technology that redirects Amazon links to each country shop by using your associate tags

Elegant loads the script for BestAzon and inserts your configuration if `AMAZON_BESTAZON` is defined.

Follow <https://bestazon.io> to generate the configuration based on your tag id's first.

Then in your Pelican configuration, preferably in the file `publishconf.py`, set `AMAZON_BESTAZON` to your BestAzon configuration, for example:

```py
AMAZON_BESTAZON = """var BestAzon_Configuration = {
"Amzn_AfiliateID_US": "redken01-20",
"Amzn_AfiliateID_CA": "redken03-20",
"Amzn_AfiliateID_GB": "redken01-21",
"Amzn_AfiliateID_DE": "redken06-21",
"Amzn_AfiliateID_FR": "redken07-21",
"Amzn_AfiliateID_ES": "redken-21",
"Amzn_AfiliateID_IT": "redken0d-21",
"Amzn_AfiliateID_JP": "",
"Amzn_AfiliateID_IN": "",
"Amzn_AfiliateID_CN": "",
"Amzn_AfiliateID_MX": "",
"Amzn_AfiliateID_BR": "",
"Conf_Custom_Class": " BestAzon_Amazon_Link ",
"Conf_New_Window": "1",
"Conf_Link_Follow": "1",
"Conf_Product_Link": "1",
"Conf_Tracking": "1",
"Conf_Footer": "1",
"Conf_Link_Keywords": "",
"Conf_Hide_Redirect_Link": "1",
"Conf_Source": "BestAzonScript"
};
"""
```

If this variable is defined, Elegant will load the BestAzon script that enables the link substitution.

Now, when international visitors of your site click on a link on your site to buy from Amazon, they are redirected to their local or nearest Amazon market place.

This is an optional feature. If you do not set the variable then BestAzon script is not added to the rendered output.

You, as a content creator, should be aware of GDPR or other regulations.
[Section 5 of the Operating
Agreement](https://affiliate-program.amazon.com/help/operating/agreement) for
Amazon Associates states that you need to disclose your affiliation with Amazon and that you earn from qualifying purchases.

To conform to this rule in the agreement, Elegant automatically adds the disclaimer in the footer of the website if `AMAZON_BESTAZON` variable is set. It looks like this,

![Amazon OneLink Disclosure]({static}/images/amazon-online-disclaimer.png)
