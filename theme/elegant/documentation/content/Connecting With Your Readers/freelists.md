---
Title: Newsletter -- Add FreeLists
Tags: marketing, network, subscriber
Date: 2018-07-05 23:20
comments: false
Slug: add-freelists
Category: Connecting With Your Readers
authors: Talha Mansoor
freelists_filter: off
mailchimp_filter: on
---

Elegant shows a form to subscribe to your newsletter, above the fold, in the right section of every article.

You need to put your FreeLists name in `FREELISTS_NAME` in your configuration file.

To customize user experience you can also define,

1. `EMAIL_SUBSCRIPTION_LABEL`,
1. `EMAIL_FIELD_PLACEHOLDER` and
1. `SUBSCRIBE_BUTTON_TITLE`

The "Notify me" button you see in the sidebar of this page is an example of FreeLists subscription form. It links to Oracle database discussion list to demonstrate the function.

## Show FreeLists Form by default

Just set `FREELISTS_NAME` variable.

## Hide FreeLists Form by default

Unset `FREELISTS_NAME` variable.

This is the default setting.

## Hide FreeLists Form by default. Show on Selected

1. Set `FREELISTS_NAME`
1. Set `FREELISTS_FILTER` to `True`

This will hide FreeLists form on all pages.

Now to show FreeLists form on selected posts, in article metadata set

```yaml
freelists_filter: off
```

## Show FreeLists Form by default. Hide on Selected

1. Set `FREELISTS_NAME`
1. Remove `FREELISTS_FILTER` or set it to `False` which is its default value

This will hide FreeLists form on all pages.

Now to hide FreeLists form on selected posts, in article metadata set

```yaml
freelists_filter: on
```
