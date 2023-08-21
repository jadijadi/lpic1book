Title: 104.2 Maintain the integrity of filesystems
Date: 2010-12-03 10:20
Category: LPIC1
Tags: LPIC1, 101, LPIC1-101-500
Authors: Jadi
Summary: 
sortorder: 210


_Weight: 2_

Candidates should be able to maintain a standard filesystem, as well as the extra data associated with a journaling filesystem.

## Objectives
* Verify the integrity of filesystems.
* Monitor free space and inodes.
* Repair simple filesystem problems.

* du
* df
* fsck
* e2fsck
* mke2fs
* tune2fs
* xfs_repair
* xfs_fsr
* xfs_db


<iframe width="560" height="315" src="https://www.youtube.com/embed/qcAZ7vr6W9U" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## du & df

In many cases you want to find out about the free space of a disk or find how much space a directory is using or check how many inodes left.

> The inode (index node) is a data structure in a Unix-style file system that describes a file-system object such as a file or a directory. Each inode stores the attributes and disk block locations of the object's data. File-system object attributes may include metadata (times of last change, access, modification), as well as owner and permission data. A directory is a list of inodes with their assigned names. The list includes an entry for itself, its parent, and each of its children. <small>([wikipedia](https://en.wikipedia.org/wiki/Inode))</small>

### df

The **d**isk**f**ree command is used to find out about the free and used space on file systems.

```text
jadi@funlife:~$ df -TH
Filesystem        Type      Size  Used Avail Use% Mounted on
/dev/sda2         ext4       23G   15G  7.7G  65% /
none              tmpfs     4.0K     0  4.0K   0% /sys/fs/cgroup
udev              devtmpfs  3.9G  4.0K  3.9G   1% /dev
tmpfs             tmpfs     788M  1.4M  786M   1% /run
none              tmpfs     5.0M  4.0K  5.0M   1% /run/lock
none              tmpfs     3.9G   19M  3.9G   1% /run/shm
none              tmpfs     100M   28K  100M   1% /run/user
/dev/mapper/chome ext4      243G  229G   14G  95% /home/jadi
/dev/sdb1         vfat      3.7G  7.8M  3.6G   1% /media/jadi/BA82-BECD
```

