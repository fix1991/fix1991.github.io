---
title: Linux环境配置
createTime: 2024/12/01 22:17:20
permalink: /notes/cs/zowvgda4/
---
## Ubuntu





## CentOS

### 配置yum源

```sh
# 备份默认源配置
mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.bak
# 使用阿里云yum源
wget -O /etc/yum.repos.d/CentOS-Base.repo https://mirrors.aliyun.com/repo/Centos-7.repo
# 重新生成缓存
yum clean all
yum makecache
```