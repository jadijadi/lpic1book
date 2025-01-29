Title: 110.1 Perform security administration tasks
Date: 2010-12-03 10:20
Category: LPIC1
Tags: LPIC1, 102, LPIC1-102-500
Authors: Jadi
sortorder: 450
Summary: 

_Weight: 3_

Candidates should know how to review system configuration to ensure host security in accordance with local security policies.

### Key Knowledge Areas

* Audit a system to find files with the suid/sgid bit set.
* Set or change user passwords and password aging information.
* Being able to use nmap and netstat to discover open ports on a system.
* Set up limits on user logins, processes and memory usage.
* Determine which users have logged in to the system or are currently logged in.
* Basic sudo configuration and usage.

### Terms and Utilities

* `find`
* `passwd`
* `fuser`
* `lsof`
* `nmap`
* `chage`
* `netstat`
* `sudo`
* `/etc/sudoers`
* `su`
* `usermod`
* `ulimit`
* `who, w, last`


<iframe width="560" height="315" src="https://www.youtube.com/embed/rNxitwVtRvo" title="LPIC 1 - 77  - 110.1 (1/3) - Perform Security Admin Tasks;su,sudo,online users &amp;password management" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Users

<iframe width="560" height="315" src="https://www.youtube.com/embed/rNxitwVtRvo?si=V6a_wAv84xjOIbjx" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

### `sudo` vs `su`

We've used `sudo` and `su` in practically all the chapters and now is the time to have a closer look! `su` switches you to some other account; a "substitute user identity". You get a new prompt with the new user account after successfully `su`ing to that account:

```text
jadi@funlife ~$ whoami
jadi
jadi@funlife ~$ su -
Password:
root@funlife:~# whoami
root
root@funlife:~# su jadi -
jadi@funlife /root$ whoami
jadi
jadi@funlife /root$ exit
exit
root@funlife:~# whoami
root
root@funlife:~# exit
logout
jadi@funlife ~$ whoami
jadi
jadi@funlife ~$
```

Note that when running `su` you have to **provide the root password** to become root; or any other users password to become that user!

On the other hand, sudo asks for your own password and runs the command you gave it, with the root privileges. So `sudo ls` runs the ls command with the root privileges after asking for **your password**. Obviously you should have the _sudo right_ to issue sudo. This is defined in `/etc/sudoers` file:

```text
$ sudo cat /etc/sudoers
#
# This file MUST be edited with the 'visudo' command as root.
#
# Please consider adding local content in /etc/sudoers.d/ instead of
# directly modifying this file.
#
# See the man page for details on how to write a sudoers file.
#
Defaults    env_reset
Defaults    mail_badpass
Defaults    secure_path="/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"

# Host alias specification

# User alias specification

# Cmnd alias specification

# User privilege specification
root    ALL=(ALL:ALL) ALL

# Members of the admin group may gain root privileges
%admin ALL=(ALL) ALL

# Allow members of group sudo to execute any command
%sudo    ALL=(ALL:ALL) ALL

# See sudoers(5) for more information on "#include" directives:

#includedir /etc/sudoers.d
```

Note the 2 important lines:

- How root gets the right to run all the commands:

  ```
  root    ALL=(ALL:ALL) ALL
  ```
- And how the sudo and admin groups get rights to run commands as root: 

  ```
  # Members of the admin group may gain root privileges
  %admin ALL=(ALL) ALL

  # Allow members of group sudo to execute any command
  %sudo    ALL=(ALL:ALL) ALL
  ```

  The `ALL:ALL` means these users can run as any user and any group. The last ALL tells the sudo that these users/groups can run ALL commands. It is possible to put `/bin/ping` in the last part to tell sudo that this user can run only ping as root, Like below:

  ```
  username ALL=(ALL) /bin/ping
  ```

> The /etc/sudoers file is very important and breaking it will make major problems. to prevent you from adding un-interpretable lines in that file, the `visudo` command should be used instead of `vi /etc/sudoers`. This tool will check your edits to make sure that sudo command can understand them.

Now we know what `sudo su -` means. The sudo tells the system to run the `su -` command with the root access. It asks your password and runs the `su -` as the root if you have sudo access. The `su` commands changes your user to root and `-` switch load the root environment variables. This way you can become root using your own password via running `su` with `sudo`.

