---
Title: Code Snippets -- Theme
Tags: markdown, reST, code-snippets, gist
Date: 2013-08-27 23:20
comments: false
Slug: code-snippets-theme
authors: Talha Mansoor
Category: Components
---

Elegant uses [Pygment port](https://github.com/daveyarwood/gruvbox-pygments)
of [Gruvbox](https://github.com/morhetz/gruvbox) theme for syntax highlighting.

    #!c
    int sample_function (void) {
        printf ("This is a sample function");
        return 0
    }

## HTML Example

```html
<div
  class="elegant-gallery"
  itemscope
  itemtype="http://schema.org/ImageGallery"
>
  <figure
    itemprop="associatedMedia"
    itemscope
    itemtype="http://schema.org/ImageObject"
  >
    <a
      href="https://i.picsum.photos/id/1019/5472/3648.jpg"
      itemprop="contentUrl"
      data-size="5472x3648"
    >
      <img
        src="https://i.picsum.photos/id/1019/100/100.jpg"
        itemprop="thumbnail"
        alt="Image description"
      />
    </a>
    <figcaption itemprop="caption description">
      Placeholder image from Unsplash
    </figcaption>
  </figure>

  <figure
    itemprop="associatedMedia"
    itemscope
    itemtype="http://schema.org/ImageObject"
  >
    <a
      href="https://i.picsum.photos/id/101/2621/1747.jpg"
      itemprop="contentUrl"
      data-size="2621x1747"
    >
      <img
        src="https://i.picsum.photos/id/101/100/100.jpg"
        itemprop="thumbnail"
        alt="Image description"
      />
    </a>
    <figcaption itemprop="caption description">
      You can write anything in the caption
    </figcaption>
  </figure>
</div>
```

## C++ example

```cpp
#include <algorithm>
#include <iostream>
#include <vector>

int main() {
  std::vector<int> eg = {0,  1,  1,  2,  3,   5,   8,   13,
                         21, 34, 55, 89, 144, 233, 377, 610};
  eg.erase(std::remove_if(
              eg.begin(),
              eg.end(),
              [](int x) {
                  return x > 99;
              }),
           eg.end());

  // Print result
  std::for_each(eg.begin(),
                eg.end(),
                [](const int &e) {
                    std::cout << e << " ";
                });
}
```
