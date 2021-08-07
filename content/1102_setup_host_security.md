Title: 110.2 Setup host security
Date: 2021-08-03 13:41
Category: 110

# 110.2 Setup host security
*Weight: 3*

Candidates should know how to set up a basic level of host security.

## Key Knowledge Areas
- Awareness of shadow passwords and how they work.
- Turn off network services not in use.
- Understand the role of TCP wrappers.

## Terms and Utilities
- /etc/nologin
- /etc/passwd
- /etc/shadow
- /etc/xinetd.d/
- /etc/xinetd.conf
- /etc/inetd.d/
- /etc/inetd.conf
- /etc/inittab
- /etc/init.d/
- /etc/hosts.allow
- /etc/hosts.deny

### shadow passwords
The `/dev/passwd` is already discussed. It contains the passwords of the users but there is a logical problem: if a user should be able to change her own password, he should have access to this file and if this is the case, he can see other peoples passwords. This is not interesting even when the passwords are hashed (shown as a more complex form using a one way function).

````
$ ls -ltrh /etc/passwd
-rw-r--r-- 1 root root 2.5K Jun  5 19:14 /etc/passwd
````

To prevent this the `/etc/shadow` file is introduces. In modern systems, we only show a `*` at the location of the password in /etc/passwd and store the real password in `/etc/shadow` which has a very limited file access:

````
jadi@funlife ~$ grep jadi /etc/passwd
jadi:x:1000:1000:jadi,,,:/home/jadi:/bin/bash
jadi@funlife ~$ grep jadi /etc/shadow
grep: /etc/shadow: Permission denied
jadi@funlife ~$ sudo grep jadi /etc/shadow
[sudo] password for jadi:
jadi:$6$bp01DBX.$I6dt4pz8GeXJl6asgPeKhSdepf40bgepTz8zwB3HFmN56SdcsxjTETdZAmRt17biwMYOI7SoGFOXssHqeNFgw/:16963:0:99999:7:::
jadi@funlife ~$ sudo ls -ltrh /etc/shadow
-rw-r----- 1 root shadow 1.5K Jun 11 17:36 /etc/shadow
````

### /etc/nologin
This is a cool file! If you create and write something in it, the content will be shown to any person who tries to login into the system and the login attempt will fail. It is useful for maintenance time. Delete this file and the users will be able to login again.

> admin users will be able to login even in the presence of /etc/nologin

### turn off network services
In the previous module, we learned how to find the running services on the server. Turning them off is easy but a bit different on different systems. In case you want to turn the `httpd` service off, you can do:

|system|service manager|command|
|-|-|-|
|older linux systems|SysV|chkconfig httpd off<br>sysv-rc-conf httpd off|
|Ubuntu|Upstart|update-rc.d httpd remove|
|newer linux distros|systemd|systemctl disable httpd|   

Please note that these commands prevent the service from starting on system boot. The `http` is still installed on the machine and you can run it if you need.

### super-servers

A super-server or sometimes called a service dispatcher is a type of daemon run generally on Unix-like systems for security reasons. It starts other servers when needed, normally with access to them checked by a TCP wrapper.

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Super-server.png/420px-Super-server.png">

Practically no new linux is using a super server anymore but some traces of `xinetd` is still there in some systems in `/etc/xinet.d/`. This is a sample xinetd configuration:

````
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
````

If we change the `disable` to `yes` and restart the xinetd, the telnet daemon will start running. There are a few files to control to xinetd related files.

#### /etc/hosts.allow & /etc/hosts.deny
These two files will allow or deny access from specific hosts. Its logic is like cron.deny and cron.allow. If something is allowd, everything else is denied but if you add something to the /etc/hosts.deny, only that specific thing is denied (and every other thing is allowed).

````
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

telnet: 10.10.100.
````

Here the `telnet` service is only allowed from 10.10.100.* . It is possible to use `ALL` as the service name to allow or deny ALL services.

> after changing this file, xinetd should be restarted

As mentioned, super servers are not being used anymore and most distributions use standalone services running on them.  This is also called tcp wrapping since the tcp connections are being passwd from xinetd and xinetd decides what to do with them.
