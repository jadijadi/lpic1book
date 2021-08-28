---
Title: Using Pre-Commit Git Hooks
Subtitle:
Slug: use-pre-commit-git-hooks
Category: Contributing
Tags:
Date: 2019-07-22 23:17
Summary: Elegant use the Pre-commit tool to standardize on various concepts.  This article gives more information about the tool and how to run it locally.
Keywords:
Authors: Talha Mansoor, Jack De Winter
---

[TOC]

When there was a single developer working on the Elegant project, there were none of the
common problems associated with team projects: different styles and different processes. After
the project was moved to the current
[bazaar development model]({filename}./community-driven-project.md), the team thought it
best that all changes should follow the same set of stylistic guidelines.

The Git clients provide a concept called
[Git hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks). Git hooks allow for
custom code to be triggered when certain actions are performed with Git. One of the most
common triggers is the pre-commit trigger, used to activate a program between a client
request to commit and the actual act of committing the change. If the program reports a
failure, the commit is aborted, hopefully with the failed program providing enough information
for the user to diagnose the issue.

## Aren't Git Hooks Hard to Get Right?

If you have tried to set up Git hooks before, there are usually two problems you have faced:
the concept can be hard for people to understand and Git hooks are often frustrating difficult
to debug. Add onto this the different operating systems and versions of those systems on top
of that, and you can quickly get into nightmare territory for maintaining a Git hook.

To solve most of these problems, the team decided to use the
[Pre-Commit](https://pre-commit.com/)
Python package which provides a simple layer of abstraction over the Git hooks. The Pre-commit
package makes managing, sharing and updating the Git hooks very easy. As it installs itself as
a Git hook, once you have installed it properly, you may easily confuse it as a part of Git's
commit process.

## Why Use Pre-commit Locally?

Pre-commit runs Git hooks that among other things:

- Run [Prettier](https://github.com/prettier/prettier)
  - applies common styling for Markdown, CSS, JS and json files
- Run [Black](https://github.com/python/black)
  - applies common styling for Python files
- Removes trailing whitespace on lines
- Fixes the end of files to a common style

Addressing any failures reported by these hooks locally will result in a smaller turn around
time in getting those issues addressed. This in turn will save time when submitting changes
in a Pull Request, as you have already dealt with any errors that this tool may report.

## How Do I Install It?

The package itself is installed in typical Python fashion by using the Pip command:

```bash
pip install pre-commit
```

Once installed in your environment, you can install the Git hooks for your local repository
by changing your directory to the root of that repository and executing the following command:

```bash
pre-commit install
```

## How Do I Use It Locally?

Once installed, Pre-commit appears to be part of the Git commit process. When you perform
your next `git commit` command (including using the `git-cz` command for the
[Commitizen tool]({filename}./commitizen.md)), the Pre-commit package will download any tools
it requires to properly run any required hooks. These tools are cached, so you will typically
only experience a long wait on the first time the Pre-commit package is executed.

If the hooks run by the Pre-commit package fail for some reason, they will clearly notify
you of which of the hooks failed and typically present you with a reason why the hook failed.
Note that some of the hooks, such as the `prettier` hook, may make some changes to your
files to bring them in line with the project's common style. If any changes occur, they
will not be staged to your local repository, making any changes visible using the `git status`
command.

If the hook failed due to an error, you need to fix that error before it will allow you to
continue. If the hook failed because it made a change, make sure to verify the change that
was made for you, after making sure it will not have a negative effect on your changes. It
is then your responsibility to stage all changes to the repository before committing the
change again.

!!! warning "For Windows Users"

    If you run these checks on Windows, the `check-executables-have-shebangs` hook will fail as Windows does not require that executable files start with a [shebang](shebang) and all files implicitly have the `execute` or `+x` permission for Linux.

    To skip this check, enter `set SKIP=check-executables-have-shebangs` on the command line before you execute the Pre-commit package, either from a Git hook as detailed above, or manually, as detail in the following section.

## Can I Run The Hooks Without a Commit?

The full set of hooks are available by entering the following command:

```bash
pre-commit run -a
```

This will run the full set of hooks and report any errors. It is often useful to run this
command before committing, even if you are using
[Commitizen](./commitizien.md)
for your commits as is recommended.

## How Does The Project Run the Hooks For Submissions?

The Elegant team fully believes in the Git hooks and their benefit to the team. As such, the
Pre-commit package is executed on all of our team builds (using Travis CI) for any commits and
pull requests made on the Travis CI servers. For more information on how we use Travis CI to
build the project, check out the article on
[Elegant and Travis CI](./travis-ci-and-doc-website.md).
