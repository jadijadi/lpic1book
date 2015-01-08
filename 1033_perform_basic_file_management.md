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

###