## React: why super() and why super(props)

#### 定义class组件,为什么要加上super()
```js
class App extends Component{
    constructor(){
        // super()
        this.state = {name: 'su'} // ❌ 'this' is not allowed before super() => Reference Error
        this.handleChange = this.handleChange.bind(this)
    }
}
```

#### super的作用究竟是什么?
- `super`关键字, 它指代父类的实例(也就是父类的`this`对象)
- 子类必须在`constructor`函数中调用`super`方法, 否则新建实例时会报错.
- 这是因为子类没有自己的`this`对象,而是继承自父类的`this`对象
- 总而言之: 子类如果不在`constructor()`中调用`super()`,子类就得不到`this`对象

#### super() vs super(props)
- 只有一个理由需要传递`props`作为`super`的参数,就是希望在构造函数中使用`this.props`