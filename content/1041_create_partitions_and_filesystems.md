Title: 104.1 Create partitions and filesystems
Date: 2010-12-03 10:20
Category: LPIC1
Tags: LPIC1, 101, LPIC1-101-500
Authors: Jadi
Summary: 
sortorder: 200

_Weight: 2_

Description: Candidates should be able to configure disk partitions and then create filesystems on media such as hard disks. This includes the handling of swap partitions.

### Objective

* Manage MBR and GPT partition tables
* Use various mkfs commands to create various filesystems such as:
    * ext2/ext3/ext4
    * XFS
    * VFAT
    * exFAT
* Basic feature knowledge of Btrfs, including multi-device filesystems, compression and subvolumes.

* fdisk
* gdisk
* parted
* mkfs
* mkswap

<iframe width="560" height="315" src="https://www.youtube.com/embed/xSQdIIMGG2g" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

### Block devices
A block device is a nonvolatile mass storage device whose information can be accessed in any order; like hard disks, USB memories, floppy disks, and CD-ROMs. We *format* these devices to fixed sized blocks.

We can check all block devices using `lsblk` command. In addition on a long ls format (`-l`), block devices are shown with a `b` at the first column:

```
jadi@debianamd:~$ ls /dev/ -l | grep "^b"
brw-rw----  1 root disk      8,   0 Feb  3  2023 sda
brw-rw----  1 root disk      8,  16 Feb  3  2023 sdb
brw-rw----  1 root disk      8,  17 Feb  3  2023 sdb1
brw-rw----  1 root disk      8,  18 Feb  3  2023 sdb2
brw-rw----  1 root disk      8,  19 Feb  3  2023 sdb3
brw-rw----+ 1 root cdrom    11,   0 Feb  3  2023 sr0
```


It is possible to create **partitions** on a block device and even split it and use it as multiple disks. Systems with old BIOS boot loaders use the **Master Boot Record (MBR)** method for patitioning and newer UEFI systems, do you **GUID Parition Table (GPT)** formats.

Linux systems use `udev` to add block devices and their paritions to the `/dev` in the form of `/dev/sdb1` (2nd disk (b) and first parition (1)). 

### Editing Partition Tables
#### fdisk

`fdisk` is the main command for viewing / changing and creating partitions on MBR systems. the `-l` switch lists the partitions:

```
# fdisk -l /dev/sdb
Disk /dev/sdb: 20 GiB, 21474836480 bytes, 41943040 sectors
Disk model: QEMU HARDDISK
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: gpt
Disk identifier: 11D48091-5AA7-422A-85F7-A23F476CDFD7

Device        Start      End  Sectors  Size Type
/dev/sdb1      2048  1050623  1048576  512M EFI System
/dev/sdb2   1050624 39942143 38891520 18.5G Linux filesystem
/dev/sdb3  39942144 41940991  1998848  976M Linux swap
```

* The **Boot** flag shows which partition starts the boot on DOS PCs and has no importance on LILO & GRUB
* Start and End shows where this partition is located on the disk.
* Size shows each partition size .
* ID indicates the partition format \(82 is swap, 83 is linux data, ... check all with `l` in interactive mode\)

It is also possible to run fdisk in interactive mode. `m` will show you the help menu:

```
~# fdisk /dev/sda

Welcome to fdisk (util-linux 2.36.1).
Changes will remain in memory only, until you decide to write them.
Be careful before using the write command.

Device does not contain a recognized partition table.
Created a new DOS disklabel with disk identifier 0xe2dbaded.

Command (m for help): m

Help:

  DOS (MBR)
   a   toggle a bootable flag
   b   edit nested BSD disklabel
   c   toggle the dos compatibility flag

  Generic
   d   delete a partition
   F   list free unpartitioned space
   l   list known partition types
   n   add a new partition
   p   print the partition table
   t   change a partition type
   v   verify the partition table
   i   print information about a partition

  Misc
   m   print this menu
   u   change display/entry units
   x   extra functionality (experts only)

  Script
   I   load disk layout from sfdisk script file
   O   dump disk layout to sfdisk script file

  Save & Exit
   w   write table to disk and exit
   q   quit without saving changes

  Create a new label
   g   create a new empty GPT partition table
   G   create a new empty SGI (IRIX) partition table
   o   create a new empty DOS partition table
   s   create a new empty Sun partition table


Command (m for help):
```

