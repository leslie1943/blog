### React 中类方法为什么需要绑定 this
- `JavaScript`中, `this`的值取决于上下文.
- 在`React`类组件方法中, 开发人员通常希望它引用组件的当前实例. 因此有必要将这些方法`绑定`到改实例
- 通常, 在构造函数中完成
```js
class SubmitForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            isFormSubmitted: false
        };
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(){
        this.setState({
            isFormSubmitted: true
        })
    }

    render(){
        return(
            <button onClick={this.handleSubmit}>Submit</button>
        )
    }
}
```