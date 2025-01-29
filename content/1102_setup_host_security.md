Title: 110.2 Setup host security
Date: 2010-12-03 10:20
Category: LPIC1
Tags: LPIC1, 102, LPIC1-102-500
Authors: Jadi
sortorder: 460
Summary:

_Weight: 3_

Candidates should know how to set up a basic level of host security.

### Key Knowledge Areas

- Awareness of shadow passwords and how they work.
- Turn off network services not in use.
- Understand the role of TCP wrappers.

### Terms and Utilities

- `/etc/nologin`
- `/etc/passwd`
- `/etc/shadow`
- `/etc/xinetd.d/`
- `/etc/xinetd.conf`
- `systemd.socket`
- `/etc/inittab`
- `/etc/init.d/`
- `/etc/hosts.allow`
- `/etc/hosts.deny`

<iframe width="560" height="315" src="https://www.youtube.com/embed/HoQtVkcSqz8" title="LPIC 1 - 80  - 110.2 - Setup Host Security; controlling server logins and using super services" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

<iframe width="560" height="315" src="https://www.youtube.com/embed/HoQtVkcSqz8?si=Q5zWktbxB7qaTplh" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

#### shadow passwords

The `/etc/passwd` is already discussed. It contains the passwords of the users but there is a logical problem: if a user should be able to change her own password, he should have access to this file and if this is the case, he can see other people's passwords. This is not interesting even when the passwords are hashed \(shown as a more complex form using a one way function\).

```text
$ ls -ltrh /etc/passwd
-rw-r--r-- 1 root root 2.5K Jun  5 19:14 /etc/passwd
```

To prevent this the `/etc/shadow` file is introduced. In modern systems, we only show a `x` at the location of the password in `/etc/passwd` and store the real password in `/etc/shadow` which has a very limited file access:

```text
jadi@funlife ~$ grep jadi /etc/passwd
jadi:x:1000:1000:jadi,,,:/home/jadi:/bin/bash
jadi@funlife ~$ grep jadi /etc/shadow
grep: /etc/shadow: Permission denied
jadi@funlife ~$ sudo grep jadi /etc/shadow
[sudo] password for jadi:
jadi:$6$bp01DBX.$I6dt4pz8GeXJl6asgPeKhSdepf40bgepTz8zwB3HFmN56SdcsxjTETdZAmRt17biwMYOI7SoGFOXssHqeNFgw/:16963:0:99999:7:::
jadi@funlife ~$ sudo ls -ltrh /etc/shadow
-rw-r----- 1 root shadow 1.5K Jun 11 17:36 /etc/shadow
```

#### `/etc/nologin`

The `/etc/nologin` is a cool file! If you create and write something in it, the content will be shown to any person who tries to login into the system and with that file the login attempt will fail. It is useful for maintenance time. Delete this file and the users will be able to login again.

> the root user will be able to login even in the presence of /etc/nologin

Please also note that there is a dummy shell called `nologin` and you can set it as shell for any user you want to prevent from being able to login into the system via a shell. Note that such a user still has an active account and will be able to use other services (say email or ftp) but wont be able to enter the shell.

```
sudo usermod -s /sbin/nologin baduser
```

### super-servers

A super-server or sometimes called a service dispatcher is a type of daemon running mostly on Unix-like systems for security and resource management reasons. It listens for requests its configured for and starts the target services when needed to answer the requests. This adds a layer of security to your communications and also lets some of the services to be inactive when we do not need them. You can see a super server or superdaemon as a TCP (and UDP or even ICMP) wrapper around other services.

![Super Server](/images/super-server.png)

Few GNU/Linuxes use TCP wrappers like `xinetd` these days but you might see it in some installations or traces of it in your `/etc/xinet.d`. If needed it is also possible to configure the `systemd.socket` as a TCP wrapper for other services.

Here is a sample `xinetd` configuration file:

