## 组件

#### ⛵ 3.1 什么是组件
- 某个业务或者界面的抽象和封装

#### ⛵ 3.2 创建组件
- 🎃 `3.2.1 创建类组件`
- 类组件中一定有一个`render`方法,返回当前组件的内容
- 为什么没有使用`React`还要引入呢? 因为`jsx`代码在执行前会去找`React.createElement()`
```jsx
import React,{Component} from 'react'
class App extends Component {
    render(){
        return <div>Hello I am a component</div>
    }
}
```

- 🎃 `3.2.2 函数组件`
```jsx
// 首字母大写
const Person = () => {
    return <div>Hello I am 函数型组件</div>
}
```

#### ⛵ 3.3 组件属性
- 🎃 `3.3.1 props 传递数据`
- 组件中可以通过 `props`对象获取外部传递进来的数据
```jsx
<Person name="leslie" age="20" />
<Person name="mary" age="22" />

// 类组件
class Person extends Component{
    render(){
        return (
            <div>
                <h3>Name: {this.props.name} </h3>
                <h3>Age: {this.props.age} </h3>
            </div>
        )
    }
}

// 函数组件
const Person = props => {
    return (
         <div>
            <h3>Name: {props.name} </h3>
            <h3>Age: {props.age} </h3>
        </div>
    )
}
``` 
- <font color="#ff0000">props对象中存储的数据是只读的,不能在组件内部修改</font>
- <font color="#ff0000">当props数据源中的数据被修改后,组件中的接收到props数据会被同步更新(`数据驱动DOM`)</font>

- 🎃 `3.3.2 props 默认值`
```jsx
class App extends Component{
    static defaultProps = {}
}
// 函数组件默认值的设置
function ThemeButton(props){

}
ThemeButton.defaultProps = {
    theme: 'secondary',
    label: 'Button text'
}
```

- 🎃 `3.3.3 props children`
- 通过 `props.children`属性可以获取到调用组件时填充到组件标签内的内容
```jsx
<Person>组件内部的内容</Person>
const Person = (props) => {
    return (
        <div>{props.children}</div>
    )
}
```

- 🎃 `3.3.4 单向数据流`
- 1. 在React中, 关于数据流动有一条原则: 单向数据流动, 从父组件到子组件
- 2. 单向数据流特征要求我们共享数据要放置在上层组件中
- 3. 子组件通过调用父组件传递过来的方法更改数据
- 4. 当数据发生更改时, React会重新渲染组件树
- 5. 单向数据流使组件之间的数据流动变得可预测,使得定位程序变得简单

#### ⛵ 3.4 类组件状态 state
- 🎃 `3.4.1 定义组件状态`
- `类组件`除了能够从外部(`props`)接收状态数据还可以拥有自己的状态(`state`),此状态在组件内可以被更新,状态更新DOM更新.
- 组件内部的状态数据存储在组件类中的 `state`属性中, `state` 属性值为对象类型, 属性名称固定不可修改
```jsx
class App extends Component{
    constructor(){
        super()
        this.state = {
            person: {name: 'leslie',age: 20 }
        }
    }
    render(){
        return (
            <div>
                {/* 使用state */}
                <p>Name: {this.state.person.name}</p>
                <p>Age: {this.state.person.age}</p>
            </div>
        )
    }
}
```

- 🎃 `3.4.2 更改组件状态`
- `state` 状态对象中的数据不可直接更改, 如果直接更改 `DOM` 不会被更新
- 更改 `state` 需要使用 `setState`方法
```jsx
class App extends Component{
    constructor(){
        super()
        this.state = {
            person: {name: 'leslie', age: 20 }
        }

        this.changePerson = this.changePerson.bind(this)
    }
    // 修改 state 状态
    changePerson(){
        this.setState({
            person: {name: 'dora',age: 18}
        })
    }
    render(){
        return (
            <div>
                {/* 使用state */}
                <p>Name: {this.state.person.name}</p>
                <p>Age: {this.state.person.age}</p>
                <button onClick={this.changePerson}>Button</button>
            </div>
        )
    }
}
```

- 🎃 `3.4.3 双向数据绑定`
- 双向数据绑定是指: 组件类中更新了状态,DOM状态同步更新; `DOM` 更改了状态,组件类中同步更新, `组件<=>视图`
- 要实现双向数据绑定需要用到表单元素和 `state` 状态对象 (`只有表单元素才可以更改数据`)
```jsx
class App extends Component{
    constructor(){
        super()
        this.state = {
            name: 'leslie'
        }
        this.nameChanged = this.nameChanged.bind(this)
    }
    // 修改 state 状态
    nameChanged(event){
        this.setState({
           name: event.target.value
        })
    }
    render(){
        return (
            <div>
                {/* 使用state */}
                <p>Name: {this.state.person.name}</p>
                <p>Age: {this.state.person.age}</p>
                <Person name={this.state.name} changed={this.nameChanged}>Button</Person>
            </div>
        )
    }
}

const Person = (props) => {
    // onChange 绑定的就是 nameChange 方法
    return <input type="text" value={props.name} onChange={props.changed} />
}
```