To check current partition list, try the `p` (print) command:

```
Command (m for help): p
Disk /dev/sdb: 20 GiB, 21474836480 bytes, 41943040 sectors
Disk model: QEMU HARDDISK
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: gpt
Disk identifier: 11D48091-5AA7-422A-85F7-A23F476CDFD7

Device        Start      End  Sectors  Size Type
/dev/sdb1      2048  1050623  1048576  512M EFI System
/dev/sdb2   1050624 39942143 38891520 18.5G Linux filesystem
/dev/sdb3  39942144 41940991  1998848  976M Linux swap
```

You should remember the disk layouts concepts from the [chapter 102.1](/1021-design-hard-disk-layout.html). So lets create some paritions using `fdisk`. I will use the `n` for *new*:

```
# fdisk /dev/sda

Welcome to fdisk (util-linux 2.36.1).
Changes will remain in memory only, until you decide to write them.
Be careful before using the write command.

Device does not contain a recognized partition table.
Created a new DOS disklabel with disk identifier 0x40bd0f72.

Command (m for help): n
Partition type
   p   primary (0 primary, 0 extended, 4 free)
   e   extended (container for logical partitions)
Select (default p): p
Partition number (1-4, default 1):
First sector (2048-8388607, default 2048):
Last sector, +/-sectors or +/-size{K,M,G,T,P} (2048-8388607, default 8388607): +1G

Created a new partition 1 of type 'Linux' and of size 1 GiB.

Command (m for help): p
Disk /dev/sda: 4 GiB, 4294967296 bytes, 8388608 sectors
Disk model: QEMU HARDDISK
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0x40bd0f72

Device     Boot Start     End Sectors Size Id Type
/dev/sda1        2048 2099199 2097152   1G 83 Linux
```

Lets  create another Extened parition and add a Linux (83) and a Swap (82) parition there. 

```
Command (m for help): n
Partition type
   p   primary (1 primary, 0 extended, 3 free)
   e   extended (container for logical partitions)
Select (default p): e
Partition number (2-4, default 2):
First sector (2099200-8388607, default 2099200):
Last sector, +/-sectors or +/-size{K,M,G,T,P} (2099200-8388607, default 8388607):

Created a new partition 2 of type 'Extended' and of size 3 GiB.

Command (m for help): p
Disk /dev/sda: 4 GiB, 4294967296 bytes, 8388608 sectors
Disk model: QEMU HARDDISK
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0x40bd0f72

Device     Boot   Start     End Sectors Size Id Type
/dev/sda1          2048 2099199 2097152   1G 83 Linux
/dev/sda2       2099200 8388607 6289408   3G  5 Extended

Command (m for help): n
All space for primary partitions is in use.
Adding logical partition 5
First sector (2101248-8388607, default 2101248):
Last sector, +/-sectors or +/-size{K,M,G,T,P} (2101248-8388607, default 8388607):

Created a new partition 5 of type 'Linux' and of size 3 GiB.

Command (m for help): p
Disk /dev/sda: 4 GiB, 4294967296 bytes, 8388608 sectors
Disk model: QEMU HARDDISK
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0x40bd0f72

Device     Boot   Start     End Sectors Size Id Type
/dev/sda1          2048 2099199 2097152   1G 83 Linux
/dev/sda2       2099200 8388607 6289408   3G  5 Extended
/dev/sda5       2101248 8388607 6287360   3G 83 Linux
```

Oh! I forgot to allocate space for the swap partition. Lets delete the previous one and add two new ones:

```
Command (m for help): d
Partition number (1,2,5, default 5): 5

Partition 5 has been deleted.

Command (m for help): n
All space for primary partitions is in use.
Adding logical partition 5
First sector (2101248-8388607, default 2101248):
Last sector, +/-sectors or +/-size{K,M,G,T,P} (2101248-8388607, default 8388607): +1G

Created a new partition 5 of type 'Linux' and of size 1 GiB.

Command (m for help): p
Disk /dev/sda: 4 GiB, 4294967296 bytes, 8388608 sectors
Disk model: QEMU HARDDISK
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0x40bd0f72

Device     Boot   Start     End Sectors Size Id Type
/dev/sda1          2048 2099199 2097152   1G 83 Linux
/dev/sda2       2099200 8388607 6289408   3G  5 Extended
/dev/sda5       2101248 4198399 2097152   1G 83 Linux

Command (m for help): n
All space for primary partitions is in use.
Adding logical partition 6
First sector (4200448-8388607, default 4200448):
Last sector, +/-sectors or +/-size{K,M,G,T,P} (4200448-8388607, default 8388607):

Created a new partition 6 of type 'Linux' and of size 2 GiB.
```

And now, I have to change the type of the parition 6 to swap:

```
Command (m for help): t
Partition number (1,2,5,6, default 6): 6
Hex code or alias (type L to list all): L

00 Empty            24 NEC DOS          81 Minix / old Lin  bf Solaris
01 FAT12            27 Hidden NTFS Win  82 Linux swap / So  c1 DRDOS/sec (FAT-
02 XENIX root       39 Plan 9           83 Linux            c4 DRDOS/sec (FAT-
03 XENIX usr        3c PartitionMagic   84 OS/2 hidden or   c6 DRDOS/sec (FAT-
04 FAT16 <32M       40 Venix 80286      85 Linux extended   c7 Syrinx
05 Extended         41 PPC PReP Boot    86 NTFS volume set  da Non-FS data
06 FAT16            42 SFS              87 NTFS volume set  db CP/M / CTOS / .
07 HPFS/NTFS/exFAT  4d QNX4.x           88 Linux plaintext  de Dell Utility
08 AIX              4e QNX4.x 2nd part  8e Linux LVM        df BootIt
09 AIX bootable     4f QNX4.x 3rd part  93 Amoeba           e1 DOS access
0a OS/2 Boot Manag  50 OnTrack DM       94 Amoeba BBT       e3 DOS R/O
0b W95 FAT32        51 OnTrack DM6 Aux  9f BSD/OS           e4 SpeedStor
0c W95 FAT32 (LBA)  52 CP/M             a0 IBM Thinkpad hi  ea Linux extended
0e W95 FAT16 (LBA)  53 OnTrack DM6 Aux  a5 FreeBSD          eb BeOS fs
0f W95 Ext'd (LBA)  54 OnTrackDM6       a6 OpenBSD          ee GPT
10 OPUS             55 EZ-Drive         a7 NeXTSTEP         ef EFI (FAT-12/16/
11 Hidden FAT12     56 Golden Bow       a8 Darwin UFS       f0 Linux/PA-RISC b
12 Compaq diagnost  5c Priam Edisk      a9 NetBSD           f1 SpeedStor
14 Hidden FAT16 <3  61 SpeedStor        ab Darwin boot      f4 SpeedStor
16 Hidden FAT16     63 GNU HURD or Sys  af HFS / HFS+       f2 DOS secondary
17 Hidden HPFS/NTF  64 Novell Netware   b7 BSDI fs          fb VMware VMFS
18 AST SmartSleep   65 Novell Netware   b8 BSDI swap        fc VMware VMKCORE
1b Hidden W95 FAT3  70 DiskSecure Mult  bb Boot Wizard hid  fd Linux raid auto
1c Hidden W95 FAT3  75 PC/IX            bc Acronis FAT32 L  fe LANstep
1e Hidden W95 FAT1  80 Old Minix        be Solaris boot     ff BBT

Aliases:
   linux          - 83
   swap           - 82
   extended       - 05
   uefi           - EF
   raid           - FD
   lvm            - 8E
   linuxex        - 85
Hex code or alias (type L to list all): swap

Changed type of partition 'Linux' to 'Linux swap / Solaris'.

Command (m for help): p
Disk /dev/sda: 4 GiB, 4294967296 bytes, 8388608 sectors
Disk model: QEMU HARDDISK
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0x40bd0f72

Device     Boot   Start     End Sectors Size Id Type
/dev/sda1          2048 2099199 2097152   1G 83 Linux
/dev/sda2       2099200 8388607 6289408   3G  5 Extended
/dev/sda5       2101248 4198399 2097152   1G 83 Linux
/dev/sda6       4200448 8388607 4188160   2G 82 Linux swap / Solaris
```

