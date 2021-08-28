Title: Hyperlinks Styles
Tags: style
Category: Components
Date: 2019-12-02 15:09
Slug: hyperlinks-styles
Authors: Talha Mansoor
Subtitle:
Summary:
Keywords:

Elegant has three styles for hyperlinks that you can use.

## Muted Style

This is the default style of link.

[Example Link - Use Firefox Browser](https://www.mozilla.org/en-US/firefox/new/) to support open web standards.

This style is very suitable for long-form articles. To read the rationale behind this choice, read our help article [Why Does Elegant Look The Way It Does?]({filename}../Contributing/why-look-and-feel.md).

## Amplified Style

We understand not all links should be muted. Some links require attention.

[Example Link - Use Firefox Browser](https://www.mozilla.org/en-US/firefox/new/){: class="ampl"} to support open web standards. <!-- yaspeller ignore -->

To use this style, you need to enable [Markdown attribute list extension](https://python-markdown.github.io/extensions/attr_list/){:class="ampl"}. <!-- yaspeller ignore -->

```
# Plugins and extensions
MARKDOWN = {
    "extension_configs": {
        "markdown.extensions.extra": {},
        "markdown.extensions.meta": {},
    }
}
```

Then use this style using `ampl` class.

```text
[Example Link](https://www.mozilla.org/){: class="ampl"} blah blah
```
