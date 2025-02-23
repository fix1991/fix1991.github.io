---
title: github
createTime: 2024/11/24 15:56:14
permalink: /notes/devtools/5t49b7fw/
---

## 报错

git推送github报错：

*ssh: connect to host github.com port 22: Connection timed out*

解决：创建ssh配置文件 *~/.ssh/config*

```
Host github.com
User git
Hostname ssh.github.com
PreferredAuthentications publickey
IdentityFile ~/.ssh/id_rsa
Port 443
```

参考：https://stackoverflow.com/questions/15589682/how-to-fix-ssh-connect-to-host-github-com-port-22-connection-timed-out-for-g
