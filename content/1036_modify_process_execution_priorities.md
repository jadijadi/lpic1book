Title: 103.6 Modify process execution priorities
Date: 2010-12-03 10:20
Category: LPIC1
Tags: LPIC1, 101, LPIC1-101-500
Authors: Jadi
Summary: 
sortorder: 170

_Weight: 2_

Candidates should be able to manage process execution priorities.

### Objectives

* Know the default priority of a job that is created.
* Run a program with higher or lower priority than the default..
* Change the priority of a running process.
* nice
* ps
* renice
* top

On a Linux system, we are running a lot of processes and programs on a few CPUs. So you need a way to tell your OS to give more priority to some tasks or give less resources to some others. In last section you saw the `top` command to check the CPU usage of each process:

```text
$ top

top - 08:44:51 up 13:00,  5 users,  load average: 0.57, 1.50, 1.50
Tasks: 290 total,   2 running, 288 sleeping,   0 stopped,   0 zombie
%Cpu(s): 38.4 us,  9.4 sy,  0.0 ni, 49.3 id,  2.8 wa,  0.0 hi,  0.0 si,  0.0 st
KiB Mem:   8060264 total,  7858348 used,   201916 free,   360144 buffers
KiB Swap:  7811068 total,        0 used,  7811068 free.  2842344 cached Mem

  PID USER      PR  NI    VIRT    RES    SHR S  %CPU %MEM     TIME+ COMMAND                                                                                                      
13605 jadi      25   5 1473652 530700  91128 R  54.5  6.6   3:25.50 firefox                                                                                                      
11157 root      20   0  572004 112652  94484 S   6.1  1.4   3:26.18 Xorg                                                                                                         
12265 jadi      20   0 1210484  75848  42264 S   6.1  0.9   0:32.06 Telegram                                                                                                     
12671 jadi      20   0 1800508 274564  80300 S   6.1  3.4   1:27.35 compiz                                                                                                       
15035 jadi      20   0  768688  54920  34228 S   6.1  0.7   0:00.93 /usr/bin/termin                                                                                              
15066 jadi      20   0   33796   3076   2448 R   6.1  0.0   0:00.02 top                                                                                                          
    1 root      20   0   29528   4320   2584 S   0.0  0.1   0:02.27 init                                                                                                         
    2 root      20   0       0      0      0 S   0.0  0.0   0:00.00 kthreadd                                                                                                     
    3 root      20   0       0      0      0 S   0.0  0.0   0:00.27 ksoftirqd/0                                                                                                  
    5 root       0 -20       0      0      0 S   0.0  0.0   0:00.00 kworker/0:0H    ```

    Chkecn th
```

There is **NI** column, it shows how **nice** the process is. The nicer the process, the less CPU it asks. Nice can be from -20 to 19 \(a process with nice = **-20** is ANGRY and asking for a lot of CPU while a process with nice = **19** is SUPER NICE and lets **other** processes use most of the CPU\).

> If you do not use nice command, processes will have nice level of 0. This can be checked with `nice` command:
>
> ```text
> $ nice
> 0
> ```

It is also possible to tell `ps` command to write the nice parameter of processes:

```text
$ ps -l
F S   UID   PID  PPID  C PRI  NI ADDR SZ WCHAN  TTY          TIME CMD
0 S  1000 15044 15035  0  80   0 -  7453 wait   pts/29   00:00:00 bash
0 S  1000 15052 15044  0  60 -20 -  3976 hrtime pts/29   00:00:00 sleep
0 R  1000 15080 15044  0  80   0 -  4680 -      pts/29   00:00:00 ps
```

### Setting priorities when running commands

If you need to change the niceness level of a program you can running it with `nice` command and `-n` switch \(for nice\):

```text
$ nice -n -20 echo "I am running!"
nice: cannot set niceness: Permission denied
I am running!
$ sudo nice -n -20 echo "I am running!"
I am running!
$ sudo nice -n 19 echo "I am running!"
I am running!
```

Please note to two points: 1. Give high priorities \(less than 0\) needs root access 2. If you are not root and asking for nice level lower than 0 you'll get an error message but the process will run with normal nice level \(0\).

If you run a command with `nice` without any parameters, the nice value will be 10:

```text
$ nice xeyes &
[1] 15217
$ ps -l
F S   UID   PID  PPID  C PRI  NI ADDR SZ WCHAN  TTY          TIME CMD
0 S  1000 15044 15035  0  80   0 -  7455 wait   pts/29   00:00:00 bash
0 S  1000 15217 15044  0  90  10 - 12522 poll_s pts/29   00:00:00 xeyes
0 R  1000 15218 15044  0  80   0 -  4680 -      pts/29   00:00:00 ps
```

### Changing priorities

The `renice` command can change the _niceness_ of running processes:

```text
$ ps -ef | grep firefox
jadi     13605 11226 30 08:28 ?        00:10:13 /usr/lib/firefox/firefox
jadi     15192 15044  0 09:01 pts/29   00:00:00 grep firefox
$ sudo renice -n -10 13605
13605 (process ID) old priority 5, new priority -10
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

.

. .

.

