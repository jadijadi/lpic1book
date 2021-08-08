# 1032\_process\_text\_streams\_using\_filters

Title: 103.2. Process text streams using filters Date: 2021-08-03 13:11 Category: 103

## 103.2. Process text streams using filters

_Weight: 3_

Description: Candidates should be able to apply filters to text streams.

### Objectives

* Send text files and output streams through text utility filters to modify the output using standard UNIX commands found in the GNU textutils package.
* cat
* cut
* expand
* fmt
* head
* od
* join
* nl
* paste
* pr
* sed
* sort
* split
* tail
* tr
* unexpand
* uniq
* wc

### Streams

In **UNIX** world a lot of data is in TEXT form. Log files, configurations, user inputs, list of files, ... . **Filtering** this data means taking an input stream of text and performing some conversion on the text before sending it to an output stream. In this context, a **streams** is nothing more than _"a sequence of bytes that can be read or written using library functions that hide the details of an underlying device from the application"_.

In simple words, a text stream is an input of text from keyboard, a file, a network device, .. and filtering it is automatically changing it.

As you saw in previous section, modern programming environments and shells \(including bash\) use three standard I/O streams:

* **stdin** is the standard input stream, which provides input to commands.
* **stdout** is the standard output stream, which displays output from commands.
* **stderr** is the standard error stream, which displays error output from commands

### Piping \( \| \)

In _normal_ cases, you give input from keyboard and output to the monitor. But in real life of a system admin, most inputs come from another commands. If you want to give the output of `command1` as the input of `command2`, you should **PIPE** them as `command1 | command2`.

> this \| looks like a pipe!

```text
jadi@funlife:~/w/lpic/101$ ls -1 | sort
12
62
amir
jadi
neda
you
jadi@funlife:~/w/lpic/101$ ls -1 | sort -r
you
neda
jadi
amir
62
12
```

> UNIX philosophy is building small, strong tools and combine them

### Redirection \( &gt; \)

Another useful way of controlling the streams is `>`. This help you to redirect your output \(mostly to a file\).

```text
jadi@funlife:~/w/lpic/101$ ls -ltrh
total 0
-rw-rw-r-- 1 jadi jadi 0 Jan  4 17:33 12
-rw-rw-r-- 1 jadi jadi 0 Jan  4 17:33 62
-rw-rw-r-- 1 jadi jadi 0 Jan  4 17:33 neda
-rw-rw-r-- 1 jadi jadi 0 Jan  4 17:33 jadi
-rw-rw-r-- 1 jadi jadi 0 Jan  4 17:33 you
-rw-rw-r-- 1 jadi jadi 0 Jan  4 17:34 amir
jadi@funlife:~/w/lpic/101$ ls -ltrh > directory_data
jadi@funlife:~/w/lpic/101$ cat directory_data
total 0
-rw-rw-r-- 1 jadi jadi 0 Jan  4 17:33 12
-rw-rw-r-- 1 jadi jadi 0 Jan  4 17:33 62
-rw-rw-r-- 1 jadi jadi 0 Jan  4 17:33 neda
-rw-rw-r-- 1 jadi jadi 0 Jan  4 17:33 jadi
-rw-rw-r-- 1 jadi jadi 0 Jan  4 17:33 you
-rw-rw-r-- 1 jadi jadi 0 Jan  4 17:34 amir
-rw-rw-r-- 1 jadi jadi 0 Jan  4 17:37 directory_data
```

### cat

this command simply outputs its input stream \(or the filename you give it\). As you saw in previous section. As most commands, if you do not give an input to it, it will read the data from the keyboard.

```text
jadi@funlife:~/w/lpic/101$ cat > mydata
test
this is the second line
bye
jadi@funlife:~/w/lpic/101$ cat mydata
test
this is the second line
bye
```

> When inputting data, `ctrl+d` will end the stream.

it is also possible to add files to each other using cat:

```text
jadi@funlife:~/w/lpic/101$ cat mydata directory_data
test
this is the second line
bye
total 0
-rw-rw-r-- 1 jadi jadi 0 Jan  4 17:33 12
-rw-rw-r-- 1 jadi jadi 0 Jan  4 17:33 62
-rw-rw-r-- 1 jadi jadi 0 Jan  4 17:33 neda
-rw-rw-r-- 1 jadi jadi 0 Jan  4 17:33 jadi
-rw-rw-r-- 1 jadi jadi 0 Jan  4 17:33 you
-rw-rw-r-- 1 jadi jadi 0 Jan  4 17:34 amir
-rw-rw-r-- 1 jadi jadi 0 Jan  4 17:37 directory_data
```

### od

This command _dump_s files \(shows files in formats other than text\). Normal behaviour is OctalDump \(base 8\):

```text
jadi@funlife:~/w/lpic/101$ od mydata
0000000 062564 072163 072012 064550 020163 071551 072040 062550
0000020 071440 061545 067543 062156 066040 067151 005145 074542
0000040 005145
0000042
```

Not good.. lets use two switches:

* -t will tell what format to print \(`-t a` for showing only named characters or `-t c` for showing escaped chars\)
* -A for choosing how to show offsets \(````-A``````` D`ecimal,`O`ctal,`H`ex or`N\`\`\`\`one\)

> `od` is very useful to find problems in your text files - say finding out if you are using tabs or correct line endings

### split

Will split files. It is very useful for transferring HUGE files on smaller media \(say splitting a 3TB file to 8GB parts and moving them to another machine with a USB Disk\).

```text
jadi@funlife:~/w/lpic/101$ cat mydata
hello
this is second line
but as you can see we are
still writing
and this is getting longer
.
.
and longer
and longer!
jadi@funlife:~/w/lpic/101$ ls
mydata
jadi@funlife:~/w/lpic/101$ split -l 2 mydata
jadi@funlife:~/w/lpic/101$ ls
mydata    xaa  xab  xac  xad  xae
jadi@funlife:~/w/lpic/101$ cat xab
but as you can see we are
still writing
```

* on normal case, split uses xaa, xab, xac, .. for output files. If can be changed with `split -l 2 mydata output` which will lead to outputaa, outputab, ..
* the ````-l 2``` switch told the split to put 2 lines in output files. It is possible to use````-b 42`to split every 42 bytes or even`-n 5\`\`\`\` to force 5 output files.
* if you want numeric output \(x00, x01, ..\) use `-d`

> need to join these files? `cat` them with `cat x* > originalfile`.

### wc

wc is _word count_. It counts the lines, words and bytes in the input stream.

```text
jadi@funlife:~/w/lpic/101$ wc mydata
  9  25 121 mydata
```

> It is very normal to count the line numbers with `-l` switch.

### head & tail

Shows the _head_ \(top\) of a file or its _tail_ \(bottom\). The default lines to show is 10 but you can specify with `-n20` or `-20`.

> `tali -f` will continue showing the new lines which are being written at the eng of the file. Very useful.

### expand & unexpand & tr

Expand will replace the tabs in a stream with spaces \(normally 8 but can be defined with -n12 for 12\):

```text
jadi@funlife:~/w/lpic/101$ cat howcool
jadi    5
sina    6
rubic    2
you     12
jadi@funlife:~/w/lpic/101$ od -tc howcool
0000000   j   a   d   i  \t   5  \n   s   i   n   a  \t   6  \n   r   u
0000020   b   i   c  \t   2  \n   y   o   u      \t   1   2  \n
0000036
jadi@funlife:~/w/lpic/101$ expand howcool | od -tc
0000000   j   a   d   i                   5  \n   s   i   n   a        
0000020           6  \n   r   u   b   i   c               2  \n   y   o
0000040   u                       1   2  \n
0000051
```

Unexpand will do the reverse. The default is converting only the initial blanks but his can be overrided by using `-a`.

> unexpand needs at least two spaces.

The `tr` command _translates_ A to 1, B to 2 and C to 3 in a stream you have to `tr 'ABC' '123'`. It is a pure filter so if you need to give it file to work on, you have to use cat:

```text
jadi@funlife:~/w/lpic/101$ cat mydata
hello
this is second line
but as you can see we are
still writing
and this is getting longer
.
.
and longer
and longer!
jadi@funlife:~/w/lpic/101$ cat mydata | tr 'and' 'AND'
hello
this is second liNe
but As you cAN see we Are
still writiNg
AND this is gettiNg loNger
.
.
AND loNger
AND loNger!
```

> Note: all **a**s are replaced with **A**.

### -

You should know that if you put `-` instead of a filename, the data will be replaced from the pipe \(or keyboard stdin\).

```text
jadi@funlife:~/w/lpic/101$ wc -l mydata | cat mydata - mydata  
hello
this is second line
but as you can see we are
still writing
and this is getting longer
.
.
and longer
and longer!
9 mydata
hello
this is second line
but as you can see we are
still writing
and this is getting longer
.
.
and longer
and longer!
```

### pr

this formats text for classic _printers_. The default header includes the filename and file creation date and time, along with a page number and two lines of blank footer.

```text
pr mydata


2015-01-04 17:58                      mydata                      Page 1


hello
this is second line
but as you can see we are
still writing
and this is getting longer
.
.
and longer
and longer!
```

It is possible to print in two or more columns and other outdated fun stuff.

> When output is created from multiple files or the standard input stream, the current date and time are used instead of the filename and creation date.

### nl

Simply numbers lines.

```text
jadi@funlife:~/w/lpic/101$ nl mydata  | head -3
     1    hello
     2    this is second line
     3    but as you can see we are
```

> cat -n will also number lines.

### fmt

Will reformat a text file within margins \(say 80 columns width or 60 if you use -w60\).

```text
jadi@funlife:~/w/lpic/101$ fmt mydata
hello this is second line but as you can see we are still writing and
this is getting longer .  .  and longer and longer!
```

### sort & uniq

Will sorts its input\(s\).

```text
jadi@funlife:~/w/lpic/101$ cat uses
you fedora
jadi ubuntu
rubic windows
neda mac
jadi@funlife:~/w/lpic/101$ cat howcool
jadi    5
sina    6
rubic    2
you     12
jadi@funlife:~/w/lpic/101$ sort howcool uses
jadi    5
jadi ubuntu
neda mac
rubic    2
rubic windows
sina    6
you     12
```

> if you want to sort NUMERICALLY \(so 9 is lower than 19\), use `-n` -r will reverse the search

and the `uniq` removes duplicate entries from its input. Normal behaviour is removing only the duplicated lines but you can change the behaviour for example by giving `-f1` to force it to not check fist field.

```text
jadi@funlife:~/w/lpic/101$ uniq what_i_have.txt
laptop
socks
tshirt
ball
socks
glasses
jadi@funlife:~/w/lpic/101$ sort what_i_have.txt | uniq
ball
glasses
laptop
socks
tshirt
jadi@funlife:~/w/lpic/101$
```

> As you can see, the input HAVE TO BE sorted for uniq to work

uniq has great switches:

```text
jadi@funlife:~/w/lpic/101$ cat what_i_have.txt
laptop
socks
tshirt
ball
socks
glasses
jadi@funlife:~/w/lpic/101$ sort what_i_have.txt  | uniq -c  #show count of each item
      1 ball
      1 glasses
      1 laptop
      2 socks
      1 tshirt
jadi@funlife:~/w/lpic/101$ sort what_i_have.txt  | uniq -u #show only non-repeated items
ball
glasses
laptop
tshirt
jadi@funlife:~/w/lpic/101$ sort what_i_have.txt  | uniq -d #show only repeated items
socks
```

> how many things I have? `wc -l what_i_have.txt` :\)

### cut

cut command will _cut_ a column of one file. Good for separating fields:

Lets cut the _first field_ of a file.

```text
jadi@funlife:~/w/lpic/101$ cat howcool
jadi    5
sina    6
rubic    2
you     12
jadi@funlife:~/w/lpic/101$ cut -f1 howcool
jadi
sina
rubic
you
```

> normal delimiter is TAB. use -dx to change it to "x" or use `| tr ' ' '\t' |` to convert spaces in your stream to TABs.

It is also possible to _cut_ fields 1, 2, 3 with `-f1-3` or only characters 4,5,7,8 with `-c4,5,7,8`.

## paste

The paste command pastes lines from two or more files side-by-side! You can not do this in a normal text editor.

```text
jadi@funlife:~/w/lpic/101$ cat howcool
jadi    5
sina    6
rubic    2
you     12
jadi@funlife:~/w/lpic/101$ cat uses
you fedora
jadi ubuntu
rubic windows
neda mac
jadi@funlife:~/w/lpic/101$ paste howcool uses
jadi    5    you fedora
sina    6    jadi ubuntu
rubic    2    rubic windows
you     12    neda mac
```

### join

Our final field-manipulating command is join, which joins files based on a matching field. **The files should be sorted on the join field.**

```text
jadi@funlife:~/w/lpic/101$ cat howcool
jadi    5
sina    6
rubic    2
you     12
jadi@funlife:~/w/lpic/101$ cat uses
you fedora
jadi ubuntu
rubic windows
neda mac
jadi@funlife:~/w/lpic/101$ sort howcool > howcool.sorted
jadi@funlife:~/w/lpic/101$ sort uses  > uses.sorted
jadi@funlife:~/w/lpic/101$ join howcool.sorted uses.sorted
jadi 5 ubuntu
rubic 2 windows
you 12 fedora
```

> join does not work on numeric fields unless the fields are all the same length. It default delimiter is any white space \(TAB, space\) and it joins on first field. check `man join` for more info.

### sed

sed is **s**tream **ed**itor. It is POWERFUL and can do magic! Just like most of the tools we saw, sed can work as a filter or take its input from a file. It uses **regular expressions** and is a great tool for replacing text. If you need to replace A with B only once in each line in a stream you have to say `sed 's/A/B/'`:

```text
jadi@funlife:~/w/lpic/101$ cat uses
you fedora
jadi ubuntu
rubic windows
neda mac
jadi@funlife:~/w/lpic/101$ sed 's/ubuntu/debian/' uses
you fedora
jadi debian
rubic windows
neda mac
jadi@funlife:~/w/lpic/101$
```

the pattern for changing EVERY occurrence of A to B in a line is `sed 's/A/B/g'`.

Remember escape characters? They also work here and this will remove every _new line_ from a file and will replace it with a space:

```text
jadi@funlife:~/w/lpic/101$ cat mydata
hello
this is second line
but as you can see we are
still writing
and this is getting longer
.
.
and longer
and longer!
jadi@funlife:~/w/lpic/101$ sed 's/ /\t/g' mydata > mydata.tab
jadi@funlife:~/w/lpic/101$ cat mydata.tab
hello
this    is    second    line
but    as    you    can    see    we    are
still    writing
and    this    is    getting    longer
.
.
and    longer
and    longer!
```

