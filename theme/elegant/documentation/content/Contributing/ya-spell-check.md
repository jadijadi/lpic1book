---
Title: Using 'yaspeller' with Elegant
Subtitle:
Slug: yaspeller-for-elegant
Category: Contributing
Tags:
Date: 2019-08-04 23:17
Summary: Elegant use the 'yaspeller' tool to scan for spelling mistakes.  This article gives more information about the tool and how to run it locally.
Keywords:
Authors: Jack De Winter, Talha Mansoor
---

[TOC]

Elegant build system verifies spelling using the [yaspeller tool](https://github.com/hcodes/yaspeller).

In its default mode, the `yaspeller` tool will scan everything in a Markdown
document except for text encapsulated within code blocks.

# How to ignore spelling errors

While `yaspeller` is a useful tool, it is not foolproof. When scanning the documentation
files, it often requires a bit of assistance in determining how to properly handle words which
do not appear in the standard dictionary.

## Adding A Word to the Project Dictionary

The root directory
of the project contains
[the project dictionary](https://github.com/Pelican-Elegant/elegant/blob/master/.yaspeller.json)
with a list of words that `yaspeller` should consider acceptable.

Words added to the
dictionary in lower case will match upper case and lower case versions of the word, while words
added with any capitalization will force `yaspeller` to perform a case-sensitive match.

## Ignore a Line

End a line with
the `<!-- yaspeller ignore -->` suffix to tell the `yaspeller` tool to ignore
the entire line.

## Ignore a block

To ignore a block of text, put
`<!-- yaspeller ignore:start -->` before the block.

Place `<!-- yaspeller ignore:end -->` where you want spell checking to resume.

# Spell Check Locally

Similar to the other checks that are performed on every submission, a spell check failure will
cause the build to fail.

Addressing any failures reported locally by this tool results in a smaller turn around time in
getting any spelling mistakes addressed. This in turn will save time when submitting changes
in a Pull Request, as you have already dealt with any errors that this tool may report.

### How Do I Install It Locally?

You can install the `yaspeller` package using either NPM (Node.js) or Yarn as follows:

```bash
npm install -g yaspeller
```

OR

```bash
yarn global add yaspeller
```

## How Do I Use It Locally?

To invoke the `yaspeller` package for the documentation files for the Elegant project, go to
the root directory of your local repository and enter the following command:

```bash
yaspeller --only-errors documentation/content/ *.md
```

When executed, the `yaspeller` tool will recursively scan all of the `*.md` files under the
`documentation/content/` directory from the root of your local repository.

The `--only-errors`
flags merely restricts any of the output to any errors that occur, instead of an ongoing stream
of what files it is scanning. As omitting the `--only-errors` flag only affects the output
and not the detection of spelling mistakes, feel free to not use it when running locally.
