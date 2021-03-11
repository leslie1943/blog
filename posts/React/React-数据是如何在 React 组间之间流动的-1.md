## 数据是如何在 React 组间之间流动的？（上）
- React的核心特征: `数据驱动视图`
```js
    UI = render(data)
    // 
    UI = f(data)
```

#### 基于 props 的单向数据流
- 组件: 从概念上类似于 `JavaScript`函数. 它接受任意的入参(`props`) 并返回用于描述页面展示内容的 React 元素.
- `单向数据流`: 当前组件的`state`以`props`的形式流动的时候,`只能流向组件树中比自己层级低的组件`. 比如在父子组件这种嵌套关系中, 只能由父组件传`props`给子组件,而不能反过来.

### 父-子 组件通信
- 父组件可以直接将`this.props`传入子组件, 实现父子间的通信
```js
// 子组件
function Child(props){
    return (
        <div className="child">
            <p>{`子组件所接收到的来自父组件的文本内容是：[${props.fatherText}]`}</p>
        </div>
    )
}
// 父组件
class Father extends React.Component {
    // 初始化父组件的 state
    state = {
        text: '初始化父组件的文本'
    }
    // 按钮的监听函数，用于更新 text 值
    changeText = () => {
        this.setState({
            text: '改变后的父组件文本'
        })
    }
    render(){
        return (
            <div className="father">
                <button onClick={this.changeText}>
                点击修改父组件传入子组件的文本
                </button>
                {/* 引入子组件，并通过 props 下发具体的状态值实现父-子通信 */}
                <Child fatherText={this.state.text} />
            </div>
        )
    }
}
```

#### 子-父组件通信
- 考虑到`props`是单向的,子组件并不能直接将自己的数据传递给父组件,但props的形式也是多样的. 假如父组件传递给子组件的是一个`绑定了自身上下文的函数`, 那么子组件在调用该函数时,就可以将想要交给父组件的数据以函数入参的形式传递过去, 从而实现 `子组件` => `父组件`
```js
// 子组件
class Child extends React.Component {
    state = {
        text: '子组件的文本'
    }

    changeText = () => {
        this.props.changeFatherText(this.state.text)
    }

    render() {
        return (
        <div className="child">
            {/* 注意这里把修改父组件文本的动作放在了 Child 里 */}
            <button onClick={this.changeText}>
            点击更新父组件的文本
            </button>
        </div>
        );
    }
}
// 父组件: 将自己的事件作为 props 传递, 子组件就可以使用 `props.parentEvent` 调用
class Father extends React.Component {
    state = {
        text: '初始化的父组件的文本'
    }

    // 这个方法会作为 props 传给子组件，用于更新父组件 text 值。newText 正是开放给子组件的数据通信入口
    changeText = (newText) => {
        this.setState({
            text: newText
        })
    }
    // 渲染父组件
  render() {
    return (
      <div className="father">
        <p>{`父组件的文本内容是：[${this.state.text}]`}</p>
        {/* 引入子组件，并通过 props 中下发可传参的函数 实现子-父通信 */}
        <Child
          changeFatherText={this.changeText}
        />
      </div>
    );
  }
}
```

#### 兄弟组件通信
- 兄弟组件共享一个父组件
- 所以我们要利用父子组件这一层关系, 将 `兄弟1 ==> 兄弟2`之间的通信, 转化为 `兄弟1 ==> 父组件`, `父组件 ==> 兄弟2` 这2个步骤
```js
class NewChild extends React.Component {
    state = {
        text: '来自 newChild 的文本'
    }

    // NewChild 组件的按钮监听函数
    changeText = () => {
        // changeText 中, 调用了父组件传入的 changeFatherText 方法
        this.props.changeFatherText(this.state.text)
    }

    render(){
        return (
            <div className="child">
                {/* 注意这里把修改父组件文本（同时也是 Child 组件的文本）的动作放在了 NewChild 里 */}
                <button onClick={this.changeText}>点击更新 Child 组件的文本</button>
            </div>
        )
    }
}

class Father extends React.Component {
    // 初始化父组件的 state
    state = {
        text: "初始化的父组件的文本"
    };

    // 传给 NewChild 组件按钮的监听函数，用于更新父组件 text 值(这个 text 值同时也是 Child 的 props)
    changeText = (newText) => {
        this.setState({
            text: newText
        });
    };

    // 渲染父组件
    render() {
        return (
        <div className="father">
            {/* 引入 Child 组件，并通过 props 中下发具体的状态值 实现父-子通信 */}
            <Child fatherText={this.state.text} />
            {/* 引入 NewChild 组件，并通过 props 中下发可传参的函数 实现子-父通信 */}
            <NewChild changeFatherText={this.changeText} />
        </div>
        );
    }
}
```

