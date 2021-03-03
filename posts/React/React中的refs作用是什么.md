## React中的refs作用是什么

### ref 函数参数
- `refs`是`React`提供给我们的安全访问`DOM`元素或者访问`某个组件实例`的句柄
- 我们可以为元素添加`ref`元素然后在回调函数中接受该元素在`DOM`树中的句柄，该值会作为回调函数的第一个参数返回
```js
class UnControlledForm extends Component{
    handleSubmit = () => {
        console.info('Input value: ', this.input.value)
    }

    render(){
        return (
            <form>
                <input type="text" ref={(input) => (this.input = input)} />
                <button type="submit">Submit</button>
            </form>
        )
    }
}
```
- 上述代码中的`input`域包含了一个`ref`属性, 该属性声明的回调函数会接受`input`对应的`DOM`元素,我们将其绑定到`this`以便在其他的类函数中使用
- `refs`并非类组件的专属, 函数时组件同样能够利用`闭包`暂存该值
```js
function CustomerForm({handleSubmit}){
    let inputElement
    return(
        <form onSubmit={()=> handleSubmit(inputElement.value)}>
            <input type="text" ref={(input) => (inputElement = input)} />
        </form>
    )
}
```

### ref字符串
```js
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

### createRef
```js
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