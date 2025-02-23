---
title: Python开发环境搭建
createTime: 2024/11/24 15:56:15
permalink: /notes/python/3xdslzb9/
---
## Python

1.下载安装包

https://www.python.org/downloads/

2.安装或解压

3.配置环境变量

在PATH环境变量中，添加以下2个路径：

- path/to/python3.xx
- path/to/python3.xx/Scripts

## pip

配置镜像源

windows：

1. `cd C:\Users\xxx && mkdir pip && cd pip`

2. 创建pip.ini文件，内容如下

   ```
   [global]
   index-url = https://pypi.mirrors.ustc.edu.cn/simple/
   ```

Linux、MacOS：

1. `cd ~ && mkdir .pip && cd .pip`

2. 创建pip.conf文件，内容如下

   ```
   [global]
   index-url = https://pypi.mirrors.ustc.edu.cn/simple/
   ```

## virtualenv

官网：https://virtualenv.pypa.io/en/latest/

安装

`python -m pip install virtualenv`

## venv

## Anaconda

## Miniconda

Anaconda的精简版本

https://docs.anaconda.com/miniconda/

### 安装

安装后，需要在PATH环境变量中添加下面2个路径：

- path/to/miniconda3
- path/to/miniconda3/Scripts

### 命令

初始化conda Shell环境：`conda init`

查看env列表：`conda info --envs`

创建env：`conda create -n env_name`

创建指定Python版本的env：`conda create -n python2.7 python=2.7`

删除env：`conda remove --name env_name --all`

激活base env：`conda activate`

激活指定env：`conda activate env_name`

取消激活env：`conda deactivate`

安装lib：`conda install lib_name`

更新lib：`conda update lib_name`

查看lib列表：`conda list`

### 配置镜像源

生成配置文件~/.condarc：`conda config --set show_channel_urls yes`

修改~/.condarc

```
channels:
  - https://mirrors.ustc.edu.cn/anaconda/pkgs/free/
  - https://mirrors.ustc.edu.cn/anaconda/pkgs/main
  - https://mirrors.ustc.edu.cn/anaconda/pkgs/r
  - https://mirrors.ustc.edu.cn/anaconda/pkgs/msys2
  - https://mirrors.ustc.edu.cn/anaconda/cloud/conda-forge
  - https://mirrors.ustc.edu.cn/anaconda/cloud/bioconda
show_channel_urls: true
```

清除缓存：`conda clean -i`