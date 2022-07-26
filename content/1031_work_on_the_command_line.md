Title: 103.1 Work on the command line
Date: 2010-12-03 10:20
Category: LPIC1
Tags: LPIC1, 101, LPIC1-101-500
Authors: Jadi
Summary: Candidates should be able to interact with shells and commands using the command line. The objective assumes the Bash shell.
sortorder: 120

_Weight: 4_

Description: Candidates should be able to interact with shells and commands using the command line. The objective assumes the Bash shell.

## Objectives

* Use single shell commands and one-line command sequences to perform basic tasks on the command line.
* Use and modify the shell environment including defining, referencing and exporting environment variables.
* Use and edit command history.
* Invoke commands inside and outside the defined path.

## Terms
* bash
* echo
* env
* export
* pwd
* set
* unset
* type
* which
* man
* uname
* history
* `.bash_history`
* Quoting

### Shells and Bash

<iframe width="560" height="315" src="https://www.youtube.com/embed/X-zq9-FhjOA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

You issue your commands in a shell; it's your command line interface and you have various options for it. To reach your shell you should login into the system in the text mode or run one of the various *Terminal Emulators* in your GUI. Some samples are `gnome-terminal`, `konsole`, `xterm`, etc.

After running the Terminal Emulator or logging into the text mode, you are in the shell and you can issue commands. Although `bash` (GNU Bourne Again shell) is the most common one, you might use `zsh`, `dash`, `ksh`, `csh` and others.

You can check where your general `sh` command links to via

```
$ readlink /bin/sh
```

Or check your `$SHELL` variable using:

```
echo $SHELL
```

Your bash has some _internal_ commands that it understands without any external dependency (say `cd`, `break`, `exec`, ...) but if it does not understand something internally, it will try to run it as an external executable.

You can use the `type` command to determine this:

```
[jadi@fedora ~]$ type cd
cd is a shell builtin
[jadi@fedora ~]$ type ls
ls is aliased to `ls --color=auto'
[jadi@fedora ~]$ type ping
ping is /usr/bin/ping
```

## cd, pwd & uname
### cd
You've already seen lots of `cd` commands :) it *changes directory*, including `.` (current directory) and `..` (parent directory). 

You can point to directories in two ways:

1. **Absolute Paths**: Like `/home/jadi/lpic1/lesson3.1`
2. **Relative Paths**: Like `lpic1/lesson3.1`. In this case we are not adding the `/` in the beginning so the bash will try to to find `lpic1` directory where we are (local / relative)

> The `~` characters means *home directory of the user issuing the command*

It is also possible to issue the `cd` without any parameters. It will move you to your home directory. So these 3 commands are all equal:

```
cd
cd ~
cd $HOME
```

### pwd
Will show you your current directory:

```
[jadi@fedora lesson3.1]$ pwd
/home/jadi/lpic1/lesson3.1
```

### uname
Gives you data about the system. Common switches are:

| Option | Description |
| :--- | :--- |
| -s | Print the kernel name. This is the default if no option is specified. |
| -n | Print the nodename or hostname. |
| -r | Print the release of the kernel. This option is often used with module-handling commands. |
| -v | Print the version of the kernel. |
| -m | Print the machine's hardware \(CPU\) name. |
| -o | Print the operating system name. |
| -a | Print all of the above information. |

Example:

```text
[jadi@fedora lesson3.1]$ uname -a
Linux fedora 5.14.0-60.fc35.aarch64 #1 SMP Mon Aug 30 16:30:42 UTC 2021 aarch64 aarch64 aarch64 GNU/Linux
```


## Getting Help
Most of the commands we use do have a cool and complete manual, accessible via the `man` command. It uses the `less` pager by default and contains the documentations, switches, parameters, ... of commands and utilities. 

Make yourself familiar with the man by reading the manual of the `yes` command:

```
$ man yes
```

Please note that man pages are categorized in different sections (books). You can check these by reading the man's manual:

```
$ man man
$ man 5 passwd
```

`


## Special characters and Quoting/Escaping
In the computer world, some characters do have special meanings. For example in bash, the `*` character will expand to all files. In these cases, if you want to use this character without this expansion, you have to *Quote* it or *Escape* it. In many cases this is done via adding a `\` character before it:

```
$ echo 2 \* 3 = 6
2 * 3 = 6
```

These are the character with special meaning that you need to quote if you are using them in your commands:

`* ?[]'"\$;&()|^<>`

Please note that there is a space character in the character list above.

