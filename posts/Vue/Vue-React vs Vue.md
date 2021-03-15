## React vs Vue 对比

### 🚀 设计思想及性能对比
- React 是函数式的思想: 状态和逻辑通过`props`传入, 单向数据流, 在setState之后会重新走渲染的流程, 如果`shouldComponentUpdate=true`, 继续渲染,如果`shouldComponentUpdate=false`就不会重新渲染, `PureComponent`就是重写了`shouldComponentUpdate`然后在里面做了`props`和`state`前的浅层对比
- Vue 的思想是响应式的, 也就是基于数据是可变的, 通过对每一个属性建立`watcher`来监听, 当属性变化时, 响应式的更新对应的虚拟DOM
- 所以, react的性能时需要手动去做,而vue得性能优化是自动得, 但是vue的响应式机制也有问题,当data中的属性特别多时, `Watcher`也会很多,导致卡顿,所以大型应用(状态非常多时)一般用react,更加可控

### 🚀 生命周期
- 💛`react`💛
- 1. `componentWillMount`: 组件初始化时只调用, 以后组件更新不调用, 整个生命周期只调用一次, 此时可以修改state. 下一个版本可能会被废弃
- 2. `render`: react最重要的步骤, 创建虚拟dom, 进行diff算法, 更新dom树都在此进行. 此时就不能更改state了
- 3. `componentDidMount`: 组件渲染之后调用, 只调用一次. 
- 4. `componentWillReceiveProps`: 组件初始化时不调用, 组件接受新的 `props` 时调用.
- 5. `componentWillUnmount`: 组件将要卸载时调用, 一些事件监听和定时器需要在此时清除.
- 6. `componentWillUpdate`: 组件更新结束之前执行, 在初始化render时不执行.
- 7. `componentDidUpdate`: 组件更新结束之后执行, 在初始化render时不执行
- 注意: `componentDidMount` 里面 `setState` 导致组件更新, 组件更新后会执行 `componentDidUpdate`, 此时你又在 `componentDidUpdate` 里面 `setState` 又会导致组件更新, 造成成死循环了, 如果要避免死循环, 需要谨慎的在 `componentDidUpdate` 里面使用 `setState`

