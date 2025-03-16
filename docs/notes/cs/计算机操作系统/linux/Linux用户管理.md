---
title: Linux用户管理
createTime: 2024/11/24 15:56:14
permalink: /notes/cs/p9gphryh/
---



## /etc/passwd文件

/etc/passwd文件存储用户相关信息：**​用户名:密码:UID:GID:备注信息:$HOME:默认Shell**

`cat /etc/passwd`

```
root:x:0:0:root:/root:/bin/bash
bin:x:1:1:bin:/bin:/sbin/nologin
daemon:x:2:2:daemon:/sbin:/sbin/nologin
sync:x:5:0:sync:/sbin:/bin/sync
shutdown:x:6:0:shutdown:/sbin:/sbin/shutdown
halt:x:7:0:halt:/sbin:/sbin/halt
mail:x:8:12:mail:/var/spool/mail:/sbin/nologin
operator:x:11:0:operator:/root:/sbin/nologin
games:x:12:100:games:/usr/games:/sbin/nologin
ftp:x:14:50:FTP User:/var/ftp:/sbin/nologin
nobody:x:99:99:Nobody:/:/sbin/nologin
ian:x:1000:1000:ian:/home/ian:/bin/bash
```

/etc/shadow文件存储用户密码信息

`cat /etc/shadow`

```
root:$1$MLXVSved$hSdEqpimA//riZ1NDhgTE.:20058:0:99999:7:::
bin:*:18353:0:99999:7:::
daemon:*:18353:0:99999:7:::
sync:*:18353:0:99999:7:::
shutdown:*:18353:0:99999:7:::
halt:*:18353:0:99999:7:::
mail:*:18353:0:99999:7:::
operator:*:18353:0:99999:7:::
games:*:18353:0:99999:7:::
ftp:*:18353:0:99999:7:::
nobody:*:18353:0:99999:7:::
ian:$1$6MBCPWId$3P3DJ60nCAz4fsZPjbavg.:20058:0:99999:7::
```



用户管理

useradd

usermod

userdel

用户组管理

groupadd

groupdel

groupmod

密码管理

passwd

