Title: 105.2 Customize or write simple scripts
Date: 2010-12-03 10:20
Category: LPIC1
Tags: LPIC1, 101, LPIC1-101-500
Authors: Jadi
sortorder: 280
Summary: 
Topic: Shells and Shell Scripting

## 105.2 Customize or write simple scripts

<div class="alert alert-danger" role="alert">
  This chapter is still a Work In Progress. Do not rely on it for LPIC version 500 exam. Will be updated in a few weeks.
</div>


_Weight: 4_

#### Description

Candidates should be able to customize existing scripts, or write simple new Bash scripts.

#### Key Knowledge Areas:

* Use standard sh syntax \(loops, tests\)
* Use command substitution
* Test return values for success or failure or other information provided by a command
* Perform conditional mailing to the superuser
* Correctly select the script interpreter through the shebang \(\#!\) line
* Manage the location, ownership, execution and suid-rights of scripts

#### Terms and Utilities

* for
* while
* test
* if
* read
* seq
* exec

### Shell Scripts

Are a way of automating tasks.

### Shebang

If a line starts with `#!` it is called shebang and tells the shell what _interpreter_ to use for running this script.

> Note: Normally a `#` at the beginning of a script is for showing _comments_. Do not confuse it with _Shebang_ \(\#!\)

In many cases we run shells with `#!/bin/bash` or `#!/bin/sh`

We can use the command we already know in our shell scripts. A sample is:

```text
#!/bin/bash

echo
echo "We are learning! Wowww..."
echo
```

### Variables

Already seen in some parts. You can define variables like this `VARNAME=VALUE`. A sample:

```text
#!/bin/bash

NAME=Jadi

echo
echo "$NAME is learning! Wowww..."
echo
```

> Note: you can also do NAME="Jadi"

#### Command substitution

Sometimes you need to have a variable with the result of something to a variable. In this case you can use $\(\) construct:

```text
FILES=$(ls -1)
```

### executing scripts

If the file is executable, we can run them using the ./script\_name.sh if we are in the same directory, or give the complete path or include their directory ine $PATH variable. As you can see they are just normal programs.

Another way is giving our scripts name as a parameter to the `bash` or `sh` commands.

> Note: you know that for making a file executable we can do `chmod 755 filename` or `chmod +x fiename`.

### Conditions

Up to now, we were just running commands one by one. That is not very _programmatic_. If we are going to have some _logic_ in our programs, we need _conditions_ and _loops_. First we will cover conditions, using the `if` command. Its usage is like this:

```text
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

Conditions can be TRUE or FALSE. A very simple conditions is `if [ "Linux" = "Linux" ]`. Silly? I know but we will change it soon but for now, learn the syntax! Specially the _spaces_ and _=_ for checking if two strings are equal.

```text
#!/bin/bash

kernel=$(uname -s)
if [ $kernel = "Linux" ]
then
    echo YES. You are using a Linux
else
    echo "Not a linux :("
fi
```

> Note spaces and using doublequotes \("\) on seccond echo because it has `(` character which will be interpreted by bash if we do not enclose the string in a doublequote.

The actual checking of the condition is done by `test` command which is writter as `[ some test ]`. There are the other options:

| conditions | what is means |
| :--- | :--- |
| "a" = "b" | if two strings are equal \(here it will return False\) |
| "a" != "b" | string a _is not equal_ to string b |
| 4 -lt 40 | if 4 is _lower   than_ 40 \(True\) |
| 5 -gt 15 | if 5 is _greater than_ 15 \(False\) |
| 5 -ge 5 | if 5 is _greater or equal_ 5 |
| 5 -le 3 | if 5 is _lower or equal_ to 3 |
| 9 -ne 2 | 9 is _not equal_ with 2 \(True\) |
| -f FILENAME | if file FILENAME exists |
| -s FILENAME | if file exists and its size is more than 0 |
| -x FILENAME | file exists and is executable |

#### read

Using `read` we can read the user input. Look at this:

```text
1 #!/bin/sh
  2
  3 echo "what is your name?"
  4 read NAME
  5
  6 echo "Hello $NAME"
  7
  8 if [ $NAME = "Jadi" ]
  9 then
 10      echo "Oh I know you!"
 11  else
 12      echo "I wish I knew you"
 13 fi
 14
 15 echo "Bye"
```

### for loop

Generaly loops are used to run a specific set of commands more than once. The syntax is like this:

```text
for VAR in SOME_LIST;
do
  some stuff with $VAR
  some other stuff
done
```

> Note the `in`, `;`, `do` and `done`.

On each loop, the VAR will be equal to one of the SOME\_LIST elements. SOME\_LIST can be numbers, name of files, words, ...

```text
for NUM in 1 2 3 4 5 6;
do
    echo $NUM
done
```

But what if you needed to go 1 to 42? We have the `seq` command which can be used like `seq 1 42` or a shorthand like `{1..42}`.

Good part is we can use non-numbers too!

```text
for FILE in $(ls);
do
    echo $FILE
    wc $FILE
done
```

### while loop

This is another kind of loop but loops _while_ a conditions is TRUE. This is the syntax:

```text
while [condition]
do
    do something
    do anohter thing
done
```

> Note: If your condition will remains true all the time, the while loop will run _forever_. This is called an _infinite loop_

This is sample:

```text
VAR=52

while [ $VAR -gt 42 ]
do
    echo VAR is $VAR and it is still greater than 42
    let VAR=VAR-1
done
```

> we will have an infinite loop if we use `let VAR=VAR+1`. Ctrl+C will help us to _break_ the loop.
>
> Note the `let` usage! If you just just say `VAR=1` and then `VAR=$VAR+1`, then VAR will be equal to `1+1` as an string!.

### mailing the root user

For sending mail, you need to install `mailutils`. Then the `mail` command will send emails. You can send the mail to the root user by issuing this command:

```text
jadi@funlife:~$ mail root
Cc:
Subject: Hi there root
hello there. This is my mail
```

And root will get this email. She can read it using `mail` command.

If you need to send emails in a script, just do:

```text
$ echo "Body!" | mail -s "Subject" root
```

This can be easily embeded as poart of your scripts!

