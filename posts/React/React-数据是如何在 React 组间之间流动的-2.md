## 数据是如何在 React 组间之间流动的？（下）

#### 使用 Context API 维护全局状态
- `Context API` 是 `React`官方提供的一种组件树全局通信的方式
- 从 `v16.3.0`开始, `React`对`Context API` 进行了改进, 新的 `Context API`具备更强的可用性

#### 图解 Context API 工作流
- `Context API` 有3个关键的要素: `React.createContext`, `Provider`, `Consumer`
- 调用`Context API`创建出一组`Provider`, `Provider`作为数据的提供方, 可以将数据下发给自身组件树中任意层级的`Consumer`
  
<img src="./React-data-contextAPI.png" height="500px"/>

- `Consumer`不仅能够读取到`Provider`下发的数据,还能读取到这些数据后续的更新 ==> 数据在`provider`和`consumer`之间能够及时同步


#### Context API  code
- `React.createContext` 创建一个 `context`对象
```js
const AppContext = React.createContext()
// 可以选择性的传入一个 defaultValue
const AppContext = React.createContext(defaultValue)
// 从创建出的 context 对象中读取到 Provider 和 Consumer
const {Provider, Consumer} = AppContext
```

- `Provider`: 数据的提供者, 使用 `Provider组件`对组件树中的跟组件进行包裹,然后传入`value`的属性, 这个`value`就是后续在组件中流动的数据,可以被`Consumer`消费
```js
<Provider value={title: this.state.title, content: this.state.content}>
    <Title />
    <Content />
</Provider>
```

- `Consumer`: 数据的消费者, 读取`Provider`下发下来的数据
- `Consumer` 需要接受一个函数作为子元素, 这个函数需要返回也给组件
```js
<Consumer>
    {value => <div>{value.title}</div>}
</Consumer>
```
- 当`Consumer`没有对应的 `Provider`时, `value`参数会直接取 创建 `context`时传递给 `createContext`的`defaultValue`


#### 新的 Context API 解决了什么问题
- `过时的Context API` 示例
```js
import PropTypes from 'prop-types'
class Button extends React.Component {
  render() {
    return (
      <button style={{background: this.context.color}}>
        {this.props.children}
      </button>
    );
  }
}

Button.contextTypes = {
  color: PropTypes.string
}

class Message extends React.Component {
  render() {
    return (
      <div>
        {this.props.text} <Button>Delete</Button>
      </div>
    );
  }
}

class MessageList extends React.Component {
  getChildContext() {
    return {color: "purple"};
  }
  render() {
    const children = this.props.messages.map((message) =>
      <Message text={message.text} />
    );
    return <div>{children}</div>;
  }
}

MessageList.childContextTypes = {
  color: PropTypes.string
};
```
<img src="./React-data-contextAPI-old.png" height="500px">

- 首先, 通过给 `MessageList` 设置 `childContextTypes` 和 `getChildContext`, 可以使其承担起 `context` 的生产者的角色
- 然后, `MessageList` 的组件树内部所有层级的组件都可以通过定义 `contextTypes` 来成为数据的消费者, 进而通过 `this.context` 访问到 `MessageList` 提供的数据.

#### 过时的ContextAPI的问题
- 1. 代码不够优雅,不够直观: 你很难迅速辨别出谁是 `Provider` 谁是 `Consumer`
- 2. 旧的Context 无法做到 ===>  `Cosumer` 不仅能够读取到 `Provider` 下发的数据, 还能够读取到这些数据后续的更新. 数据在生产者和消费者之间的及时同步, 这一点对于 Context 这种模式来说是至关重要的, 但旧的 Conext API 无法保证这一点:
```bash
# 如果组件提供的一个Context发生了变化, 而中间父组件的 shouldComponentUpdate 返回 false, 
# 那么使用到该值的后代组件不会进行更新.使用了 Context 的组件则完全失控, 所以基本上没有办法能够可靠的更新 Context.
```
- 新的 `ContextAPI` 改进了这一点,`即便组件的 shouldComponentUpdatefalse, 它仍然可以"穿透"组件向后后代组件进行传播,进而确保了数据Provider和数据Consumer之间数据的一致性`
- 新的 `ContextAPI` 在编码层面上更独立, 编译理解和维护


#### 第三方数据流框架 - Redux
- 简单的跨层级组件通信, 使用`发布-订阅模式`或者`ContextAPI` 可以解决
- 对于复杂组件间的关系, 需要借助`Redux` 管理状态

##### 什么是 Redux
- `Redux`是`JavaScript`状态容器,提供可预测的状态管理
- `Redux`是为`JavaScript`应用而生的,也就是说它不是`React`的专利, `React` 可以使用,`Vue` 可以使用, `原生JS`也可以使用
- `Redux`是一个状态容器: `存放公共数据的仓库`

<img src="./React-Redux-overview.png" height="400px">

##### Redux是如何管理数据的?
- `Redux`分为三部分
- 1. `store`: 组件群里的群文件, 单一的数据源,而且是只读的
- 2. `reducer`: 一个函数, 负责`对变化进行分发和处理`,最终将新的数据返回给`store`
- 3. `action`: 对变化的描述
```js
const action = {
  type: "ADD_ITEM",
  payload: '<li>text</li>'
}
```

- `redux`的工作流: <font color="#ff0000">在Redux的整个过程中, 数据流是严格单向的</font>
  
<img src="./React-Redux-data-flow.png" height="400px">

- 对于一个 `React` 应用来说, 视图`View`层面的所有数据`State`都来自`Store` ====> 单一数据源的原则
- 修改数据: `dispatch action` => `commit reducer` => `update store`
- 对于组件来说, 任何组件都可以通过约定的方式从`store`读取到全局的状态,任何组件也都可以通过合理的`派发action`来修改全局的状态
- `Redux通过提供一个统一的状态容器, 使得数据能够资源而有序的在任意组件之间穿梭` ==> `Redux`实现组件通信的思路


##### Redux code
- 1. 使用 `createStore` 来完成 `store`对象的创建
```js
// 引入redux
import { createStore } from 'redux'
// `createStore`是一切的开始,接受3个入参`reducer`,`初始状态内容`,`指定中间件`
const store = createStore({
    reducer,
    initial_state,
    applyMiddleware(middleware1,middleware2)
})
```
- 2. `reducer` 的作用将 新的 `state` 返回给 `store`: 一个`reducer`一定是一个纯函数, 可以有各种各样的内在逻辑, 但最终要返回一个 `state`
```js
const reducer = (state,action) => {
    // 此处是逻辑
    return new_state
}
// 当我们基于某个 reducer 去创建 store 的时候，其实就是给这个 store 指定了一套更新规则
```
- 3. `action`的作用是通知`reducer` => `让改变发生`: 要想让`state`发生改变，就必须用正确的`action`来驱动这个改变
```js
const action = {
    type: 'ADD_ITEM',
    payload: '<div>text</div>'
}
//  action 对象中允许传入的属性有多个，但只有 type 是必传的
//  type 是 action 的唯一标识
//  reducer正是通过不同的type来识别出需要更新的不同的staet
```
- 4. 派发`action`,使用`dispatch`: `action`本身只是一个对象, 要让`reducer`感知到`action`,需要`store.dispatch(action)`

<img src="./React-Redux-data-flow-.png" height="400px">