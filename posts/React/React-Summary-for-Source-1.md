#### 真实DOM 操作问题
- `真实DOM`的更新远远超过其必须进行的更新, 因为`真实DOM`中的属性多达几百个.

#### 什么是Virtual DOM
- `Virtual DOM`就是`JavaScript`对象, 用 `JavaScript`对象 描述`真实DOM`信息(属性,子节点)
- `Virtual DOM`可以理解成DOM对象的副本

#### Virtual DOM 如何提升效率
- 精准找出发生变化的DOM对象, 只更新发生变化的部分
- 在 `React` 第一次 创建 `DOM` 对象后, 会为每个 `DOM` 对象创建其对应的 `Virtual DOM` 对象, 在DOM对象发生更新之前,`React` 会先更新所有的`Virtual DOM` 对象, 然后 `React`会将更新后的 `Virtual DOM` 对象 和 更新前的 `Virtual DOM` 进行比较, 从而找出发生变化的部分, `React` 会将发生变化的部分更新到真实的 DOM 对象中. `React`仅更新必要更新的部分, 不会重新渲染整个 `DOM Tree`
- `Virtual DOM` 对象的更正和比较发生在内存中，不会在视图中渲染任何内容，所以这一部分的性能损耗成本是微不足道的.


#### 创建 Virtual DOM
- 1. html 定义 根节点
- 2. 定义 开放给框架外部的 `createElemenet` 函数, 将 `JSX` 转换成 `VirtualDOM对象`
- 3. 定义 开放给框架外部的 `render` 函数: `VirtualDOM对象` 转换成 `真实DOM对象`
- 4. `render(virtualDOM, container, oldDOM)` -> `diff(virtualDOM, container, oldDOM)` -> `mountElement(virtualDOM, container)` -> `mountNativeElement(virtualDOM, container)` -> `createDomElement(VirtualDOM)`
- 5. `createDomElement` 创建节点( `newElement` ),  vituralDOM的children 递归调用 `mountElement()` . 将创建好的 `newElement` 返回给`mountNativeElement` ,然后append到 `container` 中

#### 函数组件
- 组件的 `VirtualDOM`类型值为函数,函数组件合类组件都是这样的.
```jsx
// 原始组件
const Heart = () => <span>&hearts;</span>
// 调用
<Heart />
// 转换后
{
    type: f function(){}, // 类型为函数
    props:{},
    children: []
}
```

#### JSX 转换过程
- `jsx` 是 `React.createElement` 的语法糖

```html
<!-- JSX -->
<div className="app">
  <div class="title"> I am Title </div>
  <div class="content"> I am content </div>
</div>
```

- `convert to below codes`
```js
// React.createElement
"use strict";

/*#__PURE__*/
React.createElement("div", {
  className: "app"
}, /*#__PURE__*/React.createElement("div", {
  class: "title"
}, " I am Title "), /*#__PURE__*/React.createElement("div", {
  class: "content"
}, " 
```
- `React.createElement()`返回值就是`Virtual DOM`
- 1. 我们写的 `JSX` 先被 `Babel` 转换为 `React.createElement()` 的调用, 
- 2. 调用后会返回 `ReactElement`类型的 `Virtual DOM`对象, 
- 3. 然后 `React`再将`Virtual DOM` 对象转换成 `真实DOM`
- 4. 再将 `真实DOM` 对象显示在页面上



## Q2. 为什么 React 16 版本中 render 阶段放弃了使用递归
- 在 `React 15` 的版本中, 采用了循环加递归的方式进行了 `virtualDOM` 的比对, 由于递归使用 `JavaScript` 自身的执行栈, 一旦开始就无法停止, 直到任务执行完成. 如果 `VirtualDOM` 树的层级比较深, `virtualDOM` 的比对就会长期占用 `JavaScript` 主线程, 由于 `JavaScript` 又是单线程的无法同时执行其他任务, 所以在比对的过程中无法响应用户操作, 无法即时执行元素动画, 造成了页面卡顿的现象. 
- 在 `React 16` 的版本中, 放弃了 `JavaScript` 递归的方式进行 `virtualDOM` 的比对, 而是采用循环模拟递归. 而且比对的过程是利用浏览器的空闲时间完成的, 不会长期占用主线程, 这就解决了 `virtualDOM` 比对造成页面卡顿的问题. 
- 在 `window` 对象中提供了 `requestIdleCallback API`, 它可以利用浏览器的空闲时间执行任务, 但是它自身也存在一些问题, 比如说并不是所有的浏览器都支持它, 而且它的触发频率也不是很稳定, 所以 `React` 最终放弃了 `requestIdleCallback` 的使用. 
- 在 `React` 中, 官方实现了自己的任务调度库, 这个库就叫做 `Scheduler`. 它也可以实现在浏览器空闲时执行任务, 而且还可以设置任务的优先级, 高优先级任务先执行, 低优先级任务后执行. 


## Q3. 请简述 React 16 版本中 commit 阶段的三个子阶段分别做了什么事情
- 阶段1: 执行`commitBeforeMutationEffects` 来 `调用类组件的 getSnapshotBeforeUpdate 生命周期函数`
- 阶段2: 执行`commitMutationEffects` 然后 `根据effectTag执行 DOM 操作` => 执行 (`插入`, `插入+更新`, `服务器端渲染`, `更新`, `删除`) 操作
- 阶段3: 执行`commitLayoutEffects`,调用`类组件的生命周期函数` 和 `函数组件的钩子函数`, 完成更新

## Q4. 请简述 workInProgress Fiber 树存在的意义是什么
- 使用 `alternate` 存储 `current`  => `workInProgress.alternate = current`
- 使用 `alternate` 存储 `workInProgress` => `current.alternate = workInProgress`
- 在内存中完成差异比较和更新, 将结果返回传递给 `commit` 阶段执行, 更快的完成页面渲染

