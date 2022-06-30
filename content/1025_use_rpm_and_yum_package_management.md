Title: 102.5 Use RPM and YUM package management
Date: 2010-12-03 10:20
Category: LPIC1
Tags: LPIC1, 101, LPIC1-101-500
Authors: Jadi
Summary: Candidates should be able to perform package management using RPM, YUM, and Zypper.
sortorder: 100

_Weight: 3_

Candidates should be able to perform package management using RPM, YUM, and Zypper.

### Key Knowledge Areas
- Install, re-install, upgrade and remove packages using RPM, YUM, and Zypper.
- Obtain information on RPM packages such as version, status, dependencies, integrity, and signatures.
Determine what files a package provides, as well as find which package a specific file comes from.
Awareness of dnf.
- The following is a partial list of the used files, terms, and utilities:


##### Terms and Utilities
* rpm
* rpm2cpio
* `/etc/yum.conf`
* `/etc/yum.repos.d/`
* yum
* zypper

## Introduction

<iframe width="560" height="315" src="https://www.youtube.com/embed/qk6qcEAvf4A" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

**RedHat Package Manager \(RPM\)** and **YellowDog Update Manager \(YUM\)** are used by Fedora, RedHat, RHEL, CentOS, RocksOS, ... to manage packages. The package format is called RPM and can be managed by `rpm` tools but if you want to use the repositories to install, update, search, ... packages, or even upgrade the whole system, you can use the `yum` command. To have a deeper understanding of the repositories, please refer to the previous section (102.4); here I assume that you know the concept.

## YUM
`yum` is the package manager used by RedHat-based systems. Its configuration files are located at `/etc/yum.conf` and `/etc/yum.repos.d/`. Below is a sample.

```
# cat /etc/yum.conf
[main]
cachedir=/var/cache/yum/$basearch/$releasever
keepcache=0
debuglevel=2
logfile=/var/log/yum.log
exactarch=1
obsoletes=1
gpgcheck=1
plugins=1
installonly_limit=3
```

And here is a sample of an actual Repo file on a Fedora system:

```
# cat /etc/yum.repos.d/fedora.repo
[fedora]
name=Fedora $releasever - $basearch
#baseurl=http://download.example/pub/fedora/linux/releases/$releasever/Everything/$basearch/os/
metalink=https://mirrors.fedoraproject.org/metalink?repo=fedora-$releasever&arch=$basearch
enabled=1
countme=1
metadata_expire=7d
repo_gpgcheck=0
type=rpm
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-fedora-$releasever-$basearch
skip_if_unavailable=False

[fedora-debuginfo]
name=Fedora $releasever - $basearch - Debug
#baseurl=http://download.example/pub/fedora/linux/releases/$releasever/Everything/$basearch/debug/tree/
metalink=https://mirrors.fedoraproject.org/metalink?repo=fedora-debug-$releasever&arch=$basearch
enabled=0
metadata_expire=7d
repo_gpgcheck=0
type=rpm
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-fedora-$releasever-$basearch
skip_if_unavailable=False

[fedora-source]
name=Fedora $releasever - Source
#baseurl=http://download.example/pub/fedora/linux/releases/$releasever/Everything/source/tree/
metalink=https://mirrors.fedoraproject.org/metalink?repo=fedora-source-$releasever&arch=$basearch
enabled=0
metadata_expire=7d
repo_gpgcheck=0
type=rpm
gpgcheck=1
gpgkey=file:///etc/pki/rpm-gpg/RPM-GPG-KEY-fedora-$releasever-$basearch
skip_if_unavailable=False
```


We use yum like `yum [OPTIONS] [COMMAND] [PACKAGE_NAME]`.

One of the most important options is `-y` which says _yes_ to the Y/N questions.

And here you can find some of the commands:

|Command|Description|
|-|-|
|update|Updates the repositories and update the names of packages, or all if nothing is named|
|install|Install a package|
|reinstall|Reinstall a package|
|list|Show a list of packages|
|info|Show information about a package|
|remove|Removes an installed package|
|search|Searches repositories for packages|
|provides|Check which packages provide a specific file|
|upgrade|Upgrades packages and removes the obsolete ones|
|localinstall|Install from a local rpm file|
|localupdate|Updates from a local rpm file|
|check-update|Checks repositories for updates to the installed packages|
|deplist|Shows dependencies of a package|
|groupinstall|Install a group, say "KDE Plasma Workspaces"|
|history|Show history of the usage|

