Title: 105.2 Customize or write simple scripts
Date: 2010-12-03 10:20
Category: LPIC1
Tags: LPIC1, 102, LPIC1-102-500
Authors: Jadi
sortorder: 280
Summary: 
Topic: Shells and Shell Scripting



_Weight: 4_

#### Description

Candidates should be able to customize existing scripts, or write simple new Bash scripts.

#### Key Knowledge Areas:

* Use standard sh syntax \(loops, tests\).
* Use command substitution.
* Test return values for success or failure or other information provided by a command.
* Execute chained commands.
* Perform conditional mailing to the superuser.
* Correctly select the script interpreter through the shebang \(`#!`\) line.
* Manage the location, ownership, execution and suid-rights of scripts.

#### Terms and Utilities

* `for`
* `while`
* `test`
* `if`
* `read`
* `seq`
* `exec`
* `||`
* `&&`

<iframe width="560" height="315" src="https://www.youtube.com/embed/0BYkWRf4Yvk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## combining commands

If you want to run more than one command in oneline, separate them by a `;`. So the `cd /tmp; ls` will run the `cd /tmp` and then `ls`. But there are more advanced usages too.

You can use `&&` \(as logical And\) and `||` \(as logical OR\) chaining. In case of And, the execution will stop as soon as the first one fails to execute. In case of Or, the next command will only run if the first one fails. Just like in logic gates.

Confusing? Let me explain again. The system will always try to *evaluate* the outcome of your chain. So if you have `A && B` then A fails, the system does not need to test B (because the overall result will be False anyway). Same logic works for `A || B || C`. If A works fine, the overall evaluation will be True so no need for testing B or C. But if A fails, system will try B and if B fails, we have to try C. 

We use chaining to create logical flows. For example:

```
$ cp backup.gzip /backups/ && rm backup.gzip
```

works like this: copy the backup to this location and delete the file ONLY IF the previous copy was successful. 


### Shell Scripts
We can combine shell commands or programs and or some logic or loops to write large or small scripts. Shell scripts are useful when you want to *automate* some tasks in one larger command. Say a shell script called "do_backup.sh" may compress some files into a file, rename this file based on the current date and time and then save it on a remote site and at last delete the ones older than 1 month. 

### Shebang
There is a line at the beginning of scripts which starts with `#!` and continues with an executable who needs to run this script. It is called shebang and as mentioned, tells the shell which _interpreter_ must be used to run this script.

> Note: In many programming languages (including Bash & Python), a `#` at the beginning of a line in script indicates _comments_. Do not confuse it with the _Shebang_ \(`#!`\)

Commonly we run shell scripts using `#!/bin/bash` or `#!/bin/sh`

The rest of a shell script can use most of the commands you already know in addition with some more "programming" specific commands like loops, tests and such. Here is a primitive sample:

```bash
#!/bin/bash

echo
echo "We are learning! Wowww..."
echo
```

> The `sh` is a more basic shell but it is compatible with most of the things we talk about. There are also other options like `zsh` and `csh` but the LPIC is based on `bash`.

### Variables
Already seen in the previous section. You can define variables like this `VARNAME=VALUE`. Here is a sample:

```bash
#!/bin/bash

NAME=Jadi

echo
echo "$NAME is learning! Wowww..."
echo
```

> Note: you can also do NAME="Jadi the geeking guy" if you need to have spaces in your values

If you want to access the command line arguments in your shell script, use `$1`, `$2`, .... You can find the number of command line arguments via `$#` variable.

### Command substitution

Sometimes you need to save the output of a command in a variable or use it in some way. To do so you can use `$(command)` or simply \`command\` (Backtick). Look at these two samples:

```bash
➜  FILES=$(ls -1) # the $FILES variable contains the list of all files

➜  ~ date +'%Y%m%d-%H%m'
20230408-1604
➜  ~ touch backup_`date +'%Y%m%d-%H%m'`.tar
➜  ~ ls
backup_20230408-1604.tar
```

### executing scripts
In the Unix/Linux world, file should be executable to be executable! :D To do so use the `chmod` command with `+x`. After this step you can run your script by giving its path to shell. Please note that Linux by default does not looks into the current directory so if you are going to run a script at the current directory, you have to run `./script_name.sh`.

Another way to run a script is running `sh` or `bash` with the shell scripts name as its argument. That is `sh my_script.sh`.

In both above methods, the scripts runs inside a child bash process and *returns* back afterwards to the same shell. If you want to override this and *replace* your current shell with the program you are going to run, use the `exec` build-in command. The `-c` switch will run the command in a clean environment.



### Conditions

<iframe width="560" height="315" src="https://www.youtube.com/embed/_4ISOx9Kxpk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

Up to now, we were just running commands one by one. That is not very _programmatic_. If we are going to have some _logic_ in our programs, we need _conditions_ and _loops_. First we will cover conditions, using the `if` command. Its usage is like this:

```bash
if [condition]
then
   do something
   do another thing
