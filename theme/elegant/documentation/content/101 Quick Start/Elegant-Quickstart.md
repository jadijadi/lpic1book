---
author: Pablo Iranzo Gómez
title: Quickly get a GitHub hosted blog with Pelican, Elegant with little setup steps.
tags: pelican, foss, travis, ci/cd, elegant, blog, python, github, blog-o-matic
date: 2019-01-11 17:30:47 +0100
comments: true
category: 101 — Quick Start
description:
---

[TOC]

# Introduction

We're using automation for some of the aspects of Elegant development, but one of the issues for users trying to setup a new site with Pelican is to download plugins, theme, doing configuration, etc.

Based on this feedback, a new 'blog-o-matic' approach has been tested:

# The approach

[Blog-o-Matic](https://github.com/iranzo/blog-o-matic/), uses several discussed topics so far:

- [Github](https://github.com) and GH Pages for hosting the source and the website
- [Travis-CI.org](https://travis-ci.org) for automating the update and generation process
- ['Pelican'](https://blog.getpelican.com/) for static rendering of your blog from the markdown or AsciiDoc articles
- ['Elegant'](https://github.com/Pelican-Elegant/elegant) for the 'Theme'
- [peru](https://github.com/buildinspace/peru) for automating repository upgrades for plugins, etc

The setup process is outlined at its [README.md](https://github.com/iranzo/blog-o-matic/) and just requires a few steps to setup that, from that point, will allow you to get your website published each time you commit a new document to the content folder.

You can also check the 'generated' website after installation via <https://iranzo.github.io/blog-o-matic>

# How does it work under the hood?

The repository, contains already the required setups and configurations for setting up a blog using github pages.

It requires some manual steps like configuring authentication token in order for automation to 'push' to github the 'rendered webpage', plus enabling 'Travis CI' automation for doing that step.

Check the updated [README on Blog-o-Matic](https://github.com/iranzo/blog-o-matic) if you're interested in the setup, but thing is:

## Setup

- Repository contains already predefined Travis CI configuration
- A GH token is needed for Travis CI to push to the 'master' branch that is used by github pages
- The token needs to be configured as environment variable in 'travis-ci.org' which needs to be enabled for your repository
- Once this is done, all the automation is ready.

## Automation workflow

The automation, on a new 'commit' (new config, new article, whatever), that can be even done via github.com Web User Interface, will launch a set of tasks:

### Preparation

- Setup python environment (Pelican uses python)
- Install tool 'peru' to sync from other repositories (for later syncing plugins, latest theme, etc)
- Launch the synchronization of themes, plugins etc (as defined in `peru.yaml`)

### Validation

- Validate that web page builds (`make html`)
- Validate that it builds with publish configuration (`make publish`)

### Deployment

- Copy extra files to generated website
- Update the checked out git config to use https so that we can use the token defined in environment variable `GHTOKEN`
- Regenerate website and push to github

# Blog is ready!

At this point, Travis CI will have built the blog with the sample content `content/welcome.md`.

Keep adding new files to your new repository in the `content/` folder and check the configuration settings in `pelicanconf.py` to customize your name, twitter, SEO, etc

Bear in mind, that at this point you're using a regular Elegant setup with Pelican and some Pelican Plugins, so refer to `peru.yaml` for the URLs containing the files and extra information that might be helpful for you to learn on the features and customization possibilities.

Enjoy your Elegant blog!
