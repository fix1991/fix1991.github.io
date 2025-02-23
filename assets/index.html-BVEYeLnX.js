import{_ as a,c,b as s,o as t}from"./app-dwrF6lVS.js";const o={};function n(d,e){return t(),c("div",null,e[0]||(e[0]=[s(`<h2 id="ping" tabindex="-1"><a class="header-anchor" href="#ping"><span><code>ping</code></span></a></h2><h2 id="telnet" tabindex="-1"><a class="header-anchor" href="#telnet"><span><code>telnet</code></span></a></h2><h2 id="ifconfig" tabindex="-1"><a class="header-anchor" href="#ifconfig"><span><code>ifconfig</code></span></a></h2><h2 id="sshd" tabindex="-1"><a class="header-anchor" href="#sshd"><span><code>sshd</code></span></a></h2><p><code>systemctl start|stop|restart|enable|disable sshd</code>：启动、停止、重启、开启自动启动、禁用自动启动sshd服务。</p><p><code>ssh username@hostname</code>：远程登录ssh服务</p><p>SSH允许root身份登录</p><p>Ubuntu：<code>vim /etc/ssh/sshd_config</code></p><div class="language- line-numbers-mode" data-ext="" data-title=""><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes github-light material-theme-darker vp-code"><code><span class="line"><span>#PermitRootLogin prohibit-password # 禁止root身份登录</span></span>
<span class="line"><span>PermitRootLogin yes # 允许root身份登录</span></span>
<span class="line"><span>PasswordAuthentication yes # 使用密码登录</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>service ssh restart</code></p><h2 id="ftp" tabindex="-1"><a class="header-anchor" href="#ftp"><span><code>ftp</code></span></a></h2><h2 id="scp" tabindex="-1"><a class="header-anchor" href="#scp"><span><code>scp</code></span></a></h2><h2 id="curl" tabindex="-1"><a class="header-anchor" href="#curl"><span><code>curl</code></span></a></h2><p><code>curl http://example.com</code></p><p><code>curl -H &#39;User-Agent: php/1.0&#39; http://example.com</code></p><p><code>curl -d &#39;username=emma&#39; -d &#39;password=123&#39; -X POST http://example.com/login</code></p><p><code>curl --data-urlencode &#39;comment=hello world&#39; http://example.com/login</code></p><p><code>curl -H &#39;Accept-Language: en-US&#39; http://example.com</code></p><h2 id="firewalld" tabindex="-1"><a class="header-anchor" href="#firewalld"><span><code>firewalld</code></span></a></h2><p><code>systemctl start firewall-cmd</code>：开启防火墙服务</p><p><code>systemctl stop firewalld.service</code>：关闭防火墙服务</p><p><code>systemctl enable firewalld.service</code>：开机启动防火墙服务</p><p><code>firewall-cmd --state</code>：查看防火墙状态</p><p><code>firewall-cmd --reload</code>：重新加载防火墙配置</p><p><code>firewall-cmd --get-zones</code>：列出所有区域zone</p><p><code>firewall-cmd --zone=public --list-all</code>：查看指定区域的防火墙配置</p><p><code>firewall-cmd --permanent --zone=public --list-all</code>：查看指定区域的永久防火墙配置</p><p><code>firewall-cmd --permanent --zone=public --list-ports</code>：列出指定区域的所有端口</p><p><code>firewall-cmd --zone=public --add-port=80/tcp --permanent</code>：添加端口到指定区域</p><p><code>firewall-cmd --zone=public --remove-port=80/tcp --permanent</code>：从指定区域删除端口</p>`,30)]))}const p=a(o,[["render",n],["__file","index.html.vue"]]),l=JSON.parse('{"path":"/notes/cs/8zms6a9y/","title":"Linux常用工具","lang":"zh-CN","frontmatter":{"title":"Linux常用工具","createTime":"2024/11/24 15:56:14","permalink":"/notes/cs/8zms6a9y/"},"headers":[],"readingTime":{"minutes":0.98,"words":293},"git":{"updatedTime":1740307640000,"contributors":[{"name":"fix1991","email":"13520322212@163.com","commits":1,"avatar":"https://avatars.githubusercontent.com/fix1991?v=4","url":"https://github.com/fix1991"},{"name":"ianping","email":"13520322212@163.com","commits":1,"avatar":"https://avatars.githubusercontent.com/ianping?v=4","url":"https://github.com/ianping"}]},"filePathRelative":"notes/cs/计算机操作系统/linux/Linux常用工具.md","bulletin":false}');export{p as comp,l as data};
