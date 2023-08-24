Title: 108.4 Manage printers and printing
Date: 2010-12-03 10:20
Category: LPIC1
Tags: LPIC1, 102, LPIC1-102-500
Authors: Jadi
sortorder: 390
Summary: 

_Weight: 2_

Candidates should be able to manage print queues and user print jobs using CUPS and the LPD compatibility interface.

### Key Knowledge Areas

* Basic CUPS configuration (for local and remote printers).
* Manage user print queues.
* Troubleshoot general printing problems.
* Add and remove jobs from configured printer queues.

### Terms and Utilities

* CUPS configuration files, tools and utilities
* `/etc/cups/`
* lpd legacy interface \(lpr, lprm, lpq\)

<iframe width="560" height="315" src="https://www.youtube.com/embed/8I9J0gsLe-U" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## CUPS

Most Linux distributions use the CUPS package for printing. You may need to install it via your package manager and start its service using the systemd or the init system your system use.

```
$ sudo apt install cups
[sudo] password for jadi:
Reading package lists... Done
Building dependency tree... Done
Reading state information... Done
The following additional packages will be installed:
  acl avahi-daemon colord colord-data cups-browsed cups-client cups-common cups-core-drivers
  cups-daemon cups-filters cups-filters-core-drivers cups-ipp-utils cups-ppdc
  cups-server-common fonts-droid-fallback fonts-noto-mono fonts-urw-base35 ghostscript
  ipp-usb libavahi-core7 libavahi-glib1 libcolorhug2 libcupsfilters1 libdaemon0 libexif12
  libfontembed1 libgphoto2-6 libgphoto2-l10n libgphoto2-port12 libgs-common libgs10
  libgs10-common libgusb2 libidn12 libieee1284-3 libijs-0.35 libjbig2dec0 libjson-glib-1.0-0
  libjson-glib-1.0-common liblouis-data liblouis20 liblouisutdml-bin liblouisutdml-data
  liblouisutdml9 libltdl7 libnss-mdns libpaper-utils libpaper1 libpoppler-cpp0v5
  libpoppler-glib8 libpoppler126 libqpdf29 libsane-common libsane1 libsnmp-base libsnmp40
  lynx lynx-common mailcap poppler-data poppler-utils sane-airscan sane-utils update-inetd
  usb.ids
Suggested packages:
  avahi-autoipd colord-sensor-argyll cups-bsd cups-pdf foomatic-db-compressed-ppds
  | foomatic-db smbclient antiword docx2txt imagemagick fonts-noto fonts-freefont-otf
  | fonts-freefont-ttf fonts-texgyre gphoto2 ooo2dbk rtf2xml avahi-autoipd | zeroconf hplip
  snmp-mibs-downloader fonts-japanese-mincho | fonts-ipafont-mincho fonts-arphic-ukai
  fonts-arphic-uming fonts-nanum unpaper
The following NEW packages will be installed:
  acl avahi-daemon colord colord-data cups cups-browsed cups-client cups-common
  cups-core-drivers cups-daemon cups-filters cups-filters-core-drivers cups-ipp-utils
  cups-ppdc cups-server-common fonts-droid-fallback fonts-noto-mono fonts-urw-base35
  ghostscript ipp-usb libavahi-core7 libavahi-glib1 libcolorhug2 libcupsfilters1 libdaemon0
  libexif12 libfontembed1 libgphoto2-6 libgphoto2-l10n libgphoto2-port12 libgs-common
  libgs10 libgs10-common libgusb2 libidn12 libieee1284-3 libijs-0.35 libjbig2dec0
  libjson-glib-1.0-0 libjson-glib-1.0-common liblouis-data liblouis20 liblouisutdml-bin
  liblouisutdml-data liblouisutdml9 libltdl7 libnss-mdns libpaper-utils libpaper1
  libpoppler-cpp0v5 libpoppler-glib8 libpoppler126 libqpdf29 libsane-common libsane1
  libsnmp-base libsnmp40 lynx lynx-common mailcap poppler-data poppler-utils sane-airscan
  sane-utils update-inetd usb.ids
0 upgraded, 66 newly installed, 0 to remove and 7 not upgraded.
Need to get 40.7 MB of archives.
After this operation, 163 MB of additional disk space will be used.
Do you want to continue? [Y/n]
...
...
```

