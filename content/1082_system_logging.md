Title: 108.2 System logging
Date: 2021-08-03 13:33
Category: 108

# 108.2 System logging
*Weight: 3*

Candidates should be able to configure the syslog daemon. This objective also includes configuring the logging daemon to send log output to a central log  server or accept log output as a central log server. Use of the systemd journal subsystem is covered. Also, awareness of rsyslog and syslog-ng as alternative logging systems is included.

## Key Knowledge Areas
- Configuration of the syslog daemon.
- Understanding of standard facilities, priorities and actions.
- Configuration of logrotate.
- Awareness of rsyslog and syslog-ng.

## Terms and Utilities
- syslog.conf
- syslogd
- klogd
- /var/log/
- logger
- logrotate
- /etc/logrotate.conf
- /etc/logrotate.d/
- journalctl
- /etc/systemd/journald.conf
- /var/log/journal/

## History
The Linux logging system is under heavy changes. We will cover the **syslog** but most system have replaced it with **rsyslog** and **systemd journal**s. The strange thing is the fact that **systemd journal** uses a binary file format which is not that common in Linux world.

The logging in linux is orginized based on three concepts: facilities, priorities and actions. When a program generated a log, it tags or labels that log with a facility (like `mail`) which says what this log is and a priority (like `alert`). Each tag can have values like the following list:

- **facilities**: auth, user, kern, cron, daemon, mail, user, local1, local2, ...
- **priorities**: emerg/panic, alert, crit, err/error, warn/warning, notice, info, debug

As you can guess, the **facilities** work like categories and priorites indicate how importatnt this log is - or in more technical language indicated logs level.

On the **action** part we can have things like these:

|action|sample|meaning|
|-|-|-|
|filename|/usr/log/logins.log|will write the log to this file|
|username|jadi|will notify that person on the screen|
|@ip|@192.168.1.100|will send this log to this log server and that log server will decide what to do with it based on its configs|

So a line like this will show the kernel panics to a remote log server and also will log everything on every level to a log file:

````
kern.panic      @192.168.1.100
*.*             /var/log/messages
````

If you log some specific priority, all the **more important** things will be logged too! So if you write `cron.notice   /var/log/cron/log`, you are logging the emerg/panic, alert, critical, error, warning and notice logs of the cron category too.

> If you need to log ONLY one specific level, add an equal sign (=) before the priority like this `local3.=alert    /var/log/user.alert.log`.

It is important to know that the binary which logs the **kern* category is a standalone daemon. This daemon is called `klogd` and uses same configuration files. Why? so even after everything is crashed, klogd can log the kernel crashes ;)

## syslog and rsyslog
Most modern system use **rsyslog** instead of **syslog**. Their functionality is mostly same and here we will only cover the rsyslog.

The main configuration file in rsyslog, as you should be able to guess is `/etc/syslog.conf`. It loads some modules on the top and then have lines like this:

````
auth,authpriv.*			/var/log/auth.log
*.*;auth,authpriv.none		-/var/log/syslog
#cron.*				/var/log/cron.log
daemon.*			-/var/log/daemon.log
kern.*				-/var/log/kern.log
lpr.*				-/var/log/lpr.log
mail.*				-/var/log/mail.log
user.*				-/var/log/user.log
````

> 'auth,authpriv.*' means both auth  and authpriv properties

Note that sometimes on the action we have a `-`. This means the log will go the memory cache to prevent disk from spinning all the time.

Again there is a `/etc/rsyslog.d/` and it is better for different softwares and admins to add their specific configs there, instead of editing the main configuration file.

### creating rsyslog listener
If you need to start a rsylog listener and catch other systems log messages, it is enough to add an `-r` switch to rsyslog options. Just edit the  `/etc/default/rsyslog` and change options from `""` to `"-r"`.

````
cat /etc/default/rsyslog
# Options for rsyslogd
# -x disables DNS lookups for remote messages
# See rsyslogd(8) for more details
RSYSLOGD_OPTIONS="-r"
````
and restart the daemon:

