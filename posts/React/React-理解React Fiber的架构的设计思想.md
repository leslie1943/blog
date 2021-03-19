## 如何理解 Fiber 架构的迭代动机与设计思想

#### 前置知识: 单线程的 JavaScript 与多线程的浏览器
- `JavaScript 是单线程的, 浏览器是多线程的`
- 对于多线程的浏览器来说, 它除了要处理 `JavaScript` 线程以外, 还需要处理包括事件系统、定时器/延时器、网络请求等各种各样的任务线程, 这其中, 自然也包括负责处理 `DOM` 的UI 渲染线程.`而JavaScript` 线程是可以操作 `DOM` 的.
- 这意味着什么呢? 试想如果渲染线程和 `JavaScript` 线程同时在工作, 那么渲染结果必然是难以预测的: 比如渲染线程刚绘制好的画面, 可能转头就会被一段 `JavaScript` 给改得面目全非. `这就决定了JavaScript 线程 和 渲染线程必须是互斥的`: 这两个线程不能够穿插执行, 必须串行.当其中一个线程执行时, 另一个线程只能挂起等待.
```
具有相似特征的还有事件线程, 浏览器的 `Event-Loop` 机制决定了事件任务是由一个异步队列来维持的. 当事件被触发时, 对应的任务不会立刻被执行, 而是由事件线程把它添加到任务队列的末尾, 等待 `JavaScript` 的同步代码执行完毕后, 在空闲的时间里执行出队
```
- 在这样的机制下, 若 `JavaScript` 线程长时间地占用了主线程, 那么渲染层面的更新就不得不长时间地等待, 界面长时间不更新, 带给用户的体验就是所谓的 "卡顿" 

#### 为什么会产生 "卡顿" 这样的困局?
- `Stack Reconciler`带来的一个无解的问题正是`JavaScript对主线程的超时占用问题`, 其产生的原因就是`Stack Reconciler`是一个`同步递归的过程`.
  
<img src="https://github.com/leslie1943/blog/blob/master/images/react/React-Fiber-1.png?raw=true" height="400px">

- 在 `React 15` 及之前的版本中, 虚拟 `DOM` 树的数据结构载体是计算机科学中的` "树"` , 其 `Diff` 算法的遍历思路, 也是沿袭了传统计算机科学中 `"对比两棵树"` 的算法, 在此基础上优化得来. 因此从本质上来说, 栈调和机制下的 Diff 算法, 其实是树的深度优先遍历的过程. 而树的深度优先遍历, 总是和递归脱不了关系. 
- 拿上图举例, 如果 `A 组件`发生了更新, 那么栈调和的工作过程如下
```bash
    # 1: 对比第一层的两个A, 确认节点可复用, 继续Diff其子组件的 B,C
    # 2: 确认节点可复用, 继续 Diff 其子组件 D, E, F
    # 3: 调和器会重复这个 父组件调用子组件 的过程
    # 4: 直到最深的一层节点更新完毕, 才慢慢向上返回
    # 当整棵树遍历完成后, reconciler 才能给出需要修改的DOM信息, 再交由 renderer来执行渲染
```
- 这个过程的致命性在于它是同步的, 不可以被打断.当处理结构相对复杂, 体量相对庞大的`虚拟DOM树`时, `Stack Reconciler`需要的调和时间会很长, 这就意味着 `JavaScript`线程将长时间地占用主线程,进而导致上文描述中的`卡顿, 卡死`,`交互长时间无响应`等问题


#### 设计思想：Fiber 是如何解决问题的
- 什么是`Fiber`: 在计算机科学里, 我们有进程,线程的之分, 而`Fiber 就是比线程还要更纤细的一个过程`, `Fiber`的出现, 意在对渲染过程实现更加精细的控制
- `Fiber`是一个多义词, 
- 从架构的角度来看,`Fiber` 是对 `React` 核心算法(调和过程)的重写
- 从编码的角度来看,`Fiber` 是对 `React` 内部所定义的一种数据结构, 它是 `Fiber`树结构的节点单物,也就是 React 16 新架构下的 "虚拟 DOM" 
- 从工作流的角度来看, `Fiber` 节点保存了组件需要更新的状态和副作用, 一个 `Fiber` 同时也对应着一个工作单元. 
- Fiber 架构的应用目的, 按照 React 官方的说法, 是实现 "增量渲染" . 所谓 "增量渲染" , 通俗来说就是把一个渲染任务分解为多个渲染任务, 而后将其分散到多个帧里面. 不过严格来说, 增量渲染其实也只是一种手段, `实现增量渲染的目的, 是为了实现任务的可中断, 可恢复, 并给不同的任务赋予不同的优先级,最终达成更加顺滑的用户体验`