> As you can see, the `\` has an specific meaning so if you want to use the back-slash itself (without its escaping usage), you have to *quote* your back-slash with another back-slash `\\`.

In addition to escaping, you can use `\` to create some special characters. For example, as you can not type a *return* character, you create it via `\n` (new line):

```text
jadi@funlife:~$ echo -e "hello\nthere"
hello
there
```

Some other cases are:

| Escape sequence    Function |  |
| :--- | :--- |
| \a | Alert \(bell\) |
| \b | Backspace |
| \c | Suppress trailing newline \(same function as -n option\) |
| \f | Form feed \(clear the screen on a video display\) |
| \n | New line |
| \r | Carriage return |
| \t | Horizontal tab |

On bash you can use `\` to break a command into more lines:

```
$ echo You know slashes! But this \
is another \
usage
You know slashes! But this is another usage
```



## Shell environment variables

<iframe width="560" height="315" src="https://www.youtube.com/embed/KMvc1SyPgjw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

*Environment Variables* contain some configs and information about the shell. For example, your default editor is set in the `EDITOR` variable. You can query the value of a shell variable like this:

```
[jadi@fedora ~]$ echo $EDITOR
/usr/bin/nano
```

It is possible to check all the env variables using the `set` or `env` command. 

These are some of the most used bash environment variables:


| Name | Function |
| :--- | :--- |
| USER | The name of the logged-in user |
| PATH | List of directories to search for commands, colon separated |
| EDITOR | Default editor |
| HISTFILE | Where bash should save its history (normally `.bash_history`) |
| HOSTNAME | System hostname |
| PS1 | The Prompt! Play with it |
| UID | The numeric user id of the logged-in user |
| HOME | The user's home directory |
| PWD | The current working directory |
| SHELL | The name of the shell |
| $ | The process id \(or PID of the running bash shell \(or other\) process |
| PPID | The process id of the process that started this process \(that is, the id of the parent process\) |
| ? | The exit code of the last command |

When trying to access the value, you should add a `$` to the beginning of the variable name.

```text
$ echo $USER $UID
jadi 1000
$ echo $SHELL $HOME $PWD
/bin/bash /home/jadi /home/jadi/lpic
```

To define a new EV (Environment Variable) or change or delete one, we can do:

```text
$ MYMOOD=happy
$ echo I am $MYMOOD
I am happy
$ MYMOOD="Even Happier" # space has a specific meaning
$ unset MM
```

If you want new programs starting from this shell to have access to the variable you defined, you have to set them with `export` or export them later.

```
$ export MYMOOD
$ export YOURMOOD="Not Confused"
```

> Global bash configs are stored at `/etc/profile` and each user has her own config at `~/.profile` & `~/.bash\_profile` & `~/.bash\_logout`. If you need a permanent change, add your configs to these.

## Path
When you issue a command, bash will run if it's an internal bash command. Otherwise, bash will go and check the `PATH` variables one by one and will try to find it there. If not, it will give you an error. If you want to run something on a specific path, you have to exclusively describe the location:

```text
$ echo $PATH
/home/jadi/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games
```

But what happens if I try to run `tar`? Let's check with `which`, `type` and `whereis` commands:

```
jadi@funlife:~$ which tar
/bin/tar
jadi@funlife:~$ type tar
tar is /bin/tar
jadi@funlife:~$ whereis tar
tar: /usr/lib/tar /bin/tar /usr/include/tar.h /usr/share/man/man1/tar.1.gz
```

A cooler example is `ping` on Fedora:

```
[jadi@fedora ~]$ whereis ping
ping: /usr/bin/ping /usr/sbin/ping /usr/share/man/man8/ping.8.gz
[jadi@fedora ~]$ which ping
/usr/bin/ping
[jadi@fedora ~]$ /usr/sbin/ping 4.2.2.4
PING 4.2.2.4 (4.2.2.4) 56(84) bytes of data.
64 bytes from 4.2.2.4: icmp_seq=1 ttl=50 time=160 ms
```

> Thats why when you want to say "run this_program in this directory" you issue "./this_program". You are exclusively telling bash where the file is. In Linux, the current directory (.) is not part of the PATH by default.


## Command history
Bash saves its history in `~/.bash_history`. You can `cat` it and see its contents or run the `history` command. You can also use the below keys (combinations) to access your previous commands:

| Key (Combination) | Usage |
|-|-|
| Up and Down Arrow | Move in the history |
| Ctrl+R | Backward Search |
| Ctrl+O | Run the command you found with Ctrl+R |
| !! | Run the last command |
| !10 | Run command number 10 |
| !text | search backwards for text, and run the first found command |

> If you want to clear your history, issue `HISTSIZE=0

## Exiting the Shell

The `exit` command exits the shell. Same as CTRL+d.

If you run a command inside parentheses that command will be run inside a sub-shell and `exec` will run a command and closes the current shell.
