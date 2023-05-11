Title: 106.2 Graphical Desktops
Date: 2010-12-03 10:20
Category: LPIC1
Tags: LPIC1, 102, LPIC1-102-500
Authors: Jadi
Summary: 
sortorder: 310
Topic:  Graphical Desktops


_Weight: 1_

Candidates should be aware of major Linux desktops. Furthermore, candidates should be aware of protocols used to access remote desktop sessions.

### Key Knowledge Areas

* Awareness of major desktop environments
* Awareness of protocols to access remote desktop sessions

### Terms and Utilities

* KDE
* Gnome
* Xfce
* X11
* XDMCP
* VNC
* Spice
* RDP

<iframe width="560" height="315" src="https://www.youtube.com/embed/YklRheL8RFQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Desktop Environments

When your system boots in the graphical mode, you will see a graphical login page. This is based on the **X Display Manager Control Protocol (XDMCP)** which is responsible for the underlying login system. On top it different programs like GDM (for GNOME), SSDM (KDE) and a more general option XDM handle the theming and other aspects of login.

After the successful login, you will be in your GUI. Generally this is a **large** software package which manages your windows, mouse and has clickable icons and folder with drag and drop capability. There might even be a trashcan somewhere and lots of other softwares like calculators and an email client. These are called **Desktop Environments**. On the other hand, some people prefer to have a minimal window manager without all the bells and whistles and chose and add them based on their own preferences.

> A window manager is responsible for showing and managing windows on your GUI. Even the most minimalist GUI, needs a window manager to be function. But add more and more libraries and software to your window manager (say a calculator, calendar, email client, programming libs for that specific environment, maps, ...) and you will end up with what is called a Desktop Environment.

In this section we will review 3 of the most famous Desktop Environments and then will talk about "remote access" to desktop envs.

### GNOME

![GNOME Desktop Environment](/images/gnome.png)

- Started at 1999
- Focuses on productivity & Accessibility
- Used by most GNU/Linux distros

### KDE [Plasma]
![KDE Plasma Desktop Environment](/images/plasma.png)

- Started at 1996
- From version 5 (2016) re-branded to KDE Plasma
- Highly customizable
- Used during the Mars mission in NASA
- CERN uses KDE

### XFCE
![XFCE Desktop Environment](/images/xfce.png)

- Started at 1999
- Lightweight but beautiful
- Modular

## Remote Connection to GUIs

There are many situation where you want to connect remotely to your GUI based system. This can be remote assistance to a friend, checking the status on your computer from your phone, use a GUI based program on a much stronger remote machine or as a colleague did, hide a laptop in the LAB and connect to it remotely and work from home when you should have been to the office (don't!). 

Here we will do a quick review on some of these methods.

### X Forwarding

This is not mentioned in this section in LPIC1 but it is super useful to know about. If you have an SSH server, you can connect to it and run GUI softwares there and get the GUI part of the program on your own machine. This is called X-Forwarding in ssh. 

First make sure that the `X11Forwarding yes` is configured in `/etc/ssh/sshd_config` (and ()[restart the service is needed]). Then do your ssh as follow:

```
$ ssh -X server_ip.address.net 
$ xeyes
```

And they eyes will appear on your own machine! You can do the same to run a browser or a cpu hungry simulation software.

### VNC
Virtual Network Computer (VNC) started long time ago and is still active and alive. It is multi platform and uses RFB protocol. Its default port is 5900+[display number, usually 1].

The good point about VNC is its flexibility and clients on all platform but it lacks security.

### Spice
The Simple Protocol for Independent Computing Environment started as a closed source software but become open source when RedHat bought the company in 2008. It can be used to connect to KVM virtual machines (a very common virtual machine system) and has has some advantages like fast speeds similar to local connections and low CPU usage. There is one server implementation but you can find many clients, including GNOMEs boxes program.

### RDP
Using softwares like `Xrdp` you can start listening for Remote Desktop Protocol (RDP) connections on your machine on port 3389 by default. The traffic is encrypted by default and there are lots of free and open RDP clients available.  
