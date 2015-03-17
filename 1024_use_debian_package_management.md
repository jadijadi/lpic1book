# 102.4. Use Debian package management 

*weight: 3*

Candidates should be able to perform package management using the Debian package tools.

- Install, upgrade and uninstall Debian binary packages.
- Find packages containing specific files or libraries which may or may not be installed.
- Obtain package information like version, content, dependencies, package integrity and installation status (whether or not the package is installed).

- /etc/apt/sources.list
- dpkg
- dpkg-reconfigure
- apt-get
- apt-cache
- aptitude

## Concept of the package management system
Linux used to be based on compiling source code but then Distributions arrived. Most distributions have their own Package Manager for installing pre-build programs from defined *repositories*. Debian based distros use .deb files with apt, dpkg, aptitude and Fedora, RedHat, RHEL, SUSE, .. use RPM and Yum package managers.

## Installing packages

We do not have "bzr" installed.

````
jadi@funlife:~/w/lpic/101$ bzr
The program 'bzr' is currently not installed. You can install it by typing:
sudo apt-get install bzr
jadi@funlife:~/w/lpic/101$ which bzr
jadi@funlife:~/w/lpic/101$ type bzr
bash: type: bzr: not found
````

so lets install it. If we have the .deb file:

     apt-get install bzr

note that
- apt-get install asked for confirmation (Y)
- apt-get resolved *dependencies*, it know what is needed to install this package and installs them
- debian packages are something.deb 

    bzr

if you only want a dry-run / simulation:

    apt-get install -s bzr

and this will only download the files without installing them:

    apt-get install --download-only bzr

(or you can use -d instead).

## Package location 
where these packages come from? from a **Repository** of different **Repositories** which are defined at /etc/apt/sources.list file and files located at /etc/apt/sources.list.d/ in the form of:

````
$ cat /etc/apt/sources.list

deb http://ir.archive.ubuntu.com/ubuntu/ utopic-updates multiverse

## N.B. software from this repository may not have been tested as
## extensively as that contained in the main release, although it includes
## newer versions of some applications which may provide useful features.
## Also, please note that software in backports WILL NOT receive any review
## or updates from the Ubuntu security team.
deb http://ir.archive.ubuntu.com/ubuntu/ utopic-backports main restricted universe multiverse

deb http://security.ubuntu.com/ubuntu utopic-security main restricted
deb http://security.ubuntu.com/ubuntu utopic-security universe
deb http://security.ubuntu.com/ubuntu utopic-security multiverse
````

Updating sources information:

    apt-get update

## Removing debian packages

    apt-get remove bzr

and if you want to remove automatically installed dependencies:

````
$ apt-get autoremove bzr
````

or even

````
$ apt-get autoremove
Reading package lists... Done
Building dependency tree       
Reading state information... Done
The following packages will be REMOVED:
  linux-image-3.16.0-25-generic linux-image-extra-3.16.0-25-generic
0 upgraded, 0 newly installed, 2 to remove and 0 not upgraded.
After this operation, 203 MB disk space will be freed.
Do you want to continue? [Y/n] y

````

Notes: 
- removing a package will not remove its dependencies
- if removing a dependency, you'll get a warning about what will be removed alongside this package


## searching for packages
````
$ apt-cache search "tiny window"
$ aptitude search grub2
````

## Updating
for updating a single package

    apt-get install tzdata

and for upgrading whatever installed:

    apt-get upgrade

or going to a new distribution:

    apt-get dist-upgrade

Note: as most other tools, you can configure the default configs at /etc/apt/apt.conf and there is a program apt-config for this purpose.

## reconfiguring packages

A program called debconf configures packages after they are installed. you can reconfigure a package (say tzdata) using 

     dpkg-reconfigure tzdata

## package information with dpkg
dpkg is a very powerful tool for working with .deb package files. If you want to see what is inside a .deb file:

````
$ dpkg --contents bzr_2.6.0+bzr6595-1ubuntu1_all.deb 
drwxr-xr-x root/root         0 2014-05-02 18:16 ./
drwxr-xr-x root/root         0 2014-05-02 18:15 ./etc/
drwxr-xr-x root/root         0 2014-05-02 18:15 ./etc/bash_completion.d/
-rw-r--r-- root/root      1467 2010-04-22 11:31 ./etc/bash_completion.d/bzr
...
...
````

another apt tool is dpkg. dpkg can install, remove, configure and query packages and as always the config is at /etc/dpkg/dpkg.cfg and uses /var/lib/dpkg tree . the most important switch is **-s** for **status**. 

````
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
 Merging in Bazaar is easy, as the implementation is able to avoid many
 spurious conflicts, deals well with repeated merges between branches,
 and is able to handle modifications to renamed files correctly.
 .
 Bazaar is written in Python, and has a flexible plugin interface which
 can be used to extend its functionality. Many plugins exist, providing
 useful commands (bzrtools), graphical interfaces (qbzr), or native
 interaction with Subversion branches (bzr-svn).
 .
 Install python-paramiko if you are going to push branches to remote
 hosts with sftp, and python-pycurl if you'd like for SSL certificates
 always to be verified.
Homepage: http://bazaar-vcs.org
Original-Maintainer: Debian Bazaar Maintainers <pkg-bazaar-maint@lists.alioth.debian.org>
````

another command is **purge** which will remove the package and all of its configurations.. the switch is **-P** or **--purge**.

There is also **-L** to check the files and directories a package intalled:

````
$ dpkg -L jcal 
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
````

and **-S** will show which package installed the given file:

````
$ dpkg -S /var/lib/mplayer/prefs/mirrors 
mplayer: /var/lib/mplayer/prefs/mirrors
````

Note: you can also use ````which```` for finding out what file will be used on any given command:

````
jadi@funlife:~/w/lpic/101$ which java
/usr/bin/java
````

## aptitude
is a newer tool for managing files. It can be used like this:

````
$ aptitude install jcal
$ aptitude remove jcal
$ aptitude search cal 
$ aptitude show bzr 
````

or it can also be used as a standalone program:

![aptitude sample](http://www.ibm.com/developerworks/linux/library/l-lpic1-v3-102-4/fig-102-4-2.gif)

## other tools
there is gui tools like "synaptic" and "update manager". These will Searck, Update, Upgrade, Install, Remove via a graphical user interface and are present in many distributions. This is ubuntu software center:

![Ubuntu Software Center](http://screenshots.debian.net/screenshots/s/software-center/10674_large.png)

and this is a software updater GUI for gnome:

![Software Updater](http://farm5.static.flickr.com/4100/4897220771_4b27362dbc.jpg)



.





.


.



.



.


.
.
.

..


.
.

.


.

.


.

.


.


.


.
