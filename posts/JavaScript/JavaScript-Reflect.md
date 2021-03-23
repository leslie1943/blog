### JavaScript: Reflect
- 统一的对象操作API
- Reflect属于一个静态类,不能通过new的方式构建一个实例对象
- 只能调用静态方法, 13个静态方法
- Reflect成员方法就是Proxy处理对象的默认实现
```js
const obj = {
  foo: '123',
  bar: '456'
}
// Proxy中的get/set实现就是调用了Reflect中的静态方法的get/set
const proxy = new Proxy(obj, {
  // 如果我们没有在Proxy中定义get方法,
  // 就相当于在内部定义了get方法, 将参数原封不动的传给了Reflect中的对应方法
  get(target, property) {
    console.info('watch logic~')
    return Reflect.get(target, property)
  }
})

console.info(proxy.foo)
```
- Reflect的意义: 提供了一套统一的操作对象的API,统一了对象的操作方式
```js
const person = {
  name: 'tom',
  age: 20,
  gender: 'male'
}
// 🆖🆖🆖 以前的方法 🆖🆖🆖
// console.info('name' in person) // true
// console.info(Object.keys(person)) [ 'name', 'age' ]
// console.info(delete person.name) // true
// console.info(Object.keys(person)) [ 'age' ]

// 🚀🚀🚀 推荐的方法 🚀🚀🚀

console.info(Reflect.has(person, 'name')) // true
console.info(Reflect.deleteProperty(person, 'name')) // true
console.info(Reflect.ownKeys(person)) // [ 'age', 'gender' ]
```

### 静态方法
- `Reflect.apply(target, thisArgument, argumentsList)` : 对一个函数进行调用操作, 同时可以传入一个数组作为调用参数
- `Reflect.construct(target, argumentsList[, newTarget])`: 对构造函数进行 new 操作, 相当于执行 `new target(...args)`.
- `Reflect.defineProperty(target, propertyKey, attributes)` : 和 `Object.defineProperty()` 类似.如果设置成功就会返回 true
- `Reflect.deleteProperty(target, propertyKey)`: 作为函数的delete操作符, 相当于执行 `delete target[name]`.
- `Reflect.get(target, propertyKey[, receiver])`: 获取对象身上某个属性的值, 类似于 target[name].
- `Reflect.getOwnPropertyDescriptor(target, propertyKey)`: 类似于 `Object.getOwnPropertyDescriptor()`.如果对象中存在该属性, 则返回对应的属性描述符,  否则返回 undefined.
- `Reflect.getPrototypeOf(target)`: 类似于 `Object.getPrototypeOf()`.
- `Reflect.has(target, propertyKey)`: 判断一个对象是否存在某个属性, 和 in 运算符 的功能完全相同.
- `Reflect.isExtensible(target)`: 类似于 `Object.isExtensible()`.
- `Reflect.ownKeys(target)`: 返回一个包含所有自身属性（不包含继承属性）的数组.(类似于 `Object.keys()`, 但不会受 `enumerable` 影响).
- `Reflect.preventExtensions(target)`: 类似于 `Object.preventExtensions()`.返回一个 `Boolean`.
- `Reflect.set(target, propertyKey, value[, receiver])`: 将值分配给属性的函数.返回一个 `Boolean`, 如果更新成功, 则返回true.
- `Reflect.setPrototypeOf(target, prototype)`: 设置对象原型的函数. 返回一个 `Boolean`,  如果更新成功, 则返回true.