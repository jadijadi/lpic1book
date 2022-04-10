Title: 102.1 Design hard disk layout
Date: 2010-12-03 10:20
Category: LPIC1
Tags: Linux Installation and Package Management, LPIC1, LPIC1-101-500
Authors: Jadi
Summary: 
sortorder: 060



_Weight: 2_

Description: Candidates should be able to design a disk partitioning scheme for a Linux system.

### Key Knowledge Areas

* Allocate filesystems and swap space to separate partitions or disks.
* Tailor the design to the intended use of the system.
* Ensure the /boot partition conforms to the hardware architecture requirements for booting.
* Knowledge of basic features of LVM
* / \(root\) filesystem
* /var filesystem
* /home filesystem
* swap space
* mount points
* partitions

### Basics

As any other OS, Linux uses _files_ and _directories_ to operate. But unlike _Windows_, it does not use A:, C:, D:, etc. In Linux everything is in _\*one big tree_, starting with / \(called root\). Any partition, disk, CD, USB, network drive, ... will be placed somewhere in this huge tree.

> Note: Most of external devices \(USB, CD, ..\) are mounted at /media/ or /mnt/ .

### Unix directories

| Directory | Description |
| :--- | :--- |
| bin | Essential command binaries |
| boot | Static files of the boot loader |
| dev | Device files |
| etc | Host-specific system configuration |
| home | Home directory of the users |
| lib | Essential shared libraries and kernel modules |
| media | Mount point for removable media |
| mnt | Mount point for mounting a filesystem temporarily |
| opt | Add-on application software packages |
| root | Home directory of the root user |
| sbin | Essential system binaries |
| srv | Data for services provided by this system |
| tmp | Temporary files |
| usr | Secondary hierarchy |
| var | Variable data |

### Partitions

In Linux world, devices are defined at /dev/. First SATA disk is /dev/sda, second SATA disk is /dev/sdb, ... and first SCSI disk \(older systems\) is /dev/hda.

You have to _PARTITION_ the disks, that is creating smaller parts on a big disk and calling them /dev/sda1 \(first partition on first SCSI disk\) or /dev/hd**b**3 \(3rd partition on second disk\).

```text
# fdisk /dev/sda
Welcome to fdisk (util-linux 2.25.1).
Changes will remain in memory only, until you decide to write them.
Be careful before using the write command.


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

#### Primary, Extended & Logical Partitions

The partition table is located in the master boot record \(**MBR**\) of a disk. The MBR is the first sector on the disk, so the partition table is not a very large part of it. This limits the primary partitions to 4 and the max size of a disk to around 2TBs. If you need more partitions you have a define one extended and then create logicals _inside_ them.

Linux numbers the primary partitions 1, 2, 3 & 4. If you define an extended partitions, logical partitions inside it will be called 5, 6, 7.

> Note: an Extended partition is just an empty box for creating Logical partitions inside it.

So:

* /dev/sda3 is the 3rd primary partition on the first disk
* /dev/sdb5 is the first logical partition on the second disk
* /dev/sda7 is the 3rd logical partition of the first physical disk

The newer **GUID Partition Table \(or GPT\)** solves this problems. If you format your disk with GTP you can have 128 primary partitions \(no need to extended and logical\).

### commands

#### parted

```text
jadi@funlife:~$ sudo parted /dev/sda p
Model: ATA ST320LT000-9VL14 (scsi)
Disk /dev/sda: 320GB
Sector size (logical/physical): 512B/512B
Partition Table: msdos
Disk Flags:

Number  Start   End     Size    Type      File system     Flags
 1      1049kB  22.1GB  22.1GB  primary   ext4            boot
 2      22.1GB  47.1GB  25.1GB  primary   ext4
 3      47.1GB  320GB   273GB   extended
 5      47.1GB  55.1GB  7999MB  logical   linux-swap(v1)
 6      55.1GB  320GB   265GB   logical
```

**fdisk**

```text
# sudo fdisk /dev/sda
[sudo] password for jadi:

Welcome to fdisk (util-linux 2.25.1).
Changes will remain in memory only, until you decide to write them.
Be careful before using the write command.


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

> Note: parted does not understands GPT

**gparted**

A graphical tool for managing disks and partitions.

![](http://www.ibm.com/developerworks/linux/library/l-lpic1-v3-102-1/gparted-1s.jpg)

#### LVM

In many cases you need to resize your partitions or even add new disks and _add_ them to your mount points. LVM is designed for this.

LVM helps you create one partition from different disks and add or remove space to them. The main concepts are:

* Physical Volume \(pv\): a whole drive or a partition. It is better to define partitions and **not use whole disks - unpartitioned**.
* Volume Groups \(vg\): this is the collection of one or more **pv**s. OS will see the vg as one big disk. PVs in one vg, can have different sizes or even be on different physical disks.
* Logical Volumes \(lv\): OS will see lvs as partitions. You can format an lv wit your OS and use it.

### Design Hard disk layout

Disk layout and allocation partitions to directories depends on you usage. First we will discuss _swap_ and _boot_ and then will see three different cases.

**swap**

swap in Linux works like an extended memory. Kernel will _page_ memory to this partition / file. It is enough to format one partition with **swap file system** and define it in /etc/fstab \(you will see this later in 104 modules\).

> Note: swap size is 1 or 2 times the system memory but not more than 8GBs. So if you have 2GB of RAM, swap will be 4GB but if you have 6GB of RAM, it is recommended to have a 8GB swap partition.

**/boot**

Older Linux systems were not able to handle HUGE disks during the boot \(say Terabytes\) so there were a separated /boot. It is also useful to recover broken systems or even you can make /boot read only. Most of the time, having 100MB for /boot is enough. This can be a different disk or a separated partition.

This partition should be accessible by BIOS during the boot \(no network drive\).

#### case one: Desktop computer

On a desktop computer, it is good to have one swap, one /boot and allocate all other space to / \(root\).

#### network workstation

As any other system /boot should be local \(a physical disk connected to the machine\) and most of the time, the / \(root file system\) is also local. But in a network station, /home can be mounted from a network drive \(NFS, SMB, SSH, ..\). This lets users to sit at any station, login and have their own home mounted from a network drive. Swap can be mounted from network or local.

#### Server

On servers /boot is still local and based on usage, /home can be local or network. In many cases we separate the /var because logs and many other files are there and being updated so it is good to separate it or even put it on a more advanced storage \(like RAID disks to prevent data loss\). Some people also separate the /usr and write-protect it \(read only file systems\) or even mount the /usr from network so they can change / update one file on the network storage and all the servers will use the new file \(you remember? /usr contains important executables like Apache web server\).
