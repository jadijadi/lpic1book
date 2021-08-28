Title: Use PostCSS To Compile CSS Style Sheets
Tags: postcss, gulp
Category: Contributing
Date: 2019-12-01 23:13
Slug: use-postcss-to-compile-css-style-sheets
Subtitle: Mandatory
Authors: Talha Mansoor
Summary:
Keywords:

Elegant uses [GulpJS](https://gulpjs.com/) and [PostCSS](https://postcss.org/) to do pre and post processing, like [adding vendor prefixes](https://github.com/postcss/autoprefixer) or [compressing the CSS file](https://cssnano.co/).

## Why not use Pelican assets plugin?

[Pelican's assets plugin](https://github.com/getpelican/pelican-plugins/tree/master/assets) uses [Python's webassets package](https://github.com/miracle2k/webassets).

Unfortunately, webassets have not had a release [since early 2017](https://github.com/miracle2k/webassets/releases). Requests to revive the project have [gone unheeded](https://github.com/miracle2k/webassets/issues/505).

I tired to install webassets from the Git repository to use its PostCSS filter but it didn't work. Instead of wasting time in wrestling the code of an unmaintained project, I decided to use PostCSS which is modern and actively maintained.

## How to use PostCSS

This is closely related to [LiveReload Elegant Documentation Using Gulp.js]({filename}./live-reload-gulp.md)

### Prerequisites

You need to run following steps only once, to setup the LiveReload using gulp.

#### Step 1: Install NodeJS and Yarn <!-- yaspeller ignore -->

Install [Node.js](https://nodejs.org/en/download/) and [Yarn](https://yarnpkg.com/en/docs/install) on your system.

If you are on Windows then try installing them with [scoop.sh](https://scoop.sh/). It saves time and makes update easier.

#### Step 2: Install gulp

Run this command from your command line terminal.

```bash
yarn global add gulp-cli
```

#### Step 3: Install Dependencies

In the root of the Elegant repository, run

```bash
yarn install
```

`yarn` will create `node_modules` folder in the root.

#### Step 4: Run `gulp`

In the root of the Elegant repository, run

```bash
gulp css
```

It will compile the CSS present in [`static/css`](https://github.com/Pelican-Elegant/elegant/tree/master/static/css) folder into `static/css/elegant.prod.css`.

To live preview your changes, use

```bash
gulp
```

## How does it work?

Gulp and PostCSS, takes all the CSS files present inside `static/css` folder. It applies PostCSS plugins on it like CSS compression.

It then writes the generated version in `static/css/elegant.prod.css` file. This is the file a Pelican blog uses when it uses Elegant theme.

If user has enabled [`assets` plugin]({filename}../Supported Plugins/assets-plugin.md), then this file is again made to go through webassets cssmin filter. Although this step is redundant because `elegant.prod.css` is already compressed. But it is necessary in case user has decided [to customize the theme using `custom.css`]({filename}../Advanced Features/custom-style.md). In which, assets cssmin filter will combine `elegant.prod.css` and `custom.css` into one file `style.min.css`.
