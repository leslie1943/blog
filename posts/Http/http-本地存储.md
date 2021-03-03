## 本地存储

#### cookie
- `Http Cookie`也叫浏览器 `Cookie`, 是服务器发送到用户浏览器并保存(`种`)在本地的一小块数据,它会在浏览器下一个向同一个服务器再次发起请求时携带并发送到服务器上. 通常, 它用于告知服务端两个请求是否来自同一个浏览器, 如保持用户的登录状态. Cookie使基于无状态的HTTP协议记录稳定的状态信息成为了可能.
- `cookie`的大小被限制在`4KB`
- `cookie`可以设置过期的时间, 默认是会话结束的时候, 当时间到自动销毁
- 一个域名下存放的`cookie`的个数是有限制的, 不同的浏览器存放的个数不一样
- 用户的每次服务器请求, `cookie`都会随着这些请求发送到服务器
- `cookie`的数据始终在同源的http请求中携带,即使不需要. 这也是`cookie`不能太大的原因

#### session
- `Session` 代表着服务器和客户端一次会话的过程.`session` 对象存储特定用户所需的属性和配置信息.这样应用程序的web页面之间跳转时, 存储在`session`对象中的变量就不会丢失,而是在整个会话中一直存在下去. 当客户端关闭的时候, 或者`Session`超时失效时会话结束


#### cookie vs session
- `cookie`数据存放在客户的浏览器上, `session`存放在服务器上
- `cookie`不是很安全, 别人可以分析放在本地的`cookie`进行`cookie`欺骗.
- `session`会在一定时间内保存在服务器上. 当访问增多时,会比较占用服务器的性能
- 单个`cookie`保存的数据不能超过`4KB`, `session` 可存储的数据远高于 `cookie`
- `cookie`可设置为长时间保存. `session` 一般失效时间较短,客户端关闭或者 `session` 超时都会失效
- `cookie`只能保存字符串类型, `Session` 可以存储任意类型数据


#### H5新的前端存储方法 localStorage
- `localStorage`是一种持久化的存储方式, 如果不手动清除,数据永远不会过期. 采用`key-value`的方式存储数据.
- 保存的数据长期存在
- 大小为`5M`左右
- 仅在客户端使用,不和服务端进行通信
- 存储的信息在同一域中是共享的
- `localStorage` 本质上是对字符串的读取,如果存储内容多的话会消耗内存空间,会导致页面变卡
```js
localStorage.setItem('propName','propValue')
localStorage.getItem('propName')
localStorage.removeItem('propName')
// 清除所有
localStorage.clear()
```

#### H5新的前端存储方法 sessionStorage
- 和服务端使用的 Session 类似, 也是一种会话级别的缓存, 关闭浏览器数据就会被清除.不过有点特别的是它的作用域是窗口级别的. 不同窗口间的`sessionStorage`数据是不能共享的. 使用方法和`localStorage`相同


#### localStorage vs sessionStorage
- `localStorage`是永久存储,除非手动删除,`sessionStorage` 当会话结束(当前页面关闭的时候,自动销毁)
- `localStorage` 只要在相同的协议、相同的主机名、相同的端口下,就能读取/修改到同一份`localStorage`数据


#### indexedDB
IndexedDB 就是浏览器提供的本地数据库, 它可以被网页脚本创建和操作. IndexedDB 允许储存大量数据, 提供查找接口, 还能建立索引. 这些都是 LocalStorage 所不具备的. 就数据库类型而言, IndexedDB 不属于关系型数据库（不支持 SQL 查询语句）, 更接近 NoSQL 数据库. 

- `键值对储存`. IndexedDB 内部采用对象仓库（object store）存放数据. 所有类型的数据都可以直接存入, 包括 JavaScript 对象. 对象仓库中, 数据以“键值对”的形式保存, 每一个数据记录都有对应的主键, 主键是独一无二的, 不能有重复, 否则会抛出一个错误. 
- `异步`. IndexedDB 操作时不会锁死浏览器, 用户依然可以进行其他操作, 这与 LocalStorage 形成对比, 后者的操作是同步的. 异步设计是为了防止大量数据的读写, 拖慢网页的表现. 
- `支持事务`. IndexedDB 支持事务（transaction）, 这意味着一系列操作步骤之中, 只要有一步失败, 整个事务就都取消, 数据库回滚到事务发生之前的状态, 不存在只改写一部分数据的情况. 
- `同源限制`. IndexedDB 受到同源限制, 每一个数据库对应创建它的域名. 网页只能访问自身域名下的数据库, 而不能访问跨域的数据库. 
- `储存空间大`. IndexedDB 的储存空间比 LocalStorage 大得多, 一般来说不少于 250MB, 甚至没有上限. 
支持二进制储存. IndexedDB 不仅可以储存字符串, 还可以储存二进制数据（ArrayBuffer 对象和 Blob 对象）. 