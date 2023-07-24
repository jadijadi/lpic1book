Title: 109.1 Fundamentals of internet protocols
Date: 2010-12-03 10:20
Category: LPIC1
Tags: LPIC1, 102, LPIC1-102-500
Authors: Jadi
sortorder: 400
Summary: 

_Weight: 4_

Candidates should demonstrate a proper understanding of TCP/IP network fundamentals.

### Key Knowledge Areas

* Demonstrate an understanding of network masks and CIDR notation.
* Knowledge of the differences between private and public "dotted quad" IP addresses.
* Knowledge about common TCP and UDP ports and services (20, 21, 22, 23, 25, 53, 80, 110, 123, 139, 143, 161, 162, 389, 443, 465, 514, 636, 993, 995).
* Knowledge about the differences and major features of UDP, TCP and ICMP.
* Knowledge of the major differences between IPv4 and IPv6.
* Knowledge of the basic features of IPv6.

### Terms and Utilities

* /etc/services
* IPv4, IPv6
* Subnetting
* TCP, UDP, ICMP

### TCP/IP
The *Transmission Control Protocol/Internet Protocol* (or TCP/IP in short) is stack or protocols which powers the most of communications on the Internet (and many other networks). Although it is generally called TCP, it also includes UDP, ICMP, DNS and many others. 

### IP
Internet Protocol or IP is a way to logically pointing to a host on the Internet. When a device has an IP Address, it is possible to send data toward it. The IP addresses should be unique so the network will know where each packet is intended to go. There are 2 active versions of the IP protocol; 4 & 6.

An IPv4 is in the form of A.B.C.D where A, B, C & D are between 0-255. The followings are all valid IP addresses:

```
1.2.3.4
1.1.1.1
100.0.0.100
192.168.1.4
```

> each part of an IP address is called an Octet since it is constructed of an 8 bit number \(0..255\) and can be shown in binary or hex or any notation, but Decimal format is more common.

Having in mind that each octet can be between 0 to 255, in total we can have 256 * 256 * 256 * 256 = 4294967296 IPv4 addresses; That is around 4.3 billion - only! Thats why we are switching to IPv6.

#### Private IPs
IP addresses should be uniq on a network so people should get their IP addresses from a central authority called Internet Assigned Numbers Authority (IANA). The available IP addresses are grouped in 3 classes:


| Class | First Octet | Range |
| ----- | ----------- | ----- |
| A | 1-126 | `1.0.0.0` to `126.255.255.255` | 
| B | 128-191 | `128.0.0.0` to `191.255.255.255` | 
| C | 192-223 | `192.0.0.0` to `223.255.255.255` | 

Normally if you are creating a server on your service provider, that service provider will give you an IP address purchased from IANA (via smaller regional registries). But what happens if you want to assign an IP to your laptop or mobile phone of tablet *inside* your home? These devices are not visible directly on the Internet and you are not going to purchase IPs for them.

Here enters the *Private IP Address* ranges. The below ranges are called "private" addresses and anyone can assign them to any device they want, as long as they are not visible on the open internet.

| range | Number of IPs in this range |
| :--- | :--- |
| 192.168.0-255.0-255 | 65K IPs |
| 172.16-31.0-255.0-255 | 1M IPs |
| 10.0-255.0-255.0-255 | 16M IPs |

Any one can use any of these IPs on her devices as long as it is not connected directly to the internet. Have a look at this example:

```text
                                                                                              XXXXXX
                                                                          XXXXXX   XXXXX    XXX    XX
                 +--------+                                              X     XXXXX   XXXXXX       XX
        +--------+172.16. |                                             XX                           X
        |        |1.1     |                                             X                            X
   +--------+    |        |                                             X                           XX
   |192.168.|    +--------+                                           XXX  Internet, Only         XX
   |2.100   |         |           +-----------------+              XXXXX   uses Public          XXXX
   |        |         |           |                 |           XXX        IP Addresses        XX
   +--------+    Private Network  | NAT, Translates |Public IP XX                              X
        |             +-----------+ between Public  +---------+X      Devices with Private IPs  XX
        |             |           | and Private IPs | 87.3.91.4 XX     reach the Internet via     X
   +--------+     +--------+      |                 |           XX    the Public IP configured   XX
   |192.168.|     |        |      |                 |            XXX    on their NAT device.     X
   |2.200   |     |172.16. |      +-----------------+               XX                          XX
   |        |     |1.2     |                                      XXX                           X
   +--------+     |        |                                     XX                             XX
                  +--------+                                     X                               XX
                                                                 X                              XXX
                                                                 XX                           XXX
                                                                   XX    XXXXXXX     XXXXXXXXXX
                                                                    XXXXXX     XXXXXXX
```

In the middle you can see a `Network Address Translation` or `NAT` device. It is connected to the Internet using only one public IP \(It might be 87.3.91.4\). On the left side of the NAT box, there are 4 devices with Private IPs. Each time any of these devices targets an address on the Internet \(a public IP\), the NAT device will use its own public IP to request that IP and when the answer is ready, will provide it to the _Natted_ device - the device behind the NAT. This way we can create huge networks behind a NAT device. In this scenario, all the devices can reach the Internet but no-one from the Internet can directly reach any of them, directly; Unless we've configured an DMZ. 