### checking the users in the system

If you need to check who is in your system \(and to some extend what they are doing\) you can use these commands:

```text
$  w
 22:03:37 up 3 days,  5:33, 13 users,  load average: 1.48, 1.12, 1.19
USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT
jadi     tty7     :0               Wed16    3days  2:30m  1.96s /sbin/upstart --user
jadi     pts/18   :0               Wed16    3:04m  1:02   1:02  /usr/bin/python manage.py runserver 0.0.0.0:8000
jadi     pts/19   :0               Wed16    1:11m  0.35s  0.35s /bin/bash
root     tty2                      Wed16    3days  0.07s  0.03s -bash
jadi     pts/21   :0               08:41   45:37   0.06s  0.06s /bin/bash
jadi     pts/23   :0               Thu11   46:49   0.25s  0.23s ssh startups
jadi     pts/21   funlife          Fri22   45:37   0.06s  0.06s /bin/bash
jadi     pts/25   :0               10:17   31:37   0.07s  5.81s /usr/bin/python /usr/bin/x-terminal-emulator
jadi     pts/26   :0               21:39    0.00s  0.07s  0.00s w
jadi     pts/27   :0               21:55    8:09   0.01s  0.01s /bin/bash
```

You have a line for each logged in users \(every single shell window is a separated login\).

Another useful command is `who`. Lets check it:

```text
$ who
jadi     tty7         2016-06-01 16:30 (:0)
jadi     pts/17       2016-06-01 16:30 (funlife)
jadi     pts/2        2016-06-01 16:32 (:0)
jadi     pts/18       2016-06-01 16:32 (:0)
jadi     pts/19       2016-06-01 16:33 (:0)
root     tty2         2016-06-01 16:36
jadi     pts/21       2016-06-04 08:41 (:0)
jadi     pts/22       2016-06-01 18:37 (funlife)
jadi     pts/23       2016-06-02 11:41 (:0)
jadi     pts/21       2016-06-03 22:22 (funlife)
jadi     pts/25       2016-06-04 10:17 (:0)
jadi     pts/26       2016-06-04 21:39 (:0)
jadi     pts/27       2016-06-04 21:55 (:0)
```

As you can see both these commands tell you when was the time that the user logged into the system but does not show the logged out people \(because they are not on the system anymore!\). If you need that data use the `last` command:

```text
~$ last | head
jadi     pts/27       :0               Sat Jun  4 21:55    gone - no logout
jadi     pts/26       :0               Sat Jun  4 21:39    gone - no logout
jadi     pts/26       :0               Sat Jun  4 18:55 - 19:42  (00:46)
jadi     pts/25       :0               Sat Jun  4 10:17    gone - no logout
jadi     pts/26       :0               Sat Jun  4 09:25 - 09:26  (00:00)
jadi     pts/26       :0               Sat Jun  4 09:25 - 09:25  (00:00)
jadi     pts/25       :0               Sat Jun  4 08:52 - 09:27  (00:35)
jadi     pts/21       :0               Sat Jun  4 08:41    gone - no logout
jadi     pts/21       funlife          Fri Jun  3 22:22 - 08:41  (10:18)
jadi     pts/21       :0               Fri Jun  3 18:44 - 19:47  (01:03)
```

> there is a way to check the failed logins too: `last -f /var/log/btmp`

### Password Management
The `passwd` command is used to update / change the password of the users. 

```
➜  passwd     
Changing password for jadi.
Current password: 
New password: 
Retype new password: 
passwd: password updated successfully
➜  sudo passwd jadi
New password: 
BAD PASSWORD: The password is shorter than 8 characters
Retype new password: 
passwd: password updated successfully
```

You can also use this command to check the status of a user:

```
➜  ~ passwd -S
jadi P 2023-09-14 0 99999 7 -1
```

It says my user is jadi, I have a valid *P*assword (could have been *L*ocked or *NP* for no password), my last password change time, minimum and maximum age of my password, warning period before password expiry & allowed password inactivity in days. The `passwd` command can also be used to `--lock` (or `-l`) a user, `--expire` (or `-e`) a user or `--unlock` (or `-u`) a user.

> As you've already see in the user management section, to change the user shell, home, ... you should use the `usermod` command

