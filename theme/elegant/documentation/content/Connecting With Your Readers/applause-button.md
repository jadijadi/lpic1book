Title: Applause Button
Tags: interaction, kudos, reaction
Category: Connecting With Your Readers
Date: 2019-12-05 08:36
Slug: applause-button
authors: Talha Mansoor
Subtitle:
Summary:
Keywords:
applause_button: on

Elegant supports [Applause Button](https://applause-button.com/){:class="ampl"}.

## How To Enable Applause Button

You can enable and disable the button site wide or on specific articles.

### Show Applause Button in all articles

Set `APPLAUSE_BUTTON` variable to `True` in your Pelican configuration.

### Hide Applause Button in all articles

Set `APPLAUSE_BUTTON` variable to `False` in your Pelican configuration. This is the default.

### Show Applause Button in all articles. Hide on selected

Set `APPLAUSE_BUTTON` variable to `True` in your Pelican configuration. And on specific articles set

```yaml
applause_button: off
```

### Hide Applause Button in all articles. Show on selected

Set `APPLAUSE_BUTTON` variable to `False` in your Pelican configuration. And on specific articles set

```yaml
applause_button: on
```

## Extra Configuration

By default Elegant passes the article URL as identifier to the Applause Button server. But you can also set `applause_button_id` in your article metadata which is given preference over the article URL.
