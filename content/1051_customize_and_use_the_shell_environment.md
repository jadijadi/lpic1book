Title: 105.1 Customize and use the shell environment
Date: 2010-12-03 10:20
Category: LPIC1
Tags: LPIC1, 102, LPIC1-102-500
Authors: Jadi
sortorder: 270
Summary: 
Topic: Shells and Shell Scripting


_Weight: 4_

Candidates should be able to customize shell environments to meet users’ needs. Candidates should be able to modify global and user profiles.

### Key Knowledge Areas

* Set environment variables \(e.g. PATH\) at login or when spawning a new shell
* Write Bash functions for frequently used sequences of commands
* Maintain skeleton directories for new user accounts
*  Set command search path with the proper directory

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

<iframe width="560" height="315" src="https://www.youtube.com/embed/dXnsNXV2Y60" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Environment variables

Shell Environment Variables are special variables that contain information & configuration about the shell. System shell uses them when its needs to show you a prompt, run a command, or search what to run. Different operating system distributions have different environment variables and you can add yours if you need so; or want so!


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
You cal also use the more general `printenv` command.

## set

`set` allows you to change the values of shell options (variables) or to display the names and values of shell variables.

Using `set` we can configure how bash works. These are some samples:

| switch | result |
| :--- | :--- |
| -b | Cause the status of terminated background jobs to be reported immediately, rather than before printing the next primary prompt. |
| -e | return in case a pipline, command, ... return non-zero |
| -n | Read commands but do not execute them; this may be used to check a script for syntax errors. This option is ignored by interactive shells. |
| -t | Exit after reading and executing one command. |
| -C | Prevent output redirection using ‘&gt;’, ‘&gt;&’, and ‘&lt;&gt;’ from overwriting existing files. |

## setting environment variables

Bash environment variables can contain only letters (a to z or A to Z), numbers ( 0 to 9) or the underscore character ( _) and can not start with numbers. Traditionally we use UPPERCASE letters in our variable names.

To set a new environment variable do as follow:

```
$ name=jadi
$ desc='A programmer who enjoys cycling and promotes freedom'
$ echo $name
jadi
$ echo $desc
A programmer who enjoys cycling and promotes freedom
```

notes:
1. There should be no spaces around `=`
2. Use the quotes or double-quotes when your value do have spaces (or other special characters) in it
3. Use a dollar sign only when referring to a variable, and not when defining it

## unset

This command unsets a variables or a functions.

```text
$ name=jadi
$ echo $name
jadi
$ unset name
$ echo $name
```

## export
When setting environment variables with a simple `=`, the variable is only available in the current shell. So even if you run a new command from the current shell the variable wont be valid there (because technically the new command will be run in a sub-shell). If you want your variable to be valid in the current shell and all its sub-shells, you have to `export` it.

```text
$ export name=jadi
$ echo $name
jadi
$ bash
$ echo $name
jadi
```



## . \(and source\)

Yes only a dot! This is a shortcut for the bash source command. You can find it in files like /etc/profile. It runs the executable in front of it as part of the current environment (and not in a sub-process).

> Note: If you just execute a file \(without source or dot\) bash creates a child, runs the executable there and then closes it.

The `source` command is commonly used when you want to load new / updated environment variables or functions from a script. 


## Aliases
This is a way to define... um.. and `alias`. You can find them in your `~/.bashrc`:

```text
alias ll='ls -alF'
alias la='ls -A'
alias l='ls -CF'
```

It is a way to define a shortcut and you can add yours:

```
alias testnet='ping 4.2.2.4'
```

## functions

Like larger programming languages, Bash has functions, though in a somewhat limited implementation. A function is a subroutine, a code block that implements a set of operations, a "black box" that performs a specified task. Wherever there is repetitive code, when a task repeats with only slight variations in procedure, then consider using a function.

```text
funnyls () {
    ls -ltrh
    echo "This is a funny ls"
}
```

## Different shell envs

<iframe width="560" height="315" src="https://www.youtube.com/embed/omEV_n4U0uM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

The shell (here bash) can be started in 3 different ways:

1. When you _login_ into the shell, say after a ssh or when you site behind a terminal and login into a Linux machine. This is an interactive login session
2. When you open a new terminal (say from a GUI env). This is also interactive but not a *login* shell.
3. When a shell *spawns* when you run a command. Yes.. technically when you run a new command from a shell, a sup-shell starts, runs the commands and then returns back to your shell. This is called "non interactive" shell.

We will see how different default environment variables can be set in each of these modes.

### login shell

This is when you give your user and pass to enter a shell. In this case, these steps will define your shell environment:

1- `/etc/profile` is run

2- A line in `/etc/profile` runs whatever is in `/etc/profile.d/`

Now the global profile is loaded and system will go for user specific profiles:

3.1- `/home/USERNAME/.bash_profile`

3.2- `/home/USERNAME/.bash_login`

3.3- `/home/USERNAME/.profile`

> Note that only one of the 3, 4 & 5 will run. The system will go for `.bash_profile` and IF IT IS NOT THERE will try `.bash_login` and IF IT IS NOT THERE will try to run `.profile`. If any of these exists, the system wont look any further. So if you have only 4 & 5, only the 4 will be run.

At the end, the system loads:

4- `/home/USERNAME/.bashrc`

Commonly you will add whatever personal config you want into the `~/.bashrc`.

### Interactive \(non-login\) shell

if you run a shell in an interactive mode \(non-login\) shell from a GUI or within another temrinal, only two file will handle the environment:

1. `/etc/bash.bashrc` \(or `/etc/bashrc` in some systems)
2. `/home/USERNAME/.bashrc`

### Non Interactive Shell
There is no specific file to be used in this case. Instead we have the `BASH_ENV`. When a new non-interactive shell starts, it looks into this variable and if it points to a file, runs it. 

> On most Linux distributions, this environment value is not set by default.

## A few more files
### /etc/skel
This directory contains files which will be used as a starting template for each new user.

### .bash\_logout
This runs when you logout from a login shell. In many distros it only clears the screen so the next person will not be able to watch what you were doing before you logout.

