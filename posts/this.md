#### this
- 函数真正被调用执行的时候确定 `this`, 定义期无法确定`this`
- 严格模式下, `this`被禁止指向全局对象
- 1: 全局环境中, `this` 指向 `window`  `this == window` // true
- 2: 构造函数中, `this` 指向被`new`出来的对象
- 3: 对象方法中, 如果函数作用对象的方法时, 方法中的this指向该对象
```js
const person = {
    name: 'leslie',
    say: function() {
        console.info(this.name, 'say')
    },
    talk() {
        console.info(this.name, 'talk')
    }
}
person.say()
```
- 4: 函数`call`,`apply` 或者 `bind`的调用, 当一个函数被`call/apply/bind`调用时, `this`的值就是传进去的对象
- 5: `DOM event`在一个`HTML DOM`事件处理程序中, `this`始终指向这个处理程序绑定的 `HTML DOM`节点
- 6: 箭头函数中的`this`: 箭头函数完全修复了`this`的指向, `this`总是指向`词法作用域`, 也就是外层调用者`obj`, 由于`this`在箭头函数中已经按照词法作用域绑定了, 所以用`call/apply`调用箭头函数时, 无法对`this`进行绑定, 也就是说传入的第一个参数将被忽略.
```js
const name = 'global name'
const say = (first, last) => {
    console.info(first,this.name, last)
}
const obj = {
    name: 'obj name'
}
say.call(obj,'one','two') // one global name two => 并未修改this的指向
```