Title: 105.1 Customize and use the shell environment
Date: 2010-12-03 10:20
Category: LPIC1
Tags: LPIC1, 101, LPIC1-101-500
Authors: Jadi
sortorder: 270
Summary: 
Topic: Shells and Shell Scripting
## 105.1. Customize and use the shell environment

<div class="alert alert-danger" role="alert">
  This chapter is still a Work In Progress. Do not rely on it for LPIC version 500 exam. Will be updated in a few weeks.
</div>


_Weight: 4_

Candidates should be able to customize shell environments to meet users’ needs. Candidates should be able to modify global and user profiles.

### Key Knowledge Areas

* Set environment variables \(e.g. PATH\) at login or when spawning a new shell
* Write Bash functions for frequently used sequences of commands
* Maintain skeleton directories for new user accounts

  Set command search path with the proper directory

### Terms

* .
* source
* /etc/bash.bashrc
* /etc/profile
* env
* export
* set
* unset
* ~/.bash\_profile
* ~/.bash\_login
* ~/.profile
* ~/.bashrc
* ~/.bash\_logout
* function
* alias
* lists

### Environment variables

This is discussed in the past. But how we should set them when we login or change shell. Oh! And what happen when we are not logged in? ;\)

### login vs non-login shell

Sometimes you _login_ into the shell, say after a ssh but sometimes you just _open_ a shell; say in GUI.

#### login shell

This happens when you give your user and pass to enter a shell. Many steps are involved to setup your variables and settings. These are the steps:

1- /etc/profile is run

2- A line in /etc/profile runs whatever is in /etc/profile.d/\*

Now the global profile is loaded and system will go for user specific profiles:

3- /home/USERNAME/.bash\_profile

4- /home/USERNAME/.bash\_login

5- /home/USERNAME/.profile

> Note that only one of the 3, 4 & 5 will be run. The system will go for .bash\_profile and IF IT IS NOT THERE will try for .bash\_login and IF IT IS NOT THERE will try to run .profile. If any of these exists, the system wont look any furthur. So if you have only 4 & 5, only the 4 will be run.

At the end, the system loads:

1. /home/USERNAME/.bashrc

which is users information \(like aliases\).

> Note: /etc/profile also loads /etc/bashrc or /etc/bash.bashrc

#### Interactive \(non-login\) shell

if you run a shell in an interactive mode \(non-login\) shell say from a GUI, only two things will be run:

1. /etc/bash.bashrc \(or in some systems /etc/bashrc\)
2. /home/USERNAME/.bashrc

### adding global configs for login shell

you can add your global new config files int /etc/profile.d/ \(with .sh at the end\). It is cleaner and better than editing the /etc/profile because an update can overwrite your changes if you do so.

### adding global configs for interactive/non-login shell

you can use /etc/bash.bashrc file \(some systems /etc/bashrc\). This is good for _aliases_ and other global configs.

### user specific configs

Most of the time PATH and env vars go into the in ~/.bash\_profile and aliases go into the ~/.bashrc. Have a look at them!

### Aliases

Most of the time they are defined in `~/.bashrc` and look like this:

```text
alias ll='ls -alF'
alias la='ls -A'
alias l='ls -CF'
```

It is kind of a shortcut.

### /etc/skel

This directory contains files which will be used as a starting template for each new user.

### .bash\_logout

runs when you logout from a login shell. In many distros it only clears the screen so the next person will not be able to watch what you were doing before you logout.

### . \(and source\)

Yes only a dot! This is a shortcut for the bash source command. You can find it in files like /etc/profile. It runs the executable in front of it as part of the current environment.

> Note: If you just execute a file \(without source or dot\) bash creates a child, runs the executable there and then closes it.

### functions

Like "real" programming languages, Bash has functions, though in a somewhat limited implementation. A function is a subroutine, a code block that implements a set of operations, a "black box" that performs a specified task. Wherever there is repetitive code, when a task repeats with only slight variations in procedure, then consider using a function.

```text
funnyls () {
    ls -ltrh
    echo "This is a funny ls"
}
```

### set

`set` allows you to change the values of shell options and set the positional parameters, or to display the names and values of shell variables.

Using `set` we can configure how bash works. These are some samples:

| switch | result |
| :--- | :--- |
| -b | Cause the status of terminated background jobs to be reported immediately, rather than before printing the next primary prompt. |
| -e | return in case a pipline, command, ... return non-zero |
| -n | Read commands but do not execute them; this may be used to check a script for syntax errors. This option is ignored by interactive shells. |
| -t | Exit after reading and executing one command. |
| -C | Prevent output redirection using ‘&gt;’, ‘&gt;&’, and ‘&lt;&gt;’ from overwriting existing files. |

### export

Set an environment variable. Mark each name to be passed to child processes in the environment.

```text
$ export name=jadi
$ echo $name
jadi
```

> Note: when exporting, the variable will exists in child processes \(commands you run from the current shell\). If you only say `name=jadi` and run a new command in your shell, the name **wont be** jadi in **that** shell.

```text
$ name=jadi
$ echo $name
jadi
$ bash
$ echo $name

$ exit
exit
$ echo $name
jadi
$ export name=jadi
$ bash
$ echo $name
jadi
```

### unset

This command _has nothing to do_ with `set` command! This can unset the defined variables or functions.

```text
$ name=jadi
$ echo $name
jadi
$ unset name
$ echo $name
```

You can also unset functions.

### env

can set, remove or display variables or even run a command in a modified environment.

```text
Syntax
     env [OPTION]... [NAME=VALUE]... [COMMAND [ARGS]...]

Options

  -u NAME
  --unset=NAME
       Remove variable NAME from the environment, if it was in the
       environment.

  -
  -i
  --ignore-environment
       Start with an empty environment, ignoring the inherited
       environment.
```

### lists

Bash even has arrays! We will see them later when scripting but you can do things like:

```text
$ list=(salam donya man injam)
$ echo ${list[1]}
donya
$ list=("salam donya" "man injam")
$ echo ${list[1]}
man injam
```

Please pay attention to the syntax.

