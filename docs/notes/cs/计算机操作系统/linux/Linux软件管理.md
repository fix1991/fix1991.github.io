---
title: Linux软件管理
createTime: 2024/12/01 22:51:34
permalink: /notes/cs/kwbth3vv/
---
## yum

> 基于RPM的Linux发行版（如 CentOS、Fedora、RHEL 等）的包管理工具

安装软件包

`yum install <package_name>`：安装指定的软件包。

`yum localinstall <rpm_file>`：从本地 RPM 文件安装软件包。

更新软件包

`yum update <package_name>`：更新指定的软件包到最新版本。

`yum update`：更新系统中所有已安装的软件包到最新版本（但不会安装新的软件包或删除已安装的软件包）。

`yum upgrade`：更新系统中所有已安装的软件包到最新版本，并可能安装新的软件包或删除不再需要的软件包。

删除软件包

`yum remove <package_name>`：删除指定的软件包。

查询软件包

`yum list`：列出所有可用的软件包。

`yum list installed`：列出所有已安装的软件包。

`yum list updates`：列出所有可以更新的软件包。

`yum info <package_name>`：显示指定软件包的信息。

搜索软件包

`yum search <keyword>`：搜索包含指定关键字的软件包。

清理缓存

`yum clean all`：清理所有缓存的文件。

`yum clean packages`：仅清理缓存的软件包文件。

`yum clean headers`：仅清理缓存的头文件。

解决依赖关系

`yum deplist <package_name>`：列出指定软件包的依赖关系。

历史记录

`yum histor`y：显示 yum 的操作历史记录。

`yum history info <transaction_id>`：显示指定事务的详细信息。

`yum history undo <transaction_id>`：撤销指定的事务（如果可能）。

组管理

`yum groupinstall <group_name>`：安装指定的软件包组。

`yum groupremove <group_name>`：删除指定的软件包组。

`yum grouplist`：列出所有可用的软件包组。

`yum groupinfo <group_name>`：显示指定软件包组的信息。

配置管理

`yum-config-manager --add-repo=<repo_file>`：添加新的仓库。

`yum-config-manager --disable <repo_id>`：禁用指定的仓库。

`yum-config-manager --enable <repo_id>`：启用指定的仓库。

其他

`yum makecache`：构建仓库的缓存，以加快后续的软件包查询和安装速度。

`yum reinstall <package_name>`：重新安装指定的软件包。

`yum downgrade <package_name>`：将指定的软件包降级到旧版本（需要指定旧版本的包或版本号）。

## apt

> Debian及其衍生版（如Ubuntu）的包管理工具

更新软件包列表

`apt update`：从配置的软件源中下载最新的软件包列表信息，但不会安装或升级任何软件包。这是在进行安装、升级之前建议执行的命令，以确保获取到最新的软件包信息。

安装软件包

`apt install <package_name>`：安装指定的软件包及其依赖项。如果软件包已经安装，则会尝试升级到最新版本。

升级软件包

`apt upgrade`：升级系统中所有已安装的软件包到最新版本。它会检查所有已安装的软件包，并将其升级到最新版本，同时处理依赖关系。

删除软件包

`apt remove <package_name>`：卸载指定的软件包，但保留其配置文件和数据。

`apt purge <package_name>`：完全卸载指定的软件包，包括其配置文件和数据。

搜索软件包

`apt search <keyword>`：在软件仓库中搜索包含指定关键字的软件包。

显示软件包信息

`apt show <package_name>`：显示指定软件包的详细信息，包括版本号、大小、依赖关系、描述等。

列出已安装的软件包

`apt list --installed`：列出所有已安装的软件包及其版本号。

清理不再需要的软件包

`apt autoremove`：自动删除那些作为其他软件包依赖项而被安装但现在不再需要的软件包。

清理下载的软件包文件

`apt clean`：清除已下载的软件包文件，释放磁盘空间。这些文件通常保存在本地的缓存目录中。

编辑软件源列表

虽然apt本身没有直接编辑软件源列表的命令，但可以使用`apt edit-sources`或手动编辑/etc/apt/sources.list文件来添加、删除或修改软件源。

其他高级功能

`apt full-upgrade`：与apt upgrade类似，但会进行更彻底的升级，可能会删除一些软件包以解决依赖关系问题。

`apt install --reinstall <package_name>`：重新安装已安装的软件包，有时用于修复损坏的安装。

`apt install --only-source <package_name>`：仅从源代码安装软件包（需要相应的源代码仓库支持）。

`apt install --download-only <package_name>`：仅下载软件包而不进行安装。
