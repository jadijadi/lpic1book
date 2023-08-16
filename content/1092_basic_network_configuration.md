Title: 109.2 Persistent network configuration
Date: 2010-12-03 10:20
Category: LPIC1
Tags: LPIC1, 102, LPIC1-102-500
Authors: Jadi
sortorder: 410
Summary: 
## 109.2 Persistent network configuration

_Weight: 4_

Candidates should be able to view, change and verify configuration settings on client hosts.

### Key Knowledge Areas

* Understand basic TCP/IP host configuration
* Configure ethernet and wi-fi network configuration using NetworkManager
* Awareness of systemd-networkd

### Terms and Utilities

* /etc/hostname
* /etc/hosts
* /etc/nsswitch.conf
* /etc/resolv.conf
* nmcli
* hostnamectl
* ifup
* ifdown

### Intro
As we saw in the previous section, every PC, server, laptop, phone, .. should have an IP configuration (IP, Netmask, Default gateway, DNS, ..) to work properly in the network. This can be done in various ways. Some devices like laptops are changing their network all the time and should be able to keep up with the changes. Some servers remain in the same location (physical and network wise) all their life and should persist this configuration after restarts, outages, upgrade and HW changes.

In this section we will see how this can be achieved in modern GNU/Linux systems.


### Network Interface
The NIC (or Network Interface Card) is the physical network hardware in your computer. This can be the chip+antenna in your mobile phone or an Ethernet Card connected to a network cable on your PC.

In older systems, these were called things like `eth0`, `eth1`, `eth2`, .. where 0, 1 & 2 were decided by the kernel - mostly based on the order of loading the drivers. In recent Linux machines the NICs are called by `wlan0`, `eno1`, `ens1`, `enp3s2` and such. This is based on some more concrete data like being an `wireless` or `et`hernet, PCI (`ens`) or bus like (`enp`). 

The `ip` command can show these:

`ip link show`

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

In may systems there are `ifup` and `ifdown` commands directly to up and down interfaces easily. They work just like `ifup eth0`.

These predefined configs are located at `/etc/network/interfaces` on Debian based machines and in `/etc/sysconfig/network-scripts/` in RPM based computers. 

This is a sample:

```
iface enp3s2 inet static
    address 192.168.1.100/24
    gateway 192.168.1.1
```

### `ip` 
Recent distors are mostly using the `ip` command. This command can do lots of things including and not limited to showing and configuring the IP addresses, netmasks, default gateways & routing rules.

```
some usage examples
```

