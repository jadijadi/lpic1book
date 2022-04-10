Title: 103.3 Perform basic file management
Date: 2010-12-03 10:20
Category: LPIC1
Tags: LPIC1, 101, LPIC1-101-500
Authors: Jadi
Summary: Candidates should be able to use the basic Linux commands to manage files and directories.
sortorder: 140

_Weight: 4_

Candidates should be able to use the basic Linux commands to manage files and directories.

### Objectives

* Copy, move and remove files and directories individually.
* Copy multiple files and directories recursively.
* Remove files and directories recursively.
* Use simple and advanced wildcard specifications in commands.
* Using find to locate and act on files based on type, size, or time.
* Usage of tar, cpio and dd.
* cp
* find
* mkdir
* mv
* ls
* rm
* rmdir
* touch
* tar
* cpio
* dd
* file
* gzip
* gunzip
* bzip2
* file globbing

### ls

Is used to _list_ directories & files. It can use absolute and relative paths

```text
$ ls -l
total 52
-rw-rw-r-- 1 jadi jadi  146 Jan  5 08:29 alldata
-rw-rw-r-- 1 jadi jadi   30 Jan  5 09:15 howcool.sort
-rw-rw-r-- 1 jadi jadi  204 Jan  5 08:49 mydata
-rw-rw-r-- 1 jadi jadi  121 Jan  4 22:07 mydata.tab
drwxrwxr-x 2 jadi jadi 4096 Jan  8 16:45 mydir
-rw-rw-r-- 1 jadi jadi   70 Jan  5 08:28 myfiles
drwxrwxr-x 2 jadi jadi 4096 Jan  8 16:46 newdir
-rw-rw-r-- 1 jadi jadi   23 Jan  5 09:06 sorttest.txt
-rw-rw-r-- 1 jadi jadi   58 Jan  5 09:14 uses
```

> First field indicates if this is a file \(-\) or directory \(d\).

