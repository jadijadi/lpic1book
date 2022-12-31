Title: 103.3 Perform basic file management
Date: 2010-12-03 10:20
Category: LPIC1
Tags: LPIC1, 101, LPIC1-101-500
Authors: Jadi
Summary: Candidates should be able to use the basic Linux commands to manage files and directories.
sortorder: 140

_Weight: 4_

Candidates should be able to use the basic Linux commands to manage files and directories.

## Objectives
* Copy, move and remove files and directories individually.
* Copy multiple files and directories recursively.
* Remove files and directories recursively.
* Use simple and advanced wildcard specifications in commands.
* Using find to locate and act on files based on type, size, or time.
* Usage of tar, cpio, and dd.

### Terms
- cp
- find
- mkdir
- mv
- ls
- rm
- rmdir
- touch
- tar
- cpio
- dd
- file
- gzip
- gunzip
- bzip2
- bunzip2
- xz
- unxz
- file globbing

<iframe width="560" height="315" src="https://www.youtube.com/embed/lTnkGg9o6u0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Wildcards and file globbing
File globbing is a shell capability that lets you tell things like :
- All files
- everything which starts with A
- all files with 3-letter names which end in A or B or C
- ...

To do so you need to know about these characters:

* `*` means **any string**
* `?` means any single character
* `[ABC]` matches A, B, or C
* `[a-k]` matches a, b, c, ..., k \(both lower-case and upper-case\)
* `[0-9a-z]` matches all digits and numbers
* `[!x]` means NOT X.

knowing these, you can create your patterns. For example:

| command | meaning |
| :--- | :--- |
| rm * | delete all files in this directory |
| ls A*B | show all files starting with A and ending with B |
| cp ???.* /tmp | Copy all files with 3 characters, then a dot then whatever (even nothing) to /tmp |
| rmdir [a-z\]* | remove all empty directories which start with a letter |

### general commands
#### listing with `ls`

`ls` used to _list_ directories & files. You can provide an absolute or relative path; if omitted the "." will be used as a target.

```text
jadi@lpicjadi:~/lpic1-practice-iso/100/103.3$ ls -ltrh
total 16K
-rw-rw-r-- 1 jadi jadi 207 Aug 14 04:43 tasks.txt
-rw-rw-r-- 1 jadi jadi  29 Aug 14 04:43 info.txt
-rw-rw-r-- 1 jadi jadi  24 Aug 14 04:44 data.txt
-rw-rw-r-- 1 jadi jadi 116 Aug 14 04:44 note_to_self
```

> First field indicates if this is a file (`-`) or directory (`d`).

Some common switches are:

