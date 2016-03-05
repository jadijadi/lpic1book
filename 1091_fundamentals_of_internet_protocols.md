#109.1 Fundamentals of internet protocols
*Weight: 4*

Candidates should demonstrate a proper understanding of TCP/IP network fundamentals.

## Key Knowledge Areas
- Demonstrate an understanding of network masks and CIDR notation.
- Knowledge of the differences between private and public "dotted quad" IP addresses.
- Knowledge about common TCP and UDP ports and services (20, 21, 22, 23, 25, 53, 80, 110, 123, 139, 143, 161, 162, 389, 443, 465, 514, 636, 993, 995).
- Knowledge about the differences and major features of UDP, TCP and ICMP.
- Knowledge of the major differences between IPv4 and IPv6.
- Knowledge of the basic features of IPv6.

## Terms and Utilities
- /etc/services
- IPv4, IPv6
- Subnetting
- TCP, UDP, ICMP

## IPv4
Internet Protocol or IP is an address that points to a destination on the Internet. This destination can be a single computer, a server, a switch or even a network (behind that IP). An IP version four is in the form of A.B.C.D where A, B, C & D are between 0-255. The following are all valid IP addresses:

''''
1.2.3.4
1.1.1.1
100.0.0.100
192.168.1.4
''''

> each part of an IP address is called an Octet since it is constructed of an 8 bit number (0..255)

How many IP addresses are available with IPv4? 256*256*256*256 = 4294967296. That is around 4.3 billion - only! Even from this 4.3B, some are not usable (as you will see later) & the *usable* range is around 3.7B.

### Private IPs
Any IP address in the form of following addresses are called a *private IP address*:

|range|Number of IPs in this range|
|-|-|
|192.168.0-255.0-255 | 65K IPs|
|172.16-31.0-255.0-255 | 1M IPs|
|10.0-255.0-255.0-255| 16M IPs|

Any one can use any of these IPs on her devices as long as it is not connected directly to the internet. Have a look at this example:

````
                                                                                              XXXXXX
                                                                          XXXXXX   XXXXX    XXX    XX
                 +--------+                                              X     XXXXX   XXXXXX       XX
        +--------+172.16. |                                             XX                           X
        |        |1.1     |                                             X                            X
   +--------+    |        |                                             X                           XX
   |192.168.|    +--------+                                           XXX  Internet, Only         XX
   |2.100   |         |           +-----------------+              XXXXX   consist             XXXX
   |        |         |           |                 |           XXX        Public IPs        XX
   +--------+    Private Network  | NAT, Translate  |Public IP XX                              X
        |             +-----------+ between Public  +---------+X      Devices with Private IPs  XX
        |             |           | and Private IPs |          XX     reach the intenret via     X
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

````

In the middle you can see a `Network Address Translation` or `NAT` device. It is connected to the Internet using only one public IP (It might be 5.27.1.30). On the left side of the NAT box, there are 4 computers with Private IPs. Each time any of these devices targets an address on the Internet (a public IP), the NAT device will use his own public IP to request that IP and when he gets the data, will provide it to the *Natted* device - the device behind the NAT. This way we can create huge networks behind a NAT device. In this scenario, all the devices can reach the Internet but no-one from the Intenret can reach any of them, directly. 

### Subnetting
OK! We have around 4B addresses in IPv4. But what happens if I send a packet to another IP? Say I try to print a document on the *local* printer as you learned in previous section? Who should listen for this packet? Does the whole Internet passes it hand to hand? Obviously not! Only my *local* network will wait for such a packet and only my printer (with its local IP) will receive it. When configuring a network we devince **subnet**s. For example my home network is configured on `192.168.1.0-255`. This way my WiFi router is 192.168.1.1, my laptop will be 192.168.1.10, my printer 192.168.1.100, my desktop 192.168.1.2 and my tv 192.168.1.200. When my phone connects to my WiFi it might be 192.168.1.33. Any time any packets tries to reach any IP in my **subnet** (that is 192.168.1.0-255), my router does so. If any devices tries to reach anything out of my subnet (say a public IP), my router will use its NAT functionality to send the packets over the Internet.

This is done using a netmask. But before going there, let me do a fast review on binary representation of number, and specially IP addresses. 

