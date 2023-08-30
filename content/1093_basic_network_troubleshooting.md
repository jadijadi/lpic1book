Title: 109.3 Basic network troubleshooting
Date: 2010-12-03 10:20
Category: LPIC1
Tags: LPIC1, 102, LPIC1-102-500
Authors: Jadi
sortorder: 420
Summary: 

_Weight: 4_

Candidates should be able to troubleshoot networking issues on client hosts.

### Key Knowledge Areas

* Manually configure network interfaces, including viewing and changing the configuration of network interfaces using iproute2.
* Manually configure routing, including viewing and changing routing tables and setting the default route using iproute2.
* Debug problems associated with the network configuration.
* Awareness of legacy net-tools commands.


### Terms and Utilities

* ip
* hostname
* ss
* ping
* ping6
* traceroute
* traceroute6
* tracepath
* tracepath6
* netcat
* ifconifg
* netstat
* route

<iframe width="560" height="315" src="https://www.youtube.com/embed/sAzkN5P2-0E?si=P1r5KgfEvit_BMFW" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

### Troubleshooting network problems

When a network related problem is reported to you, you have to take a lot of steps to find out where the root cause of the problem is. For example, if the report says "I can not open webpages", you have to start from checking if the network interface has an ip, if it is up, its the routing is OK and if the DNS works fine and if everything is OK, you have to try reaching a server on the Internet via `ping` command and if you see any problems, you have to use `traceroute` to see where your traffic is going wrong. In this lesson, we will review these basic steps.

#### ifconfig & ip

As you already know, `ifconfig` and `ip` commands can be used to check the IP address of your interfaces. If a network card is going to work, it needs a correct IP address and netmask. Let me check my own computer to see it has an IP address:

```text
[jadi@debian ~]$ ip addr show
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
[jadi@debian ~]$ ifconfig
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
```

Both commands show that my IP address is OK. This is assigned to may be the Wi-Fi modem and 192.168.1.35 as IP and 255.255.255.0 looks reasonable.

> Please note that you can get a full help on `ip` using the `man ip` or get manual of a specific section using the `man ip-address` (or any other subcommand)

#### ping & ping6

This is the most common tool when troubleshooting a network problem. It sends an ICMP packet to a destination and if it gets back an answer, will inform you about not only it, but all the stats. Below, I will check my default route and will try to ping it. You should always be able to ping your default router, although sometimes paranoid sysadmins block the ICMP on the network and although you are connected, you won't get back answers.

```text
jadi@debian:~$ ip route show
default via 192.168.70.1 dev enp0s1
172.17.0.0/16 dev docker0 proto kernel scope link src 172.17.0.1 linkdown
192.168.70.0/24 dev enp0s1 proto kernel scope link src 192.168.70.2
jadi@debian:~$ ping 192.168.70.1
PING 192.168.70.1 (192.168.70.1) 56(84) bytes of data.
64 bytes from 192.168.70.1: icmp_seq=1 ttl=64 time=1.11 ms
64 bytes from 192.168.70.1: icmp_seq=2 ttl=64 time=0.855 ms
^C
--- 192.168.70.1 ping statistics ---
2 packets transmitted, 2 received, 0% packet loss, time 1002ms
rtt min/avg/max/mdev = 0.855/0.984/1.113/0.129 msec
```

I can ping my gateway, but is it possible to reach a server on the Internet using its IP address. To find the answer, let's ping 4.2.2.4; it is very well known server on the Internet and many people use it to check their IP connectivity.

```text
[jadi@debian ~]$ ping 4.2.2.4
PING 4.2.2.4 (4.2.2.4) 56(84) bytes of data.
64 bytes from 4.2.2.4: icmp_seq=1 ttl=50 time=108 ms
64 bytes from 4.2.2.4: icmp_seq=2 ttl=50 time=111 ms
64 bytes from 4.2.2.4: icmp_seq=3 ttl=50 time=113 ms
^C
--- 4.2.2.4 ping statistics ---
3 packets transmitted, 3 received, 0% packet loss, time 2003ms
rtt min/avg/max/mdev = 108.160/111.233/113.717/2.338 ms
```

This is also working fine. But can I ping google.com too?

```text
[jadi@debian ~]$ ping google.com
ping: unknown host google.com
```

Aha! We found the problem. In this case I have a correct IP address on my machine, I can ping my default gateway and I can ping 4.2.2.4, but I can not ping google.com. The error message is "unknown host". This means my computer can not translate google.com to its IP address; this is a DNS issue:

