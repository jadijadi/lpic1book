# 1023\_manage\_shared\_libraries

Title: 102.3. Manage shared libraries Date: 2021-08-03 13:07 Category: 102

## 102.3. Manage shared libraries

_weight 2_

### Objectives

Candidates should be able to determine the shared libraries that executable programs depend on and install them when necessary.

* Identify shared libraries.
* Identify the typical locations of system libraries.
* Load shared libraries.
* ldd
* ldconfig
* /etc/ld.so.conf
* LD\_LIBRARY\_PATH

### Linking

When we write a program, we use libraries. For example if you need to read text from standard input, you need to _link_ a library which provides this. Think linking has two forms:

* **Static** linking is when you add this library to your executable program. In this method your program size is big because it has all the needed libraries. One good advantage is your program can be run without being dependent to other programs / libraries.
* **Dynamic** linking is when you just say in your program "We need this and that library to run this program". This way your program is smaller but you need to install those libraries separately. This makes programs more secure \(because libraries can be updated centrally\), more advanced \(any improvement in a library will improve the whole program\) and smaller.

> Dynamic linking is also called **shared** libraries because all the programs are sharing one library which is separately installed.

### What libraries I need

first you should know that libraries are installed in `/lib` and `/lib64` \(for 32bit and 64bit libraries\).

#### ldd

the `ldd` command helps you find:

* If a program is dynamically or statically linked
* What libraries a program needs

lets have a look at two files:

```text
# ldd /sbin/ldconfig
    not a dynamic executable

# ldd /bin/ls
ls     lsblk  lsmod  
root@funlife:/home/jadi/Downloads# ldd /bin/ls
    linux-vdso.so.1 =>  (0x00007fffef1fc000)
    libselinux.so.1 => /lib/x86_64-linux-gnu/libselinux.so.1 (0x00007f61696b3000)
    libacl.so.1 => /lib/x86_64-linux-gnu/libacl.so.1 (0x00007f61694aa000)
    libc.so.6 => /lib/x86_64-linux-gnu/libc.so.6 (0x00007f61690e4000)
    libpcre.so.3 => /lib/x86_64-linux-gnu/libpcre.so.3 (0x00007f6168e77000)
    libdl.so.2 => /lib/x86_64-linux-gnu/libdl.so.2 (0x00007f6168c73000)
    /lib64/ld-linux-x86-64.so.2 (0x00007f61698f8000)
    libattr.so.1 => /lib/x86_64-linux-gnu/libattr.so.1 (0x00007f6168a6d000)
    libpthread.so.0 => /lib/x86_64-linux-gnu/libpthread.so.0 (0x00007f616884f000)
```

As you can see, `ldd` tells us that the `/sbin/ldconfig` is not dynamically linked but shows us the libraries needed by `/bin/ls`.

#### symbolic links for libraries

If you are writing a program and you use udev functions, you will ask for a library called _libudev.so.1_. But a Linux distro, might call its version of udev library _libudev.so.1.4.0_. How can we solve this problem? with **symbolic links** you will learn more about this in next chapters but for short, a symbolic name is a new name for the same file.

I will check the same thing on my system. First I'll find where the libudev.so.1 on my system is:

```text
# locate libudev.so.1
/lib/i386-linux-gnu/libudev.so.1
```

and then will check that file:

```text
# ls -la /lib/i386-linux-gnu/libudev.so.1
lrwxrwxrwx 1 root root    16 Nov 13 23:05 /lib/i386-linux-gnu/libudev.so.1 -> libudev.so.1.4.0
```

As you can see, this is a symbolic link pointing to the version of libudev I have installed \(1.4.0\) so even if a software says it need libudev.so.1, my system will use its libusdev.so.1.4.0.

#### Dynamic library configs

As most of other linux tools, dynamic linking is also configured using a text config file. It is located at _/etc/ld.so.conf_. On an Ubuntu system it just points to other config files in `/etc/ld.so.conf.d/` but all those lines can be included in the main file too:

```text
# cat /etc/ld.so.conf
include /etc/ld.so.conf.d/*.conf

# ls /etc/ld.so.conf.d/
fakeroot-x86_64-linux-gnu.conf          i686-linux-gnu.conf                     x86_64-linux-gnu_EGL.conf               
i386-linux-gnu.conf                     libc.conf                               x86_64-linux-gnu_GL.conf                
i386-linux-gnu_GL.conf                  x86_64-linux-gnu.conf                   x86_64-linux-gnu_mirclient8driver.conf  

# cat /etc/ld.so.conf.d/libc.conf
# libc default configuration
/usr/local/lib

root@funlife:/sbin# cat /etc/ld.so.conf.d/x86_64-linux-gnu_GL.conf
/usr/lib/x86_64-linux-gnu/mesa
```

the `ldconfig` commands processed all these files to make the loading of libraries faster. This command creates ld.so.cache to locate files that are to be dynamically loaded and linked.

> if you change the ld.so.conf \(or sub-directories\) you need to run `ldconfig`

To close this section lets run ldconfig with the **-p** switch to see what is saved in ld.so.cache:

```text
# ldconfig -p | head
1358 libs found in cache `/etc/ld.so.cache'
    libzvbi.so.0 (libc6,x86-64) => /usr/lib/x86_64-linux-gnu/libzvbi.so.0
    libzvbi-chains.so.0 (libc6,x86-64) => /usr/lib/x86_64-linux-gnu/libzvbi-chains.so.0
    libzephyr.so.4 (libc6,x86-64) => /usr/lib/x86_64-linux-gnu/libzephyr.so.4
    libzeitgeist-2.0.so.0 (libc6,x86-64) => /usr/lib/x86_64-linux-gnu/libzeitgeist-2.0.so.0
    libzeitgeist-1.0.so.1 (libc6,x86-64) => /usr/lib/libzeitgeist-1.0.so.1
    libzbar.so.0 (libc6,x86-64) => /usr/lib/libzbar.so.0
...
...
```

As you can see, this file tells the the kernel that anyone asks for _libzvbi.so.0_, the _/usr/lib/x86\_64-linux-gnu/libzvbi.so.0_ file should be loaded.

### LD\_LIBRARY\_PATH

Sometimes you need to override the original installed libraries and use your own or a specific library. Cases can be :

* You are running an old software which needs an old version of a library.
* You are developing a shared library and want to test is without installing it
* You are running a specific program \(say from opt\) which needs to access its own libraries

in these cases, you have to use the environment variable  **LD\_LIBRARY\_PATH**. A collon \(:\) separated list of directories will tell your program where to search for needed libraries **before** checking the libraries in ld.so.cache.

For example if you give this command:

```text
export  LD_LIBRARY_PATH=/usr/lib/myoldlibs:/home/jadi/lpic/libs/
```

and then run any command, the system will search `/usr/lib/myoldlibs` and then `/home/jadi/lpic/libs/` before going to the main system libraries \(defined in ld.so.cache\). . .

. .

.

.

.

.

.

.

.

