#!/usr/bin/env python
# -*- coding: utf-8 -*-
from __future__ import unicode_literals
import os

AUTHOR = "Elegant Team"
SITENAME = "Elegant"
SITESUBTITLE = "The Best Pelican Theme"
SITEURL = ""

PATH = "content"

# Regional Settings
TIMEZONE = "Asia/Karachi"
DATE_FORMATS = {"en": "%b %d, %Y"}

# Plugins and extensions
MARKDOWN = {
    "extension_configs": {
        "markdown.extensions.admonition": {},
        "markdown.extensions.codehilite": {"css_class": "highlight"},
        "markdown.extensions.extra": {},
        "markdown.extensions.meta": {},
        "markdown.extensions.toc": {"permalink": " "},
    }
}

PLUGIN_PATHS = ["plugins"]
PLUGINS = [
    "extract_toc",
    "liquid_tags.img",
    "liquid_tags.include_code",
    "neighbors",
    "related_posts",
    "render_math",
    "series",
    "share_post",
    "tipue_search",
]
SITEMAP = {
    "format": "xml",
    "priorities": {"articles": 0.5, "indexes": 0.5, "pages": 0.5},
    "changefreqs": {"articles": "monthly", "indexes": "daily", "pages": "monthly"},
}

# Appearance
THEME = "../"
TYPOGRIFY = True
DEFAULT_PAGINATION = False

# Defaults
DEFAULT_CATEGORY = "Miscellaneous"
USE_FOLDER_AS_CATEGORY = False
ARTICLE_URL = "{slug}"
PAGE_URL = "{slug}"
PAGE_SAVE_AS = "{slug}.html"
TAGS_URL = "tags"
CATEGORIES_URL = "categories"
ARCHIVES_URL = "archives"
SEARCH_URL = "search"

# Feeds
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None
CATEGORY_FEED_ATOM = None
CATEGORY_FEED_RSS = None

# Social
SOCIAL = (
    ("Github", "https://github.com/Pelican-Elegant/", "Elegant Github Repository"),
    ("RSS", SITEURL + "/feeds/all.atom.xml"),
    (
        "Calendar",
        "https://github.com/Pelican-Elegant/elegant/milestones",
        "Elegant Project Roadmap",
    ),
)

# Elegant theme
STATIC_PATHS = ["theme/images", "images", "extra/_redirects", "code"]
EXTRA_PATH_METADATA = {"extra/_redirects": {"path": "_redirects"}}

if os.environ.get("CONTEXT") == "production":
    STATIC_PATHS.append("extra/robots.txt")
    EXTRA_PATH_METADATA["extra/robots.txt"] = {"path": "robots.txt"}
else:
    STATIC_PATHS.append("extra/robots_deny.txt")
    EXTRA_PATH_METADATA["extra/robots_deny.txt"] = {"path": "robots.txt"}

DIRECT_TEMPLATES = ["index", "tags", "categories", "archives", "search", "404"]
TAG_SAVE_AS = ""
AUTHOR_SAVE_AS = ""
CATEGORY_SAVE_AS = ""
USE_SHORTCUT_ICONS = True

# Elegant Labels
SOCIAL_PROFILE_LABEL = "Stay in Touch"
RELATED_POSTS_LABEL = "Keep Reading"
SHARE_POST_INTRO = "Like this post? Share on:"
COMMENTS_INTRO = "So what do you think? Did I miss something? Is any part unclear? Leave your comments below."

# Email Subscriptions
EMAIL_SUBSCRIPTION_LABEL = "Get New Release Alert"
EMAIL_FIELD_PLACEHOLDER = "Enter your email..."
SUBSCRIBE_BUTTON_TITLE = "Notify me"

FREELISTS_NAME = "oracle-l"
FREELISTS_FILTER = True

# SMO
TWITTER_USERNAME = ""
FEATURED_IMAGE = SITEURL + "/theme/images/apple-touch-icon-152x152.png"

# Legal
SITE_LICENSE = """Content licensed under <a rel="license nofollow noopener noreferrer"
    href="http://creativecommons.org/licenses/by/4.0/" target="_blank">
    Creative Commons Attribution 4.0 International License</a>."""
HOSTED_ON = {"name": "Netlify", "url": "https://www.netlify.com/"}

# SEO
SITE_DESCRIPTION = (
    "Documentation of Elegant, a theme for Pelican, originally created by Talha Mansoor"
)

# Share links at bottom of articles
# Supported: twitter, facebook, hacker-news, reddit, linkedin, email
SHARE_LINKS = [("twitter", "Twitter"), ("facebook", "Facebook"), ("email", "Email")]

# Landing Page
PROJECTS_TITLE = "Related Projects"
PROJECTS = [
    {
        "name": "Elegant",
        "url": "https://github.com/Pelican-Elegant/elegant",
        "description": "Source code of Elegant theme",
    },
    {
        "name": "Issue Tracker",
        "url": "https://github.com/Pelican-Elegant/elegant/issues",
        "description": "Give your feedback, ask questions or report issues",
    },
    {
        "name": "Roadmap",
        "url": "https://github.com/Pelican-Elegant/elegant/milestones",
        "description": "See planned features and estimated release dates",
    },
    {
        "name": "Press Kit",
        "url": "https://github.com/Pelican-Elegant/elegant/tree/master/elegant-logo",
        "description": "Writing an article on Elegant? Get Elegant logo from here",
    },
    {
        "name": "onCrashReboot",
        "url": "https://www.oncrashreboot.com/",
        "description": "Home page of Elegant creator and lead developer",
    },
    {
        "name": "Pelican",
        "url": "https://github.com/getpelican/pelican/",
        "description": "Static site generator that powers Elegant",
    },
    {
        "name": "Pelican Plugins",
        "url": "https://github.com/getpelican/pelican-plugins",
        "description": "Collection of plugins for the Pelican static site generator",
    },
]

LANDING_PAGE_TITLE = "Elegant – Why it is the Best Pelican Theme"

AUTHORS = {
    "Talha Mansoor": {
        "url": "https://www.oncrashreboot.com/",
        "blurb": "is the creator and lead developer of Elegant theme.",
        "avatar": "/images/avatars/talha131.png",
    },
    "Pablo Iranzo Gómez": {
        "url": "http://iranzo.github.io",
        "blurb": " opensource enthusiast and Lego fan doing some python simple programs like @redken_bot in telegram, etc",
        "avatar": "https://avatars.githubusercontent.com/u/312463",
    },
    "Jack De Winter": {
        "url": "http://jackdewinter.github.io",
        "blurb": "ever evolving, ever learning",
    },
    "Matija Šuklje": {
        "url": "https://matija.suklje.name",
        "blurb": "FOSS lawyer by trade, hacker by heart.",
    },
}
DISQUS_FILTER = True
UTTERANCES_FILTER = True
COMMENTBOX_FILTER = True
