### 构造函数使用带 props 参数的目的是什么
- 在调用`super()`方法之前,子类构造函数不能使用`this`引用.这同样适用于ES6子类.
- 将`props`参数传递给`super()`的主要原因是为了在子构造函数中访问`this.props`.

#### 带 props 参数
```js
class MyComponent extends React.Component {
  constructor(props) {
    super(props)

    console.log(this.props) // prints { name: 'John', age: 12 }
  }
}
```

#### 不带 props 参数
```js
class MyComponent extends React.Component {
  constructor(props) {
    super()

    console.log(this.props) // prints undefined

    // but props parameter is still available
    console.log(props) // prints { name: 'John', age: 42 }
  }

  render() {
    // no difference outside constructor
    console.log(this.props) // prints { name: 'John', age: 42 }
  }
}
```