````
# systemctl restart rsyslog
````

### journalctl
The newer distributions are switching to **systemd** and are using **systemd journal** for their logging. As I mentioned earlier the systemd keeps its logs as binary files and the user should use the `journalctl` to access them.

````
# journalctl
-- Logs begin at Sun 2016-01-03 10:35:53 IRST, end at Tue 2016-01-05 22:34:06 IRST. --
Jan 03 10:35:53 funlife systemd-journald[184]: Runtime journal (/run/log/journal/) is currently using 8.0M.
                                               Maximum allowed usage is set to 238.1M.
                                               Leaving at least 357.2M free (of currently available 2.3G of space).
                                               Enforced usage limit is thus 238.1M, of which 230.1M are still available.
Jan 03 10:35:53 funlife kernel: Initializing cgroup subsys cpuset
Jan 03 10:35:53 funlife kernel: Initializing cgroup subsys cpu
Jan 03 10:35:53 funlife kernel: Initializing cgroup subsys cpuacct
Jan 03 10:35:53 funlife kernel: Linux version 4.3.0-1-amd64 (debian-kernel@lists.debian.org) (gcc version 5.3.1 20151207 (Debian 5.3.1-3) ) #1 SMP Debian 4.3.3-2 (2015-
Jan 03 10:35:53 funlife kernel: Command line: BOOT_IMAGE=/boot/vmlinuz-4.3.0-1-amd64 root=UUID=e6b1e8e9-dee3-45cd-b147-44801cc680f0 ro quiet
Jan 03 10:35:53 funlife kernel: Disabled fast string operations
````

> At the moment, most new systems use `systemd` and `journalctl` but also have `rsyslog` installed and are logging information in both systems.

The config file of journalctl is located at `/etc/systemd/journald.conf`.

## logger

It is possible to use the `logger` command to generate some logs:

````
logger local1.info jadi was here
````
and this will appear at `/var/log/syslog`.

## logrotate

Now we are generating a lot of logs. What should we do with them? How they should be archived? The `logrotate` utility assists us in this area. Its main config file is `/etc/logrotate.conf` and as any modern program, other config files can go into `/etc/logrotate.d/`.

````
# cat /etc/logrotate.conf
# see "man logrotate" for details
# rotate log files weekly
weekly

# keep 4 weeks worth of backlogs
rotate 4

# create new (empty) log files after rotating old ones
create

# uncomment this if you want your log files compressed
#compress

# packages drop log rotation information into this directory
include /etc/logrotate.d

# no packages own wtmp, or btmp -- we'll rotate them here
/var/log/wtmp {
    missingok
    monthly
    create 0664 root utmp
    rotate 1
}

/var/log/btmp {
    missingok
    monthly
    create 0660 root utmp
    rotate 1
}

# system-specific logs may be configured here
````

It is very easy to see how it works. Lets check one of them:

````
# cat /etc/logrotate.d/nginx
/var/log/nginx/*.log {
	weekly
	missingok
	rotate 52
	compress
	delaycompress
	notifempty
	create 0640 www-data adm
	sharedscripts
	prerotate
		if [ -d /etc/logrotate.d/httpd-prerotate ]; then \
			run-parts /etc/logrotate.d/httpd-prerotate; \
		fi \
	endscript
	postrotate
		invoke-rc.d nginx rotate >/dev/null 2>&1
	endscript
}
````
These are the meaning of some of these parameters:

|parameter|meaning|
|-|-|
|weekly|rotate logs weekly|
|missingok|it is fine if there is no log for this week|
|rotate 52|keep the latest 52 logs and delete the older ones|
|compress|compress the logs|
|create 0640 www-data adm|create the files with this access and owners|
|pre & post rotate|run these scripts or commands before and after the rotation|

This configuration will create a zipped file for each week, keeping only 52 of them instead of a huge log file for this program.
