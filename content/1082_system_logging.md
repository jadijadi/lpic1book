Title: 108.2 System logging
Date: 2010-12-03 10:20
Category: LPIC1
Tags: LPIC1, 102, LPIC1-102-500
Authors: Jadi
sortorder: 370
Summary: 


_Weight: 4_

Candidates should be able to configure rsyslog. This objective also includes configuring the logging daemon to send log output to a central log server or accept log output as a central log server. Use of the systemd journal subsystem is covered. Also, awareness of syslog and syslog-ng as alternative logging systems is included.

### Key Knowledge Areas

* Basic configuration of rsyslog.
* Understanding of standard facilities, priorities and actions.
* Query the systemd journal.
* Filter systemd journal data by criteria such as date, service or priority.
* Configure persistent systemd journal storage and journal size.
* Delete old systemd journal data.
* Retrieve systemd journal data from a rescue system or file system copy.
* Understand interaction of rsyslog with systemd-journald.
* Configuration of logrotate.
* Awareness of syslog and syslog-ng.

### Terms and Utilities

* `/etc/rsyslog.conf`
* `/var/log/`
* `logger`
* `logrotate`
* `/etc/logrotate.conf`
* `/etc/logrotate.d/`
* `journalctl`
* `systemd-cat`
* `/etc/systemd/journald.conf`
* `/var/log/journal/`

<iframe width="560" height="315" src="https://www.youtube.com/embed/qtHTf6q_UaI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>


### History
Logs are an important part of Unix philosophy and design. The Kernel, services, programs and most events (let it be a crash or a login attempt) will generate logs. These logs can be examines / monitored to gain insights about the system and its status. If you watch a Linux guy on a windows machine for 1 hour, you will hear "where are the logs?". 

If every single program tries to handle its own logs we will face 2 issues (at least!); 1. programming will be difficult because you need to invent (or import) the wheel and 2. different programmers will generate different kinds, formats and location for their logs and it will be difficult to keep them  under your control. To overcome this, Unix world had its own solution: central logging service.

The older utility to manage logs was called `syslog`, then we had `syslog-ng` (new-generation) and later `rsyslog` which is what most distros were using till a couple of years ago. `rsyslog` is still present and is part of the GNU/Linux universe. It can receive logs from different programs (even over network) and save them in different places (files or files in network or even run some actions on them). It's logs are saved in the text format and can be managed by the tool of your choice, let it be `grep`, `less`, `tail`, `zless` (less a compressed file without explicitly opening it), `zcat` (catting a file without explicitly opening it), `grep`, ....

But these days `systemd` is conquering most of the linux world and logs are not an exception. SystemDs logging service is called `journald` and we use the `journalctl`  command to read its logs; unfortunately they are not text files anymore.

You should also know about a couple of other tools (like `logrotate` to cleanup the older logs) and be familiar with some of more important system logs under GNU/Linux. So lets start.

> Its fun to know how the logs work in more depth. Here it is: whoever wants to log something eventually sends its messages to the `/dev/log` or  `/dev/kmsg` devices (often by using a helper tool). The logging tool (say `rsyslog`) will read from these devices and process the logs based on its configs; and now, the messages are logs!

## dmesg
As I told you, Linux loves logs and will be happy logging everything. But what about the boot process? What happens if the kernel wants to log something before the disks are ready? These logs are saved by the Kernel in the *Kernel Ring Buffer*. You can access it using the `dmesg` command. 


## log rotation
So logs are being generated and saved! Someone need to clean them up to prevent the disk from getting full. The `logrotate` utility takes care of this task.  The main configuration is at `/etc/logrotate.conf`:

```
root@debian:# cat /etc/logrotate.conf
# see "man logrotate" for details

# global options do not affect preceding include directives

# rotate log files weekly
weekly

# keep 4 weeks worth of backlogs
rotate 4

# create new (empty) log files after rotating old ones
create

# use date as a suffix of the rotated file
#dateext

# uncomment this if you want your log files compressed
#compress

# packages drop log rotation information into this directory
include /etc/logrotate.d

# system-specific logs may also be configured here.
```

and specific services do create their logs in `/etc/logrotate.d/`:

```
root@debian:# cat /etc/logrotate.d/apt
/var/log/apt/term.log {
  rotate 12
  monthly
  compress
  missingok
  notifempty
}

/var/log/apt/history.log {
  rotate 12
  monthly
  compress
  missingok
  notifempty
}
```


These are the meaning of some of these parameters:

| parameter | meaning |
| :---: | :---: |
| weekly | rotate logs weekly |
| missingok | it is fine if there is no log for this week |
| rotate 52 | keep the latest 52 logs and delete the older ones |
| compress | compress the logs |
| create 0640 www-data adm | create the files with this access and owners |
| pre & post rotate | run these scripts or commands before and after the rotation |