- 💛`vue`💛
- 1. `beforeCreate` ( 创建前 ): 此时组件的选项对象还未创建, el 和 data 并未初始化, 因此无法访问methods,  data,  computed等上的方法和数据
- 2. `created` ( 创建后 ）: 实例已经创建完成之后被调用, 实例已完成以下配置：数据观测、属性和方法的运算, watch/event事件回调, 完成了data 数据的初始化, el没有,然而, g挂载阶段还没有开始, $el属性目前不可见, 这是一个常用的生命周期, 因为你可以调用methods中的方法, 改变data中的数据, 并且修改可以通过vue的响应式绑定体现在页面上,获取computed中的计算属性等等, 通常我们可以在这里对实例进行预处理, 也有一些童鞋喜欢在这里发ajax请求, 因此假如有某些数据必须获取才允许进入页面的话, 并不适合在这个方法发请求, 建议在组件路由钩子beforeRouteEnter中完成
- 3. `beforeMount`: 挂载开始之前被调用, 相关的render函数首次被调用（虚拟DOM）, 实例已完成以下的配置：编译模板, 把data里面的数据和模板生成html, 完成了el和data 初始化, 注意此时还没有挂载html到页面上.
- 4. `mounted`: 挂在完成, 也就是模板中的HTML渲染到HTML页面中, 此时一般可以做一些ajax操作, mounted只会执行一次.
- 5. `beforeUpdate`: 在数据更新之前被调用, 发生在虚拟DOM重新渲染和打补丁之前, 可以在该钩子中进一步地更改状态, 不会触发附加地重渲染过程
- 6. `updated`: 由于数据更改导致地虚拟DOM重新渲染和打补丁只会调用, 调用时, 组件DOM已经更新, 所以可以执行依赖于DOM的操作, 然后在大多是情况下, 应该避免在此期间更改状态, 因为这可能会导致更新无限循环, 该钩子在服务器端渲染期间不被调用
- 7. `beforeDestory`: 在实例销毁之前调用, 实例仍然完全可用, 这一步还可以用this来获取实例,  一般在这一步做一些重置的操作, 比如清除掉组件中的定时器 和 监听的dom事件 destroyed（销毁后）

### 🚀 JSX vs Templates
- JSX 的渲染函数有下面这些优势
- 1. 可以使用完整的编程语言 JavaScript 功能来构建你的视图页面
- 2. 开发工具对 JSX 的支持相比于现有可用的其他 Vue 模板还是比较先进的 <font color="red">Vue3 + vuter 也很好了</font>
- Vue 也提供了渲染函数, 甚至支持 JSX, 然而, Vue默认推荐的还是模板. 任何合乎规范的 HTML 都是合法的 Vue 模板, 这也带来了一些特有的优势
- 1. 对于很多习惯了 HTML 的开发者来说, 模板比起 JSX 读写起来更自然. 这里当然有主观偏好的成分, 但如果这种区别会导致开发效率的提升, 那么它就有客观的价值存在. 
- 2. 基于 HTML 的模板使得将已有的应用逐步迁移到 Vue 更为容易. 

### 🚀 组件作用域内的 CSS
- 💛`Vue`💛
- 1.   设置样式的默认方法是单文件组件里类似 style 的标签. 单文件组件让你可以在同一个文件里完全控制 CSS, 将其作为组件代码的一部分. 
- 2. 这个可选 scoped 属性会自动添加一个唯一的属性 (比如 data-v-8123) 为组件内 CSS 指定作用域. 
```css
<style scoped>
  .container{
      display:flex;
  }
</style>
```
- 💛`React`💛
- 1. 语法不太一样, React设置class是用className字段, 而设置css是使用对象的形式, 当然, 一般还是引入外部的css(经过编译的sass或者less文件)比较合适. 


### 🚀 组件传值
- 💛`React`💛
- 1. 父到子, 父组件自定义属性, 子通过props来获取父的属性值
- 2. 子到父, 在父组件绑定callbackParent={this.onChildChanged}, 在子组件利用this.props.callbackParent(newState),触发了父级的的this.onChildChanged方法, 进而将子组件的数据（newState）传递到了父组件. 这样做其实是依赖 props 来传递事件的引用, 并通过回调的方式来实现
```js
onChildChanged: function (newState) {
    this.setState({
      checked: newState
    });
  },
```
- 💛`Vue`💛
- 1. 父组件传递数据给子组件,父组件数据如何传递给子组件呢？可以通过props属性来实现
```html
<parent>
    <child :child-msg="msg"></child>  //这里必须要用 - 代替驼峰
</parent>
data(){
    return {
        msg: [1,2,3]
    };
}
```
- 2. 子组件通过props来接收数据: props: ['childMsg']
- 3. 子组件与父组件通信
```html
<!-- 子组件: -->
<template>
    <div @click="testClick"></div>
</template>
methods: {
    testClick() {
        this.$emit('test','123'); //主动触发test方法, '123'为向父组件传递的数据
    }
}
<!-- 父组件 -->

<div>
    <child @test="change" :msg="msg"></child>  //监听子组件触发的test事件,然后调用change方法
</div>
methods: {
    change(msg) {
        this.msg = msg;  // msg: 123
    }
}
```

### 🚀 规模
- Vue 和 React 都提供了强大的路由来应对大型应用. React 社区在状态管理方面非常有创新精神 (比如 Flux、Redux), 而这些状态管理模式甚至 Redux 本身也可以非常容易的集成在 Vue 应用中. 实际上, Vue 更进一步地采用了这种模式 (Vuex), 更加深入集成 Vue 的状态管理解决方案 Vuex 相信能为你带来更好的开发体验
-  两者另一个重要差异是, Vue 的路由库和状态管理库都是由官方维护支持且与核心库同步更新的. React 则是选择把这些问题交给社区维护, 因此创建了一个更分散的生态系统. 但相对的, React 的生态系统相比 Vue 更加繁荣. 


### 🚀 相似之处
- 使用 Virtual DOM
- 提供响应式(Reactive)和组件化
- 基础工作由核心库完成, 状态管理和路由管理交给其他的库

### 🚀 运行时性能
- React 和 Vue 都是非常快的, 所以速度并不是在它们之中做选择的决定性因素. 
- 在 React 应用中, 当某个组件的状态发生变化时, 它会以该组件为根, 重新渲染整个组件子树, 如要避免不必要的子组件的重渲染, 你需要在所有可能的地方使用 PureComponent, 或是手动实现 shouldComponentUpdate 方法. 同时你可能会需要使用不可变的数据结构来使得你的组件更容易被优化. 
- 在 Vue 应用中, 组件的依赖是在渲染过程中自动追踪的, 所以系统能精确知晓哪个组件确实需要被重渲染. 你可以理解为每一个组件都已经自动获得了 shouldComponentUpdate, 并且没有上述的子树问题限制. Vue 的这个特点使得开发者不再需要考虑此类优化, 从而能够更好地专注于应用本身


### 🚀 发展规模 - 向上扩展
- Vue 和 React 都提供了强大的路由来应对大型应用. React 社区在状态管理方面非常有创新精神 (比如 Flux、Redux), 而这些状态管理模式甚至 Redux 本身也可以非常容易的集成在 Vue 应用中. 实际上, Vue 更进一步地采用了这种模式 (Vuex), 更加深入集成 Vue 的状态管理解决方案 Vuex 相信能为你带来更好的开发体验. 
- 两者另一个重要差异是, Vue 的路由库和状态管理库都是由官方维护支持且与核心库同步更新的. React 则是选择把这些问题交给社区维护, 因此创建了一个更分散的生态系统. 但相对的, React 的生态系统相比 Vue 更加繁荣. 
- 各自的脚手架: create-react-app 和 vue-cli


### 🚀 发展规模 - 向下扩展
- React 学习曲线陡峭, 在你开始学 React 前, 你需要知道 JSX 和 ES2015, 因为许多示例用的是这些语法. 你需要学习构建系统, 虽然你在技术上可以用 Babel 来实时编译代码, 但是这并不推荐用于生产环境
-  Vue 向上扩展好比 React 一样, Vue 向下扩展后就类似于 jQuery. 你只要把如下标签放到页面就可以运行: 
```
<script src="https://cdn.jsdelivr.net/npm/vue"></script>
```
然后你就可以编写 Vue 代码并应用到生产中, 你只要用 min 版 Vue 文件替换掉就不用担心其他的性能问题. 


## 🚀🚀 总结
- react整体的思路就是函数式, 所以推崇纯组件, 数据不可变, 单向数据流, 当然需要双向的地方也可以做到, 比如结合redux-form, 
- vue是基于可变数据的, 支持双向绑定. 
- react组件的扩展一般是通过高阶组件, 而vue组件会使用mixin. vue内置了很多功能, 而react做的很少, 很多都是由社区来完成的, vue追求的是开发的简单, 而react更在乎方式是否正确. 