#### Subnetting (and Netmask)

OK! We have around 4B addresses in IPv4. But what happens if I send a packet to another IP? Say I try to print a document on the _local_ printer using its private IP as you learned in previous section? Who should listen for this packet? Does the whole Internet passes it hand to hand? Obviously not! Only my _local_ network should be able to receive that packet and in this specific case, only they printer should receive it on its local IP.

This is achieved by subnetting. The purpose of subnetting is to create *sub*-*networks* in your IP address range. You have already seen this times and times when talking about your Netmask (the 255.255.255.0 is a famous one) or its CIDR notation which is `/24`. Lets have a deeper look.

> CIDR stands for Classless Inter-Domain Routing

When speaking about networks, you have to decide on 

1. how many bits of my IP address is going to be shared between all my devices (network)
2. How many bits of my IP address is going to differentiate my devices in this network (hosts)

For example if you assign the `192.168.1.1` to your router and set the Netmask on `\24`, you are claiming 24 (left hand bits) of `192.168.1.1` as your Network (so `192.168.1.` because 245 = 8 * 3) and 8 bits as your Host (last octet). In this network you can assign these IPs to your devices:  `192.168.1.10`,  `192.168.1.2`,  `192.168.1.200` and they will see each other correctly. 

There are 2 methods to talk about Netmask bits. The CIDR (\24) method and Decimal Netmask (255.255.255.0) method. In CIDR we are saying how many bits are 1 (and thud the network section of an IP address) and in Decimal method, we are representing these 1 bits in an IP address format. Have a look at the following table:

| Decimal | CIDR | Binary | 
| ------- | ---- | ------ |
| 255.0.0.0 | /8 | 11111111.00000000.00000000.00000000 | 
| 255.255.0.0 | /16 | 11111111.11111111.00000000.00000000 |  
| 255.255.255.0 | /24 | 11111111.11111111.11111111.00000000 |
	
> In above table I'm just showing the easy ones ;) If you are taking an CCNA exam, you should be able to calculate the Network/Host section for something like /13; which is not difficult now that you know the concept.

Any time any packets tries to reach any IP in my **subnet** \(that is 192.168.1.0-255\), my router routes the packets correctly to the destination. But If any devices tries to reach anything out of my subnet \(say a public IP\), my router will use its NAT functionality (or other methods) to send the packets over the Internet (or the correct network based on the routing table).


> for a better understanding of subnetting, have a look at [Cisco document](http://www.cisco.com/c/en/us/support/docs/ip/routing-information-protocol-rip/13788-3.html)

### Network and Broadcast Address
When having the IP address and the Network Mask, we can calculate the network address and the broadcast address. 

The network address is a Logical AND between the IP address and the networkmask. The broadcast address is the network address with a Logical OR when all the host bits are changed to 1. 

Confusing... yes. Because talking about maths is difficult. Say we have the `192.168.4.12` as our IP Address and our CID is /24 (that is 255.255.255.0). Lets calculate the network and broadcast addresses.

```
IP:        11000000.10101000.00000100.00001100 (192.168.4.12)
Netmask:   11111111.11111111.11111111.00000000 (255.255.255.0)
Network:   11000000.10101000.00000100.00000000 (192.168.4.0)
Broadcast: 11000000.10101000.00000100.11111111 (192.168.4.255)
```

### Binary to Decimal Conversion

You are probably familiar with binary base - it is the basis of anything related to computers. If not I highly recommend you to do a google search and study if from another source since this book assumes you already know it. In short when writing numbers on binary format \(base 2\), the only used digits are 0 and 1. An easy way for conversion is using the following table to convert 0 and 1s to our _normal_ decimal format. Its enough to know the value of each bit and add up the ones having 1 in them.

| 128 | 64 | 32 | 16 | 8 | 4 | 2 | 1 | Decimal |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| 1 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 128 |
| 1 | 0 | 0 | 0 | 0 | 0 | 0 | 1 | 129 |
| 0 | 0 | 1 | 0 | 0 | 0 | 0 | 0 | 132 |
| 0 | 0 | 0 | 0 | 0 | 1 | 1 | 0 | 6 |
| 1 | 0 | 1 | 1 | 0 | 0 | 1 | 1 | 179 |
| 1 | 1 | 1 | 1 | 1 | 1 | 1 | 1 | 255 |

So `11000000.10101000.00000001.00001111` equals to `192.168.1.15`.


### Communication Protocols

When computers communicate, they use Protocols. This protocols are designed to let computers speak in different ways for fulfilling different needs. Here we will have a look at three of the most popular protocols on the Internet: TCP / UDP / ICMP.

#### TCP

Transmission Control Protocol or TCP is designed to make sure that both parties are _speaking_ with each other without loosing any information. In this protocol the receiver will get anything the sender sends, exactly as it is sent. When you are downloading a program from the Internet, TCP is the best option because you need the file to be downloaded **exactly** as it is stored on the server. The TCP communication is kind of like this:

```text
A- Are you ready?
B- Yes
A- Please share with me the file XYZ
B- Ok. Are you ready?
A- Yes. Start sending
B- OK. This is the part 1 of XYZ
A- OK I got it based on these criteria?
B- Good. Now is it correct?
A- Yes. Please send the second part
B- OK. Are you ready for the second part?
A- Yes.
B- Here comes the second part
A- ...
B- ...
```

![tcp flow diagram](/images/tcpflow.gif)

As you can see, TCP needs a lot of communications and spends time (or even retransmits data) to make sure that the receiver is getting the exact correct data available on the server. Strangely in some cases this is not what we are looking for. If you are watching a movie or having a phone call or enjoying a game stream, you prefer to continue watching live in case of a 1s issue in your network. Thats why we also have the UDP. 

#### UDP

You are video-chatting with a friend and network fluctuates. What is a better choice? A\) retransmitting the missing packets and/or reestablishing the connection and continue the whole conversation with a 2s delay or B\) just show the newer packets we got and continue the live vide-conference and just forget about that 2 second fluctuation \(missed data\)? If your choice is B, it is better if you use UDP \(User Datagram Protocol\) for your chat program. UDP is less reliable: the sender sends packets without communicating much and hearing back from the receiver and receiver listens for packets without negotiating the exact details with the sender. It is much faster than TCP but you can not be sure that 100% of packets will be received by the B party.