This above configuration will create a zipped file for each week, keeping only 52 of them instead of a huge log file for this program.



The `logrotate` runs using crons and does its job on a daily basis based on a configuration on `/etc/cron.daily/logrotate`


## some famous log files

Generally logs are saved at `/var/log`. In case of any issue and if you do not know what to do, it is a common practice to run a `ls -ltrh /var/log/` to see if any program generated a new log or not.

But lets have a look at some of the famous logs:


##### `/var/log/auth.log` (in Debian Based)

Authentication processes will log here. Things like `cron` jobs, failed logins, `sudo` informations, ...
##### `/var/log/syslog`

A centralized place most of the logs received by `rsyslogd` if a specific logfile is not provided in `/etc/rsyslog.conf`
##### `/var/log/debug`

Debug information from programs.

##### `/var/log/kern.log`

Kernel messages.
##### `/var/log/messages`

Informative messages from services. This is also the default place for logs for remote clients.
##### `/var/run/utmp` & `/var/log/wtmp`

Successful logins.
##### `/var/log/btmp`

Failed logins. You can check this to see if anyone is trying to guess your passwords!
##### `/var/log/faillog`

Failed authentication attempts.
##### `/var/log/lastlog`
Date and time of recent user logins.

##### Service logs
Service logs do create files or directories at `/var/log` and update their logs there. For example there might be a `/var/log/apache2/` (or `/var/log/httpd`) for the Apache HTTP server or a `/var/log/mysql` for the MySQL DB.





## rsyslog

<iframe width="560" height="315" src="https://www.youtube.com/embed/xliHONdwFy0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

This is the newer generation of syslogs and is used in many environments. Its main configuration is located at `/etc/rsyslog.conf` and it also reads anything in `/etc/rsyslog.d/` directory. Its configuration consists of 3 main sections: 

1. `MODULES`, modules used. For example to let the rsyslog use UDP connections
2. `GLOBAL DIRECTIVES`, general configurations like directories accesses
3. `RULES`, A combination of *facilities*, *priorities* and *actions* tells the `rsyslog` what to do with each log.

```
root@debian:~# cat /etc/rsyslog.conf
# /etc/rsyslog.conf configuration file for rsyslog
#
# For more information install rsyslog-doc and see
# /usr/share/doc/rsyslog-doc/html/configuration/index.html


#################
#### MODULES ####
#################

module(load="imuxsock") # provides support for local system logging
module(load="imklog")   # provides kernel logging support
#module(load="immark")  # provides --MARK-- message capability

# provides UDP syslog reception
#module(load="imudp")
#input(type="imudp" port="514")

# provides TCP syslog reception
#module(load="imtcp")
#input(type="imtcp" port="514")


###########################
#### GLOBAL DIRECTIVES ####
###########################

#
# Set the default permissions for all log files.
#
$FileOwner root
$FileGroup adm
$FileCreateMode 0640
$DirCreateMode 0755
$Umask 0022

#
# Where to place spool and state files
#
$WorkDirectory /var/spool/rsyslog

#
# Include all config files in /etc/rsyslog.d/
#
$IncludeConfig /etc/rsyslog.d/*.conf


###############
#### RULES ####
###############

#
# Log anything besides private authentication messages to a single log file
#
*.*;auth,authpriv.none		-/var/log/syslog

#
# Log commonly used facilities to their own log file
#
auth,authpriv.*			/var/log/auth.log
cron.*				-/var/log/cron.log
kern.*				-/var/log/kern.log
mail.*				-/var/log/mail.log
user.*				-/var/log/user.log

#
# Emergencies are sent to everybody logged in.
#
*.emerg				:omusrmsg:*
```

As you can see **facilities** could be things like:
  > `kern`, `user`, `mail`, `daemon`, `cron`, `auth`, `ntp`, `security`, `console`, `syslog`, ... 

The **priority** could be one of the below:
  > `emerg`/`panic`, `alert`, `crit`, `err`/`error`, `warn`/`warning`, `notice`, `info` or `debug`. 

On the **action** part we can have things like these:

| action | sample | meaning |
| :---: | :---: | :--- |
| filename | /usr/log/logins.log | will write the log to this file |
| username | jadi | will notify that person on the screen |
| @ip | @192.168.1.100 | will send this log to this log server and that log server will decide what to do with it based on its configs |

So a line like this will show the kernel panics to a remote log server and also will log everything on every level to a log file:

```text
kern.panic      @192.168.1.100
*.*             /var/log/messages
```

If you log some specific priority, all the **more important** things will be logged too! So if you write `cron.notice /var/log/cron/cron.log`, you are logging the `emerg/panic`, `alert`, `critical`, `error`, `warning` and `notice` logs of the cron category too.


Priority Levels (According to Syslog(3) and logger manpage):

