---
Title: Newsletter -- Add Mailchimp
Tags: marketing, network, subscriber
Date: 2013-08-27 23:20
comments: false
Slug: add-mailchimp
Category: Connecting With Your Readers
authors: Talha Mansoor
mailchimp_filter: off
freelists_filter: on
---

<svg xmlns="http://www.w3.org/2000/svg"
aria-label="Mailchimp" role="img"
viewBox="0 0 512 512" width="150" height="150" style="float:left;margin-right:10px"><rect
width="512" height="512"
rx="15%" fill="#ffe01b"/><path fill="#1e1e1e" d="M418 306l-6-17s25-38-37-51c0 0 4-47-18-69 48-47 37-118-72-72C229-10 13 241 103 281c-9 12-9 72 53 78 42 90 144 96 203 69s93-113 59-122zm-263 40c-51-5-56-75-12-82s55 86 12 82zm-15-95c-14 0-31 19-31 19-68-33 123-252 164-167 0 0-100 48-133 148zm200 85c0-4-21 6-59-7 3-21 48 18 123-33l6 21c28-5 0 90-90 89-73-1-96-76-56-117 8-8-29-24-22-59 3-15 16-37 49-31s40-24 62-13 9 53 12 59 35 7 41 24-41 54-114 44c-17-2-27 20-16 34 22 32 112 11 127-20-38 29-116 40-122 9 22 10 59 4 59 0zm-58-6zm-73-152c22-27 51-43 51-43l-6 15s21-16 44-16l-8 8c26 1 37 11 37 11s-61-18-118 25zm135 39c13-1 9 29 9 29h-8s-14-28-1-29zm-59 33c-9 1-19 6-18 2 4-16 41-12 40 2s-9-6-22-4zm21 12c1 2-7 0-13 1s-12 4-12 2 23-11 25-3zm20 3c3-6 15 0 12 6s-15 0-12-6zm25 2c-6 0-6-13 0-13s6 14 0 14zm-180 53c3 3-6 9-13 4s8-29-10-35-13 17-18 14 7-35 28-22-6 33 6 39 5-2 7 0z"/></svg>

Elegant shows a form to subscribe to your newsletter, above the fold, in the right section of every article. Increased visibility is said to increase number of subscribers.

You need to put your Mailchimp form action URL in `MAILCHIMP_FORM_ACTION` in your configuration file.

To customize user experience you can also define,

1. `EMAIL_SUBSCRIPTION_LABEL`,
1. `EMAIL_FIELD_PLACEHOLDER` and
1. `SUBSCRIBE_BUTTON_TITLE`

You can see Mailchimp Form in action in the sidebar. It's a working example. Enter your email address so that we can send you news of new Elegant releases in your inbox.

![Mailchimp subscriber
form]({static}/images/elegant-theme_subscribe-form.png)

## Show Mailchimp Form by default

Just set `MAILCHIMP_FORM_ACTION` variable.

## Hide Mailchimp Form by default

Unset `MAILCHIMP_FORM_ACTION` variable.

This is the default setting.

## Hide Mailchimp Form by default. Show on Selected

1. Set `MAILCHIMP_FORM_ACTION`
1. Set `MAILCHIMP_FILTER` to `True`

This will hide Mailchimp form on all pages.

Now to show Mailchimp form on selected posts, in article metadata set

```yaml
mailchimp_filter: off
```

## Show Mailchimp Form by default. Hide on Selected

1. Set `MAILCHIMP_FORM_ACTION`
1. Remove `MAILCHIMP_FILTER` or set it to `False` which is its default value

This will hide Mailchimp form on all pages.

Now to hide Mailchimp form on selected posts, in article metadata set

```yaml
mailchimp_filter: on
```
