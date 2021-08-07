Title: 103.4. Use streams, pipes and redirects
Date: 2021-08-03 13:13
Category: 103

# 103.4. Use streams, pipes and redirects

- Candidates should be able to redirect streams and connect them in order to efficiently process textual data. Tasks include redirecting standard input, standard output and standard error, piping the output of one command to the input of another command, using the output of one command as arguments to another command and sending output to both stdout and a file.

## Objectives
- Redirecting standard input, standard output and standard error.
- Pipe the output of one command to the input of another command.
- Use the output of one command as arguments to another command.
- Send output to both stdout and a file.


- tee
- xargs

We've already talked about basics of piping and redirects in previous sections. Here you will get a deeper understanding of these concepts.

## Redirecting standard IO
On a linux system most shells use streams for input and output (a list of characters).
.
These streams can be from (and toward) various things including keyboard, block devices (hards, usb stick, ..), window of a program, fiels, ...

1. *stdout* is the standard output stream, which displays output from commands (file descriptor 1)
2. *stderr* is the standard error stream, which displays error output from commands (file descriptor 2)
3. *stdin* is the standard input stream, which provides input to commands (file descriptor 0)

What are these **file descriptions**? There are used to control the output. If you need to control where your output goes, you can add ```` n>```` or ````n>>````.
* **n>** redirects **file description n** to a file or device. If the file already exists it is **overwritten** and if it does not exists, it will be created.
* **n>>** redirects file description n to a file or device. If the file already exists the stream will be appended to the end of it and if it does not exists, it will be created.

> if the **n** is not given, the  default is *standard output*

> The user who runs the command should have write access to the file.

````
$ ls
fiona  habib  mahmoodrm  minoo	mojtaba  sina
$ ls j*
ls: cannot access j*: No such file or directory
$ ls m*
mahmoodrm  minoo  mojtaba
$ ls j* m*
ls: cannot access j*: No such file or directory
mahmoodrm  minoo  mojtaba
$ ls j* m* > output 2> errors
$ cat output
mahmoodrm
minoo
mojtaba
$ cat errors
ls: cannot access j*: No such file or directory
$
````

#### Redirecting both stdout and stderr to one location
Sometimes (say during automated tasks) we prefer to send both standard output and standard error to same place, Use ````&>```` and ````&>>```` to say *both stderr and stdout*.

It is also possible to use `&1` and `&2` and `&0` to refer to **current place** of stdout, stderr & stdin.  In this case `ls > file1 2>&1` means *redirect output to file1 and output stderr to same place as stdout (file1)*

> Be careful! `ls 2>&1 > file1` means *print stderr to current location of stdout (screen) and then change the stdout to file1*

#### sending to null
In linux, **/dev/null** is like a trash-can. You can send anything there and it disappears. So it is normal to say:

```
$ ls j* m* > file1
ls: cannot access j*: No such file or directory
$ ls j* m* > file1 2>/dev/null
$ cat file1
mahmoodrm
minoo
mojtaba
$

```

## redirecting input
The **<** operand redirects the input.

```
$ cat uses
you fedora
jadi ubuntu
rubic windows
neda mac
narsin arch
$ tr ' ' ',' < uses
you,fedora
jadi,ubuntu
rubic,windows
neda,mac
narsin,arch
```

### here-documents
Many shells, have here-documents (also called here-docs) as a way of input. You use `<<` and a `WORD` and then whatever you input is considered stdin till you give only the WORD in one line.

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

> Here-Documnts are very useful if you are writing scripts and automated tasks.

## Pipes
Piping is sending one commands output to another commands input (Piping the stdout to stdin). You use `|` for this task.

> As previously seen, many commands use a hyphen `-` in place of a filename as an argument to indicate when the input should come from stdin rather than a file.

```
$ cat what_i_have.txt
laptop
socks
tshirt
ball
socks
glasses
$ cut -f1 -d' ' what_i_have.txt | sort | uniq -c | sort -nr
      2 socks
      1 tshirt
      1 laptop
      1 glasses
      1 ball
```

> If you need to start your pipeline with the contents of a file, start with `cat filename | ...` or use a `<` stdin redirect.

## xargs

This command reads input from *stdin* and uses them as arguments.

```
$ ls | xargs echo these are files:
these are files: errors f file1 fiona habib mahmoodrm minoo mojtaba output output.txt sina uses what_i_have.txt
```

> if you do not give any command to the `xargs` , the echo will be the default command (it will show the stdin).

Have in mind that xargs breaks input based on blanks and use any part as an argument. You can limit the number of arguments with ```--max-args``` (same as `-n`) switch and escape blanks or quote them to prevent them from breaking.

One important switch is -I. This is useful if you need to pass stdin arguments in the middle (or even start) of your commands. use the form `xargs -I SOMETHING echo here is SOMETHING end`:

```
$ cat what_i_have.txt
laptop
socks
tshirt
ball
socks
glasses
$ cat what_i_have.txt | xargs -I DATA echo I have DATA and I love it.
I have laptop and I love it.
I have socks and I love it.
I have tshirt and I love it.
I have ball and I love it.
I have socks and I love it.
I have glasses and I love it.
```

> If you use -L, the input will break by line and not by blanks.

## tee
What if you need to see the output on screen and also save it to a file? Ugly way is redirecting to the file and using `tail -f file` in another window. Nice way is using `tee` and giving it one or more filenames for standard output (if you need to save *stderr*, first redirect it to *stdout*). This will write the output to those files and also writes them to the screen:

```
$ ls -1 | tee allfiles myfiles
allfiles
f
fiona
habib
mahmoodrm
minoo
mojtaba
myfiles
sina
```
> if you want to prevent overwriting files, use the `-a` switch to append to files if exists.
