---
title: jquery示例
createTime: 2024/12/03 22:07:27
permalink: /notes/web/gtpav6at/
---
jQuery官网：https://jquery.com/

jQuery下载：https://www.jsdelivr.com/package/npm/jquery

## jQuery等待文档就绪事件的3种写法

```js
// 完整语法
$(document).ready(function(){
    console.log("dom ready!");
});

// 省略document参数
$().ready(function(){
    console.log("dom ready!");
});

// 省略ready方法调用
$(function(){
    console.log("dom ready!");
});
```

## jQuery AJAX操作

常用API：

- `jQuery.ajax([settings])`

- `jQuery.get(url [,data] [,success] [,dataType])` 向服务器发送GET请求

- `jQuery.post(url [,data] [,success] [,dataType])` 向服务器发送POST请求
- `jQuery.getJSON(url [,data] [,success])` 使用GET方法从服务加载JSON数据

- `$('#container').load(url [,data] [,complete])` 使用GET方法从服务器加载HTML文档，插入到目标容器中
- `jQuery.getScript(url [,success])` 使用GET方法从服务器加载javascript文件并立即执行

ajax参数：

- method：HTTP请求方法，默认GET，还支持POST, PUT
- url：HTTP资源路径
- headers：请求头对象，默认{}
- data：发送到服务器的数据
- dataType：期望服务器返回的数据类型（text, xml, json, script,  html, jsonp）
- timeout：超时时长（毫秒），默认0，表示永不超时

- async：是否异步，默认true
- success：回调函数，请求成功
- error：回调函数，请求失败
- complete：回调函数，在success和error之后执行