# LPIC 101 exam

Thinkgs you should know: [LPI Exam 101](https://www.lpi.org/linux-certifications/programs/lpic-1/exam-101)

A great study resource: [IBM LPI Reference](http://www.ibm.com/developerworks/linux/lpi/101.html)









## 104.6. Create and change hard & symbolic links (2)

### Key Knowledge Areas
- Create links.
- Identify hard and/or softlinks.
- Copying versus linking files.
- Use links to support system administration tasks.

- ln
- unlink

#### Notes
On a storage device, a file or directory is contained in a collection of blocks. Information about a file is contained in an inode, which records information such as the owner, when the file was last accessed, how large it is, whether it is a directory or not, and who can read from or write to it.

  $ ls -i
  $ ls -R

A link is simply an additional directory entry for a file or directory

  $ ls -il
  $ vi link2file.txt #will edit both
  $ mv myfile.txt 

A link is simply an additional directory entry for a file or directory, allowing two or more names for the same thing. A hard link is a directory entry that points to an inode, while a soft link or symbolic link is a directory entry that points to an inode that provides the name of another directory entry. The exact mechanism for storing the second name may depend on both the file system and the length of the name. Symbolic links are also called symlinks.

Soft links, or symlinks, merely point to another file or directory by name rather than by inode. Soft links can cross file system boundaries. 

  $ cp myfile.txt newfile.txt
  $ vi myfile.txt
  $ cat myfile.txt
  $ cat softlink.txt
  $ cat hardlink.txt
  $ cat newfile.txt
  $ ls -il

You can create hard links only for files and not for directories. The exception is the special directory entries in a directory for the directory itself and for its parent (. and ..)

  $ ls -ltrhi /etc/grub2.cfg

You will get an error if you attempt to create hard links that cross file systems or that are for directories. 

  $ ln mydir link2dir # error! 
  $ ln -s mydir link2dir

If you are using relative names, you will usually want the current working directory to be the directory where you are creating the link; otherwise, the link you create will be relative to another point in the file system.

  $ ln -s myfile.txt mydir/ #broken link

  $ cd mydir
  $ ln -s ../myfile.txt .

we can find symbloic links with ls -i or even find:

  $ find . -type l

and they are useful! 

  $ which java # linking to specific versions
  $ ls -ltrhi /etc/grub2.cfg # easier admin tasks
  $ ls -l /usr/lib64/ # keeping libraries clean










