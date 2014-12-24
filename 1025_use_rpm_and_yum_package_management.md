102.5 Use RPM and YUM package management

Weight: 3


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
````

Failed because of dependencies. RPM understands the dependencies but does not installes it itself. We need YUM:

````
````

but where does YUM find these dependencies to install? it starts from /etc/yum.repos.d/

````
$ cat /etc/yum.repos.d/fedora-updates.repo
````


### Removing
For removing a package we have to use -e option of rpm (e for erase) or use the *remove* option of yum. 

````


notes: 
- rpm does not have a database of automatic package installation so it can not remove dependencies which are installed automaticly. 
- rpm removes package without asking!
- rpm wont remove a package which is needed by another package

but if you remove with yum, it will tell what other packages should be removed because of dependencies:

````
yum remove bzr-depend
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
yum list bzr 
yum list emacs
rpm -q bzr
rpm -q emacs
yum info bzr
rpm -qi bzr
````

It is also possible to search for packages:

````
yum search hack
````

it is also possible to find **all intalled** packages with ````rpm -qa```` (query all). In most cases we pipe this with ````sort```` or ````grep```` and ````less```:

````
rpm -qa | grep vim 
````

If you need to find files in a installed package:

````
rpm -ql bzr
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
rpm -qR bzr
````

or use ````yum deplist bzr```` instead.

Poof.. I know this part was long so here comes the last important RPM Quering command: **whatprovides**. 

If you need to use bzr, you need to check what provides it! if installed you can go with ````rpm -q --whatprovides bzr```` and if not :

````
yum whatprovides bzr
````

### File Integrity
Security is important! So RPM can check the MD5 or SHA1 of files. The option is --checksig (-K) and it is a good idea to use it with -v option (verbose):

````
rpm -vK packagename.rpm
````

it is also possible to check if the installed FILES by a packages is OK:

````
rpm -V file name
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
[ian@echidna ~]$ yumdownloader gcl-selinux
Loaded plugins: presto, refresh-packagekit
gcl-selinux-2.6.8-0.7.20100201cvs.fc12.x86_64.rpm        |  17 kB     00:00     
[ian@echidna ~]$ mkdir gcl-selinux
[ian@echidna ~]$ cd gcl-selinux
[ian@echidna gcl-selinux]$ rpm2cpio ../gcl-selinux*.rpm | cpio -idv
./usr/share/selinux/packages/gcl
./usr/share/selinux/packages/gcl/gcl.pp
182 blocks
[ian@echidna gcl-selinux]$ find .
.
./usr
./usr/share
./usr/share/selinux
./usr/share/selinux/packages
./usr/share/selinux/packages/gcl
./usr/share/selinux/packages/gcl/gcl.pp
````

### Other tools
YUM and RPM are the main package manager tools on Fedora, RHEL & Centos. but other system are available. The SUSE uses YaST and many modern desktops (KDE & Gnome) use PackageKit. Package Kit installs and updates packags on graphical interfaces on most linux systems (Debian, Fedora, Arch, ...). 