---
author: Andy Wegner
title: Warnings and admonition boxes
tags: admonitions, warning, attention
date: 2018-12-18 09:00
comments: false
Category: Components
description: Highlight important notes and warnings with admonition boxes.
slug: warnings-admonition
---

[TOC]

Sometimes you want to draw your reader's attention to an important piece of
information. You can do this using admonitions. Below are a few examples of how
to do this, and the various styles that are available in Elegant.

# Set up

To use admonitions within our Markdown, we need to enable support for them first.
In `pelicanconfig.py` find your `MARKDOWN` dictionary. Add the following line to
the dictionary (and ensure the previous line ends with a comma so that the dictionary
is valid).

    'markdown.extensions.admonition': {},

That's it! Now your site will support Markdown admonitions.

# Types of admonitions

There are several styles available and Elegant supports the recommended values of:

- `attention`
- `caution`
- `danger`
- `error`
- `hint`
- `important`
- `note`
- `tip`
- `warning`

# Examples

Let's see some examples!

## Default Danger, Error

You can use either `danger` or `error` to get a red admonition box.

    !!! danger

        This is a danger or error admonition

!!! danger

    This is a danger or error admonition

## Default Attention, Caution, Warning

An `attention`, `caution` or `warning` admonition will be yellow.

    !!! warning

        This is an attention, caution or warning admonition

!!! warning

    This is an attention, caution or warning admonition

## Default Important, Note

Use `important` or `note` to get a green admonition box.

    !!! important

        This is an important or note admonition

!!! important

    This is an important or note admonition

## Default Hint, Tip

Use either `hint` or `tip` to get a blue admonition box.

    !!! hint

        This is a hint or tip admonition

!!! hint

    This is a hint or tip admonition

## Custom Titles

Admonitions can have custom titles. When the default examples are used, the titles
of each box are the same as the admonition type. This isn't always what you want.
If you want to use a custom title, you pass the title in double quotes after the
type of admonition you are utilizing.

    !!! hint "Use double quotes to change the title"

        This admonition box contains a custom tile because I placed it in double quotes after the `hint`.

!!! hint "Use double quotes to change the title"

    This admonition box contains a custom tile because I placed it in double quotes after the `hint`.

## No title

There are times when you don't need a title in your boxes. This can be done by
passing an empty string (`""`) after the admonition type.

    !!! important ""

        This box doesn't require a title, but is still an `important` admonition
        and will be highlighted as such.

!!! important ""

    This box doesn't require a title, but is still an `important` admonition and will be highlighted as such.
