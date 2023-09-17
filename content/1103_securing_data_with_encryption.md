Title: 110.3 Securing data with encryption
Date: 2010-12-03 10:20
Category: LPIC1
Tags: LPIC1, 102, LPIC1-102-500
Authors: Jadi
sortorder: 470
Summary: 
## 110.3 Securing data with encryption

<div class="alert alert-danger" role="alert">
  This chapter is still a Work In Progress. Do not rely on it for LPIC version 500 exam. Will be updated in a few weeks.
</div>


_Weight: 3_

The candidate should be able to use public key techniques to secure data and communication.

### Key Knowledge Areas

* Perform basic OpenSSH 2 client configuration and usage.
* Understand the role of OpenSSH 2 server host keys.
* Perform basic GnuPG configuration, usage and revocation.
* Use GPG to encrypt, decrypt, sign and verify files.
* Understand SSH port tunnels \(including X11 tunnels\).

### Terms and Utilities

* ssh
* ssh-keygen
* ssh-agent
* ssh-add
* ~/.ssh/id\_rsa and id\_rsa.pub
* ~/.ssh/id\_dsa and id\_dsa.pub
* ~/.ssh/id_ecdsa and id_ecdsa.pub
* ~/.ssh/id_ed25519 and id_ed25519.pub
* /etc/ssh/ssh\_host\_rsa\_key and ssh\_host\_rsa\_key.pub
* /etc/ssh/ssh\_host\_dsa\_key and ssh\_host\_dsa\_key.pub
* /etc/ssh/ssh_host_ecdsa_key and ssh_host_ecdsa_key.pub
* /etc/ssh/ssh_host_ed25519_key and ssh_host_ed25519_key.pub
* ~/.ssh/authorized\_keys
* ssh\_known\_hosts
* gpg
* gpg-agent
* ~/.gnupg/

## Key Pairs

In traditional cryptography, the symmetric keys were used: both parties had a shared password. The data were encrypted with that password and then decrypted using the same password. But in 1976, a new idea came into the view: what if we create 2 keys (lets call them the Private Key and the Public Key) in a way that only people who has the Public Key, be able to open whatever which is encrypted with the Private key? The scientists made this a reality and nowawayds, most of our encryptions are being done via these **Key Pair**s. When generating a key pair, we generate two keys using a computer algorithm in the way that any message which is encrypted using one, can be opened only using the other. These are called Public & Private key. You publish the public key to your friends or even publicly on the net and if someone wants to send you an encrypted message, she encrypts it using your public key and send it to you with any means (or published the encoded message on the intneret) and only and only you will be able to open it, because you are the one who has the Private key!

> great point about Public / Private key is that the data can be transmitted over the internet with no fear of hackers or governments. You are publishing your key to the world, some one picks it and uses it to encrypt some data and sent the result to you. People can see that you are receiving "some data" but they can not encrypt it because they do not have the private key needed to decrypt it.

### ssh keys
The same technology (Public key cryptography or asymetric cryptography) can be used in most of the network communications too. In fact the very `ssh` works based on this concept. It is used to authenticate hosts and secure the traffic. 

'''
➜  ~ ssh 192.168.70.2
The authenticity of host '192.168.70.2 (192.168.70.2)' can't be established.
ED25519 key fingerprint is SHA256:4Wp2zz6sgPAhnbqhkNjOd6QDpNQ4jvjX7qAzslPX09U.
This key is not known by any other names
Are you sure you want to continue connecting (yes/no/[fingerprint])? y
Please type 'yes', 'no' or the fingerprint: yes
Warning: Permanently added '192.168.70.2' (ED25519) to the list of known hosts.
jadi@192.168.70.2's password:
Linux debian 6.4.0-2-arm64 #1 SMP Debian 6.4.4-3 (2023-08-08) aarch64

The programs included with the Debian GNU/Linux system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.

Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent
permitted by applicable law.
You have no mail.
Last login: Sun Sep 17 04:43:18 2023 from 192.168.70.1
jadi@debian:~$
'''

