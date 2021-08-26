# 1035\_create,\_monitor\_and\_kill\_processes

Title: 103.5. Create, monitor and kill processes Date: 2021-08-03 13:14 Category: 103

## 103.5. Create, monitor and kill processes

_Weight: 4_

Candidates should be able to perform basic process management.

### Objectives

* Run jobs in the foreground and background.
* Signal a program to continue running after logout.
* Monitor active processes.
* Select and sort processes for display.
* Send signals to processes.
* &
* bg
* fg
* jobs
* kill
* nohup
* ps
* top
* free
* uptime
* killall

### foreground and background jobs

One of the great points of linux on its beginning days, was the ability to run many programs at the same time. This is done with sending programs to the background.

Normally if you run a program on the terminal, it _blocks_ your terminal but sending a command to the background will prevent this:

```text
xeyes &
```

But what if we started it normally? We can break / cancel it with `Ctrl+c` or _suspend_ it using `Ctrl+z`.

```text
$ xeyes
^Z
[1]+  Stopped                 xeyes
$ jobs
[1]+  Stopped                 xeyes
$ bg
[1]+ xeyes &
$ jobs
[1]+  Running                 xeyes &
$ sleep 1000 &
[2] 7395
$ jobs
[1]-  Running                 xeyes &
[2]+  Running                 sleep 1000 &
$ fg %2
sleep 1000
^Z
[2]+  Stopped                 sleep 1000
$ jobs
[1]-  Running                 xeyes &
[2]+  Stopped                 sleep 1000
$ bg sle
[2]+ sleep 1000 &
$ jobs
[1]-  Running                 xeyes &
[2]+  Running                 sleep 1000 &
`
```

> -l switch of `jobs` will also show the process ID

### nohup

The `nohup` command lets you run your commands even after you logged out and writes its output to **nohup.out**:

```text
$ nohup ping 4.2.2.4
nohup: ignoring input and appending output to ‘nohup.out’
^C$ cat nohup.out
PING 4.2.2.4 (4.2.2.4) 56(84) bytes of data.
64 bytes from 4.2.2.4: icmp_seq=1 ttl=51 time=225 ms
64 bytes from 4.2.2.4: icmp_seq=3 ttl=51 time=223 ms

--- 4.2.2.4 ping statistics ---
4 packets transmitted, 2 received, 50% packet loss, time 3010ms
rtt min/avg/max/mdev = 223.584/224.767/225.950/1.183 ms
```

> It is common to use 2&gt; to redirect the nohup errors to a file: `nohup script.sh > mynohup.out 2>&1 &`

### kill

You can control processes by **signals**. Actually pressing `Ctrl+c` and `Ctrl+z` is also sending signals. Another way for this is using the kill command:

```text
$ jobs
[3]   Running                 xeyes &
[4]   Running                 sleep 1000 &
[5]-  Running                 sleep 2000 &
[6]+  Running                 sleep 3000 &
$ kill %4
$ jobs
[3]   Running                 xeyes &
[4]   Terminated              sleep 1000
[5]-  Running                 sleep 2000 &
[6]+  Running                 sleep 3000 &
$ jobs
[3]   Running                 xeyes &
[5]-  Running                 sleep 2000 &
[6]+  Running                 sleep 3000 &
```

If is also possible to use PIDs in from of the kill or send other signals:

| signal number | signal name | meaning |
| :--- | :--- | :--- |
| 1 | SIGHUP | Informing the process that its controlling terminal \(like an ssh connection\) is terminated |
| 15 | SIGTERM | normal termination request |
| 9 | SIGKILL | forcefully kills the proccess |

So you can do a `kill -9 8733` to force process ID 8733 to close.

> Now you can understand what `nohup` means: go not answer to the SIGHUP.

### killall

Will send the given signal \(or 15\) to all the processes with the given name:

```text
$ jobs
[3]   Running                 xeyes &
[5]-  Running                 sleep 2000 &
[6]+  Running                 sleep 3000 &
$ ps -ef | grep sleep
jadi      7864  7651  0 21:07 pts/1    00:00:00 sleep 2000
jadi      7865  7651  0 21:07 pts/1    00:00:00 sleep 3000
jadi      7977  7651  0 21:14 pts/1    00:00:00 grep sleep
$ killall sleep
[5]-  Terminated              sleep 2000
[6]+  Terminated              sleep 3000
$ jobs
[3]+  Running                 xeyes &
$ ps -ef | grep sleep
jadi      7980  7651  0 21:14 pts/1    00:00:00 grep sleep
```

### Monitoring Processes

#### ps

The `ps` command shows running processes on your computer.

```text
$ sleep 1000 &
[1] 7678
$ sleep 1001 &
[2] 7679
$ xeyes &
[3] 7680
$ ps
  PID TTY          TIME CMD
 7651 pts/1    00:00:00 bash
 7678 pts/1    00:00:00 sleep
 7679 pts/1    00:00:00 sleep
 7680 pts/1    00:00:00 xeyes
 7681 pts/1    00:00:00 ps