else
   do new things
   even funnier things
fi
```

> Note: else part is optional, `if`, `then`, `fi` is enough.

Conditions can be TRUE or FALSE. A very simple conditions is `if [ "Linux" = "Linux" ]`. Silly? I know but wait; we are learning the syntax only. Please give special attention to the _spaces_ and _`=`_ for checking if two strings are equal.

```bash
#!/bin/bash

kernel=$(uname -s)
if [ $kernel = "Linux" ]
then
    echo YES. You are using a Linux
else
    echo "Not a linux :("
fi
```

The command to check conditions is the `test` command but since it is used a lot, we have a shortcut for it. Instead of `test condition` you can write `[ condition ]`. 

| conditions | what is means |
| :---: | :--- |
| "a" = "b" | if two strings are equal \(here it will return False\) |
| "a" != "b" | string a _is not equal_ to string b |
| 4 -lt 40 | if 4 is _lower   than_ 40 \(True\) |
| 5 -gt 15 | if 5 is _greater than_ 15 \(False\) |
| 5 -ge 5 | if 5 is _greater or equal_ 5 |
| 5 -le 3 | if 5 is _lower or equal_ to 3 |
| 9 -ne 2 | 9 is _not equal_ with 2 \(True\) |
| -f FILENAME | if file FILENAME exists |
| -s FILENAME | if file exists and its size is more than 0 \(Zero\) |
| -x FILENAME | if file exists and is executable |

### read

Using `read` we can read the user input. Look at this:

```bash
#!/bin/sh

echo "what is your name?"
read NAME

echo "Hello $NAME"

if [ $NAME = "Jadi" ]
then
    echo "Oh I know you!"
else
    echo "I wish I knew you"
fi
echo "Bye"
```

You can timeout the waiting using the `-t` and show a prompt using `-p`. 

```bash
if read -t 10 -p "Server address?" SERVER
then
    echo "Connecting to the $SERVER ..."
else
    echo
    echo "Too late!"
fi
```

### loops

In programming loops are used to repeat part of the programs. We have 2 different loops in Bash; `for` and `while`. The for loops lets us run part of a program for a specific number of iterations. The `while` loop is used when we want to repeat part of a program *while* a specific condition became true. 

#### for

The syntax is like this:

```bash
for VAR in SOME_LIST;
do
  some stuff with $VAR
  some other stuff
done
```

> Note:  the `in`, `;`, `do` and `done`.

On each iteration, the VAR will be equal to one of the SOME\_LIST elements. SOME\_LIST can be numbers, name of files, words, ...

```bash
for NUM in 1 2 3 4 5 6;
do
    echo $NUM
done
```

But what if you needed to run from 1 to 42? We have the `seq` command for that. The `seq 1 42` or its shorthand `{1..42}` will let us run a loop 42 times.

We can also use non-numeric variables here. This is a common use case:

```bash
for FILE in $(ls);
do
    echo $FILE
    wc -l $FILE
done
```

#### while

This is the syntax:

```bash
while [condition]
do
    do something
    do anohter thing
done
```

> If your condition stays true all the time, the `while` loop will run _forever_. This is called an _infinite loop_ and should be stopped by a `Ctrl+C`.

This is sample:

```bash
VAR=52

while [ $VAR -gt 42 ]
do
    echo VAR is $VAR and it is still greater than 42
    let VAR=VAR-1
done
```

> Note the `let` usage! If you just say `VAR=1` and then `VAR=$VAR+1`, then VAR will be equal to `1+1` as an string!.

### mailing the root user

For sending mail, you need to install `mailutils`. Then the `mail` command will send emails. You can send the mail to the root user by issuing this command:

```bash
jadi@funlife:~$ mail root
Cc:
Subject: Hi there root
hello there. This is my mail
```

And root will get this email. She can read it using `mail` command.

If you need to send emails in a script, just do:

```bash
$ echo "Body!" | mail -s "Subject" root
```

## returned values

In the Unix world, the programs return values when they are finished. If you have programmed C, this is the `return 0` at the end. Commonly a 0 means successful execution. This return value can be read / examined using `$?` variable. 

```bash
jadi@ubuntuserver:/etc/skel$ touch /chert
touch: cannot touch '/chert': Permission denied
$ echo $?
1
$ touch /tmp/11
$ echo $?
0
$ test -e /
$ echo $?
0
$ test -e /nonexist
$ echo $?
1
$ dummycommand
dummycommand: command not found
$ echo $?
127
```

To return values from your shell scripts, use the `exit` command; say `exit 0` for a successful exit.
## Bonus

Just found my old `general_backup.sh` script and [uploaded it to github for you](https://github.com/jadijadi/general_scripts/blob/main/backup_general_jadi.sh). Nothing fancy but shows you how a general bash script can help you on your daily tasks.
