Title: 109.2 Persistent network configuration
Date: 2010-12-03 10:20
Category: LPIC1
Tags: LPIC1, 102, LPIC1-102-500
Authors: Jadi
sortorder: 410
Summary: 


_Weight: 4_

Candidates should be able to view, change and verify configuration settings on client hosts.

### Key Knowledge Areas

* Understand basic TCP/IP host configuration
* Configure ethernet and wi-fi network configuration using NetworkManager
* Awareness of systemd-networkd

### Terms and Utilities

* `/etc/hostname`
* `/etc/hosts`
* `/etc/nsswitch.conf`
* `/etc/resolv.conf`
* `nmcli`
* `hostnamectl`
* `ifup`
* `ifdown`

### Intro
As we saw in the previous section, every PC, server, laptop, phone, .. should have an IP configuration (IP, Netmask, Default gateway, DNS, ..) to work properly in the network. This can be done in various ways. Some devices like laptops are changing their network all the time and should be able to keep up with the changes. Some servers remain in the same location (physical and network wise) all their life and should persist this configuration after restarts, outages, upgrade and HW changes.

In this section we will see how this can be achieved in modern GNU/Linux systems.


### Network Interface
The NIC (or Network Interface Card) is the physical network hardware in your computer. This can be the chip+antenna in your mobile phone or an Ethernet Card connected to a network cable on your PC.

In older systems, these were called things like `eth0`, `eth1`, `eth2`, .. where 0, 1 & 2 were decided by the kernel - mostly based on the order of loading the drivers. In recent Linux machines the NICs are called by `wlan0`, `eno1`, `ens1`, `enp3s2` and such. This is based on some more concrete data like being an `wireless` or `et`hernet, PCI (`ens`) or bus like (`enp`). 

The `ip` command can show these:

```
➜  ~ ip link show
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN mode DEFAULT group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
2: wlp108s0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc noqueue state UP mode DORMANT group default qlen 1000
    link/ether 00:bb:60:97:6b:07 brd ff:ff:ff:ff:ff:ff
3: docker0: <NO-CARRIER,BROADCAST,MULTICAST,UP> mtu 1500 qdisc noqueue state DOWN mode DEFAULT group default 
    link/ether 02:42:75:d3:e6:ff brd ff:ff:ff:ff:ff:ff
```

> the `lo` is a virtual network adapter called the *loopback* device. It is always there and points to "this device or 127.0.0.1 as IPv4 calls it".

### Configuring NICs
In older distributions, the `ifconfig` was used to check / configure the IP settings on NICs. Have a look:

```text
$ ifconfig
enp0s25: flags=4099<UP,BROADCAST,MULTICAST>  mtu 1500
        ether f0:de:f1:62:c5:73  txqueuelen 1000  (Ethernet)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 0  bytes 0 (0.0 B)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
        device interrupt 20  memory 0xd1500000-d1520000  

lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
        inet 127.0.0.1  netmask 255.0.0.0
        inet6 ::1  prefixlen 128  scopeid 0x10<host>
        loop  txqueuelen 1  (Local Loopback)
        RX packets 560719  bytes 339937974 (324.1 MiB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 560719  bytes 339937974 (324.1 MiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

wlp3s0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 192.168.1.35  netmask 255.255.255.0  broadcast 192.168.1.255
        inet6 fe80::8ea9:82ff:fe7b:8906  prefixlen 64  scopeid 0x20<link>
        ether 8c:a9:82:7b:89:06  txqueuelen 1000  (Ethernet)
        RX packets 2325385  bytes 2629859900 (2.4 GiB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 2023796  bytes 510997240 (487.3 MiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
```

It is also possible to use `ifconfig` to change the network configurations, but you should have root access:

```text
$  sudo ifconfig enp0s25 192.168.42.42
password for jadi:
$ ifconfig enp0s25
enp0s25: flags=4099<UP,BROADCAST,MULTICAST>  mtu 1500
        inet 192.168.42.42  netmask 255.255.255.0  broadcast 192.168.42.255
        ether f0:de:f1:62:c5:73  txqueuelen 1000  (Ethernet)
        RX packets 0  bytes 0 (0.0 B)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 0  bytes 0 (0.0 B)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
        device interrupt 20  memory 0xd1500000-d1520000  

$
```

In case you want to change the netmask of an interface, do `ifconfig eth0 netmask 255.255.0.0` or as most of us used to do, issue both in one command:

```text
# ifconfig eth0 192.168.42.42 netmask 255.255.255.0
```

It is also possible to turn the interfaces _up_ and _down_ \(on and off\) using a predefined configurations by:

