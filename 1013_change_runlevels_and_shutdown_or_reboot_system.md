# 101.3. Change runlevels and shutdown or reboot system
weight: 3

Candidates should be able to manage the runlevel of the system. This objective includes changing to single user mode, shutdown or rebooting the system. Candidates should be able to alert users before switching run level and properly terminate processes. This objective also includes setting the default run level. It also includes basic feature knowledge of potential replacements to init.

### Key Knowledge Areas

* Set the default runlevel.
* Change between run levels including single user mode.
* Shutdown and reboot from the command line.
* Alert users before switching runlevels or other major system event.
* Properly terminate processes.
* Knowledge of basic features of systemd and Upstart

* /etc/inittab
* shutdown
* init
* /etc/init.d
* telinit

### runlevels
Runlevels define what tasks can be accomplished in the current state (or runlevel) of a Linux system

* 0- Halt
* 1- Single user mode (recovery)
* 2- Debian/Ubuntu default
* 3- RHEL/Fedora/SUSE text mode
* 4- free
* 5- RHEL/Fedora/SUSE graphical mode
* 6- reboot

default run level can be seen in this file which says init what to do, sets default runlevel and.. being phased out!

    grep "^id:" /etc/inittab #on init systems
    id:5:initdefault:

it can also be done on grub kernel parameters.

or using the runleveland telinit commands:

````
# runlevel
N 3
# telinit 5 
# runlevel
3 5

````

**Note:** runlevel 1 is single user mode!

### /etc/inittab
is being replaced by upstart and systemd but is still part of the exam.
````
#
# inittab       This file describes how the INIT process should set up
#               the system in a certain run-level.
#
# Author:       Miquel van Smoorenburg, <miquels@drinkel.nl.mugnet.org>
#               Modified for RHS Linux by Marc Ewing and Donnie Barnes
#

# Default runlevel. The runlevels used by RHS are:
#   0 - halt (Do NOT set initdefault to this)
#   1 - Single user mode
#   2 - Multiuser, without NFS (The same as 3, if you do not have networking)
#   3 - Full multiuser mode
#   4 - unused
#   5 - X11
#   6 - reboot (Do NOT set initdefault to this)
#
id:5:initdefault:

# System initialization.
si::sysinit:/etc/rc.d/rc.sysinit

l0:0:wait:/etc/rc.d/rc 0
l1:1:wait:/etc/rc.d/rc 1
l2:2:wait:/etc/rc.d/rc 2
l3:3:wait:/etc/rc.d/rc 3
l4:4:wait:/etc/rc.d/rc 4
l5:5:wait:/etc/rc.d/rc 5
l6:6:wait:/etc/rc.d/rc 6

# Trap CTRL-ALT-DELETE
ca::ctrlaltdel:/sbin/shutdown -t3 -r now

# When our UPS tells us power has failed, assume we have a few minutes
# of power left.  Schedule a shutdown for 2 minutes from now.
# This does, of course, assume you have powerd installed and your
# UPS connected and working correctly.
pf::powerfail:/sbin/shutdown -f -h +2 "Power Failure; System Shutting Down"

# If power was restored before the shutdown kicked in, cancel it.
pr:12345:powerokwait:/sbin/shutdown -c "Power Restored; Shutdown Cancelled"


# Run gettys in standard runlevels
1:2345:respawn:/sbin/mingetty tty1
2:2345:respawn:/sbin/mingetty tty2
3:2345:respawn:/sbin/mingetty tty3
4:2345:respawn:/sbin/mingetty tty4
5:2345:respawn:/sbin/mingetty tty5
6:2345:respawn:/sbin/mingetty tty6

# Run xdm in runlevel 5
x:5:respawn:/etc/X11/prefdm -nodaemon
````

this is the format:

    id:runlevels:action:process

* id: 2 or 3 chars
* runlevels: which runlevel this commands refers to (empty means all)
* action: respawn, wait, once, initdefault (default run level as seen above), ctrlaltdel (what to do with crrl+alt+delete)

all scripts are here: 

    ls -ltrh /etc/init.d
    
and start/stop on runlevels are controlled from these directories:

    root@funlife:~# ls /etc/rc2.d/

### Shutdown
The preferred method to shut down or reboot the system is to use the shutdown command, which first sends a warning message to all logged-in users and blocks any further logins. It then signals init to switch runlevels. The init process then sends all running processes a SIGTERM signal, giving them a chance to save data or otherwise properly terminate. After 5 seconds, or another delay if specified, init sends a SIGKILL signal to forcibly end each remaining process. 

* default is 5 seconds delay and then going to runlevel 1
* -h will halt the system
* -r will reboot the system
* time is hh:mm or n (minutes) or now
* whatever you add, will be broadcasted to logged in users
* if the command is running, ctrl+c or the "shutdown -c" will cancel it

      shutdown -r 60 Reloading updated kernel

for more advance users:
* -t60 will delay 60 seconds between SIGTERM and SIGKILL 
* if you cancel a shutdown, users wont get the news! you can use "wall" command to tell them that the shutdown is canceled

### Halt, reboot and poweroff

- The halt command halts the system.
- The poweroff command is a symbolic link to the halt command, which halts the system and then attempts to power it off.
- The reboot command is another symbolic link to the halt command, which halts the system and then reboots it.


### upstart
is not static set of init scripts and understands events. Events are used to trigger tasks or services (jobs). Examples are connecting a usb or starting the Apache server only after having network and filesystem.

jobs are defined in /etc/init and subdirectories.

    initctl list

being used in ubuntu. 

### systemd
uses sockets and a socket will be open for each daemon process but will start the daemon only when needed. Understands dependencies. Faster and parallel. 

    systemctl

works with units (service, socket, device, mount, automount, target (group of other units), snapshot (save/rollback)). config files has unit type suffix (say cups.service or rpcbind.socket) and are located at /etc/systemd/system

being used in Fedora based systems and SUSE

.

.

.

.


.

.


.


.
.