CUPS stands for Common Unix Printing System and as you can see, it installs many related packages and even suggests some more. This is because CUPS need lots of information about different printers and uses many tools to print. When installed, you need to start the service:

```
$ sudo systemctl start cups.service
$ sudo systemctl status cups.service
● cups.service - CUPS Scheduler
     Loaded: loaded (/lib/systemd/system/cups.service; enabled; preset: enabled)
     Active: active (running) since Sun 2023-07-16 13:50:20 EDT; 27s ago
TriggeredBy: ● cups.path
             ● cups.socket
       Docs: man:cupsd(8)
   Main PID: 2366 (cupsd)
     Status: "Scheduler is running..."
      Tasks: 1 (limit: 4583)
     Memory: 2.8M
        CPU: 400ms
     CGroup: /system.slice/cups.service
             └─2366 /usr/sbin/cupsd -l

Jul 16 13:50:20 debian systemd[1]: Starting cups.service - CUPS Scheduler...
Jul 16 13:50:20 debian systemd[1]: Started cups.service - CUPS Scheduler.
```

To access the CUPS services, there are different ways, including a web based interface, GUI programs on the graphical modes and even command line tools. CUPS is designed to be simple and able to use different printers from various vendors.

### configuration files

As most other linux program, CUPS saves its configuration at `/etc` directory.

```
# ls /etc/cups/
cups-browsed.conf  cups-files.conf  ppd		   raw.convs  snmp.conf  subscriptions.conf
cupsd.conf	   interfaces	    printers.conf  raw.types  ssl	 subscriptions.conf.O
```

The main configuration file is the `cupsd.conf`. Take a look at it; it is very easy to understand. For example the `Listen localhost:631` line tells the CUPS to listen on localhost port 631. Here is a sample:

