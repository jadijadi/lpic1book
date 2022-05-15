Title: 106.2 Graphical Desktops
Date: 2010-12-03 10:20
Category: LPIC1
Tags: LPIC1, 101, LPIC1-101-500
Authors: Jadi
Summary: 
sortorder: 310
Topic: User Interfaces and Desktops

## 106.2 Setup a display manager

<div class="alert alert-danger" role="alert">
  This chapter is still a Work In Progress. Do not rely on it for LPIC version 500 exam. Will be updated in a few week.s
</div>


_Weight: 1_

Candidates should be able to describe the basic features and configuration of the LightDM display manager. This objective covers awareness of the display managers XDM \(X Display Manger\), GDM \(Gnome Display Manager\) and KDM \(KDE Display Manager\).

### Key Knowledge Areas

* Basic configuration of LightDM
* Turn the display manager on or off
* Change the display manager greeting
* Awareness of XDM, KDM and GDM

### Terms and Utilities

* lightdm
* /etc/lightdm/

### Display Manager

A **Display Manager** is a graphical interface which lets you login into your system when you turn your computer on. There are many different display managers \(say XDM, SDDM, KDM, GDM, ...\) but their general functionality is same: show a login form and let the user the enter \(or choose\) its name, password and the Desktop she needs to use. Also many of the DMs let the user to choose Accessibility Tools \(covered in 106.3\), connect to the network, change the keyboard layout or change the system volume.

### lightdm

Many of the distros use **LightDM** as their display/login manager. It shows the default user \(last logged in user\) and asks for password. If you have more than one desktop installed \(say XFCE, KDE and Gnome\) it also lets you choose the one you need.

_lightdm_ can accept _themes_ and calls them _greeters_.

### /etc/lightdm

All of the lightdm configs are in `/etc/lightdm`.

```text
$ ls -ltrh /etc/lightdm/
total 24K
-rw-r--r-- 1 root root   40 Sep 23 12:56 keys.conf
-rw-r--r-- 1 root root  801 Sep 27 13:03 lightdm-webkit2-greeter.conf
-rw-r--r-- 1 root root  452 Sep 27 13:08 users.conf
-rwxr-xr-x 1 root root 1.5K Sep 27 13:08 Xsession
-rw-r--r-- 1 root root 6.5K Sep 27 13:08 lightdm.conf
```

Some distributions like Ubuntu are using a `lightdm.conf.d` directory instead of a straight forward `lightdm.conf` and put their configs there.

```text
[SeatDefaults]
...
user-session=gnome
#autologin-user=jadi
#allow-user-switching=true
allow-guest=true
greeter-session=lightdm-webkit2-greeter
...
```

The `greeter-session` tells which greeter \(theme\) should be used. You can install more greeters using your package manager. Another important config is `user-session` which tells the lightdm what desktop is the default one.

### controlling DMs

The `lightdm` works as a service. You can start, stop & restart it or even use `systemctl disable lightdm` to disable it on next boots.

> You already know how to reboot your computer in text mode from previous lessons \(using grub, kernel parameters during the boot or using `init` command\).

