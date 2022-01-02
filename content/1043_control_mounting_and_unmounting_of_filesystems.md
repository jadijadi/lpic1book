Title: 104.3. Control mounting and unmounting of filesystems
Date: 2015-12-25 12:20
Category: lpic102


# 104.3. Control mounting and unmounting of filesystems

weight: 3

**http://j.mp/jadilpic1**

Configure the mounting of a filesystem. Tasks include manually mounting and unmounting filesystems, configuring filesystem mounting on bootup, and configuring user-mountable removable filesystems.

- Mount and unmount filesystems manually
- Configure filesystem mounting on bootup
- Configure user-mountable, removable filesystems

## A note about Device UUIDs
As you saw, on /dev/ we can see hard disks, usb disks and such. But the there is an problem. When you refer to a disk ask /dev/sda2, you kind of say _the second partition on the firsrt disk_. If you disconnect this device and connect another disk and then connect back the device, it might become /dev/sdc2 or even /dev/sde2. We need a way to point to the exact drive with a persistant name. This is done via UUIDs.

````
root@funlife:/dev# cat /proc/mounts
rootfs / rootfs rw 0 0
sysfs /sys sysfs rw,nosuid,nodev,noexec,relatime 0 0
proc /proc proc rw,nosuid,nodev,noexec,relatime 0 0
udev /dev devtmpfs rw,relatime,size=4014804k,nr_inodes=1003701,mode=755 0 0
devpts /dev/pts devpts rw,nosuid,noexec,relatime,gid=5,mode=620,ptmxmode=000 0 0
tmpfs /run tmpfs rw,nosuid,noexec,relatime,size=806028k,mode=755 0 0
/dev/disk/by-uuid/1651a94e-0b4e-47fb-aca0-f77e05714617 / ext4 rw,relatime,errors=remount-ro,data=ordered 0 0
````

This UUID is uniq among all devices and this makes it much easier to work with it not only on different sessions on a same machine, but even after connecting it to another computer.


### Mounting and Unmounting

- Describe the linux filesystem concept. A huge tree.
- There are other kinds of mountings: tmpfs, NFS, ..
- It is better to mount on empty directories

#### Basic commands
```
cat /etc/fstab
mount /dev/sda1 /media
umount /media
```

#### Some switches
```
mount -t ext4 /dev/sda1 /media
mount -o remount,ro /dev/sda1
```

#### Get info on UUID and Label and Format
```
blkid /dev/sda2
```

### Bootup
/etc/fstab

- file system: Label, UUID, device
- mount point: swap or none for swap
- type: can be auto
- options:  defaults, rw / ro, noauto, user, exec / noexec, noatime
- dump: do dump command backup this? mostly 0
- pass: Non-zero values of pass specify the order of checking filesystems at boot time (seen in Integrity of file systems)

**note:**
- User-mounted filesystems default to noexec unless exec is specified after user.
- noatime will disable recording of access times. Not using access times may improve performance.

### swap
```
swapon
swapoff
swapon -s
```
