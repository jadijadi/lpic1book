Title: 102.4 Use Debian package management
Date: 2010-12-03 10:20
Category: LPIC1
Tags: LPIC1, 101, LPIC1-101-500
Authors: Jadi
Summary: Candidates should be able to perform package management using the Debian package tools.
sortorder: 090

_Weight: 3_

Candidates should be able to perform package management using the Debian package tools.

* Install, upgrade and uninstall Debian binary packages.
* Find packages containing specific files or libraries which may or may not be installed.
* Obtain package information like version, content, dependencies, package integrity, and installation status \(Whether or not the package is installed\).
* Awareness of apt.

## Terms and Utilities

* `/etc/apt/sources.list`
* dpkg
* dpkg-reconfigure
* apt-get
* apt-cache

## Concept of the package management system

<iframe width="560" height="315" src="https://www.youtube.com/embed/jtwbweigRxo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Some people think that on GNU/Linux we have to compile all the software we need manually. This is not the case in 99% of cases and never has been the case in the last 20 years. GNU/Linux is the predecessor of what we call the App Store these days. All major distros do have huge archives of pre-compiled software called their _repositories_ and some kind of a **package manager** software that takes care of searching these repositories, installing software from them, finding dependencies, installing them, resolving conflicts, and updating the system and installed software. Debian-based distros use `.deb` files as their "packages" and use tools like `apt-get`, `dpkg`, `apt`, and other tools to manage them.

Debian packages are names like `NAME-VERSION-RELEASE_ARCHITECTURE.deb`; Say `tmux_3.2a-4build1_amd64.deb`. 



## Repositories
But where did this package come from? How does the OS know where to look for this deb package? The answer is **Repositories**. Each distro has its repository of packages. It can be on a Disk, A network drive, a collection of DVDs, or most commonly, a network address on the Internet. 

On debian systems, the main configuration locations are:
* `/etc/apt/sources.list`
* `/etc/apt/sources.list.d/`

```text
jadi@lpicjadi:~$ cat /etc/apt/sources.list
#deb cdrom:[Ubuntu 22.04 LTS _Jammy Jellyfish_ - Beta amd64 (20220329.1)]/ jammy main restricted

# See http://help.ubuntu.com/community/UpgradeNotes for how to upgrade to
# newer versions of the distribution.
deb http://us.archive.ubuntu.com/ubuntu/ jammy main restricted
# deb-src http://us.archive.ubuntu.com/ubuntu/ jammy main restricted

## Major bug fix updates produced after the final release of the
## distribution.
deb http://us.archive.ubuntu.com/ubuntu/ jammy-updates main restricted
# deb-src http://us.archive.ubuntu.com/ubuntu/ jammy-updates main restricted

## N.B. software from this repository is ENTIRELY UNSUPPORTED by the Ubuntu
## team. Also, please note that software in the universe WILL NOT receive any
## review or updates from the Ubuntu security team.
deb http://us.archive.ubuntu.com/ubuntu/ jammy universe
# deb-src http://us.archive.ubuntu.com/ubuntu/ jammy universe
deb http://us.archive.ubuntu.com/ubuntu/ jammy-updates universe
# deb-src http://us.archive.ubuntu.com/ubuntu/ jammy-updates universe

## N.B. software from this repository is ENTIRELY UNSUPPORTED by the Ubuntu
## team, and may not be under a free license. Please satisfy yourself as to
## your rights to use the software. Also, please note that the software in
## multiverse WILL NOT receive any review or updates from the Ubuntu
## security team.
deb http://us.archive.ubuntu.com/ubuntu/ jammy multiverse
# deb-src http://us.archive.ubuntu.com/ubuntu/ jammy multiverse
deb http://us.archive.ubuntu.com/ubuntu/ jammy-updates multiverse
# deb-src http://us.archive.ubuntu.com/ubuntu/ jammy-updates multiverse

## N.B. software from this repository may not have been tested as
## extensively as that contained in the main release, although it includes
## newer versions of some applications which may provide useful features.
## Also, please note that software in backports WILL NOT receive any review
## or updates from the Ubuntu security team.
deb http://us.archive.ubuntu.com/ubuntu/ jammy-backports main restricted universe multiverse
# deb-src http://us.archive.ubuntu.com/ubuntu/ jammy-backports main restricted universe multiverse

deb http://security.ubuntu.com/ubuntu jammy-security main restricted
# deb-src http://security.ubuntu.com/ubuntu jammy-security main restricted
deb http://security.ubuntu.com/ubuntu jammy-security universe
# deb-src http://security.ubuntu.com/ubuntu jammy-security universe
deb http://security.ubuntu.com/ubuntu jammy-security multiverse
# deb-src http://security.ubuntu.com/ubuntu jammy-security multiverse

# This system was installed using small removable media
# (e.g. netinst, live or single CD). The matching "deb cdrom"
# entries were disabled at the end of the installation process.
# For information about how to configure apt package sources,
# see the sources.list(5) manual.
```