#### Binary representation of IPs
You are probably familiar with binary base - it is the basis of anything related to computers. If not I highly recommend you to do a google search and read if from another source since this book assumes you already know it. In short when writing numbers on binary format (base 2), the only used digits are 0 and 1. An easy way for conversion is using the following table to convert 0 and 1s to our *normal* decimal format. 


128|64|32|16|8|4|2|1|
|-|-|-|-|-|-|-|-|
|0|0|0|0|0|0|0|0|equals 0 in decimal|
|1|0|0|0|0|0|0|0|equals 128 in decimal|
|1|0|0|0|0|0|0|1|equals 129 in decimal|
|0|0|1|0|0|0|0|0|equals 32 in decimal|
|0|0|0|0|0|1|1|0|equals 6 in decimal|
|1|0|1|1|0|0|1|1|equals 179 in decimal|
|1|1|1|1|1|1|1|1|equals 255 in decimal|

So `11000000.10101000.00000001.00001111` equals to `192.168.1.15`. 

### netmask mask
We already saw that subnets are used to create small / local networks. When computers are in one subnet, they can see each other directly without any routing. For any address out of my subnet, a router should handle the packets and send them to their destination. This is done using subnet masks. Lets try an example.

Say we are going to create a subnet like 192.168.1.0-255. Here the `192.168.1` part is same among all the devices and the last *octet* changes. A subnet mask is another string like A.B.C.D which tells the computer what part of the IP in this subnet will remain same among all devices and what parts can be changed. Here, the subnet mask for `192.168.1.0-255` is `255.255.255.0`. As you can see any "fixed" octet will have 255 as its subnet mask and the changing (from 0 to 255) octets subnet mask is 0. Can you guess the subnet mask of `10.10.0-255.0-255`? That is `255.255.0.0`.

> fixed parts are 255 and when an octet can be anything from 0 to 255, its subnet mask is 0.

Remember our discussion about binary numbers? We can represent the IPs in binaries:

||network (fixed part)|subnet (who will listen to packets)|
|-|-|-|
|decimal|192.168.1.|0-255|
|binary|11000000.10101000.00000001.|00000000-11111111|
||||
|subnet mask (binary)|11111111.11111111.11111111.|00000000|
|subnet mask (decimal)|255.255.255.|0|

When talking bout subnet masks, we will put a 1 when that digit can not be changed and a 0 when that digit can be changed. 

#### CIDR
Classless Inter-Domain Routing or CIDR is another way of talking about subnet masks. Telling someone that "my network is 192.168.1.0 and my subnet mask is 255.255.255.0" is difficult so some people prefer to say "my network is 192.168.1.0/16". This is a shortcut! 16 is the number of 1s in your subnet which is 11111111.11111111.11111111.00000000 in binary and has 24 ones! Looks a bit strange but when you understand it, it is much more functional that saying 255.255.255.0. 

Here are some famous samples:

|decimal netmask|binary netmask|CIDR|
|-|-|-|
|255.255.255.0|11111111.11111111.11111111.00000000|/24|
|255.255.0.0|11111111.11111111.00000000.00000000|/16|
|255.0.0.0|11111111.00000000.00000000.00000000|/8|
|255.255.255.240|11111111.11111111.11111111.11110000|/28|
|255.255.255.248|11111111.11111111.11111111.11111000|/29|

As you can see on the last two examples, the subnet mask (or **netmask**) can start anywhere in any octet.

In short CIDR is just "number of 1s in a netmask". 