* `-l` is for _long_ (more info for each file)
* `-1` will print one file per line
* `-t` sorts based on modification date
* `-r` reverses the search (so `-tr` is reverse time (newer files at the bottom).

> you can mix switches. A famous one is `-ltrh` (long + human readable sizes + reverse time).

### Copy (`cp`), Move (`mv`), and Delete (`rm`)
#### **cp**

This will _copy_ files from one place/name to another place/name. If the target is a directory, all sources will be copied there.

```text
cp source destination
```

A common switch is `-r` (or `-R`) which copies recursively (directories and their contents). So for copying a directory called `A` to `/tmp/` you can issue `cp -r A /tmp/`.


#### **mv**


Will _move_ or _rename_ files or directories. It works like `cp` command. If you are moving a file on the same file system, the **inode** won't change.

In general:

* If the target is an existing directory, then all sources are copied into the target
* If the target directory does not exist, then the source must be only one directory which will be renamed to the target directory.
* If the target is a file, then the source must be only one file so rename will happen.

These look like "formulas" but they are common sense!

#### **rm**

Removes (Deletes) **files**. You can do this recursively using the `-r` switch or even prevent it from checking for confirmations using `-f` (force) switch. So a `rm -rf /` means *delete everything from the file system*.

**notes**

Normally, the cp command will copy a file over an existing copy, if the existing file is writable. On the other hand, the `mv` will not move or rename a file if the target exists. Although this is highly dependent on your system's configuration. But in all cases, you can overcome this using the `-f` switch.

* `-f` (--force) will cause cp to try overwriting the target.
* `-i` (--interactive) will ask Y/N question (deleting / overwriting).
* `-b` (--backup) will make backups of overwritten files
* `-p` will _preserve_ the attributes.

### Creating (mkdir) and removing (rmdir) directories

The `mkdir` command creates directories.

```
jadi@lpicjadi:~/lpic1-practice-iso/100/103.3$ ls -ltrh
total 16K
-rw-rw-r-- 1 jadi jadi 207 Aug 14 04:43 tasks.txt
-rw-rw-r-- 1 jadi jadi  29 Aug 14 04:43 info.txt
-rw-rw-r-- 1 jadi jadi  24 Aug 14 04:44 data.txt
-rw-rw-r-- 1 jadi jadi 116 Aug 14 04:44 note_to_self
jadi@lpicjadi:~/lpic1-practice-iso/100/103.3$ mkdir new_dir
jadi@lpicjadi:~/lpic1-practice-iso/100/103.3$ ls -ltrh
total 20K
-rw-rw-r-- 1 jadi jadi  207 Aug 14 04:43 tasks.txt
-rw-rw-r-- 1 jadi jadi   29 Aug 14 04:43 info.txt
-rw-rw-r-- 1 jadi jadi   24 Aug 14 04:44 data.txt
-rw-rw-r-- 1 jadi jadi  116 Aug 14 04:44 note_to_self
drwxrwxr-x 2 jadi jadi 4.0K Aug 14 04:57 new_dir
```

If you want to create a tree of directories, you can use `-p` switch to tell the `mkdir` to create the *parent* directories if needed:

```text
jadi@lpicjadi:~/lpic1-practice-iso/100/103.3$ ls -ltrh
total 20K
-rw-rw-r-- 1 jadi jadi  207 Aug 14 04:43 tasks.txt
-rw-rw-r-- 1 jadi jadi   29 Aug 14 04:43 info.txt
-rw-rw-r-- 1 jadi jadi   24 Aug 14 04:44 data.txt
-rw-rw-r-- 1 jadi jadi  116 Aug 14 04:44 note_to_self
drwxrwxr-x 2 jadi jadi 4.0K Aug 14 04:57 new_dir
jadi@lpicjadi:~/lpic1-practice-iso/100/103.3$ mkdir -p 1/2/3 
jadi@lpicjadi:~/lpic1-practice-iso/100/103.3$ tree
.
├── 1
│   └── 2
│       └── 3
├── data.txt
├── info.txt
├── new_dir
├── note_to_self
└── tasks.txt
```

If you need to delete a directory the command is `rmdir` and you can also use the -p for nested removing:

```
jadi@lpicjadi:~/lpic1-practice-iso/100/103.3$ rmdir -p 1/2/3
jadi@lpicjadi:~/lpic1-practice-iso/100/103.3$ rmdir new_dir
jadi@lpicjadi:~/lpic1-practice-iso/100/103.3$ tree
.
├── data.txt
├── info.txt
├── note_to_self
└── tasks.txt

0 directories, 4 files
```

> If you are using `rmdir` to remove a directory, it *MUST BE EMPTY*! That's why many people use `rm -rf directory_name` to delete the not-empty directory and whatever is in it.

<iframe width="560" height="315" src="https://www.youtube.com/embed/tSN1MSaFYEw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

#### **touch**
The `touch` will create an empty file (if it does not exists) or updates the **modification** date of a file if it already exists. The default time is *now* but you can specify other times too.

```
jadi@lpicjadi:~/lpic1-practice-iso/100/103.3$ ls -ltrh
total 16K
-rw-rw-r-- 1 jadi jadi 207 Aug 14 04:43 tasks.txt
-rw-rw-r-- 1 jadi jadi  29 Aug 14 04:43 info.txt
-rw-rw-r-- 1 jadi jadi  24 Aug 14 04:44 data.txt
-rw-rw-r-- 1 jadi jadi 116 Aug 14 04:44 note_to_self
jadi@lpicjadi:~/lpic1-practice-iso/100/103.3$ touch new_file
jadi@lpicjadi:~/lpic1-practice-iso/100/103.3$ ls -ltrh
total 16K
-rw-rw-r-- 1 jadi jadi 207 Aug 14 04:43 tasks.txt
-rw-rw-r-- 1 jadi jadi  29 Aug 14 04:43 info.txt
-rw-rw-r-- 1 jadi jadi  24 Aug 14 04:44 data.txt
-rw-rw-r-- 1 jadi jadi 116 Aug 14 04:44 note_to_self
-rw-rw-r-- 1 jadi jadi   0 Aug 14 05:08 new_file
jadi@lpicjadi:~/lpic1-practice-iso/100/103.3$ touch note_to_self
jadi@lpicjadi:~/lpic1-practice-iso/100/103.3$ ls -ltrh
total 16K
-rw-rw-r-- 1 jadi jadi 207 Aug 14 04:43 tasks.txt
-rw-rw-r-- 1 jadi jadi  29 Aug 14 04:43 info.txt
-rw-rw-r-- 1 jadi jadi  24 Aug 14 04:44 data.txt
-rw-rw-r-- 1 jadi jadi   0 Aug 14 05:08 new_file
-rw-rw-r-- 1 jadi jadi 116 Aug 14 05:08 note_to_self
```

Or you can specify times. It is possible to use `-d` and give dates or use `-t` and give a timestamp in the form of `[[CC]YY]MMDDhhmm[.ss]`

```text
$ touch -t 200908121510.59 file1
$ touch -d 11am file2
$ touch -d "last fortnight" file3
$ touch -d "yesterday 6am" file4
$ touch -d "2 days ago 12:00" file5
$ touch -d "tomorrow 02:00" file6
$ touch -d "5 Nov" file3
$ ls -ltrh file?
-rw-rw-r-- 1 jadi jadi 0 Aug 12  2009 file1
-rw-rw-r-- 1 jadi jadi 0 Aug 12 12:00 file5
-rw-rw-r-- 1 jadi jadi 0 Aug 13 06:00 file4
-rw-rw-r-- 1 jadi jadi 0 Aug 14  2022 file2
-rw-rw-r-- 1 jadi jadi 0 Aug 15  2022 file6
-rw-rw-r-- 1 jadi jadi 0 Nov  5  2022 file3
```

Oh.. and it's possible to use another file's time to set, with switch `-r` (for --reference)):

