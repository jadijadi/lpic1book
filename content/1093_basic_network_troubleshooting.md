Title: 109.3 Basic network troubleshooting
Date: 2021-08-03 13:38
Category: 109

# 109.3 Basic network troubleshooting

_Weight: 4_

Candidates should be able to troubleshoot networking issues on client hosts.

## Key Knowledge Areas

* Manually and automatically configure network interfaces and routing tables to include adding, starting, stopping, restarting, deleting or reconfiguring network interfaces.
* Change, view, or configure the routing table and correct an improperly set default route manually.
* Debug problems associated with the network configuration.

## Terms and Utilities

* ifconfig
* ip
* ifup
* ifdown
* route
* host
* hostname
* dig
* netstat
* ping
* ping6
* traceroute
* traceroute6
* tracepath
* tracepath6
* netcat

## Troubleshooting network problems

When a network related problem is reported to you, you have to take a lot of steps to find out where the root cause of the problem is. For example if the report says "I can not open webpages", you have to start from checking if the network interface has an ip, it it is up, it the routing is OK and if the DNS works fine and if everything is OK, you have to try reaching a server on the Internet via `ping` command and if you see any problems, you have to use `traceroute` to see where your traffic is going wrong. In this lesson, we will review these basic steps.

### ifconfig & ip

As you already know, `ifconfig` and `ip` commands can be used to check the IP address of your interfaces. If a network card is going to work, it needs an correct IP address and netmask. Let me check my own computer to see it has an IP address:

```
[jadi@funlife ~]$ ip addr show
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host
       valid_lft forever preferred_lft forever
2: wlp3s0: <NO-CARRIER,BROADCAST,MULTICAST,UP> mtu 1500 qdisc pfifo_fast state DOWN group default qlen 1000
    link/ether f0:de:f1:62:c5:73 brd ff:ff:ff:ff:ff:ff
3: enp0s25: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP group default qlen 1000
    link/ether 8c:a9:82:7b:89:06 brd ff:ff:ff:ff:ff:ff
    inet 192.168.1.35/24 brd 192.168.1.255 scope global dynamic wlp3s0
       valid_lft 254836sec preferred_lft 254836sec
    inet6 fe80::8ea9:82ff:fe7b:8906/64 scope link
       valid_lft forever preferred_lft forever
[jadi@funlife ~]$ ifconfig
enp0s25   Link encap:Ethernet  HWaddr f0:de:f1:62:c5:73  
          inet addr:192.168.1.35  Bcast:192.168.1.255  Mask:255.255.255.0
          inet6 addr: fe80::8ea9:82ff:fe7b:8906/64 Scope:Link
          UP BROADCAST RUNNING MULTICAST  MTU:1500  Metric:1
          RX packets:231586 errors:0 dropped:0 overruns:0 frame:0
          TX packets:200220 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:1000
          RX bytes:198053888 (198.0 MB)  TX bytes:51583154 (51.5 MB)

lo        Link encap:Local Loopback  
          inet addr:127.0.0.1  Mask:255.0.0.0
          inet6 addr: ::1/128 Scope:Host
          UP LOOPBACK RUNNING  MTU:65536  Metric:1
          RX packets:221752 errors:0 dropped:0 overruns:0 frame:0
          TX packets:221752 errors:0 dropped:0 overruns:0 carrier:0
          collisions:0 txqueuelen:0
          RX bytes:150859909 (150.8 MB)  TX bytes:150859909 (150.8 MB)


[jadi@funlife ~]$
```

Both commands show that my IP address is OK. This is assigned to my be the WiFi modem and _192.168.1.35_ as IP and _255.255.255.0_ looks reasonable.

#### ping

This is the most common tool when troubleshooting a network problem. Lets see if I can see my network gateway first.

```
[jadi@funlife ~]$ route
Kernel IP routing table
Destination     Gateway         Genmask         Flags Metric Ref    Use Iface
default         192.168.1.1     0.0.0.0         UG    600    0        0 wlp3s0
link-local      *               255.255.0.0     U     1000   0        0 wlp3s0
192.168.1.0     *               255.255.255.0   U     600    0        0 wlp3s0
[jadi@funlife ~]$ ping 192.168.1.1
PING 192.168.1.1 (192.168.1.1) 56(84) bytes of data.
64 bytes from 192.168.1.1: icmp_seq=1 ttl=254 time=3.02 ms
64 bytes from 192.168.1.1: icmp_seq=2 ttl=254 time=3.08 ms
^C
--- 192.168.1.1 ping statistics ---
2 packets transmitted, 2 received, 0% packet loss, time 1001ms
rtt min/avg/max/mdev = 3.023/3.052/3.082/0.062 ms
```

I can ping my gateway but is it possible to reach a server on the Internet using its IP address. Lets ping 4.2.2.4; it is very well known server on the Internet and many people use it to check their connectivity.

