### React-Hooks 设计动机与工作模式-2

#### useState(): 为函数组件引入状态 ===> useState
- `useState`快速上手: 从用法上看, `useState`返回的是一个数组, 数组的第一个元素是我们想要的那个 `state` 变量, 第二个元素对用的是能够修改变量的`API`.
```js
const [state,setState] = useState(initialState)
```
- `状态和修改状态的 API 名都是可以自定义的` ==> `const [text, setText] = useState('初始的文本')`
- 在使用 `useState`的时候, 实际上是给这个组件关联了`一个状态`,而不是`一批状态`
- `批量定义数据` 要一个一个声明, 就像类组件中state对象的某一个属性一样, 对应着一个单独的状态, 允许存储任意类型
```js
// 定义数组
const [author, setAuthor] = useState(['leslie','mark','dora'])
// 定义数值
const [length, setLength] = useState(100)
// 定义字符串
const [text, setText] = useState('初始的文本')
// 定义对象
const [person, setPerson] = useState({name: 'leslie', age: 22})
```

#### useEffect 允许函数组件执行副作用操作
- 函数组件相比于类组件来说, 最显著的差异 就是 `state` 和 `生命周期`的缺失, `useState`可以为函数组件引入 `state`, 而 `useEffect`则在一定程度弥补了生命周期的缺席
- `useEffect` 能够为函数组件引入副作用,过去我们习惯放在 `componentDidiMount`,`componentDidUpdate`, `componentWillUnmount`这3个生命周期的事我们可以放在`useEffect`内操作, 比如`操作DOM`,`订阅事件`,`调用外部API获取数据`

#### useEffect 和生命周期函数之间的 `替换` 关系
- 当我们真正抛却类组件带来的刻板印象, 拥抱函数式编程之后, `useEffect是用于函数组件引入副作用的钩子`这个定义
- `useEffect`接受两个参数, 分别是`回调函数`与`依赖数组`
```js
useEffect(callback,[])
```
- `useEffect`用什么姿势来调用, 本质上取决于你向它来表达什么样的效果,
- 1. 每一次渲染后都执行的副作用, 传入回调函数, 不传依赖数组. ====> `useEffect(callback)`
- 2. 仅在挂载阶段执行一次的副作用, 传入回调函数, 且这个函数的返回值不是一个函数, 同时传入一个空数组
```js
  useEffect(() => {
    // logic
  },[])
```
- 3. 仅在挂载阶段和卸载阶段执行的副作用: 传入 回调函数, 并且这个函数的返回值是一个函数, 同时传入一个空数组. 假如回调函数本身记为A,返回的函数为B, 那么将在挂载阶段执行A, 卸载阶段执行B, `useEffect回调函数中返回的函数被称为` <font color="#FF0000">清除函数</font>, 当 React 识别到清除函数时, 会在卸载时执行清除函数内部的逻辑。这个规律不会受第二个参数或者其他因素的影响, 只要你在 useEffect 回调中返回了一个函数, 它就会被作为清除函数来处理
```js
  useEffect(() => {
    // 这里是A的业务逻辑,
    // 返回也给函数记为B
    return () => {

    }
  },[])
```
- 4. 每一次渲染都触发, 并且卸载阶段也会触发的副作用: 传入回调函数,这个函数返回一个函数, 并且不传第二个参数
```js
  useEffect(() => {
    // 这里是A的业务逻辑,
    // 返回也给函数记为B
    return () => {
    }
  })
```
可以简单的理解为 `useEffect`里的回调函数中返回的函数 类似于 生命周期里的 `componentWillUnmount`方法

- 5. 根据一定的依赖条件来触发的副作用: 传入回调函数(若返回值是一个函数, 仍然仅影响卸载阶段对副作用的处理), 同时传入一个非空的数组
```js
  useEffect(() => {
    // 这里是A的业务逻辑,
    // 返回也给函数记为B
    return () => {
    }
  },[num1,num2,num3])
// 数组中的变量一般都是来源于组件本身的数据（props 或者 state）
// 数组不为空, 那么 React 就会在新的一次渲染后去对比前后两次的渲染, 查看数组内是否有变量发生了更新（只要有一个数组元素变了, 就会被认为更新发生了）, 并在有更新的前提下去触发 useEffect 中定义的副作用逻辑
```

