---
Title: Updating Elegant To the Latest Release
Tags: pelican-theme, new-releases
Category: 101 — Quick Start
Date: 2019-12-06
Slug: updating-elegant-to-the-latest-release
Comment_id: qryv67o-updating-elegant-to-the-latest-release
authors: Jack De Winter
---

Once you have determined that you want to update to the latest release of Elegant, the
process is usually quite simple. There are wo main ways to get the Elegant theme: as
a standalone repository and as part of the Pelican-Themes repository.

## Via the Pelican-Themes Repository

If you installed the Elegant theme as part of the Pelican-Themes repository, all of
the themes available in that project will be located at a level one down from the
directory where you installed the repository into. For example, if you installed
the repository with the following command:

```bash
git clone --recursive https://github.com/getpelican/pelican-themes ../blog-themes
cd ../blog-themes
git submodule update --init elegant
git submodule update --remote elegant
```

it installed every theme known to the project in the current directory where the command
was executed from. Along with (at last count) 125 other themes, the Elegant theme is
located under the `elegant` directory.

## Replacing With the Pelican-Themes Repository

The Elegant theme is included into the Pelican-Themes project by using a git concept
called sub-modules. Because of the ways that sub-modules work, if you want to update
one sub-module in a project, it is almost always desired to remove the sub-module that
you want to update and clone it in again. This is accomplished with the following script:

```bash
rm -rf ../blog-themes/elegant
git clone --jobs 8 --recurse-submodules --depth 1 --shallow-submodules https://github.com/Pelican-Elegant/elegant.git ../blog-themes/elegant
```

Assuming the `blog-themes` directory is at the same level as your Pelican directory, the
script removes the Elegant directory under the `blog-themes` directory, only to recreate
it using the `git clone` command on the next line.

Note that this also has the benefit of updating your Elegant theme to the latest theme
based on Elegant's repository, instead of relying on the Pelican-Themes repository.
There is often a lag between when a release is made in Elegant's repository and when
it is available "automatically" through the Pelican-Themes repository. By using this
method of updating the repository, you keep the directory structure of the Pelican-Themes
repository while making sure you have the latest release of Elegant.

## Via a Standalone Repository

If you installed the Elegant theme as a standalone repository, you most likely followed
directions like the following to clone the Elegant repository:

```bash
mkdir ../blog-theme/Elegant
git clone https://github.com/Pelican-Elegant/elegant ../blog-theme/Elegant
```

For this example, the assumption is that the Pelican directory where your website is
stored is at the same level as the `blog-theme` directory. As such, the `../blog-theme`
part of the path gets us to the theme part of the directory tree. It is possible to just
leave the path at that, but it is recommended to add the `/Elegant` at the end as a
reminder of the repository name.

If the Elegant theme was installed in this manner, you can either update your local
repository or recreate your repository as noted in the following two sections.

### Updating a Standalone Theme

The `master` branch of Elegant's Git repository always contains the latest release. To
update to that release, go into the Elegant theme directory (`../blog-theme/Elegant`
from the example above), and enter the following command.

```bash
git pull origin master
```

Note that this is the most effective way of updating your standalone repository if you
have not made any changes to the the theme. If you have made some changes, you may be
required to merge the changes in your local repository with any changes in the release
version you pulled down with this command.

### Recreate a Standalone Theme

If you are lucky, you will not reach a time where you believe, even a tiny bit, that you
have messed up the contents of your theme repository. If you have made any changes to the
base Elegant theme, it is inevitable that at some point you will need to reset the
repository to a known good state. Assuming that the repository is in the directory
`../blog-theme/Elegant`, per the example above, executing the following command:

```bash
rmdir -rf ../blog-theme/Elegant
```

will remove the entire theme from your local system. Once this is done, you can follow
the clone directions in the example at the top of this section on standalone
repositories to restore the Elegant theme directory to the same state as Elegant's
master branch on GitHub.

### Using The Tasks Framework

!!! warning "Windows Users"

    The tasks framework is set up with commands for a Linux system. If you intend to use the tasks framework on your Windows system, a number of changes will be required.  If you feel like helping us out with this, we will gladly accept a PR to address this!

If you are using the Python `invoke` framework, then this work is already done for you by
using the `theme_sync` task in `documentation/tasks.py` file. The `invoke` package can
be installed in the usual manner:

```bash
pip install invoke
```

Once installed, typing `invoke theme_sync` will execute that task as defined in the
file `tasks.py` as follows:

```Python
@task
def theme_sync(c):
    """Make a fresh shallow copy of pelican-elegant theme"""
    c.run("rm -rf themes")
    c.run(
        "git clone --jobs 8 --recurse-submodules --depth 1 --shallow-submodules https://github.com/Pelican-Elegant/elegant.git themes/elegant"
    )
```

Note that this script makes a couple of assumptions about where you are invoking the
task from and where you have your themes stored. If you are okay with that, give it a
try!
