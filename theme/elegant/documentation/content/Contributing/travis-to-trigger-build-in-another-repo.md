---
author: Pablo Iranzo Gómez
title: Triggering a travis-ci build on another repository
tags: pelican, FOSS, travis, ci/cd, elegant, blog, python
date: 2018-12-11 21:49:47 +0100
comments: true
category: Contributing
description:
slug: travis-to-trigger-build-in-another-repository
comment_id: travis-to-trigger-build-in-another-repository
---

[TOC]

!!! warning "Outdated"

    Elegant no longer uses the procedure described in this article

# Introduction

After setting up [build automation]({filename}./travis-ci-and-doc-website.md) we also wanted it not to happen only when updating the `documentation` repository.

Besides hosting documentation, Elegant website also serves as a live demo of the current release. This meant, the website should be regenerated and updated every time when a documented is added or edited, and also when Elegant theme is updated.

Github and Travis doesn't offer dependent builds out of the box, so the trick goes to 'signal' via a github token to trigger a Travis build.

# The technical solution

The approach goes via tweaking the 'test validation' `.travis.yaml` and adding some more steps:

The initial file (similar to the one in our previous article, but for running the 'page build' with latest repository checkout) looks like:

```yaml
# Copyright (C) 2017, 2018 Pablo Iranzo Gómez <Pablo.Iranzo@gmail.com>

language: python
dist: trusty
sudo: required

python:
  - "3.5"

# prepare and move data for execution

before_install:
  - pip install -U pip
  - pip install -U setuptools
  - pip install -r tests/requirements.txt
  - pip install -r tests/test-requirements.txt
  - pip install peru
  - mkdir -p tests/themes/elegant
  - mv templates tests/themes/elegant/
  - mv static tests/themes/elegant/
  - cd tests && peru sync

script:
  - pelican content/ -o output/
```

Is then modified to add:

```yaml
before_script:
  - npm install travis-ci

after_success:
  - node trigger-build.js
```

This installs Travis-CI utilities and runs a custom script 'trigger-build.js' with node, which in turn actually triggers Travis build.

The script, downloaded from
[Kamran Ayub blog](https://kamranicus.com/posts/2015-02-26-continuous-deployment-with-travis-ci) <!-- yaspeller ignore -->
has been edited to specify the 'repository' we will trigger and the name of the environment variable containing the token:

<!-- yaspeller ignore:start -->

```js
#!js
var Travis = require("travis-ci");

// change this
var repo = "Pelican-Elegant/documentation";

var travis = new Travis({
  version: "2.0.0",
});

travis.authenticate(
  {
    // available through Travis CI
    // see: http://kamranicus.com/blog/2015/02/26/continuous-deployment-with-travis-ci/
    github_token: process.env.TRATOKEN,
  },
  function (err, res) {
    if (err) {
      return console.error(err);
    }

    travis
      .repos(repo.split("/")[0], repo.split("/")[1])
      .builds.get(function (err, res) {
        if (err) {
          return console.error(err);
        }

        travis.requests.post(
          {
            build_id: res.builds[0].id,
          },
          function (err, res) {
            if (err) {
              return console.error(err);
            }
            console.log(res.flash[0].notice);
          }
        );
      });
  }
);
```

<!-- yaspeller ignore:end -->

As you can see, in line 14, it grabs the github token from environment variable 'TRATOKEN' that we've defined in Travis-CI environment for the build.

This is similar to [what we did]({filename}./travis-ci-and-doc-website.md) in the documentation repository to push the built website to another repository.

With this solution in place, when a new commit is merged on 'master' branch on the 'theme' repository [(`elegant`)](https://github.com/Pelican-Elegant/elegant), Travis CI does get invoked to schedule a build on the [`documentation`](https://github.com/Pelican-Elegant/documentation) repository, thus, rendering the live website with latest templates.
