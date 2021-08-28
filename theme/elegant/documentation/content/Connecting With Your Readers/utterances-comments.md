---
Title: Comments -- Enable Utterances
Tags: interaction
Category: Connecting With Your Readers
Date: 2019-08-18 00:13
Slug: enable-utterances-comments
Summary: Elegant offers Utterances comments out of the box with few unique features
authors: Talha Mansoor
comment_id: 5b15620044
utterances_filter: off
---

<div style="width:150px;height:150px;font-size:100px;float:left;text-align:center;vertical-align: middle;line-height:150px;">🔮</div>

You can use [Utterances](https://utteranc.es/) for comments. You have to set `UTTERANCES_REPO` to the repository Utterances will connect to.

That's it. Elegant will take care of the rest.

You can see a working example of Utterances comments in this article.

## Extra Customization

Besides setting `UTTERANCES_REPO`, you also have control over following variables.

1. `UTTERANCES_THEME`. It's default value is `github-light`. For other valid values refer to [utterances documentation](https://utteranc.es/)
1. `UTTERANCES_LABEL`. It's empty by default. If set, Utterances will it to the issues it will create.

!!!warning

    Label names are case sensitive. The label must exist in your repo. Utterances cannot attach labels that do not exist.

    Emoji are supported in label names.✨💬✨

## Show Utterances comments by default

Just set `UTTERANCES_REPO` variable.

## Hide Utterances comments by default

Unset `UTTERANCES_REPO` variable.

This is the default setting.

## Hide Utterances comments by default. Show on Selected

1. Set `UTTERANCES_REPO`
1. Set `UTTERANCES_FILTER` to `True`

This will hide Utterances form on all pages.

Now to show Utterances form on selected posts, in article metadata set

```yaml
utterances_filter: off
```

## Show Utterances comments by default. Hide on Selected

1. Set `UTTERANCES_REPO`
1. Remove `UTTERANCES_FILTER` or set it to `False` which is its default value

This will hide Utterances form on all pages.

Now to hide Utterances form on selected posts, in article metadata set

```yaml
utterances_filter: on
```
