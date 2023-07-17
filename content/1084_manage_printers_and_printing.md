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

CUPS stands for Common Unix Printing System and as you can see, it install many related packages and even suggests some more. This is because CUPS need lots of information about different printers and uses many tools to print. When installed, you need to start the service:

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

As any other linux program, CUPS saves its configuration at `/etc` directory.

```text
# ls /etc/cups
cups-browsed.conf  interfaces  raw.types  subscriptions.conf
cupsd.conf         ppd         snmp.conf  subscriptions.conf.O
cups-files.conf    raw.convs   ssl
```

One important file is `cupsd.conf`. Have a look at it; it is very easy to understand. For example the `Listen localhost:631` line tells the CUPS to listen on localhost port 631.

All the printer data is saved at `/etc/cups/printers.conf`. The web interface or any other GUI is actually editing this file.

```text
# Printer configuration file for CUPS v2.1.0
# Written by cupsd
# DO NOT EDIT THIS FILE WHEN CUPSD IS RUNNING
<DefaultPrinter Apple-Dot-Matrix>
UUID urn:uuid:0f6c2f2b-6338-388a-76de-09f2ef1994d5
Info Apple Dot Matrix
Location Fake Location
MakeModel Apple Dot Matrix Foomatic/appledmp (recommended)
DeviceURI ipp://fakeprinter/
State Idle
StateTime 1453402271
ConfigTime 1453402271
Type 8433668
Accepting Yes
Shared Yes
JobSheets none none
QuotaPeriod 0
PageLimit 0
KLimit 0
OpPolicy default
ErrorPolicy retry-job
</DefaultPrinter>
```

Another important configuration directory is located at `/etc/cups/ppd/`. This directory contains the PostScript printer Description (PPD) files. These let printers which use them to function properly. 


### CUPS web interface
To enable CUPS's web interface, you have to enable the following configuration in the `/etc/cups/cupsd.conf`:

```
WebInterface Yes
```

Then you will have access to the GUI via port **631**. So it will be enough to access the **localhost:631** or **127.0.0.1:631** (or the servers **IP** address on port **631**) from your browser.

![CUPS web interface on port 631](/images/cups_we_interface.png)

There are some of the important sections on the above page:

|Section|Usage|
|-------|-----|
| Administration |Adding printers, managing jobs and configuring the CUPS server |
| Jobs | Checking the active, pending & completed jobs |  
| Printers | List or search in the installed printers |

By default, system users can view printers and queued jobs but changes (like adding printers) will need more access. This is configured at the bottom part of `cupsd.conf` file. For example the below configuration provides `CUPS-Add-Modify-Printer CUPS-Delete-Printer CUPS-Add-Modify-Class CUPS-Delete-Class CUPS-Set-Defaul` access to anyone in `@printer_admin` group.

```
  <Limit CUPS-Add-Modify-Printer CUPS-Delete-Printer CUPS-Add-Modify-Class CUPS-Delete-Class CUPS-Set-Default>
    AuthType Default
    Require user @printer_admin
    Order deny,allow
  </Limit>
  ```

> CUPS has most of the common printer drivers installed. You just need to choose the printer from the dropdown menu to add it.


### legacy tools

Just like the MTA programs, CUPS support all the legacy command line programs too.

| command | usage |
| :--- | :--- |
| lpr | print a file |
| lpq | show print queue/jobs |
| lprm | rm/remove a file from priner queue |
| lpc | printer control / troubleshooting program |

#### `lpq`

The **q** is for **queue** therefor `lpq` shows the printer queue and is used when you want to see the jobs. If you use the `-a` switch, the lpq will show the jobs of **all** printers. Alternatively you can use the `-P` switch to show the jobs of a specific printer. So the following command will show the jobs of a printer called Apple-Dot-Matrix:

```text
# lpq -PApple-Dot-Matrix
Apple-Dot-Matrix is ready and printing
Rank    Owner   Job     File(s)                         Total Size
active  unknown 1       unknown                         7168 bytes
1st     unknown 2       unknown                         2048 bytes
```

> It is strange but there should not be ANY space between `-P` and the printers name

#### `lpr`

This command is used to send a job to a printer. Again the printer is specified by `-P`.

```text
$ lpr -PApple-Dot-Matrix for_print.txt
 lpq
Apple-Dot-Matrix is ready and printing
Rank    Owner   Job     File(s)                         Total Size
active  jadi    1       Untitled Document 1             7168 bytes
1st     jadi    2       Untitled1                       2048 bytes
2nd     jadi    3       for_print.txt                   1024 bytes
```

> If no printer is specified, the default printer will be used

#### `lprm`

The _rm_ is for _remove_ so the `lprm` will remove jobs from the queue. You need to provide the **Job ID** to this command.

```text
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

If you need to remove ALL the jobs of a specific printer, you can go with `-Pprinter_name -`. Yes! that is only one dash \(`-`\) after the printer name; that's why this is called a legacy command.

> the `lprm -` will remove all the print jobs

#### `lpc`

Here, the **c** is for **control**. `lpc` lets you check the status \(via `lpc status`\) and troubleshoot your printers.

```text
$ lpc status
Apple-Dot-Matrix:
    printer is on device 'ipp' speed -1
    queuing is enabled
    printing is enabled
    2 entries
    daemon present
```

Here,

* **queuing is enabled** tell us that the queue can accept new print jobs. If the queue is disabled, you can not even send new jobs to the printer.
* **printing is enabled** means that the printer is actually can print on the paper. This will be on the disable state if the printer is out of ink or paper or experiencing a paper jam.

If you are having problems with your printer or need to prevent it from accepting new jobs or let it accept jobs but not print, these four commands will let you achieve your needs:

| command | usage |
| :--- | :--- |
| cupsaccept | tells the printer queue to accept new jobs |
| cupsreject | tells the printer to reject any new job |
| cupsenable | enables the actual/physical printing of the jobs |
| cupsdisable | disables the physical printing of the jobs |

> In all cases you have to provide the printer name of the printer. it is also possible to provide a reason using `-r` switch.

```text
$ cupsdisable Apple-Dot-Matrix -r "need more paper"
$ lpc status
Apple-Dot-Matrix:
    printer is on device 'ipp' speed -1
    queuing is enabled
    printing is disabled
    2 entries
    daemon present
```

