# 101.2. Boot the system
weight: 3

Candidates should be able to guide the system through the booting process.

### Key Knowledge Areas
- Provide common commands to the boot loader and options to the kernel at boot time.
- Demonstrate knowledge of the boot sequence from BIOS to boot completion.
- Check boot events in the log files.

### Terms
- BIOS
- bootloader
- kernel
- init
- /var/log/messages
- dmesg

#### BIOS
BIOS is Basic Input Output System and does the first steps of the PC bootup. For example is does a POST (Power On Self Test) and decides which hardware should boot the system.

#### bootloader

Bootloader can be GRUB (1&2) or LILO which are great for disks less than 2TB.

	/etc/lilo.conf
	/boot/grub/grub.cfg
	/boot/grub/menu.lst


#### Kernel
Kernel parameters (sometimes called boot parameters) supply the kernel with information about hardware parameters that it might not determine on its own - say single user mod boot (S)

#### init
When the kernel finishes loading, it usually starts /sbin/init. This program remains running until the system is shut down. It is always assigned process ID 1. 

first process, process in charge, a big family tree of commands:

    pstree

init is being replaced in many distros (say ubuntu with upstart) but still is in exam and has its own section.

#### dmesg
**Funny fact:** During the bootup, only The Kernel is running so it should record and keep its own logs!

dmesg command will show the full data from  **kernel ring buffer** up to know. But

    cat /var/log/dmesg

will show **only** the data during the boot

#### /var/log/messages
After the init process comes up, syslog daemon will log messages. It has timestamps and will persist during restarts.

- Kernel is still logging its own messages in dmesg
- in some systems it might be called /var/log/syslog
- there are many other logs at /var/log