```text
[jadi@debian ~]$ cat /etc/resolv.conf
# Dynamic resolv.conf(5) file for glibc resolver(3) generated by resolvconf(8)
#     DO NOT EDIT THIS FILE BY HAND -- YOUR CHANGES WILL BE OVERWRITTEN
```

No wonder, we had problems with surfing the WWW. There is no active DNS in my computer so no one will be able to reach sites by their domain names! This should be fixed by adding a DNS to my configuration file.

#### routing problems

In some situations you can not reach the Internet \(say 4.2.2.4 or 8.8.8.8\) but you can ping your gateway. Have a look:

```text
[jadi@debian ~]$ ping 8.8.8.8
connect: Network is unreachable
[jadi@debian ~]$ ping 192.168.1.1
PING 192.168.1.1 (192.168.1.1) 56(84) bytes of data.
64 bytes from 192.168.1.1: icmp_seq=1 ttl=254 time=3.03 ms
64 bytes from 192.168.1.1: icmp_seq=2 ttl=254 time=3.31 ms
^C
--- 192.168.1.1 ping statistics ---
2 packets transmitted, 2 received, 0% packet loss, time 1001ms
rtt min/avg/max/mdev = 3.039/3.174/3.310/0.146 ms
```

What is going on here? Let's see, what clues do I have:
1) I can reach the gateway.
2) when asking for the Internet, my computer does not know what to do.
In this case the **default gateway** is missing: the computer does not know what to do if a packet is outside its network mask. You know that we can set the default gateway using the /etc/network/interfaces config file, but there is also a `route` (or the newer `ip route` subcommand) to show and change the routing configurations on the fly.

> Routes added or changed via `ip route` (or `route`) will be lost after a reboot! Permanent configurations should come from configuration files.

Lets check our current routing state using `route` command as root.

```text
jadi@debian:~$ ip route show
default via 192.168.70.1 dev enp0s1
172.17.0.0/16 dev docker0 proto kernel scope link src 172.17.0.1 linkdown
192.168.70.0/24 dev enp0s1 proto kernel scope link src 192.168.70.2

jadi@debian:~$ sudo ip route del default
[sudo] password for jadi:

jadi@debian:~$ ip route show
172.17.0.0/16 dev docker0 proto kernel scope link src 172.17.0.1 linkdown
192.168.70.0/24 dev enp0s1 proto kernel scope link src 192.168.70.2

jadi@debian:~$ ping 4.2.2.4
ping: connect: Network is unreachable

jadi@debian:~$ ip route add default via 192.168.70.1
RTNETLINK answers: Operation not permitted

jadi@debian:~$ sudo ip route add default via 192.168.70.1

jadi@debian:~$ ping 4.2.2.4
PING 4.2.2.4 (4.2.2.4) 56(84) bytes of data.
64 bytes from 4.2.2.4: icmp_seq=1 ttl=55 time=316 ms
64 bytes from 4.2.2.4: icmp_seq=2 ttl=55 time=434 ms
^C
--- 4.2.2.4 ping statistics ---
2 packets transmitted, 2 received, 0% packet loss, time 1002ms
rtt min/avg/max/mdev = 316.253/375.282/434.311/59.029 ms
```

We were able to ping the Internet after adding a default gateway using `ip route` command. It is important to know that we can define even more routes and control exactly where our packets should go based on their destinations.

#### tracepath & traceroute


This is a more advanced troubleshooting tool. It is like pinging all the servers between you and your destination one by one and see where our packets go wrong. Lets check how I reach google.com.

```text
jadi@debian:~$ traceroute 4.2.2.4
traceroute to 4.2.2.4 (4.2.2.4), 30 hops max, 60 byte packets
 1  192.168.70.1 (192.168.70.1)  0.619 ms *  0.673 ms
 2  10.192.0.1 (10.192.0.1)  421.898 ms  728.657 ms  728.617 ms
 3  162.221.202.253 (162.221.202.253)  728.597 ms  728.564 ms  728.552 ms
 4  * * *
 5  207.35.48.241 (207.35.48.241)  728.289 ms  728.265 ms  728.251 ms
 6  agg2-vancouverbg_5-2-0.net.bell.ca (64.230.122.250)  728.344 ms agg1-vancouverbg_5-2-0.net.bell.ca (64.230.122.248)  612.097 ms  922.055 ms
 7  * * *
 8  bx6-seattle_et-0/0/13_ae1.net.bell.ca (64.230.76.157)  921.662 ms  921.635 ms  921.566 ms
 9  ae96.edge6.Seattle1.Level3.net (4.16.2.13)  921.511 ms  921.372 ms  921.317 ms
10  * * ae6.4.edge2.SanJose1.level3.net (4.69.220.185)  920.786 ms
11  d.resolvers.level3.net (4.2.2.4)  601.295 ms  921.003 ms  920.970 ms
```

