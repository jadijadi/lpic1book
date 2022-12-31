Title: 102.3 Manage shared libraries
Date: 2010-12-03 10:20
Category: LPIC1
Tags: LPIC1, 101, LPIC1-101-500
Authors: Jadi
Summary: Candidates should be able to determine the shared libraries that executable programs depend on and install them when necessary.
sortorder: 080

_Weight: 1_

## Objectives

Candidates should be able to determine the shared libraries that executable programs depend on and install them when necessary.

* Identify shared libraries.
* Identify the typical locations of system libraries.
* Load shared libraries.

## Terms and Utilities

* ldd
* ldconfig
* `/etc/ld.so.conf`
* LD\_LIBRARY\_PATH

<iframe width="560" height="315" src="https://www.youtube.com/embed/1P58gW8xCkk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

## Linking

When we write a program, we use libraries. For example, if you need to read text from standard input, you need to _link_ a library that provides this. Think linking has two forms:

* **Static** Linking is when you add this library to your executable program. In this method, your program size is big because it has all the needed libraries. One good advantage is your program can be run without being dependent on other programs/libraries.
* **Dynamic** Linking is when you just say in your program "We need this and that library to run this program". This way your program is smaller but you need to install those libraries separately. This makes programs more secure \(Because libraries can be updated centrally, and more advanced any improvement in a library will improve the whole program\), and smaller.

Linux dynamic libraries have names like `libLIBNAME.so.VERSION` and are located at places like `/lib*/` and `/usr/lib*/`. On Windows, we call them Dynamic Linked Libraries (DLLs). 

> Dynamic linking is also called **shared** libraries because all the programs are sharing one library which is separately installed.

## What libraries do I need

Libraries related to system utilities are installed in `/lib` and `/lib64` \(for 32bit and 64bit libraries\) and libraries installed by other software will be located at `/usr/lib` and `/usr/lib64`.

### ldd

The `ldd` command helps you find:

* If a program is dynamically or statically linked
* What libraries a program needs

Let's have a look at two files:

```text
[jadi@fedora ~]$ ldd /sbin/ldconfig
    not a dynamic executable

[jadi@fedora ~]$ ldd /bin/ls
	linux-vdso.so.1 (0x00007ffdd53eb000)
	libselinux.so.1 => /lib64/libselinux.so.1 (0x00007f5cbc7b0000)
	libcap.so.2 => /lib64/libcap.so.2 (0x00007f5cbc7a6000)
	libc.so.6 => /lib64/libc.so.6 (0x00007f5cbc5a5000)
	libpcre2-8.so.0 => /lib64/libpcre2-8.so.0 (0x00007f5cbc50f000)
	/lib64/ld-linux-x86-64.so.2 (0x00007f5cbc813es

```

As you can see, `ldd` tells us that the `/sbin/ldconfig` is not dynamically linked but shows us the libraries needed by `/bin/ls`.

### Symbolic links for libraries

If you are writing a program and you use udev functions, you will ask for a library called _libudev.so.1_. But a Linux distro, might call its version of udev library _libudev.so.1.4.0_. How can we solve this problem? The answer is **symbolic links**; You will learn more about them in the next chapters but for short, a symbolic name is a new name for the same file.

I will check the same thing on my system. First I'll find where the `libudev.so.1` on my system is:

```text
# locate libudev.so.1
/lib/i386-linux-gnu/libudev.so.1
/usr/lib64/libudev.so.1.7.3
```

And then will check that file:

```text
# ls -la /lib/i386-linux-gnu/libudev.so.1
lrwxrwxrwx 1 root root    16 Nov 13 23:05 /lib/i386-linux-gnu/libudev.so.1 -> libudev.so.1.4.0
```

As you can see, this is a symbolic link pointing to the version of libudev I have installed \(1.4.0\) so even if a software says it needs libudev.so.1, my system will use its libusdev.so.1.4.0.

### Dynamic library configs and cache

As with most other Linux tools, dynamic linking is also configured using a text config file. It is located at _/etc/ld.so.conf_. On an Ubuntu system it just points to other config files in `/etc/ld.so.conf.d/` but all those lines can be included in the main file too:

```text
[jadi@fedora ~]$ cat /etc/ld.so.conf
include ld.so.conf.d/*.conf
[jadi@fedora ~]$ ls /etc/ld.so.conf.d/
llvm13-x86_64.conf  pipewire-jack-x86_64.conf
[jadi@fedora ~]$ cat /etc/ld.so.conf.d/llvm13-x86_64.conf
/usr/lib64/llvm13/lib
```

The `ldconfig` commands processed all these files to make the loading of libraries faster. This command creates `ld.so.cache` to locate files that are to be dynamically loaded and linked.