```
$ cat /etc/cups/cupsd.conf
#
# Configuration file for the CUPS scheduler.  See "man cupsd.conf" for a
# complete description of this file.
#

# Log general information in error_log - change "warn" to "debug"
# for troubleshooting...
LogLevel warn
PageLogFormat

# Specifies the maximum size of the log files before they are rotated.  The value "0" disables log rotation.
MaxLogSize 0

# Default error policy for printers
ErrorPolicy retry-job

# Only listen for connections from the local machine.
Listen localhost:631
Listen /run/cups/cups.sock

# Show shared printers on the local network.
Browsing Yes
BrowseLocalProtocols dnssd

# Default authentication type, when authentication is required...
DefaultAuthType Basic

# Web interface setting...
WebInterface Yes

# Timeout after cupsd exits if idle (applied only if cupsd runs on-demand - with -l)
IdleExitTimeout 60

# Restrict access to the server...
<Location />
  Order allow,deny
</Location>

# Restrict access to the admin pages...
<Location /admin>
  Order allow,deny
</Location>

# Restrict access to configuration files...
<Location /admin/conf>
  AuthType Default
  Require user @SYSTEM
  Order allow,deny
</Location>

# Restrict access to log files...
<Location /admin/log>
  AuthType Default
  Require user @SYSTEM
  Order allow,deny
</Location>

# Set the default printer/job policies...
<Policy default>
  # Job/subscription privacy...
  JobPrivateAccess default
  JobPrivateValues default
  SubscriptionPrivateAccess default
  SubscriptionPrivateValues default

  # Job-related operations must be done by the owner or an administrator...
  <Limit Create-Job Print-Job Print-URI Validate-Job>
    Order deny,allow
  </Limit>

  <Limit Send-Document Send-URI Hold-Job Release-Job Restart-Job Purge-Jobs Set-Job-Attributes Create-Job-Subscription Renew-Subscription Cancel-Subscription Get-Notifications Reprocess-Job Cancel-Current-Job Suspend-Current-Job Resume-Job Cancel-My-Jobs Close-Job CUPS-Move-Job CUPS-Get-Document>
    Require user @OWNER @SYSTEM
    Order deny,allow
  </Limit>

  # All administration operations require an administrator to authenticate...
  <Limit CUPS-Add-Modify-Printer CUPS-Delete-Printer CUPS-Add-Modify-Class CUPS-Delete-Class CUPS-Set-Default CUPS-Get-Devices>
    AuthType Default
    Require user @SYSTEM
    Order deny,allow
  </Limit>

  # All printer operations require a printer operator to authenticate...
  <Limit Pause-Printer Resume-Printer Enable-Printer Disable-Printer Pause-Printer-After-Current-Job Hold-New-Jobs Release-Held-New-Jobs Deactivate-Printer Activate-Printer Restart-Printer Shutdown-Printer Startup-Printer Promote-Job Schedule-Job-After Cancel-Jobs CUPS-Accept-Jobs CUPS-Reject-Jobs>
    AuthType Default
    Require user @SYSTEM
    Order deny,allow
  </Limit>

  # Only the owner or an administrator can cancel or authenticate a job...
  <Limit Cancel-Job CUPS-Authenticate-Job>
    Require user @OWNER @SYSTEM
    Order deny,allow
  </Limit>

  <Limit All>
    Order deny,allow
  </Limit>
</Policy>

# Set the authenticated printer/job policies...
<Policy authenticated>
  # Job/subscription privacy...
  JobPrivateAccess default
  JobPrivateValues default
  SubscriptionPrivateAccess default
  SubscriptionPrivateValues default

  # Job-related operations must be done by the owner or an administrator...
  <Limit Create-Job Print-Job Print-URI Validate-Job>
    AuthType Default
    Order deny,allow
  </Limit>

  <Limit Send-Document Send-URI Hold-Job Release-Job Restart-Job Purge-Jobs Set-Job-Attributes Create-Job-Subscription Renew-Subscription Cancel-Subscription Get-Notifications Reprocess-Job Cancel-Current-Job Suspend-Current-Job Resume-Job Cancel-My-Jobs Close-Job CUPS-Move-Job CUPS-Get-Document>
    AuthType Default
    Require user @OWNER @SYSTEM
    Order deny,allow
  </Limit>

  # All administration operations require an administrator to authenticate...
  <Limit CUPS-Add-Modify-Printer CUPS-Delete-Printer CUPS-Add-Modify-Class CUPS-Delete-Class CUPS-Set-Default>
    AuthType Default
    Require user @SYSTEM
    Order deny,allow
  </Limit>

  # All printer operations require a printer operator to authenticate...
  <Limit Pause-Printer Resume-Printer Enable-Printer Disable-Printer Pause-Printer-After-Current-Job Hold-New-Jobs Release-Held-New-Jobs Deactivate-Printer Activate-Printer Restart-Printer Shutdown-Printer Startup-Printer Promote-Job Schedule-Job-After Cancel-Jobs CUPS-Accept-Jobs CUPS-Reject-Jobs>
    AuthType Default
    Require user @SYSTEM
    Order deny,allow
  </Limit>

  # Only the owner or an administrator can cancel or authenticate a job...
  <Limit Cancel-Job CUPS-Authenticate-Job>
    AuthType Default
    Require user @OWNER @SYSTEM
    Order deny,allow
  </Limit>

  <Limit All>
    Order deny,allow
  </Limit>
</Policy>

# Set the kerberized printer/job policies...
<Policy kerberos>
  # Job/subscription privacy...
  JobPrivateAccess default
  JobPrivateValues default
  SubscriptionPrivateAccess default
  SubscriptionPrivateValues default

  # Job-related operations must be done by the owner or an administrator...
  <Limit Create-Job Print-Job Print-URI Validate-Job>
    AuthType Negotiate
    Order deny,allow
  </Limit>

  <Limit Send-Document Send-URI Hold-Job Release-Job Restart-Job Purge-Jobs Set-Job-Attributes Create-Job-Subscription Renew-Subscription Cancel-Subscription Get-Notifications Reprocess-Job Cancel-Current-Job Suspend-Current-Job Resume-Job Cancel-My-Jobs Close-Job CUPS-Move-Job CUPS-Get-Document>
    AuthType Negotiate
    Require user @OWNER @SYSTEM
    Order deny,allow
  </Limit>

  # All administration operations require an administrator to authenticate...
  <Limit CUPS-Add-Modify-Printer CUPS-Delete-Printer CUPS-Add-Modify-Class CUPS-Delete-Class CUPS-Set-Default>
    AuthType Default
    Require user @SYSTEM
    Order deny,allow
  </Limit>

  # All printer operations require a printer operator to authenticate...
  <Limit Pause-Printer Resume-Printer Enable-Printer Disable-Printer Pause-Printer-After-Current-Job Hold-New-Jobs Release-Held-New-Jobs Deactivate-Printer Activate-Printer Restart-Printer Shutdown-Printer Startup-Printer Promote-Job Schedule-Job-After Cancel-Jobs CUPS-Accept-Jobs CUPS-Reject-Jobs>
    AuthType Default
    Require user @SYSTEM
    Order deny,allow
  </Limit>

  # Only the owner or an administrator can cancel or authenticate a job...
  <Limit Cancel-Job CUPS-Authenticate-Job>
    AuthType Negotiate
    Require user @OWNER @SYSTEM
    Order deny,allow
  </Limit>

  <Limit All>
    Order deny,allow
  </Limit>
</Policy>
jadi@debian:~$
Broadcast message from root@debian on pts/3 (Sun 2023-07-16 20:54:04 EDT):

The system will power off now!

Connection to 192.168.64.7 closed by remote host.
Connection to 192.168.64.7 closed.
➜  lpic1book ssh jadi@192.168.64.7
jadi@192.168.64.7's password:
Linux debian 6.1.0-9-arm64 #1 SMP Debian 6.1.27-1 (2023-05-08) aarch64

The programs included with the Debian GNU/Linux system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.

Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent
permitted by applicable law.
You have no mail.
Last login: Mon Jul 17 08:13:13 2023
jadi@debian:~$ sudo su -
[sudo] password for jadi:
root@debian:~# cd /etc/cups/
root@debian:/etc/cups# ls
cups-browsed.conf  cups-files.conf  ppd		   raw.convs  snmp.conf  subscriptions.conf
cupsd.conf	   interfaces	    printers.conf  raw.types  ssl	 subscriptions.conf.O
root@debian:/etc/cups# cd
root@debian:~# ls /etc/cups/
cups-browsed.conf  cups-files.conf  ppd		   raw.convs  snmp.conf  subscriptions.conf
cupsd.conf	   interfaces	    printers.conf  raw.types  ssl	 subscriptions.conf.O
root@debian:~# cat /etc/cups/cupsd.conf
#
# Configuration file for the CUPS scheduler.  See "man cupsd.conf" for a
# complete description of this file.
#

# Log general information in error_log - change "warn" to "debug"
# for troubleshooting...
LogLevel warn
PageLogFormat

# Specifies the maximum size of the log files before they are rotated.  The value "0" disables log rotation.
MaxLogSize 0

# Default error policy for printers
ErrorPolicy retry-job

# Only listen for connections from the local machine.
Listen localhost:631
Listen /run/cups/cups.sock

# Show shared printers on the local network.
Browsing Yes
BrowseLocalProtocols dnssd

# Default authentication type, when authentication is required...
DefaultAuthType Basic

# Web interface setting...
WebInterface Yes

# Timeout after cupsd exits if idle (applied only if cupsd runs on-demand - with -l)
IdleExitTimeout 60

# Restrict access to the server...
<Location />
  Order allow,deny
</Location>

# Restrict access to the admin pages...
<Location /admin>
  Order allow,deny
</Location>

# Restrict access to configuration files...
<Location /admin/conf>
  AuthType Default
  Require user @SYSTEM
  Order allow,deny
</Location>

# Restrict access to log files...
<Location /admin/log>
  AuthType Default
  Require user @SYSTEM
  Order allow,deny
</Location>

# Set the default printer/job policies...
<Policy default>
  # Job/subscription privacy...
  JobPrivateAccess default
  JobPrivateValues default
  SubscriptionPrivateAccess default
  SubscriptionPrivateValues default

  # Job-related operations must be done by the owner or an administrator...
  <Limit Create-Job Print-Job Print-URI Validate-Job>
    Order deny,allow
  </Limit>

  <Limit Send-Document Send-URI Hold-Job Release-Job Restart-Job Purge-Jobs Set-Job-Attributes Create-Job-Subscription Renew-Subscription Cancel-Subscription Get-Notifications Reprocess-Job Cancel-Current-Job Suspend-Current-Job Resume-Job Cancel-My-Jobs Close-Job CUPS-Move-Job CUPS-Get-Document>
    Require user @OWNER @SYSTEM
    Order deny,allow
  </Limit>

  # All administration operations require an administrator to authenticate...
  <Limit CUPS-Add-Modify-Printer CUPS-Delete-Printer CUPS-Add-Modify-Class CUPS-Delete-Class CUPS-Set-Default CUPS-Get-Devices>
    AuthType Default
    Require user @SYSTEM
    Order deny,allow
  </Limit>

  # All printer operations require a printer operator to authenticate...
  <Limit Pause-Printer Resume-Printer Enable-Printer Disable-Printer Pause-Printer-After-Current-Job Hold-New-Jobs Release-Held-New-Jobs Deactivate-Printer Activate-Printer Restart-Printer Shutdown-Printer Startup-Printer Promote-Job Schedule-Job-After Cancel-Jobs CUPS-Accept-Jobs CUPS-Reject-Jobs>
    AuthType Default
    Require user @SYSTEM
    Order deny,allow
  </Limit>

  # Only the owner or an administrator can cancel or authenticate a job...
  <Limit Cancel-Job CUPS-Authenticate-Job>
    Require user @OWNER @SYSTEM
    Order deny,allow
  </Limit>

  <Limit All>
    Order deny,allow
  </Limit>
</Policy>

# Set the authenticated printer/job policies...
<Policy authenticated>
  # Job/subscription privacy...
  JobPrivateAccess default
  JobPrivateValues default
  SubscriptionPrivateAccess default
  SubscriptionPrivateValues default

  # Job-related operations must be done by the owner or an administrator...
  <Limit Create-Job Print-Job Print-URI Validate-Job>
    AuthType Default
    Order deny,allow
  </Limit>

  <Limit Send-Document Send-URI Hold-Job Release-Job Restart-Job Purge-Jobs Set-Job-Attributes Create-Job-Subscription Renew-Subscription Cancel-Subscription Get-Notifications Reprocess-Job Cancel-Current-Job Suspend-Current-Job Resume-Job Cancel-My-Jobs Close-Job CUPS-Move-Job CUPS-Get-Document>
    AuthType Default
    Require user @OWNER @SYSTEM
    Order deny,allow
  </Limit>

  # All administration operations require an administrator to authenticate...
  <Limit CUPS-Add-Modify-Printer CUPS-Delete-Printer CUPS-Add-Modify-Class CUPS-Delete-Class CUPS-Set-Default>
    AuthType Default
    Require user @SYSTEM
    Order deny,allow
  </Limit>

  # All printer operations require a printer operator to authenticate...
  <Limit Pause-Printer Resume-Printer Enable-Printer Disable-Printer Pause-Printer-After-Current-Job Hold-New-Jobs Release-Held-New-Jobs Deactivate-Printer Activate-Printer Restart-Printer Shutdown-Printer Startup-Printer Promote-Job Schedule-Job-After Cancel-Jobs CUPS-Accept-Jobs CUPS-Reject-Jobs>
    AuthType Default
    Require user @SYSTEM
    Order deny,allow
  </Limit>

  # Only the owner or an administrator can cancel or authenticate a job...
  <Limit Cancel-Job CUPS-Authenticate-Job>
    AuthType Default
    Require user @OWNER @SYSTEM
    Order deny,allow
  </Limit>

  <Limit All>
    Order deny,allow
  </Limit>
</Policy>

# Set the kerberized printer/job policies...
<Policy kerberos>
  # Job/subscription privacy...
  JobPrivateAccess default
  JobPrivateValues default
  SubscriptionPrivateAccess default
  SubscriptionPrivateValues default

  # Job-related operations must be done by the owner or an administrator...
  <Limit Create-Job Print-Job Print-URI Validate-Job>
    AuthType Negotiate
    Order deny,allow
  </Limit>

  <Limit Send-Document Send-URI Hold-Job Release-Job Restart-Job Purge-Jobs Set-Job-Attributes Create-Job-Subscription Renew-Subscription Cancel-Subscription Get-Notifications Reprocess-Job Cancel-Current-Job Suspend-Current-Job Resume-Job Cancel-My-Jobs Close-Job CUPS-Move-Job CUPS-Get-Document>
    AuthType Negotiate
    Require user @OWNER @SYSTEM
    Order deny,allow
  </Limit>

  # All administration operations require an administrator to authenticate...
  <Limit CUPS-Add-Modify-Printer CUPS-Delete-Printer CUPS-Add-Modify-Class CUPS-Delete-Class CUPS-Set-Default>
    AuthType Default
    Require user @SYSTEM
    Order deny,allow
  </Limit>

  # All printer operations require a printer operator to authenticate...
  <Limit Pause-Printer Resume-Printer Enable-Printer Disable-Printer Pause-Printer-After-Current-Job Hold-New-Jobs Release-Held-New-Jobs Deactivate-Printer Activate-Printer Restart-Printer Shutdown-Printer Startup-Printer Promote-Job Schedule-Job-After Cancel-Jobs CUPS-Accept-Jobs CUPS-Reject-Jobs>
    AuthType Default
    Require user @SYSTEM
    Order deny,allow
  </Limit>

  # Only the owner or an administrator can cancel or authenticate a job...
  <Limit Cancel-Job CUPS-Authenticate-Job>
    AuthType Negotiate
    Require user @OWNER @SYSTEM
    Order deny,allow
  </Limit>

  <Limit All>
    Order deny,allow
  </Limit>
</Policy>
```