#### Fiber 架构核心： "可中断"  "可恢复" 与 "优先级" 
- `React 16` 之前, React的渲染和更新阶段一来的是 下面两层架构

<img src="https://github.com/leslie1943/blog/blob/master/images/react/React-Fiber-2.png?raw=true" height="400px">

- `Reconciler` 这一层负责对比出新老虚拟 `DOM` 之间的变化, `Renderer` 这一层负责将变化的部分应用到视图上, 从 `Reconciler` 到 `Renderer` 这个过程是严格同步的

- 而在 `React 16` 中, 为了实现`"可中断"`和`"优先级"`, 两层架构变成了如下图所示的三层架构:

<img src="https://github.com/leslie1943/blog/blob/master/images/react/React-Fiber-3.png?raw=true" height="400px">

- 多出来的这层架构, 叫作"`Scheduler(调度器)`", 调度器的作用是调度更新的优先级
- 在这套架构的模式下, 更新的处理工作流变成了这样
```bash
    # 每个任务都会被赋予一个优先级, 当更新任务抵达调度器时,优先级高的更新任务(A),会被更快得调度进 Reconciler 层; 此时若有新的更新任务(B)抵达调度器, 调度器会检查它的优先级, 如果B的优先级高于当前任务A, 那么当前处于 Reconciler 层的 任务A就会被中断, 调度器会将B任务推入 Reconciler层. 当B任务完成渲染后, 新的一轮调度开始, 之前被中断的 A 任务将会被重新推入 Reconciler 层, 并继续它的渲染之旅, 这便是所谓的 可恢复

    # 以上, 便是架构层面对 "可中断" "可恢复"与 "优先级"三个核心概念的处理
```

#### Fiber 架构对生命周期的影响

<img src="https://github.com/leslie1943/blog/blob/master/images/react/React-16-lifecycle.png?raw=true">

```bash
    # render 阶段：纯净且没有副作用, 可能会被 React 暂停、终止或重新启动. 
    # pre-commit 阶段：可以读取 DOM. 
    # commit 阶段：可以使用 DOM, 运行副作用, 安排更新. 
```
- 其中 `pre-commit` 和 `commit`从大阶段上来看都是`commit`阶段
- 在 `render`阶段, React主要是在内存中做计算, 明确 DOM 树 的更新点, 而`commit`阶段,则负责把`render`阶段生成的更新真正的执行掉

- `React 15` 从 `render` 到 `commit`的过程

<img src="https://github.com/leslie1943/blog/blob/master/images/react/React-Fiber-4.png?raw=true" height="400px">

- `React 16` 从 `render` 到 `commit`的过程

<img src="https://github.com/leslie1943/blog/blob/master/images/react/React-Fiber-5.png?raw=true" height="400px">

- 可以看出, 新老两种架构对 `React` 生命周期的影响主要在 `render` 这个阶段, 这个影响是通过增加 `Scheduler` 层和改写 `Reconciler` 层来实现的. 
- 在 `render` 阶段, 一个庞大的更新任务被分解为了一个个的工作单元, 这些工作单元有着不同的优先级, `React` 可以根据优先级的高低去实现工作单元的打断和恢复. 由于 `render` 阶段的操作对用户来说其实是 `"不可见"`的, 所以就算打断再重启, 对用户来说也是 `0` 感知. 但是, `工作单元（也就是任务）的重启将会伴随着对部分生命周期的重复执行`:
```bash
    # componentWillMount
    # componentWillUpdate
    # shouldComponentUpdate
    # componentWillReceiveProps
```
- 其中 `shouldComponentUpdate` 的作用是通过返回 `true` 或者 `false`, 来帮助我们判断更新的必要性, 一般在这个函数中不会进行副作用操作, 因此风险不大
- 而 `"componentWill"` 开头的三个生命周期，则常年被开发者以各种各样的姿势滥用，是副作用的"重灾区", 所以在 React 16 中重写了 生命周期.


#### 总结
了解 `React 16` 中 `Fiber` 架构的架构分层和宏观视角下的工作流