Updating sources information:

```text
apt-get update
```
This will check all the sources in the configs and update the information about the latest software available there.

> This won't actually _Upgrade_ the software. The *Update* will only *Update the information about the packages and not the packages themselves*.

## Installing packages

<iframe width="560" height="315" src="https://www.youtube.com/embed/IBnxIX_WceI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Say you have heard about this amazing terminal multiplexer called `tmux` and you want to give it a try.

```text
$ tmux
The program 'tmux' is currently not installed. You can install it by typing:
sudo apt-get install tmux
$ which tmux
$ type tmux
bash: type: tmux: not found
```

So let's install it. If it's in the repositories it's enough to tell the package manager to install it:

```text
apt-get install tmux
```

Note that

* apt-get install asked for confirmation \(Y\)
* apt-get resolved _dependencies_, It knows what is needed to install this package and installs them
* Debian packages are something.deb

If you only want a dry-run/simulation:

```text
apt-get install -s tmux
```

and this will only download the files needed into the cache without installing them:

```text
apt-get install --download-only tmux
```

The downloaded packages are stored as a cache in `/var/cache/apt/archive/`.

If you want to download only one specific package, you can do:

```
apt-get download tmux
```
## Removing debian packages

```text
apt-get remove tmux
```

And if you want to remove automatically installed dependencies:

```text
$ apt-get autoremove tmux
```

or even

```text
$ apt-get autoremove
Reading package lists... Done
Building dependency tree       
Reading state information... Done
The following packages will be REMOVED:
  linux-image-3.16.0-25-generic linux-image-extra-3.16.0-25-generic
0 upgraded, 0 newly installed, 2 to remove, and 0 not upgraded.
After this operation, 203 MB of disk space will be freed.
Do you want to continue? [Y/n] y
```

To autoremove whatever is not needed anymore.

Notes:

* Removing a package will not remove its dependencies
* If removing a dependency, you'll get a warning about what will be removed alongside this package

## Searching for packages
If you are using the apt suit, the search is done via `apt-cache` or you can use the general `apt`. 

```text
$ apt-cache search "tiny window"
$ apt search grub2
```

## Upgrading

For updating a single package:

```text
apt-get install tzdata
```

And for upgrading whatever is installed:

```text
apt-get upgrade
```

Or going to a new distribution:

```text
apt-get dist-upgrade
```

Note: like most other tools, you can configure the default configs at `/etc/apt/apt.conf` and there is a program apt-config for this purpose.

## Reconfiguring packages

Debian packages can have _configuration actions_ that will take after the package is installed. This is done by `debconf`. For example, tzdata will ask you about the timezone settings after you installed it. If you want to *reconfigure* a package that is already installed, you can use the `dpkg-reconfigure`:

```text
 dpkg-reconfigure tzdata
```

## Package information with dpkg

The underlying tool to work with `.deb` files is the `dpkg`. It is your to-go tool if you want to do manual actions on a deb package. The general format is:

```
dpkg [OPTIONS] ACTION PACKAGE
```

Some common actions are:

|Switch|Description|
|-|-|
|-c or --contents| Show the contents of a package|
|-C or --audit| Search for broken installed packages and propose solutions |
|--configure| Reconfigure an installed package|
|-i or --install| Install or Upgrade a package; Wont resolve / install dependencies|
|-I or --info| Show Info|
|-l or --list| List all installed pckages|
|-L or --listfiles | List all files related to this package|
|-P or --purge| Remove the package and its configuration files|
|-r or --remove| Remove the package; Keep the configurations|
|-s or --status| Display status of a package|
|-S or --search| Search and see which package owns this file|

You can check the contents:

