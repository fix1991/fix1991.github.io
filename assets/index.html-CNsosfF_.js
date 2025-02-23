import{_ as i,c as a,b as e,o as n}from"./app-dwrF6lVS.js";const t={};function l(h,s){return n(),a("div",null,s[0]||(s[0]=[e(`<h2 id="ubuntu" tabindex="-1"><a class="header-anchor" href="#ubuntu"><span>Ubuntu</span></a></h2><h2 id="centos" tabindex="-1"><a class="header-anchor" href="#centos"><span>CentOS</span></a></h2><h3 id="配置yum源" tabindex="-1"><a class="header-anchor" href="#配置yum源"><span>配置yum源</span></a></h3><div class="language-sh line-numbers-mode" data-ext="sh" data-title="sh"><button class="copy" title="复制代码" data-copied="已复制"></button><pre class="shiki shiki-themes github-light material-theme-darker vp-code"><code><span class="line"><span style="--shiki-light:#6A737D;--shiki-light-font-style:inherit;--shiki-dark:#545454;--shiki-dark-font-style:italic;"># 备份默认源配置</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#FFCB6B;">mv</span><span style="--shiki-light:#032F62;--shiki-dark:#C3E88D;"> /etc/yum.repos.d/CentOS-Base.repo</span><span style="--shiki-light:#032F62;--shiki-dark:#C3E88D;"> /etc/yum.repos.d/CentOS-Base.repo.bak</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-light-font-style:inherit;--shiki-dark:#545454;--shiki-dark-font-style:italic;"># 使用阿里云yum源</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#FFCB6B;">wget</span><span style="--shiki-light:#005CC5;--shiki-dark:#C3E88D;"> -O</span><span style="--shiki-light:#032F62;--shiki-dark:#C3E88D;"> /etc/yum.repos.d/CentOS-Base.repo</span><span style="--shiki-light:#032F62;--shiki-dark:#C3E88D;"> https://mirrors.aliyun.com/repo/Centos-7.repo</span></span>
<span class="line"><span style="--shiki-light:#6A737D;--shiki-light-font-style:inherit;--shiki-dark:#545454;--shiki-dark-font-style:italic;"># 重新生成缓存</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#FFCB6B;">yum</span><span style="--shiki-light:#032F62;--shiki-dark:#C3E88D;"> clean</span><span style="--shiki-light:#032F62;--shiki-dark:#C3E88D;"> all</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#FFCB6B;">yum</span><span style="--shiki-light:#032F62;--shiki-dark:#C3E88D;"> makecache</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,4)]))}const p=i(t,[["render",l],["__file","index.html.vue"]]),d=JSON.parse('{"path":"/notes/cs/zowvgda4/","title":"Linux环境配置","lang":"zh-CN","frontmatter":{"title":"Linux环境配置","createTime":"2024/12/01 22:17:20","permalink":"/notes/cs/zowvgda4/"},"headers":[],"readingTime":{"minutes":0.19,"words":57},"git":{"updatedTime":1735751012000,"contributors":[{"name":"ianping","email":"13520322212@163.com","commits":1,"avatar":"https://avatars.githubusercontent.com/ianping?v=4","url":"https://github.com/ianping"}]},"filePathRelative":"notes/cs/计算机操作系统/linux/Linux环境配置.md","bulletin":false}');export{p as comp,d as data};
