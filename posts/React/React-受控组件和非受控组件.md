#### React: 受控组件和非受控组件
- `受控组件`: 由React控制, 通过事件, 使用 `setState`来设置状态的变化, 通过 `this.state`来获取状态的值, 在HTML中,表单元素(input,select)之类的表单元素通常自己维护state,并根据用户的输入进行更新. 而在React中, `可变状态`通常保存在组件的state属性中, 并且只能通过使用setState()来更新.两者结合起来, 使用React的state成为“唯一数据源”. 渲染表单的React组件还控制着用户输入过程中表单发生的操作. 被React以这种方式控制取值的表单输入元素叫做受控组件.
- `非受控组件`: 表单的值由DOM控制, 数据也保持在DOM中, 使用ref获取数据表单元素的值.

#### React: 选用标准
- 非受控组件 实现代码简单, 所以如果交互方面比较简单, 使用非受控组件,否则使用受控组件


| 场景 | 非受控 | 受控 |
| ---- | ---- | ---- |
| 表单提交时取值 | ✅ | ❌ |
| 表单提交时验证 | ✅ | ❌ |
| 表单项元素实时验证 | ✅ | ❌ |
| 根据条件禁用提交按钮 | ✅ | ❌ |
| 强制输入内容格式 | ✅ | ❌ |
| 一个数据的多个输入 | ✅ | ❌ |


#### React: 非受控组件
```js
function App(){
    const userInput = useRef()
    function handleSubmit(){
        const username = userINput.current.value
    }
    return(
        <form onSubmit={handleSubmit}>
            <input type="text" ref={userInput} />
            <input type="submit"  />
        </form>
    )
}
```

#### 受控组件
```js
class App extends React.Component{
    state = {username: ''}
    handleChange(evet){
        this.setState({
            username: event.target.value
        })
    }
    return(
        <form>
            <input type="text" value={this.state.username} onChange={this.handleChange.bind(this)} />
            <span>{this.state.username}</span>
        </form>
    )
}
```