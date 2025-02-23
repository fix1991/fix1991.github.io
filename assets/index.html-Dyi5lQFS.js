import{_ as t,c as a,b as i,o as p}from"./app-dwrF6lVS.js";const o="/assets/20240320133350-CdAfSghK.png",s={};function r(n,e){return p(),a("div",null,e[0]||(e[0]=[i('<p>版本：</p><ul><li>RabbitMQ 3.12.12</li></ul><p>参考：</p><ul><li>https://rabbitmq.com/download.html</li></ul><h2 id="windows" tabindex="-1"><a class="header-anchor" href="#windows"><span>Windows</span></a></h2><h2 id="linux" tabindex="-1"><a class="header-anchor" href="#linux"><span>Linux</span></a></h2><h2 id="docker" tabindex="-1"><a class="header-anchor" href="#docker"><span>Docker</span></a></h2><p>镜像地址：https://hub.docker.com/_/rabbitmq/</p><p>1.下载镜像</p><p><code>docker pull rabbitmq:4</code></p><p>2.创建容器</p><p><code>docker create --name rabbitmq4 -p 5672:5672 -p 15672:15672 -e RABBITMQ_DEFAULT_USER=guest -e RABBITMQ_DEFAULT_PASS=guest -e RABBITMQ_DEFAULT_VHOST=/ rabbitmq:4</code></p><p>参数：</p><ul><li><em>-p 5672:5672</em>，RabbitMQ的AMQP端口映射</li><li><em>-p 15672:15672</em>，RabbitMQ管理控制台端口映射</li><li><em>-e RABBITMQ_DEFAULT_USER=guest -e RABBITMQ_DEFAULT_PASS=guest</em> ，RabbitMQ管理控制台用户名和密码，默认guest/guset</li><li><em>-e RABBITMQ_DEFAULT_VHOST=/</em>，RabbitMQ vHost，默认 /</li></ul><p>3.启动容器</p><p><code>docker start rabbitmq4</code></p><p>4.查看容器启动日志</p><p><code>docker logs rabbitmq4</code></p><p>5.启用RabbitMQ管理插件</p><p>进入容器</p><p><code>docker exec -it rabbitmq4 bash</code></p><p>启动插件</p><p><code>rabbitmq-plugins enable rabbitmq_management</code></p><p>6.访问RabbitMQ控制台</p><p>在浏览器中访问：http://localhost:15672/，输入用户名和密码（guest/guest）</p><p><img src="'+o+'" alt=""></p>',26)]))}const m=t(s,[["render",r],["__file","index.html.vue"]]),b=JSON.parse('{"path":"/notes/middleware/6zf87y1b/","title":"RabbitMQ安装","lang":"zh-CN","frontmatter":{"title":"RabbitMQ安装","createTime":"2024/11/24 15:56:15","permalink":"/notes/middleware/6zf87y1b/"},"headers":[],"readingTime":{"minutes":0.63,"words":189},"git":{"updatedTime":1740307640000,"contributors":[{"name":"fix1991","email":"13520322212@163.com","commits":1,"avatar":"https://avatars.githubusercontent.com/fix1991?v=4","url":"https://github.com/fix1991"},{"name":"ianping","email":"13520322212@163.com","commits":1,"avatar":"https://avatars.githubusercontent.com/ianping?v=4","url":"https://github.com/ianping"}]},"filePathRelative":"notes/middleware/rabbitmq/RabbitMQ安装.md","bulletin":false}');export{m as comp,b as data};
