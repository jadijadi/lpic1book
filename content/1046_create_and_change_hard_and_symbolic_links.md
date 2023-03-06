Title: 104.6 Create and change hard and symbolic links
Date: 2010-12-03 10:20
Category: LPIC1
Tags: LPIC1, 101, LPIC1-101-500
Authors: Jadi
sortorder: 250
Summary: 

_weight: 2_

Candidates should be able to create and manage hard and symbolic links to a file.

### Key Knowledge Areas

* Create links.
* Identify hard and/or softlinks.
* Copying versus linking files.
* Use links to support system administration tasks.


* ln
* unlink

## links

On a storage device, a file or directory is save on some black and a reference to is is saved in the FAT, ext, ... allocation table alongside data about its owner, permissions, when it was last accessed, its size and such. As you already know, we can check this using the `ls` command.

```
$ ls -i script.sh
785379 script.sh
$ ls -l script.sh
-rwxr--r-t 1 jadi adm 34 Mar  5 13:38 script.sh
$ ls -R
.:
check_tr181_file.php  etc_apparmom.tar  index.html  php_checker  script.sh  test.csv  w

./php_checker:
check_tr181_file.php  index.html  test.csv

./w:
```

But it is also possible to create links. A link is simply an additional directory entry for a file or directory:

```
$ ls -l
total 4
-rwxr-xr-x 1 jadi adm 34 Mar  5 13:38 script.sh
$ ln -s script.sh copy_of_script.sh
$ ls -ltrh
total 4.0K
-rwxr-xr-x 1 jadi adm  34 Mar  5 13:38 script.sh
lrwxrwxrwx 1 jadi jadi  9 Mar  6 11:31 copy_of_script.sh -> script.sh
$ ls -i
785349 copy_of_script.sh  785379 script.sh
```

A link is simply an additional directory entry for a file or directory, allowing two or more names for the same file. A **hard link** is a directory entry that points to an inode, while a **soft link or symbolic link** is a directory entry that points to an inode that provides the name of another directory entry. The exact mechanism for storing the second name may depend on both the file system and the length of the name. Symbolic links are also called symlinks.

Soft links, or symlinks, merely point to another file or directory by name rather than by inode. Soft links can cross file system boundaries.

```
$ vi new_file
$ ls -ltrh
total 4.0K
-rw------- 1 jadi jadi 9 Mar  6 11:37 new_file
$ ln new_file hard_link
$ ln -s new_file soft_link
$ ls -ltrh
total 8.0K
-rw------- 2 jadi jadi 9 Mar  6 11:37 new_file
-rw------- 2 jadi jadi 9 Mar  6 11:37 hard_link
lrwxrwxrwx 1 jadi jadi 8 Mar  6 11:37 soft_link -> new_file
$ rm new_file
$ ls -ltrh
total 4.0K
-rw------- 1 jadi jadi 9 Mar  6 11:37 hard_link
lrwxrwxrwx 1 jadi jadi 8 Mar  6 11:37 soft_link -> new_file
$ cat hard_link
new file
$ cat soft_link
cat: soft_link: No such file or directory
```

You can create hard links only for files and not for directories. The exception is the special directory entries in a directory for the directory itself and for its parent \(. and ..\)



> You will get an error if you attempt to create hard links that cross file systems or that are for directories.

```
$ ln mydir link2dir # ln: mydir: hard link not allowed for director
$ ln -s mydir link2dir # works just fine
```

If you are using relative names, you will usually want the current working directory to be the directory where you are creating the link; otherwise, the link you create will be relative to another point in the file system.

```
$ ln -s myfile.txt mydir/ \#broken link
$ cd mydir $ ln -s ../myfile.txt .
```

we can find symbolic links using the `find` command:

```
$ find . -type l
```

They are highly used to keep one specific name pointing to a changing binary name. For example we always need to be able to run `python3` so we point it to the latest installed python on the system:

```
$ which python3
/usr/bin/python3
$ ls -l /usr/bin/python3
lrwxrwxrwx 1 root root 10 Mar 25  2022 /usr/bin/python3 -> python3.10
```
