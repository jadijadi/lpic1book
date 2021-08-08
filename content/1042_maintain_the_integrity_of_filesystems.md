# 1042\_maintain\_the\_integrity\_of\_filesystems

Title: 104.2 Maintain the integrity of filesystems Date: 2021-08-03 13:19 Category: 104

## 104.2 Maintain the integrity of filesystems

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
* debugfs
* dumpe2fs
* tune2fs
* xfs tools

## fsck

If anything bad happens for your filesystem \(say power suddenly goes down\) you will have a corrupted file system. The command to fix this is `fsck`. Technically this command is a front end for many commands:

```text
jadi@funlife:~$ ls /sbin/*fsck*
/sbin/dosfsck       /sbin/fsck.ext2     /sbin/fsck.fat     /sbin/fsck.vfat
/sbin/e2fsck       /sbin/fsck.ext3     /sbin/fsck.minix
/sbin/fsck       /sbin/fsck.ext4     /sbin/fsck.msdos
/sbin/fsck.cramfs  /sbin/fsck.ext4dev  /sbin/fsck.nfs
```

> Some of these are just hardlinks to `e2fsck` command

A common switch during boot is `-A` which tells fsck to check all file systems in /etc/fstab ordered by _passno_ in that file which is 6th field \(File systems with _passno_ of 0, wont be checked during the boot.

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

You can also check filesystems with UUID \(find them with `blkid` command or with labels\):

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

You can use `-N` switch to see what command/test is going to be executed:

```text
root@funlife:~# fsck -N UUID="BA82-BECD"
fsck from util-linux 2.25.1
[/sbin/fsck.vfat (1) -- /dev/sdb1] fsck.vfat /dev/sdb1
```

> If you want to check a XFS filesystem, you have to use `xfs_check` command

#### tune2fs

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

#### xfs\_info

This is same as the `tune2fs` but for xfs file systems.

> xfs\_info should be used on mounted file systems

## du & df

In many cases you want to find out about the free space of a disk or find how much space a directory is using. This space can be used by the blocks of files or inodes.

> inodes contain the information about files. Information like the owner, when the last time it is used or edited, its size, if its a directory or not and peoples access rights on if. The inode number is unique within a particular filesystem and is also called files serial number.

### df

The DiskFree command is used to find out about the free and used space of file systems.

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

Here, the \`-T\` switch make df to show the file system types and \`-H\` make numbers human readable \(in powers of 1000\). Please note that \`-h\` is also human readable but in powres of 1024 \(e.g. shows 1k for 1000 bytes.

If you need the inode data, use the `-i` switch:

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

The DiskUsage command give information about the used space of **directories and files**. The common switches are:

| switch | usage |
| :--- | :--- |
| -h | print sizes in powers of 1024 \(e.g., 1023M\) |
| -H | print sizes in powers of 1000 \(e.g., 1.1G\) |
| -c | show the grand total |
| --max-depth 2 | shows only 2 directories furthur |
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

## Repairing

We used the `fsck` for showing file system information but it is designed to _fix_ file systems too. If the boot time check find a problems, you will be put into a command line to fix the problems.

On non-journaling file systems \(ext2\) the fsck will show you many questions about each block and you have to say `y` if you want it to fix them. On journaling file systems \(ext3&4, xfs, ..\) the fsck has much less tasks to perform.

> for xfs file systems, we have `xfs_check` command

An important switch is `-n` which causes these commands **not to fix** anything and just show what was going to be done.

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

## Superblock

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

## Other tools

For the LPIC exam, it is good to know about these commands.

| filesystem | command | usage |
| :--- | :--- | :--- |
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

.