```text

       This determines the importance of the message.  The levels are, in order of decreasing importance:

       emerge      system is unusable

       alert      action must be taken immediately

       crit       critical conditions

       error        error conditions

       warning    warning conditions

       notice     normal, but significant, condition

       info       informational message

       debug      debug-level message


       panic      deprecated synonym for emerg
       error      deprecated synonym for err
       warn       deprecated synonym for warning

```

> If you need to log ONLY one specific level, add an equal sign \(=\) before the priority like this `local3.=alert /var/log/user.alert.log`.

It is important to know that the binary which logs the _\*kern_ category is a standalone daemon. This daemon is called `klogd` and uses same configuration files. Why? so even after everything is crashed, `klogd` will be able to log the kernel's crashes ;\).


### logger
If you need to send something toward the `rsyslog`, you can use the `logger` tool. 

```
root@debian:# logger Testing my lovely tool
root@debian:# logger local1.emerg Nothing emergent for sure
root@debian:# tail -3 /var/log/syslog
2023-06-30T06:05:01.325358-04:00 debian CRON[914]: (root) CMD (command -v debian-sa1 > /dev/null && debian-sa1 1 1)
2023-06-30T06:13:27.671410-04:00 debian root: Testing my lovely tool
2023-06-30T06:13:45.795158-04:00 debian root: local1.emerg Nothing emergent for sure
```



## journald

<iframe width="560" height="315" src="https://www.youtube.com/embed/jXO7q_7a6-s" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

You have seen the `systemd` in various parts of this course. We have seen how it is part of the init process and how it handles the services and timers. All of these activities (and other logs reaching system journalying system) are logged in binary files, readable using `journalctl` which is part of the `systemd-journald` utility.

```
root@debian:~# systemctl status systemd-journald
● systemd-journald.service - Journal Service
     Loaded: loaded (/lib/systemd/system/systemd-journald.service; static)
     Active: active (running) since Fri 2023-06-30 05:28:50 EDT; 52min ago
TriggeredBy: ● systemd-journald-dev-log.socket
             ● systemd-journald-audit.socket
             ● systemd-journald.socket
       Docs: man:systemd-journald.service(8)
             man:journald.conf(5)
   Main PID: 261 (systemd-journal)
     Status: "Processing requests..."
      Tasks: 1 (limit: 4583)
     Memory: 17.1M
        CPU: 138ms
     CGroup: /system.slice/systemd-journald.service
             └─261 /lib/systemd/systemd-journald

Jun 30 05:28:50 debian systemd-journald[261]: Journal started
Jun 30 05:28:50 debian systemd-journald[261]: Runtime Journal (/run/log/journal/ec22e43962c64359b9b25cfa650b025b) is 4.9M, max 39.1M,>
Jun 30 05:28:50 debian systemd-journald[261]: Time spent on flushing to /var/log/journal/ec22e43962c64359b9b25cfa650b025b is 23.816ms>
Jun 30 05:28:50 debian systemd-journald[261]: System Journal (/var/log/journal/ec22e43962c64359b9b25cfa650b025b) is 28.2M, max 4.0G, >
Jun 30 05:28:50 debian systemd-journald[261]: Received client request to flush runtime journal.
Notice: journal has been rotated since unit was started, output may be incomplete.
```

and here is the configuration file:

```
root@debian:~# cat /etc/systemd/journald.conf
#  This file is part of systemd.
#
#  systemd is free software; you can redistribute it and/or modify it under the
#  terms of the GNU Lesser General Public License as published by the Free
#  Software Foundation; either version 2.1 of the License, or (at your option)
#  any later version.
#
# Entries in this file show the compile time defaults. Local configuration
# should be created by either modifying this file, or by creating "drop-ins" in
# the journald.conf.d/ subdirectory. The latter is generally recommended.
# Defaults can be restored by simply deleting this file and all drop-ins.
#
# Use 'systemd-analyze cat-config systemd/journald.conf' to display the full config.
#
# See journald.conf(5) for details.

[Journal]
#Storage=auto
#Compress=yes
#Seal=yes
#SplitMode=uid
#SyncIntervalSec=5m
#RateLimitIntervalSec=30s
#RateLimitBurst=10000
#SystemMaxUse=
#SystemKeepFree=
#SystemMaxFileSize=
#SystemMaxFiles=100
#RuntimeMaxUse=
#RuntimeKeepFree=
#RuntimeMaxFileSize=
#RuntimeMaxFiles=100
#MaxRetentionSec=
#MaxFileSec=1month
#ForwardToSyslog=yes
#ForwardToKMsg=no
#ForwardToConsole=no
#ForwardToWall=yes
#TTYPath=/dev/console
#MaxLevelStore=debug
#MaxLevelSyslog=debug
#MaxLevelKMsg=notice
#MaxLevelConsole=info
#MaxLevelWall=emerg
#LineMax=48K
#ReadKMsg=yes
#Audit=no
```

