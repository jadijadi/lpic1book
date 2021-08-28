---
authors: Talha Mansoor
Title: Customize Style
Tags: unique
Date: 2019-07-03 20:14
Slug: customize-style
Category: Advanced Features
---

To customize Elegant's visual style, use
[`custom.css`](https://github.com/Pelican-Elegant/elegant/blob/master/static/css/custom.css).
You can override Elegant's visual style like font, color, spacing etc using
this sheet. This empty style sheet is present at following path in your Elegant
folder,

    :::bash
    static/css/custom.css

Find the code of the element you want to customize in
[`elegant.css`](https://github.com/Pelican-Elegant/elegant/blob/master/static/css/elegant.css).
Copy the element's selector and styles, and paste it in `custom.css`. Edit this
CSS code and customize it to your liking.

Your customizations will override whatever rules are defined in `elegant.css`.

Let's take a look how you can change the style of hyperlinks in an article.
Following is the relevant code,

    :::css
    article p:not(#list-of-translations):not(#post-share-links) a,
    article ol a,
    article div.article-content ul:not(.articles-timeline):not(.related-posts-list) a {

        border-bottom: thin dashed #A9A9A9;
        color: #000;
    }

Copy and paste it in `custom.css`. Change color to red for example,

    :::css
    article p:not(#list-of-translations):not(#post-share-links) a,
    article ol a,
    article div.article-content ul:not(.articles-timeline):not(.related-posts-list) a {

        border-bottom: thin dashed #A9A9A9;
        color: red;
    }

Test your website using Pelican. All links should be colored red.

Read [this post]({filename}../Supported Plugins/assets-plugin.md) to make sure your site's page
speed does not decrease due to additional HTTP request.
