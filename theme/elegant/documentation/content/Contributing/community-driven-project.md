---
Title: Elegant grows into a community-led project
Subtitle: The beginning of a beautiful friendship
Slug: community-led-project
Category: Contributing
Tags:
Date: 2019-01-05 19:40
Summary: Elegant has grown into a community-driven project. It also got a new website and organizational structure, culminating in its biggest release yet.
Keywords:
Authors: Pablo Iranzo Gómez, Talha Mansoor, Matija Šuklje
---

[TOC]

## Adopting Bazar Model

[Talha Mansoor][talha131] published the first version of Elegant in 2012. It grew in popularity in a short time, due to its clean and functional style.

In November 2018,
[Matija Šuklje][silverhook] <!-- yaspeller ignore -->
called Elegant's community into a [discussion about the future of the theme][future]. Response was immense. Talha was the first to support the proposal of changing the development model from a single-developer to a community-led project following the [bazaar development model](https://en.wikipedia.org/wiki/The_Cathedral_and_the_Bazaar).

[He][talha131] moved Elegant from a personal repository to a separate organization [Pelican-Elegant][elegant-org], and added active community members to the [team][team].

This way, the bus factor of the project has greatly improved.

<!-- yaspeller ignore:start -->

[team]: https://github.com/orgs/Pelican-Elegant/people
[elegant-org]: https://github.com/Pelican-Elegant/
[pelican]: https://getpelican.com
[ashwinvis]: https://ashwinvis.github.io/
[calfzhou]: http://gocalf.com
[talha131]: https://www.oncrashreboot.com
[iranzo]: https://iranzo.github.io/
[silverhook]: https://matija.suklje.name
[future]: https://github.com/talha131/pelican-elegant/issues/173

<!-- yaspeller ignore:end -->

## New Governance Model

Since the code base is now tended by more than one, [team][team] has put in place some basic rules of governance to avoid people stepping on each-others toes.

We clarified the outbound and inbound licensing situation. We release Elegant (outbound license) under the [MIT][] license and its documentation under the [CC-BY-4.0][] license. All code contributions are made directly under the "Inbound=Outbound licensing model". What it means is that, the license everyone contributes their code under (i.e. inbound license) is same as the license that the code is then released under to the general public.

The [contribution guidelines][contributing] are also updated and should be easier to follow now.

We have also started discussing [how to vote on new features and other important decisions][vote], which we will put into effect soon.

[mit]: https://spdx.org/licenses/MIT.html
[cc-by-4.0]: https://creativecommons.org/licenses/by/4.0/
[new_members]: https://github.com/Pelican-Elegant/elegant/issues/193
[vote]: https://github.com/Pelican-Elegant/elegant/issues/180
[contributing]: https://github.com/Pelican-Elegant/elegant/blob/master/CONTRIBUTING.md

## New Documentation Website

Any good project needs good documentation and deserves a good homepage.

We decided to eat our own dog food and host Elegant documentation on an Elegant-themed Pelican instance. This serves three purposes. One, hosts documentation, two, showcases Elegant features, and third, a testing ground to try out new ideas.

This resulted in [elegant.onCrashReboot.com](https://elegant.oncrashreboot.com).

## Future releases

As we write this blog post, the discussion on [how to tackle future releases][future_releases] is still on-going.

Right now, the discussion seems to go in the line of:

1. [2.0][] – All those fixes and features that do not require creating Pelican plugins or changes in Pelican code. This release will have updated documentation too.
1. [2.1][] – Make theme compatible with Pelican 4.
1. [3.0][] – Next generation Elegant – the biggest goal is to remove dependency on Bootstrap, to make it easier to maintain. 3.0.0 should have feature parity with 2.0.0.

[2.0]: https://github.com/Pelican-Elegant/elegant/milestone/3
[2.1]: https://github.com/Pelican-Elegant/elegant/milestone/5
[3.0]: https://github.com/Pelican-Elegant/elegant/milestone/4
[future_releases]: https://github.com/Pelican-Elegant/elegant/issues/192
