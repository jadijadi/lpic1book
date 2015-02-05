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

## Quotas
Quotas will let the system admin to control how much a user or a group consumes disk. The version 2 quota discussed in LPIC, needs kernel 2.4 and above. The package is called `quota`. 

The option should be added to required `/etc/fstab` file. The most famous ones are:

|option|meaning|
|--|--|
|usrquota|user quotas|
|uqouta|same as usrquota|
|quota|same as usrquota|
|grpquota|group quotas|
|gquota|same as grpquota|

So forexample is we want to enable quotas on sda2 we have to change the line in /etc/fstab like this:

````
/dev/sda2  /home  ext4    defaults,usrquota,grpquota          1 2
````

Next we need to specity the quotas of each user and each group. Two files called `aquota.user` and `aquota.group` in the root file system will do this. 
Now it is enough to run the `quotacheck` command. 

> the `quotacheck` command will create the aquota.user and aquota.group if they do not exist




