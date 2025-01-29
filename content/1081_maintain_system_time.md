Title: 108.1 Maintain system time
Date: 2010-12-03 10:20
Category: LPIC1
Tags: LPIC1, 102, LPIC1-102-500
Authors: Jadi
sortorder: 360
Summary: 


_Weight: 3_

Candidates should be able to properly maintain the system time and synchronize the clock via NTP.

### Key Knowledge Areas

* Set the system date and time.
* Set the hardware clock to the correct time in UTC.
* Configure the correct timezone.
* Basic NTP configuration using `ntpd` and `chrony`.
* Knowledge of using the `pool.ntp.org` service.
* Awareness of the `ntpq` command.

### Terms and Utilities

* `/usr/share/zoneinfo/`
* `/etc/timezone`
* `/etc/localtime`
* `/etc/ntp.conf`
* `/etc/chrony.conf`
* `date`
* `hwclock`
* `ntpd`
* `ntpdate`
* `chronyc`
* `pool.ntp.org`

<iframe width="560" height="315" src="https://www.youtube.com/embed/RhH-2I1dBjA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

### How a computer keeps its time

There is a clock in your computer; a hardware clock on your motherboard! It has its own battery and keeps the time even when the computer is off. When the system boots, the OS reads this **hardware time** and it sets it's own **system time** based on the hardware clock and uses this clock whenever it needs to know the time.

Hardware clock can be the set on localtime (the time shown on your clock wherever you are) or UTC time (standard time). The `hwclock` can be used to show the time based on the hwtime. See how it works based on the hardware time even after we DO CHANGE the system time:

```
$ date
Fri Jun 23 01:47:22 PM +0330 2023
$ sudo date -s "Jan 22 22:22:22 2022"
Sat Jan 22 10:22:22 PM +0330 2022
$ date
Sat Jan 22 10:22:29 PM +0330 2022
$ sudo hwclock 
2023-06-23 13:47:41.160122+03:30
```

> Even when the hardware clock is set on UTC, `hwclock` date shows the date in the localtime \(time after adding the timezone to the UTC time\)

Older OSs used to set the hardware clock on localtime zone instead of timezone. This can be achieved by:

```text
# hwclock --localtime --set --date="01/05/2023 22:04:00"
```

The previous commands sets the hardware clock on that specific date and tell it that this is the localtime. If you want to change back to UTC time, issue:

```text
# hwclock -u -w
```

Here, `-w` tells the `hwclock` to set the hardware time based on the current system time and `-u` tells the hwclock that we are using the UTC. This also sets the HWClock using UTC in the `\etc\adjtime` file.

> If you set a time on the hardware clock without mentioning it being UTC / Local, the `/etc/adjtime` will decide this, if this file does not exists, the UTC will be used.

