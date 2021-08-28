---
Title: Code Style for Jinja2
Subtitle:
Slug: code-style-for-jinja2
Category: Contributing
Tags:
Date: 2019-07-03 22:17
Summary: Elegant's Jinja templates adhere to the code style described in this article.
Keywords:
Authors: Talha Mansoor
---

Please make sure to follow the code style of the existing code base.

Specifically:

- use single (`''`) rather than double (`""`) quotation marks for Jinja strings
- in Jinja print statements, surround the variable with spaces inside curly braces – for example: `{{ foo.bar }}`
- use double (`""`) quotation marks around HTML attributes
- end files with a newline

You can run `gulp validate` task to validate the templates files using [Jinja Ninja](https://github.com/ramonsaraiva/jinjaninja).
It is not comprehensive but it does point out obvious mistakes. You can read more about using `gulp` [here]({filename}./live-reload-gulp.md).