```
jadi@lpicjadi:~/lpic1-practice-iso/100/103.3$ ls -l /etc/debian_version
-rw-r--r-- 1 root root 13 Aug 22  2021 /etc/debian_version
jadi@lpicjadi:~/lpic1-practice-iso/100/103.3$ touch -r /etc/debian_version file1
jadi@lpicjadi:~/lpic1-practice-iso/100/103.3$ ls -ltrh
total 20K
-rw-rw-r-- 1 jadi jadi   0 Aug 22  2021 file1
```

#### **file**

To determine the type of a file, you should use `file` command. It looks *into* the file and determines its type.

```
jadi@lpicjadi:~/lpic1-practice-iso/100/103.3$ file file1
file1: empty
jadi@lpicjadi:~/lpic1-practice-iso/100/103.3$ file note_to_self
note_to_self: ASCII text
jadi@lpicjadi:~/lpic1-practice-iso/100/103.3$ file /bin/bash
/bin/bash: ELF 64-bit LSB pie executable, x86-64, version 1 (SYSV), dynamically linked, interpreter /lib64/ld-linux-x86-64.so.2, BuildID[sha1]=33a5554034feb2af38e8c75872058883b2988bc5, for GNU/Linux 3.2.0, stripped
```

> `-i` switch prints the mime format

#### **dd**
The `dd` command copies data from its input to its output (say files or devices). You may use it just like copy:

```
jadi@lpicjadi:~/lpic1-practice-iso/100/103.3$ dd if=note_to_self of=new_file
0+1 records in
0+1 records out
116 bytes copied, 0.00141561 s, 81.9 kB/s
jadi@lpicjadi:~/lpic1-practice-iso/100/103.3$ cat new_file
I will continue learning... and if I get confused, I'll repeat the last section once more till everything is clear!
jadi@lpicjadi:~/lpic1-practice-iso/100/103.3$
```

* `if` is the Input File
* `of` is the Output File

But commonly people use it to read/write from block devices. For example, this will read all the sectors from the `/dev/sdb` and will write them to a file named`backup.dd`. Later you can restore this backup by swapping the `if` and `of` and writing from the `backup.dd` to `/dev/sdb`. 


```
# dd if=/dev/sda of=backup.dd bs=4096
```

or even:

```
# dd if=/dev/sda2 | gzip > backup.dd.gzip
```

Another common usage is creating files of specific sizes:

```
$ dd if=/dev/zero of=1g.bin bs=1G count=1
```

or even *writing* your iso files to a USB disk to have a live bootable USB:

```
$ sudo dd if=ubuntu.iso of=/dev/sdc bs=2048
```

> Caution: here you are writing directly on a block device. If you do something wrong... you will ruin your disk and need to reformat it.
#### **find**
The `find` command helps us to find files based on different criteria. Look at this:

```
$ find . -iname "[a-j]*"
./howcool.sort
./alldata
./mydir/howcool.sort
./mydir/newDir/insideNew
./howcool
```

* The first parameter says where should we search (including subdirectories).
* The `-name` switch indicates the criteria (here `iname` means search files with this name and ignore the character cases (z equals Z)). 

Another common switch is `-type` to indicate the type we are searching for (`f` for regular files, `d` for directories, and `l` for symbolic links):

