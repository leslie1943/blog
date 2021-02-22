## React-深入高阶组件
- 高阶组件是一个概念十分简单, 但却非常有用的东西,它的作用时能实现代码复用和逻辑抽象, 对`state`和`props`进行抽象和操作,对组件进行细化(添加生命周期),实现渲染劫持等.
- 正是因为高阶组件的实用性, 它频繁地被大量`React.js`相关的第三方库, 如 `react-redux`,`react-loadable`等所使用

### ✅✅ 概念
- 高阶组件, 不是组件,而是一个函数,它会`接受一个组件作为参数`并`返回一个经过改造的新组件`
```js
const EnhancedComponent = highOrderComponent(WrappedComponent)
```
- 需要明确的是: 组件是将`props`转化成`UI`, 而高阶组件是将组件转换为另一个组件
- 高阶组件是`React`中用于复用组件逻辑的一种高级技巧


### ✅✅ 为什么使用高阶组件
- 在业务开发中,虽然不掌握高阶组件也可以完成项目的开发,但是如果我们能够灵活地使用高阶组件,可以让项目代码变得更加优雅,同时增强代码的复用性和灵活性,提升开发效率.
- 同时,了解高阶组件对我们理解各种`React.js`第三方库很有帮助
- 关于高阶组件能姐姐的问题可以概括为3个方面
- - 抽取重复代码, 实现组件复用. 常见场景: 页面复用
- - 条件渲染, 控制组件的渲染逻辑(渲染劫持), 常见场景: 权限控制
- - 捕获/劫持被处理组件的生命周期. 常见场景: 组件渲染性能追踪, 日志记录


### ✅✅ 如何实现高阶组件
- 💛 通常情况下,实现高阶组件的方式有两种:
- - 💙 属性代理(`Props Proxy`)
- - - 💜 返回一个无状态的`stateless`的函数组件
- - - 💜 返回一个 `class` 组件
- - 💙 反向继承(`Inheritance Inversion`)
- 💛 高阶组件实现方式的差异性决定了它们各自的应用场景: 一个`React`组件包含了`props`,`state`,`ref`,生命周期方法,`static`方法和`React`元素树几个重要的部分,所以我们激昂从一下几个方面对比两种高阶组件实现方式的差异性
- 🔰 原组件能否被包裹
- 🔰 原组件能否被继承
- 🔰 能否读取/操作原组件的`props`
- 🔰 能否读取/操作原组件的`state`
- 🔰 能否通过`ref`访问到原组件的`dom`元素
- 🔰 是否影响原组件某些生命周期等方法
- 🔰 是否取到原组件`static`方法
- 🔰 能否劫持原组件生命周期方法
- 🔰 能否渲染劫持


### ✅✅ 属性代理
- 属性代理是最常见的实现方式, 它本质上是使用组合的方式, 通过将组件包装在容器组件中实现功能.
- 属性代理方式实现的高阶组件和原组件的生命周期关系完全是`React`父子组件的生命周期关系, 所以该方式实现的高阶组件会影响原组件某些生命周期等方法

#### 🚀 操作 props
- 最简单的属性代理实现代码如下:
```js
// 返回一个无状态的函数组件
function HOC(WrappedComponent){
    const newProps = {type: 'HOC'}
    return props => <WrappedComponent {...props} {...newProps}>
}
```
```js
// 返回一个有状态的 class 组件
function HOC(WrappedComponent){
    return class extends React.Component { 
       render(){
           const newProps = {type: 'HOC'}
           return <WrappedComponent {...this.props} {...newProps}>
       } 
    }
}
```
- 从上面的代码可以看到, 通过属性代理方式实现的高阶组件包装后的组件可以拦截到父组件传递的`props`，提前对`props`进行一些操作,比如增加属性等

#### 🚀 抽象 state
- 需要注意的是: 通过属性代理方式实现的高阶组件无法直接操作原组件的`state`,但是可以通过`props`和回调函数对`state`进行抽象
- 常见的例子是实现非受控组件到受控组件的转变

```js
// 高阶组件
function HOC(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        name: '',
      };
      this.onChange = this.onChange.bind(this);
    }
    
    onChange = (event) => {
      this.setState({
        name: event.target.value,
      })
    }
    
    render() {
      const newProps = {
        name: {
          value: this.state.name,
          onChange: this.onChange,
        },
      };
      return <WrappedComponent {...this.props} {...newProps} />;
    }
  };
}

// 使用
@HOC
class Example extends Component{
    render(){
        return <input name="name" {...this.props.name}>
    }
}
```