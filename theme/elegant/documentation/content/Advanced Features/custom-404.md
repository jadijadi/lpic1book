---
Authors: Talha Mansoor, Jack De Winter
Title: Custom 404 Error Page
Tags: unique
Date: 2019-07-03 20:07
Slug: custom-404-page
Summary: Elegant can be configured to provide a custom 404 page, giving the user the ability to search for information they expected on the missing page.
Category: Advanced Features
---

When you go to a page that does not exist, your browser will display a default error page
unless the website intervenes and provides it's own error page. Elegant provides an error
page that allows the user to search for the page that they were trying to reach.

Here is an example of what the 404 page may look like:

![Error 404 page]({static}/images/elegant-theme_error-404-page.png)

## Configuration

To enable the custom 404 page, you need to add `404` to `DIRECT_TEMPLATES` in your pelican
configuration.

```python
DIRECT_TEMPLATES = ['404']
```

Note that these values must be added to any existing values present for the `DIRECT_TEMPLATES`
configuration variables.