This is a sample installation:

```
# yum install bzr
Last metadata expiration check: 0:00:47 ago on Tue 21 Jun 2022 06:38:00 PM +0430.
Dependencies resolved.
=====================================================================================================================
 Package                                  Architecture       Version                       Repository           Size
=====================================================================================================================
Installing:
 breezy                                   x86_64             3.2.1-3.fc36                  fedora              6.0 M
Installing dependencies:
 libsodium                                x86_64             1.0.18-9.fc36                 fedora              163 k
 python3-bcrypt                           x86_64             3.2.2-1.fc36                  updates              43 k
 python3-certifi                          noarch             2021.10.8-1.fc36              fedora               15 k
 python3-configobj                        noarch             5.0.6-27.fc36                 fedora               63 k
 python3-cryptography                     x86_64             36.0.0-3.fc36                 fedora              1.0 M
 python3-dulwich                          x86_64             0.20.32-1.fc36                fedora              408 k
 python3-httplib2                         noarch             0.20.3-2.fc36                 fedora              122 k
 python3-jeepney                          noarch             0.7.1-2.fc36                  fedora              324 k
 python3-jwt                              noarch             2.4.0-1.fc36                  updates              41 k
 python3-keyring                          noarch             23.6.0-1.fc36                 updates              78 k
 python3-lazr-restfulclient               noarch             0.14.4-2.fc36                 fedora               84 k
 python3-lazr-uri                         noarch             1.0.6-2.fc36                  fedora               33 k
 python3-oauthlib                         noarch             3.0.2-12.fc36                 fedora              169 k
 python3-paramiko                         noarch             2.11.0-1.fc36                 updates             303 k
 python3-patiencediff                     x86_64             0.2.2-4.fc36                  fedora               45 k
 python3-pynacl                           x86_64             1.4.0-5.fc36                  fedora              108 k
 python3-secretstorage                    noarch             3.3.1-4.fc36                  fedora               35 k
 python3-wadllib                          noarch             1.3.6-2.fc36                  fedora               60 k
Installing weak dependencies:
 python3-jwt+crypto                       noarch             2.4.0-1.fc36                  updates             8.9 k
 python3-launchpadlib                     noarch             1.10.15.1-2.fc36              fedora              167 k
 python3-oauthlib+signedtoken             noarch             3.0.2-12.fc36                 fedora              8.5 k
 python3-pyasn1                           noarch             0.4.8-8.fc36                  fedora              134 k

Transaction Summary
=====================================================================================================================
Install  23 Packages

Total download size: 9.4 M
Installed size: 44 M
Is this ok [y/N]: y
Downloading Packages:
(1/23): python3-certifi-2021.10.8-1.fc36.noarch.rpm                                  1.8 kB/s |  15 kB     00:08
(2/23): libsodium-1.0.18-9.fc36.x86_64.rpm                                            15 kB/s | 163 kB     00:10
(3/23): python3-configobj-5.0.6-27.fc36.noarch.rpm                                    10 kB/s |  63 kB     00:06
(4/23): breezy-3.2.1-3.fc36.x86_64.rpm                                               262 kB/s | 6.0 MB     00:23
(5/23): python3-dulwich-0.20.32-1.fc36.x86_64.rpm                                     47 kB/s | 408 kB     00:08
(6/23): python3-cryptography-36.0.0-3.fc36.x86_64.rpm                                 77 kB/s | 1.0 MB     00:13
(7/23): python3-httplib2-0.20.3-2.fc36.noarch.rpm                                    105 kB/s | 122 kB     00:01
(8/23): python3-jeepney-0.7.1-2.fc36.noarch.rpm                                      259 kB/s | 324 kB     00:01
(9/23): python3-launchpadlib-1.10.15.1-2.fc36.noarch.rpm                              74 kB/s | 167 kB     00:02
(10/23): python3-lazr-restfulclient-0.14.4-2.fc36.noarch.rpm                          36 kB/s |  84 kB     00:02
(11/23): python3-lazr-uri-1.0.6-2.fc36.noarch.rpm                                     15 kB/s |  33 kB     00:02
(12/23): python3-oauthlib+signedtoken-3.0.2-12.fc36.noarch.rpm                       4.2 kB/s | 8.5 kB     00:02
(13/23): python3-oauthlib-3.0.2-12.fc36.noarch.rpm                                    58 kB/s | 169 kB     00:02
(14/23): python3-patiencediff-0.2.2-4.fc36.x86_64.rpm                                 15 kB/s |  45 kB     00:02
(15/23): python3-pyasn1-0.4.8-8.fc36.noarch.rpm                                       61 kB/s | 134 kB     00:02
(16/23): python3-pynacl-1.4.0-5.fc36.x86_64.rpm                                       36 kB/s | 108 kB     00:03
(17/23): python3-secretstorage-3.3.1-4.fc36.noarch.rpm                                12 kB/s |  35 kB     00:02
(18/23): python3-wadllib-1.3.6-2.fc36.noarch.rpm                                      24 kB/s |  60 kB     00:02
(19/23): python3-bcrypt-3.2.2-1.fc36.x86_64.rpm                                       16 kB/s |  43 kB     00:02
(20/23): python3-jwt+crypto-2.4.0-1.fc36.noarch.rpm                                  3.2 kB/s | 8.9 kB     00:02
(21/23): python3-jwt-2.4.0-1.fc36.noarch.rpm                                          16 kB/s |  41 kB     00:02
(22/23): python3-keyring-23.6.0-1.fc36.noarch.rpm                                     18 kB/s |  78 kB     00:04
(23/23): python3-paramiko-2.11.0-1.fc36.noarch.rpm                                    38 kB/s | 303 kB     00:08
---------------------------------------------------------------------------------------------------------------------
Total                                                                                177 kB/s | 9.4 MB     00:54
Running transaction check
Transaction check succeeded.
Running transaction test
Transaction test succeeded.
Running transaction
  Preparing        :                                                                                             1/1
  Installing       : python3-cryptography-36.0.0-3.fc36.x86_64                                                  1/23
  Installing       : python3-lazr-uri-1.0.6-2.fc36.noarch                                                       2/23
  Installing       : python3-jeepney-0.7.1-2.fc36.noarch                                                        3/23
  Installing       : python3-httplib2-0.20.3-2.fc36.noarch                                                      4/23
  Installing       : python3-secretstorage-3.3.1-4.fc36.noarch                                                  5/23
  Installing       : python3-keyring-23.6.0-1.fc36.noarch                                                       6/23
  Installing       : python3-wadllib-1.3.6-2.fc36.noarch                                                        7/23
  Installing       : python3-jwt-2.4.0-1.fc36.noarch                                                            8/23
  Installing       : python3-jwt+crypto-2.4.0-1.fc36.noarch                                                     9/23
  Installing       : python3-oauthlib-3.0.2-12.fc36.noarch                                                     10/23
  Installing       : python3-oauthlib+signedtoken-3.0.2-12.fc36.noarch                                         11/23
  Installing       : python3-lazr-restfulclient-0.14.4-2.fc36.noarch                                           12/23
  Installing       : python3-launchpadlib-1.10.15.1-2.fc36.noarch                                              13/23
  Installing       : python3-bcrypt-3.2.2-1.fc36.x86_64                                                        14/23
  Installing       : python3-pyasn1-0.4.8-8.fc36.noarch                                                        15/23
  Installing       : python3-patiencediff-0.2.2-4.fc36.x86_64                                                  16/23
  Installing       : python3-configobj-5.0.6-27.fc36.noarch                                                    17/23
  Installing       : python3-certifi-2021.10.8-1.fc36.noarch                                                   18/23
  Installing       : python3-dulwich-0.20.32-1.fc36.x86_64                                                     19/23
  Installing       : libsodium-1.0.18-9.fc36.x86_64                                                            20/23
  Installing       : python3-pynacl-1.4.0-5.fc36.x86_64                                                        21/23
  Installing       : python3-paramiko-2.11.0-1.fc36.noarch                                                     22/23
  Installing       : breezy-3.2.1-3.fc36.x86_64                                                                23/23
  Running scriptlet: breezy-3.2.1-3.fc36.x86_64                                                                23/23
  Verifying        : breezy-3.2.1-3.fc36.x86_64                                                                 1/23
  Verifying        : libsodium-1.0.18-9.fc36.x86_64                                                             2/23
  Verifying        : python3-certifi-2021.10.8-1.fc36.noarch                                                    3/23
  Verifying        : python3-configobj-5.0.6-27.fc36.noarch                                                     4/23
  Verifying        : python3-cryptography-36.0.0-3.fc36.x86_64                                                  5/23
  Verifying        : python3-dulwich-0.20.32-1.fc36.x86_64                                                      6/23
  Verifying        : python3-httplib2-0.20.3-2.fc36.noarch                                                      7/23
  Verifying        : python3-jeepney-0.7.1-2.fc36.noarch                                                        8/23
  Verifying        : python3-launchpadlib-1.10.15.1-2.fc36.noarch                                               9/23
  Verifying        : python3-lazr-restfulclient-0.14.4-2.fc36.noarch                                           10/23
  Verifying        : python3-lazr-uri-1.0.6-2.fc36.noarch                                                      11/23
  Verifying        : python3-oauthlib+signedtoken-3.0.2-12.fc36.noarch                                         12/23
  Verifying        : python3-oauthlib-3.0.2-12.fc36.noarch                                                     13/23
  Verifying        : python3-patiencediff-0.2.2-4.fc36.x86_64                                                  14/23
  Verifying        : python3-pyasn1-0.4.8-8.fc36.noarch                                                        15/23
  Verifying        : python3-pynacl-1.4.0-5.fc36.x86_64                                                        16/23
  Verifying        : python3-secretstorage-3.3.1-4.fc36.noarch                                                 17/23
  Verifying        : python3-wadllib-1.3.6-2.fc36.noarch                                                       18/23
  Verifying        : python3-bcrypt-3.2.2-1.fc36.x86_64                                                        19/23
  Verifying        : python3-jwt+crypto-2.4.0-1.fc36.noarch                                                    20/23
  Verifying        : python3-jwt-2.4.0-1.fc36.noarch                                                           21/23
  Verifying        : python3-keyring-23.6.0-1.fc36.noarch                                                      22/23
  Verifying        : python3-paramiko-2.11.0-1.fc36.noarch                                                     23/23

Installed:
  breezy-3.2.1-3.fc36.x86_64                                 libsodium-1.0.18-9.fc36.x86_64
  python3-bcrypt-3.2.2-1.fc36.x86_64                         python3-certifi-2021.10.8-1.fc36.noarch
  python3-configobj-5.0.6-27.fc36.noarch                     python3-cryptography-36.0.0-3.fc36.x86_64
  python3-dulwich-0.20.32-1.fc36.x86_64                      python3-httplib2-0.20.3-2.fc36.noarch
  python3-jeepney-0.7.1-2.fc36.noarch                        python3-jwt-2.4.0-1.fc36.noarch
  python3-jwt+crypto-2.4.0-1.fc36.noarch                     python3-keyring-23.6.0-1.fc36.noarch
  python3-launchpadlib-1.10.15.1-2.fc36.noarch               python3-lazr-restfulclient-0.14.4-2.fc36.noarch
  python3-lazr-uri-1.0.6-2.fc36.noarch                       python3-oauthlib-3.0.2-12.fc36.noarch
  python3-oauthlib+signedtoken-3.0.2-12.fc36.noarch          python3-paramiko-2.11.0-1.fc36.noarch
  python3-patiencediff-0.2.2-4.fc36.x86_64                   python3-pyasn1-0.4.8-8.fc36.noarch
  python3-pynacl-1.4.0-5.fc36.x86_64                         python3-secretstorage-3.3.1-4.fc36.noarch
  python3-wadllib-1.3.6-2.fc36.noarch

Complete!

```