On the first step \(1\) I reach my own router. On the 2nd step, I'm at my ISPs local network and then will reach 162.blah.blah.blah. You can see in some cases the traceroute were able to do a **reverse DNS lookup** and find the hostname of the IPs and show them. After 11 hops, I reached my destination. The traceroute is a very useful tool in troubleshooting network and routing issues or checking the status of your network and paths. 

> In some routers, the ping traffic is blocked, and you will see `* * *` at some steps because those servers are blocking ICMP traffic.

There is another command called `tracepath` which is very similar to `traceroute`. For the LPIC1 level, they are essentially the same!


#### ss & netstat

<iframe width="560" height="315" src="https://www.youtube.com/embed/AvVOHQdbZDA?si=WZzCqGbaEdUDFp88" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

These commands can show a wide range of information about our network. The `ss` is the newer one and `netstat` is the older one. The two commands are replaceable in most cases and does the same things and even have similar option in most use cases. You can use the `netstat` to check your routing table:

```text
jadi@debian:~$ netstat -nr
Kernel IP routing table
Destination     Gateway         Genmask         Flags   MSS Window  irtt Iface
0.0.0.0         192.168.70.1    0.0.0.0         UG        0 0          0 enp0s1
172.17.0.0      0.0.0.0         255.255.0.0     U         0 0          0 docker0
192.168.70.0    0.0.0.0         255.255.255.0   U         0 0          0 enp0s1
```

Or use the `ss` to see which port is in the LISTENING mode:

```text
jadi@debian:~$ ss -na | grep LISTEN | grep tcp
tcp   LISTEN 0      128                                       127.0.0.1:631              0.0.0.0:*
tcp   LISTEN 0      100                                         0.0.0.0:25               0.0.0.0:*
tcp   LISTEN 0      128                                         0.0.0.0:22               0.0.0.0:*
tcp   LISTEN 0      100                                            [::]:25                  [::]:*
tcp   LISTEN 0      128                                            [::]:22                  [::]:*
tcp   LISTEN 0      128                                           [::1]:631                 [::]:*
```

The `-na` switch will show all the open ports (including sockets) and here I'm checking only for the tcp ones in the LISTEN status.

> In these switches, `-n` stands for _numeric_, `-a` stands for _all ports_ and `-r` stands for _routes_.

A super common combination is the `-tulpn` option set:

```
jadi@debian:~$ ss -tulpn
Netid             State              Recv-Q             Send-Q                         Local Address:Port                          Peer Address:Port            Process
udp               UNCONN             0                  0                                    0.0.0.0:68                                 0.0.0.0:*
udp               UNCONN             0                  0                                    0.0.0.0:631                                0.0.0.0:*
udp               UNCONN             0                  0                                    0.0.0.0:58120                              0.0.0.0:*
udp               UNCONN             0                  0                                    0.0.0.0:5353                               0.0.0.0:*
udp               UNCONN             0                  0                                       [::]:39822                                 [::]:*
udp               UNCONN             0                  0                                       [::]:5353                                  [::]:*
tcp               LISTEN             0                  128                                127.0.0.1:631                                0.0.0.0:*
tcp               LISTEN             0                  100                                  0.0.0.0:25                                 0.0.0.0:*
tcp               LISTEN             0                  128                                  0.0.0.0:22                                 0.0.0.0:*
tcp               LISTEN             0                  100                                     [::]:25                                    [::]:*
tcp               LISTEN             0                  128                                     [::]:22                                    [::]:*
tcp               LISTEN             0                  128                                    [::1]:631                                   [::]:*
```

#### netcat

The nc \(or netcat\) utility is used for just about anything under the sun involving TCP, UDP, or UNIX-domain sockets. It can open TCP connections, send UDP packets, listen on arbitrary TCP and UDP ports, do port scanning, and deal with both IPv4 and IPv6. Unlike telnet, nc can be used easily in the scripts and separates error messages onto standard error instead of sending them to standard output, as telnet does with some. This is a very capable command, and it is enough for you to be familiar with its general concept.

Here I'm creating a tcp listener on port 1337:

```
jadi@debian:~$ nc -l 1337
```

And here I'm opening a connection to that port and sending some data:

```
jadi@debian:~$ nc localhost 1337
Are you enjoying the LPIC?
```

And the message should be visible on the listening `nc`. 

#### dig

The `dig` command is a DNS lookup tool. If you are having a problem with a domain name, you can check how it is being resolved to IPs; and by whom.

```text
[jadi@debian ~]$ dig google.com

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