```
[jadi@funlife ~]$ ping 4.2.2.4
PING 4.2.2.4 (4.2.2.4) 56(84) bytes of data.
64 bytes from 4.2.2.4: icmp_seq=1 ttl=50 time=108 ms
64 bytes from 4.2.2.4: icmp_seq=2 ttl=50 time=111 ms
64 bytes from 4.2.2.4: icmp_seq=3 ttl=50 time=113 ms
^C
--- 4.2.2.4 ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, time 2003ms
rtt min/avg/max/mdev = 108.160/111.233/113.717/2.338 ms
```

This is working fine. Bud can I ping google.com too?

```
[jadi@funlife ~]$ ping google.com
ping: unknown host google.com
```

Aha! We found the problem. In this case I have a correct IP address, I can ping 4.2.2.4 but I can not ping google.com with the error message "unknown host". This means my computer can not translate google.com to its IP address; this is a DNS issue:

```
[jadi@funlife ~]$ cat /etc/resolv.conf
# Dynamic resolv.conf(5) file for glibc resolver(3) generated by resolvconf(8)
#     DO NOT EDIT THIS FILE BY HAND -- YOUR CHANGES WILL BE OVERWRITTEN
```

No wonder we had problems with surfing the WWW. There is no active DNS in my computer so no one will be able to reach sites by their domain names! This should be fixed by adding a DNS to my configuration files and then use `ifdown eth0` and then `ifup eth0` to load it.

#### routing problems

In some situations you can not reach the Internet \(say 4.2.2.4 or 8.8.8.8\) but you can ping your gateway. Have a look:

```
[jadi@funlife ~]$ ping 8.8.8.8
connect: Network is unreachable
[jadi@funlife ~]$ ping 192.168.1.1
PING 192.168.1.1 (192.168.1.1) 56(84) bytes of data.
64 bytes from 192.168.1.1: icmp_seq=1 ttl=254 time=3.03 ms
64 bytes from 192.168.1.1: icmp_seq=2 ttl=254 time=3.31 ms
^C
--- 192.168.1.1 ping statistics ---
2 packets transmitted, 2 received, 0% packet loss, time 1001ms
rtt min/avg/max/mdev = 3.039/3.174/3.310/0.146 ms
```

What is going on here? Lets see what clues do I have: 1\) I can reach the gateway 2\) when asking for the Internet, my computer does not know what to do. In this case the **default gateway** is missing: the computer does not know what to do if a packet is outside its network mask. You know that we can set the default gateway using the /etc/network/interfaces config file but there is also a `route` command to show and change the routing configurations on the fly.

> routes added or changed via `route` command will be lost after a reboot! Permanent configurations should come from configuration files.

Lets check our current routing state using `route` command as root.

```
[jadi@funlife ~]$ sudo route
[sudo] password for jadi:
Kernel IP routing table
Destination     Gateway         Genmask         Flags Metric Ref    Use Iface
link-local      *               255.255.0.0     U     1000   0        0 wlp3s0
192.168.1.0     *               255.255.255.0   U     600    0        0 wlp3s0
```

It is stated that "there is no gateway for the network 192.168.1.0 netmask 255.255.255.0". This means that if you ping a server in this network \(say 192.168.1.100\), it does not needs any routing. But what happens if you ping 8.8.8.8? Nothing stated in our _routing table_ above! No wonder that we are getting `Network is unreachable` when `ping 4.2.2.4`. Lets add a default route:

```
[jadi@funlife ~]$ sudo route add default gw 192.168.1.1
[jadi@funlife ~]$ ping 4.2.2.4
PING 4.2.2.4 (4.2.2.4) 56(84) bytes of data.
64 bytes from 4.2.2.4: icmp_seq=1 ttl=50 time=109 ms
64 bytes from 4.2.2.4: icmp_seq=2 ttl=50 time=111 ms
64 bytes from 4.2.2.4: icmp_seq=3 ttl=49 time=199 ms
^C
--- 4.2.2.4 ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, time 2002ms
rtt min/avg/max/mdev = 109.493/140.344/199.612/41.922 ms
[jadi@funlife ~]$ sudo route
Kernel IP routing table
Destination     Gateway         Genmask         Flags Metric Ref    Use Iface
default         192.168.1.1     0.0.0.0         UG    0      0        0 wlp3s0
link-local      *               255.255.0.0     U     1000   0        0 wlp3s0
192.168.1.0     *               255.255.255.0   U     600    0        0 wlp3s0
```

We were able to ping the Internet after adding a default gateway using `route` command. It is important to know that we can define even more routes and control exactly where our packets should go based on their destinations.

#### netstat

This command can show many different information about our network. The two main functionalities are showing the routing table and checking the listening ports. Lets check our routing table using it.

```
[jadi@funlife ~]$ netstat -nr
Kernel IP routing table
Destination     Gateway         Genmask         Flags   MSS Window  irtt Iface
0.0.0.0         192.168.1.1     0.0.0.0         UG        0 0          0 wlp3s0
169.254.0.0     0.0.0.0         255.255.0.0     U         0 0          0 wlp3s0
192.168.1.0     0.0.0.0         255.255.255.0   U         0 0          0 wlp3s0
```