Above the server is showing us the fingerprint of its ED25519 key and asking us to approve it. From now on, our system wont warn us for the same key with the same server. BUT if the fingerprint (so the key) of the same server is changed, that will be considered a serious case:

```
➜  ~ ssh 192.168.70.2
Host key verification failed.
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
@    WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!     @
@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
IT IS POSSIBLE THAT SOMEONE IS DOING SOMETHING NASTY!
Someone could be eavesdropping on you right now (man-in-the-middle attack)!
It is also possible that a host key has just been changed.
The fingerprint for the ED25519 key sent by the remote host is
SHA256:4Wp2zz6sgPAhnbqhkNjOd6QDpNQ4jvjX7qAzslPX09U.
Please contact your system administrator.
Add correct host key in /Users/jadi/.ssh/known_hosts to get rid of this message.
Offending RSA key in /Users/jadi/.ssh/known_hosts:548
Host key for 192.168.70.2 has changed and you have requested strict checking.
```

If you want to solve this - after making sure that this is not an attack - you have to remove the data of 192.168.70.2 from the `.ssh/known_hosts` file. Fortunately you do not need to directly edit the file. Its enough to use the `ssh-keygen` command:

```
➜  ~ ssh-keygen -R 192.168.70.2
# Host 192.168.70.2 found: line 547
# Host 192.168.70.2 found: line 548
# Host 192.168.70.2 found: line 549
/Users/jadi/.ssh/known_hosts updated.
Original contents retained as /Users/jadi/.ssh/known_hosts.old
```

#### creating your own key pairs

You can easily create as many key pairs want; Even with different algorithms (defined by `-t` switch and including dsa, ecdsa, ecdsa-sk, ed25519, ed25519-sk, rsa). Common choices are *rsa* which is the default and *ecdsa* which is used by bitcoin!

Lets create an ecdsa key pair on our machine. We can use this to login into the servers without providing a password or sign/encrypt messages.

```
jadi@debian:~$ ssh-keygen -t ecdsa
Generating public/private ecdsa key pair.
Enter file in which to save the key (/home/jadi/.ssh/id_ecdsa):
/home/jadi/.ssh/id_ecdsa already exists.
Overwrite (y/n)? y
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /home/jadi/.ssh/id_ecdsa
Your public key has been saved in /home/jadi/.ssh/id_ecdsa.pub
The key fingerprint is:
SHA256:WvJu5D7ns0a2z0sB6l8ZrCXnAgxSmb2kSwgo/lK0QYA jadi@debian
The key's randomart image is:
+---[ECDSA 256]---+
|.oo.  .+         |
|E .o .o o        |
|o ..+..o ..      |
| . o..oo.. o     |
|  o  ...S . *    |
| . .  .*..o* +   |
|  .   .oooo.=    |
|       .+.==     |
|       oo=+++.   |
+----[SHA256]-----+
```

and since its free, lets create an rsa key too:

```
jadi@debian:~$ ssh-keygen
Generating public/private rsa key pair.
Enter file in which to save the key (/home/jadi/.ssh/id_rsa):
/home/jadi/.ssh/id_rsa already exists.
Overwrite (y/n)? y
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /home/jadi/.ssh/id_rsa
Your public key has been saved in /home/jadi/.ssh/id_rsa.pub
The key fingerprint is:
SHA256:Q67Ob1DOfmF3gG449OfNLHXxE5QEH4B/UzHR8ycAHao jadi@debian
The key's randomart image is:
+---[RSA 3072]----+
|          .oo++*=|
|           oo .+=|
|        . ......+|
|       oo.. ...=o|
|       =E+   ...*|
|      ..=.* o o.o|
|      .o + = * ..|
|     o  o . o +  |
|      oo..   .   |
+----[SHA256]-----+
```

That fun _Image_ is what you can show your friends so they can make sure that they are using the correct key. 

> Above, I did not set a password for the keys. If I did, I had to provide that password everytime I wanted to use that key

These keys are saved in users `~/.ssh` directory. As you can guess, the system wide keys used for ssh server are located at `/etc/ssh`.


