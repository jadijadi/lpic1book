Title: 107.3 Localisation and internationalisation
Date: 2010-12-03 10:20
Category: LPIC1
Tags: LPIC1, 102, LPIC1-102-500
Authors: Jadi
sortorder: 350
Summary: 


_Weight: 3_

Candidates should be able to localise a system in a different language than English. As well, an understanding of why LANG=C is useful when scripting.

### Key Knowledge Areas

* Configure locale settings and environment variables.
* Configure timezone settings and environment variables.

### Terms and Utilities

* /etc/timezone
* /etc/localtime
* /usr/share/zoneinfo/
* LC_*
* LC_ALL
* LANG
* TZ
* /usr/bin/locale
* tzselect
* timedatectl
* date
* iconv
* UTF-8
* ISO-8859
* ASCII
* Unicode

<iframe width="560" height="315" src="https://www.youtube.com/embed/kqoipsM7AMA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

### timezone
The earth is large and round so we have different timezones and different languages! There are even talks about a time zone for Mars and if we encounter aliens, they might also have their own languages. 

This makes a few problems:
1. we may prefer our local language for our Linux
2. we need to tell linux about our timezone
3. programs may ask linux about our preferences on languages, keyboard configuration, and ..
4. and even if you do not case about yourself, your machines needs your timezone to be able to run tasks on needed times 

In this section I will show you the answers Linux has to overcome these issues. But lets start simple.

On linux systems you can use `date` and `cal` commands to check the date and the calendar. It is possible to print a custom date using `+` formatter:

```
[jadi@fedora ~]$ date
Fri Jun  2 02:07:35 PM EDT 2023
[jadi@fedora ~]$ date +'%Y%m%d-%M'
20230602-08
[jadi@fedora ~]$ date +'%Y%m%d-%H%M'
20230602-1408
```

to get more info you can try `timedatectl`:

```
[root@fedora ~]# timedatectl
               Local time: Fri 2023-06-02 14:23:34 EDT
           Universal time: Fri 2023-06-02 18:23:34 UTC
                 RTC time: Sat 2023-06-03 02:37:51
                Time zone: America/New_York (EDT, -0400)
System clock synchronized: no
              NTP service: active
          RTC in local TZ: no
```

