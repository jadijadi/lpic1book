---
Title: How To Use Commitizen for Git Commits
Subtitle: Recommended
Slug: use-commitizen-for-git-commits
Category: Contributing
Tags:
Date: 2019-07-22 14:15
Summary: Elegant uses the Commitizen tool to standardize Git commit messages across the project.
Keywords:
Authors: Talha Mansoor, Jack De Winter
---

[TOC]

The [Elegant Contribution Guidelines]({filename}./contributing-to-the-project.md) require that
each commit submitted for consideration be formatted according to the
[Git Commit Guidelines]({filename}./git-commit-guidelines.md).

To make this process easier, the Elegant repository is configured to support the
[Commitizen](https://github.com/commitizen/cz-cli) tool. This tool saves time by controlling
the format of the Git commit messages to a set of predefined options and patterns. This
formatting allows for our release process to be
[fully automated]({filename}./automated-release.md).

## Prerequisites

Both [Node.js](https://nodejs.org/en/download/) and [Yarn](https://yarnpkg.com/en/docs/install)
must be installed on your system.

### Install Commitizen

From your command line terminal, go into the directory containing your fork of the Elegant
repository, then execute the following commands:

```bash
yarn global add commitizen
yarn install
```

## Use Commitizen

As the Elegant team has already made the repository
[Commitizen friendly](https://github.com/commitizen/cz-cli#making-your-repo-commitizen-friendly),
you can start using it for your commits by entering `git-cz` in your command shell instead
of `git commit`. Make sure the changes that you want to commit to your fork are staged.

Once invoked, Commitizen will prompt you for answers to a number of questions. As mentioned
previously, the answers to these questions are formatted according to the
[Git Commit Guidelines]({filename}./git-commit-guidelines.md)
before being placed into the message field for the commit. Commitizen then follows through and
invokes `git commit`, committing the staged changes along with the formatted message that was
crafted for you from the answers you provided.

In some cases, such as a [Git pre-commit hook failure]({filename}./pre-commit.md), you may
not want to re-answer the questions again. Once you fix the issues that prevented the
commit from happening, you can use `git-cz --retry` to submit the commit again using the same
answers that were used in the failed attempt.

## Video Demonstration

For a quick video on how this process works in real life, click on the play button below.

<script id="asciicast-258540" src="https://asciinema.org/a/258540.js" async></script>
