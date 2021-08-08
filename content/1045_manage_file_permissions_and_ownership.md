# 1045\_manage\_file\_permissions\_and\_ownership

Title: 104.5 Manage file permissions and ownership Date: 2021-08-03 13:22 Category: 104

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

There commands like `whoami`, `groups` and `id` to determine who you are.

```text
- $ whoami
jadi
- $ groups
jadi adm cdrom sudo dip plugdev netdev lpadmin sambashare debian-tor
- $ id
uid=1000(jadi) gid=1000(jadi) groups=1000(jadi),4(adm),24(cdrom),27(sudo),30(dip),46(plugdev),102(netdev),108(lpadmin),124(sambashare),125(debian-tor)
- $ su root -
Password:
bash: cannot set terminal process group (-1): Inappropriate ioctl for device
bash: no job control in this shell
- # id
uid=0(root) gid=0(root) groups=0(root)
- # exit
exit
- $ whoami
jadi
```

> `id` shows both user and group information

There info are stored in `/etc/passwd` and `/etc/group`

```text
$ cat /etc/group | grep adm
adm:x:4:syslog,jadi
lpadmin:x:108:jadi
```

### File ownership & permissions

Files are also belong to one user and one group.

```text
$ ls -l /sbin/fdisk ~/w/lpic/notes.txt
-rw-rw-r-- 1 jadi users    576 Dec  7 22:30 /home/jadi/w/lpic/notes.txt
-rwxr-xr-x 1 root root 267176 Oct 15 18:58 /sbin/fdisk
```

As you can see, the notes.txt belongs to jadi and a group called _users_.

> In many distros, when you create a user, system creates a group with same name and assign that users files to that group

Another part of the `ls -l` command shows the permissions on that file. Linux system users a 3 layer permission: permissions for the owner, for the group member and for _others_. Each layer also has 3 different parts: **r**ead, **w**rite \(including deletion and edit\) & **e**xecute \(reading directory content\). These are shown at the first column of `ls -` command as `-rw-rw-r--`. The character meanings are as follow:

| bit | meaning |
| :--- | :--- |
| 1 | What this entry is. Dash \(-\) is for ordinary files, 'l' is for links & 'd' is for directory |
| 2,3,4 | read, write and execute access for the owner |
| 5,6,7 | read, write and execute access for the group members |
| 8,9,10 | read, write and execute access for other users |
| 11 | Indicated if any other access methos \(such as SELinux\) applies to this file - not part of the 101 exam |

As you can see in our example, characters 2 to 10 show the accesses. A `-` there means "no access on this part" and read, write and execute are shown by r, w & x.

In the following line:

```text
$ ls -l /sbin/fdisk
-rwxr-xr-x 1 root root 267176 Oct 15 18:58 /sbin/fdisk
```

We can see that the fdisk can be read, written and and be executed by its owner \(root\), only be read and executed by whoever is part of group root and be read and executed by all other users.

> although non-root users can execute the fdisk, this program wont do much if it sees that a non root user is running it.

Lets look at another example:

```text
$ ls -l /home/
total 12
drwxr-xr-x 160 jadi jadi 12288 Feb  7 11:44 jadi
```

The first character is a `d` so this is a directory! The owner \(jadi\) has read, write and execute access but other members of the **group** jadi and **others** only have read and execute access on this directory \(execute means that they can see the files inside it\).

### Chanhging permissions

It is possible to change the permissions on files & directories using the `chmod` command. There are to ways to tell this command what you want to do:

1. using octal codes
2. using short coeds

When using octal codes, you have to to create an octal string to tell chmod what you want to do. This way, 0 means no access, 1 means execute, 2 means write and 4 means read. So if you want to give read+execute, you have to give 4+1 which is 5. This table shows every possible combination:

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

So if you want to give rwx to owner, rx to group and only x to others, you have to use 751:

```text
$ ls -ltrh myfile
-rw-rw-r-- 1 jadi jadi 0 Feb  8 21:01 myfile
$ chmod 751 myfile
$ ls -ltrh myfile
-rwxr-x--x 1 jadi jadi 0 Feb  8 21:01 myfile
```

But there is also an _easier_ method. You can use `+x` to give execute permission, `+r` to give read permission and `+w` to give read permission. Removing these permissions will be like `-r`.

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

> you can tell `chmod` whos permission should be granted or removed by doing things like `u+r` \(give read to user\), `og-w` \(remove write for other and group\).

One very common switch on `chmod` is `-R` for recursive chmoding on files. This will give read permission of all files inside /tmp/ to any user:

```text
# chmod -R o+r /tmp
```

### Access modes

So you have access only to your files. But how you should change your password? or use programs which needs access to system files? You should be able to access /etc/passwd or /etc/shadow to change your password but you should not be able to access other people files!

Normally when you run a program, it runs with _your_ access levels but linux has two special bits on each file; **suid** \(set user id\) and **guid** \(set group id\). If these are set on a file, that file be will be executed with the access of the **owner** of the file and not the user who is running it.

```text
$ ls -ltrh /usr/bin/passwd
-rwsr-xr-x 1 root root 50K Jul 18  2014 /usr/bin/passwd
```

Did you note the `s` in the place of _executable bit_ for the user and for the group? That means when any user runs this program, it will be run be the access of the owner of the file \(which is root\) instead of that users id.

It is possible to set / unser the suid and sgid using `chmod` and `+s` or `-s` instead of `x`.

The last special option is `chmod` is the **sticky bit** which lets only the owner of the file to delete it, even if other users have write \(delete\) access on that directory. This is good for places like /tmp.

Sticky bit is identified by `t` and will be shown on the last bit of a directory:

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
| sticky | 1000 | t |

> guid on a directory will force any new file in that directory to have the guid of the directory itself.

### umask

But what will be the access of the new files? What happens when you `touch` a new file? This is set with `umask`. This command tells the system what permissions **should not be given to** new files:

```text
$ umask
0002
```

Which removes write \(2\) permissions from files.

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

> Note how we use `u=rw,g=,o=` to tell umask or chomd what we exactly need.

### Changing owner and groups

If you need to change the ownership or group belonging of a file or directory, use the `chown` command:

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

A common switch is `-R` to do the chown recursively and the general style is `chown newuser:newgroup file`.

There is also a command specially for changing the group:

```text
$ sudo chgrp postgres newfile
$ ls -ltrh newfile
-rw-rw-r-- 1 root postgres 0 Feb  8 21:38 newfile
```

If a user is member of different groups, she can change her **default group** using the `newggrp` command:

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

