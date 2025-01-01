---
title: docker安装
createTime: 2024/11/24 15:56:14
permalink: /notes/devtools/hhxnlumo/
---

## Windows安装docker

参考：

- https://docs.docker.com/desktop/install/windows-install/

- https://docs.docker.com/get-docker/

## Linux安装docker

### Ubuntu

参考：https://docs.docker.com/engine/install/ubuntu/

1.卸载docker旧版本

```sh
for pkg in docker.io docker-doc docker-compose docker-compose-v2 podman-docker containerd runc; do sudo apt-get remove $pkg; done
```

2.配置docker repository

```sh
# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
```

3.安装docker

```sh
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

4.验证

`docker --version`

### CentOS

https://docs.docker.com/engine/install/centos/

可以使用rpm repository在线安装，这里选择rpm package离线安装的方式。

1.卸载旧版本

```sh
yum remove docker \
          docker-client \
          docker-client-latest \
          docker-common \
          docker-latest \
          docker-latest-logrotate \
          docker-logrotate \
          docker-engine
```

2.下载rpm安装包

https://download.docker.com/linux/centos/

3.依次安装rpm包

- `yum install containerd.io-1.6.33-3.1.el7.x86_64.rpm`
- `yum install docker-compose-plugin-2.6.0-3.el7.x86_64.rpm`
- `yum install docker-buildx-plugin-0.14.1-1.el7.x86_64.rpm`
- `yum install docker-ce-cli-26.1.4-1.el7.x86_64.rpm`
- `yum install docker-ce-rootless-extras-26.1.4-1.el7.x86_64.rpm docker-ce-26.1.4-1.el7.x86_64.rpm`
- `yum install docker-scan-plugin-0.9.0-3.el7.x86_64.rpm`

4.设置

- `systemctl enable docker.service` 设置docker开机启动
- `systemctl start docker` 启动docker服务
- `docker info` 验证安装

## 配置docker hub镜像

1.配置daemon.json

`vim /etc/docker/daemon.json`

```json
{
  "registry-mirrors": [
    "https://docker.hpcloud.cloud",
    "https://docker.m.daocloud.io",
    "https://docker.unsee.tech",
    "https://docker.1panel.live",
    "http://mirrors.ustc.edu.cn",
    "https://docker.chenby.cn",
    "http://mirror.azure.cn",
    "https://dockerpull.org",
    "https://dockerhub.icu",
    "https://hub.rat.dev"
  ]
}
```

2.重启服务

`systemctl daemon-reload`

`systemctl restart docker`

3.查看Registry Mirrors配置项是否生效

`docker info`

## 修改镜像存储位置

### Windows

默认存储位置：C:\Users\username\AppData\Local\Docker\wsl\

打开Docker Desktop，依次选择Settings -> Resources -> Advanced，设置Disk image location为新的目录，docker会自动进行设置，并将原有镜像移动到新的目录。

### Linux

默认存储位置： /var/lib/docker/image/
