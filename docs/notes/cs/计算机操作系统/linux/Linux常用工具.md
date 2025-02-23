---
title: Linux常用工具
createTime: 2024/11/24 15:56:14
permalink: /notes/cs/8zms6a9y/
---
## `ping`



## `telnet`



## `ifconfig`



## `sshd`

`systemctl start|stop|restart|enable|disable sshd`：启动、停止、重启、开启自动启动、禁用自动启动sshd服务。

`ssh username@hostname`：远程登录ssh服务


SSH允许root身份登录

Ubuntu：`vim /etc/ssh/sshd_config`

```
#PermitRootLogin prohibit-password # 禁止root身份登录
PermitRootLogin yes # 允许root身份登录
PasswordAuthentication yes # 使用密码登录
```

`service ssh restart`

## `ftp`



## `scp`



## `curl`

`curl http://example.com`

`curl -H 'User-Agent: php/1.0' http://example.com`

`curl -d 'username=emma' -d 'password=123' -X POST  http://example.com/login`

`curl --data-urlencode 'comment=hello world' http://example.com/login`

`curl -H 'Accept-Language: en-US' http://example.com`



## `firewalld`

`systemctl start firewall-cmd`：开启防火墙服务

`systemctl stop firewalld.service`：关闭防火墙服务

`systemctl enable firewalld.service`：开机启动防火墙服务

`firewall-cmd --state`：查看防火墙状态

`firewall-cmd --reload`：重新加载防火墙配置

`firewall-cmd --get-zones`：列出所有区域zone

`firewall-cmd --zone=public --list-all`：查看指定区域的防火墙配置

`firewall-cmd --permanent --zone=public --list-all`：查看指定区域的永久防火墙配置

`firewall-cmd --permanent --zone=public --list-ports`：列出指定区域的所有端口

`firewall-cmd --zone=public --add-port=80/tcp --permanent`：添加端口到指定区域

`firewall-cmd --zone=public --remove-port=80/tcp --permanent`：从指定区域删除端口