##### C2: 创建 React 元素
- 每一段JSX都会被Babel转换成React.createElement()的调用 ===> React 元素
```js
function f(type, config, children, other1, other2){
    let props = {}
    const childrenLength = arguments.length - 2 // 从第3个参数开始
     if (childrenLength === 1) {
        props.children = children;
    } else if (childrenLength > 1) {
        const childArray = Array(childrenLength);
        for (let i = 0; i < childrenLength; i++) {
            childArray[i] = arguments[i + 2];
        }
        props.children = childArray;
    }
}
```

##### C3: React 架构
- 使用 `Fiber Reconciler`  替代了 `Stack Reconciler` 方案
- `Fiber Reconciler`: 调度层(`Scheduler`), 协调层(`Reconciler`), 渲染层(`Renderer`)
- 调度层(`Scheduler`): 调度任务的优先级,高优先级任务优先进入协调器
- 协调层(`Reconciler`): 构建 `Fiber`对象,找出差异,记录`Fiber`对象要进行的DOM操作
- 渲染层(`Renderer`): 负责将发生变化的部分渲染到页面上

#### Fiber Scheduler
- 在 `React 15` 的版本中, 采用了循环加递归的方式进行了 `virtualDOM` 的比对, 由于递归使用 `JavaScript` 自身的执行栈, 一旦开始就无法停止, 直到任务执行完成. 如果 `VirtualDOM` 树的层级比较深, `virtualDOM` 的比对就会长期占用 `JavaScript` 主线程, 由于 `JavaScript` 又是单线程的无法同时执行其他任务, 所以在比对的过程中无法响应用户操作, 无法即时执行元素动画, 造成了页面卡顿的现象. 
- 在 `React 16` 的版本中, 放弃了 `JavaScript` 递归的方式进行 `virtualDOM` 的比对, 而是采用循环模拟递归. 而且比对的过程是利用浏览器的空闲时间完成的, 不会长期占用主线程, 这就解决了 `virtualDOM` 比对造成页面卡顿的问题. 
- 在 `window` 对象中提供了 `requestIdleCallback API`, 它可以利用浏览器的空闲时间执行任务, 但是它自身也存在一些问题, 比如说并不是所有的浏览器都支持它, 而且它的触发频率也不是很稳定, 所以 `React` 最终放弃了 `requestIdleCallback` 的使用. 
- 在 `React` 中, 官方实现了自己的任务调度库, 这个库就叫做 `Scheduler`. 它也可以实现在浏览器空闲时执行任务, 而且还可以设置任务的优先级, 高优先级任务先执行, 低优先级任务后执行. 

#### Fiber Reconciler
- 在 `React 15` 的版本中, 协调器和渲染器交替执行, 即找到了差异就直接更新差异.
- 在 `React 16` 的版本中, 这种情况发生了变化, 协调器和渲染器不再交替执行.协调器负责找出差异, 在所有差异找出之后, 统一交给渲染器进行 DOM 的更新.也就是说协调器的主要任务就是找出差异部分, 并为差异打上标记.

#### Fiber Renderer 
- 渲染器根据协调器为 `Fiber` 节点打的标记, 同步执行对应的`DOM`操作.
- 既然比对的过程从递归变成了可以中断的循环, 那么 `React` 是如何解决中断更新时 `DOM` 渲染不完全的问题呢？
- 其实根本就不存在这个问题, 因为在整个过程中, 调度器和协调器的工作是在内存中完成的是可以被打断的, 渲染器的工作被设定成不可以被打断, 所以不存在DOM 渲染不完全的问题.


#### Fiber 的数据结构
- 由 `VirtualDOM` 演变而来
```js
type Fiber = {
    /***************** 🚀🚀 DOM 实例 相关 🚀🚀 *********************/
    // 标记不同的组件类型: 0-22
    tag: WorkTag,
    
    // 组件类型: div, span, 组件构造函数
    type: any,

    // 实例对象, 如类组件的实例, 原生dom实例, 而function组件没有实例, 因此该属性为空
    stateNode: any,

    /***************** 🚀🚀 构建Fiber 相关 🚀🚀 *********************/
    // 指向自己的父级 Fiber 对象
    return: Fiber | null,
    // 指向自己的第一个子级 Fiber 对象
    child: Fiber | null,
    // 指向自己的下一个兄弟 Fiber对象
    sibling: Fiber| null,

    // 在Fiber树更新的过程中, 每个Fiber都会有一个跟其对应的Fiber
    // 我们称它为 current <<======>> workInProgress
    // 在渲染完成之后他们会交换位置
    // alternate 指向当前Fiber在workInProgress树中对应的Fiber

    /***************** 🚀🚀 状态数据 相关 🚀🚀 *********************/
    // 即将更新的 props
    pendingProps: any,
    // 旧的 props
    memoizedProps: any,
    // 旧的 state
    memorizedState: any,

    /***************** 🚀🚀 副作用 相关 🚀🚀 *********************/
    // 该 Fiber 对应的组件产生的状态更新会存放在这个队列里面
    updateQueue: UpdateQueue<any> | null,
    // 用来记录当前 Fiber要执行的 DOM 操作
    effectTag: SideEffectTag,
    // 子树中第一个 side effect
    firstEffect: Fiber | null,
    // 单链表用来快速查找下一个 side effect
    nextEffect: Fiber | null,
    // 子树中最后一个 side effect
    lastEffect: Fiber | null,
    // 任务的过期时间
    expirationTime: ExpirationTime,
    // 当前组件及子组件处于何种渲染模式
    mode: TypeOfMode
}
```