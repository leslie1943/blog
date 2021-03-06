## JavaScript 严格模式
#### 概述
- 除了正常运行模式, ECMAscript 5添加了第二种运行模式：'严格模式'. 顾名思义, 这种模式使得Javascript在更严格的条件下运行. 

#### 目的
1. 消除Javascript语法的一些不合理不严谨的地方, 减少怪异行为
2. 消除代码运行的不安全之处,  保证代码运行的安全
3. 提高编译器效率, 增加运行速度
4. 为未来新版本的JavaScript做好铺垫

#### 进入标识
```js
'use strict'
```
#### 如何调用- 脚本文件
- 将 `use strict` 放在脚本文件的第一行, 则整个脚本都将以`严格模式`运行
如果这行语句不在第一行, 则无效, 整个脚本以`正常模式`运行. 如果不同模式的代码文件合并成一个文件, 这一点需要特别注意. 

```html
<script>
    "use strict"
     console.log('thi is strict mode.')
</script>

<script>
     console.log('thi is normal mode.')
</script>
```

#### 如何调用- 单个函数
- 将'use strict'放在函数体第一行, 则整个函数以严格模式运行
```js
function strict(){
    "use strict"
    return 'this is strict mode'
}

function noStrict(){
    return 'this is noStrict mode'
}
```

#### 严格模式下的语法和行为改变
1. 全局变量显式声明: 在正常模式中, 如果一个变量没有声明就赋值, 默认是全局变量. 严格模式禁止这种用法, 全局变量必须显式声明. 
2. 静态绑定: Javascript语言的一个特点, 就是允许"动态绑定", 即某些属性和方法到底属于哪一个对象, 不是在编译时确定的, 而是在运行时（runtime）确定的. 严格模式对动态绑定做了一些限制. 某些情况下, 只允许静态绑定. 也就是说, 属性和方法到底归属哪个对象, 在编译阶段就确定. 这样做有利于编译效率的提高, 也使得代码更容易阅读, 更少出现意外. 
3. 增强的安全措施
   1. 禁止this关键字指向全局对象
   2. 禁止在函数内部遍历调用栈
4. 4.4 禁止删除变量: 严格模式下无法删除变量. 只有configurable设置为true的对象属性, 才能被删除. 
5. 4.5 显式报错: 正常模式下, 对一个对象的只读属性进行赋值, 不会报错, 只会默默地失败. 严格模式下, 将报错. 严格模式下, 对一个使用getter方法读取的属性进行赋值, 会报错. 
6. 重名错误
   1. 对象不能有重名的属性
   2. 函数不能有重名的参数
7. 禁止八进制表示法
8. arguments对象的限制
   1. 不允许对arguments赋值
   2. arguments不再追踪参数的变化
   3. 禁止使用arguments.callee
9. 函数必须声明在顶层
10.  保留字
