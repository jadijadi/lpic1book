Title: 104.7 Find system files and place files in the correct location
Date: 2021-08-03 13:24
Category: 104

# 104.7 Find system files and place files in the correct location
*Weight: 2*

Candidates should be thoroughly familiar with the **Filesystem Hierarchy Standard (FHS)**, including typical file locations and directory classifications.

## Objectives

- Understand the correct locations of files under the FHS.
- Find files and commands on a Linux system.
- Know the location and purpose of important file and directories as defined in the FHS.


- find
- locate
- updatedb
- whereis
- which
- type
- /etc/updatedb.conf

## FHS
Filesystem Hierarchy Standard (FHS) is a document describing the Linux / Unix file hierarchy. It is very useful to know these because it lets you easily find what you are looking for:

|directory|usage|
|---|---|
|bin|Essential command binaries|
|boot|Static files of the boot loader|
|dev|Device files|
|etc|Host-specific system configuration|
|lib|Essential shared libraries and kernel modules|
|media|Mount point for removable media|
|mnt|Mount point for mounting a filesystem temporarily|
|opt|Add-on application software packages|
|sbin|Essential system binaries|
|srv|Data for services provided by this system|
|tmp|Temporary files|
|usr|Secondary hierarchy|
|var|Variable data|
|home|User home directories (optional)|
|lib<qual>|Alternate format essential shared libraries (optional)|
|root|Home directory for the root user (optional)|

The `/usr` filesystem is the second major section of the filesystem, containing shareable, read-only data. It can be shared between systems, although present practice does not often do this.

The `/var` filesystem contains variable data files, including spool directories and files, administrative and logging data, and transient and temporary files. Some portions of /var are not shareable between different systems, but others, such as /var/mail, /var/cache/man, /var/cache/fonts, and /var/spool/news, may be shared.



## Path
A general linux install has a lot of files; 741341 files in my case. So how it find out where to look when you type a command? This is done by a variable called PATH:

````
$ echo $PATH
/home/jadi/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games;/home/jadi/bin/
````

And for root user:

````
# echo $PATH
/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
````

As you can see, this is the list of directories separated with a colon. Obviously you can change your path with ```export PATH=$PATH:/usr/new/dir``` or put this in ```.bashrc``` to make it permanent.

## which, type and whereis
The `which` command shows the first appearance of the command given in path:

````
$ which mkfd
$ which mkfs
/sbin/mkfs
````

> use the `-a` switch to show all appearance in the path and not only the first one.

But what happens if you `which for` ?

````
$ which for
$ type for
for is a shell keyword
````

As you can see, `which` did not found anything for `for` and we used `type`.

````
$ type type
type is a shell builtin
$ type for
for is a shell keyword
$ type mkfs
mkfs is /sbin/mkfs
$ type mkfd
bash: type: mkfd: not found
````

The `type` command is more general that `which` and also understand and shows the *bash keywords*.

Another useful command in this category is `whereis`. Unlike `which`, `whereis` shows man pages and source codes of programs alongside their binary location.


````
$ whereis mkfs
mkfs: /sbin/mkfs.bfs /sbin/mkfs.ext3 /sbin/mkfs.ext4 /sbin/mkfs.vfat /sbin/mkfs.cramfs /sbin/mkfs.minix /sbin/mkfs.ext2 /sbin/mkfs.msdos /sbin/mkfs.fat /sbin/mkfs.ntfs /sbin/mkfs.ext4dev /sbin/mkfs /usr/share/man/man8/mkfs.8.gz
$ whereis ping
ping: /bin/ping /usr/share/man/man8/ping.8.gz
$ whereis chert
chert:
$
````

## find
We have already seen this command in detail but lets see a couple of new switches.

- The `-user` and `-group` specifies a specific user & group
- The `-maxdepth` tells the find how deep it should go into the directories.

````
$ find /tmp/ -maxdepth 1 -user jadi | head
$ find /tmp/ -maxdepth 1 -user jadi | head
/tmp/asheghloo.png
/tmp/tmpAN6Drb
/tmp/wrapper-24115-2-out
/tmp/sni-qt_goldendict_20048-sRlmvN
/tmp/asheghloo.gif
/tmp/zim-jadi
/tmp/3la.txt
/tmp/unity_support_test.0
/tmp/batman.jpg
````

Or even find the files not belonging to any user / group with `-nouser` and `-nogroup`.

>Like other *tests*, you can add a `!` just before any phrase to negate it. So this will find files **not belonging** to jadi: `find . ! -user jadi`


## locate & updatedb
You tries `find` and know that it is slowwwww... It searches the file system on each run but lets see the fastest command:

````
$ locate happy
/home/jadi/.Spark/xtra/emoticons/Default.adiumemoticonset/happy.png
/home/jadi/.Spark/xtra/emoticons/sparkEmoticonSet/happy.png
/home/jadi/Downloads/jadi-net_radio-geek_040_antihappy.mp3
/usr/share/emoticons/kde4/unhappy.png
/usr/share/pixmaps/fvwm/mini.happy.xpm
/usr/share/pixmaps/pidgin/emotes/default/happy.png
/usr/share/pixmaps/pidgin/emotes/small/happy.png
/usr/src/linux-headers-3.13.0-40-generic/include/config/happymeal.h
/usr/src/linux-headers-3.16.0-25-generic/include/config/happymeal.h
/usr/src/linux-headers-3.16.0-28-generic/include/config/happymeal.h
/usr/src/linux-headers-3.16.0-29-generic/include/config/happymeal.h
````

And it is fast:

````
$ time locate kernel | wc -l
11235

real	0m0.341s
user	0m0.322s
sys	0m0.015s
````

This is fast because its data comes from a database created with `updatedb` command which is usually run on a daily basis with a cron job. Its configuration file is `/etc/updatedb.conf` or `/etc/sysconfig/locate`:

````
$ cat /etc/updatedb.conf
PRUNE_BIND_MOUNTS="yes"
# PRUNENAMES=".git .bzr .hg .svn"
PRUNEPATHS="/tmp /var/spool /media /home/.ecryptfs"
PRUNEFS="NFS nfs nfs4 rpc_pipefs afs binfmt_misc proc smbfs autofs iso9660 ncpfs coda devpts ftpfs devfs mfs shfs sysfs cifs lustre tmpfs usbfs udf fuse.glusterfs fuse.sshfs curlftpfs ecryptfs fusesmb devtmpfs"
````

Please note that you can update the db by running `updatedb` as root and get some info about it by `-S` switch of `locate` command:

````
$ locate -S
Database /var/lib/mlocate/mlocate.db:
	73,602 directories
	711,894 files
	46,160,154 bytes in file names
	18,912,999 bytes used to store database
```
# And... the LPIC1 exam 101 is DONE! Congrats.


http://j.mp/jadilpic1

.

.

.

.

.

.

.

.
