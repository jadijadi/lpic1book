# 102.1. Design hard disk layout 


*Weight: 2*

Description: Candidates should be able to design a disk partitioning scheme for a Linux system.

## Key Knowledge Areas

- Allocate filesystems and swap space to separate partitions or disks.
- Tailor the design to the intended use of the system.
- Ensure the /boot partition conforms to the hardware architecture requirements for booting.
- Knowledge of basic features of LVM


- / (root) filesystem
- /var filesystem
- /home filesystem
- swap space
- mount points
- partitions


Older linuxes were not able to handle HUGE disks (say Terrabytes) so there were /boot. 
Swap

on setup
/
/boot
swap



network workstation
/
/boot
/home (might be NFS, SMB, SSH)
swap


server
/
/home/
/var
/usr (sometimes read only from a network so all machine will be updated in one move)

