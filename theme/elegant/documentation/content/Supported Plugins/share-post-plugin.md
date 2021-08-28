---
Title: Add Social Sharing Links
Tags: pelican-theme, pelican-plugin, social-media
Category: Supported Plugins
Date: 2014-03-24 20:14
Slug: how-to-use-social-sharing-plugin
Comment_id: x4jitcv-how-to-use-social-sharing-plugin
Subtitle:
Summary: Elegant can be configured to provide Social Media sharing links for each of your articles. These links provide a simple way to share on various Social Media platforms while endeavoring to not track users in the process.
Keywords: social networks, share posts,
Authors: Talha Mansoor, Jack De Winter
---

No blog is complete without buttons or links that invites a reader to share your articles
with the friend and colleagues on various social media sites. The problem with these buttons
on many sites is that the buttons are used by big companies to track your web usage, sharing
that information with various companies. (For a more in-depth talk on this subject, please
read the [Online Trackers and Links](#Online-Trackers-and-Links) section at the end of this
page.)

Elegant provides a simple solution to this, using the `Share Post` plugin from pelican to
provide simple and plain old-school URLs to provide the social media links. These have the
benefit of not having any ability to be used for online tracking.

Here is an example of what the Social Media Sharing section may look like:

![Share Post plugin in Elegant]({static}/images/elegant-theme-share-post-plugin.png)

## Configuration

To enable the Social Media Sharing links for your articles, add `share_post` to the `PLUGINS`
configuration variable in your Pelican configuration.

```python
PLUGINS = ['share_post']
```

Optionally, customize the list of networks where the article can be shared using `SHARE_LINKS`.

```python
SHARE_LINKS = [ ('twitter', 'Twitter'), ('facebook', 'Facebook'), ('email', 'Email') ]
```

The first item in each pair refers to a network recognized by `share_post`. Currently the list of supported networks includes `twitter`, `facebook`, `email`, `hacker-news`, `linkedin` and `reddit`. The second item in each pair is the text displayed for the link on the page.

The sharing links are displayed in the order of `SHARE_LINKS`, therefore this variable can also be used to customize the link order.

!!! note

    The [share_post plugin](https://github.com/getpelican/pelican-plugins/blob/master/share_post/README.md) requires the Python `beautifulsoup4` package to be installed.

The default text used to lead into the Social Media Sharing links is "Share On:". This can
be overridden by defining the `SHARE_POST_INTRO` configuration variable with the text you
want to replace it.

```Python
SHARE_POST_INTRO = "Share me with your friends on"
```

## Article Metadata

Once the configuration for Sharing Media Links is enabled in the configuration file, using
this feature to provide links for your readers to share your articles on social media is
completed.

The only effect any [metadata]({filename}../Advanced Features/metadata.md) field will have
on Sharing Media links is to change the text to lead into the Social Media Sharing links.
As documented above, the `SHARE_POST_INTRO` can be used to provide an alternate lead in text
for the Social Media Sharing links. This text can be further overridden on an
article-by-article basis by specifying the `share_post_intro` metadata field value for an
article as follows:

```yaml
share_post_intro: Share this article on Elegant with
```

## Online Trackers and Links

There are a plethora of social sharing widgets available online. The unfortunate problem with
most of the widgets is that they are used to track users and their browsing habits.
[Technology watchdogs](http://techliberation.com/2011/05/20/privacy-solutions-how-to-block-facebooks-like-button-and-other-social-widgets/)
have been
[raising a hue and cry](http://online.wsj.com/news/articles/SB10001424052748704281504576329441432995616#printMode)
since as
[early as 2009](https://www.eff.org/deeplinks/2009/09/online-trackers-and-social-networks).

Developers have responded to these concerned by coming up with
[different ways](http://fixtracking.com/) to cope with this issue. The solutions range from
custom [browser plugins](https://disconnect.me/) to completely totally
[reinventing share widgets](http://panzi.github.io/SocialSharePrivacy/) for a given browser.
However, it is unreasonable to expect that each of your visitors uses a privacy plugin.
Depending on your setup, your computer's browser or mobile phone's browser may not let your
users install any kind of plugin.

Reinventing a social widget that respects the user's concerns will certainly requiring the more
educated readers about it. For other readers, the "new" or "changed" social widget will seem
alien to them, and will make them hesitant to use it. In turn, that will almost definitely
result in a decrease in the number of shares of your articles on social networks.

Pelican (and therefore Elegant) uses a simple approach to work around this issue. By using
plain URLs to provide it's ability to share with social media sites, the entire widget issue
is avoided.
