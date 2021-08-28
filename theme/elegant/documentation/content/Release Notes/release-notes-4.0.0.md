---
Title: Version 4.0.0
Tags: change-log, project-management
date: 2019-08-23 00:39
comments: false
Slug: version-4-0-0-release-notes
Category: Release Notes
---

## [4.0.0](https://github.com/Pelican-Elegant/elegant/compare/V3.2.0...V4.0.0) (2019-08-22)

### Bug Fixes

- **admonition:** an artifact in border behind the title ([88113c3](https://github.com/Pelican-Elegant/elegant/commit/88113c3))
- **admonition:** reduce border radius to match radii of other components ([de08d20](https://github.com/Pelican-Elegant/elegant/commit/de08d20)), closes [#490](https://github.com/Pelican-Elegant/elegant/issues/490)
- **admonition:** remove box shadow ([d059db8](https://github.com/Pelican-Elegant/elegant/commit/d059db8)), closes [#490](https://github.com/Pelican-Elegant/elegant/issues/490)
- **admonition:** remove text-shadow from heading ([1c889da](https://github.com/Pelican-Elegant/elegant/commit/1c889da)), closes [#490](https://github.com/Pelican-Elegant/elegant/issues/490)
- **clean URL:** default URL of categories, tags and archives fails on some servers ([3c7df6a](https://github.com/Pelican-Elegant/elegant/commit/3c7df6a)), closes [#280](https://github.com/Pelican-Elegant/elegant/issues/280) [#276](https://github.com/Pelican-Elegant/elegant/issues/276)
- **comments:** W3C validation errors ([76a1f26](https://github.com/Pelican-Elegant/elegant/commit/76a1f26))
- **disqus:** remove SITEURL condition to show Disqus comments section ([753d5a5](https://github.com/Pelican-Elegant/elegant/commit/753d5a5))
- **Lang:** do not override default value of DEFAULT_LANG set by Pelican ([d6c60c2](https://github.com/Pelican-Elegant/elegant/commit/d6c60c2))
- **social:** reduce icon sizes in the sidebar ([c769ba3](https://github.com/Pelican-Elegant/elegant/commit/c769ba3))
- **social:** use nofollow for social links in the sidebar ([50cff87](https://github.com/Pelican-Elegant/elegant/commit/50cff87))
- **social:** W3C validation error ([ec4521e](https://github.com/Pelican-Elegant/elegant/commit/ec4521e))
- **table:** reduce border radius to match radii of other components ([7eaaa96](https://github.com/Pelican-Elegant/elegant/commit/7eaaa96))
- **w3c validation:** remove incorrect usage of article tag ([e8231e0](https://github.com/Pelican-Elegant/elegant/commit/e8231e0)), closes [#251](https://github.com/Pelican-Elegant/elegant/issues/251)
- **w3c validation:** remove obsolete charset attribute ([8deb285](https://github.com/Pelican-Elegant/elegant/commit/8deb285)), closes [#251](https://github.com/Pelican-Elegant/elegant/issues/251)
- **w3c validation:** remove redundant article tag ([d07c27e](https://github.com/Pelican-Elegant/elegant/commit/d07c27e)), closes [#251](https://github.com/Pelican-Elegant/elegant/issues/251)
- **w3c validation:** remove redundant sections without heading ([df9221f](https://github.com/Pelican-Elegant/elegant/commit/df9221f)), closes [#251](https://github.com/Pelican-Elegant/elegant/issues/251)
- **w3c validation:** remove type and language attributes ([b700224](https://github.com/Pelican-Elegant/elegant/commit/b700224)), closes [#251](https://github.com/Pelican-Elegant/elegant/issues/251)
- **w3c validation:** update CSS rules ([0b78d46](https://github.com/Pelican-Elegant/elegant/commit/0b78d46)), closes [#251](https://github.com/Pelican-Elegant/elegant/issues/251)

### Features

- **404:** auto fill search box with URL fragment that was not found ([c0a7f47](https://github.com/Pelican-Elegant/elegant/commit/c0a7f47))
- **admonition:** add box shadow ([246f826](https://github.com/Pelican-Elegant/elegant/commit/246f826))
- **admonition:** border color should match the title color ([1adadbe](https://github.com/Pelican-Elegant/elegant/commit/1adadbe))
- **admonition:** increase contrast of title ([7fb82cc](https://github.com/Pelican-Elegant/elegant/commit/7fb82cc))
- **admonition:** use svg image instead of font-awesome icon ([e7c4029](https://github.com/Pelican-Elegant/elegant/commit/e7c4029)), closes [#487](https://github.com/Pelican-Elegant/elegant/issues/487) <!-- yaspeller ignore -->
- **clean url:** support clean URL for search page ([088791e](https://github.com/Pelican-Elegant/elegant/commit/088791e))
- **comments:** add support for utterances comment system ([a2151cc](https://github.com/Pelican-Elegant/elegant/commit/a2151cc)), closes [#288](https://github.com/Pelican-Elegant/elegant/issues/288)
- **quotes:** improve style and remove font-awesome for quote icon ([9ef3ac8](https://github.com/Pelican-Elegant/elegant/commit/9ef3ac8)), closes [#487](https://github.com/Pelican-Elegant/elegant/issues/487)
- **social:** add icons for 7 more websites ([8dcf8fa](https://github.com/Pelican-Elegant/elegant/commit/8dcf8fa)), closes [#494](https://github.com/Pelican-Elegant/elegant/issues/494)
- **social:** use svg icons instead of font-awesome ([19f458b](https://github.com/Pelican-Elegant/elegant/commit/19f458b)) <!-- yaspeller ignore -->
- **table:** add style rule to make tables pop out ([6a8500b](https://github.com/Pelican-Elegant/elegant/commit/6a8500b)), closes [#440](https://github.com/Pelican-Elegant/elegant/issues/440)

### Performance Improvements

- **admonition:** add attributes to svg images ([a740a60](https://github.com/Pelican-Elegant/elegant/commit/a740a60)) <!-- yaspeller ignore -->
- **requests:** remove font awesome ([7c20145](https://github.com/Pelican-Elegant/elegant/commit/7c20145)), closes [#487](https://github.com/Pelican-Elegant/elegant/issues/487)

### BREAKING CHANGES

- **requests:** We have removed font awesome. Now we use svg images for all icons. This will result in one less web request, which in turn will improve your websites performance. <!-- yaspeller ignore -->
- **social:** Style customization and configuration of social icons
  in the sidebar has changed.
  New icons have better colors and bigger sizes.
- **clean URL:** To enable clean URLs for tags, categories and archives,
  first configure your server to support clean URLs. Then set `TAGS_URL`,
  `CATEGORIES_URL` and `ARCHIVES_URL` to `"tags"`, `"categories"` and
  `"archives"` respectively.