But to properly check/change the password age and configurations of users, the `chage` utility should be used. Run it with `-l` for `list`:

```
➜  ~ chage -l jadi
Last password change					: Sep 14, 2023
Password expires					: never
Password inactive					: never
Account expires						: never
Minimum number of days between password change		: 0
Maximum number of days between password change		: 99999
Number of days of warning before password expires	: 7
```

or without any switches for interactive mode:

```
➜  ~ chage jadi
chage: Permission denied.
➜  ~ sudo chage jadi
Changing the aging information for jadi
Enter the new value, or press ENTER for the default

	Minimum Password Age [0]: 
	Maximum Password Age [99999]: 
	Last Password Change (YYYY-MM-DD) [2023-09-14]: 
	Password Expiration Warning [7]: 3
	Password Inactive [-1]: 
	Account Expiration Date (YYYY-MM-DD) [-1]: 
```

You can also use switches to directly change values. Say `-m` for --mindays or `-M` for --maxdays. 


### suid and guid

<iframe width="560" height="315" src="https://www.youtube.com/embed/1wyPXxrnI7g" title="LPIC 1 - 78  - 110.1 (2/3) - Perform Security Admin Tasks; suid, guid &amp; ulimits" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

We've already covered `suid`; In short, when the suid bit is set on an executable file, the user will run with the access level of the owner of the file (and not the runner). Have a look at the `passwd` command:

```
➜  ~ type passwd
passwd is /usr/bin/passwd
➜  ~ ls -ltrh /usr/bin/passwd 
-rwsr-xr-x 1 root root 63K Nov 23  2022 /usr/bin/passwd
```

The `s` on the access rights part, will run the file using the owners (here its root) access; regardless of whom is running it. This is needed because the `passwd` commands needs to be able to change the passwords in the *shadow* file even if a normal user runs it. But what happens if someone changes the suid of the vi command? let's see who owns the `vi`:

```text
jadi@funlife ~$ type vi
vi is /usr/bin/vi
jadi@funlife ~$ ls -ltrh /usr/bin/vi
lrwxrwxrwx 1 root root 20 Jun  1 12:52 /usr/bin/vi -> /etc/alternatives/vi
```

The `vi` is owned by root, so if the suid bit is set, vi will always be run as root! In that case, anybody will be able to edit any file! So if you are a hacker and get a temporary root, its enough to copy vi somewhere (with a different unsuspicious name) and give it the `suid` access. Now you will be able to run it with normal users and modify system files when needed! That's why a system admin should be able to check her systems executable files with `suid` bit if needed:

```text
$sudo find / -perm -u+s
```

Here, the `-perm -u+s` tells `find` to search for file which has `suid` on `user`. For more info, check the `man find` and search for `perm`. 

> same applies for guid. if the guid is set, the file will be run with access of its group


### user limits

The resources on a Linux machine can be managed for users by the `ulimit` command. It is part of the PAM system. If you want to check the limits on the system run:

```text
~$ ulimit -a
core file size          (blocks, -c) 0
data seg size           (kbytes, -d) unlimited
scheduling priority             (-e) 0
file size               (blocks, -f) unlimited
pending signals                 (-i) 47457
max locked memory       (kbytes, -l) 64
max memory size         (kbytes, -m) unlimited
open files                      (-n) 1024
pipe size            (512 bytes, -p) 8
POSIX message queues     (bytes, -q) 819200
real-time priority              (-r) 0
stack size              (kbytes, -s) 8192
cpu time               (seconds, -t) unlimited
max user processes              (-u) 47457
virtual memory          (kbytes, -v) unlimited
file locks                      (-x) unlimited
```

and you can change them like this:

```text
$ ulimit -t 1
```

This will limit the CPU TIME of any process to 1 second. If you use more than that, the process will be killed automatically \(by PAM module\). Please note that your walls clock time is different than CPU time. To see how much CPU time a process uses run it like this:

```text
$ time firefox
```

Changing the ulimit as we did is a temporary thing. It only persists in that specific shell.

To change the ulimits system-wide:

