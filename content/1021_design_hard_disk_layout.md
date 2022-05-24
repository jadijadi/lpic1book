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
* Ensure the `/boot` partition conforms to the hardware architecture requirements for booting.
* Knowledge of basic features of LVM


The following is a partial list of the used files, terms, and utilities:

* `/` (root) filesystem
* `/var` filesystem
* `/home` filesystem
* `/boot` filesystem
* EFI System Partition (ESP)
* Swap space
* Mount points
* Partitions


### Basics

<iframe width="560" height="315" src="https://www.youtube.com/embed/AGu0ulELDzE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Like any contemporary OS, Linux uses _files_ and _directories_ to operate. But unlike _Windows_, it does not use A:, C:, D:, etc. In Linux, everything is in _\*one big tree_, starting with `/` \(called root\). Any partition, disk, CD, USB, network drive, ... will be placed somewhere in this huge tree.

> Note: Most of external devices \(USB, CD, ..\) are mounted at `/media/` or `/mnt/` .

### Unix directories

This might be your enlightening moment in your linux journey. Understanding **Filesystem Hierarchy Standard (FHS)** can help you find your programs, configs, logs, ... without having prior knowlege about them. This is standard and the latest revision is for 2015.

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
| tmp | Temporary files, sometimes purged on each boot |
| usr | Secondary hierarchy |
| var | Variable data (logs, ...)|

### Partitions

<iframe width="560" height="315" src="https://www.youtube.com/embed/WHsjpzCYXo8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

In the Linux world, devices are defined at `/dev/`. First SATA or SCSI disks you will have `/dev/sda`, and for the 3rd PATA (super old) disk you will see `/dev/hdc`.

You have to _PARTITION_ the disks, that is create smaller parts on a big disk. These are self-contained sections on the main drive. OS sees these as standalone disks.  We call them /dev/sd**a**1 \(first partition of first SCSI disk\) or /dev/hd**b**3 \(3rd partition on second disk\).

BIOS systems were using MBR and could have up to 4 partitions on each disk, although instead of creating 4 Primary partitions, you could create an Extended partition and define more Logical partitions inside it.  

> Note: an Extended partition is just an empty box for creating Logical partitions inside it.

So:

* `/dev/sda3` is the 3rd primary partition on the first disk
* `/dev/sdb5` is the first logical partition on the second disk
* `/dev/sda7` is the 3rd logical partition of the first physical disk


UEFI systems use GUID Partition Table (GPT) which supports 128 partitions on each device.

> If you define an extended partition on a BIOS system, that will be `/dev/sdx5` (1-4 for primary, and the first extended will be 5). 


Linux systems can **mount** these partitions on different paths. Say you can have a separated disk with one huge partition for your `/home` and another one for your `/var/logs/`.


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

The newer **GUID Partition Table \(or GPT\)** solves these problems. If you format your disk with GPT you can have 128 primary partitions \(no need to extended and logical\).

### Commands

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

![](/images/gparted.png)

#### LVM

In many cases, you need to resize your partitions or even install new disks and _add_ them to your current mount points; increasing the total size. LVM is designed for this.

LVM helps you create one partition from different disks and add or remove space to them. The main concepts are:

* Physical Volume \(PV\): A whole drive or a partition. It is better to define partitions and **not use whole disks - unpartitioned**.
* Volume Groups \(VG\): This is the collection of one or more **PV**s. OS will see the vg as one big disk. PVs in one VG, can have different sizes or even be on different physical disks.
* Logical Volumes \(LV\): OS will see lvs as partitions. You can format an LV with your OS and use it.

### Design Hard disk layout

Disk layout and allocation partitions to directories depend on your usage. First, we will discuss _swap_ and _boot_ and then will see three different cases.

**swap**

Swap in Linux works like an extended memory. The Kernel will _page_ memory to this partition/file. It is enough to format one partition with **swap file system** and define it in `/etc/fstab` \(you will see this later in 104 modules\).

> Note: There is no strict formula for swap size. People used to say "double the ram but not more than 8GB". On recent machines with SSDs, some say "RAM + 2" (Hibernation + some extra ) or "RAM * 2" depending on your usage.

**/boot**

Older Linux systems were not able to handle HUGE disks during the boot \(say Terabytes\) so there was a separated `/boot`. It is also useful to recover broken systems or even you can make `/boot` read-only. Most of the time, having 100MB for `/boot` is enough. This can be a different disk or a separated partition.

This partition should be accessible by BIOS/UEFI during the boot \(no network drive\).

On UEFI systems, there is a `/boot/efi` mount point called EFI (Extensible Firmware Interface) system partition or ESP. This contains the bootloader and kernel and should be accessible by the UEFI firmware during the boot.

#### Case one: Desktop computer

On a desktop computer, it is good to have one swap, one `/boot`, and allocate all other space to `/` \(root\).

#### Case two: Network workstation

As any other system `/boot` should be local \(a physical disk connected to the machine\) and most of the time, the `/` \(root file system\) is also local. But in a network station, `/home` can be mounted from a network drive \(NFS, SMB, SSH, ..\). This lets users sit at any station, login, and have their own home mounted from a network drive. Swap can be mounted from network or local.

#### Case three: Server

On servers `/boot` is still local and based on usage, `/home` can be local or network. In many cases, we separate the `/var` because logs and many other files are there and being updated so it is good to separate it or even put it on more advanced storage \(like RAID disks to prevent data loss\). Some people also separate the `/usr` and write-protect it \(read-only file systems\) or even mount the /usr from the network so they can change/update one file on the network storage and all the servers will use the new file \(you remember? `/usr` contains important executables like Apache webserver\).
