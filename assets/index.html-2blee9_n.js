import{_ as a,c as r,b as i,o as n}from"./app-dwrF6lVS.js";const t={};function l(o,e){return n(),r("div",null,e[0]||(e[0]=[i('<p>版本信息：</p><ul><li>Java 17(64位JVM)</li><li>Gradle 8.6</li><li>IDEA 2021.2.1</li><li>MDK 1.20.2-48.1.0</li></ul><h2 id="配置java" tabindex="-1"><a class="header-anchor" href="#配置java"><span>配置Java</span></a></h2><p><strong>下载</strong></p><p>https://www.oracle.com/java/technologies/downloads/</p><p><strong>安装</strong></p><p>解压zip文件到安装目录</p><p><strong>配置环境变量</strong></p><ul><li>新建 <em>JAVA_HOME</em> 变量，值为jdk目录</li><li>修改PATH环境变量，添加 <em>$JAVA_HOME/bin</em></li></ul><p><strong>验证</strong></p><p><code>java --version</code></p><h2 id="配置gradle" tabindex="-1"><a class="header-anchor" href="#配置gradle"><span>配置Gradle</span></a></h2><p><strong>下载</strong></p><p>https://gradle.org/releases/</p><p><strong>安装</strong></p><p>解压zip文件到安装目录</p><p><strong>配置环境变量</strong></p><ul><li>新建 <em>GRADLE_HOME</em> 变量，值为gradle目录</li><li>修改PATH环境变量，添加 <em>$GRADLE_HOME/bin</em></li><li>新建 <em>GRADLE_USER_PATH</em> 环境变量，值为gradle本地仓库目录（默认 <em>~/.gradle</em>）</li></ul><p><strong>验证</strong></p><p><code>gradle --version</code></p><h2 id="配置ide" tabindex="-1"><a class="header-anchor" href="#配置ide"><span>配置IDE</span></a></h2><p><strong>下载IntelliJ IDEA</strong></p><p>https://www.jetbrains.com/idea/download/</p><p><strong>安装</strong></p><p>运行安装文件</p><p><strong>配置</strong></p><ul><li>配置编码所有为UTF-8</li><li>配置JDK目录</li><li>配置Gradle目录</li></ul><h2 id="配置minecraftforge-mdk" tabindex="-1"><a class="header-anchor" href="#配置minecraftforge-mdk"><span>配置MinecraftForge MDK</span></a></h2><p><strong>下载</strong></p><p>https://files.minecraftforge.net/net/minecraftforge/forge/</p><p>MDK zip文件解压后是一个gradle构建的示例Mod项目，开发自己的Mod要基于这个项目。</p><h2 id="运行示例mod项目" tabindex="-1"><a class="header-anchor" href="#运行示例mod项目"><span>运行示例Mod项目</span></a></h2><ol><li>解压MDK zip文件，重命名为项目名称</li><li>使用IDEA打开项目，设置IDEA中JDK、Gradle为本地的版本</li><li>运行 <code>gradlew genIntellijRuns</code></li><li>运行 <code>gradlew build</code>，等待Gradle下载完依赖(时间会很漫长...)</li><li>运行 <code>gradlew runServer</code>，启动服务器</li><li>运行 <code>gradlew runClient，启动客户端</code></li></ol>',33)]))}const p=a(t,[["render",l],["__file","index.html.vue"]]),d=JSON.parse('{"path":"/notes/minecraft/vptuj4gv/","title":"minecraft开发环境搭建","lang":"zh-CN","frontmatter":{"title":"minecraft开发环境搭建","createTime":"2024/11/24 15:56:15","permalink":"/notes/minecraft/vptuj4gv/"},"headers":[],"readingTime":{"minutes":1.04,"words":313},"git":{"updatedTime":1733057441000,"contributors":[{"name":"ianping","email":"13520322212@163.com","commits":2,"avatar":"https://avatars.githubusercontent.com/ianping?v=4","url":"https://github.com/ianping"}]},"filePathRelative":"notes/minecraft/minecraft开发环境搭建.md","bulletin":false}');export{p as comp,d as data};
