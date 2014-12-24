#102.5 Use RPM and YUM package management

*Weight: 3*


Candidates should be able to perform package management using RPM and YUM tools.

## Goals
- Install, re-install, upgrade and remove packages using RPM and YUM.
- Obtain information on RPM packages such as version, status, dependencies, integrity and signatures.
- Determine what files a package provides, as well as find which package a specific file comes from.
- rpm
- rpm2cpio
- /etc/yum.conf
- /etc/yum.repos.d/
- yum
- yumdownloader


### Introduction
**RedHat Package Manager (RPM)** and **Yellowdog Updater Modified (YUM)** are fedora / redhat / rhel / centos / .. tools to manage packages. There are also gui tools for installing and updating. As you saw on 102.4, all package managers can do standard functions like installing, updating and removing packages. 

YUM adds extra features likes automatic updates, dependency management and works with repositories (collection on packages accessed over network or on a CD). 

### Installing
Say you want to install "bzr" and you dont have it:

````
bzr:[jadi@localhost ~]$ bzr
bash: bzr: command not found
[jadi@localhost ~]$ which bzr
/usr/bin/which: no bzr in (/usr/libexec/lightdm:/usr/local/bin:/usr/bin:/bin:/usr/local/sbin:/usr/sbin:/home/jadi/.local/bin:/home/jadi/bin)
[jadi@localhost ~]$ whatis bzr
bzr: nothing appropriate.
[jadi@localhost ~]$ whereis bzr
bzr:[jadi@localhost ~]$ 
````

we can obtain the bzr RPM package and try to install it:

````
[root@localhost ~]# rpm -i bzr-2.6.0-2.fc20.x86_64.rpm 
error: Failed dependencies:
	python-paramiko is needed by bzr-2.6.0-2.fc20.x86_64
````

Failed because of dependencies. RPM understands the dependencies but does not installs it itself. We need YUM:

````
[root@localhost ~]# yum install bzr
Loaded plugins: langpacks
Resolving Dependencies
--> Running transaction check
---> Package bzr.x86_64 0:2.6.0-2.fc20 will be installed
--> Processing Dependency: python-paramiko for package: bzr-2.6.0-2.fc20.x86_64
--> Running transaction check
---> Package python-paramiko.noarch 0:1.15.1-1.fc20 will be installed
--> Processing Dependency: python-crypto >= 2.1 for package: python-paramiko-1.15.1-1.fc20.noarch
--> Running transaction check
---> Package python-crypto.x86_64 0:2.6.1-1.fc20 will be installed
--> Finished Dependency Resolution

Dependencies Resolved

=========================================================================================================================
 Package                          Arch                    Version                         Repository                Size
=========================================================================================================================
Installing:
 bzr                              x86_64                  2.6.0-2.fc20                    fedora                   6.3 M
Installing for dependencies:
 python-crypto                    x86_64                  2.6.1-1.fc20                    fedora                   470 k
 python-paramiko                  noarch                  1.15.1-1.fc20                   updates                  998 k

Transaction Summary
=========================================================================================================================
Install  1 Package (+2 Dependent packages)

Total size: 7.7 M
Total download size: 998 k
Installed size: 36 M
Is this ok [y/d/N]: y
Downloading packages:
Not downloading Presto metadata for updates
python-paramiko-1.15.1-1.fc20.noarch.rpm                                                          | 998 kB  00:00:32     
Running transaction check
Running transaction test
Transaction test succeeded
Running transaction
  Installing : python-crypto-2.6.1-1.fc20.x86_64                                                                     1/3 
  Installing : python-paramiko-1.15.1-1.fc20.noarch                                                                  2/3 
  Installing : bzr-2.6.0-2.fc20.x86_64                                                                               3/3 
  Verifying  : python-crypto-2.6.1-1.fc20.x86_64                                                                     1/3 
  Verifying  : python-paramiko-1.15.1-1.fc20.noarch                                                                  2/3 
  Verifying  : bzr-2.6.0-2.fc20.x86_64                                                                               3/3 

Installed:
  bzr.x86_64 0:2.6.0-2.fc20                                                                                              

Dependency Installed:
  python-crypto.x86_64 0:2.6.1-1.fc20                       python-paramiko.noarch 0:1.15.1-1.fc20                      

Complete!

````

> it is possible to use -y switch to prevent yum from asking *Is this ok [y/d/N]*

but where does YUM find these dependencies to install? it starts from /etc/yum.repos.d/

````
$ cat /etc/yum.repos.d/fedora-updates.repo
[updates]
name=Fedora $releasever - $basearch - Updates
failovermethod=priority
#baseurl=http://download.fedoraproject.org/pub/fedora/linux/updates/$releasever/$basearch/
metalink=https://mirrors.fedoraproject.org/metalink?repo=updates-released-f$releasever&arch=$basearch
enabled=1
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-fedora-$releasever-$basearch
skip_if_unavailable=False