### Key based / Password less login
The ssh server can be configured to check your identity using your keys. Its enough to save your public-key on the server's user account and tell the server to check for key-based logins too. In this case, your ssh client will provide your private key to the ssh server as a proof of identity and you will be able to enter the user without providing passwords.

First copy your *public* key and login into the server. Open the `~/.ssh/authorized_keys` file and add yours. Also make sure that the `/etc/ssh/sshd_config` contains the `PubkeyAuthentication yes`. Now log out and on the next login you should be able to login without password! This is super userful when you are managing many servers or want to automate `scp` copies and other stuff. Its also more secure from the sysadmin point of view because if I need to let a new user to login into my system, I do not need to share the password or communicate the password on any channel. Its enough to ask the person for his **public key** and add it to the users `.ssh/authorized_keys` file.

Oh! and you do not need to do the _key copying_ manually; just use the `ssh-copy-id` command:

```
➜  ~ ssh-copy-id 192.168.70.2
/usr/bin/ssh-copy-id: INFO: Source of key(s) to be installed: "/Users/jadi/.ssh/id_dsa.pub"
/usr/bin/ssh-copy-id: INFO: attempting to log in with the new key(s), to filter out any that are already installed
/usr/bin/ssh-copy-id: INFO: 1 key(s) remain to be installed -- if you are prompted now it is to install the new keys
jadi@192.168.70.2's password:

Number of key(s) added:        1

Now try logging into the machine, with:   "ssh '192.168.70.2'"
and check to make sure that only the key(s) you wanted were added.
```

#### ssh-agent
The `ssh-agent` works like a key manager for your ssh keys. It keeps your private keys in memory and provides them when needed. For example if you have set a password on your key, you have to type the password every single time you are going to use that key. To make this easier using ssh-agent, you have to rush a shell with ssh-agent and add all your key to the agent:

```
jadi@debian:~$ ssh-agent /bin/bash
jadi@debian:~$ ssh-add
Identity added: /home/jadi/.ssh/id_rsa (jadi@debian)
Identity added: /home/jadi/.ssh/id_ecdsa (jadi@debian)
Identity added: /home/jadi/.ssh/id_dsa (/home/jadi/.ssh/id_dsa)
```

Now, the agent knows about your keys and wont ask for the passwords anymore.

`ssh-agent` can also _transfer_ your keys safely in memory to other servers. Say you need to ssh to server A and while on server A, use your key to ssh to server B (or do a git pull using your private keys). The keys are on server A and its not safe to actually and physically copy them to server B. In this case you cal run `ssh-agent` and have your keys even when you are on server B. 

#### ssh tunnels

The ssh can also be used for _tunnelling_. Its a very fun concept and a super userful tool in the hands of a network Ninja! Honestly we use it all the time to solve complicated problems. 

As the name sggests, ssh tunelling *tunnels* the data between machines. Look at this example:

```
ssh -L 9000:hckrnews.com:80 root@5.161.197.79
```

Here I'm telling my computer to ssh using user `root` (which is not a great idea) to the `5.161.197.79` server; AND create a **local tunnel** (`-L`) from on my machine toward the `hckrnews.com` port `80` through that machine. No if I connect to `localhost:8000` **on my machine**, the request will be tunnels through 5.161.197.79 toward hckrnews.com port 80. You can try it with `curl localhost:9000`. 

Why this is useful? Say you have a program on your server which only answers back to the local requests (and not the internet). Using local forwarding you can forward a port on your computer to port which programs works on and use the program on your own machine!

There is also the concept of **Remote Forwarding**. In this case, you connect a port from a remote server to another server (mostly your own computer). Using this, you can expose a webserver from your own computer on the Internet:

```
$ ssh -R 8000:localhost:80 root@5.161.197.79
```

In the above example, I'm telling the ssh to create a **Remote** tunnel. After this any request on port 8000 from the 5.161.197.79 computer will reach to localhost (my machine) port 80!

You can even ask the remote machine to start listening on a specific port on all of its interfaces (open up to the network and not only localhost):

```
ssh -R 0.0.0.0:8000:localhost:7777 192.168.70.2
```

