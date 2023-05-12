Title: 106.1 Install and configure X11
Date: 2010-12-03 10:20
Category: LPIC1
Tags: LPIC1, 102, LPIC1-102-500
Authors: Jadi
sortorder: 300
Summary: 
Topic: Install and configure X11



_Weight: 2_

Candidates should be able to install and configure X11.

#### Key Knowledge Areas

* Understanding of the X11 architecture.
* Basic understanding and knowledge of the X Window configuration file.
* Overwrite specific aspects of Xorg configuration, such as keyboard layout.
* Understand the components of desktop environments, such as display managers and window managers.
* Manage access to the X server and display applications on remote X servers.
* Awareness of Wayland.

#### Terms and Utilities:

* /etc/X11/xorg.conf
* /etc/X11/xorg.conf.d/
* ~/.xsession-errors
* xhost
* xauth
* DISPLAY
* X

<iframe width="560" height="315" src="https://www.youtube.com/embed/JqiT4rsTvUo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

## Intro

Many people prefer to navigate and use their system via a Graphical User Interface (Or GUI in short). A GUI based operating system provides the user the Icons, mouse and windows & folders, a metaphor from our daily "desktops". But how this happens? As many other things in the Unix world, this happens via layers of application whom are doing one thing well. This is a rough representation of this stack:

![Linux GUI stack](/images/gui_stack.png)

On the lower level we have the hardware (say your Monitor) and then the Linux kernel and its drivers. On top of that there is a software called "Display Manager" or "Display Server". This program can ask the operating system (the kernel) to perform what the desktop manager requests. In other words, the display server accepts the desires of UI (even via a network channel) and translates them to the language that Kernel (and drivers in it) understand.

In this section we are focusing on **X** which is one of the two main Display Servers and then will have a brief look at the other one; the modern **Wayland**. 
## X

The X Window System is a network transparent window system which runs on a wide range of computing and graphics machines; including in most GNU/Linux distros when they need a graphical interfaces. Its history a bit long and started with XFree86 but then the X.org started its own X Server which is called X11 nowadays. 

> Going down the rabbit hole, *X Window System* (or *X*), was the default windowing system for most Unix and Unix like systems during 1980s. X.Org server is the free and open-source implementation of the X Window System display server by the X.Org Foundation. These day when we say *X* we are referring to the whole family of the network protocols describing how messages are exchanged between a client (application) and the display server; X11 being the 11th version of them.

### /etc/X11/xorg.conf

This used to be main configuration file for X. In recent days X configures itself when starting and does not need a cofig file. But if you want to make changes in the bootup process, you can create a new `xorg.conf.new` file by running the following command:

```
Xorg -configure
```

and then moving it to the `/etc/X11/xorg.conf`. This file contains different sections. Lets have a look at some of them.

```text
Section "Files"
    FontPath    "/usr/share/X11/fonts/misc"
    FontPath    "/usr/share/X11/fonts/100dpi/:unscaled"
    FontPath    "/usr/share/X11/fonts/75dpi/:unscaled"
    FontPath    "/usr/share/X11/fonts/Type1"
    FontPath    "/usr/share/X11/fonts/100dpi"
    FontPath    "/usr/share/X11/fonts/75dpi"
    FontPath    "/var/lib/defoma/x-ttcidfont-conf.d/dirs/TrueType"
EndSection
```

This part is about Fonts. When X-Server is running it needs these files. FontPaths tell X11 where fonts are. It also can refer to an IP running a font-server which is not common these days. Font servers used to be responsible of rendering fonts to be shown on clients but nowadays computers are fast and can render their own fonts. Font servers are going out of fashion!

```text
Section "Module"
    Load    "bitmap"
    Load    "ddc"
    Load    "dri"
    Load    "extmod"
    Load    "freetype"
    Load    "glx"
    Load    "int10"
    Load    "type1"
    Load    "vbe"
    Load    "dbe"
EndSection
```

These are modules. For example `glx` takes care of 3d graphical effects and we are asking X to load it alongside others.

Here are the `InputDevice`s:

```text
Section "InputDevice"
    Identifier    "Generic Keyboard"
    Driver        "kbd"
    Option        "CoreKeyboard"
    Option        "XkbRules"    "xorg"
    Option        "XkbModel"    "pc105"
    Option        "XkbLayout"    "us"
EndSection

Section "InputDevice"
    Identifier    "Configured Mouse"
    Driver        "mouse"
    Option        "CorePointer"
    Option        "Device"        "/dev/input/mice"
    Option        "Protocol"        "ImPS/2"
    Option        "Emulate3Buttons"    "true"
    Option        "ZAxisMapping"        "4 5"
EndSection

Section "InputDevice"
        Identifier      "Synaptics Touchpad"
        Driver          "synaptics"
        Option          "SendCoreEvents"        "true"
        Option          "Device"                "/dev/psaux"
        Option          "Protocol"              "auto-dev"
        Option        "RightEdge"        "5000"
EndSection
```

As you can see each device has an `Identifier`, `Driver` and some options. Above we defined a mouse, a keyboard and a touchpad and gave them some names.