[updates-debuginfo]
name=Fedora $releasever - $basearch - Updates - Debug
failovermethod=priority
#baseurl=http://download.fedoraproject.org/pub/fedora/linux/updates/$releasever/$basearch/debug/
metalink=https://mirrors.fedoraproject.org/metalink?repo=updates-released-debug-f$releasever&arch=$basearch
enabled=0
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-fedora-$releasever-$basearch
skip_if_unavailable=False

[updates-source]
name=Fedora $releasever - Updates Source
failovermethod=priority
#baseurl=http://download.fedoraproject.org/pub/fedora/linux/updates/$releasever/SRPMS/
metalink=https://mirrors.fedoraproject.org/metalink?repo=updates-released-source-f$releasever&arch=$basearch
enabled=0
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-fedora-$releasever-$basearch
skip_if_unavailable=False

````


### Removing
For removing a package we have to use -e option of rpm (e for erase) or use the *remove* option of yum. 

````
[root@localhost ~]# rpm -e bzr
[root@localhost ~]# bzr
bash: bzr: command not found
````

notes: 
- rpm does not have a database of automatic package installation so it can not remove dependencies which are installed automatically. 
- rpm removes package without asking!
- rpm wont remove a package which is needed by another package

but if you remove with yum, it will tell what other packages should be removed because of dependencies:

````
# yum install bzr
# rpm -e python-crypto
error: Failed dependencies:
	python-crypto >= 2.1 is needed by (installed) python-paramiko-1.15.1-1.fc20.noarch

````

### Upgrading
the most common command is ````yum update````. This will update the repository data and then will ask user to confirm and then will upgrade the system. It is also possible to give a single package name or use a wildcard (*) to upgrade specific packages.

````
# yum upgrade 'cal*'
````

will upgrade all packages starting with cal (sal calendarj, calibre, ...).

if using RPM, you can upgrade a sysem using -U or -F instaed of -i. This is the difference:

> -i is for install, -U is upgrade os install, -F is upgrade if installed. Note that -F wont install / upgrade the package if it is not already istalled.

