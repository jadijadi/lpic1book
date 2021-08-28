---
authors: Talha Mansoor
Title: Change Labels
Tags: unique
Date: 2019-07-03 20:20
Slug: change-labels
Category: Advanced Features
---

It is quite possible you will feel the need to tweak labels of different
sections or widgets. For example, change label of [social
widget](/how-to-display-your-social-media-profiles) from "Contact" to "Stay in
Touch".

Don't worry! We got you covered!

Elegant has all the customizable variables in one place. [`_defaults.html`
file](https://github.com/Pelican-Elegant/elegant/blob/master/templates/_includes/_defaults.html).

    :::bash
    templates/_includes/_defaults.html

Let's see how can we change social widget label.

    #!jinja
    {# Label for the list of social profiles #}
    {% if not SOCIAL_PROFILE_LABEL %}
    {% set SOCIAL_PROFILE_LABEL = 'Contact' %}
    {% else %}
    {% set SOCIAL_PROFILE_LABEL = SOCIAL_PROFILE_LABEL %}
    {% endif %}

Line 1, text enclosed in `{# #}` is a comment, which says this section is about
"Label for the list of social profiles".

The text in all capital case `SOCIAL_PROFILE_LABEL` is the actual variable.

Line 3 says `SOCIAL_PROFILE_LABEL` is set to `Contact`.

To change this value, assign it a different value in your Pelican
configuration, `pelicanconf.py`.

    :::python
    SOCIAL_PROFILE_LABEL = 'Stay in Touch'

That's it. The title of social widget will change. There are several others
labels that you can customize easily without touching Elegant's source code.
