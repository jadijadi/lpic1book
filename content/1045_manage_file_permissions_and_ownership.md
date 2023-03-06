Title: 104.5 Manage file permissions and ownership
Date: 2010-12-03 10:20
Category: LPIC1
Tags: LPIC1, 101, LPIC1-101-500
Authors: Jadi
sortorder: 240
Summary: 
## 104.5 Manage file permissions and ownership

_Weight: 3_

Candidates should be able to control file access through the proper use of permissions and ownerships.

### Objectives

* Manage access permissions on regular and special files as well as directories.
* Use access modes such as suid, sgid and the sticky bit to maintain security.
* Know how to change the file creation mask.
* Use the group field to grant file access to group members.

* chmod
* umask
* chown
* chgrp

### Users and Groups

A linux system can have many users and many groups. You can login with one user and use `su` command to change to another group. Each user belongs to one primary group and can be a member of other groups too.

To check your user and group use the `whoami`, `groups` and `id` commands.

```text
- $ whoami
jadi
- $ groups
jadi adm cdrom sudo dip plugdev netdev lpadmin sambashare debian-tor
- $ id
uid=1000(jadi) gid=1000(jadi) groups=1000(jadi),4(adm),24(cdrom),27(sudo),30(dip),46(plugdev),102(netdev),108(lpadmin),124(sambashare),125(debian-tor)
- $ su root -
Password:
- # id
uid=0(root) gid=0(root) groups=0(root)
- # exit
exit
- $ whoami
jadi
```

As you can see `id` shows both user and group information.

> Note the 0 UID of 0 GID of the root user and root group

These are stored in `/etc/passwd` and `/etc/group` files.

```text
$ cat /etc/group | grep adm
adm:x:4:syslog,jadi
lpadmin:x:108:jadi
```

### File ownership & permissions
Linux uses three layers of access / permissions for each file or directory: User, Group & Others.

Each file belongs to one user and one group and this user and the members of that group will have specific read/write/execute accesses on it. Have a look:

```text
$ ls -ltrh script.sh
-rwxr-xr-x 1 jadi adm 34 Mar  5  2023 script.sh
```

In above example, `jadi` is the owner of the file. The file belongs to the `adm` group and the owner (jadi here) has  **r**ead, **w**rite \(including deletion and edit\) & **e**xecute \(reading directory content\) permissions on the file while the `adm` group members and **others** only have read & execute access.

![](/images/file_permissions.png)

> In many distros, when you create a user, system creates a group with same name and assign that users files to that group

The below table shows some more information regarding the first part of the `ls -l` command:

| location | meaning |
| :--- | :--- |
| 1 | What this entry is. Dash \(-\) is for ordinary files, 'l' is for links & 'd' is for directory |
| 2,3,4 | read, write and execute access for the owner |
| 5,6,7 | read, write and execute access for the group members |
| 8,9,10 | read, write and execute access for other users |
| 11 | Indicated if any other access methods \(such as SELinux\) are applies to this file - not part of the LPIC 101 exam |

Lets check another example.

```text
$ ls -l /sbin/fdisk
-rwxr-xr-x 1 root root 267176 Oct 15 18:58 /sbin/fdisk
```

We can see that the `fdisk` can be read, be written and be executed by its owner \(root\). Other users (even if they belong to the gropu `root`) can only read and execute it.

> although non-root users can execute the fdisk, this program wont do much if it sees that a non root user is running it.

Lets look at another example:

```text
$ ls -l /home/
total 12
drwxr-xr-x 160 jadi jadi 12288 Feb  7 11:44 jadi
```

The first character is a `d` so this is a directory. The owner \(jadi\) has read, write and execute access but other members of the **group** jadi and **others** only have read and execute access on this directory \(execute means that they can see the files inside it\).

### Changing permissions

It is possible to change the permissions on files & directories using the `chmod` command. There are two ways to tell this command what you want to do:

1. using octal (base 8) codes
2. using short coeds

When using octal codes, you have to to create an octal number to tell chmod what you want to do. In this method, 0 means no access, 1 means execute, 2 means write and 4 means read. So if you want to give read+execute, you have to give 4+1 which is 5. This table shows every possible combination:

| Symbolic | Octal |
| :--- | :--- |
| rwx | 7 |
| rw- | 6 |
| r-x | 5 |
| r-- | 4 |
| -wx | 3 |
| -w- | 2 |
| --x | 1 |
| --- | 0 |

So if you want to give rwx to the owner, rx to the group and only x to others, you have to use 751:

```text
$ ls -ltrh myfile
-rw-rw-r-- 1 jadi jadi 0 Feb  8 21:01 myfile
$ chmod 751 myfile
$ ls -ltrh myfile
-rwxr-x--x 1 jadi jadi 0 Feb  8 21:01 myfile
```

This might look difficult but there are some commonly used combinations like 755 for general executable files or 600 for personal files.

There is also an _easier_ method. In this method `u` means user, `g` means group and `o` means others. You can append `+x` to give execute permission, `+r` to give read permission and `+w` to give read permission. For example `u+x` will grant execute permission to user. If you want to remove a permission, use a `-` sign. For example `g-r` to prevent `group` members from `read`ing the file.

