---
Title: LiveReload Elegant Documentation Using Pelican
Date: 2019-07-19 22:17
Slug: live-reload-elegant-documentation-using-pelican
Category: Contributing
Authors: Talha Mansoor
---

Pelican introduced support for LiveReload in [Version 4.1.0](https://github.com/getpelican/pelican/releases/tag/4.1.0).

To use it, you need to install LiveReload pip package.

```bash
pip install livereload
```

Then run from the root of the documentation,

```
invoke livereload
```

You need to install `invoke` and `tasks.py` for this feature. It does **not** work with Makefile.

```bash
pip install invoke
```

### Known Issue

!!! Danger "Pretty URLs Do Not Work"

    Remove or comment out `ARTICLE_URL = "{slug}"` from Pelican configuration to make LiveReload work

Unfortunately, Pelican LiveReload depends on [Python-LiveReload](https://github.com/lepture/python-livereload), which [does not support extension less files](https://github.com/lepture/python-livereload/pull/131).

What does it mean?

Your URL must end at `.html`, like,

```
http://127.0.0.1:9000/live-reload-elegant-documentation.html
```

If it does not have the `.html` in the end, then LiveReload will return 404 error.

This can happen if your Pelican configuration has

```python
ARTICLE_URL = "{slug}"
```

Therefore, to make LiveReload work, comment out the above line.

This issues has been reported to the Pelican team. You can track it [here](https://github.com/getpelican/pelican/issues/2595).