You can also use the wildcards:

```text
# yum update 'cal*'
```

> Fun fact: Fedora Linux uses `dnf` as its package manager and will translate your `yum` commands to its `dnf` equivalents.

#### yumdownloader
This tool will download rpms from repositories without installing them. If you need to download all the dependencies too, use the `--resolve` switch:

```text
yumdownloader --resolve bzr
```

## RPM


<iframe width="560" height="315" src="https://www.youtube.com/embed/0E_EuBUSuz4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

The `rpm` command can run ACTIONs on individual RPM files. You can use it like `rpm ACTION [OPTION] rpm_file.rpm`

One of the most used options is `-v` for verbose output and these are the common ACTIONs:

|Short Form|Long Form|Description|
|-|-|-|
|-i|--install|Installs a package|
|-e|--erase|Removes a package|
|-U|--upgrade|Installs/Upgrades a package|
|-q|--query|Checks if the package is installed|
|-F|--freshen|Only update if it's already installed|
|-V|--verify|Check the integrity of the installation|
|-K|--checksig|Checks the integrity of an rpm package|


Please note that each action might have its specific options.
### Install and update
In most cases, we use `-U` which Installs or upgrades a package. 

* RPM does not have a database of automatic package installation, so it cannot remove automatically installed dependencies.

If you have an rpm with all of its dependencies, you can install them using `rpm -Uvh *.rpm`. This will tell rpm not to complain about the dependencies if it is presented in other files. Here the `-h` creates 50 hash signs to show the progress.