All the printer data is saved at `/etc/cups/printers.conf`. The web interface or any other GUI is actually editing this file.

```
# cat /etc/cups/printers.conf
# Printer configuration file for CUPS v2.4.2
# Written by cupsd
# DO NOT EDIT THIS FILE WHEN CUPSD IS RUNNING
NextPrinterId 2
<Printer MyPrinter>
PrinterId 1
UUID urn:uuid:cea56d60-93a0-31bf-443b-5a7288e2cd51
Info My Printer
Location other room
MakeModel HP DesignJet 600 pcl, 1.0
DeviceURI http://thatprinter:631/ipp/
State Idle
StateTime 1689596391
ConfigTime 1689596367
Type 8450116
Accepting Yes
Shared Yes
JobSheets none none
QuotaPeriod 0
PageLimit 0
KLimit 0
OpPolicy default
ErrorPolicy retry-job
</Printer>
```

Another important configuration directory is located at `/etc/cups/ppd/`. This directory contains the PostScript printer Description (PPD) files. These let printers which use them to function properly. 

To find the CUPS logs, check the `/var/log` directory:

```
# ls /var/log/cups/
access_log  error_log
```
### CUPS web interface
To enable CUPS's web interface, you have to enable the following configuration in the `/etc/cups/cupsd.conf`:

