---
Title: Git Tips for Beginners
Subtitle:
Slug: git-tips-for-beginners
Category: Contributing
Tags:
Date: 2019-07-03 21:57
Summary: This article contains a number of tips useful for working with Elegant and Git.
Keywords:
Authors: Talha Mansoor, Jack De Winter
---

[TOC]

Here are some tips we have found useful for using Git to contribute to the project.

## How To Set Up Your Git Repository

1. Create your own fork of Elegant by going to the project repository webpage [on GitHub](https://github.com/Pelican-Elegant/elegant) and pressing the `Fork` button.

   ![Fork Button]({static}/images/github-fork-button.png)

2. You will now be redirected to the page representing your fork of the repository. To clone the your fork of the repository to your computer, press the `Clone or download` button and follow the instructions provided.

   ![Clone or Download button]({static}/images/github-clone-button.png)

3. Create a directory to host your repository in and change to that directory. Run the following command to set your forked repository as `Upstream`:

   ```bash
   git remote add upstream https://github.com/Pelican-Elegant/pelican-elegant.git
   ```

## Pull Before Starting Changes

Most of the changes that you will submit will be against the Upstream repository's `next`
branch. Whether you decide to work in your local repository's `next` branch or create a new
branch of your own, it is recommended that you do a `git pull` against the Upstream `next`
branch before starting to work on a new set of changes. This will ensure that you are starting
from a known good point, and reduce the chance of requiring a merge at a later stage.

## Updating/Rebasing to Upstream

It is a good practice to update your repository to it's Upstream repository one or more times
during the development of your changes. Specifically, the `next` branch of the repository
is where most of the changes are submitted to, and you should either rebase or pull any
changes down to your local repository from there. This practice will ensure that any changes
that have been made to that Upstream branch are brought down where you can test your changes
with anyone other changes.

To update from the `next` branch, from within your project directory, enter the following
commands:

1. `git fetch upstream next`
2. `git rebase upstream/next`

## Squash Commits & More Complex Rebasing

Before you [create a pull request in GitHub](https://github.com/Pelican-Elegant/elegant/pulls),
you have the option to squash your commits into a single commit. This is often used to clean
up a series of commits where you were experimenting with something or just had to fiddle with
something to get it `just right`.

To squash and rebase your commits, use the following command:

```bash
git rebase --interactive upstream/master
```

!!! warning

    As with all knives, especially Swiss-army knives, please take caution.  Rebasing a repository after pushing one or more commits to another repository can be troublesome.

For more on the interactive rebase command of Git, see [its official documentation](https://git-scm.com/docs/user-manual#interactive-rebase) and helper articles such as
[this article](https://makandracards.com/makandra/527-squash-several-git-commits-into-a-single-commit).
