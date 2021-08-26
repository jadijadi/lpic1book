Title: 103.1 Work on the command line
Date: 2010-12-03 10:20
Category: LPIC1-101
Tags: LPIC1, 101, LPIC1-101-500
Authors: Jadi
Summary: Candidates should be able to interact with shells and commands using the command line. The objective assumes the Bash shell.

_Weight: 4_

Description: Candidates should be able to interact with shells and commands using the command line. The objective assumes the bash shell.

### Objectives

* Use single shell commands and one line command sequences to perform basic tasks on command line.
* Use and modify the shell environment including defining, referencing and exporting environment variables.
* Use and edit command history.
* Invoke commands inside and outside the defined path.
* . and ..
* bash
* echo
* env
* exec
* export
* pwd
* set
* unset
* man
* uname
* history

#### Bash

As any other thing Linux, you can choose your shell too \(by shell I mean the command line interface\). **Bash** in the most common one.

Some commands are build in \(cd, break, exec\) and it uses streams:

* **stdin** is the standard input stream, which provides input to commands.
* **stdout** is the standard output stream, which displays output from commands.
* **stderr** is the standard error stream, which displays error output from commands.

User Prompts are like these:

```text
jadi@funlife:~$
[jadi@funlife lpic1]$
$
```

> in most cases, root users prompt uses \# instead of $ \(say: `root@funlife:/etc#`\).

Global bash configs are stored at /etc/profile and each user has her own config at ~/.profile & ~/.bash\_profile & ~/.bash\_logout

#### Commands and sequences

Most commands have a _command name_ and some _parameters_. A simple one is the ```echo`` command:

```text
$ echo

$ echo Hello lpic
Hello lpic
$ echo Hello lpic #just a simple hi
Hello lpic
```

> Note: the \# is for _comments_. Anything after it is comment.

**escaped characters**

Some special characters need special case in programming and linux world. Say you want to go to the new line during an echo command.

```text
jadi@funlife:~$ echo -e "hello\nthere"
hello
there
```

| Escape sequence    Function |  |
| :--- | :--- |
| \a | Alert \(bell\) |
| \b | Backspace |
| \c | Suppress trailing newline \(same function as -n option\) |
| \f | Form feed \(clear the screen on a video display\) |
| \n | New line |
| \r | Carriage return |
| \t | Horizontal tab |

> Note: you can use  to break a command in many lines:
>
> ```text
> $ echo but this \
> is another \
> usage
> but this is another usage
> ```

**metacharacters and Control operators**

Also there are characters with special meaning. You need to escape then if you need them in your commands: **\| & ; \( \) &lt; &gt;\***

There is also control operators. They also have special meanings:  **\|\| && & ; ;; \| \( \)**

The most important ones are ; \(do one by one\), && \(logical and\) and \|\| \(logical or\).

```text
$ echo line 1;echo line 2; echo line 3
line 1
line 2
line 3

$ echo line 1&&echo line 2&&echo line 3
line 1
line 2
line 3

$ echo line 1||echo line 2; echo line 3
line 1
line 3
```

### exiting shell

the `exit` command exits the shell. Same as ctrl+d.

if you run a command inside parentheses that command will be run inside a sub-shell.

and `exec` will run a command and closes the current shell.

### Environment variables

Concept of EV.

Every variable has name and a value. echo the name with a $ in front of it.

Some common ones are:

| Name | Function |
| :--- | :--- |
| USER | The name of the logged-in user |
| UID | The numeric user id of the logged-in user |
| HOME | The user's home directory |
| PWD | The current working directory |
| SHELL | The name of the shell |
| $ | The process id \(or PIDof the running bash shell \(or other\) process |
| PPID | The process id of the process that started this process \(that is, the id of the parent process\) |
| ? | The exit code of the last command |

```text
$ echo $USER $UID
jadi 1000
$SHELL $HOME $PWD
/bin/bash /home/jadi /home/jadi/lpic
$ (exit 0);echo $?;(exit 4);echo $?
0
4
$ echo $$ $PPID
2559 2558
```

And this is the way to define a EV:

```text
jadi@funlife:~$ MYMOOD=happy
jadi@funlife:~$ echo I am $MYMOOD
I am happy
```

if we `export` a variable, it will be available for other programs starting from that shell.

> Note: sometimes you may need to use { and } to describe a variable:
>
> ```text
> $ echo "-$HOME/abc-"
> -/home/jadi/abc-
> $ echo "-$HOME_abc-"
> --
> $ echo "-${HOME}_abc-"
> -/home/jadi_abc-
> ```
>
> #### env, set, unset
>
> the `env` shows current EVs. It can also be used to run a command in a specific environment.

set is a bit more complicated. it can configure how your bash behaves. unset, unsets a variable.

```text
$ echo $-
himBH
$ echo $VAR1