```text
$ cat /etc/security/limits.conf
# /etc/security/limits.conf
#
#Each line describes a limit for a user in the form:
#
#<domain>        <type>  <item>  <value>
#
#Where:
#<domain> can be:
#        - a user name
#        - a group name, with @group syntax
#        - the wildcard *, for default entry
#        - the wildcard %, can be also used with %group syntax,
#                 for maxlogin limit
#        - NOTE: group and wildcard limits are not applied to root.
#          To apply a limit to the root user, <domain> must be
#          the literal username root.
#
#<type> can have the two values:
#        - "soft" for enforcing the soft limits
#        - "hard" for enforcing hard limits
#
#<item> can be one of the following:
#        - core - limits the core file size (KB)
#        - data - max data size (KB)
#        - fsize - maximum filesize (KB)
#        - memlock - max locked-in-memory address space (KB)
#        - nofile - max number of open files
#        - rss - max resident set size (KB)
#        - stack - max stack size (KB)
#        - cpu - max CPU time (MIN)
#        - nproc - max number of processes
#        - as - address space limit (KB)
#        - maxlogins - max number of logins for this user
#        - maxsyslogins - max number of logins on the system
#        - priority - the priority to run user process with
#        - locks - max number of file locks the user can hold
#        - sigpending - max number of pending signals
#        - msgqueue - max memory used by POSIX message queues (bytes)
#        - nice - max nice priority allowed to raise to values: [-20, 19]
#        - rtprio - max realtime priority
#        - chroot - change root to directory (Debian-specific)
#
#<domain>      <type>  <item>         <value>
#

#*               soft    core            0
#root            hard    core            100000
#*               hard    rss             10000
#@student        hard    nproc           20
#@faculty        soft    nproc           20
#@faculty        hard    nproc           50
#ftp             hard    nproc           0
#ftp             -       chroot          /ftp
#@student        -       maxlogins       4

# End of file
```

> soft limits can be changed by the user but hard limits are the real stop points.


## Open Ports

<iframe width="560" height="315" src="https://www.youtube.com/embed/9yycyd7ShyM" title="LPIC 1 - 79  - 110.1 (3/3) - Perform Security Admin Tasks; checking for open ports &amp; scan with nmap" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

### netstat, fuser and lsof

On module 109.1 we talked about ports. Ports are like wholes in our systems used by programs to listen to the outside world. If I'm running a web server on my computer I should have a port open so people can ask that server "please show me your index.html". Many malwares open ports to let the attacker to communicate with them. It is important to check your computer for open ports time to time. The older command for this is the `netstat`; using the `-na` or `-ap` or `-tuna` switch.. I'm sure **tuna** is easy to remember if you have every enjoyed a tuna sandwich.

```text
jadi@funlife ~$ netstat -tuna
Active Internet connections (servers and established)
Proto Recv-Q Send-Q Local Address           Foreign Address         State      
tcp        0      0 127.0.0.1:3306          0.0.0.0:*               LISTEN     
tcp        0      0 0.0.0.0:80              0.0.0.0:*               LISTEN     
tcp        0      0 127.0.1.1:53            0.0.0.0:*               LISTEN     
tcp        0      0 127.0.0.1:9050          0.0.0.0:*               LISTEN     
tcp       25      0 192.168.59.9:49934      192.168.59.192:139      CLOSE_WAIT
tcp        0      0 127.0.0.1:60228         127.0.0.1:1080          ESTABLISHED
tcp        0      0 192.168.1.35:55324      159.203.148.169:8385    ESTABLISHED
tcp        0      0 127.0.0.1:59590         127.0.0.1:1080          ESTABLISHED
tcp        0      0 127.0.0.1:60212         127.0.0.1:1080          ESTABLISHED
tcp        0      0 192.168.1.35:54220      159.203.148.169:8385    ESTABLISHED
tcp        0      0 127.0.0.1:57186         127.0.0.1:1080          ESTABLISHED
tcp        0      0 192.168.1.35:49574      173.194.122.231:443     ESTABLISHED
tcp        0      0 127.0.0.1:59002         127.0.0.1:1080          ESTABLISHED
udp        0      0 0.0.0.0:54502           0.0.0.0:*                          
udp        0      0 0.0.0.0:5353            0.0.0.0:*                          
udp        0      0 0.0.0.0:5353            0.0.0.0:*
```

All the `LISTEN` ports are servers; they are LISTENING for new incoming connections. The `ESTABLISHED` connections are the active connections between your computer and another computer. In these tables `0.0.0.0` dictates _any address_ or _any interface_.

