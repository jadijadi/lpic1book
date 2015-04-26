# 104.3. Control mounting and unmounting of filesystems

weight: 3

**http://j.mp/jadilpic1**

Configure the mounting of a filesystem. Tasks include manually mounting and unmounting filesystems, configuring filesystem mounting on bootup, and configuring user-mountable removable filesystems. 

- Mount and unmount filesystems manually
- Configure filesystem mounting on bootup
- Configure user-mountable, removable filesystems

### Mounting and Unmounting

- Describe the linux filesystem concept. A huge tree.
- There are other kinds of mountings: tmpfs, NFS, ..
- It is better to mount on empty directories

#### Basic commands
```
cat /et/fstab
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
