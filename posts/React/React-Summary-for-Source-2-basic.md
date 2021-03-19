## JSX 

#### ⛵ 2.1 JSX
- 在`React`中使用`JSX`语法描述用户界面, `JavaScript` 语法扩展
- 在 `React`代码执行之前, `Babel`会将`JSX`转换为标准的`JavaScript API`
- `JSX` 就是 `React.createElement` 的语法糖,方便使用

#### ⛵ 2.2 属性
- 属性值为字符串类型, 需要加引号, 属性名称推荐驼峰命名
- 属性值为JS表达式, 属性值外面加大括号
```js
const element = <div greeting="hello"></div>
const element = <img src={user.avatar} />
```

#### ⛵ 2.3 JSX单标记必须闭合
```html
<img /> <input />
```

#### ⛵ 2.4 className
- 添加类型需要使用 `className` 而不是 `class`

#### ⛵ 2.5 自动展开数组
```js
const ary = [<p>哈哈1</p>,<p>哈哈2</p>,<p>哈哈3</p>]
const element = (
    <div>{ary}</div>
)
// 输出为
<div>
    <p>哈哈1</p>
    <p>哈哈2</p>
    <p>哈哈3</p>
</div>
```
#### ⛵# 2.6 三元表达式
```js
{boolean ? <div>Heelo</div> : null}
// or
{boolean && <div>Heelo</div> }
```

#### ⛵# 2.7 循环
```js
const persons = [{name:'1',id:1},{name:'2',id:2}]
// 使用
<ul>
    { persons.map(person => <li key={person.id}>{person.name}</li>) }
</ul>
```

#### ⛵ 2.8 事件
```js
// 1.第一个参数就是事件对象,不需传递
<button onClick={this.eventHandler}>Button</button>

// 2. 需要传递事件对象
<button onClick={e => this.eventHandler('arg', e)}>Button</button>

// 3. 最后一个参数是事件对象,不需传递
<button onClick={this.eventHandler.bind(null, 'arg')}>Button</button> // 执行的是bind返回的函数,null不改变this指向

// define
constructor(){
    this.eventHandler = this.eventHandler.bind(this)
}

// 这种写法需要在 constructor 绑定到当前类实例对象上,在 jsx中使用 this.eventHandler才不会是 undefined
eventHandler(){
    console.info('eventHandler')
}

```

#### ⛵ 2.9 样式

- 🎃 `2.9.1 行内样式`
```js
class App extend Component {
    render(){
        const style = { width:200; height:200, backgroundColor: 'red'}
        return <div style={style}></div>
    }
}
```

- 🎃 `2.9.2 外链样式`
```js
// 外链样式文件的格式: ClassName.module.css, 只能作用于当前文件
import styles from './Button.module.css'
class Button extend Component {
    render(){
        return <div className={styles.error}>Error button</div>;
    }
}
```

- 🎃 `2.9.3 全局样式`
```js
import styles from './styles.css'

```


#### ⛵ 2.10 ref 属性
- 🎃 2.10.1 `createRef`
```jsx
class Input extends Component{
    constructor(){
        super()
        this.inputRef = React.createRef() // 定义ref对象
    }

    render(){
        return(
            <div>
                {/* 在this.inputRef 这个对象上有一个 current 属性, current 存储的就是 input 对应的DOM对象 */} 
                <input type="text" ref={this.inputRef} />
                <button onClick={() => console.info(this.inputRef.current)}>Button</button>
            </div>
        )
    }
}
```
- 🎃 2.10.2 `函数参数`
```jsx
class Input extends Component{
    render(){
        return(
            <div>
                {/* ref 指定成一个函数,函数的参数input就是当前的DOM对象 */} 
                {/* this.input 是给当前实例创建一个属性, 值就是当前参数的DOM对象 */} 
                <input type="text" ref={input => (this.input=input)} />
                <button onClick={() => console.info(this.input)}>Button</button>
            </div>
        )
    }
}
```
- 🎃 2.10.3 `ref字符串`
```jsx
class Input extends Component{
    render(){
        return(
            <div>
                <input type="text" ref="username" />
                <button onClick={() => console.info(this.$refs.username)}>Button</button>
            </div>
        )
    }
}
```

- 🎃 `2.10.4 ref-demo`
```jsx
class Input extends Components {
     constructor(){
        super()
        this.inputRef = React.createRef() // 定义ref对象
        this.foucsInput = this.focusInpuit.bind(this)
    }

    // 组件内部的方法执行,将焦点设置给 inputRef 指向的 DOM对象
    focusInput (){
      this.inputRef.current.focus()  
    }

    render(){
        return(
            <div>
                <input type="text" ref={this.inputRef}>
            </div>
        )
    }
}
```

```jsx
class App extends Component {
    constructor(){
        super()
        this.InputComponentRef = React.createRef()
    }
    render(){
        return (
            <div className="App">
                <Input ref={this.InputComponentRef} /> {/* InputComponentRef获取组件的DOM对象 */}
                {/* 获取并执行组件的方法 */}
                <button onClick={() => this.InputComponentRef.current.focusInput}>Button</button>
            </div>
        )
    }
}
```

- 🎃 `2.10.5 special`
- `JSX` 标签名不能是一个表达式, 不能在 `return` 时生成
```jsx
<components[props.type] story={props.story}/> ❌❌❌❌

render(){
    const SomeComponent = components[props.type];
    // 可以在return之前 将表达式先获取： 
    return(
        <SomeComponent story={props.story} />
    )
}
```