Satisfied! Let's `v`erify and then `w`rite the results:

```
Command (m for help): v
No errors detected.
Remaining 4094 unallocated 512-byte sectors.

Command (m for help): w
The partition table has been altered.
Calling ioctl() to re-read partition table.
Syncing disks.

root@debianamd:~# fdisk -l /dev/sda
Disk /dev/sda: 4 GiB, 4294967296 bytes, 8388608 sectors
Disk model: QEMU HARDDISK
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0x40bd0f72

Device     Boot   Start     End Sectors Size Id Type
/dev/sda1          2048 2099199 2097152   1G 83 Linux
/dev/sda2       2099200 8388607 6289408   3G  5 Extended
/dev/sda5       2101248 4198399 2097152   1G 83 Linux
/dev/sda6       4200448 8388607 4188160   2G 82 Linux swap / Solaris
```
#### gdisk
As seen on [chapter 102.1](/1021-design-hard-disk-layout.html), we have used `gdisk` on GPT machines. Its not that different from `fdisk`. Lets have a look at its main commands:

```txt
root@debianamd:~# gdisk /dev/sda
GPT fdisk (gdisk) version 1.0.6  

Warning: Partition table header claims that the size of partition table
entries is 0 bytes, but this program  supports only 128-byte entries.
Adjusting accordingly, but partition table may be garbage.
Warning: Partition table header claims that the size of partition table
entries is 0 bytes, but this program  supports only 128-byte entries.
Adjusting accordingly, but partition table may be garbage.
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

Command (? for help): ?
b	back up GPT data to a file
c	change a partition's name
d	delete a partition
i	show detailed information on a partition
l	list known partition types
n	add a new partition
o	create a new empty GUID partition table (GPT)
p	print the partition table
q	quit without saving changes
r	recovery and transformation options (experts only)
s	sort partitions
t	change a partition's type code
v	verify disk
w	write table to disk and exit
x	extra functionality (experts only)
?	print this menu
```

As you can see, the partition table have to be compatible with your BIOS/UEFI setup. 

#### parted
`parted` is the GNU tool to edit partitions. Its main advantage is the ability to resize currently defined partitions but using it is a bit trickier than `fdisk` and `gdisk`:

```txt
# parted
GNU Parted 3.4
Using /dev/sda
Welcome to GNU Parted! Type 'help' to view a list of commands.
(parted) help
  align-check TYPE N                       check partition N for TYPE(min|opt) alignment
  help [COMMAND]                           print general help, or help on COMMAND
  mklabel,mktable LABEL-TYPE               create a new disklabel (partition table)
  mkpart PART-TYPE [FS-TYPE] START END     make a partition
  name NUMBER NAME                         name partition NUMBER as NAME
  print [devices|free|list,all|NUMBER]     display the partition table, available devices, free space, all found partitions, or a particular partition
  quit                                     exit program
  rescue START END                         rescue a lost partition near START and END
  resizepart NUMBER END                    resize partition NUMBER
  rm NUMBER                                delete partition NUMBER
  select DEVICE                            choose the device to edit
  disk_set FLAG STATE                      change the FLAG on selected device
  disk_toggle [FLAG]                       toggle the state of FLAG on selected device
  set NUMBER FLAG STATE                    change the FLAG on partition NUMBER
  toggle [NUMBER [FLAG]]                   toggle the state of FLAG on partition NUMBER
  unit UNIT                                set the default unit to UNIT
  version                                  display the version number and copyright information of GNU Parted
```