### Query

A normal query is like this:

```
[root@fedora tmp]# rpm -q breezy-3.2.1-3.fc36.x86_64.rpm
breezy-3.2.1-3.fc36.x86_64
[root@fedora tmp]# rpm -q breezy
breezy-3.2.1-3.fc36.x86_64
[root@fedora tmp]# rpm -q emacs
package emacs is not installed
```
And you can use these options to spice it up:

|Short|Long|Description|
|-|-|-|
|-c|--configfiles|Show the packages configuration files|
|-i|--info|Detailed info about a pacakge|
|-a|--all|Show all Installed packages|
||--whatprovides|Shows what packages provide this file|
|-l|--list|Query the list of files a package installs|
|-R|--requires|Show dependencies of a package|
|-f|--file|Query package owning file|

### Verify
You can verify your packages and see if they are installed correctly or not. You can use the `-Vv` option for verbose output or just use the `-V` to verify and see only the issues. This is the output after I edited the `/bin/tmux` manually:

```
[root@fedora tmp]# rpm -V tmux
S.5....T.    /usr/bin/tmux
```

And this is part of the `man rpm`'s `-V` section:

```
    S Size differs
    M Mode differs (includes permissions and file type)
    5 digest (formerly MD5 sum) differs
    D Device major/minor number mismatch
    L readLink(2) path mismatch
    U User ownership differs
    G Group ownership differs
    T mTime differs
    P caPabilities differ
```