> for a better understanding of subnetting, have a look at [Cisco document](http://www.cisco.com/c/en/us/support/docs/ip/routing-information-protocol-rip/13788-3.html)


## IPv6
We saw that there are only around 4B IPv4s available. Just consider that we are around 7B people on the planet earth so there is not even enough IP for every person on IPv4 range. Add to this the latest demands from all the mobile phones, cars, fridges, clocks, TVs, camera, ...! They all want to be on the Internet; this is called Internet Of Things. What should be done? We saw one solution called NAT but the permanent solution is a new version of the IP; IP version 6. In version 6 IPs are not limited to 4 octets anymore. 

A sample IPv6 address looks like `2001:0db8:0a0b:12f0:0000:0000:0000:0001` and it can be shortened to `2001:db8:a0b:12f0::1`. Here we have decimal numbers from **0000** to **FFFF** and **8** fields which are separated by **:**. This way we will have around 3.4*(10^38) IPs which is enough for whatever we can imagine at the moment. Just imagine that it can allocate 2^52 addresses for every observable star in the known universe.

> Although at the moment there is shortage on IPv4, IPv6 is not adopted much yet and most of the Internet is still working on IPv4. 

## Communication Protocols
When computers communicate, they use Protocols. This protocols are designed to let computers speak in different ways for fulfilling different needs. Here we will have a look at three of the most popular protocols on the Internet: TCP / UDP / ICMP.

### TCP
Transmission Control Protocol or TCP is designed to make sure that both parties are *speaking* with each other without loosing any information. In this protocol the receiver will get anything the sender sends, exactly as it is sent. When you are downloading a program from the Internet, TCP is the best option because you need the file exactly as it is stored on the server. This can be a communication like this:

````
A- Are you ready?
B- Yes
A- Please share with me the file XYZ
B- Ok. Are you ready?
A- Yes. Start sending
B- OK. This is the part 1 of XYZ
A- OK I got it.
B- Good. Now is it correct?
A- Yes. Please send the seccond part
B- OK. Are you ready for the seccond part?
A- Yes.
B- Here comes the seccond part
A- ...
B- ...
````

As you can see, TCP needs a lot of communications and sometimes it is not even suitable. When you are listening to music or having a vide chat, it is better if the computer just skips some packages in case of problems and continues from the new one it gets.

### UDP
You are video-chatting with a friend and network fluctuates. What is a better choice? A) retransmitting the missing packets and/or reestablishing the connection and continue the whole conversation with a 2s delay or B) just show the newer packets we got and continue the live vide-conference and just forget about that 2 second fluctuation (missed data)? If your choice is B, it is better if you use UDP (User Datagram Protocol) for your chat program. UDP is less reliable: the sender sends packets without communicating much and hearing back from the receiver and receiver listens for packets without negotiating the exact details with the sender. It is much faster than TCP but you can not be sure that 100% of packets will be received by the B party. 

### ICMP
Internet Control Messaging Protocol or ICMP is a specific purpose protocol used to check the connectivity of the servers by the `ping` command. The first computer just tells "are you there?" and the second will answer "yes I'm here". Have a look at this practical example:

````
[jadi@funlife ~]$ ping google.com
PING google.com (173.194.32.135) 56(84) bytes of data.
64 bytes from 173.194.32.135: icmp_seq=1 ttl=48 time=239 ms
64 bytes from 173.194.32.135: icmp_seq=2 ttl=48 time=236 ms
^C
--- google.com ping statistics ---
2 packets transmitted, 2 received, 0% packet loss, time 1001ms
rtt min/avg/max/mdev = 236.707/238.174/239.642/1.546 ms
````

As you can see, we are pinging (send ICMP packets) to a server and it answers are back (replying to our ICMP packets).

> ICMP is used for network troubleshooting and DOES NOT transfers user data

## Port
Any computer has an address but there are many programs running on that computer. By using an IP address you can tell the Internet the destination of your packets but how can you decide which program on that computer should answer to your packet? We know that a computer with the address of 5.1.23.1 has a webserver and a ftp server on it but how can we reach it and tell it "i want the index.html of your webserver" or "deliver me the XYZ file from your FTP server"? This is done using PORTs. Ports are numbers where a program LISTENS to. For example port 80 is reserved for webservers so if I connect to 5.1.23.1:80 I'm sure that I'm talking with the webserver. In the same way, when the file transport protocol (FTP) starts, it starts listening on port 20 & 21 and if I use a FTP client to reach that computer, I will automatically connect to port 21 which is reserved for FTP. 

Different ports can use different transmission protocols (UDP or TCP). The default port of some protocols are as follow. These are very important and most admins know them.

|port|usage|
|-|-|
|20, 21|FTP (one data, one control)|
|22|SSH|
|23|Telnet|
|25|SMTP|
|53|DNS|
|80|HTTP|
|110|POP3|
|123|NTP|
|139|NetBIOS|
|143|IMAP|
|161, 162|SNMP|
|389|LDAP|
|443|HTTPS|
|465|SMTPS|
|636|LDAPS|
|993|IMAPS|
|995|POP3S|

> Note that in this table all ports above 400 ends with S, which stands for **S**ecure

You can find all of the above ports and many many others in `/etc/services`

.

.

.

.

.

.

.

.

.

.

.