#### hint? use gparted
The `gparted` tool is a graphical tool to manage your partitioned. It has the ability to resize partitions and is super easy to use. Its not part of the LPIC exam but its good to know about it. just in case ;) [gparted.org](https://gparted.org/)

### Formatting the partition

<iframe width="560" height="315" src="https://www.youtube.com/embed/rQZVYtVOEhU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

#### Filesystems
After you partitioned your block devices, you have to format them to make them usable to store files and directories. Formatting a file system, creates a map which stores the location and name of files and directories and make it possible to move files between folders, deleting them or renaming them; think of it as the index of a book. 

There are several filesystems in the linux world but, these are the most commonly used ones:

| Format | Description |
| :---: | :--- |
| ext2 | second extended filesystem was developed to address shortcomings in the older Unix/Minix filesystem used in early versions of Linux. It has been used extensively on Linux for many years. There is no journaling in ext2, and it has largely been replaced by ext3 and more recently ext4. |
| ext3 | ext2 + journaling, max file size is 2TB and max filesystem size is 16TB |
| ext4 | current version of ext, max file size is 16TB and max filesystem size is 1EB (1000*1000TB) |
| XFS | journaling, caches to RAM, great for uninterruptible power supplies, Max file and filesystem size is 8EB |
| swap | Swap is used when the system needs to use more ram than what is has. It's like an extra ram on disk |
| VFAT | FAT32, no journaling, good for data exchange with windows, does not understand **permissions** and symbolic links |
| exFAT | Extended FAT. A newer version of FAT which is used mainly for extended device which should work on all machines; like USB disks |
| btrfs | A new high performance file system. Max file and filesize is 16 EB. Has its own form of RAID and LVM and build-in snapshots and fault tolerance and data compression on the fly. |

#### Creating filesystems
You can format your partitions with `mkfs` command \(and `mkswap` for swap\). This is a front end to commands like `mkfs.ext3` for *ext3*, `mkfs.ext4` for *ext4* and `mkfs.reiserfs` for *ReiserFS*. full list of installed on your system is here:

```
# ls /sbin/mk*
/sbin/mkdosfs  /sbin/mkexfatfs	/sbin/mkfs.bfs	   /sbin/mkfs.exfat  /sbin/mkfs.ext3  /sbin/mkfs.fat	/sbin/mkfs.msdos  /sbin/mkfs.vfat	  /sbin/mkinitramfs   /sbin/mkntfs
/sbin/mke2fs   /sbin/mkfs	/sbin/mkfs.cramfs  /sbin/mkfs.ext2   /sbin/mkfs.ext4  /sbin/mkfs.minix	/sbin/mkfs.ntfs   /sbin/mkhomedir_helper  /sbin/mklost+found  /sbin/mkswap
```

If using the `mkfs`, the main switch is `-type` \(or `-t`\) to specify the format:

```
# mkfs -t ext4 /dev/sda1
mke2fs 1.46.2 (28-Feb-2021)
Discarding device blocks: done
Creating filesystem with 262144 4k blocks and 65536 inodes
Filesystem UUID: 63625ecd-857a-419f-a300-12395aaad89f
Superblock backups stored on blocks:
	32768, 98304, 163840, 229376

Allocating group tables: done
Writing inode tables: done
Creating journal (8192 blocks): done
Writing superblocks and filesystem accounting information: done

root@debianamd:~# mkfs.exfat /dev/sda5
mkexfatfs 1.3.0
Creating... done.
Flushing... done.
File system created successfully.
```

If you need to assign a lable to the partition, you have to use the `-L lable_name` option. Please note that in recent system, people use UUIDs instead of labels. UUID of a disk can be viewed with:

```   
# blkid /dev/sda1
/dev/sda1: UUID="63625ecd-857a-419f-a300-12395aaad89f" BLOCK_SIZE="4096" TYPE="ext4" PARTUUID="40bd0f72-01"
```

and as the last task, lets create a swap on `/dev/sda6`:

```
# mkswap /dev/sda6
Setting up swapspace version 1, size = 2 GiB (2144333824 bytes)
no label, UUID=6a59cf20-8fd6-4d86-b044-89f7bc67993b
```

and then 

```
# swapon /dev/sda6
```

On chapter 14.3 we will see how we can *mount* / *unmount* these filesystems.