#### ICMP

Internet Control Messaging Protocol or ICMP is a specific purpose protocol used to check the connectivity of the servers by the `ping` command. The first computer just tells "are you there?" and the second will answer "yes I'm here". Have a look at this practical example:

```text
[jadi@funlife ~]$ ping google.com
PING google.com (173.194.32.135) 56(84) bytes of data.
64 bytes from 173.194.32.135: icmp_seq=1 ttl=48 time=239 ms
64 bytes from 173.194.32.135: icmp_seq=2 ttl=48 time=236 ms
^C
--- google.com ping statistics ---
2 packets transmitted, 2 received, 0% packet loss, time 1001ms
rtt min/avg/max/mdev = 236.707/238.174/239.642/1.546 ms
```

As you can see, we are pinging \(send ICMP packets\) to a server and it answers are back \(replying to our ICMP packets\).

> ICMP is used for network troubleshooting and DOES NOT transfers user data

### Port

Any computer has an address but there are many programs running on that computer. By using an IP address you can tell the Internet the destination of your packets but how can you decide which program on that computer should answer to your packet? We know that a computer with the address of 5.1.23.1 has a webserver and a ftp server on it but how can we reach it and tell it "i want the index.html of your webserver" or "deliver me the XYZ file from your FTP server"? This is done using PORTs. Ports are numbers where a program LISTENS to. For example port 80 is reserved for webservers so if I connect to 5.1.23.1:80 I'm sure that I'm talking with the webserver. In the same way, when the file transport protocol \(FTP\) starts, it starts listening on port 20 & 21 and if I use a FTP client to reach that computer, I will automatically connect to port 21 which is reserved for FTP.

Different ports can use different transmission protocols \(UDP or TCP\). The default port of some protocols are as follow. These are very important and most admins know them.

| port | usage |
| :--- | :--- |
| 20, 21 | FTP \(one data, one control\) |
| 22 | SSH |
| 23 | Telnet |
| 25 | SMTP |
| 53 | DNS |
| 80 | HTTP |
| 110 | POP3 |
| 123 | NTP |
| 139 | NetBIOS |
| 143 | IMAP |
| 161, 162 | SNMP |
| 389 | LDAP |
| 443 | HTTPS |
| 465 | SMTPS |
| 636 | LDAPS |
| 993 | IMAPS |
| 995 | POP3S |

> Note that in this table all ports above 400 ends with S, which stands for **S**ecure

You can find all of the above ports and many many others in `/etc/services`


### IPv6

We saw that there are only around 4B IPv4s available. Just consider that we are around 7B people on the planet earth so there is not even enough IP for every person on IPv4 range. Add to this the latest demands from all the mobile phones, cars, fridges, clocks, TVs, camera, ...! They all want to be on the Internet; this is called Internet Of Things. What should be done? We saw one solution called NAT but the permanent solution is a new version of the IP; IP version 6. In version 6 IPs are not limited to 4 octets anymore.

Each IPv6 has 128 bits. They are grouped in 8, 16 bit groups and are normally written in Hex (base 16) format. A sample IPv6 address looks like `2001:0db8:0a0b:12f0:0000:0000:0000:0001` and it can be shortened to `2001:db8:a0b:12f0::1`. Here we have decimal numbers from **0000** to **FFFF** and **8** fields which are separated by **:**. 

IPv6 provides us around 3.4\*\(10^38\) IPs which is enough for whatever we can imagine at the moment. Just imagine that it can allocate 2^52 addresses for every observable star in the known universe.

 