# 103.3 Perform basic file management

** Weight: 4 **

Candidates should be able to use the basic Linux commands to manage files and directories.

## Objectives

- Copy, move and remove files and directories individually.
- Copy multiple files and directories recursively.
- Remove files and directories recursively.
- Use simple and advanced wildcard specifications in commands.
- Using find to locate and act on files based on type, size, or time.
- Usage of tar, cpio and dd.


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
- file globbing

## ls
Is used to *list* directories & files. It can use absolute and relative paths

````
jadi@funlife:~/w/lpic/101$ ls -l
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
````

> First field indicates if this is a file (-) or directory (d). 

- ````-l```` is for *long* (more info for each file)
- ````-1```` will print one file per line
- ````-t```` sorts based on modification date
- ````-r```` reverses the search (so -tr is reverse time (newer files at the bottom).

> you can always mix switches. A famouse one is ````-ltrh```` (long+human readable sizes+reverse time).

## Copying, Moving & Deleting

#### cp
This will *copy* files from one place / name to another place / name. it works like:

````
cp source destination
````

- If the target is an existing directory, then all sources are copied into the target
- If the target is a directory that does not exist, then the (single) source must also be a directory and a copy of the source directory and its contents is made with the target name as the new name
- If the target is a file, then the (single) source must also be a file and a copy of the source file is made with the target name as the new name, replacing any existing file of the same name.

> Use common sense!

#### mv
Will *move* or *rename* files or directories. It works like ````cp```` command. If you are moving a file on the same file system, the **inode** wont change.

#### rm
Removes (Deletes) **files**. 

### General notes
Normally, the cp command will copy a file over an existing copy, if the existing file is writable. On the other hand, the mv will not move or rename a file if the target exists. You can overcome this using the ````-f```` switch.

- ````-f```` (--force) will cause cp to try overwrite the target.
- ````-i```` (--interactive) will ask Y/N question (deleting / overwriting). 
- ````-b```` (--backup) will make backups of overwitten files
- ````-p```` will *preserve* the attribites.

## Creating and removing directories
The ````mkdir```` command creates directories. 

````
jadi@funlife:~/w/lpic/101/mydir$ ls
howcool.sort  uses.sort
jadi@funlife:~/w/lpic/101/mydir$ mkdir dirA dirB
jadi@funlife:~/w/lpic/101/mydir$ ls -ltrh 
total 16K
-rw-rw-r-- 1 jadi jadi   30 Jan  8 16:45 howcool.sort
-rw-rw-r-- 1 jadi jadi   58 Jan  8 16:45 uses.sort
drwxrwxr-x 2 jadi jadi 4.0K Jan  8 17:11 dirB
drwxrwxr-x 2 jadi jadi 4.0K Jan  8 17:11 dirA
````

- ````-p```` will create nested directories:

````
jadi@funlife:~/w/lpic/101/mydir$ mkdir newDir/insideNew/lastDir
mkdir: cannot create directory ‘newDir/insideNew/lastDir’: No such file or directory
jadi@funlife:~/w/lpic/101/mydir$ mkdir -p newDir/insideNew/lastDir
jadi@funlife:~/w/lpic/101/mydir$ ls newDir/insideNew/ -ltrh
total 4.0K
drwxrwxr-x 2 jadi jadi 4.0K Jan  8 17:13 lastDir
````

If you need to delete a directory the command is ````rmdir```` and you can also use the -p for nested removing:

````
jadi@funlife:~/w/lpic/101/mydir$ tree
.
├── dirA
├── dirB
├── howcool.sort
└── uses.sort

2 directories, 2 files
jadi@funlife:~/w/lpic/101/mydir$ rmdir dirA dirB
jadi@funlife:~/w/lpic/101/mydir$ mkdir -p newDir/insideNew/lastDir
jadi@funlife:~/w/lpic/101/mydir$ tree
.
├── howcool.sort
├── newDir
│   └── insideNew
│       └── lastDir
└── uses.sort

3 directories, 2 files
jadi@funlife:~/w/lpic/101/mydir$ rmdir -p newDir/insideNew/lastDir
jadi@funlife:~/w/lpic/101/mydir$ tree
.
├── howcool.sort
└── uses.sort

0 directories, 2 files
````

> If you are using ````rmdir```` to remove a directory, it HAVE TO BE EMPTY! althouth later we will see how you can erase directories using ````rm```` command.

## Handling multiple files at once
Most of the times we need to work with more than one file. This is *Linux* and there are ways!

#### Recursive commands
Recursive means going inside and inside and inside and inside! In many commands -r or -R is dedicated to recursive commands. Say ls. It uses -R : 

````
jadi@funlife:~/w/lpic/101/mydir$ ls
howcool.sort  newDir  uses.sort
jadi@funlife:~/w/lpic/101/mydir$ ls -R
.:
howcool.sort  newDir  uses.sort

./newDir:
insideNew  TestFile

./newDir/insideNew:
lastDir

./newDir/insideNew/lastDir:
````

It is more useful when you are copying or deleting. When using ````cp```` or ````rm````, -r (or -R or --recursive) will copy/delete all files inside the given source. 

````
jadi@funlife:~/w/lpic/101$ tree mydir
mydir
├── howcool.sort
├── newDir
│   ├── insideNew
│   │   └── lastDir
│   └── TestFile
└── uses.sort

3 directories, 3 files
jadi@funlife:~/w/lpic/101$ mkdir newCopy
jadi@funlife:~/w/lpic/101$ cp mydir newCopy
cp: omitting directory ‘mydir’
jadi@funlife:~/w/lpic/101$ cp -r mydir newCopy
jadi@funlife:~/w/lpic/101$ tree newCopy/
newCopy/
└── mydir
    ├── howcool.sort
    ├── newDir
    │   ├── insideNew
    │   │   └── lastDir
    │   └── TestFile
    └── uses.sort

4 directories, 3 files
````

Same works with ````rm````:

````
jadi@funlife:~/w/lpic/101$ rm newCopy
rm: cannot remove ‘newCopy’: Is a directory
jadi@funlife:~/w/lpic/101$ rm -r newCopy
````

As you can see we can not ````rm```` a file but if using -r (or -R or --recursive) it works because it deletes the dir and whatever inside it.

> ````rm -rf /```` is EXTREMELY DANGEOUS: force delete wharever in /

#### Wildcards and globbing
This is a way to say **All files** or **everything which starts with A** or **all files with 3 letter names which end in A or B or C**. 

There are main cases:

- ````*```` means **any string**
- ````?```` means any single character
- ````[ABC]```` matches A, B & C
- ````[a-k]```` matches a, b, c, ..., k
- ````[0-9a-zA-Z]```` matches all digits and numbers
- ````[!x]```` means NOT X.

So... this means that you can use these patterns in your commands to point to these files:

|command|meaning|
|---|---|
|rm *|delete all files|
|ls A*B|all files starting with A ending with B|
|cp ???.* /tmp|Copy all files with 3 characters, then a dot then whatever (even nothing) to /tmp|
|rmdir [a-zA-z]*|remove all directories which start with a letter|

## touch
The ````touch```` command with no option will update the **moditication** date of a file to the current time (will create a file if it is not presented).

````
jadi@funlife:~/w/lpic/101/touch$ ls -l
total 0
-rw-rw-r-- 1 jadi jadi 0 Jan  8 17:47 myfile
jadi@funlife:~/w/lpic/101/touch$ touch myfile  #after a minute
jadi@funlife:~/w/lpic/101/touch$ ls -l
total 0
-rw-rw-r-- 1 jadi jadi 0 Jan  8 17:48 myfile
````

There are also possible:

````
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
````

and the most advanced way is setting time of a file based on another file:

````
[ian@echidna lpi103-2]$ date
Fri Aug 14 18:33:48 EDT 2009
[ian@echidna lpi103-2]$ date -r f1
Fri Aug 14 18:25:50 EDT 2009
[ian@echidna lpi103-2]$ touch -r f1 f1a
[ian@echidna lpi103-2]$ ls -l f1*
-rw-rw-r--. 1 ian ian 4 2009-08-14 18:25 f1
-rw-rw-r--. 1 ian ian 0 2009-08-14 18:25 f1a
````

## Finding files
The ````find```` command 