```text
$ ls -ltrh myfile
-rwxr-x--x 1 jadi jadi 0 Feb  8 21:01 myfile
$ chmod u-x myfile
$ ls -ltrh myfile
-rw-r-x--x 1 jadi jadi 0 Feb  8 21:01 myfile
$ chmod +x myfile
$ chmod uo+xr myfile
$ ls -ltrh myfile
-rwxr-xr-x 1 jadi jadi 0 Feb  8 21:01 myfile
```

One very common switch on `chmod` is `-R` for recursive chmoding on files. This will give read permission of all files inside /tmp/ to any user:

```text
# chmod -R o+r /tmp
```


### Changing owner and groups

If you need to change the ownership or group of a file or directory, use the `chown` command:

```text
$ ls -ltrh newfile
-rw-rw-r-- 1 jadi jadi 0 Feb  8 21:38 newfile
$ chown root:root newfile
chown: changing ownership of ‘newfile’: Operation not permitted
$ sudo chown root:root newfile
[sudo] password for jadi:
$ ls -ltrh newfile
-rw-rw-r-- 1 root root 0 Feb  8 21:38 newfile
```

A common switch is `-R` to `chown` recursively.

If need to only change the group you may use `chgrp` command:

```text
$ sudo chgrp postgres newfile
$ ls -ltrh newfile
-rw-rw-r-- 1 root postgres 0 Feb  8 21:38 newfile
```

It is possible to assign more groups to a user via `usermod` command:

```
$ sudo usermod -aG sudo jadi # will add jadi to the sudo group
```

Since users can be a member of many groups, they might need to change their **default group** when creating files. To do so, check the groups with `groups` command and set the default one with `newggrp`:

```text
$ touch newfile
$ ls -ltrh newfile
-rw------- 1 jadi jadi 0 Feb  8 21:53 newfile
$ groups
jadi adm cdrom sudo dip plugdev netdev lpadmin sambashare debian-tor
$ newgrp adm
$ touch newerfile
$ ls -ltrh new*
-rw------- 1 jadi jadi 0 Feb  8 21:53 newfile
-rw------- 1 jadi adm  0 Feb  8 21:54 newerfile
```

### Access modes

A question for you: If we do not have write access to /etc/passwd or /etc/shadow, how is it possible to change our password there?

Normally when you run a program, it runs with _your_ access level. But what happens if you need to run a program with a higher access level? say to do changes in the password files? For this Linux sets two special bits for each file; **suid** \(set user id\) and **guid** \(set group id\). If these bits are set on a file, that file be will be executed with the access of the **owner** (or **group**) of the file and not the user who is running it.

```text
$ ls -ltrh /usr/bin/passwd
-rwsr-xr-x 1 root root 50K Jul 18  2014 /usr/bin/passwd
```

Kindly note the `s` in the _executable bit_ for the user permissions and also for the group? That means when any user runs this program, it will be run with the access level of the owner of the file \(which is root\) instead of that users id.

It is possible to set / unser the suid and sgid using `chmod` and `+s` or `-s` instead of `x`.

While we are on this, let me introduce you to the last special bit. It is called **sticky bit** and if set, makes the file resistant to deletion. If the sticky bit is set, ONLY the owner of the file will be able to delete it, even if others do have write access to it. This is useful for places like /tmp (everybody has write access on /tmp directory but we do not want others to delete our files).

Sticky bit is identified by `t` and will be shown on the last bit of a `ls -l`:

```text
$ ls -dl /tmp
drwxrwxrwt 13 root root 77824 Feb  8 21:27 /tmp
```

As you can see the sticky bit is set and although all users have write access in this directory, they wont be able to delete each others files.

Lets review how you can set these access modes:

| access mode | octal | symbolic |
| :--- | :--- | :--- |
| suid | 4000 | u+s |
| guid | 2000 | g+s |
| sticky | 1000 | +t |

> guid on a directory will force any new file in that directory to have the guid of the directory itself.

### umask

Another tricky question: what is the permissions of a newly created file? What happens if you `touch` a non-existing file? What will be its permissions? This is set by the `umask`. This command tells the system what permissions (in addition to execute) **should not be given to** new files. In other words, imagine that all new files will have `666` octal permission (write + read for user, group & others), so a umask of 0002 (yes! 4 digits) will remote the 2 (write) for others (666-0002=664):

```text
$ umask
0002
```

If we need to change umask, it can be done with the same command:

```text
$ umask
0002
$ touch newfile
$ ls -ltrh newfile
-rw-rw-r-- 1 jadi jadi 0 Feb  8 21:38 newfile
$ mkdir newdir
$ ls -ltrhd newdir
drwxrwxr-x 2 jadi jadi 4.0K Feb  8 21:38 newdir
$ umask u=rw,g=,o=
$ touch newerfile
$ ls -l newerfile
-rw------- 1 jadi jadi 0 Feb  8 21:41 newerfile
$ umask
0177
```

> Note how I used `u=rw,g=,o=` to tell `umask` or `chomd` what I exactly wanted from it.