```text
$ sudo ifconfig enp0s25 down
[sudo] password for jadi:
$ ifconfig
lo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536
        inet 127.0.0.1  netmask 255.0.0.0
        inet6 ::1  prefixlen 128  scopeid 0x10<host>
        loop  txqueuelen 1  (Local Loopback)
        RX packets 562273  bytes 340257228 (324.4 MiB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 562273  bytes 340257228 (324.4 MiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0

wlp3s0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500
        inet 192.168.1.35  netmask 255.255.255.0  broadcast 192.168.1.255
        inet6 fe80::8ea9:82ff:fe7b:8906  prefixlen 64  scopeid 0x20<link>
        ether 8c:a9:82:7b:89:06  txqueuelen 1000  (Ethernet)
        RX packets 2330388  bytes 2634026235 (2.4 GiB)
        RX errors 0  dropped 0  overruns 0  frame 0
        TX packets 2027352  bytes 511549072 (487.8 MiB)
        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0
```

As you can see \_down\_ing the interface removed it from the list of active interfaces, using switch `-a` will tell the `ifconfig` to show ALL interfaces, even if they are down.

In many systems there are `ifup` and `ifdown` commands directly to up and down interfaces easily. They work just like `ifup eth0`.

These predefined configs are located at `/etc/network/interfaces` on Debian based machines and at `/etc/sysconfig/network-scripts/` in RPM based distro. 

This is a sample of such file on a RedHat based distro:

```text
$ cat /etc/sysconfig/network-scripts/ifcfg-eth0
DEVICE=eth0
ONBOOT=yes
TYPE=Ethernet
IPADDR=192.168.1.10
NETMASK=255.255.255.0
DNS1=4.2.2.4
```
On RPM systems, the default gateway is configured via the below file:

```text
cat /etc/sysconfig/network
NETWORKING=yes
HOSTNAME=lpictest
GATEWAY=192.168.1.1
```

On Debian based systems \(including Ubuntu\) the main configuration file for network interfaces is `/etc/network/interfaces`. This one file has the configuration for all of the interfaces. Have a look:

```text
auto lo
iface lo inte loopback

auto eth0
#ifconfig eth0 inet dhcp
iface eth0 inet static
address 192.168.1.10
netmask 255.255.255.0
gateway 192.168.1.1
dns-nameservers 4.2.2.4
```

### `ip` 
Recent distributions are mostly using the `ip` command. This command can do lots of things including and not limited to showing and configuring the IP addresses, netmasks, default gateways & routing rules.

```
ip addr add 172.19.1.10/24 dev eth2 # temporary adding an IP
ip addr show eth2
ip addr del 172.19.1.10/24 dev eth2 # deleting an IP address
ip link set eth2 up # brining a NIC up
ip route show
ip route add default via 192.168.1.1 # add default gateway
```
Please note that above commands do temporary changes which will be lost after restarting the `NetworkManager` service. If you need permanent changes, it should be done using the configuration files or Network Manager interfaces. 

