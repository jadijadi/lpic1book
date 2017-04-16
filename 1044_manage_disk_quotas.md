#104.4 Manage disk quotas
*Weight: 1*

Candidates should be able to manage disk quotas for users.

## Objectives

- Set up a disk quota for a filesystem.
- Edit, check and generate user quota reports.


- quota
- edquota
- repquota
- quotaon

## Enabling quotas
Quotas will let the system admin to control how much a user or a group consumes disk. The version 2 quota discussed in LPIC, needs kernel 2.4 and above. The package is called `quota`. 

The option should be added to required `/etc/fstab` file. The most famous ones are:

|option|meaning|
|--|--|
|usrquota|user quotas|
|uquota|same as usrquota|
|quota|same as usrquota|
|grpquota|group quotas|
|gquota|same as grpquota|

So for example is we want to enable quotas on sda2 we have to change the line in /etc/fstab like this:

````
/dev/sda2  /home  ext4    defaults,usrquota,grpquota          1 2
````

Next we need to specify the quotas of each user and each group. Two files called `aquota.user` and `aquota.group` in the root file system will do this. 
Now it is enough to run the `quotacheck` command. 

> the `quotacheck` command will create the aquota.user and aquota.group if they do not exist

````
# quotacheck -u -a -m -c -v
quotacheck: Your kernel probably supports journaled quota but you are not using it. Consider switching to journaled quota to avoid running quotacheck after an unclean shutdown.
quotacheck: Scanning /dev/sda1 [/boot] done
quotacheck: Old group file name could not been determined. Usage will not be subtracted.
quotacheck: Checked 13 directories and 389 files
# ls /boot/
aquota.user   
````

**C**reates quota files for **u**sers on **a**ll file systems and will work on **m**ounted file systems; being **v**erbose.

Then you need to turn the quota checking on:

````
# quotaon -auv ##all in /etc/fstab, for user quotas and be verbose
/dev/sda1 [/boot]: user quotas turned on
````


## Setting limits
The main command for *editing* quota is **edquota*. It will check the users quota from all file systems and presents them in a file editor to you. 

````
#edquota -u jadi
Disk quotas for user jadi (uid 1000):
  Filesystem                   blocks       soft       hard     inodes     soft     hard
  /dev/sda1                         0          0          0          0        0        0
````

As you can see, the system shows the current blocks of 1k data, number of inodes (number of files and directories) and soft and hard limits for each of them. If a user goes over its soft-limits, there will be emails. Hard limits are real limits and user can not go over them. If you need to save soft or hard limits, just change the file and save it.

> You have to run `quotacheck` to update these data

For copying one users limits to another user, use the `-p` switch:

````
# edquota -p jadi newuser neweruser lastuser
````


## quota reports

If you need to check the quota of only one user user the `quota` command.

````
# quota  jadi
Disk quotas for user jadi (uid 1000): 
     Filesystem  blocks   quota   limit   grace   files   quota   limit   grace
      /dev/sda1       5    5000       0               2       0       0      
````

This is not easy if you have many users so you can use `repquota` as follow:

````
# repquota -u -a
*** Report for user quotas on device /dev/sda1
Block grace time: 7days; Inode grace time: 7days
                        Block limits                File limits
User            used    soft    hard  grace    used  soft  hard  grace
----------------------------------------------------------------------
root      --  120288       0       0            401     0     0       
jadi      --       5    5000       0              2     0     0       

````

## Warning users
There is a command for checking quotas and warning users called `warnquota`. If is good to run it time to time using a crontab (will see this crontabs later). 

.

.

.

.

.

.

.

.

.

.

.
