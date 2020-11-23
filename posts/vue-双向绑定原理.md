#### vue-双向绑定原理
- 采用数据劫持`defineProperty`和`发布-订阅模式`的方式
- 通过`Object.defineProperty`来劫持各个属性的`getter/setter`, 在数据发生变化时发布消息给`订阅者`, 触发响应的监听回调.
- 当把一个普通的 JavaScript 对象传给 Vue 实例来作为它的 data 选项时, Vue 将遍历它的属性, 用 defineProperty将他们转换为`getter/setter`, 让他们在Vue 内部可追踪依赖, 在属性`被访问`和`被修改`时通知`订阅者`触发事件回调.

Vue的数据双向绑定将MVVM作为绑定数据的入口, 整合`Observer`, `Compile`和`Watcher`三者, 通过`Observer`来监听自己的`model`的数据变化, 通过`Compile`来解析编译模板指令, 最终利用`Watcher`搭起`Observer`和`Compile`之间的通信桥梁. 达到`数据双向绑定`效果