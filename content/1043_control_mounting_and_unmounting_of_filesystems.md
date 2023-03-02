Title: 104.3 Control mounting and unmounting of filesystems
Date: 2010-12-03 10:20
Category: LPIC1
sortorder: 220


# 104.3. Control mounting and unmounting of filesystems



weight: 3

**http://j.mp/jadilpic1**

Candidates should be able to configure the mounting of a filesystem.

- Manually mount and unmount filesystems.
- Configure filesystem mounting on bootup.
- Configure user mountable removable filesystems.
- Use of labels and UUIDs for identifying and mounting file systems.
- Awareness of systemd mount units.

- /etc/fstab
- /media/
- mount
- umount
- blkid
- lsblk




<iframe width="560" height="315" src="https://www.youtube.com/embed/dod65eKzWtw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Mounting and Unmounting
When we have a formatted partition and need to use it, we have to `mount` it somewhere in the Linux directory hierarchy. Unlike Windows, the new *driver* do now show up as separated disks, but like *virtual subdirectories* somewhere in your `/` tree. 

Say we want to *mount* the /dev/sda3 on /media/mydisk. The directory `/media/mydisk` should be there and then, we just run:

```
sudo mount -t ext4 /dev/sda3 /media/mydisk
```

and all files and folders in /dev/sda3 will be accessible from /media/mydisk.

Run `mount` with no parameter to see all mounted devices. To **un mount**, simply use the `umount` on the drive or the directory. These two are equivalent:

```
sudo umount /dev/sda3
sudo umount /media/mydisk
```

Mounting and umounting can happen on many different storage types, for example on NFS storages, ISO (with `-o loop`), tmpfs, ...

> swap disks do not need mounting. You should use `swapon` and `swapoff` to use them.

The `-t` switch indicates the type of the filesystem and `-o` passes some options (say ro for readonly)

```
mount -t ext4 /dev/sda1 /media
mount -o remount,ro /dev/sda1
```

> The `/media` and `/mnt` directories are used to mount filesystems, although you can use any directory for this purpose

### UUID & Labels
As you already know, there is a problem when working with classical device names like `/dev/vdb1`: they change! The current /dev/sdb might be seen as /dev/sdd after you remove / reconnect it. To solve this, its better to work with UUIDs (Universal Unique Identifiers). Check them with `lsblk` (-O will show all available columns or specify with -o as below) and `blkid`.

```
# lsblk -o +UUID
NAME   MAJ:MIN RM  SIZE RO TYPE MOUNTPOINTS                             UUID
sr0     11:0    1  1.8G  0 rom  /run/media/jadi/Fedora-WS-Live-35_B-1-2 2021-09-22-21-47-34-00
zram0  251:0    0  1.9G  0 disk [SWAP]                                  
vda    252:0    0   20G  0 disk                                         
├─vda1 252:1    0  600M  0 part /boot/efi                               E13A-EF36
├─vda2 252:2    0    1G  0 part /boot                                   19ed96a1-3b36-4202-81bb-349f7adfb8b1
└─vda3 252:3    0 18.4G  0 part /home                                   076766a5-8864-4e35-a632-464b03396f7a
                                /                                       
vdb    252:16   0    2G  0 disk                                         
└─vdb1 252:17   0    2G  0 part /tmp/lkj                                4c1a51e6-47bf-4a34-84a2-87027c91e14a

# blkid
/dev/vdb1: UUID="4c1a51e6-47bf-4a34-84a2-87027c91e14a" BLOCK_SIZE="4096" TYPE="ext4" PARTUUID="5415e516-01"
/dev/sr0: BLOCK_SIZE="2048" UUID="2021-09-22-21-47-34-00" LABEL="Fedora-WS-Live-35_B-1-2" TYPE="iso9660"
/dev/zram0: LABEL="zram0" UUID="e459f522-1675-40d2-b318-51d9bd16d7bb" TYPE="swap"
/dev/vda2: UUID="19ed96a1-3b36-4202-81bb-349f7adfb8b1" BLOCK_SIZE="4096" TYPE="ext4" PARTUUID="5f4ee154-3ade-4af6-8809-6d90d5827d39"
/dev/vda3: LABEL="fedora_localhost-live" UUID="076766a5-8864-4e35-a632-464b03396f7a" UUID_SUB="a4340a29-6d9b-4c28-a7c8-b4aab5d08893" BLOCK_SIZE="4096" TYPE="btrfs" PARTUUID="a46e64aa-65ef-4a62-9bf8-96fd19aee353"
/dev/vda1: UUID="E13A-EF36" BLOCK_SIZE="512" TYPE="vfat" PARTLABEL="EFI System Partition" PARTUUID="a7a2b260-0302-45bc-a4db-42bd2e0ee7f2"

# blkid /dev/vdb1
/dev/vdb1: UUID="4c1a51e6-47bf-4a34-84a2-87027c91e14a" BLOCK_SIZE="4096" TYPE="ext4" PARTUUID="5415e516-01"

# mount UUID="4c1a51e6-47bf-4a34-84a2-87027c91e14a" /media/mydisk/
```

### fstab

<iframe width="560" height="315" src="https://www.youtube.com/embed/lQGvxIkdcSE" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

For automatic mounting, Linux uses the `/etc/fstab` file. Its like a table which shows what file system should be mounted where during the boot. This is my the /etc/fstab of my Fedora:

```
# cat /etc/fstab

#
# /etc/fstab
# Created by anaconda on Wed Oct 20 13:16:38 2021
#
# Accessible filesystems, by reference, are maintained under '/dev/disk/'.
# See man pages fstab(5), findfs(8), mount(8) and/or blkid(8) for more info.
#
# After editing this file, run 'systemctl daemon-reload' to update systemd
# units generated from this file.
#
UUID=076766a5-8864-4e35-a632-464b03396f7a /                       btrfs   subvol=root,compress=zstd:1 0 0
UUID=19ed96a1-3b36-4202-81bb-349f7adfb8b1 /boot                   ext4    defaults        1 2
UUID=E13A-EF36          /boot/efi               vfat    umask=0077,shortname=winnt 0 2
UUID=076766a5-8864-4e35-a632-464b03396f7a /home                   btrfs   subvol=home,compress=zstd:1 0 0

```

These are the columns:

- file system: Label, UUID, device
- mount point: swap or none for swap
- type: can be auto
- options:  defaults, rw / ro, noauto, user, exec / noexec, noatime, umask
- dump: do dump command backup this? mostly 0
- pass: Non-zero values of pass specify the order of checking filesystems at boot time

**note:**

- User-mounted filesystems default to noexec unless exec is specified after user.
- noatime will disable recording of access times. Not using access times may improve performance.

## Systemd mount units

When using systemd, a unit configuration file whose name ends in ".mount" encodes information about a file system mount point controlled and supervised by systemd. You can 