### NetworkManager & `ncmli`
In recent years, `NetworkManager` services has gained a lot of popularity. This service can "watch" the status of network and various configuration and configure the network cards (specially the wifi ones) accordingly. This is what makes our laptop connected whenever we open it in an area with a known WiFi or ask about the password if we want to connect to a new network or assign IP addresses as soon as we connect the cable to our Ethernet card. This IP assignment might happen via the "permanent IP configuration" on your device or a protocol called DHCP. When using DHCP (Dynamic Host Configuration Protocol), your computer asks a DHCP server (say your home's wifi router) about the IP, Netmask, Default gateway, DNS and other stuff and sets them. 

By default, NetworkManager  daemon controls the networks which are not mentioned in `/etc/network/interfaces`. This service is running in the background and controls the NICs which are not configured there. Various frontend GUI (graphical user interface) or TUI (textual user interface) or CLI (command line interfaces) programs exists to control or configure the NetworkManager daemon. If you are using a Desktop Linux, you've probably already used / know one (say the network manager applet). Here I will show you how to use the `nmcli` from the command line. 

We always call the `nmcli` with one of it various commands, here is a list:

| Command | Usage |
| ------- | ----- |
| general | NetworkManager’s general status and operations. |
| networking | Overall networking control. | 

### Textual Names for Computers

#### hostname
Remembering IP addresses are easy for robots but not for humans. Thats why we have "hostname"s. A hostname is a like a contact list where you just tell "call Jadi" and the system known my phone number. If you check your `/etc/hostname`, you will see your machines name there. Although you can change it temporary (or permanently). The command is `hostnamectl`. 

```
# hostnamectl set-hostname mycoolmachine
# at /etc/hostname
```

Or you can change it as *transient*, which is a temporary change using the `--transient` switch.

It is also possible to define a "pretty" name for your computer so other systems might show it in their interfaces more nicely:

```
# hostnamectl --pretty set-hostname "LAN Shared Storage"
# hostnamectl status
```

#### /etc/hosts
This file contains a list of IPs and their corresponding names, including your own computers. 

```
etc hosts
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

#### Network Gateways

A computer normaly can see all of the computers in its own subnet / netmask. But what happens when you send a packet to a computer _outside_ of your own network? In this case your computer delivers that packet to an address called **network gateway**. The **gateway** device can **route** the packets between different networks. It has more than 1 interface and is connected to different networks so working like a post office, it can hand over your packets to another network and after several handovers, your packet will reach its destination.

In your network configurations, there is a **default gateway**. That is the address which is used as a **gateway** when your computer tries to reach a computer outside its network.

#### network configuration files

**Redhat based systems**

Unfortunately Debian based and Redhat based systems use different locations for their nework configuration files. On Redhat, CentOS, Fedora, ... the fiels are located at `/etc/sysconfig/network-scripts/`. A sample is as below:

```text
$ cat /etc/sysconfig/network-scripts/ifcfg-eth0
DEVICE=eth0
ONBOOT=yes
TYPE=Ethernet
IPADDR=192.168.1.10
NETMASK=255.255.255.0
DNS1=4.2.2.4
```

On these systems, the default gateway is configured via the below file:

```text
cat /etc/sysconfig/network
NETWORKING=yes
HOSTNAME=lpictest
GATEWAY=192.168.1.1
```

**Debian based systems**

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

> ifdown and ifup will use these config files

#### DNS config file

As you saw, we were able to set the DNS configuration in network interface config files. But this is not the only way. There is another file which contains this data: `/etc/resolv.conf`.

```text
$ cat /etc/resolv.conf
# Generated by resolvconf
nameserver 192.168.1.1
```

if you want to change your DNS on the fly, you can edit this file but it will be lost after reboot or ifdown and ifup.

#### hostname

There is another text file which shows or sets the hostname. That is `/etc/hostname`.

```text
$ cat /etc/hostname
funlife
```

#### hosts

The `/etc/hosts` file contains server names and their IPs. It is just like what DNS does but has a higher priority than DNS. If you add something like

```text
4.2.2.4 funnyip
```

there and `ping funnyip` your computer will start pinging 4.2.2.4 without quering any DNS server.

> there is an entry on /etc/hosts for your machine. If you are changing the /etc/hostname it is important to add that name to your /etc/hosts line containing 127.0.0.1 too.

#### route

The `route` command can show or change the routing system. As you saw on **default gateway** section, routing is responsible to send your packets to their correct destination. For checking the current route you can issue

```text
$ route
Kernel IP routing table
Destination     Gateway         Genmask         Flags Metric Ref    Use Iface
default         gateway         0.0.0.0         UG    600    0        0 wlp3s0
192.168.1.0     *               255.255.255.0   U     600    0        0 wlp3s0
```

and for temporary adding a default route, youc an do:

```text
route add default gw 192.168.1.1
```

#### ip

The `ip` command is the new tool for configuring the networking interfaces. You can do many things using it. the `addr show` will show you the current interfaces and their configurations:

```text
$ ip addr show
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host
       valid_lft forever preferred_lft forever
2: wlp3s0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP group default qlen 1000
    link/ether 8c:a9:82:7b:89:06 brd ff:ff:ff:ff:ff:ff
    inet 192.168.1.35/24 brd 192.168.1.255 scope global dynamic wlp3s0
       valid_lft 254572sec preferred_lft 254572sec
    inet6 fe80::8ea9:82ff:fe7b:8906/64 scope link
       valid_lft forever preferred_lft forever
3: enp0s25: <BROADCAST,MULTICAST> mtu 1500 qdisc fq_codel state DOWN group default qlen 1000
    link/ether f0:de:f1:62:c5:73 brd ff:ff:ff:ff:ff:ff
    inet 192.168.42.42/24 brd 192.168.42.255 scope global enp0s25
       valid_lft forever preferred_lft forever
```

#### ping

`ping` is the most straight forward network troubleshooting command. You can check your connection with any server using it. Lets see if my computer sees 4.2.2.4:

```text
$ ping 4.2.2.4
PING 4.2.2.4 (4.2.2.4) 56(84) bytes of data.
64 bytes from 4.2.2.4: icmp_seq=1 ttl=52 time=103 ms
64 bytes from 4.2.2.4: icmp_seq=2 ttl=52 time=101 ms
64 bytes from 4.2.2.4: icmp_seq=3 ttl=52 time=103 ms
64 bytes from 4.2.2.4: icmp_seq=4 ttl=52 time=102 ms
64 bytes from 4.2.2.4: icmp_seq=5 ttl=52 time=101 ms
64 bytes from 4.2.2.4: icmp_seq=6 ttl=52 time=108 ms
^C
--- 4.2.2.4 ping statistics ---
6 packets transmitted, 6 received, 0% packet loss, time 5007ms
rtt min/avg/max/mdev = 101.465/103.608/108.219/2.263 ms
```

I issued the command, waited for 6 packets, each of them returned back after 103ms, 101ms, ... and then I used Ctrl+c to break the ping. The stats tell me that 6 packets transmitted, 6 received, 0% packet loss; my network works great!

### nsswitch

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

