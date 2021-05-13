#110.3 Securing data with encryption
*Weight: 3*

The candidate should be able to use public key techniques to secure data and communication.

## Key Knowledge Areas
- Perform basic OpenSSH 2 client configuration and usage.
- Understand the role of OpenSSH 2 server host keys.
- Perform basic GnuPG configuration, usage and revocation.
- Understand SSH port tunnels (including X11 tunnels).

## Terms and Utilities
- ssh
- ssh-keygen
- ssh-agent
- ssh-add
- ~/.ssh/id_rsa and id_rsa.pub
- ~/.ssh/id_dsa and id_dsa.pub
- /etc/ssh/ssh_host_rsa_key and ssh_host_rsa_key.pub
- /etc/ssh/ssh_host_dsa_key and ssh_host_dsa_key.pub
- ~/.ssh/authorized_keys
- ssh_known_hosts
- gpg
- ~/.gnupg/
 
### Key Pairs
In traditional cryptography the symetric keys were used: both parties had a shared password; the files were encrypted with that password and then decrypted using the same password. These years the KeyPairs are becomming more and more common. When generating a key pair, we generate two keys using a computer algorithm in the way that any message which is encrypted using one, can be opened only using the other key. These are called Public & Private key. You publish the public key to your friends and even the strangers and if they need to send an ecrypted message to you, scramble it using YOUR public key and send it to you. After receiving it, you open the file using your PRIVATE key. 

> great point about Public / Private key is that the data can be transmitted over the internet with no fear of hackers or governments. You are publishing your key to the world, some one picks it and uses it to encrypt some data and sent the result to you. People can see that you are receiving "some data" but they can not encrypt it because they do not have the private key needed to decrypt it.


### ssh key pairs
Before using keys, we have to generate them. This task is as simple as running one command:

````
$ ssh-keygen 
Generating public/private rsa key pair.
Enter file in which to save the key (/home/jadi/.ssh/id_rsa): 
Created directory '/home/jadi/.ssh'.
Enter passphrase (empty for no passphrase): 
Enter same passphrase again: 
Your identification has been saved in /home/jadi/.ssh/id_rsa.
Your public key has been saved in /home/jadi/.ssh/id_rsa.pub.
The key fingerprint is:
bc:1c:1a:da:0b:8b:22:56:da:1f:68:14:5b:da:7e:2e jadi@localhost.localdomain
The key's randomart image is:
+--[ RSA 2048]----+
|                 |
|                 |
|   . .           |
|    *  .         |
|   + .. S        |
|  ..oo + o       |
|  +oooo.o        |
|oo.o E+.         |
|o.. o.o.         |
+-----------------+
````

> The above process asked for a prassphrase. It is used to secure our key. You can create a password and it will be asked each time you want to use this key.

We have the option to generate keys using different algorithsm, here I used the default RSA and these two keys are created in `~/.ssh/`:
 
````
[jadi@localhost ~]$ ls .ssh -ltrh 
total 8.0K
-rw-r--r--. 1 jadi jadi  408 Jun 15 13:58 id_rsa.pubss
-rw-------. 1 jadi jadi 1.7K Jun 15 13:58 id_rsa
````

As soon as we ssh to any server, a file called `known_hosts` will save that sites public keys. The next step is copying our public key there. For this task there is command called `ssh-copyid`. It works like this:

````
 ssh-copy-id 10.0.2.15
jadi@10.0.2.15's password: 
Now try logging into the machine, with "ssh '10.0.2.15'", and check in:

  .ssh/authorized_keys

to make sure we haven't added extra keys that you weren't expecting.
````

Now we will be able to login into that server without providing our password.

There is a keypair called `/etc/ssh_host_rsa_key` and `/etc/ssh_host_rsa_key.pub` on any server. These keys are used to verify the security of the connectivity. Server provides me its public key and uses its private key to keep the connection secure. This is the public key the client saved in its ~/.ssh/known_hosts.


### ssh tunnels
We have already discussed X forwarding. 

### encryption using gpg
A software called `gpg` lets us use public and private keys to encrypt our data. At the beginning we have to create a key pair:

````
gpg --gen-key
````

Then we need to share our public key to other people. To export our public key file we need to run:

````
gpg --export name > gpg.pub
````

and the other party can import our public key into his gpg database by:

````
gpg --import gpg.pub
````

At this stage, if he wants to encrypt some data to us (say the file file.txt) he should run:

````
gpg --out file.txt.encrypted --recipient jadijdai@gmail.com --encrypt file.txt
````

and give the `file.txt.encrypted` to us. For openning it, we just need to:

````
gpg --out out.txt --decrypt file.txt.encrypted
````

and Done! 

> As you saw, the public keys should be shared. The B party uses A parties public key to encrypt a data and A party uses his Private key to open it.

### revoking keys
What happens if you forget your key password or someone hacked your computer and acquired your private key? In this case you have to announce to the world that "I'm hacked! Do not use that public key of mine anymore!". This is called revoking. To create a revoke key, run:

````
gpg --output revoke.asc --gen-revoke jadijadi@gmail.com
````

This tells gpg to create a revoke file called revoke.asc for the identity jadijadi@gmail.com. If jadijadi@gmail.com needs to invalidate his public key, he have to publish this file to the intenet or key servers.

### signing
In the previous section we used gpg to ecrypt the data. We used someones Public key to sign and she used her own Private key to decrypt the text. What happens if we do this in the reverse? I mean what happens if I encrypt something with my Private key, send it on the internet and everyone on the internet will be able to decrypt it using my Public key which is shared with everyone - since it is Public. This is signing!

By encrypting a document using your private key, you let everyone to try to open it using your public key and if they succeed, they will be sure that you have signed it using YOUR private key! `gpg` has a specific command to sign documents:

````
gpg --clearsign originalfile
````

> here the --clearsign tells the gpg to include the clear text message in the output file too. The output file will be originalfile.asc


and another one to verify that a document is singed correctly:

````
gpg --verify recievedfile
````
