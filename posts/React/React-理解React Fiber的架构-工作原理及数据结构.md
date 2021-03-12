#### 核心问题
- 递归无法中断, 执行重任务耗时长, JS是单线程, 无法同时执行其他任务, 导致任务延迟页面卡顿, 用户体验差

#### what is react fiber? why react fiber?
- `React 15`的问题: 如果页面元素很多,且需要频繁刷新的场景下.`React 15`会出现掉帧的现象. `产生原因`: 大量的同步计算任务阻塞了浏览器的UI渲染. 默认情况下,`JS运算页面布局`和`页面绘制`都是运行在浏览器的`主线程`当中, 他们之间是互斥的关系. 如果JS计算持续占用主线程,页面就没办法得到及时的更新. 当我们调用`setState`更新页面的时候. React会遍历应用的所有节点,计算出差异, 然后再更新UI. 整个过程是一气呵成,不能被打断的. 如果页面元素很多,整个过程占用的时机就可能超过<font color="#FF0000">16</font>毫秒, 就容易出现掉帧的情况.
- `如何解决掉帧的问题`: 解决主线程时间被JS运算占用着这一问题的基本思路,将运算切割未多个步骤,分批完成. 也就是说在完成一部分任务之后, 将控制权交回给浏览器, 让浏览器有时间进行页面的渲染. 等浏览器忙会之后, 再继续之前未完成的任务. ====> `旧版React`通过`递归+循环`的方式进行渲染, 使用的是JS引擎自身的函数调用栈,它会一直执行到栈为空为止. 而`Fiber`实现了自己的组件调用栈, 它以链表的形式遍历组件树,可以灵活的暂停, 继续和丢弃执行的任务. 实现方式是使用了浏览器的`requestIdleCallback`这个API, 官方的解释如下
```
window.requestIdleCallback()会在浏览器空闲时期依次调用函数,这就可以让开发者在主事件循环中执行后台或低优先级的任务, 而且不会对像动画和用户交互这些延迟触发但关键的事件产生影响. 函数一般会按先进先调用的顺序来执行. 除非函数在浏览器调用它之前就到了它的超时时间. 
```

#### 工作原理
- React框架内部的运作分为3层
- `Virtual DOM层`,描述页面长什么样.
- `Reconciler层`,负责调用组件生命周期方法, 运行`Diff`运算等
- `Renderer层`,根据不同的平台, 渲染相应的页面.比较常见的是 `ReactDOM`和`ReactNative`
- `Reconciler`层在`V16.xx`版本中进行了非常大的改动,取了个新名字`Fiber Reconciler`

#### 解决方案
- 利用浏览器空闲时间执行任务,拒绝长事件占用主线程
- 放弃递归只采用循环, 因为循环可被打断
- 任务拆分,将任务拆分成一个个小任务


#### 实现思路:
在`Fiber`方案重,为了实现任务的终止再继续,DOM比对算法被分成了两部分
- 1. `构建Fiber`: 可中断
- 2. `提交Commit`: 不可中断
- DOM 初始渲染: `VirtualDOM -> Fiber -> Fiber[] -> DOM`
- DOM 更新操作: `newFiber vs oldFiber -> Fiber[] -> DOM`


#### Fiber
- `Fiber`其实就是一种数据结构,用一个纯JS对象来表示
```js
const fiber = {
    type, // 节点类型
    props, // 节点属性
    stateNode, // 节点DOM对象 | 组件实例对象
    tag, // 节点标记(对具体类型的分类 hostRoot || hostComponent || classComponent || functionComponent)
    effects, // 数组, 存储需要更改的 fiber 对象
    effectTag, // 当前Fiber 要执行的操作 (新增, 删除, 修改)
    parent, // 当前Fiber的父级Fiber
    child, // 当前Fiber的子级Fiber
    sibling: // 当前Fiber的下一个兄弟Fiber
    alternate, // Fiber备份 fiber比对时使用.
}
```
- 为了加以区分,以前的`Reconciler` ====> `Stack Reconciler`,过程不能打断.一条道走到黑.
- 而`Fiber Reconciler`每执行一段时间,分段执行

#### Fiber Scheduler(调度器)
- 为了达到`Fiber Reconciler`的效果,需要一个调度器来进行任务分配和执行. 任务的优先级有六种:
- 1. `synchronous`,与在清华你的`Stack Reconciler`操作一样,同步执行
- 2. `task`,在`next tick`之前执行
- 3. `animation`,下一帧之前执行
- 4. `high`,在不久的将来立即执行
- 5. `low`,稍微延迟执行也没关系
- 6. `offscreen`,下一次`render`时或者`scroll`时才执行
- 优先级高的任务(键盘输入)可以打断优先级低的任务(Diff)的执行,从而更快的生效.

### Fiber Reconciler 执行过程
- `阶段1`, 生成`Fiber`树.得出需要更新的节点信息,这一步是一个渐进的过程,可以被打断.
- `阶段2`, 将需要更新的节点一次批量更新,这个过程补能被打断.
- 阶段1可被打断的特性, 让优先级更高的任务先执行,从框架层面大大降低了页面掉帧的概率.


#### Fiber Tree
- `Fiber Reconciler`在阶段一进行Diff计算的时候, 会生成一棵`Fiber Tree`, 这棵树是在`Virtual DOM`树的基础上增加额外的信息来生成的.它的本质是一个链表.


#### requestIdleCallback & 16ms
- 页面是一帧一帧绘制的,当每秒绘制的帧数达到60时, 页面就是流畅的, 小于这个值时, 用户会感觉到卡顿.
- `1 秒 60 帧`, 每一帧就是`1000/60 = 16ms`, 如果每一帧执行的时间小于`16ms`,说明浏览器有空余时间
- 如果任务在剩余的时间内没有完成则会停止任务执行, 继续优先执行主任务,也就是说`requestIdleCallback`总是利用浏览器的空余时间执行任务.
```js
requestIdleCallback(function(deadline){
    // deadline.timeRemaining()
})
``` 