* `-l` is for _long_ \(more info for each file\)
* `-1` will print one file per line
* `-t` sorts based on modification date
* `-r` reverses the search \(so -tr is reverse time \(newer files at the bottom\).

> you can always mix switches. A famous one is `-ltrh` \(long+human readable sizes+reverse time\).

### Copying, Moving & Deleting

**cp**

This will _copy_ files from one place / name to another place / name. If the target is a directory, all sources will be copied there.

```text
cp source destination
```

**mv**

Will _move_ or _rename_ files or directories. It works like `cp` command. If you are moving a file on the same file system, the **inode** wont change.

In general:

* If the target is an existing directory, then all sources are copied into the target
* If the target is a directory that does not exist, then the \(single\) source must also be a directory and a copy of the source directory and its contents is made with the target name as the new name
* If the target is a file, then the \(single\) source must also be a file and a copy of the source file is made with the target name as the new name, replacing any existing file of the same name.

But use common sense when answering questions or using `cp` and `mv` in real life.

**rm**

Removes \(Deletes\) **files**.

#### General notes

Normally, the cp command will copy a file over an existing copy, if the existing file is writable. On the other hand, the `mv` will not move or rename a file if the target exists. Although this is highly dependent on your systems configuration. But in all cases you can overcome this using the `-f` switch.

* `-f` \(--force\) will cause cp to try overwrite the target.
* `-i` \(--interactive\) will ask Y/N question \(deleting / overwriting\).
* `-b` \(--backup\) will make backups of overwritten files
* `-p` will _preserve_ the attributes.

### Creating and removing directories

The `mkdir` command creates directories.

```text
$ ls
howcool.sort  uses.sort
$ mkdir dirA dirB
$ ls -ltrh
total 16K
-rw-rw-r-- 1 jadi jadi   30 Jan  8 16:45 howcool.sort
-rw-rw-r-- 1 jadi jadi   58 Jan  8 16:45 uses.sort
drwxrwxr-x 2 jadi jadi 4.0K Jan  8 17:11 dirB
drwxrwxr-x 2 jadi jadi 4.0K Jan  8 17:11 dirA
```

* `-p` will create nested directories:

```text
$ mkdir newDir/insideNew/lastDir
mkdir: cannot create directory ‘newDir/insideNew/lastDir’: No such file or directory
$ mkdir -p newDir/insideNew/lastDir
$ ls newDir/insideNew/ -ltrh
total 4.0K
drwxrwxr-x 2 jadi jadi 4.0K Jan  8 17:13 lastDir
```

If you need to delete a directory the command is `rmdir` and you can also use the -p for nested removing:

```text
$ tree
.
├── dirA
├── dirB
├── howcool.sort
└── uses.sort

2 directories, 2 files
$ rmdir dirA dirB
$ mkdir -p newDir/insideNew/lastDir
$ tree
.
├── howcool.sort
├── newDir
│   └── insideNew
│       └── lastDir
└── uses.sort

3 directories, 2 files
$ rmdir -p newDir/insideNew/lastDir
$ tree
.
├── howcool.sort
└── uses.sort

0 directories, 2 files
```

> If you are using `rmdir` to remove a directory, it MUST BE EMPTY! although later we will see how you can erase directories using `rm` command.

### Handling multiple files at once

Most of the times we need to work with more than one file. This is _Linux_ and there are ways!

**Recursive commands**

Recursive means going inside and inside and inside and inside! In many commands -r or -R is dedicated to recursive commands. Say ls. It uses -R :

```text
$ ls
howcool.sort  newDir  uses.sort
$ ls -R
.:
howcool.sort  newDir  uses.sort

./newDir:
insideNew  TestFile

./newDir/insideNew:
lastDir

./newDir/insideNew/lastDir:
```

It is more useful when you are copying or deleting. When using `cp` or `rm`, -r \(or -R or --recursive\) will copy/delete all files inside the given source.

```text
$ tree mydir
mydir
├── howcool.sort
├── newDir
│   ├── insideNew
│   │   └── lastDir
│   └── TestFile
└── uses.sort

3 directories, 3 files
$ mkdir newCopy
$ cp mydir newCopy
cp: omitting directory ‘mydir’
$ cp -r mydir newCopy
$ tree newCopy/
newCopy/
└── mydir
    ├── howcool.sort
    ├── newDir
    │   ├── insideNew
    │   │   └── lastDir
    │   └── TestFile
    └── uses.sort

4 directories, 3 files
```

Same works with `rm`:

```text
$ rm newCopy
rm: cannot remove ‘newCopy’: Is a directory
$ rm -r newCopy
```

As you can see we can not `rm` a folder but if using -r \(or -R or --recursive\) it works because it deletes the dir and whatever inside it.

> `rm -rf /` is EXTREMELY DANGEROUS: force delete whatever in /

**Wildcards and globbing**

This is a way to say **All files** or **everything which starts with A** or **all files with 3 letter names which end in A or B or C**.

There are main cases:

* `*` means **any string**
* `?` means any single character
* `[ABC]` matches A, B & C
* `[a-k]` matches a, b, c, ..., k \(both lower-case and capital\)
* `[0-9a-z]` matches all digits and numbers
* `[!x]` means NOT X.

So... this means that you can use these patterns in your commands to point to these files:

| command | meaning |
| :--- | :--- |
| rm \* | delete all files |
| ls A\*B | all files starting with A ending with B |
| cp ???.\* /tmp | Copy all files with 3 characters, then a dot then whatever \(even nothing\) to /tmp |
| rmdir \[a-z\]\* | remove all directories which start with a letter |

### touch

The `touch` command with no option will update the **modification** date of a file to the current time \(will create a file if it is not exists\).

```text
/touch$ ls -l
total 0
-rw-rw-r-- 1 jadi jadi 0 Jan  8 17:47 myfile
/touch$ touch myfile  #after a minute
/touch$ ls -l
total 0
-rw-rw-r-- 1 jadi jadi 0 Jan  8 17:48 myfile
```

There are also possible:

```text
[ian@echidna lpi103-2]$ touch -t 200908121510.59 f3
[ian@echidna lpi103-2]$ touch -d 11am f4
[ian@echidna lpi103-2]$ touch -d "last fortnight" f5
[ian@echidna lpi103-2]$ touch -d "yesterday 6am" f6
[ian@echidna lpi103-2]$ touch -d "2 days ago 12:00" f7
[ian@echidna lpi103-2]$ touch -d "tomorrow 02:00" f8
[ian@echidna lpi103-2]$ touch -d "5 Nov" f9
[ian@echidna lpi103-2]$ ls -lrt f*
-rw-rw-r--. 1 ian ian 0 2009-07-31 18:31 f5
-rw-rw-r--. 1 ian ian 0 2009-08-12 12:00 f7
-rw-rw-r--. 1 ian ian 0 2009-08-12 15:10 f3
-rw-rw-r--. 1 ian ian 0 2009-08-13 06:00 f6
-rw-rw-r--. 1 ian ian 0 2009-08-14 11:00 f4
-rw-rw-r--. 1 ian ian 4 2009-08-14 18:25 f1
-rw-rw-r--. 1 ian ian 0 2009-08-14 18:27 f2
-rw-rw-r--. 1 ian ian 0 2009-08-15 02:00 f8
-rw-rw-r--. 1 ian ian 0 2009-11-05 00:00 f9
```

and the most advanced way is setting time of a file based on another file:

```text
[ian@echidna lpi103-2]$ date
Fri Aug 14 18:33:48 EDT 2009
[ian@echidna lpi103-2]$ date -r f1
Fri Aug 14 18:25:50 EDT 2009
[ian@echidna lpi103-2]$ touch -r f1 f1a
[ian@echidna lpi103-2]$ ls -l f1*
-rw-rw-r--. 1 ian ian 4 2009-08-14 18:25 f1
-rw-rw-r--. 1 ian ian 0 2009-08-14 18:25 f1a
```

### Finding files

The `find` command helps us to find files based on MANY criteria. Look at this:

```text
$ find . -iname "[a-j]*"
./howcool.sort
./alldata
./mydir/howcool.sort
./mydir/newDir/insideNew
./howcool
```

* the first parameter says where should be searched \(with subdirectories\).
* the `-name` switch indicates the criteria \(here iname: searching for files with this name\).

a common switch is `-iname` which says "name but case is not important \(z is same as Z\)". Also `-d` is commonly used:

```text
$ find . -iname "*my*"
./myfiles
./mydata.noenter
./mydata
./mydir
./mydir/hereisMYfile.txt
./touch/myfile
./mydata.tab
$ find . -type f -iname "*my*"
./myfiles
./mydata.noenter
./mydata
./mydir/hereisMYfile.txt
./touch/myfile
./mydata.tab
```

These are the most common file types:

* `-type f` will search for a regular file
* `-type d` will search for a directory
* `-type l` will search for a symbolic link

you can also search for file sizes:

| command | meanint |
| :--- | :--- |
| -size 100c | files which are exactly 100 bytes \(you can also use **b** |
| -size +100k | files which are more than 100 kilobytes |
| -size -20M | files smaller than 20Megabytes |
| -size +2G | files bigger than 2Gigabytes |

So this will find all files ending in _tmp_ with size between 1M and 100M in /var/ directory:

```text
find /var -iname '*tmp* -size +1M -size -100M
```

> you can find all empty files with `find . -size 0b` or `find . -empty`

**Acting on files**

We can act on files with various switches:

| switch | meanint |
| :--- | :--- |
| -ls | will run ls -dils on each file |
| -print | will print the full name of the files on each line |

But the best way to run commands on found files is `-exec` switch. You can point to the file with **'{}'** or **{}** and finish your command with **\;**.

This will remove all empty files in this directory and its subdirectories:

```text
find . -empty -exec rm '{}' \;
```

or this will rename all htm files to html

```text
find . -name "*.htm" -exec mv '{}' '{}l' \;
```

At last you have to know the `-mtime` switch for finding files based on their time.

| switch | meanint |
| :--- | :--- |
| -atime -6 | file was last accessed less than 6\*24 hours ago |
| -ctime +6 | file was changed more than 6\*24 hours ago |
| -mtime -6 | file _content_ moditication less than time is 6\*24 ago |
| -mmin -90 | file's data was last modified less than 90 minutes ago |
| -amin, -cmin | you guess! |

> if you add `-daystart` switch to -mtime or -atime it means that we want to consider days as calendar days, starting at midnight.

### Identify a file

That is the `file` command:

```text
$ file mydata.tab
mydata.tab: ASCII text
$ file /bin/bash
/bin/bash: ELF 64-bit LSB executable, x86-64, version 1 (SYSV), dynamically linked (uses shared libs), for GNU/Linux 2.6.32, BuildID[sha1]=cb63ec0718f2022619814c04a5b6cd8a36752a83, stripped
$ file mydata.tab
mydata.tab: ASCII text
$ file /bin/bash
/bin/bash: ELF 64-bit LSB executable, x86-64, version 1 (SYSV), dynamically linked (uses shared libs), for GNU/Linux 2.6.32, BuildID[sha1]=cb63ec0718f2022619814c04a5b6cd8a36752a83, stripped
$ file -i mydir
mydir: inode/directory; charset=binary
```

> -i switch prints the complete mime format

### Compressing files

Compressing works best on text files.

**zip**

we mostly use `gzip` and `gunzip` in linux. It is very easy:

```text
$ ls *  -ltrh
-rw-r--r-- 1 jadi jadi  79K Dec 22 11:52 The.Equalizer.2014.1080p.BluRay.x264.anoXmous_eng.srt
$ gzip  The.Equalizer.2014.1080p.BluRay.x264.anoXmous_eng.srt
$ ls *  -ltrh
-rw-r--r-- 1 jadi jadi  30K Dec 22 11:52 The.Equalizer.2014.1080p.BluRay.x264.anoXmous_eng.srt.gz
$ gunzip The.Equalizer.2014.1080p.BluRay.x264.anoXmous_eng.srt.gz
$ ls *  -ltrh
-rw-r--r-- 1 jadi jadi  79K Dec 22 11:52 The.Equalizer.2014.1080p.BluRay.x264.anoXmous_eng.srt
```

* gzip preserves time
* gzip creates the new compressed file with the same name but with .gz ending
* gzip removes the original files after creating the compressed file

**bzip2**

is another compressing tool. Works just the same but with another compression algorithm.

```text
$ ls *  -ltrh
-rw-r--r-- 1 jadi jadi  79K Dec 22 11:52 The.Equalizer.2014.1080p.BluRay.x264.anoXmous_eng.srt
$ bzip2 The.Equalizer.2014.1080p.BluRay.x264.anoXmous_eng.srt
$ ls *  -ltrh
-rw-r--r-- 1 jadi jadi  22K Dec 22 11:52 The.Equalizer.2014.1080p.BluRay.x264.anoXmous_eng.srt.bz2
$ bunzip2 The.Equalizer.2014.1080p.BluRay.x264.anoXmous_eng.srt.bz2
$ ls *  -ltrh
-rw-r--r-- 1 jadi jadi  79K Dec 22 11:52 The.Equalizer.2014.1080p.BluRay.x264.anoXmous_eng.srt
```

### Archiving files

Sometimes we need to create an archive file from many files for easier moving or backing up. This is done with `cpio` and `tar`.

**tar**

TapeARchive or tar is the most common archiving tool. In automatically create an archive file from a directory and all its subdirs.

Common switches are

| switch | meanint |
| :--- | :--- |
| -cf myarchive.tar | create file named myarchive.tar |
| -xf myarchive.tar | extract a file called myarchive.tar |
| -z | compress the archive with gzip after creating it |
| -b | compress the archive with bzip2 after creating it |
| -v | verbose! print a lot of data about what you are doing |
| -r | append new files to the currentyp available archive |

> If you issue absolute paths, tar removes the starting slash \(/\) for safety reasons when creating an archive. If you want to override, use -p option.
>
> tar can work with tapes and other storages. Thats why we use `-f` to tell it that we are working with files.

**cpio**

Gets a list of files and creates archive \(one file\) of it which can be opened later.

```text
$ ls | cpio -o > allfilesls.cpio
3090354 blocks
```

* `-o` makes cpio to create an output from its input
* cpio does not goes into the folders. So mostly we use it with find:

```text
find . -name "*" | cpio -o > myarchivefind.cpio
```

to decompress it:

```text
mkdir extract
mv myarchivefind.cpio extract
cd extract
cpio -id < myarchivefind.cpio
```

* `-d` will create the folders
* `-i` is for extract

### dd

The `dd` command copies data from one location to another. This data comes from files. You can use it just like copy:

```text
$ cat howcool
jadi    5
sina    6
rubic    2
you     12
$ dd if=howcool of=newcool
0+1 records in
0+1 records out
30 bytes (30 B) copied, 0.0227904 s, 1.3 kB/s
$ cat newcool
jadi    5
sina    6
rubic    2
you     12
$
```

* `if` is In File
* `of` is Out File

But it is used in many other cases specially writing directly to block devices such as /dev/sdb or changing data to upper/lower case.

This will backup my whole hard to a file:

```text
# dd if=/dev/sda of=backup.dd bs=4096
```

or better:

```text
# dd if=/dev/sda2 |gzip >backup.dd.gzip
```

Another common usage is creating files of specific size:

```text
$ dd if=/dev/zero of=1g.bin bs=1G count=1
```

.

.

.

.

.

.

.

.

.

.

.
