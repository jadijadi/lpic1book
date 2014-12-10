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
BIOS is Basic Input Output System

#### bootloader

Bootloader can be GRUB (1&2) or LIOL

#### init
first process, process in charge, a big family tree of commands:

    pstree

init is being replaced in many distros (say ubuntu with upstart) but still is in exam and has its own section.

#### dmesg

dmesg command will show the full data while 

    cat /var/log/dmesg

will show only the data during the boot

-