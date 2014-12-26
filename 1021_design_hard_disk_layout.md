# 102.1. Design hard disk layout 

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

