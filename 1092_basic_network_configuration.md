#109.2 Basic network configuration
*Weight: 4*

Candidates should be able to view, change and verify configuration settings on client hosts.

## Key Knowledge Areas
- Manually and automatically configure network interfaces.
- Basic TCP/IP host configuration.
- Setting a default route.

## Terms and Utilities
- /etc/hostname
- /etc/hosts
- /etc/nsswitch.conf
- ifconfig
- ifup
- ifdown
- ip
- route
- ping

### ifconfig, up and down
The `ifconfig` is the main command for configuring the network adapters manually. Running it with no arguments, will show all the network adapters and their configurations.
 
````
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
````

> `lo` is a virtual network adapter and is called *loopback*. It ia accessible only from the computer itself. It is used when programs want to speak with the computer they are running on it. 

Ethernet networks are called **ethx** or things like **enp0s25**. 

It is possible to use `ifconfig` to change the network configurations, but you should have root access:

````
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
````

in the same way, you can change the netmask of an interface with `ifconfig eth0 netmask 255.255.0.0` or do both in one step:

````
# ifconfig eth0 192.168.42.42 netmask 255.255.255.0
````

It is also possible to turn the interfaces *up* and *down* (on and off) using a predefined configuration by:

````
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
````

As you can see *down*ing the interface removed it from the list of active interfaces, using switch `-a` will tell the `ifconfig` to sho ALL interfaces, even if they are down.

In may systems there are `ifup` and `ifdown` commands directly to up and down interfaces easily. They work just like `ifup eth0`.

### Network Gateways
A computer normaly can see all of the computers in its own subnet / netmask. But what happens when you send a packet to a computer *outside* of your own network? In this case your computer delivers that packet to an address called **network gateway**. The **gateway** device can **route** the packets between different networks. It has more than 1 interface and is connected to different networks so working like a post office, it can hand over your packets to another network and after several handovers, your packet will reach its destination.

In your network configurations, there is a **default gateway**. That is the address which is used as a **gateway** when your computer tries to reach a computer outside its network.

### network configuration files
#### Redhat based systems
Unfortunately Debian based and Redhat based systems use different locations for their nework configuration files. On Redhat, CentOS, Fedora, ... the fiels are located at `/etc/sysconfig/network-scipts/`. A sample is as below:

````
$ cat /etc/sysconfig/network-scripts/ifcfg-eth0
DEVICE=eth0
ONBOOT=yes
TYPE=Ethernet
IPADDR=192.168.1.10
NETMASK=255.255.255.0
DNS1=4.2.2.4
````

On these systems, the default gateway is configured via the below file:

````
cat /etc/sysconfig/network
NETWORKING=yes
HOSTNAME=lpictest
GATEWAY=192.168.1.1
````

#### Debian based systems
On Debian based systems (including Ubuntu) the main configuration file for network interfaces is `/etc/network/interfaces`. This one file has the configuration for all of the interfaces. Have a look:

````
auto lo
iface lo inte loopback

auto eth0
#ifconfig eth0 inet dhcp
iface eth0 inet static 
address 192.168.1.10
netmask 255.255.255.0
gateway 192.168.1.1
dns-nameservers 4.2.2.4
````

> ifdown and ifup will use these config files 

### DNS config file
As you saw, we were able to set the DNS configuration in network interface config files. But this is not the only way. There is another file which contains this data: `/etc/resolv.conf`.

````
$ cat /etc/resolv.conf
# Generated by resolvconf
nameserver 192.168.1.1
````
if you want to change your DNS on the fly, you can edit this file but it will be lost after reboot or ifdown and ifup. 

### hostname
There is another text file which shows or sets the hostname. That is `/etc/hostname`.

````
$ cat /etc/hostname
funlife
````

### hosts
The `/etc/hosts` file contains server names and their IPs. It is just like what DNS does but has a higher priority than DNS. If you add something like

````
4.2.2.4 funnyip
````

there and `ping funnyip` your computer will start pinging 4.2.2.4 without quering any DNS server. 

> there is an entry on /etc/hosts for your machine. If you are changing the /etc/hostname it is important to add that name to your /etc/hosts line containing 127.0.0.1 too. 

### route
The `route` command can show or change the routing system. As you saw on **default gateway** section, routing is responsible to send your packets to their correct destination. For checking the current route you can issue

````
$ route
Kernel IP routing table
Destination     Gateway         Genmask         Flags Metric Ref    Use Iface
default         gateway         0.0.0.0         UG    600    0        0 wlp3s0
192.168.1.0     *               255.255.255.0   U     600    0        0 wlp3s0
````

and for temporary adding a default route, youc an do:

````
route add default gw 192.168.1.1
````

### ip
The `ip` command is the new tool for configuring the networking interfaces. You can do many things using it. the `addr show` will show you the current interfaces and their configurations:

````
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
````


### ping
`ping` is the most straight forward network troubleshooting command. You can check your connection with any server using it. Lets see if my computer sees 4.2.2.4:

````
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
````

I issued the command, waited for 6 packets, each of them returned back after 103ms, 101ms, ... and then I used Ctrl+c to break the ping. The stats tell me that 6 packets transmitted, 6 received, 0% packet loss; my network works great!

## nssswitch
The `/etc/nsswitch.conf` file is used to configure which services are to be used to determine information such as hostnames, password files, and group files. Mine is

````
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
````

So if someone wants to check a password, the system will try the password *file* on the system. Or if they want to check an ip address of a hostname, my config says `hosts: files dns myhostname` so the computer first tries the files (/etc/hosts) and then goes for DNS. If I reverse these and change the line to

````
hosts:      dns files
````

any resolve request will be sent to a DNS server first and the /etc/hosts will be used *only* if the DNS servers answeres "I dont know!"





