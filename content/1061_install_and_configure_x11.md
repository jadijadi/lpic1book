Title: 106.1 Install and configure X11
Date: 2010-12-03 10:20
Category: LPIC1-101
Tags: LPIC1, 101, LPIC1-101-500
Authors: Jadi
Summary: 
Topic: User Interfaces and Desktops


## 106.1 Install and configure X11

_Weight: 2_

Candidates should be able to install and configure X11.

#### Key Knowledge Areas

* Verify that the video card and monitor are supported by an X server
* Awareness of the X font server
* Basic understanding and knowledge of the X Window configuration file

#### Terms and Utilities:

* /etc/X11/xorg.conf
* xhost
* DISPLAY
* xwininfo
* xdpyinfo
* X

### Hisotry

This lesson is useless in modern life! Very strange but practically nothing in this lesson is used in real life because xorg.conf, xhost, ... is not used in any modern linux system anymore. Maybe they are here so you wont be shocked if you see an older linux.

### X

The X Window System is a network transparent window system which runs on a wide range of computing and graphics machines; including practically ALL linux systems with graphical interfaces. It is also called X11 because of its version, X window system, X server, ...

### /etc/X11/xorg.conf

This is file X used to use for its configuration. In most cases this is automatically generated and works. Newer systems do not have this file so lets have a look at a xorg.conf I found on the Internet.

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

These are modules. For example `glx` takes care of 3d graphical effects. We are asking X server to load so called modules.

Next we have to define our `InputDevice`s:

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

As you can see each device has an `Identifier`, `Driver` and some options. We just defined a mouse, a keyboard and a touchpad and gave them some names.

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

A graphic card is defined above. Again it has its identifies \(name\), its drivers and some options \(like support resolutions, refresh rates, ...\). This device needs a screen and a monitor:

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

Note how the screen uses the defined monitor \(using its identifier "Generic Monitor"\) and defined graphic card. Also note the different color modes \(say 24bit 1024x768\).

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

> Note: Do not panic. It is enough for you to understand the `Section` and `EndSection` and a general understanding of the xorg.conf

### xwininfo

The `xwininfo` command is a window information utility for X. Run it and it waits for you to click on any window and gives you some information about that _window_ like its size, position, color depth, ...

```text
$ xwininfo

xwininfo: Please select the window about which you
          would like information by clicking the
          mouse in that window.

xwininfo: Window id: 0x5400004 "jadi@funlife: ~/w/lpic/lpic1book"

  Absolute upper-left X:  629
  Absolute upper-left Y:  245
  Relative upper-left X:  10
  Relative upper-left Y:  36
  Width: 655
  Height: 426
  Depth: 32
  Visual: 0x71
  Visual Class: TrueColor
  Border width: 0
  Class: InputOutput
  Colormap: 0x5400003 (not installed)
  Bit Gravity State: NorthWestGravity
  Window Gravity State: NorthWestGravity
  Backing Store State: NotUseful
  Save Under State: no
  Map State: IsViewable
  Override Redirect State: no
  Corners:  +629+245  -82+245  -82-97  +629-97
  -geometry 80x24-72-87
```

### xdpyinfo

This give you information about the running X session. Things like screens, color depth, version, name, ...

```text
name of display:    :0
version number:    11.0
vendor string:    The X.Org Foundation
vendor release number:    11701000
X.Org version: 1.17.1
maximum request size:  16777212 bytes
motion buffer size:  256
bitmap unit, bit order, padding:    32, LSBFirst, 32
image byte order:    LSBFirst
number of supported pixmap formats:    7
supported pixmap formats:
    depth 1, bits_per_pixel 1, scanline_pad 32
    depth 4, bits_per_pixel 8, scanline_pad 32
    depth 8, bits_per_pixel 8, scanline_pad 32
    depth 15, bits_per_pixel 16, scanline_pad 32
    depth 16, bits_per_pixel 16, scanline_pad 32
    depth 24, bits_per_pixel 32, scanline_pad 32
    depth 32, bits_per_pixel 32, scanline_pad 32
keycode range:    minimum 8, maximum 255
focus:  window 0x5400005, revert to Parent
number of extensions:    28
    BIG-REQUESTS
    Composite
    DAMAGE
...
...
```

### xhost

This command used to control the access to the X server. If you are on a X server and run `xhost` it tells you the access status.

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

#### DISPLAY

This variable tell graphical program where to show their graphical output \(where to draw their inputs\). In normal cases this is set on my own machine:

```text
$ echo $DISPLAY
:0
```

but if another X is listening to all IPs \(after `xhost +`\) or listening to my machine \(after `xhost 192.168.42.85`\) I can change the DISPLAY environment and connect my graphical output to that machine. In this case if I run a graphical program, its output \(windows\) will be shown on another machine:

```text
$ export DISPLAY=192.168.42.85:0
$ xeyes # the eyes will be shown on 192.168.42.85 machine
```

> Note: This wont work if you test it on a modern machine. Most X11s do not listen on any port these days.

.

.

.

.

.

.

.

.

.

