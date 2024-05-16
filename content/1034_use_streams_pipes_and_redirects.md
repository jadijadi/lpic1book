Title: 103.4 Use streams, pipes, and redirects
Date: 2010-12-03 10:20
Category: LPIC1
Tags: LPIC1, 101, LPIC1-101-500
Authors: Jadi
Summary: 
sortorder: 150

_Weight: 4_

Candidates should be able to redirect streams and connect them to efficiently process textual data. Tasks include redirecting standard input, standard output, and standard error, piping the output of one command to the input of another command, using the output of one command as arguments to another command, and sending output to both stdout and a file.


## Objectives
- Redirecting standard input, standard output, and standard error.
- Pipe the output of one command to the input of another command.
- Use the output of one command as arguments to another command.
- Send output to both stdout and a file.

## Terms
- `tee`
- `xargs`

These features help us to control the input/output of the commands and do things like saving the output of a command to a file, getting the input of a command from another command, or separating the normal output from errors. We've already used them in previous sections, but let's learn more and deepen our understanding of these.

<iframe width="560" height="315" src="https://www.youtube.com/embed/PeUhwMoSCko" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Redirecting standard IO

On a Linux system, most shells use streams for input and output. These streams can be from (and toward) various things including keyboards, block devices (hards, USB sticks, ...), files, and ...

We have 3 different standard streams:

<ol start="0">
<li><b>STDIN</b> is the standard input stream, which provides input to a command.</li>
<li><b>STDOUT</b> is the standard output stream, which includes the output of a command.</li>
<li><b>STDERR</b> is the standard error stream, which includes the error output of a command.</li>
</ol>

> The `0`, `1` & `2` numbering, indicates the ***STDIN***, ***STDOUT*** and ***STDERR** accordingly. For example, if you want to redirect the stderror, you can use 2> and the STDERR will be redirected.

These are the other redirections you can use:

|Operator|Usage|
|--|--|
|>|Redirect STDOUT to a file; Overwrite if exists|
|>>|Redirect STDOUT to a file; Append if exists|
|2>|Redirect STDERR to a file; Overwrite if exists|
|2>>|Redirect STDERR to a file; Append if exists|
|&>|Redirect both STDOUT and STDERR; Overwrite if exists|
|&>>|Redirect both STDOUT and STDERR; Append if exists|
|<|Redirect STDIN from a file|
|<>|Redirect STDIN from the file and send the STDOUT to it|

</br>
Some examples: 

```
$ ls
bob	jack	jadi	linus	sara who_uses_what.txt
$ ls x*
ls: x*: No such file or directory
$ ls j*
jack	jadi
$ ls j* x* > output 2> errors
$ cat output
jack
jadi
$ cat errors
ls: x*: No such file or directory
$ cat who_uses_what.txt
jadi, fedora
linux, fedora
bob, ubuntu
jack, arch
sara, fedora
$ tr ' ', '' < who_uses_what.txt
tr: empty string2
$ cat who
$ tr ',', '|' < who_uses_what.txt
jadi| fedora
linux| fedora
bob| ubuntu
jack| arch
sara| fedora
```

It is also possible to use `&1` and `&2` and `&0` to refer to the **target** of STDOUT, STDERR & STDIN. In this case `ls > file1 2>&1` means _redirect output to file1 and output stderr to same place as stdout \(file1\)_

> Be careful! `ls 2>&1 > file1` means _print stderr to the current location of stdout (terminal) and then change the stdout to file1_

#### sending to null

In Linux **/dev/null** device works like an abyss. You can send anything there, and it disappears without being any burden on your system. So it is normal to say:

```
$ ls j* x* > file1
ls: x*: No such file or directory
$ ls j* x* > file1 2>/dev/null
$ cat file1
jack
jadi
```


#### here-documents

Many shells have here-documents (also called here-docs) as a way of input. You use `<<` and a `WORD` and then whatever you input is considered stdin till you give only the WORD in one line.

```
$ tr ' ' '.' << END_OF_DATA
> this is a line
> and then this
>
> we'll still type
> and,
> done!
> END_OF_DATA
this.is.a.line
and.then.this

we'll.still.type
and,
done!
```

> Here-Documents are very useful if you are writing scripts and automated tasks.

<iframe width="560" height="315" src="https://www.youtube.com/embed/j3L_7Wxcl0U" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
### Pipes

With the pipe (`|`), you can redirect STDOUT, STDIN, and STDERR between multiple commands all on one command line. When you do `command1 | command2`, command1 is executed, but its STDOUT is redirected as STDIN into the COMMAND2. 


```
$ cat who_uses_what.txt
jadi, fedora
linux, fedora
bob, ubuntu
jack, arch
sara, fedora
$ cut -f2 -d, who_uses_what.txt | sed -e 's/ //g' | sort  | uniq -c | sort -nr
   3 fedora
   1 ubuntu
   1 arch
```

> If you need to start your pipeline with the contents of a file, start with `cat filename | ...` or use a `<` stdin redirect.

Pipes are one of the super strong & super amazing features in the UNIX world. They let you create *new* tools by combining tools that do atomic things. As an example, check this out:

<iframe width="560" height="315" src="https://www.youtube.com/embed/86V5amp1u7U" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### xargs

The xargs utility reads space, tab, newline and end-of-file delimited strings from the standard input and executes the provided utility with the strings as their arguments.

```
$ ls
bob			file1			jadi			output			who_uses_what.txt
errors			jack			linus			sara
$ ls | xargs echo these are files:
these are files: bob errors file1 jack jadi linus output sara who_uses_what.txt
```

> If you do not give any command to `xargs`, the echo will be the default command. 

One common switch is `-I`. This is useful if you need to pass stdin arguments in the middle (or even start) of your commands. Use it like this: `xargs -I SOMETHING echo here is SOMETHING end`:

```
$ cat who_uses_what.txt
jadi, fedora
linus, fedora
bob, ubuntu
jack, arch
sara, fedora
$ cat who_uses_what.txt | xargs -I DATA echo name is DATA is the choice.
name is jadi, fedora is the choice.
name is linus, fedora is the choice.
name is bob, ubuntu is the choice.
name is jack, arch is the choice.
name is sara, fedora is the choice.
```

Two more useful switches:
1. `-L 1` breaks based on new lines 
2. `-n 1` tells xargs to invoke the provided utility after receiving 1 argument.  

### tee

The problem with redirection is that you cannot see the progress of your commands in the same terminal. The `tee` utility solves this. If you need to see the output on screen and also save it to a file, `tee` is your friend. Give it one or more filenames and it will do the trick. 


```
$ ls -1 | tee allfiles myfiles
bob
errors
file1
jack
jadi
linus
output
sara
who_uses_what.txt
$ cat allfiles myfiles
bob
errors
file1
jack
jadi
linus
output
sara
who_uses_what.txt
bob
errors
file1
jack
jadi
linus
output
sara
who_uses_what.txt
```
The `-a` switch will append to files if they exist.

> If you need to save ***stderr*** too, first redirect it to ***stdout***
