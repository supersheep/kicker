Kicker
=======
简单易用的前端开发调试服务器


缘由
-----

1. 前端的项目与后端分开了。于是为了调试，你需要

- <del>把后端项目拉下来，安装各种依赖</del>
- <del>或者安装Fiddler或Charles，为每个项目设置代理规则</del>
- <del>或许还需要修改浏览器代理</del>
- 动态页面访问静态文件 -> 静态页面访问动态接口 听起来如何？


这就试试
--------



#### 下载安装kicker
		
	$ git clone git@github.com:supersheep/kicker.git
	$ cd kicker
	$ npm install -g
		

#### 来到你的项目根目录

	$ cd /root/of/your/project
	
#### 发射

	$ kicker
	
#### 访问
	
	http://localhost:1337


特性
------


#### 路由


你可以以express形式的url pattern定义路由
kicker会优先查找项目本地文件夹.kicker/route中的同名路由，再尝试从kicker默认提供的route中进行查找
	
```js
{
	"routes":[{
		"url":"*",
		"route":"static"
	}]
}
```	

#### 过滤器

或许每一个js文件都应该加上"use strict"
让kicker来为你做这件事情吧

```js
{
	"filters":["strict"]
	"routes":[{
		"url":"*",
		"route":"static"
	}]
}
```

你还可以用filter来自动编译动态css，coffee-script，但是这些我还没有做:p

在你自己的router中使用filter

```js
// 假设已将从文件读取到的文件内容赋值给filedata
filedata = req.kicker.filter(req,filedata);
res.send(filedata);
```

#### 备方
	
本地路由中不存在的路径会反向代理至fallback指定的host
	
	$ vi .kicker/config.json
	
```js
{
	"fallback":"dev.server.com",
	"routes":[{
		"url":"*",
		"route":"static"
	}]
}
```
#### 默认路由与过滤器	
	
目前路由仅包括static
过滤器仅包括strict


记得填坑
-------
1. filter/sass
2. filter/less
3. filter/stylus
4. filter/coffee
5. middleware/autorefresh
	
License
---------
(The MIT License)

Copyright (c) 2009-2012 TJ Holowaychuk <tj@vision-media.ca>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