It is also very useful to the see what ports are in listening state in our server:

```
[jadi@funlife ~]$ netstat -na | grep 80
tcp        0      0 0.0.0.0:80              0.0.0.0:*               LISTEN
```

The `-na` switch will show all the open ports and here I'm checking if port 80 \(web\) is active on my server. It is and listening to any connection from `0.0.0.0` which means "anywhere": Any one can connect to my computers web server and request pages.

> in these switches, `-n` stands for _numeric_, `-a` stands for _all ports_ and `-r` stands for _routes_.

#### traceroute

This is a more advanced troubleshooting tool. It is like pinging all the servers between you and your destination one by one and see where our packets go wrong. Lets check how I reach google.com.

```
[jadi@funlife ~]$ traceroute google.com
traceroute to google.com (173.194.32.160), 30 hops max, 60 byte packets
 1  192.168.1.1 (192.168.1.1)  3.090 ms  3.113 ms  3.115 ms
 2  85-15-16-103.shatel.ir (85.15.16.103)  29.904 ms  34.851 ms  34.885 ms
 3  85-15-0-193.shatel.ir (85.15.0.193)  34.880 ms  39.454 ms  39.459 ms
 4  85-15-0-1.shatel.ir (85.15.0.1)  39.451 ms  39.444 ms  43.865 ms
 5  172.18.196.17 (172.18.196.17)  43.887 ms  46.506 ms  51.990 ms
 6  172.18.196.22 (172.18.196.22)  51.943 ms  29.418 ms  29.430 ms
 7  10.10.53.229 (10.10.53.229)  32.421 ms  32.344 ms  34.705 ms
 8  10.10.53.222 (10.10.53.222)  39.814 ms  39.773 ms  39.808 ms
 9  xe-0-3-3-xcr2.fri.cw.net (62.208.252.109)  126.654 ms  131.411 ms  131.363 ms
10  ae29-xcr1.fri.cw.net (195.2.24.221)  126.570 ms  129.053 ms  129.073 ms
11  195.2.19.6 (195.2.19.6)  173.273 ms  173.284 ms  178.795 ms
12  216.239.56.106 (216.239.56.106)  143.786 ms  145.279 ms 216.239.57.143 (216.239.57.143)  115.669 ms
13  209.85.143.25 (209.85.143.25)  111.427 ms  113.970 ms  113.989 ms
14  74.125.37.88 (74.125.37.88)  127.402 ms  125.199 ms 74.125.37.92 (74.125.37.92)  122.175 ms
15  209.85.247.72 (209.85.247.72)  137.551 ms  137.564 ms  140.535 ms
16  72.14.236.249 (72.14.236.249)  161.583 ms  170.447 ms  170.407 ms
17  173.194.32.160 (173.194.32.160)  170.375 ms 72.14.235.231 (72.14.235.231)  159.352 ms  161.666 ms
```

On the first step \(1\) I reach my own router. On the 2nd step, I'm at my ISP which is shutel. I'm still on shatel on 3rd and 4th steps and so on. After a long path, on the 17th step, I reach my destination. This is used to troubleshoot routing problems.

> In some routers, the ping trafic is blocked and you will see `*  *  *` at some steps because those servers are blocking ICMP traffic.

There is another command called `tracepath` which is very similar to `traceroute`. For the LPIC1 level, they are essentially the same!

#### IPv6

If you are on an IPv6 network you have to use `traceroute6` and `ping6` instead of `traceroute` and `ping`. As easy as that.

#### dig

The `dig` command is a DNS lookup tool. If you are having problem with a domain name, you can check how it is being resolved to IPs; and by whom.

```
[jadi@funlife ~]$ dig google.com

; <<>> DiG 9.9.5-11ubuntu1.3-Ubuntu <<>> google.com
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 50032
;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 0

;; QUESTION SECTION:
;google.com.            IN    A

;; ANSWER SECTION:
google.com.        293    IN    A    216.58.214.46

;; Query time: 120 msec
;; SERVER: 4.2.2.4#53(4.2.2.4)
;; WHEN: Fri Apr 01 22:00:05 IRDT 2016
;; MSG SIZE  rcvd: 44
```

You can see that SERVER 4.2.2.4 is resolving google.com to 216.58.214.46.

#### netcat

The nc \(or netcat\) utility is used for just about anything under the sun involving TCP, UDP, or UNIX-domain sockets.  It can open TCP connections, send UDP packets, listen on arbitrary TCP and UDP ports, do port scanning, and deal with both IPv4 and IPv6.  Unlike telnet, nc scripts nicely, and separates error messages onto standard error instead of sending them to standard output, as telnet does with some. This is a very capable command and it is enough for you to be familier with its general concept.

.

.

.

.

.

.

.

.

.