#### ⛵ 3.5 类组件生命周期函数
- 💛 挂载阶段(`Mounting`)
- - 执行 `constructor`函数, 可以初始化`state`, 可以改变函数的`this`指向
- - `constructor`函数执行结束, 执行`getDerivedStateFromProps`生命周期函数(如果当前组件的状态取决于父组件的状态)
- - `getDerivedStateFromProps(params1,params2)`有 `2` 个参数, 第`1`个参数通过`props`传递过来的父组件的 `state`,第`2`个参数是当前组件的`state`,我们可以根据这个2个参数决定要不要更新当前组件的state, 如果不需要更新`return null`, 如果需要更新`return new {}`
- `getDerivedStateFromProps`函数执行接收后, 执行`render`方法
- `render`方法执行结束, 执行`componentDidMount`方法 ======> 当前组件挂载完成

- 💛 更新阶段(`Updating`)
- 当组件中的数据发生更新之后, 执行`getDerivedStateFromProps`函数, 这个函数的功能是替换之前版本的~~ `componentWillReceiveProps` ~~这个生命周期函数
- 当`getDerivedStateFromProps`执行结束后,开始执行`shouldComponentUpdate`函数
- `shouldComponentUpdate`函数需要返回一个✅ `true` 或者 ❌ `false`,
- ❌ `return false` => 停止更新组件
- ✅ `return true` => 执行`render`方法,重新渲染组件. `render`方法执行结束后会执行`getSnapshotBeforeUpdate`生命周期函数
- `getSnapshotBeforeUpdate` 方法会在 `render` 之后,组件完成更新(`componentDidiUpdate`)之前执行, 用于执行某种逻辑或计算, 返回值可以在 `componentDidiUpdate` 方法中的第3个参数中获取,就是说在组件更新之后拿到这个值再去做其他的事情
```js
getSnapshotBeforeUpdate(prevProps, prevState){
    return 'snapshot'
}
// 组件完成更新 函数
componentDidUpdate(prevProps,prevState, snapshot){
}
// getSnapshotBeforeUpdate 配合 componentDidUpdate 使用
```

- 💛 卸载阶段(`Unmounting`)
- 调用`componentWillUnmount`生命周期函数,表示此组件将被卸载,清理一些事件,清理ref等操作

#### ⛵ 3.5 Context
- 通过`Context`可以跨层级传递数据
```js
// userContext.js
import react from 'react'
const userContext = React.createContext('default value') // 创建一个上下文对象
const UserProvider = userContext.Provider // Provider 传递数据
const UserConsumer = userContext.Consumer // Consumer 获取数据

export { UserProvider, UserConsumer }

// App.js
import { UserProvider } from './userContext'
class App extends Component {
    render(){
        return (
            // value就是向下传递的属性
            <UserProvider value="Heelo react context">
                <A />
            </UserProvider>
        )
    }
}

// C.js
import { UserConsumer } from './userContext'
export class C extends Component {
    render(){
        return(
            <div>
                <UserConsumer>
                    {/* 通过UserConsumer内部执行回调函数,获取传递的属性值  */}
                    {username => {
                        return <div>{username}</div>
                    }}
                </UserConsumer>
            </div>
        )
    }
}
```


## 4 表单 

#### ⛵ 4.1 受控表单
- 表单控件中的值由组件的`state`对象来管理, `state`对象中存储的值和表单控件中的值是同步状态的
```jsx
class App extends Component {
    constructor(){
        this.state = {username: ''}
        this.nameChanged = this.nameChanged.bind(this)
    }

    nameChanged(e){
        this.setState({
            username: e.target.value
        })
    }

    render(){
        return(
            <form>
                <p>{this.state.username}</p>
                <input type="text" value={this.state.username}  onChange={this.nameChanged} />
            </form>
        )
    }
}
```

#### ⛵ 4.2 非受控表单
- 表单元素的值由 `DOM` 元素本身管理
```jsx
class App extends Component {
    constructor(){
        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit(e){
        console.info(this.username.value)
        e.preventDefault()
    }

    render(){
        return(
            <form onSubmit={this.onSubmit}>
                {/* 给表单元素添加 ref 属性, */}
                 {/* ref 指定成一个函数,函数的参数 username 就是当前的DOM对象 */} 
                {/* this.username 是给当前实例创建一个属性, 值就是当前参数的DOM对象 */} 
                <input type="text" ref={username => this.username = username}  />
            </form>
        )
    }
}
```