```
WebInterface Yes
```

Then you will have access to the GUI via port **631**. So it will be enough to access the **localhost:631** or **127.0.0.1:631** (or the server's **IP** address on port **631**) from your browser.

![CUPS web interface on port 631](/images/cups_we_interface.png)

There are some of the important sections on the above page:

|Section|Usage|
|-------|-----|
| Administration |Adding printers, managing jobs and configuring the CUPS server |
| Jobs | Checking the active, pending & completed jobs |  
| Printers | List or search in the installed printers |

By default, system users can view printers and queued jobs ,but changes (like adding printers) will need more access. This is configured at the bottom part of `cupsd.conf` file. For example, the below configuration provides `CUPS-Add-Modify-Printer CUPS-Delete-Printer CUPS-Set-Defaul` access to anyone in `@printer_admin` group.

```
  <Limit CUPS-Add-Modify-Printer CUPS-Delete-Printer CUPS-Set-Default>
    AuthType Default
    Require user @printer_admin
    Order deny,allow
  </Limit>
```

> CUPS has most of the common printer drivers installed. You just need to choose the printer from the dropdown menu to add it.


### legacy tools

Just like the [MTA](//1083-mail-transfer-agent-mta-basics.html) programs, CUPS support all the legacy command line programs too. These used to be printing commands in the BSD world so you may need to install the `cups-bsd` package to let them work under your CUPS environment. The table below lists the BSD printing compatibility commands:

| command | usage |
| :--- | :--- |
| lpr | print a file |
| lpq | show print queue/jobs |
| lprm | rm/remove a file from priner queue |
| lpc | printer control / troubleshooting program |

#### `lpq`

The **q** stands for **queue**. Therefor `lpq` shows the printer queue and is used when you want to see the printing jobs. If you use the `-a` switch, `lpq` will list the jobs from **all** printers. Alternatively you can use the `-P` switch to show the jobs of a specific printer. So the following command will show the jobs of a printer called Apple-Dot-Matrix:

```
# lpq -PApple-Dot-Matrix
Apple-Dot-Matrix is ready and printing
Rank    Owner   Job     File(s)                         Total Size
active  unknown 1       unknown                         7168 bytes
1st     unknown 2       unknown                         2048 bytes
```

> There should be no spaces between the `-P` and the printer's name; strange? yes :D

#### `lpr`

This command sends a job to a printer. The printer is specified via the `-P` switch.

```
$ lpr -PApple-Dot-Matrix for_print.txt
$ lpq
Apple-Dot-Matrix is ready and printing
Rank    Owner   Job     File(s)                         Total Size
active  jadi    1       Untitled Document 1             7168 bytes
1st     jadi    2       Untitled1                       2048 bytes
2nd     jadi    3       for_print.txt                   1024 bytes
```

> If no printer is specified, the default printer will be used

#### `lprm`

The **rm** stands for **remove**. Therefor the `lprm` command removes jobs from the queue. Obviously, you have to provide the **Job ID**.

```
$ lpq
Apple-Dot-Matrix is ready and printing
Rank    Owner   Job     File(s)                         Total Size
active  jadi    1       Untitled Document 1             7168 bytes
1st     jadi    2       Untitled1                       2048 bytes
2nd     jadi    3       for_print.txt                   1024 bytes
jadi@funlife:/tmp$ lprm 2
jadi@funlife:/tmp$ lpq
Apple-Dot-Matrix is ready and printing
Rank    Owner   Job     File(s)                         Total Size
active  jadi    1       Untitled Document 1             7168 bytes
1st     jadi    3       for_print.txt                   1024 bytes
```

> Only root can remove other peoples print jobs

If you need to remove ALL the jobs of a specific printer, you can go with `-Pprinter_name -`. Yes! That is only one dash \(`-`\) after the printer name; that's why this is called a legacy command.

> the `lprm -` will remove all the print jobs

#### `lpc`

The **c** stands for **control**. Therefor `lpc` lets you control, check the status \(via `lpc status`\) and troubleshoot your printers.

```text
$ lpc status
Apple-Dot-Matrix:
    printer is on device 'ipp' speed -1
    queuing is enabled
    printing is enabled
    2 entries
    daemon present
```

In the above response,

* **queuing is enabled** tell us that the queue can accept new print jobs. If the queue is disabled, you can not even send new jobs to the printer.
* **printing is enabled** means that the printer is actually can print on the paper. This will be on the disable state if the printer is out of ink or paper or experiencing a paper jam.

If you are having problems with your printer or need to prevent it from accepting new jobs or let it accept jobs but not do the actual printing, these four commands can help:

| command | usage |
| :--- | :--- |
| cupsaccept | tells the printer queue to accept new jobs |
| cupsreject | tells the printer to reject any new job |
| cupsenable | enables the actual/physical printing of the jobs |
| cupsdisable | disables the physical printing of the jobs |

> In all cases, you have to provide the printer name of the printer. It is also possible to provide a reason using `-r` switch.

```
$ cupsdisable Apple-Dot-Matrix -r "need more paper"
$ lpc status
Apple-Dot-Matrix:
    printer is on device 'ipp' speed -1
    queuing is enabled
    printing is disabled
    2 entries
    daemon present
```