### NetworkManager & `nmcli`
In recent years, `NetworkManager` services has gained a lot of popularity. This service can "watch" the status of network and various configuration and configure the network cards (specially the wifi ones) accordingly. This is what makes our laptop connected whenever we open it in an area with a known WiFi or ask about the password if we want to connect to a new network or assign IP addresses as soon as we connect the cable to our Ethernet card. This IP assignment might happen via the "permanent IP configuration" on your device or a protocol called DHCP. When using DHCP (Dynamic Host Configuration Protocol), your computer asks a DHCP server (say your home's wifi router) about the IP, Netmask, Default gateway, DNS and other stuff and sets them. 

By default, NetworkManager  daemon controls the networks which are not mentioned in `/etc/network/interfaces`. This service is running in the background and controls the NICs which are not configured there. Various frontend GUI (graphical user interface) or TUI (textual user interface. try `nmtui` ) or CLI (command line interfaces) programs exists to control or configure the NetworkManager daemon. If you are using a Desktop Linux, you've probably already used / know one (say the network manager applet). Here I will show you how to use the `nmcli` from the command line.

We always call the `nmcli` with one of it various commands, here is a list:

| Command | Usage |
| ------- | ----- |
| general | NetworkManager’s general status and operations. |
| networking | Overall networking control. | 
| radio |            NetworkManager radio switches. |
| connection | Controlling the connection |
| device | Devices controlled by NetworkManager |
| agent | secret or polkit agent |
| monitor | Montor the changes |

for example we can check the current status with the `general` command:

```
➜  ~ nmcli general
STATE      CONNECTIVITY  WIFI-HW  WIFI     WWAN-HW  WWAN    
connected  full          enabled  enabled  missing  enabled
```
                
Or if you want to check the devices or list of wifi connections:

```
➜  ~ nmcli device          
DEVICE            TYPE      STATE                   CONNECTION          
wlp108s0          wifi      connected               Sharm Bar Sansoor 5 
docker0           bridge    connected (externally)  docker0             
lo                loopback  connected (externally)  lo                  
p2p-dev-wlp108s0  wifi-p2p  disconnected            --                  
➜  ~ nmcli device wifi     
IN-USE  BSSID              SSID                 MODE   CHAN  RATE        SIGNAL  BARS  SECURITY  
        6C:AD:EF:38:13:38  AxLTE                Infra  3     270 Mbit/s  84      ▂▄▆█  WPA2      
        00:E0:4C:93:1D:B8  Lanat Be Sansoorchi  Infra  6     130 Mbit/s  59      ▂▄▆_  WPA2      
*       24:F5:A2:42:DE:CE  Sharm Bar Sansoor 5  Infra  36    540 Mbit/s  47      ▂▄__  WPA2      
        30:A2:20:DD:8B:54  AvinaAmin            Infra  7     270 Mbit/s  29      ▂___  WPA1 WPA2 
        30:85:A9:8C:71:2C  bahram               Infra  11    65 Mbit/s   29      ▂___  WPA2
```

To connect to a wifi network youc an do:

```
nmcli device wifi connect AxLTE password AFunkyPassword 
```
### Fancy Names for Computers

#### hostname
Remembering IP addresses are easy for robots but not for humans. Thats why we have "hostname"s. A hostname is a like a contact list where you just tell "call Jadi" and the system known my phone number. If you check your `/etc/hostname`, you will see your machines name there. Although you can change it temporarily (or permanently). The command is `hostnamectl`. 

```
[funlap ~]# hostnamectl set-hostname mycoolmachine
[funlap ~]# hostname
mycoolmachine
[funlap ~]# cat /etc/hostname 
mycoolmachine
[funlap ~]# bash
[mycoolmachine ~]# 
```

Or you can change it as *transient*, which is a temporary change using the `--transient` switch.

It is also possible to define a "pretty" name for your computer so other systems might show it in their interfaces more nicely:

```
[mycoolmachine ~]# hostnamectl --pretty set-hostname "LAN Shared Storage"
[mycoolmachine ~]# hostnamectl status
 Static hostname: mycoolmachine
 Pretty hostname: LAN Shared Storage
       Icon name: computer-convertible
         Chassis: convertible
      Machine ID: 0b126c4b6f4347168140eaa6202ce8be
         Boot ID: 675eff37f42648c6bdea31177596557f
Operating System: Manjaro Linux                   
          Kernel: Linux 6.1.38-1-MANJARO
    Architecture: x86-64
 Hardware Vendor: Dell Inc.
  Hardware Model: Latitude 7390 2-in-1
Firmware Version: 1.30.0
```

#### `/etc/hosts`
This file contains a list of IPs and their corresponding names, including your own computers. 

```
[mycoolmachine ~]# head -20 /etc/hosts
##
# Host Database
#
# localhost is used to configure the loopback interface
# when the system is booting.  Do not change this entry.
##
127.0.0.1	localhost funlife db
255.255.255.255	broadcasthost
::1             localhost
##
# Host Database
#
# localhost is used to configure the loopback interface
# when the system is booting.  Do not change this entry.
##

198.74.56.50 jobs.jadi.net
192.168.1.22 amoledtesting 

67.217.170.72 vps
```

So when you need to reach a machine by its name, your OS will now which IP to reach. 

#### DNS configuration
DNS (which stands for Domain Name System) is a server which translates human readable domain names (or more technically, text based domain names) to the corresponding IP addresses. You have to configure your computer to use a DNS so it will know which IP to contacted if you wanted to reach `linux1st.com` (and [donate](https://linux1st.com/support) maybe).

This configuration can be found in `/etc/resolve.conf`.

```
nameserver 192.168.1.1
nameserver 4.2.2.4
domain jadi.net
search jadi.net company.com
```

Here I'm telling my computer to contact the DNS on my home network (192.168.1.1) or a DNS located at 4.2.2.4 if it needed to translate an address to an IP. 

The `domain` configuration sets a local domain name so the machines in this domain will be able to use a short name (tv, instead of tv.jadi.net) and the `search` config does kind the same and tells the resolver to search for `tv.jadi.net` and `tv.company.com` if it was trying to resolve `tv`.

#### nsswitch

The `/etc/nsswitch.conf` file is used to configure which services are to be used to determine information such as hostnames, password files, and group files. Mine is

```text
# cat /etc/nsswitch.conf
# Begin /etc/nsswitch.conf

passwd: files
group: files
shadow: files

publickey: files

hosts: files dns myhostname
networks: files

protocols: files
services: files
ethers: files
rpc: files

netgroup: files

# End /etc/nsswitch.conf
```

So if someone wants to check a password, the system will try the password _file_ on the system. Or if they want to check an ip address of a hostname, my config says `hosts: files dns myhostname` so the computer first tries the files \(/etc/hosts\) and then goes for DNS. If I reverse these and change the line to

```text
hosts:      dns files
```

any resolve request will be sent to a DNS server first and the /etc/hosts will be used _only_ if the DNS servers answeres "I dont know!"



