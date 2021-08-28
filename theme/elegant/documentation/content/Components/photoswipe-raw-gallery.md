---
Title: Gallery -- Use PhotoSwipe For Your Image Gallery
authors: Talha Mansoor
Tags: nuances, images, gallery
Date: 2020-02-02
comments: false
Slug: photoswipe-gallery-using-raw-html
Category: Components
---

Elegant integrates with [PhotoSwipe](https://photoswipe.com/) to create gallery of images. Here is an example.

<div class="elegant-gallery" itemscope itemtype="http://schema.org/ImageGallery">
    <figure itemprop="associatedMedia" itemscope itemtype="http://schema.org/ImageObject">
        <a href="https://i.picsum.photos/id/1019/5472/3648.jpg" itemprop="contentUrl" data-size="5472x3648">
            <img src="https://i.picsum.photos/id/1019/200/200.jpg" itemprop="thumbnail" alt="Image description" />
        </a>
        <figcaption itemprop="caption description">Placeholder image from Unsplash</figcaption>
    </figure>

    <figure itemprop="associatedMedia" itemscope itemtype="http://schema.org/ImageObject">
        <a href="https://i.picsum.photos/id/101/2621/1747.jpg" itemprop="contentUrl" data-size="2621x1747">
            <img src="https://i.picsum.photos/id/101/200/200.jpg" itemprop="thumbnail" alt="Image description" />
        </a>
        <figcaption itemprop="caption description">You can write anything in the caption</figcaption>
    </figure>

    <figure itemprop="associatedMedia" itemscope itemtype="http://schema.org/ImageObject">
        <a href="https://i.picsum.photos/id/1015/6000/4000.jpg" itemprop="contentUrl" data-size="6000x4000">
            <img src="https://i.picsum.photos/id/1015/200/200.jpg" itemprop="thumbnail" alt="Image description" />
        </a>
        <figcaption itemprop="caption description">You can use <i>HTML</i> <a href="https://picsum.photos/" target="_blank" rel="nofollow noopener noreferrer" >Unsplash</a></figcaption>
    </figure>

    <figure itemprop="associatedMedia" itemscope itemtype="http://schema.org/ImageObject">
        <a href="https://i.picsum.photos/id/127/4032/2272.jpg" itemprop="contentUrl" data-size="4032x2272">
            <img src="https://i.picsum.photos/id/127/200/200.jpg" itemprop="thumbnail" alt="Image description" />
        </a>
        <figcaption itemprop="caption description">Another sample image</figcaption>
    </figure>
    <figure itemprop="associatedMedia" itemscope itemtype="http://schema.org/ImageObject">
        <a href="https://i.picsum.photos/id/103/2592/1936.jpg" itemprop="contentUrl" data-size="2592x1936">
            <img src="https://i.picsum.photos/id/103/200/200.jpg" itemprop="thumbnail" alt="Image description" />
        </a>
        <figcaption itemprop="caption description">Last sample image</figcaption>
    </figure>

</div>

To use it, you will have to add raw HTML in your markdown file.

Here is the require HTML with two images in it.

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

<div class="elegant-gallery" itemscope itemtype="http://schema.org/ImageGallery">
 <figure itemprop="associatedMedia" itemscope itemtype="http://schema.org/ImageObject">
  <a href="https://i.picsum.photos/id/1019/5472/3648.jpg" itemprop="contentUrl" data-size="5472x3648">
   <img src="https://i.picsum.photos/id/1019/100/100.jpg" itemprop="thumbnail" alt="Image description" />
  </a>
  <figcaption itemprop="caption description">Placeholder image from Unsplash</figcaption>
 </figure>

 <figure itemprop="associatedMedia" itemscope itemtype="http://schema.org/ImageObject">
  <a href="https://i.picsum.photos/id/101/2621/1747.jpg" itemprop="contentUrl" data-size="2621x1747">
   <img src="https://i.picsum.photos/id/101/100/100.jpg" itemprop="thumbnail" alt="Image description" />
  </a>
  <figcaption itemprop="caption description">You can write anything in the caption</figcaption>
 </figure>
</div>

## Define a `div`

```html
<div
  class="elegant-gallery"
  itemscope
  itemtype="http://schema.org/ImageGallery"
></div>
```

Notice the class, `elegant-gallery`. You should not change it.

## Define `figure`

Place it inside the `div` defined above.

```html
<figure
  itemprop="associatedMedia"
  itemscope
  itemtype="http://schema.org/ImageObject"
></figure>
```

## Link to your image

Place it inside the `figure`.

```html
<a
  href="https://i.picsum.photos/id/1019/5472/3648.jpg"
  itemprop="contentUrl"
  data-size="5472x3648"
>
</a>
```

`data-size` is important. It should have the correct width and height of the image.

## Add the thumbnail

Create a thumbnail of your image and then place link to it inside the `<a>` you create above.

```html
<img
  src="https://i.picsum.photos/id/1019/100/100.jpg"
  itemprop="thumbnail"
  alt="Image description"
/>
```

This is it. Your gallery should start working.

## Define caption

You can also define the caption of your image using `figcaption`. You must place it inside the `figure` tag.

```htmk
<figcaption
  itemprop="caption description"
>
  You can write anything in the caption
</figcaption>
```

You can use HTML inside the `figcaption`.

!!! Attention "Developer Required"

    Ideally, a Pelican plugin should generate this raw HTML, but at the time of writing, such a plugin does not exist.

    If you create such a plugin, then [let us know](https://github.com/Pelican-Elegant/elegant/issues). It will be a big help to thousands of Pelican users.

    The plugin, should create a thumbnail of the image, read size of the image, and then generate the required raw HTML, which then gets inserted into
    `article.content` or `page.content`.

    The user should be able to insert more than one galleries in the article, at any place. (Currently, the [Photos plugin](https://github.com/getpelican/pelican-plugins/tree/master/photos) forces themes to append gallery in the bottom of the article.)

    Finally, let the user define gallery images and their captions inside an article in a friendly and easy way. Like, as YAML or JSON inside the markdown.