```text
service telnet
{
        disable         = no
        flags           = REUSE
        socket_type     = stream
        wait            = no
        user            = root
        server          = /usr/sbin/in.telnetd
        log_on_failure  += USERID
        no_access       = 10.0.1.0/24
        log_on_success  += PID HOST EXIT
        access_times    = 09:45-16:15
}
```

If we change the `disable` to `yes` and restart the xinetd, the telnet daemon will start running. There are a few files to control xinetd related files.

As mentioned, `xinetd` is replaced by the `systemd.socket` units. Some services like `ssh` and `cups` might have a socket unit alongside the service unit in your distribution. In this case its enough to stop & disable the `ssh.service` and start the `ssh.socket` instead. Now the `systemd.socket` is acting as a wrapper around the port 22 and IF someones needs the service, starts the ssh server to answer.

#### `/etc/hosts.allow` & `/etc/hosts.deny`

These two files will allow or deny access from specific hosts. Its logic is like `cron.deny` and `cron.allow`. If something is allowed, everything else is denied but if you add something to the `/etc/hosts.deny`, only that specific thing is denied \(and every other thing is allowed\).

```text
jadi@funlife ~$ cat /etc/hosts.allow
# /etc/hosts.allow: list of hosts that are allowed to access the system.
#                   See the manual pages hosts_access(5) and hosts_options(5).
#
# Example:    ALL: LOCAL @some_netgroup
#             ALL: .foobar.edu EXCEPT terminalserver.foobar.edu
#
# If you're going to protect the portmapper use the name "rpcbind" for the
# daemon name. See rpcbind(8) and rpc.mountd(8) for further information.
#

vsftpd: 10.10.100.
```

How the `vsftpd` knows about this file? Because it uses the `libwrap` library in its source and the libwrap understands the wrapper tools. You can check this claim by searching for `libwrap` in the list of libraries `vsftpd` uses:

```
➜  ~ ldd /usr/sbin/vsftpd | grep libwrap
	libwrap.so.0 => /lib/x86_64-linux-gnu/libwrap.so.0 (0x00007fb293921000)
```

Here the `vsftpd` service is only allowed from 10.10.100.\* . It is possible to use `ALL` as the service name to allow or deny ALL services.

> after changing this file, xinetd should be restarted

As mentioned, super servers are not being used anymore and most distributions use standalone services.

### Removing unused services

Based on your distribution, you can check the running services using the `service` or `systemctl` command. If you are using the SysV init system (older distros mainly) or you have the compatibility tools installed, do as follow:

```
~ sudo service --status-all
 [ - ]  alsa-utils
 ....
 [ + ]  ufw
 [ + ]  unattended-upgrades
 [ + ]  uuidd
 [ + ]  vpn-unlimited-daemon
 [ + ]  vsftpd
 [ - ]  whoopsie
 [ - ]  x11-common
```

On a RedHat based machine, you can stop a service via:

```
sudo chkconfig vsfptd off
```

and On debian machines:

```
sudo update-rc.d vsftpd remove
```

If you are using the systemd, do as follow to check and stop / disable a service:

```
systemctl list-units --state active --type service
systemctl status
systemctl disable vsftpd.service --now
```

Please also remember that on older systems, we used to have all the Init scripts in `/etc/init.d` and `/etc/rcX.d` folders. There were also a `/etc/inittab` file which was a configuration file for initializing a Linux system using SysV . It contains lines in this format:

This would tell the init system to do `actions` on the `process` on a specific `runlevel`. For example:

```
id:runlevel:action:process
```

It tells the init to start (and respawn if killed), the `mingetty tty1` command on runlevels `2`, `3`, `4`, & `5`.

```
1:2345:respawn:/sbin/mingetty tty1
```

As the final note, this was the most important line in the `inittab` file because it tells the init to start in run level 3.

```
id:3:initdefault:
```

For more information about `runlevels` , please refer to [Chapter 101.3](1013-change-runlevels-boot-targets-and-shutdown-or-reboot-the-system.html).