#### Why React-Hooks：Hooks 是如何帮助我们升级工作模式的
函数组件相比类组件来说, 有着不少能够利好 `React` 组件开发的特性, 而 `React-Hooks` 的出现正是为了强化函数组件的能力

##### 为什么需要 React-Hooks - 1. 告别难以理解的Class
`class`是难以理解的,指的是 `this`和`生命周期`这2个通点.
```js
class Example extends Component {
  state = {
    name: '修言',
    age: '99';
  };
  changeAge() {
    // 这里会报错
    this.setState({
      age: '100'
    });
  }
  render() {
    return <button onClick={this.changeAge}>{this.state.name}的年龄是{this.state.age}</button>
  }
}
/*
  这个demo想做的事当我点击时,希望它能够帮我修改状态, 但事实是, 点击发生后, 程序会报错.
  原因很简单: changeAge 里并不能拿到组件实例的 this
  为了解决 this 不符合预期的问题, 使用bind, 箭头函数, 其本质上都是在用实践层面的约束解决设计层面的问题
  现在有了 Hooks, 毕竟函数组件是不用关心 this 的
*/
```
至于`生命周期`,它带来的麻烦有以下两个方法
- 学习成本

##### 为什么需要 React-Hooks - 2. Hooks 如何实现更好的逻辑拆分
- 在过去, 将对应的业务逻辑拆到不同的生命周期函数里去, 逻辑曾经一度与生命周期耦合在一起,在这样的前提下, 生命周期函数常常做一些奇怪的事情
- 在`componentDidMount`里获取数据, 在`componentDidUpdate`里根据数据的变化去更新DOM, 如果说你只用一个生命周期做一件事, 那好像也还可以接受, 但是往往在一个稍微成规模的 React 项目中, 一个生命周期不止做一件事情
```js
componentDidMount() {
  // 1. 这里发起异步调用
  // 2. 这里从 props 里获取某个数据, 根据这个数据更新 DOM  
  // 3. 这里设置一个订阅  
  // 4. 这里随便干点别的什么 
  // ...
}
componentWillUnMount() {
  // 在这里卸载订阅
}  
componentDidUpdate() {
  // 1. 在这里根据 DidMount 获取到的异步数据更新 DOM
  // 2. 这里从 props 里获取某个数据, 根据这个数据更新 DOM（和 DidMount 的第2步一样）
}
```
- 在 `Hooks` 的帮助下, 我们完全可以把这些繁杂的操作按照逻辑上的关联拆分进不同的函数组件里：我们可以有专门管理订阅的函数组件、专门处理 DOM 的函数组件、专门获取数据的函数组件等。`Hooks` 能够帮助我们实现业务逻辑的聚合, 避免复杂的组件和冗余的代码

##### 为什么需要 React-Hooks - 2. 状态复用：Hooks 将复杂的问题变简单
- 过去我们复用状态逻辑,靠的是` HOC（高阶组件）` 和 `Render Props` 这些组件设计模式,这是因为 React 在原生层面并没有为我们提供相关的途径。但这些设计模式并非万能,它们在实现逻辑复用的同时,也破坏着组件的结构,其中一个最常见的问题就是“嵌套地狱”现象.
- `Hooks`可以视作是 React 为解决状态逻辑复用这个问题所提供的一个原生途径, 我们可以通过自定义 Hooks 既达到不破坏组件解构, 又能实现逻辑复用的效果
- [自定义 Hook 文档](https://zh-hans.reactjs.org/docs/hooks-custom.html)

##### Hooks 并非万能
- `Hooks`暂时还不能完全地为函数组件补齐类组件的能力,比如`getSnapshotBeforeUpdate`, `componentDidiCatch`这些生命周期, 目前还都是强依赖类组件的.
- `轻量`几乎是函数组件的基因, 这可能会使它不能够很好的消化`复杂`,从头到尾都在`过于复杂`和`过度拆分`之间摇摆不定，耦合和内聚的边界，有时候真的很难把握，函数组件给了我们一定程度的自由，却也对开发者的水平提出了更高的要求
- `Hooks`在使用层面有着严格的规则约束,