```
jadi@lpicjadi:~/lpic1-practice-iso/100/103.3$ find . -type d -iname "[a-j]*"
./directory
./directory/innder_one
```

if you want to search for file sizes do as below:

| command | meaning |
| :--- | :--- |
| -size 100c | files which are exactly 100 characters/bytes (you can also use `b`) |
| -size +100k | files which are more than 100 kilobytes |
| -size -20M | files smaller than 20Megabytes |
| -size +2G | files bigger than 2Gigabytes |

So this will find all files ending in _tmp_ with sizes between 1M and 100M in /var/ directory:

```text
find /var -iname '*tmp' -size +1M -size -100M
```

> you can find all empty files with `find . -size 0b` or `find . -empty`


Another useful search criterion is time. These are some of the options:

| switch | meaning | samples |
| :--- | :--- | :--- |
| -amin | Access Minutes | `-amin 40` means "files accessed exactly 40min ago" or `-amin +40` mins files accessed more than 40min ago and `-amin -40` means files accessed less than 40min ago|
| -cmin | Status Change Min | `-cmin +60` file status changed before last hour |
| -mmin | Modified Minutes | `-mmin -60` will give us files modified in last hour |
| -atime | access time in days | `-atime +1` means files access "more than 1 days ago (which means 2 days and more)|
| -ctime | Status Changed in Days ||
| -mtime | Modified days | |
| -newer | Newer than reference | `-newer file1` will give you files which are newer than file1 |


> if you add `-daystart` switch to -mtime or -atime it means that we want to consider days as calendar days, starting at midnight.


#### Acting on files

We can execute commands or do other actions on files with various switches:

| switch | meaning |
| :--- | :--- |
| -ls | will run ls -dils on each file |
| -print | will print the full name of the files on each line |

But the best way to run commands on found files is `-exec` switch. You can point to the file with `'{}'` or `{}` and finish your command with `\;`.

For example, This will remove all empty files in this directory and its subdirectories:

```
find . -empty -exec rm '{}' \;
```

or this will rename all htm files to html

```
find . -name "*.htm" -exec mv '{}' '{}l' \;
```
> since deleting found files is a common task, there is a switch for it: `-delete`


<iframe width="560" height="315" src="https://www.youtube.com/embed/6MLaCDTRgis" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

### Compression
#### **gzip & gunzip**
Straight forward, one gzips file and one ungzips file; In place:
```
jadi@lpicjadi:~/lpic1-practice-iso/100/103.3$ ls -ltrh
total 20K
-rw-rw-r-- 1 jadi jadi  207 Aug 14 04:43 tasks.txt
-rw-rw-r-- 1 jadi jadi   29 Aug 14 04:43 info.txt
-rw-rw-r-- 1 jadi jadi   24 Aug 14 04:44 data.txt
-rw-rw-r-- 1 jadi jadi    0 Aug 14 05:08 new_file
-rw-rw-r-- 1 jadi jadi  116 Aug 14 05:08 note_to_self
drwxrwxr-x 3 jadi jadi 4.0K Aug 14 05:20 directory
jadi@lpicjadi:~/lpic1-practice-iso/100/103.3$ ls -ltrh
total 20K
-rw-rw-r-- 1 jadi jadi  171 Aug 14 04:43 tasks.txt.gz
-rw-rw-r-- 1 jadi jadi   29 Aug 14 04:43 info.txt
-rw-rw-r-- 1 jadi jadi   24 Aug 14 04:44 data.txt
-rw-rw-r-- 1 jadi jadi    0 Aug 14 05:08 new_file
-rw-rw-r-- 1 jadi jadi  116 Aug 14 05:08 note_to_self
drwxrwxr-x 3 jadi jadi 4.0K Aug 14 05:20 directory
jadi@lpicjadi:~/lpic1-practice-iso/100/103.3$ gunzip tasks.txt.gz
jadi@lpicjadi:~/lpic1-practice-iso/100/103.3$ ls -ltrh
total 20K
-rw-rw-r-- 1 jadi jadi  207 Aug 14 04:43 tasks.txt
-rw-rw-r-- 1 jadi jadi   29 Aug 14 04:43 info.txt
-rw-rw-r-- 1 jadi jadi   24 Aug 14 04:44 data.txt
-rw-rw-r-- 1 jadi jadi    0 Aug 14 05:08 new_file
-rw-rw-r-- 1 jadi jadi  116 Aug 14 05:08 note_to_self
drwxrwxr-x 3 jadi jadi 4.0K Aug 14 05:20 directory
```

* gzip preserves time
* gzip creates the new compressed file with the same name but with .gz ending
* gzip removes the original files after creating the compressed file (you can keep the input file with `-k` switch)