```
jadi@lpicjadi:/tmp$ dpkg --contents bzr_2.7.0+bzr6622+brz_all.deb
drwxr-xr-x root/root         0 2019-09-19 18:25 ./
drwxr-xr-x root/root         0 2019-09-19 18:25 ./usr/
drwxr-xr-x root/root         0 2019-09-19 18:25 ./usr/share/
drwxr-xr-x root/root         0 2019-09-19 18:25 ./usr/share/doc/
drwxr-xr-x root/root         0 2019-09-19 18:25 ./usr/share/doc/bzr/
-rw-r--r-- root/root       404 2019-09-19 18:25 ./usr/share/doc/bzr/NEWS.Debian.gz
-rw-r--r-- root/root      1301 2019-09-19 18:25 ./usr/share/doc/bzr/changelog.gz
-rw-r--r-- root/root      1769 2019-09-19 18:25 ./usr/share/doc/bzr/copyright
```

Or install a deb package (without its dependencies) or check its status:

```text
$ dpkg -s bzr
Package: bzr
Status: deinstall ok config-files
Priority: optional
Section: vcs
Installed-Size: 102
Maintainer: Ubuntu Developers <ubuntu-devel-discuss@lists.ubuntu.com>
Architecture: all
Version: 2.6.0+bzr6595-1ubuntu1
Config-Version: 2.6.0+bzr6595-1ubuntu1
Depends: python-bzrlib (<= 2.6.0+bzr6595-1ubuntu1.1~), python-bzrlib (>= 2.6.0+bzr6595-1ubuntu1), python:any
Recommends: python-gpgme
Suggests: bzr-doc, bzrtools, python-bzrlib.tests
Breaks: bzr-pqm (<< 1.4.0~bzr80), bzr-xmloutput (<< 0.8.8+bzr160), python-bzrlib (<< 2.4.0~beta3~)
Conffiles:
 /etc/bash_completion.d/bzr b8d9ca95521a7c5f14860e205a854da2
Description: easy to use distributed version control system
 Bazaar is a distributed version control system designed to be easy to
 use and intuitive, able to adapt to many workflows, reliable, and
 easily extendable.
 .
 Publishing of branches can be done over plain HTTP, that is, no special
 software is needed on the server to host Bazaar branches. Branches can
 be pushed to the server via sftp (which most SSH installations come
 with), FTP, or over a custom and faster protocol if bzr is installed in
 the remote end.
 .
 Merging in Bazaar is easy, as the implementation can avoid many
 spurious conflicts deals well with repeated merges between branches,
 and can handle modifications to renamed files correctly.
 .
 Bazaar is written in Python and has a flexible plugin interface that
 can be used to extend its functionality. Many plugins exist, providing
 useful commands (bzrtools), graphical interfaces (qbzr), or native
 interaction with Subversion branches (bzr-svn).
 .
 Install python-paramiko if you are going to push branches to remote
 hosts with sftp, and python-pycurl if you'd like SSL certificates
 always to be verified.
Homepage: http://bazaar-vcs.org
Original-Maintainer: Debian Bazaar Maintainers <pkg-bazaar-maint@lists.alioth.debian.org>
```
Or even **purge** an installed package; Removing the package and all of its configurations. To Purge a package, use the **-P** or **--purge** switch.

There is also **-L** to check the files and directories a package installed:

```text
$ dpkg -L bzr
/.
/usr
/usr/bin
/usr/bin/jcal
/usr/share
/usr/share/doc
/usr/share/doc/jcal
/usr/share/doc/jcal/README
/usr/share/doc/jcal/copyright
/usr/share/man
/usr/share/man/man1
/usr/share/man/man1/jcal.1.gz
/usr/share/doc/jcal/changelog.Debian.gz
```

and **-S** will show which package installed the given file:

```text
$ dpkg -S /var/lib/mplayer/prefs/mirrors
mplayer: /var/lib/mplayer/prefs/mirrors
```


## Common apt-get options
|Option|Usage|
|-|-|
|autoclean|Removes unused packages|
|check|Check db for issues|
|clean|Clean the DB, you can do a `clean all` to clean everything and start afresh|
|dist-upgrade|Checks for new versions of the OS; Major upgrade|
|install|Install or upgrade packages|
|remove|Removes a package|
|source|Install the source of a package|
|update|Updates the information about packages from repositories|
|upgrade|Upgrades all packages|

> In some cases a package is installed but without proper dependencies (say using `dpkg`) or an installation is interrupted for any reason. In these cases a `apt-get install -f` might help, `-f` is for `fix broken`. 
## Common apt-cache options

|Option|Usage|
|-|-|
|depends|Show dependencies|
|pkgnames|Shows all installed packages|
|search|Search|
|showpkg|Show information about a package|
|stats|Show statistics|
|unmet|Show unmet dependencies for all installed packages or the one you specified|


## Other tools
There are even more tools, the tools with fancy GUIs or text-based tools and user interface tools like `aptitude`.
