---
Title: Git Commit Guidelines
Subtitle: Mandatory
Slug: git-commit-guidelines
Category: Contributing
Tags:
Date: 2019-07-20 23:17
Summary: Elegant has a mandatory Git commit message format that is described here.
Keywords:
Authors: Talha Mansoor, Jack De Winter
---

[TOC]

The Elegant release process is [fully automated]({filename}./automated-release.md). To make
this work, all commit message must adhere to a given set of rules.

## Why Have Commit Message Rules?

From the [semantic-release project](https://github.com/semantic-release/semantic-release#commit-message-format):

> semantic-release uses the commit messages to determine the type of changes in the codebase. Following formalized conventions for commit messages, semantic-release automatically determines the next semantic version number, generates a changelog and publishes the release.

What does that mean? It means that semantic-release parses the commit messages to arrive
at a unbiased version number for a new release, and then creates that new release. This
allows for a new release to be put together with little human involvement.

## What are those rules?

The Elegant development team chose to use the
[Angular Commit Message Conventions](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines)
as the baseline for the team's commit message conventions.

Our conventions are largely derived from the Angular team's guidelines
[as documented here](https://gist.github.com/stephenparish/9941e89d80e2bc58a153).

### Is There Something to Help Me With The Rules?

Reading, understanding, and then getting used to following guidelines may take time. Even
then, if you are in a hurry, you can sometimes forget what the rules are. It's only human.

Our team has found life easier since we started using
[Commitizen for Git commits]({filename}./commitizen.md).
Our project includes configuration for Commitizen that automatically formats each commit
message to conform to our guidelines by walking you through a series of prompts. When you
finish those prompts, a new commit messages is authored for you with the information from those
prompts, following all of the rules in the following sections on the Commit Message Format.

!!! tip

    [Use Commitizen for Git commits]({filename}./commitizen.md).  It does make life easier.   It automatically formats the commit message to conform to our guidelines.

## Commit Message Format

Each line of the commit message must be shorter than 101 characters! This allows the message
to be easier to read on GitHub as well as in various git tools.

Each commit message consists of a **header**, a **body** and a **footer**, as follows:

```text
<header>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

### Header

The header is mandatory. It has a special format that includes a required **type**, an
optional **scope** and a required **subject**:

```text
<type>(<scope>): <subject>
```

#### Type

The type must be one of the following:

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc.)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance <!-- yaspeller ignore -->
- **test**: Adding missing or correcting existing tests
- **chore**: Changes to the build process or auxiliary tools and libraries such as documentation generation
- **revert**: A revert to a previous commit. See the section [Revert Commits](#revert-commits) below.

#### Scope

The scope is intended to provide extra context on the changes included in the commit is for.
This context should provide useful information to someone reading the commit log, including
the reading of the commit log in the release notes.

For example, if you fix something in the
[authors blurb]({filename}../Supported Plugins/author-blurbs.md) section, a scope of `authors` would be appropriate. If you are changing something with how the
[landing page]({filename}../Components/landing-page.md)
works, a scope of `landing page` or `home` would be appropriate.

#### Subject

The subject part of the header must follow these rules:

1. always use the imperative, present tense: "change" not "changed", "changes", or "changing"
1. do not capitalize the first letter
1. no period (`.`) at the end of the line

##### What is Imperative mode?

Chris Beams, in his article on
[how to write a good commit message](https://chris.beams.io/posts/git-commit/#imperative),
gives a very good explanation of imperative mode.

> Imperative mood just means "spoken or written as if giving a command or instruction". A few examples:
>
> 1. Clean your room
> 1. Close the door
> 1. Take out the trash
>
> The imperative can sound a little rude; that's why we don't often use it. But it's perfect for Git commit subject lines.

#### Revert Commits

If the commit reverts a previous commit, it must be specified with the `revert` type, followed
by the complete header of the reverted commit as the subject. The body of the commit must
start with the text: `This reverts commit <hash>.`, where the hash is the SHA of the commit
being reverted.

### Body

The body of the commit message must follow these rules:

1. always use the imperative, present tense: "change" not "changed", "changes", or "changing"
1. include your motivation for the change and how it contrasts with the previous behavior

### Breaking changes

All breaking changes have to be mentioned in the body with the description of the change,
justification and migration notes. The body must be prefixed with the text `BREAKING CHANGE:`.

The following example is from the
[Elegant project repository](https://github.com/Pelican-Elegant/elegant/commit/9b5b2eca2a34a5d9898173a8118cb5e37621dfd5).
After the required prefix, it describes the problem it is solving, and why it was needed.
In retrospect, while it does mention that `LANDING_PAGE_ABOUT` is no longer used, it should
have gone into more detail on where to look up information on what was replacing it.

```text
feat(home): write about me in markdown, reST or asciidoc

BREAKING CHANGE: Previously LANDING_PAGE_ABOUT was a dictionary that contained html tags. We used it
to create landing page. But users have demanded from the very beginning to be able to write the
landing page in markdown. This patch adds this feature. But in order to use it, you have to update
your configuration.

Closes #85
```

### Footer

#### Referencing issues

Closed bugs should be listed on a separate line in the footer prefixed with the `Closes`
keyword.

```text
Closes #234
```

If your commit closes multiple issues, list them on the same line separated by a comma.

```text
Closes #123, #245, #992
```

If your commit affects an issue, but does not fix it completely, use the "Updates" keyword

```text
Updates #234
```

## Correct Message Format Examples

The following are commits from our own repository that shows how Elegant has used these
guidelines.

### New Features

```text
feat(monetization): add BestAzon support
feat(Chinese): add better font support for Chinese language
feat(footer): make external links Nofollow
```

### Fixes

```text
fix(reST): indents in line blocks is not preserved
fix(gist): embedded Github gist are not laid out correctly
```

### Documentation

```text
docs(add): metadata variables
docs(add): release notes for 3.0.0
docs(update): change category of reading-time article
docs(update): set author information
```

### Miscellaneous

```text
chore(livereload): use es2015 syntax for gulp configuration
ci(docs): use sitemap plugin in production only
ci(docs): add default tasks.py file
refactor: move Google and Bing claims to their individual files
```

## Incorrect Message Format Examples

This commit message starts with a capital letter and ends with a period

```text
doc(changes): Rewrite of multi-part plugin per issue 308.
```

This commit message does not use imperative mode.

```text
docs(change): updating status doc to reflect current state
```