> If you change the `ld.so.conf` \(or sub-directories\) you need to run `ldconfig`. Try it with `-v` switch to see the progress / data.

To close this section, let's run ldconfig with the **-p** switch to see what is saved in ld.so.cache:

```text
[jadi@fedora ~]$ ldconfig -p | head
1373 libs found in cache `/etc/ld.so.cache'
	libzstd.so.1 (libc6,x86-64) => /lib64/libzstd.so.1
	libzmf-0.0.so.0 (libc6,x86-64) => /lib64/libzmf-0.0.so.0
	libzip.so.5 (libc6,x86-64) => /lib64/libzip.so.5
	libzhuyin.so.13 (libc6,x86-64) => /lib64/libzhuyin.so.13
	libzck.so.1 (libc6,x86-64) => /lib64/libzck.so.1
	libz.so.1 (libc6,x86-64) => /lib64/libz.so.1
	libyui.so.15 (libc6,x86-64) => /lib64/libyui.so.15
	libyui-mga.so.15 (libc6,x86-64) => /lib64/libyui-mga.so.15
	libyelp.so.0 (libc6,x86-64) => /lib64/libyelp.so.0
```

As you can see, this file tells the kernel that if anyone asks for `libzstd.so.1`, the `/lib64/libzstd.so.1` file should be loaded and used.

### Where OS finds dynamic libraries
When a program needs a shared library, the system will search files in this order:

1. LD\_LIBRARY\_PATH environment variable
2. Programs PATH
3. `/etc/ld.so.conf` (Which might load more files from `/etc/ld.so.conf.d/` in its beginning or its end)
4. `/lib/`, `/lib64/`, `/usr/lib/`, `/usr/lib64/`

In some cases, you might need to override the default system libraries. Some examples are:

* You are running an old software which needs an old version of a library.
* You are developing a shared library and want to test it without installing it
* You are running a specific program \(say from opt\) which needs to access its own libraries

In these cases, you can point the environment variable **LD\_LIBRARY\_PATH** to the library you need to use and then run your program. A colon \(:\) separated list of directories will tell your program where to search for needed libraries **before** checking the libraries in `/etc/ld.so.cache`.

For example, if you give this command:

```text
export  LD_LIBRARY_PATH=/usr/lib/myoldlibs:/home/jadi/lpic/libs/
```

And then run any command, the system will search `/usr/lib/myoldlibs` and then `/home/jadi/lpic/libs/` before going to the main system libraries \(defined in `/etc/ld.so.cache`\). . .

## Loading dynamically

In the last part of this section, let's see how we can manually tell Linux to run a program using its _dynamic linker_. Its also called a dynamic loader and is used to load dynamic libraries needed by an executable. It might be called `ld` or `ld-linux`. You can find yours by running:

```
[jadi@fedora ~]$ locate ld-linux
/usr/lib64/ld-linux-x86-64.so.2
/usr/share/man/man8/ld-linux.8.gz
/usr/share/man/man8/ld-linux.so.8.gz
```

and run programs using it like this:

```
[jadi@fedora ~]$ /usr/lib64/ld-linux-x86-64.so.2 /usr/bin/ls
Desktop  Documents  Downloads  Music  Pictures	Public	Templates  tmp	Videos
```

Do you want to go deeper than LPIC1 and ask why you do not need to run `ld-linux` when running a command? Because the executable you are running is a Linux ELF executable and if you check its inside, you can see that it says "run this using ld-linux": 

```
[jadi@fedora ~]$ readelf -Wl /usr/bin/ls

Elf file type is DYN (Position-Independent Executable file)
Entry point 0x6c00
There are 13 program headers, starting at offset 64

Program Headers:
  Type           Offset   VirtAddr           PhysAddr           FileSiz  MemSiz   Flg Align
  PHDR           0x000040 0x0000000000000040 0x0000000000000040 0x0002d8 0x0002d8 R   0x8
  INTERP         0x000318 0x0000000000000318 0x0000000000000318 0x00001c 0x00001c R   0x1
      [Requesting program interpreter: /lib64/ld-linux-x86-64.so.2]
  LOAD           0x000000 0x0000000000000000 0x0000000000000000 0x003798 0x003798 R   0x1000
  LOAD           0x004000 0x0000000000004000 0x0000000000004000 0x013c21 0x013c21 R E 0x1000
  LOAD           0x018000 0x0000000000018000 0x0000000000018000 0x0074d8 0x0074d8 R   0x1000
  [...]
```

💀 There is a *hack* here: *You can run any Linux executable even if its executable bit is not set!* just run it using `ld-linux` as we did a few lines above!