### querying journal contents

If you run the `journalctl` you will get all the logs... too much. So there are some useful switches:

| Switch | Meaning |
| :---: | :---: |
| -r | show in reverse; newer on top |
| -f | keep showing the tail |
| -e | show and go to the end |
| -n | show this many lines from the end (newest ones) |
| -k | show kernel message (equal to `dmesg`) |
| -b | show from a specific boot, -1 is the previous one, 0 is the current one. You can check the list using `--list-boots` |
| -p | from specific priority, say `-p err` |
| -u | from a specific systemd unit |

You can also use the `--since` and `--until` to show a specific time range, It is possible to provide time as `YYYY-MM-DD HH:MM:SS` or use things like `yesterday`, `today`, `tomorrow`, `now` or even `--since "10 minutes ago"` which is equals to `--since "-2 minutes"`.

> If there are too many lines, push `>` to jump to the end (or `<` to go to the beginning)

You can also add the name of the program to the command to see the logs from that specific program; say `journalctl /usr/bin/xrdp` or use some fields like `PRIORITY=`, `_PID=` and provide values.

### systemd-cat
This tools is used when you want to manually send logs to the journaling system. It sends its input to the journal or if provided, runs the command and sends the result to the journal.

```
root@debian:~# echo "This is my first test" | systemd-cat
root@debian:~# systemd-cat -p info uptime #sending priority too
root@debian:~# journalctl -n 3
Jun 30 06:31:01 debian systemd[1]: Finished apt-daily.service - Daily apt download activities.
Jun 30 06:34:18 debian cat[1020]: This is my first test
Jun 30 06:34:48 debian uptime[1022]:  06:34:48 up  1:05,  4 users,  load average: 0.00, 0.00, 0.00
```

## managing storage
The systemd journals can keep their logs in memeory or write them to the disk or drop all the logs. This is determined by the configurations in `/etc/systemd/journald.conf`. But the default behaviour is as follow:

1. The system checks the `/var/log/journal`. If this directory, exists logs will be saved in a directory inside this. The name of the directory will be decided by looking at `/etc/machine-id`
2. If the `/var/log/journal` is not there, the logs will be saved in memory at `/run/log/jouranl` and in the directory decided by `/etc/machine-id`.

But you can overcome these configs by the following sections:

```
Storage=volatile     # keep the logs in memory
Storage=persistent   # keep on disk, if needed create the directories
Storage=auto         # will write to disk only if the directory exists
Storage=none         # do not keep logs
```

If the logs are being written to disk, these variable will manage the disk usage:

| Variable Name | Usage |
| :----: | --- | 
| SystemMaxUse | The Maximum disk usage, say 500M. The default is on `10%` |
| SystemKeepFree | Keep at least this much free, say 1G. The default is 15% |
| SystemMaxFileSize | Maximum size of each individual file. The default is 1/8 of SystemMaxUse |
| SystemMaxFiles | Max number of non-currently-active files. The default is 100 |

If you are keeping the logs in **memory**, the equivalent variables are `RuntimeMaxUse`, `RuntimeKeepFree`, `RuntimeMaxFileSize`, & `RuntimeMaxFiles`.  

In case you need to do the clean-up manually (with the help of systemd tools for sure), you can run `journalctl` with these switches:


 
| Switch | Usage |
| :----: | --- | 
| --vacuum-time | clean everything older than this. for example `--vacuum-time=3months` clean anything older than 3 months. You can use `s`, `m`, `h` for seconds, minutes and days and `d`/`days`, `months`, `weeks`/`w` and `years`/`y`. 
| --vacuum-size | eliminate till logs occupy a specific size; say 1G |
| --vacuum-files | Only keep this much archive files |

### checking logs from a recovered system
If you have a crashed / non-booting system, you can still examine its logs; if the files are there. As you know the files are in `/var/log/journal/{mchine-id}` where machine-id is in `/etc/machine-id` of the crashed machine. 

You can move these files to a directory after booting the crashed machine with a live linux or mount its hard on another machine or even examine them in place. The `-D` (or `--directory`) switch of `journalctl` indicates the location of the journal files. So if your crashed machine id is `ec22e43962c64359b9b25cfa650b025b` and you've mounted its `/var/` under your `/mnt/var/` directory, you can issue this command to read its logs and see what had happened:

```
journalctl -D=/mnt/var/log/journal/ec22e43962c64359b9b25cfa650b025b/
```

You can also use the `--merge` switch to merge these logs into your machine or use `--file` to check only one specific journal file. Lastly if the exact location of journal files are not known, you can use `--root /mnt` and tell the `journalctl` to search there for journal files.



