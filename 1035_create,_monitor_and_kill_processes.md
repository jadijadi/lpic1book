# 103.5. Create, monitor and kill processes
*Weight: 4*

Candidates should be able to perform basic process management.

## Objectives

- Run jobs in the foreground and background.
- Signal a program to continue running after logout.
- Monitor active processes.
- Select and sort processes for display.
- Send signals to processes.


- &
- bg
- fg
- jobs
- kill
- nohup
- ps
- top
- free
- uptime
- killall

## foreground and background jobs
One of the great points of linux on its beginning days, was the ability to run many programs at the same time. This is done with sending programs to the background. 

Normally if you run a program on the terminal, it *blocks* your teminal but sending a command to the background will prevent this:

````
xclock &
````

But what if we started it normally? We can break / cancel it with `Ctrl+c` or *suspend* it using `Ctrl+z`. 

```
jadi@funlife:~$ xeyes 
^Z
[1]+  Stopped                 xeyes
jadi@funlife:~$ jobs
[1]+  Stopped                 xeyes
jadi@funlife:~$ bg
[1]+ xeyes &
jadi@funlife:~$ jobs
[1]+  Running                 xeyes &
jadi@funlife:~$ sleep 1000 & 
[2] 7395
jadi@funlife:~$ jobs
[1]-  Running                 xeyes &
[2]+  Running                 sleep 1000 &
jadi@funlife:~$ fg %2
sleep 1000
^Z
[2]+  Stopped                 sleep 1000
jadi@funlife:~$ jobs
[1]-  Running                 xeyes &
[2]+  Stopped                 sleep 1000
jadi@funlife:~$ bg sle
[2]+ sleep 1000 &
jadi@funlife:~$ jobs
[1]-  Running                 xeyes &
[2]+  Running                 sleep 1000 &
````

> -l switch of `jobs` will also show the process ID