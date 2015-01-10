# 104.1. Create partitions and filesystems

*Weight: 2*

Description: Candidates should be able to configure disk partitions and then create filesystems on media such as hard disks. This includes the handling of swap partitions.

## Objective
- Use various mkfs commands to set up partitions and create various filesystems such as:
- ext2/ext3/ext4
- xfs
- reiserfs v3
- vfat

- fdisk
- mkfs
- mkswap

## Blocked devices
Is a technical term for any storage device which can be formatted to fixed sized blocks and blocks should be able to be accessed individually. That is Hard disks, USB Memories, CDs,  ..

In long ls format, the first **b** indicates Block Device:

```
jadi@funlife:~/w/lpic/101/103.4$ ls -l /dev/loop1  /dev/sd[a-zb] 
brw-rw---- 1 root disk 7, 1 Jan  8 10:46 /dev/loop1
brw-rw---- 1 root disk 8, 0 Jan  8 10:46 /dev/sda
```
Some block devices mostly used as one single filesystem (like CDs & Floppies) and some are divided into **Partitions** (Hard disks).

## fdisk
`fdisk` is the main command for viewing / changing and creating partitions. `-l` switch is for show:

```
root@funlife:~# fdisk -l /dev/sda

Disk /dev/sda: 298.1 GiB, 320072933376 bytes, 625142448 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0x000beca1

Device     Boot     Start       End   Sectors   Size Id Type
/dev/sda1  *         2048  43094015  43091968  20.6G 83 Linux
/dev/sda2        43094016  92078390  48984375  23.4G 83 Linux
/dev/sda3        92080126 625141759 533061634 254.2G  5 Extended
/dev/sda5        92080128 107702271  15622144   7.5G 82 Linux swap / Solaris
/dev/sda6       107704320 625141759 517437440 246.8G 83 Linux
```
- The **Boot** flag shows which partition starts the boot on DOS PCs and has no importance on LILO & GRUB
- Start and End shows the where this partition is located on the disk
- Size is size!
- ID indicated the partiton format (82 is swap, 83 is linux data, ..)

It is also possible to run fdisk in interactive mode. `m` wlii show you the help:

```
root@funlife:~# fdisk /dev/sda

Welcome to fdisk (util-linux 2.25.1).
Changes will remain in memory only, until you decide to write them.
Be careful before using the write command.


Command (m for help): m

Help:

  DOS (MBR)
   a   toggle a bootable flag
   b   edit nested BSD disklabel
   c   toggle the dos compatibility flag

  Generic
   d   delete a partition
   l   list known partition types
   n   add a new partition
   p   print the partition table
   t   change a partition type
   v   verify the partition table

  Misc
   m   print this menu
   u   change display/entry units
   x   extra functionality (experts only)

  Save & Exit
   w   write table to disk and exit
   q   quit without saving changes

  Create a new label
   g   create a new empty GPT partition table
   G   create a new empty SGI (IRIX) partition table
   o   create a new empty DOS partition table
   s   create a new empty Sun partition table


```

`p` displays the current partitions:

```
Command (m for help): p
Disk /dev/sda: 298.1 GiB, 320072933376 bytes, 625142448 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0x000beca1

Device     Boot     Start       End   Sectors   Size Id Type
/dev/sda1  *         2048  43094015  43091968  20.6G 83 Linux
/dev/sda2        43094016  92078390  48984375  23.4G 83 Linux
/dev/sda3        92080126 625141759 533061634 254.2G  5 Extended
/dev/sda5        92080128 107702271  15622144   7.5G 82 Linux swap / Solaris
/dev/sda6       107704320 625141759 517437440 246.8G 83 Linux
```

You may remember the disk layouts from other chapters. `fdisk` can create them. Lets first delete my first partition:

```
Command (m for help): p
Disk /dev/sda: 298.1 GiB, 320072933376 bytes, 625142448 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0x000beca1

Device     Boot     Start       End   Sectors   Size Id Type
/dev/sda1  *         2048  43094015  43091968  20.6G 83 Linux
/dev/sda2        43094016  92078390  48984375  23.4G 83 Linux
/dev/sda3        92080126 625141759 533061634 254.2G  5 Extended
/dev/sda5        92080128 107702271  15622144   7.5G 82 Linux swap / Solaris
/dev/sda6       107704320 625141759 517437440 246.8G 83 Linux


Command (m for help): d
Partition number (1-3,5,6, default 6): 1

Partition 1 has been deleted.
```

I'm brave! NBow lets create a smaller one there:

```
Command (m for help): n
Partition type
   p   primary (1 primary, 1 extended, 2 free)
   l   logical (numbered from 5)
Select (default p): p
Partition number (1,4, default 1): 1
First sector (2048-625142447, default 2048): 
Last sector, +sectors or +size{K,M,G,T,P} (2048-43094015, default 43094015): +15G

Created a new partition 1 of type 'Linux' and of size 15 GiB.

Command (m for help): p
Disk /dev/sda: 298.1 GiB, 320072933376 bytes, 625142448 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0x000beca1

Device     Boot     Start       End   Sectors   Size Id Type
/dev/sda1            2048  31459327  31457280    15G 83 Linux
/dev/sda2        43094016  92078390  48984375  23.4G 83 Linux
/dev/sda3        92080126 625141759 533061634 254.2G  5 Extended
/dev/sda5        92080128 107702271  15622144   7.5G 82 Linux swap / Solaris
/dev/sda6       107704320 625141759 517437440 246.8G 83 Linux
```

> This new partitioned is not formatted but still masked 83 for later use. If I needed to use this partition as **swap** I had to set its ID to 82:

```
Command (m for help): p
Disk /dev/sda: 298.1 GiB, 320072933376 bytes, 625142448 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0x000beca1

Device     Boot     Start       End   Sectors   Size Id Type
/dev/sda1            2048  31459327  31457280    15G 83 Linux
/dev/sda2        43094016  92078390  48984375  23.4G 83 Linux
/dev/sda3        92080126 625141759 533061634 254.2G  5 Extended
/dev/sda5        92080128 107702271  15622144   7.5G 82 Linux swap / Solaris
/dev/sda6       107704320 625141759 517437440 246.8G 83 Linux


Command (m for help): t
Partition number (1-3,5,6, default 6): 1
Hex code (type L to list all codes): L 

 0  Empty           24  NEC DOS         81  Minix / old Lin bf  Solaris        
 1  FAT12           27  Hidden NTFS Win 82  Linux swap / So c1  DRDOS/sec (FAT-
 2  XENIX root      39  Plan 9          83  Linux           c4  DRDOS/sec (FAT-
 3  XENIX usr       3c  PartitionMagic  84  OS/2 hidden C:  c6  DRDOS/sec (FAT-
 4  FAT16 <32M      40  Venix 80286     85  Linux extended  c7  Syrinx         
 5  Extended        41  PPC PReP Boot   86  NTFS volume set da  Non-FS data    
 6  FAT16           42  SFS             87  NTFS volume set db  CP/M / CTOS / .
 7  HPFS/NTFS/exFAT 4d  QNX4.x          88  Linux plaintext de  Dell Utility   
 8  AIX             4e  QNX4.x 2nd part 8e  Linux LVM       df  BootIt         
 9  AIX bootable    4f  QNX4.x 3rd part 93  Amoeba          e1  DOS access     
 a  OS/2 Boot Manag 50  OnTrack DM      94  Amoeba BBT      e3  DOS R/O        
 b  W95 FAT32       51  OnTrack DM6 Aux 9f  BSD/OS          e4  SpeedStor      
 c  W95 FAT32 (LBA) 52  CP/M            a0  IBM Thinkpad hi eb  BeOS fs        
 e  W95 FAT16 (LBA) 53  OnTrack DM6 Aux a5  FreeBSD         ee  GPT            
 f  W95 Ext'd (LBA) 54  OnTrackDM6      a6  OpenBSD         ef  EFI (FAT-12/16/
10  OPUS            55  EZ-Drive        a7  NeXTSTEP        f0  Linux/PA-RISC b
11  Hidden FAT12    56  Golden Bow      a8  Darwin UFS      f1  SpeedStor      
12  Compaq diagnost 5c  Priam Edisk     a9  NetBSD          f4  SpeedStor      
14  Hidden FAT16 <3 61  SpeedStor       ab  Darwin boot     f2  DOS secondary  
16  Hidden FAT16    63  GNU HURD or Sys af  HFS / HFS+      fb  VMware VMFS    
17  Hidden HPFS/NTF 64  Novell Netware  b7  BSDI fs         fc  VMware VMKCORE 
18  AST SmartSleep  65  Novell Netware  b8  BSDI swap       fd  Linux raid auto
1b  Hidden W95 FAT3 70  DiskSecure Mult bb  Boot Wizard hid fe  LANstep        
1c  Hidden W95 FAT3 75  PC/IX           be  Solaris boot    ff  BBT            
1e  Hidden W95 FAT1 80  Old Minix      
Hex code (type L to list all codes): 82

Changed type of partition 'Linux' to 'Linux swap / Solaris'.

Command (m for help): p
Disk /dev/sda: 298.1 GiB, 320072933376 bytes, 625142448 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0x000beca1

Device     Boot     Start       End   Sectors   Size Id Type
/dev/sda1            2048  31459327  31457280    15G 82 Linux swap / Solaris
/dev/sda2        43094016  92078390  48984375  23.4G 83 Linux
/dev/sda3        92080126 625141759 533061634 254.2G  5 Extended
/dev/sda5        92080128 107702271  15622144   7.5G 82 Linux swap / Solaris
/dev/sda6       107704320 625141759 517437440 246.8G 83 Linux
```

> b is code for FAT32 (windows 95).

But all we done was in memory! We need to write it to the partition table. 'v' will verify the setup:

