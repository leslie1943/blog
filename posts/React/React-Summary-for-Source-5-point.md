#### ⛵ 6.1 constructor
- `constructor()`:-构造方法,通过new命令生成对象实列时自动调用该方法,并且该方法是类中必须有的,如果没有显示定义则会默认添加空的 constructor()方法


#### ⛵ 6.2 super 继承
- 在 `class` 方法中,继承是使用 `extends` 关键字来实现的,子类必须在 `constructor()` 构造方法中调用 · 方法,否则新建实例时会报错
- 报错原因是: 子类是没有自己的 `this` 对象的,它只能继承父类的 `this` 对象然后对其加工. 
- 而 `super()` 就是将父类中的 `this` 对象继承给子类的. 
- `No super, child no this`

#### ⛵ 6.3 super() vs super(props)
- 如果用到了 `constructor` ==> 必须写 `super()` , 用来初始化 `this`,可以绑定事件到 `this` 上.
- 如果在 `constructor` 中要使用 `this.props`, 必须给 `super` 加参数 => `super(props)` 
- 只有一个理由需要传递 `props` 作为 `super()` 的参数那就是你需要在构造函数内使用 `this.props`
- 无论有没有 `constructor`, 在 `render` 方法中 `this.props` 都是可以使用的这是React自带的特性)
- 如果没用到 `constructor` 可以不写, React会默认添加一个空的 `constructor`
```js
class Hello extends Component{
    constructor(props){
        super(props)
        console.info(this.props); // 如果没有前一行的 super(props), 这句调用会出错
    }
}
```

#### ⛵ 6.4 props在两种形式组件中的使用
```jsx
    <SupportItem name={'leslie'} age={18} id={1943} event={this.onEventHandle} obj={id:1, gender:'male'}></SupportItem>

    function SupportItem(props) {
        console.info(props); // {param:anyTypeValue, childDemoField: 'childDemoField', id:"1943"}
        console.info(props.name);
        console.info(props.age);
        console.info(props.event);
        console.info(props.obj);
    }

    class SupportItem extends Component{
        console.info(this.props.param);
        console.info(this.props.param.childAttr);
        console.info(this.props.childDemoField);
        console.info(this.props.id);
    }
```

#### ⛵ 6.5 props vs state

 ```javascript
  /* -------------------- 🎃🎃🎃 props 🎃🎃🎃 --------------------
    React的核心思想是组件化思想,页面会被切分成独立的,可服用的组件
    组件从概念上看就是一个函数,可以接受一个参数作为输入值, 这个参数就是props,
      当然这个props可以是很多数据项的集合.
    所以可以把props理解为从外部传入组件内部的数据. 由于React是单向数据流, 所以 props 基本上就是父组件向子组件传递的数据.
  **/

  /* -------------------- 🎃🎃🎃 state 🎃🎃🎃 --------------------
   State is similar to props, but it is private and fully controller by the component.
   一个组件的显示形态可以由数据状态和外部参数所决定,外部参数=props, 数据状态=state.
   pre-condition 1: 它是通过props从父组件传递过来的吗？    是 => 不是state.
   pre-condition 2: 随着时间推移不变?                     是 => 不是state.
   pre-condition 3: 根据组件中state和props能够计算出来？   是 => 不是state

   state的主要作用用于组件保存,控制及修改自己的状态, 它只能在 constructor中初始化,它是组件的私有属性,不可通过外部访问和修改,只能通过组件内部的this.setState()来修改,修改state属性会导致组件的重新渲染.
  **/

  /* -------------------- 🔗🔗🔗 区别 🔗🔗🔗 --------------------
  1: state 是组件自己管理数据,控制自己的状态,可变.
  2: props 是外部传入的参数,不可变
  3: 没有state的叫做无状态组件,有state的叫做有状态组件.
  4: 多用props,少用state => 多写无状态组件
  5: 父组件的state可以转化为props来为子组件进行传值.
  **/
  ```
 