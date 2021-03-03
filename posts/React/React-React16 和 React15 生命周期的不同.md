## React16 为什么要更改生命周期?

### ⭐⭐⭐ React15 生命周期
- `constructor()` => `componentWillReceiveProps()` => `shouldComponentUpdate()` => `componentWillMount` => `componentWillUpdate()` => `componentDidUpdate()` => `componentDidMount()` => `render()` => `componentWillUnmount` 

![image](https://user-images.githubusercontent.com/13994442/101444006-8e777c80-3959-11eb-885c-ebe29354ccbf.png)

#### Mounting 挂载阶段
1. `constructor()` => 该方法仅仅在挂载的时候被调用一次. 初始化 `this.state`
2. `componentWillMount()` =>  仅仅在挂载的时候被调用一次.
3. `render()` => 它的职能仅仅是把需要渲染的内容返回出来。 真实的DOM渲染操作,在挂载阶段由`ReactDOM.render`来承接
4. `componentDidMount()` => 仅仅在挂载的时候被调用一次.(真实DOM已经挂载到页面了,我们可以在这个生命周期做真实的DOM操作, 异步请求,数据初始化也可以放在这个生命周期来做.)

#### 生命周期 - Updating 更新阶段
- 组件的更新分为两种: 一种是由父组件更新触发的更新; 另一种是组件自身调用自己的`setState`触发的更新. 这两种更新对应的生命周期流程如下:
- `componentWillReceiveProps(nextProps)` 父组件触发的更新和组件自身的更新相比, 多了这个生命周期方法, `nextProps`表示接收到的新的`props`内容
- `componentWillReceiveProps`是组件在`props`内容发生了变化时被触发的. <font color="#FF00000">这种说法不够严谨</font>
- React官方: 如果父组件导致组件重新渲染,即使 props 没有更改, 也会调用 `componentReceiveProps`生命周期函数, 如果指向处理更改,请确保进行当前值与变更至的比较.
- 所以  <font color="#FF00000"> `componentReceiveProps` 并不是由 `props` 的变化触发的,而是由父组件的更新触发的.</font>
- `componentWillUpdate` 和 `componentDidUpdate`: `componentWillUpdate`会在render前触发,它和`componentWillMount`类似, 允许在里面做一些不涉及真实DOM操作的准备工作. 而`componentDidUpdate`则在组件更新完毕后被触发, 和 `componentDidMount`类似, 这个生命周期函数也经常被用来处理DOM操作. 此外, 我们也常常将`componentDidUpdate`的执行作为子组件更新完毕的标志通知到父组件

#### 生命周期 - Unmounting 卸载阶段
- 执行一个生命周期方法被触发 `componentWillUnmount()`


### ⭐⭐⭐ React16 生命周期
![image](https://user-images.githubusercontent.com/13994442/101445223-11013b80-395c-11eb-8119-6cb1309e421d.png)

#### 挂载阶段
![image](https://user-images.githubusercontent.com/13994442/101445436-71907880-395c-11eb-8632-a5c7fbed77ad.png)

- 执行 `constructor`函数, 可以初始化`state`, 可以改变函数的`this`指向
- `constructor`函数执行结束, 执行`getDerivedStateFromProps`生命周期函数(如果当前组件的状态取决于父组件的状态)
- `getDerivedStateFromProps(params1,params2)`有 `2` 个参数, 第`1`个参数通过`props`传递过来的父组件的 `state`,第`2`个参数是当前组件的`state`,我们可以根据这个2个参数决定要不要更新当前组件的state, 如果不需要更新`return null`, 如果需要更新`return new {}`
- `getDerivedStateFromProps`函数执行接收后, 执行`render`方法
- `render`方法执行结束, 执行`componentDidMount`方法 ======> 当前组件挂载完成
- <font color="#ff0000">废弃 componentWillMount</font>
- <font color="#00ff00">新增 getDerivedStateFromProps</font>

- `💛💛💛💛 getDerivedStateFromProps 💛💛💛💛`
- `getDerivedStateFromProps` 不是 `componentWillMount` 的替代品
- `getDerivedStateFromProps` 试图替换掉的是 `componentWillReceiveProps`,有且只有一个用途: 使用 `props` 来派生/更新 `state`
```js
static getDerivedStateFromProps(props, state)
```
- 1. `getDerivedStateFromProps` 是一个静态方法. 静态方法不依赖组件的实例而存在,因此在其内部无法访问 `this` 属性
- 2. 该方法接收两个参数: `props` 和 `state`, 他们分别代表当前接收到的`父组件的props`和`自身的state`
- 3. `getDerivedStateFromProps`需要一个对象格式的返回值.
- `getDerivedStateFromProps`的返回值不可或缺, 是因为 `React`需要用这个返回值来更新(派生)`组件的state`,因此当我们确实不存`使用props派生State`这个需求的时候,最好直接省略掉这个生命周期
- `getDerivedStateFromProps`方法对`state`的更新动作并非`覆盖`式的更新,而是针对某个属性的定向更新. 如果`state`中有这个属性就更新,如果没有这个属性直接在`state`里新增,原属性与新属性共存

#### 更新阶段(`Updating`)

![image](https://user-images.githubusercontent.com/13994442/101445759-0bf0bc00-395d-11eb-9aa2-dab77338969a.png)


- `React16.4`的挂载和更新流程与`React16.3`保持一致.差异在于`更新流程上`
- `React16.4`中任何因素触发的组件更新流程,都会触发`getDerivedStateFromProps`
- `React16.3`中,只有父组件的更新才会触发该声明周期

- 当组件中的数据发生更新之后, 执行`getDerivedStateFromProps`函数, 这个函数的功能是替换之前版本的~~ `componentWillReceiveProps` ~~这个生命周期函数
- 当`getDerivedStateFromProps`执行结束后,开始执行`shouldComponentUpdate`函数
- `shouldComponentUpdate`函数需要返回一个✅ `true` 或者 ❌ `false`,
- ❌ `return false` => 停止更新组件
- ✅ `return true` => 执行`render`方法,重新渲染组件. `render`方法执行结束后会执行`getSnapshotBeforeUpdate`生命周期函数


#### 为什么要用 getDerivedStateFromProps 代替 componentWillReceiveProps？
- 官方: 与`componentDidUpdate`一起, 这个新的生命周期涵盖过时`componentWillReceiveProps`的所有用例.
- 1. `getDerivedStateFromProps` 是作为一个试图代替 `componentWillReceiveProps` 的 API 而出现的；
- 2. `getDerivedStateFromProps` 不能完全和 `componentWillReceiveProps` 画等号,其特性决定了我们曾经在 `componentWillReceiveProps` 里面做的事情,不能够百分百迁移到 `getDerivedStateFromProps` 里.
- 3. `getDerivedStateFromProps` 这个 API,它相对于早期的 `componentWillReceiveProps` 来说,正是做了“合理的减法”.而做这个减法的决心之强烈,从 `getDerivedStateFromProps` 直接被定义为 `static` 方法这件事上就可见一斑—— `static` 方法内部拿不到组件实例的 `this`,这就导致你无法在 `getDerivedStateFromProps` 里面做任何类似于 ·、不合理的 `this.setState`（会导致死循环的那种）这类可能会产生副作用的操作
- 💛💛💛💛 =====> 原则： `React 16 在强制推行“只用 getDerivedStateFromProps 来完成 props 到 state 的映射”这一最佳实践`


#### 消失的 componentWillMount 与新增的 getSnapshotBeforeUpdate
- `getSnapshotBeforeUpdate` 方法会在 `render` 之后,组件完成更新(`componentDidiUpdate`)之前执行, 用于执行某种逻辑或计算, 返回值可以在 `componentDidiUpdate` 方法中的第3个参数中获取,(我们可以同时获取到更新前的真实 DOM 和更新前后的 state&props 信息), 就是说在组件更新之后拿到这个值再去做其他的事情
```js
// 组件更新时调用
getSnapshotBeforeUpdate(prevProps, prevState) {
  console.log("getSnapshotBeforeUpdate方法执行");
  return "haha";
}
// 组件更新后调用
componentDidUpdate(nextProps, nextState, valueFromSnapshot) {
  console.log("componentDidUpdate方法执行");
  console.log("从 getSnapshotBeforeUpdate 获取到的值是", valueFromSnapshot);
}
```
- <font color="#FF00000">getSnapshotBeforeUpdate 配合 componentDidUpdate 使用 替代 componentWillUpdate的所有用例</font>
- <font color="pink">getSnapshotBeforeUpdate 要想发挥作用,离不开 componentDidUpdate 的配合</font>


####  卸载阶段(`Unmounting`)
- 调用`componentWillUnmount`生命周期函数,表示此组件将被卸载,清理一些事件,清理ref等操作


#### 细说生命周期“废旧立新”背后的思考
在 `Fiber` 机制下, `render` 阶段是允许暂停、终止和重启的.当一个任务执行到一半被打断后,下一次渲染线程抢回主动权时,这个任务被重启的形式是“重复执行一遍整个任务”而非 `接着上次执行到的那行代码往下走`.这就导致 `render` 阶段的生命周期都是有可能被重复执行的.

被 `React16` 废弃的3个生命周期
- `componentWillMount`
- `componentWillUpdate`
- `componentWillReceiveProps`
- 这些生命周期的共性, 就是它们都处于 render 阶段, 都可能重复被执行, 而且由于这些 API 常年被滥用, 它们在重复执行的过程中都存在着不可小觑的风险.