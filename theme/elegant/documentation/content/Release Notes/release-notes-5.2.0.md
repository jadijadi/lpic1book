Title: Version 5.2.0
Tags: change-log, project-management
Category: Release Notes
Date: 2020-02-03 23:59
Slug: version-520

<!-- yaspeller ignore:start -->

## [5.2.0](https://github.com/Pelican-Elegant/elegant/compare/V5.1.0...V5.2.0) (2020-02-03)

### Bug Fixes

- regression introduced due to cache busting ([b953a38](https://github.com/Pelican-Elegant/elegant/commit/b953a382d77e99884b82800d7392ceb8eae8d77d))
- **archives:** at smaller screen layout does not make the best use of available space ([a289e9d](https://github.com/Pelican-Elegant/elegant/commit/a289e9db411b6abeb79a6028a3b0778070f6f553))
- **syntax:** code blocks with line numbers do not have the correct border radius ([3a34a3e](https://github.com/Pelican-Elegant/elegant/commit/3a34a3e6b9741e44bc34d723627b0da162fdfa82))
- **syntax:** improve the font size and height of download button ([07595b3](https://github.com/Pelican-Elegant/elegant/commit/07595b3dbd31feef16aee3e907d3c4fc34574e0d))
- **typography:** fix font size and style of TOC ([2d597ab](https://github.com/Pelican-Elegant/elegant/commit/2d597abd095de8ce8ac72d8ae77b4914d9daeeed)), closes [#509](https://github.com/Pelican-Elegant/elegant/issues/509)
- Categories and Tags pages do not have space below the header ([d78f4e5](https://github.com/Pelican-Elegant/elegant/commit/d78f4e5add9ca7778967d4c5da02053187c3cbd4))
- remove invalid CSS rule ([368cb2c](https://github.com/Pelican-Elegant/elegant/commit/368cb2cad4b00b40446e7ad1d5357228e48ec34c))
- use consistent color for border ([c85b7b8](https://github.com/Pelican-Elegant/elegant/commit/c85b7b84d6ac64a73941ad73ba031fd2f4ddac0f))
- use darker color for the site name ([19f37ca](https://github.com/Pelican-Elegant/elegant/commit/19f37caf937bd864aaf6b1532078936ad79edf1d))
- **article:** use loclate_date attribute instead of hardcoding the date format ([1da552c](https://github.com/Pelican-Elegant/elegant/commit/1da552c94775766657f4ee9a0c05e7bcd7f1adf9)), closes [#552](https://github.com/Pelican-Elegant/elegant/issues/552)
- **bootstrap:** WIP. add Bootstrapv2.3.2 sources file to the project ([43ee8eb](https://github.com/Pelican-Elegant/elegant/commit/43ee8eb2ad6ba22bac6660bdb514857dadf9bcab)), closes [#429](https://github.com/Pelican-Elegant/elegant/issues/429)
- **seo:** regression introduced in PR [#556](https://github.com/Pelican-Elegant/elegant/issues/556) ([28bcb85](https://github.com/Pelican-Elegant/elegant/commit/28bcb8592cf595761d96904b004df3f425259849)), closes [#505](https://github.com/Pelican-Elegant/elegant/issues/505)
- **typography:** about me and my projects heading is not on one line ([6a7989c](https://github.com/Pelican-Elegant/elegant/commit/6a7989cc17f46a4ee1075dfe66b03d858956e7c7))
- **typography:** font size of superscript number in categories and tags page ([d0a7162](https://github.com/Pelican-Elegant/elegant/commit/d0a71622bfe23e86478b7727e590dbf8e3a7b87f))
- **typography:** override Bootstrap base font ([f6a83a6](https://github.com/Pelican-Elegant/elegant/commit/f6a83a6f31e24754e5001260336b89e9107e1053)), closes [#429](https://github.com/Pelican-Elegant/elegant/issues/429)
- **typography:** top menu bar does not have correct height ([d30ce82](https://github.com/Pelican-Elegant/elegant/commit/d30ce82aa8ba366555cbeee55ffb08e70110df0a))
- **typography:** use consistent font and color for project list ([477a467](https://github.com/Pelican-Elegant/elegant/commit/477a467bd4bf69a86d71bceb3ac2385b43c57a8c))
- **typography:** use consistent font in the footer ([eeb0e30](https://github.com/Pelican-Elegant/elegant/commit/eeb0e30be3664c86e7b37a151cf1992daa7fd46e))

### Features

- add support cache busting ([cde0dc5](https://github.com/Pelican-Elegant/elegant/commit/cde0dc54c68412d8db43ea371e98e6d14e99b9d2))
- **categories:** change background color of uncollapsed Category ([6cc11b8](https://github.com/Pelican-Elegant/elegant/commit/6cc11b8efe8a3c97ccfeddc244a5b84465fff1fb))
- **gallery:** add support for PhotoSwipe image gallery using raw HTML ([ad1bcea](https://github.com/Pelican-Elegant/elegant/commit/ad1bcea67f5515c8c448e1c7009f3ba01965d574)), closes [#567](https://github.com/Pelican-Elegant/elegant/issues/567)
- **js:** combine and minify all JS files into one to improve load speed ([f5047d4](https://github.com/Pelican-Elegant/elegant/commit/f5047d4cbce02a187f1b04f11f026817ed1757d9))
- **search:** improve search results page look ([73fa743](https://github.com/Pelican-Elegant/elegant/commit/73fa743723ebbf35b6cd0e0f51c9497634b1474c)), closes [#573](https://github.com/Pelican-Elegant/elegant/issues/573) [#275](https://github.com/Pelican-Elegant/elegant/issues/275)
- **search:** replace tipue_search with lunr.js ([9d60af1](https://github.com/Pelican-Elegant/elegant/commit/9d60af14c4065cee90289e48705714865dbbcb9e)), closes [#275](https://github.com/Pelican-Elegant/elegant/issues/275)
- **SEO:** Add header and documentation for Claiming Website on Yandex ([2bb691d](https://github.com/Pelican-Elegant/elegant/commit/2bb691d3bd02f9d586206814992306383640a84c))
- **SEO:** add SEO and SMO meta keywords in site's home page ([c5be0eb](https://github.com/Pelican-Elegant/elegant/commit/c5be0eb7f9e98c9938ae96ca8eb9c48c7482993e))
- **sharing:** Enable customizing the sharing links ([f3e262f](https://github.com/Pelican-Elegant/elegant/commit/f3e262f3dc6a2b1a4356014e524018603d899fb2))
- **syntax:** add copy to clipboard button for every code snippet ([6f73317](https://github.com/Pelican-Elegant/elegant/commit/6f733179b80d8225af71bc5945be1fddd98b40ae)), closes [#574](https://github.com/Pelican-Elegant/elegant/issues/574) [#525](https://github.com/Pelican-Elegant/elegant/issues/525)
- **syntax:** add support for highlighting lines in code snippets ([ba2de8c](https://github.com/Pelican-Elegant/elegant/commit/ba2de8ccf971b1e77abe24960532f664e00ef9d9)), closes [#520](https://github.com/Pelican-Elegant/elegant/issues/520)
- **syntax:** add support for liquid_tags.include_code plugin ([0550a3a](https://github.com/Pelican-Elegant/elegant/commit/0550a3ab2fa5526a6db7e233f755cdfa36f9db38)), closes [#518](https://github.com/Pelican-Elegant/elegant/issues/518)
- **syntax:** use Gruvbox syntax highlighting theme ([0b50ab1](https://github.com/Pelican-Elegant/elegant/commit/0b50ab1565dd1fa700cea9e4c6cb963bd9591b9f))
- **typography:** use consistent fonts ([8b7a8bd](https://github.com/Pelican-Elegant/elegant/commit/8b7a8bd3c828baf1dd3434b75a5bd050a4279495)), closes [#429](https://github.com/Pelican-Elegant/elegant/issues/429)
- **typography:** use consistent style for timestamps in tags, categories and archives pages ([a421dcd](https://github.com/Pelican-Elegant/elegant/commit/a421dcdbc42d87bcff2bfdeb3f3f19e5e6e8c3c2))
- **typography:** use dns-prefetch and preconnect to improve font load time ([e4bd582](https://github.com/Pelican-Elegant/elegant/commit/e4bd582858df6925bbc5c0dff59e62b1cd8c5390))
- **typography:** use responsive fonts ([39acdbf](https://github.com/Pelican-Elegant/elegant/commit/39acdbf4503ee9cdd7163672cba28c24b47d6647))

<!-- yaspeller ignore:end -->
