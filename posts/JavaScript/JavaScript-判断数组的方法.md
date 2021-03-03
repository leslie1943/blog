## 判断数组

### 1. Object.prototype.toString.call()
- 每一个继承 `Object` 的对象都有 `toString` 方法,如果 `toString` 方法没有重写的话,会返回 `[Object type]`,其中 type 为对象的类型.但当除了 `Object` 类型的对象外,其他类型直接使用 `toString` 方法时,会直接返回都是内容的字符串,所以我们需要使用`call`或者`apply`方法来改变`toString`方法的执行上下文.
```js
const person = {name: 'leslie', age: 20}
console.info(person.toString()) // [object Object]

const people = ['leslie','dora','mark','justin']
console.info(person.people()) // leslie,dora,mark,justin
console.info(Object.prototype.toString.call(people)) // [object Array]
```
- 这种方法对于所有基本的数据类型都能进行判断, 即使是 null 和 undefined .
```js
Object.prototype.toString.call('An') // "[object String]"
Object.prototype.toString.call(1) // "[object Number]"
Object.prototype.toString.call(Symbol(1)) // "[object Symbol]"
Object.prototype.toString.call(null) // "[object Null]"
Object.prototype.toString.call(undefined) // "[object Undefined]"
Object.prototype.toString.call(function(){}) // "[object Function]"
Object.prototype.toString.call({name: 'An'}) // "[object Object]"
```

### 2. instanceof
- `instanceof` 的内部机制是通过判断对象的原型链中是不是能找到类型的 `prototype`.
- 使用 `instanceof` 判断一个对象是否为数组, `instanceof` 会判断这个对象的原型链上是否会找到对应的 Array 的原型, 找到返回 `true`, 否则返回 `false`.
- 但 `instanceof` 只能用来判断对象类型, 原始类型不可以.并且所有对象类型 `instanceof Object` 都是 `true`.

```js
[]  instanceof Array; // true
[]  instanceof Object; // true
```

### 3. Array.isArray()
- 功能: 用来判断对象是否为数组
- `Array.isArray()` 是ES5新增的方法,当不存在 `Array.isArray()` ,可以用 `Object.prototype.toString.call()` 实现
