# 移动端豆瓣电影推荐入口
by [@nanyang24](https://github.com/nanyang24)
## 源码
[地址](https://github.com/nanyang24/douban-movie)
## 效果

PC端请模拟移动端体验

[预览地址](https://nanyang24.github.io/douban-movie/)

扫描二维码，手机查看效果

![img](https://nanyang24.github.io/douban-movie/img/douban-movie.png)

## 下载

```
$ npm i -g web-douban-movie
```

## 涉及技术

1. HTML5，CSS3（页面布局和动画效果）
2. jQuery
3. webpack（合并，压缩，Polyfill）
4. npm的使用
5. 模块化思想
6. 单页路由spa


---

## 简述

本项目实现移动端仿豆瓣电影的单页应用，利用豆瓣提供的豆瓣电影API实现以下功能：

1. 展示豆瓣评分排名前250的电影
2. 展示北美电影排行榜
3. 展示近期即将上映电影
3. 提供搜索电影功能，将搜索到的相关的电影展示出来
4. 页面上所展示的电影条目都可以通过点击跳转到豆瓣电影的详细介绍


---
# 问题及解决
### 1. 移动端meta标签
1. viewport ：能优化移动浏览器的显示
`<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">`
注意，很多人使用initial-scale=1到非响应式网站上，这会让网站以100%宽度渲染，用户需要手动移动页面或者缩放。如果和initial-scale=1同时使用user-scalable=no或maximum-scale=1，则用户将不能放大/缩小网页来看到全部的内容。
2. `<meta content="always" name="referrer">`
3. WebApp全屏模式 ：伪装app，离线应用。
`<meta name="apple-mobile-web-app-capable" content="yes">`
`<!-- 启用 WebApp 全屏模式 -->`



### 2. 移动端调试

- 安装`npm install -g browser-sync`
- 查看命令`browser-sync`
- 启动`browser-sync start --server`


### 3. 判断页面滚动到底部、页面滚动到底部多次触发请求

> 在 Top250page 中，设定的是一次发送请求获得20条数据，无法在视窗一次性完全展示，必然会出现滚动条，在用户滚动到最底部时，触发下一次请求并展示加载动画。

#### 判断页面滚动到底部的方法：
通过比较页面此时的【视窗高度+此视窗距离顶部偏移的高度】 和 【内容容器的高度】 来判断页面是否到达底部，即使用 `.height()` 方法获得页面和视窗的高度，使用 `.scrollTop()` 获得视窗偏移的高度, 即 `($viewport.height() + $viewport.scrollTop() + 25 > $content.height())
` 。
**本项目中留出25px的冗余。**



**在用户继续滚动的情况下，会出现多次触发发送请求的情况，解决这个问题有两种方法**
1. 函数节流，在发送请求的函数之外添加一个定时器，使得请求在固定的延时之后再发送。
2. 加锁，添加初始值为false的变量isLoading，在请求发送前将isLoading的值改为true，不管请求成功或失败都将其值改为false，并在绑定事件中判断isLoading的值


---

# 单页路由 SPA
## 什么是路由？

通俗点说，就是不同的URL显示不同的内容

## 什么是单页应用?

单页，英文缩写为SPA( Single Page Application)，是把各种功能做在一个页面内. 那所谓的单页路由应用就是：**在一个页面内，通过切换地址栏的URL来实现切换内容的变化.**

> 路由是一个单页应用的核心，大部分前端框架都实现了一个复杂的路由库，包括动态路由，路由钩子，组件生命周期甚至服务器端渲染等复杂的功能。但是对于前端开发者而言，路由组件的核心是URL路径到函数的映射。

# 1．路由的原理
路由（Route）在前端可以理解为URL路径到函数的映射。当访问到一个特定的路径时执行特定的函数。另一个概念Router，用于管理各种Route，也就是匹配路径到函数的过程。
# 2．实现路由
Web端实现路由有两种技术模式。

-  基于Hash
-  基于History API

**Hash路由** 的路径中会有一个“#”标志，即常说的锚点，前端向后端服务器发送请求时并不会解析Hash部分。路由实现通过监听页面window对象的hashChange事情，调用对应的函数，优点是兼容性好且完全脱离后端，缺点是因为带了Hash标志导致路由不直观。

**History API** 通过监听HTML 5添加的popstate事件，URL格式跟传统的后端路由一致，这也是这种模式最大的优点。缺点是只有新型浏览器支持该特性，且需要后端路由配合，因为当用户访问一个History路由实现的路径时，页面仍会像后端请求，如果后端没有设置相应的路由实现逻辑，将返回404错误。


### 简述原理十分简单。
1. 拦截a标签的默认跳转动作。
2. 使用Ajax请求新页面。
3. 将返回的Html替换到页面中。
4. 使用HTML5的History API或者Url的Hash修改Url。



## 有足够多的理由来使用它：

1. 可以在页面切换间平滑过渡，增加Loading动画。
1. 可以在各个页面间传递数据，不依赖URL。
1. 可以选择性的保留状态，如音乐网站，切换页面时不会停止播放歌曲。
1. 所有的标签都可以用来跳转，不仅仅是a标签。
1. 避免了公共JS的反复执行，如无需在各个页面打开时都判断是否登录过等等。
1. 减少了请求体积，节省流量，加快页面响应速度。
1. 平滑降级到低版本浏览器上，对SEO也不会有影响。


# HTML5 History API
HTML5在History里增加了

### `history.pushState(state, title, url)`

**pushState方法会将当前的url添加到历史记录中，然后修改当前url为新url。请注意，这个方法只会修改地址栏的Url显示，但并不会发出任何请求。我们正是基于此特性来实现Pjax。它有3个参数：**

1. state: 可以放任意你想放的数据，它将附加到新url上，作为该页面信息的一个补充。
2. title: 顾名思义，就是document.title。不过这个参数目前并无作用，浏览器目前会选择忽略它。
3. url: 新url，也就是你要显示在地址栏上的url。

### `history.replaceState(state, title, url)`

replaceState方法与pushState大同小异，区别只在于pushState会将当前url添加到历史记录，之后再修改url，而replaceState只是修改url，不添加历史记录。

### `window.onpopstate` 事件
**一般来说，每当url变动时，popstate事件都会被触发。但若是调用pushState来修改url，该事件则不会触发，因此，我们可以把它用作浏览器的前进后退事件。该事件有一个参数，就是上文pushState方法的第一个参数state。**