Above, I'm telling the 192.168.70.2 machine to open port 8000 to ALL interfaces and forward whatever it got to my machiens 7777 port.

> to let clients to *bind* listening ports to anything other than localhost, the `GatewayPorts clientspecified` configu should be set in the ssh server's config file.

There are even more use caases. For example you use the -D switch for a `dynamic` application level port forarding. It works like a proxy / anti censorship. If I do 

```
ssh -D 1080 192.168.70.2
```

The 1080 port will work ask a *socks* proxy on my machine and forward whatever request reaches it to the 192.168.70.2 machine and returns back the answers. Now I can configure my applications to use the localhost:1080 as their socks proxy and the 192.168.70.2 will work as a proxy here. This is useful when you do not have internet on your localhost, but 192.168.70.2 has it.

##### X Forwarding
The last concept I want to talk about in forwarding section, is the X forwarding. As you already know from [Module 106](1061-install-and-configure-x11.html), linux graphical applications use X as their graphical host. This X can also be forwarded on the network as any other network based communication. Its even has its own switch on the ssh program. To forward the X, its enough to add a `-X` to your ssh. Please note that the `X11Forwarding yes` configuration should be present in your sshd_config file.

To activate the X11 forwarding in a ssh session, simply add `-X` to your ssh:

```
ssh -X 192.168.70.2
```

and then you can run graphical programs (say `xeyes` for fun) on the remote machine and see the graphical part on your own X server!

> If you are not on a GNU/Linux machine with an X11 server, you need to install it (for example XQuartz on Mac)

This is very useful when you want to run a program on a resourceful server or work from home whiel your graphical applications are at the office ;)

## ecnrypt and sign using gpg

As described in previous section, a public and private key pair can be used to encrypt or sign messages. There is an implementation of this method called `gpg` which can be used on Linux (and other machiens) to perform these tasks. First you need to generate a key:

```text
jadi@debian:~$ gpg --gen-key
gpg (GnuPG) 2.2.40; Copyright (C) 2022 g10 Code GmbH
This is free software: you are free to change and redistribute it.
There is NO WARRANTY, to the extent permitted by law.

gpg: directory '/home/jadi/.gnupg' created
gpg: keybox '/home/jadi/.gnupg/pubring.kbx' created
Note: Use "gpg --full-generate-key" for a full featured key generation dialog.

GnuPG needs to construct a user ID to identify your key.

Real name: Jadi
Name must be at least 5 characters long
Real name: Jadi M
Email address: jadijadi@gmail.com
You selected this USER-ID:
    "Jadi M <jadijadi@gmail.com>"

Change (N)ame, (E)mail, or (O)kay/(Q)uit?
Change (N)ame, (E)mail, or (O)kay/(Q)uit? O
We need to generate a lot of random bytes. It is a good idea to perform
some other action (type on the keyboard, move the mouse, utilize the
disks) during the prime generation; this gives the random number
generator a better chance to gain enough entropy.
We need to generate a lot of random bytes. It is a good idea to perform
some other action (type on the keyboard, move the mouse, utilize the
disks) during the prime generation; this gives the random number
generator a better chance to gain enough entropy.
gpg: /home/jadi/.gnupg/trustdb.gpg: trustdb created
gpg: directory '/home/jadi/.gnupg/openpgp-revocs.d' created


gpg: revocation certificate stored as '/home/jadi/.gnupg/openpgp-revocs.d/E279681DC09318AB5B23D359C9063DD26365986A.rev'
public and secret key created and signed.

pub   rsa3072 2023-09-17 [SC] [expires: 2025-09-16]
      E279681DC09318AB5B23D359C9063DD26365986A
uid                      Jadi M <jadijadi@gmail.com>
sub   rsa3072 2023-09-17 [E] [expires: 2025-09-16]
```

Now the key is created in the `~/.gnupg` directory and we can share our public key with others:

```text
jadi@debian:~$ gpg --list-keys
/home/jadi/.gnupg/pubring.kbx
-----------------------------
pub   rsa3072 2023-09-17 [SC] [expires: 2025-09-16]
      E279681DC09318AB5B23D359C9063DD26365986A
uid           [ultimate] Jadi M <jadijadi@gmail.com>
sub   rsa3072 2023-09-17 [E] [expires: 2025-09-16]

jadi@debian:~$ gpg --export jadi > jadi.pub.key
jadi@debian:~$ file jadi.pub.key
jadi.pub.key: OpenPGP Public Key Version 4, Created Sun Sep 17 12:39:19 2023, RSA (Encrypt or Sign, 3072 bits); User ID; Signature; OpenPGP Certificate
```

> the exported key is in binary format, add `-a` to armor it in ascii

Now you have to distribute this key to others. You can upload it somewhere, email it, put it on your website or use some of the public key stores to share it with other. If anyone recives it, she can import it into her key store using the following command:

```text
gpg --import jadi.pub.key
```

Oh! and what happens if you feel that your key is compromised!? In this case you have to create a **revoke** file and share it with other to tell them that your key is not valid anymore:

```text
gpg --output jadi.revoke.asc --gen-revoke jadijadi@gmail.com
```

This tells gpg to create a revoke file called jadi.revoke.asc for the identity jadijadi@gmail.com. If jadijadi@gmail.com needs to invalidate his public key, he has to publish this file to the Internet or key servers and others will know that the previous public key is not valid anymore.

### Encrypt / Decrypt files

At this stage, I have a key and my friends do have my public key imported in their machine. If any of them wants to send my an encrypted message, they can do the following: 

```
echo "I Loved your course! I'll tell all my friends about it." > file.txt
gpg --out file.txt.encrypted --recipient jadijdai@gmail.com --encrypt file.txt
```

Now its enough for them to send me this file. Even using unsecure channels because its encrypted by the top notch tools. Every one can download this file but ONLY I will be able to decypt it; because only I have the **Private key** of jadijadi@gmail.com.

```text
gpg --out out.txt --decrypt file.txt.encrypted
```