Here, the `-T` switch tells `df` to show the file system types and \`-H\` make numbers human readable (in powers of 1000 , for powers of 2, use `-h`).

On some filesystems (like ext2-4) we have a fixed number of inodes, so you may need to check the number of remaining inodes too. To do so, use the `-i` switch:

```text
jadi@funlife:~$ df -i
Filesystem          Inodes  IUsed    IFree IUse% Mounted on
/dev/sda2          1531904 458616  1073288   30% /
none               1007533      4  1007529    1% /sys/fs/cgroup
udev               1003703    542  1003161    1% /dev
tmpfs              1007533    644  1006889    1% /run
none               1007533      3  1007530    1% /run/lock
none               1007533    162  1007371    1% /run/shm
none               1007533     33  1007500    1% /run/user
/dev/mapper/chome 16171008 269293 15901715    2% /home/jadi
/dev/sdb1                0      0        0     - /media/jadi/BA82-BECD
```

> vfat file format has no inodes; there is no owner or access rights on vfat filesystems.

### du

The **d**isk**u**sage command shows the used space of **directories and files**. The common switches are:

| switch | usage |
| :---: | :--- |
| -h | print sizes in powers of 1024 \(e.g., 1023M\) |
| -H | print sizes in powers of 1000 \(e.g., 1.1G\) |
| -c | show the grand total |
| --max-depth 2 | Calculate all but show only 2 directories deep |
| -s | Only shows the summary and not all the directories one by one |

```text
jadi@funlife:~/w/lpic$ du
16    ./101
701456    ./done
701464    ./Logo/chert
704588    ./Logo
12    ./data
12    ./100
9432884    .
jadi@funlife:~/w/lpic$ du -c
16    ./101
701456    ./done
701464    ./Logo/chert
704588    ./Logo
12    ./data
12    ./100
9432884    .
9432884    total
jadi@funlife:~/w/lpic$ du -hs
9.0G    .
```

> in many cases when I want to see what uses my serers space, I use something like `$sudo du /home -h --max-depth 1`

## checking file systems

<iframe width="560" height="315" src="https://www.youtube.com/embed/VjnBzwDYbIY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

### fsck

If anything bad happens for your filesystem \(say power suddenly goes down\) you will have a corrupted file system. The general command to fix this is `fsck`. Technically this command is a front end for many commands:

```text
jadi@funlife:~$ ls /sbin/*fsck*
/sbin/dosfsck       /sbin/fsck.ext2     /sbin/fsck.fat     /sbin/fsck.vfat
/sbin/e2fsck       /sbin/fsck.ext3     /sbin/fsck.minix
/sbin/fsck       /sbin/fsck.ext4     /sbin/fsck.msdos
/sbin/fsck.cramfs  /sbin/fsck.ext4dev  /sbin/fsck.nfs
```

> Some of these are just hardlinks to `e2fsck` command

A common switch during boot is `-A` which tells `fsck` to check all file systems in /etc/fstab ordered by _passno_ in that file which is 6th field \(File systems with _passno_ of 0, wont be checked during the boot.

```text
root@funlife:~# fsck /dev/sdb
fsck from util-linux 2.25.1
e2fsck 1.42.10 (18-May-2014)
/dev/sdb is in use.
e2fsck: Cannot continue, aborting.


root@funlife:~# umount /dev/sdb
umount: /dev/sdb: not mounted
root@funlife:~# umount /dev/sdb1
root@funlife:~# fsck /dev/sdb
fsck from util-linux 2.25.1
e2fsck 1.42.10 (18-May-2014)
ext2fs_open2: Bad magic number in super-block
fsck.ext2: Superblock invalid, trying backup blocks...
fsck.ext2: Bad magic number in super-block while trying to open /dev/sdb

The superblock could not be read or does not describe a valid ext2/ext3/ext4
filesystem.  If the device is valid and it really contains an ext2/ext3/ext4
filesystem (and not swap or ufs or something else), then the superblock
is corrupt, and you might try running e2fsck with an alternate superblock:
    e2fsck -b 8193 <device>
 or
    e2fsck -b 32768 <device>
```

You can also check filesystems with UUID \(find them with `blkid` command or with labels\) :

```text
root@funlife:~# fsck /dev/sdb
fsck from util-linux 2.25.1
e2fsck 1.42.10 (18-May-2014)
ext2fs_open2: Bad magic number in super-block
fsck.ext2: Superblock invalid, trying backup blocks...
fsck.ext2: Bad magic number in super-block while trying to open /dev/sdb

The superblock could not be read or does not describe a valid ext2/ext3/ext4
filesystem.  If the device is valid and it really contains an ext2/ext3/ext4
filesystem (and not swap or ufs or something else), then the superblock
is corrupt, and you might try running e2fsck with an alternate superblock:
    e2fsck -b 8193 <device>
 or
    e2fsck -b 32768 <device>

root@funlife:~# blkid
/dev/sda1: LABEL="movies"
/dev/sdb1: UUID="BA82-BECD" TYPE="vfat" PARTUUID="381add66-01"
root@funlife:~# fsck LABEL=movies
fsck from util-linux 2.25.1
root@funlife:~# fsck UUID="BA82-BECD"
fsck from util-linux 2.25.1
fsck.fat 3.0.26 (2014-03-07)
/dev/sdb1: 14 files, 1972/945094 clusters
```

Use `-N` to see what command/test is going to be executed without actually running them:

```text
root@funlife:~# fsck -N UUID="BA82-BECD"
fsck from util-linux 2.25.1
[/sbin/fsck.vfat (1) -- /dev/sdb1] fsck.vfat /dev/sdb1
```

> If you want to check a XFS filesystem, you have to use `xfs_check` command

Some version do have a `-a` for automatic fixing all found issues but its not recommended. 
### e2fsck

`e2fsck` is used to check the ext2/ext3/ext4 family of file systems.  For ext3 and ext4 file systems that use a `journal`, if the system has been shutdown uncleanly without any errors,normally, after replaying the committed transactions  in the journal, the file system should be marked as clean. Hence, forfile systems that use **journaling** , e2fsck will normally replay the journal and exit, unless its superblock indicates that further checking is required.

device is a block device (e.g., `/dev/sdc1`) or file containing the file system.

Note that in general it is not safe to run `e2fsck` on  ***mounted*** file systems.  The only exception is if the `-n` option is specified, and `-c`, `-l`, or `-L` options are not specified. However, even if it is safe to do so, the results printed by `e2fsck` are not valid if the file system is ***mounted*** . If `e2fsck` asks whether or not you should check a file system which is mounted, the only correct answer is ``no''.  Only experts who really know what they are doing should consider answering this question in any other way.

If `e2fsck` is run in interactive mode (meaning that none of `-y`, `-n`, or `-p` are specified), the program will ask the user to fix each problem found in the file system. A response of `'y'` will fix the error; `'n'` will leave the error unfixed; and `'a'` will fix the problem and all subsequent problems; pressing Enter will proceed with the default response, which is printed before the question mark.  Pressing `Control-C` terminates `e2fsck` immediately.

### mke2fs
mke2fs is used to create an ext2, ext3, or ext4 filesystem, usually in a disk partition. device is the special file corresponding to the device (e.g /dev/hdXX). blocks-count is the number of blocks on the device. If omitted, mke2fs automagically figures the file system size. If called as mkfs.ext3 a journal is created as if the `-j` option was specified.

The defaults of the parameters for the newly created filesystem, if not overridden by the options listed below, are controlled by the /etc/mke2fs.conf configuration file. See the mke2fs.conf(5) manual page for more details.

### tune2fs

This is a command to tune _ext_ file systems. It can show information and set many options. The `-l` option lists the current configs:

```text
jadi@funlife:~$ sudo tune2fs -l /dev/sda2
tune2fs 1.42.10 (18-May-2014)
Filesystem volume name:   <none>
Last mounted on:          /
Filesystem UUID:          1651a94e-0b4e-47fb-aca0-f77e05714617
Filesystem magic number:  0xEF53
Filesystem revision #:    1 (dynamic)
Filesystem features:      has_journal ext_attr resize_inode dir_index filetype needs_recovery extent flex_bg sparse_super large_file huge_file uninit_bg dir_nlink extra_isize
Filesystem flags:         signed_directory_hash
Default mount options:    user_xattr acl
Filesystem state:         clean
Errors behavior:          Continue
Filesystem OS type:       Linux
Inode count:              1531904
Block count:              6123046
Reserved block count:     306152
Free blocks:              2302702
Free inodes:              1073461
First block:              0
Block size:               4096
Fragment size:            4096
Reserved GDT blocks:      1022
Blocks per group:         32768
Fragments per group:      32768
Inodes per group:         8192
Inode blocks per group:   512
Flex block group size:    16
Filesystem created:       Mon Dec  1 10:21:42 2014
Last mount time:          Sat Jan 31 17:21:51 2015
Last write time:          Sat Jan 31 17:21:51 2015
Mount count:              32
Maximum mount count:      -1
Last checked:             Mon Dec  1 10:21:42 2014
Check interval:           0 (<none>)
Lifetime writes:          103 GB
Reserved blocks uid:      0 (user root)
Reserved blocks gid:      0 (group root)
First inode:              11
Inode size:              256
Required extra isize:     28
Desired extra isize:      28
Journal inode:            8
First orphan inode:       786620
Default directory hash:   half_md4
Directory Hash Seed:      16c38a41-e709-4e04-b1c2-8a79d71ea7e8
Journal backup:           inode blocks
```
### debugfs

This is an interactive tool for debug an ext filesystem. It opens the filesystem in read-only mode unless we tell it not to \(with `-w` option\). It can un-delete files and directories..

```text
root@funlife:~# debugfs /dev/sda2
debugfs 1.42.10 (18-May-2014)
debugfs:  cd /etc/        <-- cd
debugfs:  pwd            <-- show were am I
[pwd]   INODE: 524289  PATH: /etc
[root]  INODE:      2  PATH: /
debugfs:  stat passwd        <-- show data on one file
Inode: 527187   Type: regular    Mode:  0644   Flags: 0x80000
Generation: 1875144872    Version: 0x00000000:00000001
User:     0   Group:     0   Size: 2145
File ACL: 0    Directory ACL: 0
Links: 1   Blockcount: 8
Fragment:  Address: 0    Number: 0    Size: 0
 ctime: 0x548d4241:a7b196fc -- Sun Dec 14 11:24:41 2014
 atime: 0x54cc635b:6acfc148 -- Sat Jan 31 08:38:43 2015
 mtime: 0x548d4241:a01076f8 -- Sun Dec 14 11:24:41 2014
crtime: 0x548d4241:9f1c52f8 -- Sun Dec 14 11:24:41 2014
Size of extra inode fields: 28
EXTENTS:
(0):2188172
debugfs:  ncheck 527187        <-- node check an inode
Inode    Pathname        
527187    /etc/passwd
debugfs:  q            <-- quit
```

#### Superblock

Unix systems use superblocks to save _filesystem metadata_. Most of the times this block is located at the beginning of the file system and replicated on other locations too. The `-n` of `mke2fs` displays superblock locations

```text
# mke2fs -n /dev/sda7
mke2fs 1.41.9 (22-Aug-2009)
Filesystem label=
OS type: Linux
Block size=4096 (log=2)
Fragment size=4096 (log=2)
7159808 inodes, 28637862 blocks
1431893 blocks (5.00%) reserved for the super user
First data block=0
Maximum filesystem blocks=4294967296
874 block groups
32768 blocks per group, 32768 fragments per group
8192 inodes per group
Superblock backups stored on blocks:
    32768, 98304, 163840, 229376, 294912, 819200, 884736, 1605632, 2654208,
    4096000, 7962624, 11239424, 20480000, 23887872
```


## xfs tools

Note: in some distros, xfs tools are not installed by default and you might need to install `xfsprogs` package. 

This is same as the `tune2fs` but for xfs file systems.

> xfs_info should be used on mounted file systems

| Command | usage |
| :---: | :--- |
| xfs_info | display information |
| xfs_growfs | expand file system |
| xfs_admin | change parameters on XFS file systems |
| xfs_repair | repair the problems. Please note that the filesytem under repair should be unmounted |
| xfs_db | checks and debug the filesystem. xfs_db is used to examine an XFS filesystem. Under rare circumstances it can also be used to modify an XFS filesystem, but that task is normally left to xfs_repair or to scripts such as xfs_admin that run xfs_db. |
| xfs_fsr | filesystem reorganizer for XFS. When invoked with no arguments xfs_fsr reorganizes all regular files in all mounted filesystems. xfs_fsr makes many cycles over /etc/mtab each time making a single pass over each XFS filesystem. Each pass goes through and selects files that have the largest number of extents. It attempts to defragment the top 10% of these files on each pass. |



### Repairing

We used the `fsck` for showing file system information but it is designed to _fix_ file systems too. If the boot time check find a problems, you will be put into a command line to fix the problems.

On non-journaling file systems \(ext2\) the fsck will show you many questions about each block and you have to say `y` if you want it to fix them. On journaling file systems \(ext3&4, xfs, ..\) the fsck has much less tasks to perform.

> for xfs file systems, we have `xfs_check` command

An important switch is `-n` which causes these commands **not to fix** anything and just show what was going to be done.


## Other tools

For the LPIC exam, it is good to know about these commands.

| filesystem | command | usage |
| :---: | :---: | :--- |
| ext | tune2fs | Show or set ext2 and ext3 parameters or even set the journaling options |
| ext | dumpe2fs | Prints the super block and block group descriptor information for an ext2 or ext3 filesystem. |
| ext | debugfs | Is an interactive file system debugger. Use it to examine or change the state of an ext2 or ext3file system. |
| reiserfs | reiserfstune | show and set parameters |
| reiserfs | debugreiserfs | Prints the super block and block group descriptor information for an ext2 or ext3 filesystem. |
| XFS | xfs\_info | display information |
| XFS | xfs\_growfs | expand file system |
| XFS | xfs\_admin | change parameters on XFS file systems |
| XFS | xfs\_repair | repair the problems |
| XFS | xfs\_db | checks and debugs the filesystem |