$ set -u;echo $-
himuBH
$ echo $VAR1
-bash: VAR1: unbound variable
$ VAR1=v1;echo $VAR1
v1
$ unset VAR1;echo $VAR1
-bash: VAR1: unbound variable
```

> Note: if you use `set` with no parameter, it shows the EVs.

### uname

gives you data about the system. Common switches are:

| Option | Description |
| :--- | :--- |
| -s | Print the kernel name. This is the default if no option is specified. |
| -n | Print the nodename or hostname. |
| -r | Print the release of the kernel. This option is often used with module-handling commands. |
| -v | Print the version of the kernel. |
| -m | Print the machine's hardware \(CPU\) name. |
| -o | Print the operating system name. |
| -a | Print all of the above information. |

```text
$ uname -a
Linux funlife 3.16.0-28-generic #38-Ubuntu SMP Fri Dec 12 17:37:40 UTC 2014 x86_64 x86_64 x86_64 GNU/Linux
```

### history

The bash, saves the commands you issue in a file defined in **HISTFILE** ev. the `history` shows the full command history \(500 commands normally but can be changes in HISTSIZE\).

There are also some shortcuts:

* `history 20` shows last 20 commands
* `!!` last command
* `!string` most recent command that starts with string
* `!?string?` most recent command that contains string

when you logout, all these are saved in .bash\_history

### Paths

External commands are just files on disks. So where does bash knows where to find commands?

```text
jadi@funlife:~$ echo $PATH
/home/jadi/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games
```

and this gives me some more data:

```text
jadi@funlife:~$ which tar
/bin/tar
jadi@funlife:~$ type tar
tar is /bin/tar
jadi@funlife:~$ whereis tar
tar: /usr/lib/tar /bin/tar /usr/include/tar.h /usr/share/man/man1/tar.1.gz
```

**running other commands**

* It is possible to add to my path
* give the full path
* give the relative path \(. & ..\)

### cd & pwd

````cd``` will change directories (including .. and .) and````pwd\`\`\`\` tells where you are at the moment.

### man pages

the best linux help you can find.-

```text
$ man ping
PING(8)                                                            System Manager's Manual: iputils                                                           PING(8)

NAME
       ping, ping6 - send ICMP ECHO_REQUEST to network hosts

SYNOPSIS
       ping  [-aAbBdDfhLnOqrRUvV]  [-c  count] [-F flowlabel] [-i interval] [-I interface] [-l preload] [-m mark] [-M pmtudisc_option] [-N nodeinfo_option] [-w dead‐
       line] [-W timeout] [-p pattern] [-Q tos] [-s packetsize] [-S sndbuf] [-t ttl] [-T timestamp option] [hop ...] destination

DESCRIPTION
       ping uses the ICMP protocol's mandatory ECHO_REQUEST datagram to elicit an ICMP ECHO_RESPONSE from a host or gateway.  ECHO_REQUEST datagrams (``pings'') have
       an IP and ICMP header, followed by a struct timeval and then an arbitrary number of ``pad'' bytes used to fill out the packet.

       ping6  is  IPv6  version of ping, and can also send Node Information Queries (RFC4620).  Intermediate hops may not be allowed, because IPv6 source routing was
       deprecated (RFC5095).

OPTIONS
       -a     Audible ping.

       -A     Adaptive ping. Interpacket interval adapts to round-trip time, so that effectively not more than one (or more, if preload is set) unanswered  probe  is
              present in the network. Minimal interval is 200msec for not super-user.  On networks with low rtt this mode is essentially equivalent to flood mode.

       -b     Allow pinging a broadcast address.

       -B     Do not allow ping to change source address of probes.  The address is bound to one selected when ping starts.

       -c count
              Stop after sending count ECHO_REQUEST packets. With deadline option, ping waits for count ECHO_REPLY packets, until the timeout expires.
...
```

As you can see, on top:

* Name of the command and section
* name and related commands in this section
* options and formats
* short description
* detailed info

and at the end bug reporting, files, related commands and authors.

There are 9 man sections:

1. User commands \(env, ls, echo, mkdir, tty\)
2. System calls or kernel functions \(link, sethostname, mkdir\)
3. Library routines \(acosh, asctime, btree, locale, XML::Parser\)
4. Device related information \(isdn\_audio, mouse, tty, zero\)
5. File format descriptions \(keymaps, motd, wvdial.conf\)
6. Games \(note that many games are now graphical and have graphical help outside the man page system\)
7. Miscellaneous \(arp, boot, regex, unix utf8\)
8. System administration \(debugfs, fdisk, fsck, mount, renice, rpm\)
9. kernel utils

of course there can be more and one command can be in different places.

If you are searching, do:

```text
jadi@funlife:~$ man -f ls
ls (1)               - list directory contents
jadi@funlife:~$ man -w ls
/usr/share/man/man1/ls.1.gz
jadi@funlife:~$ man -k ls | head
SSL (3ssl)           - OpenSSL SSL/TLS library
_llseek (2)          - reposition read/write file offset
aconnect (1)         - ALSA sequencer connection manager
add-shell (8)        - add shells to the list of valid login shells
afs_syscall (2)      - unimplemented system calls
alsactl (1)          - advanced controls for ALSA soundcard driver
alsactl_init (7)     - alsa control management - initialization
alsaloop (1)         - command-line PCM loopback
alsamixer (1)        - soundcard mixer for ALSA soundcard driver, with ncurses interface
amidi (1)            - read from and write to ALSA RawMIDI ports
...
```

Or use the `apropos` command which searches man pages:

```text
$ apropos route
ip-mroute (8)        - multicast routing cache management
ip-route (8)         - routing table management
route (8)            - show / manipulate the IP routing table
routef (8)           - flush routes
routel (8)           - list routes with pretty output format
sensible-mda (8)     - a generic local MDA router for Debian systems
tor (1)              - The second-generation onion router
torrc (5)            - The second-generation onion router
traceroute6 (8)      - traces path to a network host
traceroute6.iputils (8) - traces path to a network host
```

> Note: A linux master will read as many `man pages` she can! Start with `man man`

.

.

.

.

.

.

.

.

..

.

.

.

.

.

.

.

.

