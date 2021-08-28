Title: 108.1 Maintain system time
Date: 2010-12-03 10:20
Category: LPIC1
Tags: LPIC1, 101, LPIC1-101-500
Authors: Jadi
Summary: 
## 108.1 Maintain system time

_Weight: 3_

Candidates should be able to properly maintain the system time and synchronize the clock via NTP.

### Key Knowledge Areas

* Set the system date and time.
* Set the hardware clock to the correct time in UTC.
* Configure the correct timezone.
* Basic NTP configuration.
* Knowledge of using the pool.ntp.org service.
* Awareness of the ntpq command.

### Terms and Utilities

* /usr/share/zoneinfo/
* /etc/timezone
* /etc/localtime
* /etc/ntp.conf
* date
* hwclock
* ntpd
* ntpdate
* pool.ntp.org

### How a computer keeps its time

There is a clock in your computer; a hardware clock on your motherboard! It has its own battery and keeps the time even when the computer is off. When the system boots, the OS reads this **hardware time** and it sets its **system time** to the hardware clock and uses it from there on.

Hardware clock can be the localtime \(your computers timezone\) or UTC time \(standard time\). You can check this by /etc/adjtime:

```text
$ cat /etc/adjtime
0.000000 1451741899 0.000000
1451741899
UTC
```

As you can see in my computer the time is set on UTC so the computers add my timezone difference each time it boots up to the hardware clock. The `hwclock` can be used to show the time based on the hwtime. See how it works based on the hardware time even after we DO CHANGE the system time:

```text
root@funlife:~# date
Mon Jan  4 22:01:18 IRST 2016
# date -s "Jan 4 22:22:22 2016"
Mon Jan  4 22:22:22 IRST 2016
root@funlife:~# date
Mon Jan  4 22:02:18 IRST 2016
root@funlife:~# hwclock
Mon 04 Jan 2016 10:02:21 PM IRST  .108596 seconds
```

> Even when the hardware clock is set on UTC, `hwclock` date shows the date in the localtime \(time after adding the timezone to the UTC time\)

Older OSs used to set the hardware clock on localtime zone instead of timezone. This can be achived by:

```text
# hwclock --localtime --set --date="01/05/2015 22:04:00"
```

If you want to fix it, just issue:

```text
# hwclock -u -w
```

In this command `-u` tell the hardware clock that this is a UTC time and `-w` tells "sync with systemtime".

### NTP

Network Time Protocol is my favorite protocol. It is one of the coolest protocols ever if you dive into its details. But unfortunately for LPIC1 you do not need to go into NTP depths. This protocol uses NTP servers to find out the accurate time shown by best atomic clocks on this planet. One of the most famous severs used by ntp people is `pool.ntp.org`. If you check that website you will see that it is a **pool** of ntp servers and by giving your NTP server the `pool.ntp.org`, it will be redirected to one of the many ntp servers available on that pool.

#### ntpdate

The most straight forward command to set the systemclock is `ntpdate` and used like this:

```text
# ntpdate pool.ntp.org
4 Jan 22:15:02 ntpdate[18708]: adjust time server 194.225.150.25 offset -0.006527 sec
```

After this, we need to set the hwclock to the just corrected system time by `sudo hwclock -w`.

#### ntpd

Instead of manually setting the time each time, you can use a linux service called `ntp` to keep your time using some time servers \(the most famous one is pool.ntp.org\). Install the `ntp` and start the server:

```text
# apt install ntp
# systemctl start ntp
```

Fun fact? you can not use both! Look at this:

```text
root@funlife:~# ntpdate pool.ntp.org
 4 Jan 22:14:25 ntpdate[18670]: the NTP socket is in use, exiting
```

As you can see, now the `ntp` is using the NTP port and `ntpdate` has problems starting up.

Main configuration file of `ntp` is located at /etc/ntp.conf:

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

If needed, you can change the ntp servers to the ntp servers you want to use.

Review the configuration and you will see cool things like giving the ntp service to other computers although you do not need it for passing LPIC.

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

