---
Title: Version 2.3.0
Tags: change-log, project-management
layout: post
date: 2019-06-29 18:31
comments: false
Slug: version-2-3-0-release-notes
Summary: Added Photos plugin support, besides other features
Category: Release Notes
---

We have been busy making changes in our infrastructure. Our end goal is to automate as much as possible. We are half way there.

With this release, every pull request is deployed by Netlify. We no longer have to merge the pull request locally and test it first, before approving it. Anyone can preview the pull request right from the Github.

We are also planning to automate our release process. We have made several changes in our contribution process to ensure that we are compatible with the automate release requirements. Our next release will be published by a bot.

## Project Management

- Documentation is hosted at https://elegant.oncrashreboot.com/
- Host and build documentation using Netlify
- `elegant.oncrashreboot.com` domain is the final home of documentation. It shall never change
- Delete github pages and related repositories

## Features

- New: FontAwesome updated to version 4.7.0 <!-- yaspeller ignore -->
- New: `Photos` plugin support for photo gallery creation
- New: Lightbox support for `Photos` plugin
- Fixed: Amazon One Link div is in the header
- Fixed: Separated claims for Google and Bing into individual includes

## Documentation

- New: Help article on claim Google and Bing

## CI

- New: Enable deploy previews for every pull request
- New: Add spell check for every pull request, and `master` and `next` branches
- New: Add git hooks to format the code
- New: Add commit Zen support
- New: Add html5validator, which along with w3c_validator, makes for two html validation tools in the CI <!-- yaspeller ignore -->
- New: Improve CI build times
- Remove: peru for downloading plugins and themes
- New: Add pull request template