Other useful tools are `ss` for the same purpose as you saw on chapter 109 and `lsof` and `fuser`. The `lsof` is already discussed in previous sections. It shows the open files on the system and having in mind that _everything in Linux is a file or a process_ you can conclude that this command should be able to display open connections too; and you are right:

```text
# lsof -i
COMMAND     PID       USER   FD   TYPE  DEVICE SIZE/OFF NODE NAME
privoxy     806    privoxy    4u  IPv4   16130      0t0  TCP funlife:8118 (LISTEN)
cups-brow   903       root    8u  IPv4   17477      0t0  UDP *:ipp
mysqld      971      mysql   19u  IPv4   20875      0t0  TCP funlife:mysql (LISTEN)
tor        1038 debian-tor    6u  IPv4   19155      0t0  TCP funlife:9050 (LISTEN)
dnsmasq    1260     nobody   11u  IPv4 1910037      0t0  UDP *:18666
adb        1278       jadi    5u  IPv4  579541      0t0  TCP funlife:5037 (LISTEN)
chromium-  2891       jadi   88u  IPv4  813611      0t0  TCP 192.168.1.35:45702->do-13.lastpass.com:https (ESTABLISHED)
chromium-  2891       jadi  126u  IPv4 1907389      0t0  TCP 192.168.1.35:50642->ntt-2.lastpass.com:https (ESTABLISHED)
chromium-  2891       jadi  133u  IPv4 1909733      0t0  TCP 192.168.1.35:50644->ntt-2.lastpass.com:https (ESTABLISHED)
chromium-  2891       jadi  268u  IPv4  785289      0t0  TCP 192.168.1.35:60736->lf-in-f188.1e100.net:5228 (ESTABLISHED)
python     4925       jadi    4u  IPv4  658287      0t0  TCP funlife:8000 (LISTEN)
Telegram   4943       jadi   39u  IPv4  773463      0t0  TCP 192.168.1.35:44732->149.154.175.50:https (ESTABLISHED)
dhclient   9984       root    6u  IPv4  787885      0t0  UDP *:bootpc
nginx     11095       root    6u  IPv4   17998      0t0  TCP *:http (LISTEN)
nginx     11099   www-data    7u  IPv6   17999      0t0  TCP *:http (LISTEN)
chrome    14264       jadi  114u  IPv4  788089      0t0  UDP *:mdns
chrome    14264       jadi  126u  IPv4 1872872      0t0  TCP funlife:60370->funlife:socks (ESTABLISHED)
chrome    14264       jadi  138u  IPv4 1908382      0t0  TCP funlife:60408->funlife:socks (ESTABLISHED)
```

Wow! This command shows the command, PID, user running it and source and destination IP and tells of if this is a LISTENING or STABLISHED connection.

If you want to check which process is using port 80, you can grep the output of any above commands or simply use the `fuser` (file user; who uses this file) command to find all the PIDs related to that specific port. A common switch is `-v` which goes verbose. 

```text
➜  bin sudo fuser 22/tcp -v      
                     USER        PID ACCESS COMMAND
22/tcp:              root          1 F.... systemd
```

### nmap

`nmap` is the one of the hackers beloved tools! You can nmap a server to find out about a lot of data about that server:

```text
# nmap localhost

Starting Nmap 7.01 ( https://nmap.org ) at 2016-06-04 21:32 IRDT
Nmap scan report for localhost (127.0.0.1)
Host is up (0.0000070s latency).
rDNS record for 127.0.0.1: funlife
Not shown: 995 closed ports
PORT     STATE SERVICE
80/tcp   open  http
1080/tcp open  socks
3306/tcp open  mysql
8000/tcp open  http-alt
9050/tcp open  tor-socks

Nmap done: 1 IP address (1 host up) scanned in 1.66 seconds
root@funlife:~#
```

In the most basic form, nmap checks all the open ports from 1 to 1000 and prints the results. There are a lot of switches to find other information about the hosts and they are used by every single hacker who wants to examine a servers status.

Do a quick search for [nmap oneliners](https://duckduckgo.com/?t=h_&q=nmap+oneliners&ia=web) and you will find dozens of cool commands and tricks for it. Its so cool that its website [has a section about nmap in movies](https://nmap.org/movies/)!