> please note that in many cases, we also us -v (verbose = print a lot of info) and -h (show a progress bar with hash signs (#) ).

Last thing you should now is if intsalling or updating using ````rpm```` and you have many files which are dependent to each other, you can copy all your rpm files into one directory and do a ````rpm -Uvh *.rpm```` and rpm will install/upgrade all the packages based on their dependencies to each other.

### Querying info
You saw that rpm needed a full file name and yum needed only the package name. How can we find these info?

````
[root@localhost ~]# yum list bzr
Loaded plugins: langpacks
Installed Packages
bzr.x86_64                                              2.6.0-2.fc20                                              @fedora

[root@localhost ~]# yum list emacs
Loaded plugins: langpacks
Available Packages
emacs.x86_64                                            1:24.3-25.fc20                                            updates

[root@localhost ~]# rpm -q bzr
bzr-2.6.0-2.fc20.x86_64

[root@localhost ~]# rpm -q emacs
package emacs is not installed

[root@localhost ~]# yum info bzr
Loaded plugins: langpacks
Installed Packages
Name        : bzr
Arch        : x86_64
Version     : 2.6.0
Release     : 2.fc20
Size        : 29 M
Repo        : installed
From repo   : fedora
Summary     : Friendly distributed version control system
URL         : http://www.bazaar-vcs.org/
License     : GPLv2+
Description : Bazaar is a distributed revision control system that is powerful, friendly,
            : and scalable.  It is the successor of Baz-1.x which, in turn, was
            : a user-friendly reimplementation of GNU Arch.

[root@localhost ~]# yum info emacs
Loaded plugins: langpacks
Available Packages
Name        : emacs
Arch        : x86_64
Epoch       : 1
Version     : 24.3
Release     : 25.fc20
Size        : 2.9 M
Repo        : updates/20/x86_64
Summary     : GNU Emacs text editor
URL         : http://www.gnu.org/software/emacs/
License     : GPLv3+
Description : Emacs is a powerful, customizable, self-documenting, modeless text
            : editor. Emacs contains special code editing features, a scripting
            : language (elisp), and the capability to read mail, news, and more
            : without leaving the editor.
            : 
            : This package provides an emacs binary with support for X windows.
````

It is also possible to search for packages:

````
[root@localhost ~]# yum search hack 
Loaded plugins: langpacks
=================================================== N/S matched: hack ===================================================
nethack-vultures.x86_64 : NetHack - Vulture's Eye and Vulture's Claw
python-hacking.noarch : OpenStack Hacking Guideline Enforcement
...
...
wmMatrix.x86_64 : DockApp version of Jamie Zawinski's xmatrix screensaver hack

  Name and summary matches only, use "search all" for everything.
````

it is also possible to find **all intalled** packages with ````rpm -qa```` (query all). In most cases we pipe this with ````sort```` or ````grep```` and ````less```:

````
[root@localhost ~]# rpm -qa | grep vim 
vim-minimal-7.4.027-2.fc20.x86_64
````

If you need to find files in a installed package:

````
[root@localhost ~]# rpm -ql bzr | head
/etc/bash_completion.d
/etc/bash_completion.d/bzr
/usr/bin/bzr
/usr/lib64/python2.7/site-packages/bzr-2.6.0-py2.7.egg-info
/usr/lib64/python2.7/site-packages/bzrlib
...
...
````

> It is easy, query list.

> if you need same info for a downloaded package, just add the -p switch to your rpm command.

Another important task is checking which package, own a specific file. Lets see what package gave us the ````cal``` command:

````
[jadi@localhost ~]$ which cal 
/usr/bin/cal
[jadi@localhost ~]$ rpm -qR /usr/bin/cal 
package /usr/bin/cal is not installed
[jadi@localhost ~]$ rpm -qf /usr/bin/cal 
util-linux-2.24-2.fc20.x86_64
````

#### Dependencies
if you need to check what a packages is dependent on, use the ````--requires```` or ````-R```` switch:

````
[root@localhost ~]# rpm -qR bzr
/usr/bin/python
libc.so.6()(64bit)
libc.so.6(GLIBC_2.14)(64bit)
libc.so.6(GLIBC_2.2.5)(64bit)
libc.so.6(GLIBC_2.3.4)(64bit)
...
...
````

or use ````yum deplist bzr```` instead.

Poof.. I know this part was long so here comes the last important RPM Quering command: **whatprovides**. 

If you need to use bzr, you need to check what provides it! if installed you can go with ````rpm -q --whatprovides bzr```` and if not :

````
yum whatprovides bzr
Loaded plugins: langpacks
bzr-2.6.0-2.fc20.x86_64 : Friendly distributed version control system
Repo        : fedora
````

### File Integrity
Security is important! So RPM can check the MD5 or SHA1 of files. The option is --checksig (-K) and it is a good idea to use it with -v option (verbose):

````
[root@localhost ~]# rpm -vK bzr-2.6.0-2.fc20.x86_64.rpm
bzr-2.6.0-2.fc20.x86_64.rpm:
    Header V3 RSA/SHA256 Signature, key ID 246110c1: OK
    Header SHA1 digest: OK (171c91fbd14416ac44c0f6d396826d583c3840ce)
    V3 RSA/SHA256 Signature, key ID 246110c1: OK
    MD5 digest: OK (c4478d64f009d07cb17d018b377677ab)
````
The above output shows that this file is a valid file.

it is also possible to check if the installed FILES by a packages is OK:

````
[root@localhost ~]# rpm -V bzr 
[root@localhost ~]# rm /etc/bash_completion.d/bzr 
rm: remove regular file ‘/etc/bash_completion.d/bzr’? y
[root@localhost ~]# rpm -V bzr 
missing     /etc/bash_completion.d/bzr
````

if anything goes wrong, we can allways reinstall a package:

````
yum reinstall bzr
````

### yumdownloader
this tool will download rpms from repositories but wont install them. If you need to downloda all the dependencies too, use the --resolve switch:

````
yumdownloader --resolve bzr
````

### rpm2cpio
The **cpio** is kind of an archive, just like zip or rar or tar. the rpm2cpio can convert rpm files to cpio archives so you can *open* them using cpio command.  

````
# rpm2cpio bzr-2.6.0-2.fc20.x86_64.rpm | cpio -idv 
./etc/bash_completion.d
./etc/bash_completion.d/bzr
./usr/bin/bzr
./usr/lib64/python2.7/site-packages/bzr-2.6.0-py2.7.egg-info
./usr/lib64/python2.7/site-packages/bzrlib
./usr/lib64/python2.7/site-packages/bzrlib/__init__.py
./usr/lib64/python2.7/site-packages/bzrlib/_annotator_py.py
./usr/lib64/python2.7/site-packages/bzrlib/_annotator_pyx.so
...
...
````

### Other tools
YUM and RPM are the main package manager tools on Fedora, RHEL & Centos. but other system are available. The SUSE uses YaST and many modern desktops (KDE & Gnome) use PackageKit. Package Kit installs and updates packags on graphical interfaces on most linux systems (Debian, Fedora, Arch, ...). 

.

.

.


.

.

.

.

.

.