> If you liked this course, no need to encrypt the message, just share the [linux1st.com](https://linux1st.com) on the internet! 

#### Signing and verifying files

In the previous section, we used gpg to encrypt the data. We used someone's Public key to encrypt and then used our own Private Key to decrypt the data. But what happens if I use my Private key on my side and let other use my Public key to _open_ the data? That is called **signing*. 

Please remember that only I have access to my private key. So if I apply it to a file, every one:

1. will be able to open the file using my Public Key
2. Will be sure that **I** have signed this because only **I** has access to the private key of the public key they used to open the file.

Lets sign a message:

```
$ echo "I'm Jadi and I'm glad that you reached to the end of your LPIC study" > message-jadi.txt
$ gpg --output message-jadi.sig --sign message-jadi.txt
```

Now its enough for me to publish the `message-jadi.sig` to the Internet or send it to someone. If they want to make sure that it is truely comming from me, its enough for them to check my signature (obviously after importing my public key):

```
jadi@debian:~$ gpg --verify message-jadi.sig
gpg: Signature made Sun 17 Sep 2023 09:26:15 AM EDT
gpg:                using RSA key E279681DC09318AB5B23D359C9063DD26365986A
gpg: Good signature from "Jadi M <jadijadi@gmail.com>" [ultimate]
```

This only checked the signature, if they also needed to decrypt the message they had to as follow:

```
jadi@debian:~$ gpg --output message.jadi --decrypt message-jadi.sig
gpg: Signature made Sun 17 Sep 2023 09:26:15 AM EDT
gpg:                using RSA key E279681DC09318AB5B23D359C9063DD26365986A
gpg: Good signature from "Jadi M <jadijadi@gmail.com>" [ultimate]
jadi@debian:~$ cat message.jadi
I'm Jadi and I'm glad that you reached to the end of your LPIC study
```

Please also note the `--clearsign` option. This option will create a file ending in `.asc` which containt the original un-encrypted (clear text) message alongside the signature. This way non-tech-savy people will be able to read the message too and only if someone wants, she can `--verify` the signature.

```text
jadi@debian:~$ cat message-jadi.txt
I'm Jadi and I'm glad that you reached to the end of your LPIC study
jadi@debian:~$ gpg --clearsign message-jadi.txt
jadi@debian:~$ ls -ltrh
total 16M
drwxr-xr-x 27 jadi jadi 4.0K Jun 15 09:00 rust-for-linux
drwxr-xr-x  2 jadi jadi 4.0K Jun 15 09:09 Downloads
drwx------  2 jadi jadi 4.0K Jul 17 10:53 BRF
-rw-r--r--  1 jadi jadi    6 Jul 17 10:57 myfile
drwxr-xr-x  5 jadi jadi 4.0K Jul 25 13:34 nltk_data
drwxr-xr-x  4 jadi jadi 4.0K Aug 13 07:29 w
-rw-r--r--  1 jadi jadi  16M Aug 24 01:15 nvim-linux64.tar.gz
drwxr-xr-x  6 jadi jadi 4.0K Aug 24 05:38 nvim-linux64
-rw-r--r--  1 jadi jadi 3.8K Aug 27 15:49 report.xml
-rw-r--r--  1 jadi jadi 1.8K Sep 17 08:50 jadi.pub.key
-rw-r--r--  1 jadi jadi   69 Sep 17 09:26 message-jadi.txt
-rw-r--r--  1 jadi jadi  549 Sep 17 09:26 message-jadi.sig
-rw-r--r--  1 jadi jadi   69 Sep 17 09:27 message.jadi
-rw-r--r--  1 jadi jadi  777 Sep 17 09:28 message-jadi.txt.asc
jadi@debian:~$ cat message-jadi.txt.asc
-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA512

I'm Jadi and I'm glad that you reached to the end of your LPIC study
-----BEGIN PGP SIGNATURE-----

iQGzBAEBCgAdFiEE4nloHcCTGKtbI9NZyQY90mNlmGoFAmUG/xYACgkQyQY90mNl
mGqpXQv/QNv0NlCR+S7HJhxiOZcKXE3RB1sx4jRVrOtMd6ZoXYLb28Zz4xN/Lzh2
sipohDbNttr1ovNZvMMu83bbuSeViY9L7nvjNjKsY50u5V1KnrMJPHRaGV8g/0p2
t5zFJuzSFWXQczIjjXMpoLVH8jK3mJuBOmVFwLuBqUoW8827tCLIdr1DNyHXBW47
fcLK5/bO/ljdwGnAX46d+Prg0TIfMLjPpb7uFXVkRBo+zMtCEVDGObaVHQ3J8t6w
8i2YgMrmA3h9h4Gy/yM9Agb2kPeKl6iToeCfQ0EwTcnPF1TN0KZ1PS8Pr3Jp3LcS
A+p32zj7YTzTeE1uBAb7/BorBqaArX8HtLe15yFkNKhPluXya9GG4/Nsxk33Qpd3
c1KiLK9YhTFy7u+Q6tbTKG+uuGj71wANhkqRP30iMjLcBQ7aAO3ehVSYZFyZ7dbL
SJollwyG1sf4zH0g5SQZOxpjyz874IrlFc7GldDCr5jXZw6H+4NuY2yiVWKAcOcU
Qv23xWL2
=q81y
-----END PGP SIGNATURE-----
jadi@debian:~$ gpg --verify message-jadi.txt.asc
gpg: Signature made Sun 17 Sep 2023 09:28:54 AM EDT
gpg:                using RSA key E279681DC09318AB5B23D359C9063DD26365986A
gpg: Good signature from "Jadi M <jadijadi@gmail.com>" [ultimate]
gpg: WARNING: not a detached signature; file 'message-jadi.txt' was NOT verified!
```

> here the --clearsign tells the gpg to include the clear text message in the output file too. The output file will be originalfile.asc

and another one to verify that a document is singed correctly:

```text
gpg --verify recievedfile
```


#### gpg-agent
Just like the `ssh-agent`, `gpg-agent` is a tool which acts like a password manager for you gpg keys. It keeps the keys in the memory so you wont need to provide password on every single use. 
