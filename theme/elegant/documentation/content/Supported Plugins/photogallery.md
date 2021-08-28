---
Title: Creating a Photo Gallery Article
Tags: pelican-theme, pelican-plugin, photo gallery
Category: Supported Plugins
Date: 2019-06-09 10:49
Slug: how-to-use-photos-plugin
Subtitle:
Summary: Elegant can be configured to provide a simple display of a series of images, usually photos. Instead of asking the article's author to manually add a link for each photo, this feature provides basic gallery behavior with almost no cost to the author.
Keywords: photos, gallery, photogallery
Authors: Talha Mansoor, Jack De Winter
---

[TOC]

In many cases, when an author writes an article and includes an image, there is a specific
reason that the image needs to be in that exact place. A good example of this is the image
at the end of this section, specifically part of this first section to give an early visual
on what visual change is contained within the article. However, in some cases, the author
wishes to provide a bit of preamble to a series of pictures, and then wants those pictures to
be displayed with little effort. This action is most frequently performed when an author
wants to share a series of photos on a given subject, similar to how they would display them
in a brick and mortar art gallery.

Elegant provides for a simple, yet effective photo gallery that displays thumbnails, one for
each member of a set of images. These sets of images are defined by specifying a directory
containing the set of images to present to the reader. If that reader is then interested in
viewing one or more of the full images, clicking on the respective thumbnail creates a window
the size of the browser to display the image in. That window has a number of simple controls,
such as a close button, a previous image button and a next image button.

Here is an example of what the Image Gallery section of such an article may look like:

![Photo Gallery Demonstration]({static}../images/elegant-theme_photo-gallery.png)

Note that the photo gallery itself will be placed at the end of any text presented for the
article.

## Configuration

To enable the Photo Gallery plugin, add `photos` to the `PLUGINS` configuration variable in
your Pelican configuration.

```python
PLUGINS = ['photos']
```

!!! note

    The [photos plugin](https://github.com/getpelican/pelican-plugins/blob/master/photos/README.md) requires the Python `pillow` package to be installed.

### Pelican on Windows

If you are running Pelican on a Windows machine, include the following configuration in your
`pelicanconf.py` file:

```Python
PHOTO_RESIZE_JOBS = -1
```

Due to known issues in the
[Windows implementation of Python](https://stackoverflow.com/questions/41385708/multiprocessing-example-giving-attributeerror)
dealing with multiprocessing, a function being called within a multiprocessing context must be
written to a specific pattern. Currently, the Photo Plugins has not been written to that
pattern. Setting the `PHOTO_RESIZE_JOBS` configuration variable to `-1`
circumvents this issue by forcing the photo processing code to work in debug mode on a single
thread without invoking any of the multiprocessing code.

## Article Metadata

Once the configuration for Photo Gallery is enabled in the configuration file, using this
feature for a given article requires that the article contains the `gallery`
[metadata]({filename}../Advanced Features/metadata.md) field value.

The text assigned to the `gallery` metadata field is the location of the directory where the
images to be displayed resides. This location is relative to the article in which the
`gallery` metadata field is placed.

```yaml
gallery: {filename}../gallery-source/dragondance
```

In the above example, the actual directory containing the images to display is the
`dragondance` directory. While not specified in the example, the directory `articles` and the
directory `gallery-source` are at the same directory depth, one directory to contain articles
and one directory to contain galleries. By that convention, the article containing the
`gallery` metadata is located in the the `articles` directory. Therefore, the path to the
directory containing the `dragondance` directory is `../gallery-source/`. Together, the entire
path to the `dragondance` directory from the article becomes `../gallery-source/dragondance`.

### Photo Gallery Titles

Titles for a photo gallery are displayed in a large font directly above the first row of the
photo gallery. To specify the title for a gallery, add the required title to the metadata in
the `gallery` metadata field within curly braces ('{' and '}') as follows:

```yaml
gallery: {filename}../gallery-source/dragondance{Dragon Dance}
```

### Multiple Photo Galleries in the Same Article

Multiple photo galleries can be display, in order, within a single article. This is
accomplished by specify a comma separated list of photo galleries to display in the `gallery`
metadata field. For example:

```yaml
gallery: {filename}../gallery-source/dragondance{Dragon Dance}, {filename}../gallery-source/hamsterdance{Hamster Dance}
```

will display the title `Dragon Dance`, the Dragon Dance photo gallery, the title
`Hamster Dance`, and finally the Hamster Dance photo gallery. The title of the specific
photo gallery is not required, but when including multiple galleries, is often desired.

# Advanced Configuration

!!! warning

    Processing a quantity of photos in the 10,000s range can take multiple hours to complete. To reduce the effort needed to publish photo galleries, the `Photo` plugin will only process images if the output file is not already present in the destination directory. For more information, please refer to the [Caching Image Processing]({filename}./photo-gallery-advanced.md#caching-processed-images).

Using the above configuration, a photo gallery will be added to the end of the article
containing the `gallery` metadata using default settings. For additional ways to use photo
galleries and for modifications to those default settings, please consult the sibling article
on
[Advanced Configuration]({filename}./photo-gallery-advanced.md)
.