#### 利用“发布-订阅”模式驱动数据流
- 原生JS中, `target.addEventListener(type,listener,useCapture)` 通过调用`addEventListener`方法 创建一个事件监听器, 这个动作就是 `订阅`, 比如我们可以监听click事件
```js
el.addEventListener('click',func,false)
```
- 这样一来, 当click事件被触发时,事件会被`发布`出去, 进而监听这个事件的 `func`函数, 这就是最简单的`发布-订阅`案例.
- `发布-订阅`模式的优点在于, 监听事件的位置和触发事件的位置不受限制 ==> 实现`任意组件通信`的场景

##### 发布-订阅模型 API 设计思路
- `发布-订阅模型`的关键动作: `事件的监听(订阅)` 和 `事件的触发(发布)`
- `on()`: 负责注册事件的监听器, 指定事件触发时的回调函数
- `emit()`: 负责触发事件, 可以通过传参使其在触发的时候携带数据
- `off()`: 负责监听器的删除
```js
// VUE 中: event-bus
// A 组件:
EventBus.$on('change-home-name', () => {
    this.name = this.getName()
})
EventBus.$off('change-home-name')

// B 组件中:
EventBus.$emit('change-home-name')

/*
    step0: 注册事件 EventBus.$on(): 订阅
    step1: 完成某个事件后 触发 EventBus.$emit(): 发布
    step2: 监听到事件触发 触发 EventBus.$on(): 订阅的组件执行
*/
```

## 发布-订阅模型编码实现

#### 问题一：事件和监听函数的对应关系如何处理？
- 在全局我们需要设置一个对象，来存储事件和监听函数之间的关系
- 
#### 问题二：如何实现订阅？
- 所谓`订阅`, 也就是注册事件监听函数的过程,这是一个`写`操作, 把事件和对应的监听函数写到 `eventHome` 中

#### 问题三：如何实现发布？
- 订阅操作是一个 `写` 操作，相应的，发布操作就是一个 `读` 操作. 发布的本质是触发安装在某个事件上的监听函数，我们需要做的就是找到这个事件对应的监听函数队列，将队列中的 handler 依次执行出队：

```js
class EventEmitter {
  constructor() {
    // eventMap 用来存储事件和监听函数之间的关系
    this.eventMap = {}
  }

  /**
   * # >>>>>>> 注册事件 / 订阅事件
   * type: 这里就代表事件的名称
   * handler: 代表事件, 必须是一个函数
   */
  on(type, handler) {
    if (!(handler instanceof Function)) {
      throw new Error('Must be a Function!')
    }

    // 判断 type 事件对应的队列是否存在
    if (!this.eventMap[type]) {
      // 新建
      this.eventMap[type] = []
    }

    // 将 handler 推入 队列
    this.eventMap[type].push(handler)
  }

  /**
   * # >>>>>>> 发布事件
   * type: 发布事件的名称
   * params: 携带的参数
   */
  emit(type, params) {
    // 事件是被订阅的: 对应的事件队列存在
    if (this.eventMap[type]) {
      this.eventMap[type].forEach((handler, index) => {
        // 传递params
        handler(params)
      })
    }
  }

  /**
   * # 要卸载的 事件名称 对应的函数: event.off('event-name-a',handleA), 把 event-name-a 对应的 handleA 卸载,其他事件保留
   * type: 事件的名称
   * handler: 代表事件, 必须是一个函数
   */
  off(type, handler) {
    if (this.eventMap[type]) {
      this.eventMap[type].splice(this.eventMap[type].indexOf(handler) >>> 0, 1)
    }
  }
}
// #### Demo 
const myEvent = new EventEmitter()

const emitHandler = function (params) {
  console.log(`test事件被触发了，emitHandler 接收到的入参是${params}`)
}

// 监听 test 事件
myEvent.on('eventA', emitHandler)
myEvent.on('eventB', emitHandler)

// 在触发 test 事件的同时，传入希望 emitHandler 感知的参数
myEvent.emit('eventA', 'newSate aaa')
myEvent.emit('eventB', 'newSate bbb')

console.info(myEvent)

const reactEvent = new EventEmitter()
export { reactEvent }

```

#### Use it in React
```js
import { reactEvent } from './index'

class B extends React.Component {
  // 这里省略掉其他业务逻辑
  state = {
    newParams: '',
  }
  handler = (params) => {
    this.setState({
      newParams: params,
    })
  }

  /** 可以事件中注册/订阅, 也可以在生命周期中注册/订阅 
   * 回调函数是组件本身的事件
  */
  
  bindHandler = () => {
    reactEvent.on('someEvent', this.handler)
  }

  render() {
    return (
      <div>
        <button onClick={this.bindHandler}>点我监听A的动作</button>
        <div>A传入的内容是[{this.state.newParams}]</div>
      </div>
    )
  }
}

class A extends React.Component {
  // 这里省略掉其他业务逻辑
  state = {
    infoToB: '哈哈哈哈我来自A',
  }
  reportToB = () => {
    // 这里的 infoToB 表示 A 自身状态中需要让 B 感知的那部分数据
    reactEvent.emit('someEvent', this.state.infoToB)
  }
  render() {
    return <button onClick={this.reportToB}>点我把state传递给B</button>
  }
}

```

<img src="./React-data-publish-subscribe.png" height="300">