```
Command (m for help): v
Remaining 11639159 unallocated 512-byte sectors.
```
It tells me that I have unallocated space! I'm waisting my hard but I'm fine with it. So lets save it with `w` comamnd (for write):

```
Command (m for help): w

The partition table has been altered.
Calling ioctl() to re-read partition table.
Re-reading the partition table failed.: Device or resource busy

The kernel still uses the old table. The new table will be used at the next reboot or after you run partprobe(8) or kpartx(8).
```

## Fomatting the partition
Linux can handle more than 100 kind of partitions but most commons are:

|Format|Description|
|---|---|
|ext2|second extended filesystem was developed to address shortcomings in the Minix filesystem used in early versions of Linux. It has been used extensively on Linux for many years. There is no journaling in ext2, and it has largely been replaced by ext3 and more recently ext4.|
|ext3| ext2 + jopurnaling, total storage can be 1EXAByte and each file can be 16TB, ...|
|ReiserFS|ReiserFS is a B-tree-based filesystem, great for large numbers of small files, journaling, no longer in active development & does not support SELinux, replaced with Reiser4. |
|XFS| journaling, caches to RAM, great for uninterruptible power supplies|
|swap| Swap space must be formatted for use as swap space, but it is not generally considered a filesystem. |
|vfat|FAT32, no journaling, good for data exchange with windows, does not understand permissions and symbolic links|
|ext4|newer than ext3|

You can format your partitions with `mkfs` command (and `mkswap` for swap). There are is front end to commands like  mkfs.ext3 for ext3, mkfs.ext4 for ext4 and mkfs.reiserfs for ReiserFS. full list of installed on your system is here:

```
root@funlife:~# ls /sbin/mk* 
/sbin/mkdosfs  /sbin/mkfs      /sbin/mkfs.cramfs  /sbin/mkfs.ext3  /sbin/mkfs.ext4dev  /sbin/mkfs.minix  /sbin/mkfs.ntfs  /sbin/mkhomedir_helper  /sbin/mkswap
/sbin/mke2fs   /sbin/mkfs.bfs  /sbin/mkfs.ext2    /sbin/mkfs.ext4  /sbin/mkfs.fat      /sbin/mkfs.msdos  /sbin/mkfs.vfat  /sbin/mkntfs

```

The main switch is ``-type`` (or `-t`) to specify the format:

```
root@funlife:~# mkfs -t ext3 /dev/sda1
mke2fs 1.42.10 (18-May-2014)
/dev/sda1 contains a ext4 file system
	last mounted on /mnt on Mon Dec 22 12:04:22 2014
Proceed anyway? (y,n) y
Creating filesystem with 5386496 4k blocks and 1349040 inodes
Filesystem UUID: 0b5aad86-b507-41b9-a0ff-cf899cb92785
Superblock backups stored on blocks: 
	32768, 98304, 163840, 229376, 294912, 819200, 884736, 1605632, 2654208, 
	4096000

Allocating group tables: done                            
Writing inode tables: done                            
Creating journal (32768 blocks): done
Writing superblocks and filesystem accounting information: done   

root@funlife:~# 
```

> This will have a same effect: `mkfs.ext3 /dev/sda1`

If you need to assign a lable to the partition, you have to use the `-L lable_name` option. Please note that in renect system, people use UUIDs instead of lables. UUID of a disk can be viewed with:

```
$ blkid /dev/sda1
/dev/sda1: UUID="59d8cbdb-0e78-4605-8aaf-cf02fcb85d2e" SEC_TYPE="ext2" TYPE="ext3" 
```
## GPT
Some systems use GUID Partition Table (GPT) instead of older MBR. In this case you have to use the `gdisk` tool which has more capabilities than `fdisk`.

```
root@funlife:~# gdisk /dev/sda
GPT fdisk (gdisk) version 0.8.8

Partition table scan:
  MBR: MBR only
  BSD: not present
  APM: not present
  GPT: not present


***************************************************************
Found invalid GPT and valid MBR; converting MBR to GPT format
in memory. THIS OPERATION IS POTENTIALLY DESTRUCTIVE! Exit by
typing 'q' if you don't want to convert your MBR partitions
to GPT format!
***************************************************************
```

### creating different partitions

|Partition|Format type|Sample Command|Notes|
|---|---|---|-|
|/dev/sda3|ext4|`mkfs -t ext4 -L data`/dev/sda3|Named it *dafa*. Or use the `mkfs.ext4` command|
|/dev/sdb2|xfs|`mkfs -t xfs -i size=512 /dev/sdb2`|telling it to have larger inodes (normal is 256)|
|/dev/sda8|ReiserFS|`mkfs -f reiserfs /dev/sda8`|Or you can use `mkreiserfs` command.
|/dev/sdc|FAT32|`mkfs -f vfat /dev/sdc`|Or you can use `mkfs.vfat` command|
|/dev/sda2|swap|`mkswap /dev/sda2`|will be used as swap space|











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