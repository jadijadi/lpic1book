Title: 108.3 Mail Transfer Agent (MTA) basics
Date: 2010-12-03 10:20
Category: LPIC1
Tags: LPIC1, 101, LPIC1-101-500
Authors: Jadi
sortorder: 380
Summary: 
## 108.3 Mail Transfer Agent \(MTA\) basics

_Weight: 3_

Candidates should be aware of the commonly available MTA programs and be able to perform basic forward and alias configuration on a client host. Other configuration files are not covered.

### Key Knowledge Areas

* Create e-mail aliases.
* Configure e-mail forwarding.
* Knowledge of commonly available MTA programs \(postfix, sendmail, qmail, exim\) \(no configuration\)

### Terms and Utilities

* ~/.forward
* sendmail emulation layer commands
* newaliases
* mail
* mailq
* postfix
* sendmail
* exim
* qmail

### MTAs

Mai Transfer Agents or MTAs are programs which handle emails in your operating system. There are lot of MTAs available and each distro or sysadmin uses the one she likes more.

#### sendmail

Is one of the oldest options available. It is big and difficult to configure and keep safe and secure so very few systems use it as default MTA.

#### qmail

qmail is an attempt to provide an ultra secure MTA while keeping the MTA compatible with sendmail ideas. It is modular and claims to be free of any security bug. It also claim to be the 2nd popular mail agent on the Internet.

> qmail is not a GPL software. It is Public Domain.

#### exim

It aims to be a general and flexible mailer with extensive facilities for checking incoming e-mail. It is feature rich with ACLs, authentication, ...

#### postfix

This is a new alternative to sendmail and uses easy to understand configuration files. It supports multiple domains, encryption, etc. Postfix is what you may find on most distros as default.

### sendmail emulation layer

As I already said, `sendmail` is the oldest MTA which is still active. Other MTAs respect his age and provide a _sendmail emulation layer_ to keep themselves backward compatible with it. In other words you can type `sendmail` or `mailq` on your command line regardless of what MTA you've installed.

### aliases

There are some mail aliases on the system. Defined in `/etc/aliases`.

```text
$ cat /etc/aliases
# /etc/aliases
mailer-daemon: postmaster
postmaster: root
nobody: root
hostmaster: root
usenet: root    # <--- I'm using this sample
news: root
webmaster: root
www: root
ftp: root
abuse: root
noc: root
security: root
root: jadi
```

This tells the system if there is a message for 'usenet' it will sent to the `root` user. Note that in the last line, `jadi` is reading the `root` emails. This line lets me read emails sent to root without needing to login with root.

> when this file is update, the `newaliases` should be run!

```text
root@funlife:~# newaliases
root@funlife:~#
```

### sending mail

It is possible to send an email from the command line using the `mail` command:

```text
[jadi@funlife ~]$ mail news
Subject: Email to news user
hahah.. we know where this will go.
this will go to root and then to jadi!

Hi Jadi!

Cc:
[jadi@funlife ~]$ mail
Mail version 8.1.2 01/15/2001.  Type ? for help.
"/var/mail/jadi": 12 messages 12 new
>N  1 root@funlife       Sat Jan 02 08:50   39/1373  apt-listchanges: news for f
 N  2 root@funlife       Sat Jan 02 09:01  165/7438  apt-listchanges: news for f
 N  3 jadi@funlife       Sat Jan 02 19:58   18/640   *** SECURITY information fo
 N  4 jadi@funlife       Sat Jan 02 20:04   18/631   *** SECURITY information fo
 N  5 jadi@funlife       Sun Jan 03 10:15   18/664   *** SECURITY information fo
 N  6 root@funlife       Mon Jan 04 12:42   27/941   Cron <jadi@funlife> /home/j
 N  7 root@funlife       Mon Jan 04 17:11   26/845   apt-listchanges: news for f
 N  8 root@funlife       Tue Jan 05 18:42   27/945   Cron <jadi@funlife> /home/j
 N  9 root@funlife       Wed Jan 06 09:17   46/1788  apt-listchanges: news for f
 N 10 root@funlife       Thu Jan 07 12:42   27/945   Cron <jadi@funlife> /home/j
 N 11 root@funlife       Thu Jan 07 18:42   27/943   Cron <jadi@funlife> /home/j
 N 12 jadi@funlife       Thu Jan  7 19:53   17/478   Email to news user
& 12
Message 12:
From jadi@funlife  Thu Jan  7 19:53:08 2016
X-Original-To: news
To: news@funlife
Subject: Email to news user
Date: Thu,  7 Jan 2016 19:53:08 +0330 (IRST)
From: jadi@funlife (jadi)

hahah.. we know where this will go.
this will go to root and then to jadi!

Hi Jadi!

& d
& q
Held 11 messages in /var/mail/jadi
```

### local forwards

We saw that it is possible to forward emails using the `/etc/aliases`. That file is not writable by normal users so what a normal user like _jadi_ should do?

Each user can create a `.forward` file in her own directory and all mail targeted to that user will be forwarded to that address.

> You can even put a complete email address like `jadijadi@gmail.com` in your `.forward` file.
>
> `mail` command is not part of LPIC102 but it is good if you play and learn it to some extent. It also can send email from within the scripts like 'echo -e "email content" \| mail -s "email subject" "example@example.com"'

### mailq

This command lists the mail queue. Each entry shows the queue file ID, message size, arrival time, sender, and the recipients that still need to be delivered. If mail could not be delivered upon the last attempt, the reason for failure is shown. The sysadmin can use this command to check the status of emails still in the queues.

```text
$ mailq
-Queue ID- --Size-- ----Arrival Time---- -Sender/Recipient-------
AA52C228E6B      468 Thu Jan  7 19:59:41  jadi@funlife
(connect to alt2.gmail-smtp-in.l.google.com[2404:6800:4003:c01::1a]:25: Network is unreachable)
                                         jadijadi@gmail.com

-- 0 Kbytes in 1 Request.
```