```

But using `ps aux` \(= `-aux`\) or `ps -ef` is also common & shows ALL processes on this system:

```text
$ ps -aux | wc -l
293
```

> Every process has a ProcessID \(PID\) and a PPID \(Parent Process ID\).

**finding processes**

You've seen that `ps -ef` shows processes from all users. We can `grep` on that and see who is running `gedit` and what is its process ID:

```text
$ ps -ef | grep gedit
jadi      6213  4604  9 20:06 ?        00:04:43 gedit
jadi      7725  7651  0 20:55 pts/1    00:00:00 grep gedit
```

but there is also a more direct way:

```text
$ ps -C gedit -o user,pid,tty,time,comm
USER       PID TT           TIME COMMAND
jadi      6213 ?        00:04:49 gedit
```

It is also possible to use the `--sort` switch to sort output based on different fields \(+ for ascending & - for descending\).

```text
$ ps -af --sort +comm,-sid
UID        PID  PPID  C STIME TTY          TIME CMD
root      5486  5478  0 19:59 pts/12   00:00:00 -su
root      4444  1169  0 19:56 tty4     00:00:00 -bash
jadi      6638  5412  0 20:10 pts/0    00:00:04 node /usr/local/bin/sslocal
jadi      7778  7651  0 20:58 pts/1    00:00:00 ps -af --sort +comm,-sid
jadi      7678  7651  0 20:48 pts/1    00:00:00 sleep 1000
jadi      7679  7651  0 20:48 pts/1    00:00:00 sleep 1001
jadi      7775  7651  0 20:58 pts/1    00:00:00 sleep 1000
jadi      7776  7651  0 20:58 pts/1    00:00:00 sleep 1000
jadi      7777  7651  0 20:58 pts/1    00:00:00 sleep 1000
root      5478  5477  0 19:59 pts/12   00:00:00 su -
root      5477  5008  0 19:59 pts/12   00:00:00 sudo su -
jadi      7680  7651  0 20:48 pts/1    00:00:01 xeyes
```

#### top

Processes are changing and sometimes you need to check them live. `top` command will help you:

```text
$top

top - 21:00:44 up  1:16,  5 users,  load average: 1.51, 1.65, 1.78
Tasks: 293 total,   1 running, 292 sleeping,   0 stopped,   0 zombie
%Cpu(s): 19.0 us,  5.0 sy,  0.0 ni, 70.9 id,  5.1 wa,  0.0 hi,  0.0 si,  0.0 st
KiB Mem:   8060264 total,  5359812 used,  2700452 free,   169240 buffers
KiB Swap:  7811068 total,        0 used,  7811068 free.  2250692 cached Mem

  PID USER      PR  NI    VIRT    RES    SHR S  %CPU %MEM     TIME+ COMMAND                                                                                                                
 6570 jadi      20   0 1437752 546064  88312 S  18.4  6.8  12:00.96 firefox                                                                                                                
 4870 jadi      20   0 1762516 299120  75664 S  12.2  3.7   7:37.05 compiz                                                                                                                 
 4492 jadi       9 -11  455152  11516   8940 S   6.1  0.1   1:06.81 pulseaudio                                                                                                             
 4532 root      20   0  389028  77116  60192 S   6.1  1.0  12:16.63 Xorg                                                                                                                   
 4723 jadi      20   0  358936   8288   5512 S   6.1  0.1   9:51.52 ibus-daemon                                                                                                            
 5648 jadi      20   0 1641556 203676 102840 S   6.1  2.5   3:20.88 chrome                                                                                                                 
 7082 jadi      20   0 1210748  73136  42528 S   6.1  0.9   0:36.51 Telegram                                                                                                               
 7806 jadi      20   0   33796   3004   2500 R   6.1  0.0   0:00.02 top                                                                                                                    
    1 root      20   0   29528   4320   2584 S   0.0  0.1   0:01.71 init
```

You can see the processes, system load, uptime, CPU status, memory, ... and do some stuff:

| key during top | functionality |
| :--- | :--- |
| h | help |
| q | quit |
| M | sort based on memory usage" |
| c | show full commands |
| k | kill after asking pid and signal |

### free

The `free` command will show you info about the system memory. The default is _kilobytes_ but you can change it with `-m` for megabytes, `-g` for _gigabytes_ or even `-b` for bytes:

```text
$ free -m
             total       used       free     shared    buffers     cached
Mem:          7871       5231       2640        332        169       2195
-/+ buffers/cache:       2866       5005
Swap:         7627          0       7627
```

> The system should not use swap in long term

### uptime

The `uptime` command shows the time, how long the system is up, how may users are logged in and the load average of 1, 5 & 15 minutes:

```text
$ uptime
 21:18:52 up  1:34,  5 users,  load average: 2.38, 2.64, 2.41
```

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

