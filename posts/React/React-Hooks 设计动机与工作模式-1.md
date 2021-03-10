## React-Hooks 设计动机与工作模式

#### React Hooks 设计动机
- 对 `类组件` 和 `函数组件` 两种组件形式的思考和侧重

#### 类组件
- 通过继承 `React.Component` 得到的 React 组件
```js
class DemoClass extends React.Component {
  // 初始化类组件的 state
  state = {
    text: ""
  };
  // 编写生命周期方法 didMount
  componentDidMount() {
    // 省略业务逻辑
  }
  // 编写自定义的实例方法
  changeText = (newText) => {
    // 更新 state
    this.setState({
      text: newText
    });
  };
  // 编写生命周期方法 render
  render() {
    return (
      <div className="demoClass">
        <p>{this.state.text}</p>
        <button onClick={this.changeText}>点我修改</button>
      </div>
    );
  }
}
```

#### 函数组件 / 无状态组件
- 组件以 `函数的形态`存在的React组件
- 函数组件内部无法定义和维护 `state`, 因此也称为 `无状态组件`
```js
function DemoFunction(props) {
  const { text } = props
  return (
    <div className="demoFunction">
      <p>{`function 组件所接收到的来自外界的文本内容是：[${text}]`}</p>
    </div>
  );
}
```

#### 对比 函数组件 和 类组件
- `类组件` 需要继承 `class`,  `函数组件` 不需要
- `类组件` 可以访问生命周期方法,  `函数组件` 不能
- `类组件` 中可以获取到实例化后的 `this`, 并基于这个 `this` 做各种各样的事情, 而 `函数组件` 不可以
- `类组件` 中可以定义并维护 `state（状态）`, 而 `函数组件` 不可以

在 `React-Hooks`出现之前, `类组件的能力边界明显强于函数组件`, 并不代表 类组件 强于 函数组件

#### 重新理解 类组件 和 函数组件
- `类组件`是面向对象编程思想的一种表现(`重装战舰`)
- 只要实现`React.Component`就可以得到父类中所有的东西,等待去调度和定制.
- `函数组件`: 轻量,灵活,容易维护 (`轻巧快艇`), 同样可以处理逻辑
```js
function DemoFunction(props) {
  const { text } = props 
  const showAlert = ()=> {
    alert(`我接收到的文本是${text}`)
  } 
  return (
    <div className="demoFunction">
      <p>{`function 组件所接收到的来自外界的文本内容是：[${text}]`}</p>
      <button onClick={showAlert}>点击弹窗</button>
    </div>
  );
}
```

#### 💛 对比结论
- 1. 函数组件会捕获 `render` 内部的状态, 这是两类组件最大的不同
- 2. 两类组件差别是`模式`层面的差异
- 3. 函数组件更加契合 React 框架的设计理念
```bash
    UI = render(data)
    # 或
    UI = f(data)
```
- 不夸张的说, React 本身的定位就是函数, 一个`使用数据`=>`更新UI`的函数
- 为开发者,我们编写的是声明式的代码, 而 React 框架的主要工作,`就是及时地把声明式的代码转换为命令式的 DOM 操作,把数据层面的描述映射到用户可见的 UI 变化中去`,这就意味着从原则上来讲, `React 的数据应该总是紧紧地和渲染绑定在一起的, 而类组件做不到这一点`
- 在类组件中, 虽然 Props本身是不变的, 但this却是可变的, this上的数据是可以被修改的. this.props的调用每次都会获取最新的props,而这正是 React 确保数据实时性的一个重要手段.
- 函数组件的优势
```js
function ProfilePage(props) {
  const showMessage = () => {
    alert('Followed ' + props.user);
  };
  const handleClick = () => {
    setTimeout(showMessage, 3000);
  };
  return (
    <button onClick={handleClick}>Follow</button>
  );
}
```
- 1. `props` 会在 `ProfilePage` 函数执行的一瞬间就被捕获, 而 `props` 本身又是一个不可变值, 因此我们可以充分确保从现在开始, 在任何时机下读取到的 `props`, 都是最初捕获到的那个 `props`
- 2. 当父组件传入新的 `props` 来尝试重新渲染 ProfilePage 时, 本质上是基于新的 `props` 入参发起了一次全新的函数调用, 并不会影响上一次调用对上一个 `props` 的捕获.这样一来, 我们便确保了渲染结果确实能够符合预期.
  
<font color="#FF0000" size="5">函数组件真正地把数据和渲染绑定到了一起</font>

所以, React 团队也认识到 `函数组件是一个更加匹配其设计理念,也更有利于逻辑拆分与重用的组件表达形式`, 这就是为什么`Why`: `React-Hooks`出现的原因


#### React-Hooks 是什么?
- `React-Hooks`是一套能够使得`函数`组件更强大,更灵活的钩子
- `React-Hooks`补齐了(相对于类组件)丢失的能力: 生命周期, state 管理 等
- 如果说函数组件是一台轻巧的快艇，那么 `React-Hooks` 就是一个内容丰富的零部件箱, 自由选择需要的能力