You can also check the integrity of an rpm package with `-K`:

```
# rpm -Kv breezy-3.2.1-3.fc36.x86_64.rpm
breezy-3.2.1-3.fc36.x86_64.rpm:
    Header V4 RSA/SHA256 Signature, key ID 38ab71f4: OK
    Header SHA256 digest: OK
    Header SHA1 digest: OK
    Payload SHA256 digest: OK
    V4 RSA/SHA256 Signature, key ID 38ab71f4: OK
    MD5 digest: OK
```

The above output shows that this file is valid.

### Uninstall
```
[root@fedora tmp]# rpm -e tmux
error: Failed dependencies:
	tmux is needed by (installed) anaconda-install-env-deps-36.16.5-1.fc36.x86_64
```

* rpm removes package without asking!
* rpm won't remove a package that is needed by another package

### Extract RPM Files

#### rpm2cpio

The **cpio** is an archive format (just like zip or rar or tar). You can use the `rpm2cpio` command to convert RPM files to _cpio_ and then use the `cpio` tool to extract them:

```
[root@fedora tmp]# rpm2cpio breezy-3.2.1-3.fc36.x86_64.rpm > breezy.cpio
[root@fedora tmp]# cpio -idv < breezy.cpio
./usr/bin/brz
./usr/bin/bzr
./usr/bin/bzr-receive-pack
./usr/bin/bzr-upload-pack
./usr/bin/git-remote-brz
./usr/bin/git-remote-bzr
[...]
```

## Zypper
The SUSE Linux and its sibling openSUSE use ZYpp as their package manager engine. You can use YAST or Zypper tools to communicate with it. 

These are the main commands used in `zypper`:

|Command|Description|
|-|-|
|help|General help|
|install|Installs a package|
|info|Displays information of a package|
|list-updates|Shows available updates|
|lr|Shows repository information|
|packages|List all available packages or packages from a specific repo|
|what-provides|Show the owner of a file|
|refresh|Refreshes the repositories information|
|remove|Removes a package from the system|
|search|Searches for a package|
|update|Checks the repositories and updates the installed packages|
|verify|Checks a package and its dependencies|

> You can shorten the command when using `zypper`, so `zypper se tmux` will _search_ for tmux.


#### Other tools
YUM and RPM are the main package managers on Fedora, RHEL & Centos but other tools are also available. As mentioned, the SUSE uses `YaST`, and some modern desktops \(KDE & Gnome\) use `PackageKit` which is a graphical tool. It is also good to note that the  `dnf` suite is also gaining popularity and is pre-installed on Fedora systems.