You already know about the `timedatectl` and `date` from the [Localization and globalization chapter](http://linux1st.com/1073-localisation-and-internationalisation.html) so I wont repeat them here.


### Time Zones
We have seen time zones in previous chapters. But in short, there are two important files here.

The `/etc/timezone` is a text file, representing your timezone. This is used if a program wants to know about your time zone of show it. For example:

```
$ cat /etc/timezone 
Asia/Tehran
```

But the `/etc/localtime` is a binary file describing your timezone info to the system (for example the `date` file):

```
$ ls -l /etc/localtime 
lrwxrwxrwx 1 root root 31 Jun 22 11:19 /etc/localtime -> /usr/share/zoneinfo/Asia/Tehran
$ file /usr/share/zoneinfo/Asia/Tehran
/usr/share/zoneinfo/Asia/Tehran: timezone data, version 2, no gmt time flags, no std time flags, no leap seconds, 72 transition times, 8 abbreviation chars
```

In many cases, this is a soft link to a file located at `/usr/share/zoneinfo/` so it will be updated in case of system update.

### NTP

<iframe width="560" height="315" src="https://www.youtube.com/embed/ntyUBmG8F40" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

**Network Time Protocol**  is my personal favorite protocol. It is one of the coolest protocols ever if you dive into its details. But unfortunately for LPIC1 you do not need to dive into NTP depths. This protocol uses NTP servers to find out the accurate time shown by best atomic clocks on this planet. One of the most famous severs used by ntp people is `pool.ntp.org`. If you check that website you will see that it is a **pool** of ntp servers and by giving your NTP server the `pool.ntp.org`, it will be redirected to one of the many ntp servers available on that pool.

#### ntpdate

The most straight forward command to set the systemclock is `ntpdate` and used like this:

```
$ sudo ntpdate pool.ntp.org
23 Jun 14:49:55 ntpdate[160138]: adjust time server 31.214.170.254 offset +0.020196 sec
```

After this, we need to set the hwclock to the recently synced system time using `sudo hwclock -w`.

#### ntpd

Instead of manually setting the time each time, you can use a linux service called `ntp` to keep your time using some time servers \(the most famous one is pool.ntp.org\). Install the `ntp` and start the server:

In Debian/Ubuntu: 

```
# apt install ntp
# systemctl start ntp
```

Fun fact? you can not use both! Look at this:

```text
root@funlife:~# ntpdate pool.ntp.org
23 Jun 14:49:55 ntpdate[18670]: the NTP socket is in use, exiting
```

As you can see, now the `ntp` is using the NTP port and `ntpdate` has problems starting up.

Main configuration file of `ntp` is located at `/etc/ntp.conf`:

```text
# cat /etc/ntp.conf
# /etc/ntp.conf, configuration for ntpd; see ntp.conf(5) for help

driftfile /var/lib/ntp/ntp.drift

# Enable this if you want statistics to be logged.
#statsdir /var/log/ntpstats/

statistics loopstats peerstats clockstats
filegen loopstats file loopstats type day enable
filegen peerstats file peerstats type day enable
filegen clockstats file clockstats type day enable


# You do need to talk to an NTP server or two (or three).
#server ntp.your-provider.example

# pool.ntp.org maps to about 1000 low-stratum NTP servers.  Your server will
# pick a different set every time it starts up.  Please consider joining the
# pool: <http://www.pool.ntp.org/join.html>
pool 0.debian.pool.ntp.org iburst
pool 1.debian.pool.ntp.org iburst
pool 2.debian.pool.ntp.org iburst
pool 3.debian.pool.ntp.org iburst


# Access control configuration; see /usr/share/doc/ntp-doc/html/accopt.html for
# details.  The web page <http://support.ntp.org/bin/view/Support/AccessRestrictions>
# might also be helpful.
#
# Note that "restrict" applies to both servers and clients, so a configuration
# that might be intended to block requests from certain clients could also end
# up blocking replies from your own upstream servers.

# By default, exchange time with everybody, but don't allow configuration.
restrict -4 default kod notrap nomodify nopeer noquery limited
restrict -6 default kod notrap nomodify nopeer noquery limited

# Local users may interrogate the ntp server more closely.
restrict 127.0.0.1
restrict ::1

# Needed for adding pool entries
restrict source notrap nomodify noquery

# Clients from this (example!) subnet have unlimited access, but only if
# cryptographically authenticated.
#restrict 192.168.123.0 mask 255.255.255.0 notrust


# If you want to provide time to your local subnet, change the next line.
# (Again, the address is an example only.)
#broadcast 192.168.123.255

# If you want to listen to time broadcasts on your local subnet, de-comment the
# next lines.  Please do this only if you trust everybody on the network!
#disable auth
#broadcastclient
```

If needed, you can change the ntp servers to the ones you want to use.

Review the configuration and you will see cool things like providing your ntp service to other computers although you do not need these for passing LPIC.

#### ntpq

The `ntpq` queries the ntp service. One famous switch is `-p` \(for Print\) that shows the pool we are using to sync the clock:

```text
 ntpq -p
     remote           refid      st t when poll reach   delay   offset  jitter
==============================================================================
 0.debian.pool.n .POOL.          16 p    -   64    0    0.000    0.000   0.000
 1.debian.pool.n .POOL.          16 p    -   64    0    0.000    0.000   0.000
 2.debian.pool.n .POOL.          16 p    -   64    0    0.000    0.000   0.000
 3.debian.pool.n .POOL.          16 p    -   64    0    0.000    0.000   0.000
+46.209.14.1     192.168.5.2      4 u    7   64    1   58.300  -15.546  14.519
-ntp.tums.ac.ir  195.161.115.4    4 u    4   64    1   30.636    2.485   4.025
*194.225.150.25  194.190.168.1    2 u    5   64    1   31.478   -3.870  95.635
+5.160.24.41     192.168.5.2      4 u    3   64    1   90.000  -28.328  21.643
```

In this output a `*` means that the ntp is using this server as the main reference, `+` means that this is a good server and `-` shows an out of range server which will be neglected.

### chrony
Another and a newer NTP protocol implemenation is the `chrony`. Compared to `ntpd` , this tool provides better results at synchronize time difficult conditions such as intermittent network connections (such as laptops) and congested networks. Chrony is the default NTP client in RedHat 8, SUSE 15 and many other distributions. Another adavn


Here is a sample `chrony.conf` file:

```
$ cat /etc/chrony/chrony.conf 
# Welcome to the chrony configuration file. See chrony.conf(5) for more
# information about usable directives.

# Include configuration files found in /etc/chrony/conf.d.
confdir /etc/chrony/conf.d

# This will use (up to):
# - 4 sources from ntp.ubuntu.com which some are ipv6 enabled
# - 2 sources from 2.ubuntu.pool.ntp.org which is ipv6 enabled as well
# - 1 source from [01].ubuntu.pool.ntp.org each (ipv4 only atm)
# This means by default, up to 6 dual-stack and up to 2 additional IPv4-only
# sources will be used.
# At the same time it retains some protection against one of the entries being
# down (compare to just using one of the lines). See (LP: #1754358) for the
# discussion.
#
# About using servers from the NTP Pool Project in general see (LP: #104525).
# Approved by Ubuntu Technical Board on 2011-02-08.
# See http://www.pool.ntp.org/join.html for more information.
pool ntp.ubuntu.com        iburst maxsources 4
pool 0.ubuntu.pool.ntp.org iburst maxsources 1
pool 1.ubuntu.pool.ntp.org iburst maxsources 1
pool 2.ubuntu.pool.ntp.org iburst maxsources 2

# Use time sources from DHCP.
sourcedir /run/chrony-dhcp

# Use NTP sources found in /etc/chrony/sources.d.
sourcedir /etc/chrony/sources.d

# This directive specify the location of the file containing ID/key pairs for
# NTP authentication.
keyfile /etc/chrony/chrony.keys

# This directive specify the file into which chronyd will store the rate
# information.
driftfile /var/lib/chrony/chrony.drift

# Save NTS keys and cookies.
ntsdumpdir /var/lib/chrony

# Uncomment the following line to turn logging on.
#log tracking measurements statistics

# Log files location.
logdir /var/log/chrony

# Stop bad estimates upsetting machine clock.
maxupdateskew 100.0

# This directive enables kernel synchronization (every 11 minutes) of the
# real-time clock. Note that it can’t be used along with the 'rtcfile' directive.
rtcsync

# Step the system clock instead of slewing it if the adjustment is larger than
# one second, but only in the first three clock updates.
makestep 1 3

# Get TAI-UTC offset and leap seconds from the system tz database.
# This directive must be commented out when using time sources serving
# leap-smeared time.
leapsectz right/UTC
```

To control the `chrony` service, there is a CLI (Command Line Interface) which is called `chronyc`. It it used to monitor chronyd's performance and to change various operating parameters. If a "command" is passed to the `chronyc`, the results will be shown, otherwise you will get a command to issue your commands. Have a look:

```
$ chronyc tracking
Reference ID    : 0FED61D6 (paris.time.system76.com)
Stratum         : 3
Ref time (UTC)  : Fri Jun 23 12:44:20 2023
System time     : 0.001574947 seconds slow of NTP time
Last offset     : +0.000513619 seconds
RMS offset      : 0.065126784 seconds
Frequency       : 8.705 ppm slow
Residual freq   : +0.278 ppm
Skew            : 14.972 ppm
Root delay      : 0.180896595 seconds
Root dispersion : 0.013603540 seconds
Update interval : 128.6 seconds
Leap status     : Normal
$ chronyc
chrony version 4.2
Copyright (C) 1997-2003, 2007, 2009-2021 Richard P. Curnow and others
chrony comes with ABSOLUTELY NO WARRANTY.  This is free software, and
you are welcome to redistribute it under certain conditions.  See the
GNU General Public License version 2 for details.

chronyc> activity
200 OK
12 sources online
0 sources offline
0 sources doing burst (return to online)
0 sources doing burst (return to offline)
3 sources with unknown address

chronyc> sources
MS Name/IP address         Stratum Poll Reach LastRx Last sample               
===============================================================================
^? prod-ntp-4.ntp4.ps5.cano>     2   7   375    20  +5039us[+5039us] +/-   85ms
^? prod-ntp-5.ntp4.ps5.cano>     2   7   377    83    +12ms[  +15ms] +/-   87ms
^? prod-ntp-3.ntp4.ps5.cano>     2   7   177    22    +13ms[  +17ms] +/-   91ms
^? alphyn.canonical.com          2   7   277    22  +3298us[+6616us] +/-  185ms
^? mail.stumpflee.com            2   7   373    19  +6221us[+6221us] +/-  117ms
^? meetbsd.ir                    2   6   377    27    -23ms[  -20ms] +/-  231ms
^? 188.121.119.122               3   7   377    26    -27ms[  -23ms] +/-  131ms
^+ brazil.time.system76.com      2   7   377    20    -13ms[  -13ms] +/-  190ms
^+ ohio.time.system76.com        2   7   377    21    +23ms[  +23ms] +/-  171ms
^+ oregon.time.system76.com      2   7   377    23    +22ms[  +26ms] +/-  217ms
^* paris.time.system76.com       2   7   377    24  -4880us[-1560us] +/-  109ms
^+ virginia.time.system76.c>     2   7   163    19  +5465us[+5465us] +/-  148ms

chronyc> exit
$ sudo chronyc makestep
200 OK

```

`chrnoyc` connects to the chrony service using TCP or Unix sockets. Therefore, it is possible to use a local `chronyc` to connect to remote `chrony` and issue commands, although in this case you are limited to mainly monitoring commands for security reasons.
