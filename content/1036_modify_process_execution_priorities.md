Title: 103.6 Modify process execution priorities
Date: 2010-12-03 10:20
Category: LPIC1
Tags: LPIC1, 101, LPIC1-101-500
Authors: Jadi
Summary: 
sortorder: 170

_Weight: 2_

Candidates should be able to manage process execution priorities.

## Objectives
* Know the default priority of a job that is created.
* Run a program with higher or lower priority than the default.
* Change the priority of a running process.

## Terms
* nice
* ps
* renice
* top

On a Linux machine, you might have 100s of processes running at the same time and competing for more CPU & RAM. The good news is that you can give some of the processes higher or lower priority (or nice-ness) in this competition. Lets have a look at a sample `top` output:


```text
$ top

Tasks: 169 total,   1 running, 168 sleeping,   0 stopped,   0 zombie
%Cpu(s):  0.0 us,  3.0 sy,  0.0 ni, 97.0 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st
MiB Mem :   5948.9 total,   4115.2 free,    438.2 used,   1395.5 buff/cache
MiB Swap:    975.0 total,    975.0 free,      0.0 used.   5210.3 avail Mem 

    PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND                                        
   6496 jadi      20   0   10112   3704   3212 R   6.2   0.1   0:00.01 top                                            
      1 root      20   0  165172  10576   7780 S   0.0   0.2   0:02.80 systemd                                        
      2 root      20   0       0      0      0 S   0.0   0.0   0:00.09 kthreadd                                       
      3 root       0 -20       0      0      0 I   0.0   0.0   0:00.00 rcu_gp                                         
      4 root       0 -20       0      0      0 I   0.0   0.0   0:00.00 rcu_par_gp                                     
      6 root       0 -20       0      0      0 I   0.0   0.0   0:00.00 kworker/0:0H-events_highpri                    
      8 root       0 -20       0      0      0 I   0.0   0.0   0:12.71 kworker/0:1H-events_highpri                    
      9 root       0 -20       0      0      0 I   0.0   0.0   0:00.00 mm_percpu_wq                                   
     10 root      20   0       0      0      0 S   0.0   0.0   0:00.00 rcu_tasks_rude_                                
     11 root      20   0       0      0      0 S   0.0   0.0   0:00.00 rcu_tasks_trace
```

The **NI** column shows how **nice** this process is. The nicer the process, the less CPU it asks. The `nice` values can be from -20 to 19. To interpret this value, look at it like this :a process with nice = **-20** is ANGRY and gets more priority for CPU and RAM while a process with nice = **19** is SUPER NICE and lets **other** processes use the resources before her).

The default value for `nice` is normally set on 0; this can be checked with:

```
$ nice
0
```

You can also check the nice-ness using the `ps` command:

```text
$ ps -l
F S   UID   PID  PPID  C PRI  NI ADDR SZ WCHAN  TTY          TIME CMD
0 S  1000 15044 15035  0  80   0 -  7453 wait   pts/29   00:00:00 bash
0 S  1000 15052 15044  0  60 -20 -  3976 hrtime pts/29   00:00:00 sleep
0 R  1000 15080 15044  0  80   0 -  4680 -      pts/29   00:00:00 ps
```

### Setting nice-ness

If you need to change the niceness level of a program you can running it with `nice` command and `-n` switch \(for nice\):

```text
$ nice -n 19 echo "I am running!"
I am running!
$ nice -n -20 echo "I am running!"
nice: cannot set niceness: Permission denied
I am running!
$ sudo nice -n -20 echo "I am running!"
I am running!
```

As you can in above example, only root can issue high priority niceness (below 0).

> If you run a command with `nice` without `-n`, the default will be `-n 10`

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

The `renice` command can be used to change the _niceness_ of your running processes (or others if you are root):

```text
$ ps -ef | grep firefox
jadi     13605 11226 30 08:28 ?        00:10:13 /usr/lib/firefox/firefox
jadi     15192 15044  0 09:01 pts/29   00:00:00 grep firefox
$ sudo renice -n -10 13605
13605 (process ID) old priority 5, new priority -10
```

> You can also press `r` in `top` command to renice a process