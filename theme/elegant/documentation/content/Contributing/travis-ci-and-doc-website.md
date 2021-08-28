---
author: Pablo Iranzo Gómez
title: Travis-CI Automation for documentation website
tags: pelican, foss, travis, ci/cd, elegant, python
date: 2018-12-07 16:00:47 +0100
comments: true
category: Contributing
slug: travis-ci-and-doc-website
comment_id: travis-ci-and-doc-website
---

[TOC]

!!! warning "Outdated"

    Elegant no longer uses the procedure described in this article

# Background

[Elegant](https://github.com/Pelican-Elegant/elegant) theme for pelican has been undergoing a big change from individual-driven effort to community, as part of this, one of the tasks to accomplish, has been the decoupling from author blog to project site for documentation.

As we wanted this process to be both automated and allowed us to demonstrate via
dogfooding <!-- yaspeller ignore -->
that the theme works and how it looks, the idea was to automate the rendering of pelican website with new documents.

# Under the hood

Setting an automated build required several steps to be done:

- Get a GitHub token that could be used by Travis for pushing to a repository (and configure it in Travis environment variables for the repository in a variable named `GITHUB_TOKEN`)
- run unit tests for validating new PR before merging
- configure Travis so that it downloads required dependencies in order to run pelican and then publish the generated web to the repository
- a GitHub pages enabled repository so that resulting files can be viewed as a webpage.

One of the key pieces is a properly configured `.travis.yaml` like the one we started using:

```yaml
language: python
dist: trusty
sudo: required

python:
  - "3.5"

before_install:
  - pip install -U pip
  - pip install -U setuptools
  - pip install -r requirements.txt
  - pip install -r test-requirements.txt
  - pip install peru
  - peru sync
  - pip install tox

script:
  - tox
  - make html

after_success:
  - rm -rf .git/
  - git init
  - git config user.name "Travis CI"
  - git config user.email "travis@domain.com"
  - git config --global push.default simple
  - git remote add origin https://${GITHUB_TOKEN}@github.com/Pelican-Elegant/pelican-elegant.github.io.git
  - make github
```

## Image setup

So, from above file we do:

```yaml
language: python
dist: trusty
sudo: required

python:
  - "3.5"
```

- Configure language as python
- Select distribution
- Confirm we require 'sudo' access
- Configure python version as 3.5

All of this depends on Travis Image being used and their documentation

## Preparation of environment

Now, we'll prepare the environment for our tests:

```yaml
before_install:
  - pip install -U pip
  - pip install -U setuptools
  - pip install -r requirements.txt
  - pip install -r test-requirements.txt
  - pip install peru
  - peru sync
  - pip install tox
```

We do install pip, setuptools, repository and test requirements, peru and tox.

Peru is used to grab additional dependencies for elegant (plugins, latest theme, etc)

## Actual tests

This is really easy in our case:

```yaml
script:
  - tox
  - make html
```

We run 'tox' that allows to automate Python virtualenv and tests and then, use the Makefile from Pelican to build the site and tests plugins, etc

If everything succeeds, we're ready for the next step (publishing)

## After tests passed

All the environment setup and tests have succeed now, we do need to push the site 'live'

```yaml
after_success:
  - rm -rf .git/
  - git init
  - git config user.name "Travis CI"
  - git config user.email "travis@domain.com"
  - git config --global push.default simple
  - git remote add origin https://${GITHUB_TOKEN}@github.com/Pelican-Elegant/pelican-elegant.github.io.git
  - make github
```

This piece does the final step, first removes info about the repository containing the actual documentation and allows us to initialize a new one, that we make it point towards the repository we're pushing (so that we keep separate actual website content from 'rendered' website).

In the final step, 'make github' uses the Makefile provided with pelican to push the changes to the 'master' branch of the target repository, that then, is ready to be served via github pages as a regular web server would do.

# Wrap up

So, right now we've accomplished several things:

- We do use pelican in the same way that we'll do for our own website
  - We do also have as a consequence, a ['live' demo](https://elegant.oncrashreboot.com) of latest master branch showcasing features
- We did automate publishing of webpage as soon as contributors send new articles and are approved for merge
- All requires no extra change to regular workflow as <Travis-CI.org> is the glue here putting together all the pieces.

Let us know via an [issue](https://github.com/Pelican-Elegant/elegant/issues/new) if any problem is spotted on the generated documentation website.