#### **bzip2 & bunzip2**

The `bzip2` is another compressing tool. Works just like the famous `gzip` but with a different compression algorithm.

```
jadi@lpicjadi:~/lpic1-practice-iso/100/103.3$ bzip2 tasks.txt
jadi@lpicjadi:~/lpic1-practice-iso/100/103.3$ ls  -ltrh
total 20K
-rw-rw-r-- 1 jadi jadi  172 Aug 14 04:43 tasks.txt.bz2
-rw-rw-r-- 1 jadi jadi   29 Aug 14 04:43 info.txt
-rw-rw-r-- 1 jadi jadi   24 Aug 14 04:44 data.txt
-rw-rw-r-- 1 jadi jadi    0 Aug 14 05:08 new_file
-rw-rw-r-- 1 jadi jadi  116 Aug 14 05:08 note_to_self
drwxrwxr-x 3 jadi jadi 4.0K Aug 14 05:20 directory
jadi@lpicjadi:~/lpic1-practice-iso/100/103.3$ bunzip2 tasks.txt.bz2
jadi@lpicjadi:~/lpic1-practice-iso/100/103.3$ ls
data.txt  directory  info.txt  new_file  note_to_self  tasks.txt
```

#### **xz & unxz**

Another compression/decompression tool is just like `gzip` and `bzip2`. 

```
jadi@lpicjadi:~/lpic1-practice-iso/100/103.3$ xz tasks.txt
jadi@lpicjadi:~/lpic1-practice-iso/100/103.3$ ls -ltrh
total 24K
-rw-rw-r-- 1 jadi jadi  224 Aug 14 04:43 tasks.txt.xz
-rw-rw-r-- 1 jadi jadi   29 Aug 14 04:43 info.txt
-rw-rw-r-- 1 jadi jadi   24 Aug 14 04:44 data.txt
-rw-rw-r-- 1 jadi jadi  116 Aug 14 05:08 note_to_self
drwxrwxr-x 3 jadi jadi 4.0K Aug 14 05:20 directory
-rw-rw-r-- 1 jadi jadi  116 Aug 14 07:51 new_file
jadi@lpicjadi:~/lpic1-practice-iso/100/103.3$ unxz tasks.txt.xz
jadi@lpicjadi:~/lpic1-practice-iso/100/103.3$ ls -ltrh
total 24K
-rw-rw-r-- 1 jadi jadi  207 Aug 14 04:43 tasks.txt
-rw-rw-r-- 1 jadi jadi   29 Aug 14 04:43 info.txt
-rw-rw-r-- 1 jadi jadi   24 Aug 14 04:44 data.txt
-rw-rw-r-- 1 jadi jadi  116 Aug 14 05:08 note_to_self
drwxrwxr-x 3 jadi jadi 4.0K Aug 14 05:20 directory
-rw-rw-r-- 1 jadi jadi  116 Aug 14 07:51 new_file
```

Please note that *compressing* a small text file makes it larger. This is *normal* in small files because of all the headers and metadata.

> In some cases, commands like `unxz` is just a calls to `xz --dcompress`


### Archiving with tar & cpio

Sometimes we need to create an archive file container of many other files. This operation is different than compressing, it combines files into one and then extracts them again. Archiving is mostly used in backups, moving files to a new location (say via email), and such. This is done with `cpio` and `tar`.

#### **tar**

TapeARchive or tar is the most common archiving tool. It automatically creates an archive file from a directory and all its subdirs.

Common switches are:

| switch | meanint |
| :--- | :--- |
| -cf `myarchive.tar` | create file named myarchive.tar |
| -xf `myarchive.tar` | extract a file named myarchive.tar |
| -z | compress the archive with gzip after creating it |
| -b | compress the archive with bzip2 after creating it |
| -v | verbose! print a lot of data about what is happening |
| -r | append new files to the currently available archive |

> If you issue absolute paths, tar removes the starting slash \(/\) for safety reasons when creating an archive. If you want to override, use -p option.
>
> tar can work with tapes and other storages. That's why we use `-f` to tell it that we are working with files.

#### **cpio**

Gets a list of files and creates an archive (one file). This file can be used later to extract the original files.

```
$ ls | cpio -o > allfilesls.cpio
3090354 blocks
```

* `-o` tells cpio to create an output from its input

Please note that `cpio` does not look into the folders. So mostly we use it with find:

```
find . -name "*" | cpio -o > myarchivefind.cpio
```

To extract the original files:

```
mkdir extract
mv myarchivefind.cpio extract
cd extract
cpio -id < myarchivefind.cpio
```

* `-d` will create the folders
* `-i` is for extract
