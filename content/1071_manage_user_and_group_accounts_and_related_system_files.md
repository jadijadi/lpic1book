Title: 107.1 Manage user and group accounts and related system files
Date: 2010-12-03 10:20
Category: LPIC1
Tags: LPIC1, 102, LPIC1-102-500
Authors: Jadi
sortorder: 330
Summary: 


_Weight: 5_

Candidates should be able to add, remove, suspend and change user accounts.

### Key Knowledge Areas

* Add, modify and remove users and groups.
* Manage user/group info in password/group databases.
* Create and manage special purpose and limited accounts.

### Terms and Utilities

* /etc/passwd
* /etc/shadow
* /etc/group
* /etc/skel/
* chage
* getent
* groupadd
* groupdel
* groupmod
* passwd
* useradd
* userdel
* usermod

## Passwords
### Changing Passwords
Each user can change her password using the `passwd` command:

```text
$ passwd
Changing password for jadi.
(current) UNIX password:
New password:
Retype new password:
passwd: password updated successfully
```

If the password is too short or too similar to the previous one or even a dictionary word, or equal to the username and such, the `passwd` command may refuse to change it. Also note that the `passwd` commands asks for the _current password_ first to make sure that it is being changed by yourself. 

> The root user can change any users password to anything \(weak passwords\) without providing their current password:

```text
# passwd jadi
New password:
BAD PASSWORD: it does not contain enough DIFFERENT characters
BAD PASSWORD: is too simple
Retype new password:
passwd: password updated successfully
```

## Users and groups

Linux is a multi-user system and managing these users is part of system admin's job. As the first step, you should be able to **add**, **remove** and **modify** users.

Linux also has the concept of **groups**. You can define groups, give privileges to them and add users to these groups. As you've already seen in the `chmod` command, you might give access the permission to read from `/dev/cdrom` to a group called `cdrom` and then add whoever needs to read from the CD-ROM to this group.

Please note that each user can be a member of many groups but only one of these will be her *Primary* group. In contrast, each file can be owned only by one group.
### Managing Users
#### Adding users

To add a new user to your system, use the `useradd` command. These are the main switches:

| switch | meaning |
| :--- | :--- |
| -d | home directory \(-d /home/user\) |
| -m | create home directory |
| -s | specify shell |
| -G | add to additional groups |
| -c | comment. most of the time, users actual name. Use quotes if comments has spaces or special characters in them |

On some systems `useradd` creates the home directory and on some, you have to specify the `-m` switch yourself. It is a good practice to use it all the time.

When a new user directory is being created, the system will copy the contents of `/etc/skel` to their home dir. `/etc/skel` is used as a template for the home of users.

> Another command to add users is `adduser`. It will ask for the password, home directory, etc.. and will create the user.

#### Modifying users

To modify a user, you should use the `usermod` command. It supports most of the `useradd` switches. For example you can change _jadi_'s login shell by issuing `usermod -s /bin/csh jadi`. But there are 3 more switches too:

| switch | meaning |
| :--- | :--- |
| -L | lock this account |
| -U | Unlock the account |
| -aG | add to more groups \(say `usermod -aG wheel jadi`\) |

> Note: If you do `usermod -G wheel,users jadi`, jadi will be the member of these two groups ONLY. That is why we use `-aG newgoup` to *add to groups* to add this group to jadi's groups. `-G` is like saying "jadi's groups are ..." and `-aG` is like "add jadi to these groups".

#### Deleting users

If you want to remove a user, use `userdel`. Straight forward:

```text
userdel jadi
```

If you add the `-r` swtich, the home direcoty and mail spool will be erased too!

### Managing Groups

It is kind of same as users, you can do `groupadd`, `groupdel` and `groupmod`. Each group has an *id* and a *name*.

```text
# groupadd -g 1200 newgroup
```

adds a group called _newgroup_ with id 1200. If needed, the root user can change a groups ID \(to 2000\) by issuing `groupmod -g 2000 newgroup` or deleting the group by `groupdel newgroup`.

Obviously if root deletes a group with members, people wont be deleted! They will just wont be the members of that group anymore.

> In most systems, the user id or group id's of the users and groups created by the admin will have the id of 1000, 1001, 1002, ...
### Files managing users and groups

#### /etc/passwd

This file contains all the user information on your system:

```text
tail /etc/passwd
scard:x:491:489:Smart Card Reader:/var/run/pcscd:/usr/sbin/nologin
sshd:x:493:491:SSH daemon:/var/lib/sshd:/bin/false
statd:x:488:65534:NFS statd daemon:/var/lib/nfs:/sbin/nologin
tftp:x:496:493:TFTP account:/srv/tftpboot:/bin/false
lightdm:x:10:14:Light Display Manager:/var/lib/lightdm:/bin/false
wwwrun:x:30:8:WWW daemon apache:/var/lib/wwwrun:/bin/false
jadi:x:1000:100:jadi:/home/jadi:/bin/bash
svn:x:485:482:user for Apache Subversion svnserve:/srv/svn:/sbin/nologin
privoxy:x:484:480:Daemon user for privoxy:/var/lib/privoxy:/bin/false
```

As you can see the format is:

```text
username:x:userid:primary group id:Name and comments:home dir:shell
```

As you can see, the 2nd field is shown as "x" here. In the old days the password or the hashed password of the user was shown in this file but nowadays that is moved to the /etc/shadow file.

> Note: /etc/passwd should be readable to all users and this makes it a very bad place to keep users password! Thats why we see a `x` instead of the password, this indicates that the main passwords should be looked up from `/etc/shadow` file.

Note how _special users_ like lightdm are having /bin/false as their shell; this prevents them from logging into the system for real. In old days hackers used to try these accounts to login.

#### /etc/shadow

This file contains password \(hashed passwords\) of the users. See how the `/etc/passwd` is readable for all but `/etc/shadow` is only readable for root and members of the `shadow` group:

```text
# ls -ltrh /etc/passwd /etc/shadow
-rw-r--r-- 1 root root   1.9K Oct 28 15:47 /etc/passwd
-rw-r----- 1 root shadow  851 Oct 29 19:06 /etc/shadow
```

But what is in it?

```text
# tail /etc/shadow
scard:!:16369::::::
sshd:!:16369::::::
statd:!:16369::::::
tftp:!:16369::::::
uucp:*:16369::::::
lightdm:*:16369::::::
jadi:$6$enk5I3bv$uSQrRpen7m9xDapYLgwgh3P/71OLZUgj31n8AwzgIM2lA5Hc/BmRVAMC0eswdBGkseuXSvmaz0lsYFtduvuqUo:16737:0:99999:7:::
svn:!:16736::::::
privoxy:!:19473::::::
```


Wow! Jadi has an encrypted password there. Some numbers are following that encrypted password too: **16737:0:99999:7:::**. What do the mean? The following table tells you.

| filed | meaning |
| :--- | :--- |
| 19473 | When was the last time this password changes |
| 0 | User wont be able to change the password 0 days after each change |
| 99999 | After this many days, the user HAVE to change his password |
| 7 | ...and the user will be informed 7 days before the expiration to change his password |

> Note: there numbers are "days after 1st of January 1970" or the Epoch time in days. For example 16737 means 16373 days after 1st Jan 1970. Strange but practical!

But we do not need to change these strange number manually. If needed, we can use the `chage` tool to change these numbers. If you issue the `chage jadi` the system will prompt you for all the parameters one by one. Also it is possible to use switches to change specific parameters on command line.

| switch | meaning |
| :--- | :--- |
| -l | list information |
| -E | Set the expiration date. Date can be a number, in YYYY-MM-DD format or -1 which will mean _never_ |

```text
# chage -l jadi
Last password change                    : Apr 26, 2023
Password expires                    : never
Password inactive                    : never
Account expires                        : never
Minimum number of days between password change        : 0
Maximum number of days between password change        : 99999
Number of days of warning before password expires    : 7
```
> Note: `!` means the account is locked and the user can not login into the system using the account. On some systems (like RedHat) you may also see `!!` which means the account has never been used.

#### /etc/group

This file contains the groups and their IDs.

```text
# tail /etc/group
avahi:x:486:
kdm:!:485:
mysql:x:484:
winbind:x:483:
at:x:25:
svn:x:482:
vboxusers:x:481:
input:x:1000:jadi,joe
privoxy:x:480:
```

> Note: See that `x` there? Theoretically groups can have passwords but it is never used in any distro! The file is `/etc/gshadow`

### checking user info

Previously you saw the `chage -l jadi` but there are more commands for checking user status. One is `id`:

```text
# id jadi
uid=1000(jadi) gid=100(users) groups=1000(input),100(users)
```

Another solution is `getent` \(for **get entry**\). It can query important _databases_ for specific entries. These databases include /etc/passwd, /etc/hosts, /etc/shadow, /etc/group, ...

```text
funlife:~ # getent group tor
tor:x:479:
funlife:~ # getent passwd jadi
jadi:x:1000:100:jadi:/home/jadi:/bin/bash
funlife:~ # getent shadow jadi
jadi:$6$enk5I3bv$uSQrRpen7m9xDapYLgwgh3P/71OLZUgj31n8AwzgIM2lA5Hc/BmRVAMC0eswdBGkseuXSvmaz0lsYFtduvuqUo:16737:0:99999:7:::
```