```text
Section "Device"
    Identifier    "ATI Technologies, Inc. Radeon Mobility 7500 (M7 LW)"
    Driver        "radeon"
    BusID        "PCI:1:0:0"
    Option        "DynamicClocks"    "on"
    Option        "CRT2HSync"    "30-80"
    Option        "CRT2VRefresh"    "59-75"
      Option        "MetaModes"    "1024x768 800x600 640x480 1024x768+1280x1024"
EndSection
```

A graphic card! Again it has its identifies \(name\), its drivers and some options \(like support resolutions, refresh rates, ...\). This device needs a screen and a monitor:

> Note: The `vesa` points to a low resolution, always working driver. It is used for troubleshooting.

```text
Section "Monitor"
    Identifier    "Generic Monitor"
    Option        "DPMS"
EndSection

Section "Screen"
    Identifier    "Screen0"
    Device        "Screen0 ATI Technologies, Inc. Radeon Mobility 7500 (M7 LW)"
    Monitor        "Generic Monitor"
    DefaultDepth    24
    SubSection "Display"
        Depth        1
        Modes        "1024x768"
    EndSubSection
    SubSection "Display"
        Depth        4
        Modes        "1024x768"
    EndSubSection
    SubSection "Display"
        Depth        8
        Modes        "1024x768"
    EndSubSection
    SubSection "Display"
        Depth        15
        Modes        "1024x768"
    EndSubSection
    SubSection "Display"
        Depth        16
        Modes        "1024x768"
    EndSubSection
    SubSection "Display"
        Depth        24
        Modes        "1024x768"
    EndSubSection
EndSection
```

Note how the screen uses the already defined monitor \(using its identifier "Generic Monitor"\) and an already defined graphic card. Also note the different color modes \(say 24bit 1024x768\).

At the end we have to glue all of the above in one place as `ServerLayout`:

```text
Section "ServerLayout"
    Identifier    "DefaultLayout"
    Screen        "Default Screen"
    InputDevice    "Generic Keyboard"
    InputDevice    "Configured Mouse"
    InputDevice    "Synaptics Touchpad"
EndSection
```

We have a layout with a screen and 3 input devices :\)

> Note: Do not panic. A general understanding of xorg.conf is enough

### /etc/X11/xorg.conf.d/

What happens if you edit the `/etc/program.conf` and then update the system? will the system overwrite your newly edited `program.conf` with the latest version from the vendor? or omid the changes in the vendor in favor of your local edits? Both are *bad*.

To solve this issue, many programs are creating a new configurations directory as `/etc/program.conf.d/` and asking you to add your *local* configurations there. So the main configuration file from the vendor will be `/etc/program.conf` and all your new confugrations will go into the `/etc/program.conf.d/` as separated files. Much easier to manage (because smaller atomic files per configuration) and no touching the vendors config by locals. Cool? yes... this is happening in X11 too. Your own configs should go into `/etc/X11/xorg.conf.d/` and the `/etc/X11/xorg.conf` should remain untacked.




### ~/.xsession-errors
In case of any issues during the start of running of X, the errors will go here. So if you ran into an issue on your GUI startup, this is the file you should check to see what went wrong.


### xhost

This command controls the access to the X server. If you are on a X server and run `xhost` it tells you the access status.

```text
$ xhost
access control enabled, only authorized clients can connect
SI:localuser:jadi
```

As you can see only authorized clients can connect. To open it for all:

```text
jadi@funlife:~$ xhost +
access control disabled, clients can connect from any host
```

And for closing it again:

```text
jadi@funlife:~$ xhost -
access control enabled, only authorized clients can connect
```

Or open it for only one specific IP:

```text
jadi@funlife:~$ xhost +192.168.42.85
192.168.42.85 being added to access control list
jadi@funlife:~$ xhost
access control enabled, only authorized clients can connect
INET:192.168.42.85    (no nameserver response within 5 seconds)
SI:localuser:jadi
```

Now the `192.168.42.85` machine (REMOTE) can send its graphical requests to this machine.. whats the usage? continue reading the next section (assuming this machine is called `192.168.42.80` (SERVER) and we opened the access from to its X11 for `192.168.42.85` (REMOTE)).
### DISPLAY

This variable tell graphical programs where to send their graphical output. This is the default:

```text
$ echo $DISPLAY
:0
```

So if I run any graphical program on my machine, its output will be displayed on the same machine. 

But lets change it to the `192.168.42.80` machine (SERVER).. if you remember we just told it that this machine (REMOTE) can connect to it.

```text
$ export DISPLAY=192.168.42.80:0
$ xeyes # the eyes will be shown on 192.168.42.80 machine
```

Cool? yes. But this might not wonk on your setup. The X does not listen for remote connection in most distros because of security concerns. 

> In the next chapter, we will see how you can properly run graphical programs on remote servers and receive the GUI part on your side

### xauth

The `xauth` program is used to edit and display the authorization information used in connecting to the X server. On `xhost` you see how you can open your X to remote IPs, using `xauth` you can do the same based on a shared "secret". 

In this method, X creates an .XAuthority file in your home and whoever knows about the contents, can contact X. 

> If your X is not working, one step might be `rm`ing the `.XAuthority` file and restarting the X. 

## Wayland

X11 is super old and is only usable via lots of patches and hacks. Thats why one of its developers started a modern display manager called Wayland. In recent years many distros are switching from the default X11 to Wayland and keeping X11 as a fail-safe option. Wayland is more secure and much easier to maintain and I can assure you that in a couple of years we will see more and more of it.