Timezone determines what is your time difference comparing with a reference timezone. This way you can talk about times regardless of your location. In another words, I can tell you "start the change request at 02:30 UTC" and we both know when the change will be started in our own timezone \(mine will be 1 hour ahead so I'll start at 3:30 my time\).

Most distributions will ask you about your time zone during the installation. You can change this later, either by a GUI in the system settings or using a text based user interface (TUI) like the older `tzconfig` or a newer `tzselect`.

```
[jadi@fedora ~]$ tzselect
Please identify a location so that time zone rules can be set correctly.
Please select a continent, ocean, "coord", or "TZ".
1) Africa							     7) Europe
2) Americas							     8) Indian Ocean
3) Antarctica							     9) Pacific Ocean
4) Asia								    10) coord - I want to use geographical coordinates.
5) Atlantic Ocean						    11) TZ - I want to specify the timezone using the Posix TZ format.
6) Australia
#? 5
Please select a country whose clocks agree with yours.
1) Bermuda				       4) Faroe Islands				      7) Spain
2) Cape Verde				       5) Portugal
3) Falkland Islands			       6) South Georgia & the South Sandwich Islands
#? 1

The following information has been given:

	Bermuda

Therefore TZ='Atlantic/Bermuda' will be used.
Selected time is now:	Fri Jun  2 15:15:06 ADT 2023.
Universal Time is now:	Fri Jun  2 18:15:06 UTC 2023.
Is the above information OK?
1) Yes
2) No
#? 1

You can make this change permanent for yourself by appending the line
	TZ='Atlantic/Bermuda'; export TZ
to the file '.profile' in your home directory; then log out and log in again.

Here is that TZ value again, this time on standard output so that you
can use the /usr/bin/tzselect command in shell scripts:
Atlantic/Bermuda
```

When finished this program will suggest you to set a variable called `TZ` as follow to set _your own_ time zone, but not the systems:

```text
TZ='Atlantic/Bermuda'; export TZ
```

or use it once to check time in a specific city:

```
$ env TZ='Asia/Tokyo' date
Sat Jun  3 03:25:40 AM JST 2023
```

### Configuring timezone

The `/usr/share/zoneinfo/` directory contains all the timezone info. These are binary files. If you need to change your system-wide timezone you need to short link the `/etc/localtime` to one of these files:

```
# ls -ltrh /etc/localtime
lrwxrwxrwx. 1 root root 38 Apr 26 09:41 /etc/localtime -> ../usr/share/zoneinfo/America/New_York
```

This file should be replaced by the correct file from `/usr/share/zoneinfo/`. It is nicer to make a symbolic link rather than copying the actual file. This will prevent the issues during next upgrades.

### Configuring Languages

To check the status of current selected system language, use the `locale` command:

```
[root@fedora ~]# locale
LANG=en_US.UTF-8
LC_CTYPE="en_US.UTF-8"
LC_NUMERIC="en_US.UTF-8"
LC_TIME="en_US.UTF-8"
LC_COLLATE="en_US.UTF-8"
LC_MONETARY="en_US.UTF-8"
LC_MESSAGES="en_US.UTF-8"
LC_PAPER="en_US.UTF-8"
LC_NAME="en_US.UTF-8"
LC_ADDRESS="en_US.UTF-8"
LC_TELEPHONE="en_US.UTF-8"
LC_MEASUREMENT="en_US.UTF-8"
LC_IDENTIFICATION="en_US.UTF-8"
LC_ALL=
```

These are environment variables telling system what languages to use. Here I'm using `LANG=en_US.UTF-8` which means I'm using English with US variant and UTF-8 encoding.

> UTF-8 and other encodings will be discussed a bit later in this chapter

Other variables you see above, tell the system how to show different things based on localisation systems. For example if we change the LC\_TIME to "en\_GB.UTF-8" the time will be printed in Great Britain format.

Another important settings is `LC_ALL`. It can be used to change **ALL** settings. If you do a `export LC_ALL=fa_IR.UTF-8`, all the settings will be set to that one, with no exception. It is always possible to `unset LC_ALL`.

#### LANG=C

The `LANG=C` settings is used in many programs and scripts to make sure that the system will create coherent and predictable results in all environments. For example to make sure that the sort order will be in Binary order and all language settings will be default (en.US).

#### changing or adding locales

This is not a part of LPIC exam but it is good to know that on a debian based machine, you can change, add or set your default _locales_ using `dpkg-reconfigure locales`.

There is also this file:

```
[root@fedora ~]# cat /etc/locale.conf
LANG="en_US.UTF-8"
```

and you can also add your desired `LANG` config to your `~/.bash_profile` or `~/.profile`.

> on `systemd` use `localectl` to check locale or use `localectl set-locale LANG=en_US.UTF-8` to set it.

### Character Encoding

#### ACSII

Computers used to work with 7bit characters encoding. That would give us 128 characters which was enough for numbers, punctuation and digits!

#### ISO-8859

It had more characters and a lots of sets for Thai, Arabic and other languages but still had ASCII character sets.

#### UTF-8

The `Unicode Transformation Format` is the newest encoding method. It is a real universal encoding with characters not only for all written languages but also for fun characters like ¾, ♠, π and ⚤. It is backward compatible with the ASCII and uses 8 bit code units \(**not 8 bit coding!**\). In most cases it is a good idea to use UTF-8 and be sure that your system will work in practically all cases.


### iconv

If you needed to convert coding to each other, the command is `iconv`. The `-l` switch will show you all the available codings:

```text
iconv -f WINDOWS-1258 -t UTF-8 /tmp/myfile.txt
```

> Note: -f is for "from" and -t is for "to". Easy to remember

In 2023 you will seldom need this command but it is a must to know it, specially if you are living in a non US country!

