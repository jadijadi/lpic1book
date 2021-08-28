---
Title: Advanced Configuration for an Image Gallery Article
Tags: pelican-theme, pelican-plugin, photo gallery
Category: Supported Plugins
Date: 2019-06-09 10:49
Slug: how-to-use-photos-plugin-advanced
Subtitle:
Summary: Elegant can be configured to provide a simple display of a series of images, usually photos. Instead of asking the author to manually add a link for each photo, this feature provides basic gallery behavior at low cost to the author.
Keywords: photos, gallery, photogallery
Authors: Talha Mansoor, Jack De Winter
---

[TOC]

## Introduction

This article continues the documentation of the Photo Gallery configuration documented in the
article [Creating a Photo Gallery Article]({filename}./photogallery.md).

While getting started with a default photo gallery is relatively easy (one configuration
variable and a metadata field per article), enabling some of the more advanced features
requires a little more effort. This effort will allow for the inclusion of single gallery
photos into articles and the fine tuning of the image transformations used to render the
photos for the photo galleries and articles. Together these changes will give you the power
to customize your photo gallery to your requirements.

## Including Gallery Photos in Articles

Prior to including single gallery photos in articles, the `PHOTO_LIBRARY` configuration
variable must first be set to the full path of the directory containing all of the galleries.
For example, in the previous article,
[Creating a Photo Gallery Article]({filename}./photogallery.md#article-metadata),
the gallery was added to the article as follows:

```yaml
gallery: {filename}../gallery-source/dragondance
```

Assuming that you have installed a standard installation of Pelican in the directory
`/home/stuff/blog-content` and inferring from the above metadata that all photo galleries are
located in the `content/gallery-source` directory, the full path to the galleries should be as
follows:

```Python
PHOTO_LIBRARY = '/home/stuff/blog-content/website/content/gallery-source'
```

### Adding a Single Photos to an Article

Once the above configuration has been completed, add a photo into the body of an article using
the following format: `{photo}folder/image.jpg`. The `{photo}` part of the format calls out
this image as part of a gallery, and instructs the `Photos` plugin to resize a photo
specifically for use in articles. The `folder` part refers to the folder representing the
gallery, and the `image.jpg` is the filename of the photo within the `folder` directory.

For example, say you want to highlight one of the photos, `photo-1.jpg`, that was contained
within the `dragondance` gallery presented in your article. To include it in a Markdown
article, add the following text to the article:

```Markdown
![first image]({photo}dragondance/photo-1.jpg)
```

In addition, using the prefix `{lightbox}` instead of `{photo}` will cause the thumbnail of the
photo to be displayed in the article. Clicking on the thumbnail will bring up the full sized
image from the photo gallery, similar to how it was displayed in the photo gallery.

## Modifying Image Display in Galleries

There is a small amount of configuration that is available to modify how a single photo is
displayed in the galleries. These modifications include specifying captions for one or more
photos, specifying EXIF information for one or more photos, and specifying one or more photos
to not display as part of the gallery.

All three of these modifications are controlled by text files that are located in the same
source directory as the photos. These text files provide extra information that is used when
the article containing the specified photo gallery is being generated.

For the first two choices, there are two distinct files: `exif.txt` and `captions.txt`. In
both cases, the file format is simply the name of the image, a colon, and the information to
associate with the photo.

For example, the information in the `exif.txt` may be:

```text
best.jpg: Canon EOS 5D Mark II - 20mm f/8 1/250s ISO 100
```

and the information in the `captions.txt` file may be:

```text
best.jpg: My best photo ever! How lucky of me!
```

Elegant will display both of these pieces of information at the bottom of the popup for an
individual image.

To remove keep the photo file in a gallery, but not show it as part of the gallery, the
`blacklist.txt` file is used. Even simpler than the previous two files, the file format is
simply the name of the photo to exclude, one photo to a line.

For example, to keep the file `this-file-will-be-skipped.jpg` in the gallery directory but not
display it as part of the gallery, the `blacklist.txt` file would look like this:

```text
this-file-will-be-skipped.jpg
```

## Caching Processed Images

To reduce the need to reprocess images to fit into the gallery, article, and thumbnail sizes,
the `Photo` plugin only processes images if the output file is not already present in the
destination directory. As such, to apply any configuration changes to images that have already
been processed, their destination images need to deleted from the relevant directories under
the `photos` directory from the Pelican output.

As both of the following sections change configuration variables that affect how the images
are processed, this note on caching applies to any changes of configuration variables
specified in the following sections.

## Advanced Configuration Values

The definitive list of the values and their defaults is located on the
[Photos Plugins](https://github.com/getpelican/pelican-plugins/blob/master/photos/README.md)
webpage.

The definitive list has been pared down, tested, and documented with specific focus on the
Elegant theme. Testing was performed using the list from the Photos Plugin webpage along
with the source code for the Photos Plugin. Any significant difference between the behavior
documented below and the definitive list is usually attributed to differences between the
source code and the documentation for the Photos Plugin.

As a decent part of this information is presented after testing and research, please feel free
to contact us if you see different behavior than is documented here.

| Configuration Name           | Default Value     | Description                                                                                                                                                                                                                                                                                                                              |
| ---------------------------- | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `PHOTO_GALLERY`              | `(1024, 768, 80)` | Three attributes, describing the maximum width, the maximum height, and the quality of the resized image. The specific set of attributes applies to the maximum size of the photo displayed when the reader clicks on a gallery's thumbnail image in the article. Note that the quality of the resized image only applies to JPG images. |
| `PHOTO_ARTICLE`              | `(760, 506, 80)`  | The same attributes as `PHOTO_GALLERY`, but for the size of a photo from a gallery used in an article.                                                                                                                                                                                                                                   |
| `PHOTO_THUMB`                | `(192, 144, 60)`  | The same attributes as `PHOTO_GALLERY`, but for the size of the thumbnails used to show the contents of the gallery.                                                                                                                                                                                                                     |
| `PHOTO_SQUARE_THUMB`         | `False`           | This setting controls whether or not the thumbnails retain their aspect ratio when resized. If this setting is `True`, the thumbnails will not retain their aspect ratio and will be cropped to fit into the rectangle defined by the `PHOTO_THUMB` configuration variable.                                                              |
| `PHOTO_RESIZE_JOBS`          | `1`               | Number of resize jobs to be run in parallel. If installed on a Windows machine, [read this]({filename}./photogallery.md#pelican-on-windows).                                                                                                                                                                                             |
| `PHOTO_WATERMARK`            | `True`            | Add a watermark to all photos in articles and pages. The watermarks added are controlled by the `PHOTO_WATERMARK_TEXT` and `PHOTO_WATERMARK_IMG` configuration variables described below. Note that if both are specified, both will be used.                                                                                            |
| `PHOTO_WATERMARK_TEXT`       | `SITENAME`        | Text to use for the watermark.                                                                                                                                                                                                                                                                                                           |
| `PHOTO_WATERMARK_TEXT_COLOR` | `(255, 255, 255)` | Color of the text used for the watermark.                                                                                                                                                                                                                                                                                                |
| `PHOTO_WATERMARK_IMG`        | `''`              | Full path to the image to use as a watermark.                                                                                                                                                                                                                                                                                            |
| `PHOTO_WATERMARK_IMG_SIZE`   | `False`           | Size to apply to the watermark image, expressed as `(width,height)`.                                                                                                                                                                                                                                                                     |

### JPG Specific EXIF Configuration Values

!!! note

    The [photos plugin](https://github.com/getpelican/pelican-plugins/blob/master/photos/README.md) requires the Python `piexif` package to provide control over any [EXIF](https://photographylife.com/what-is-exif-data) information in the images.

| Configuration Name            | Default Value | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ----------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `PHOTO_EXIF_KEEP`             | `False`       | Keep the EXIF information from the input photo.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `PHOTO_EXIF_REMOVE_GPS`       | `False`       | Remove any EXIF GPS information from the photos.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `PHOTO_EXIF_AUTOROTATE`       | `True`        | Use the EXIF orientation field to determine how to rotate the photo so all photos are in a standard orientation.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `PHOTO_EXIF_COPYRIGHT`        | `False`       | If not `False` and no existing copyright information is provided in the image, attach an author and license to the file. Choices include: - COPYRIGHT, [CC0](https://creativecommons.org/share-your-work/public-domain/cc0/), [CC-BY-NC-ND](https://creativecommons.org/licenses/by-nc-nd/2.0/), [CC-BY-NC-SA](https://creativecommons.org/licenses/by-nc-sa/3.0/), [CC-BY](https://creativecommons.org/licenses/by/4.0), [CC-BY-SA](https://creativecommons.org/licenses/by-sa/4.0), [CC-BY-NC](https://creativecommons.org/licenses/by-nc/4.0/), [CC-BY-ND](https://creativecommons.org/licenses/by-nd/4.0) |
| `PHOTO_EXIF_COPYRIGHT_AUTHOR` | `SITENAME`    | If `PHOTO_EXIF_COPYRIGHT` is not `False` and no copyright author is present in the image, use this value as the author.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
