## JavaScript: new操作符具体都干了什么?

### 💛💛 new 是什么?
- 在`JavaScript`中, `new`操作符用于创建一个给定构造函数的实例对象
```js
function Person(name, age) {
  this.name = name
  this.age = age
}

Person.prototype.sayName = function () {
  console.info(this.name)
}

const p1 = new Person('leslie', 12)
console.info(p1)
p1.sayName()
```
从上面可以看到
- `new`通过构造函数 `Person`创建出来的实例可以访问到构造函数中的属性
- `new`通过构造函数 `Person`创建出来的实例可以访问到构造函数原型链中的属性(即 实例与构造函数通过原型链连接了起来)
现在在构建函数中显示加上返回值, 炳这个返回值是一个原始类型

```js
function Test(name){
    this.name = name
    return 1
}
const t = new Test('xxxx')
console.info(t.name) // xxxx
```
可以发现, 构造函数中返回一个原始值, 然后这个返回值并没有什么作用

下面在构造函数中返回一个对象
```js
function Test(name){
    this.name = name
    console.info(this)
    return {age: 25}
}

const t = new Test('xxxx')
console.info(t) // {age: 25}
console.info(t.name) // undefined
```
- 可以发现, 构造函数如果返回值为一个对象,那么这个返回值就会被正常使用


### 💛💛 new 的流程
从上面介绍中, 我们可以看到 `new`关键字主要做了以下的工作
1. 创建一个新的对象 obj
2. 将对象与构建函数通过原型链连接起来
3. 将构造函数中的`this`绑定到新建的 `obj`上
4. 根据构造函数返回类型作判断, 如果是原始值则被忽略, 如果是返回对象, 需要正常处理
```js
function Person(name, age){
    this.name = name
    this.age = age
}
Person.prototype.sayName = function () {
  console.info(this.name)
}
const p1 = new Person('Tom', 22)
console.info(p1)
p1.sayName()
```
- 流程图图下
1. `const p1 = new Person('Tom',20)` => `创建一个新的空对象{}`
2. 将新对象的`__proto__`指向为`Person.prototype` => `{__proto__ = Person.prototype}` 新对象的`原型` 指向 构造函数的`原型对象`)
3. 将`Person`构造函数的`this`设置为新创建的对象, 执行
```js
    {
        __proto__ = Person.prototype
        name = 'Tom'
        age = 20
    }
```
4. 构造函数`Person`没有`return`语句, 则将该新创建的对象返回
```js
    const p1 = {
        __proto__ = Person.prototype
        name = 'Tom'
        age = 20
    }
```

### 💛💛 new 的实现
```js
function mynew(Func, ...args) {
  // 1-创建一个新对象
  const obj = {}
  // 2-新对象的原型 指向 构造函数的原型对象
  obj.__proto__ = Func.prototype
  // 3-将构造函数的this指向新对象
  let result = Func.apply(obj, args)
  // 4-根据返回值判断
  return result instanceof Object ? result : obj
}

function Person(name, age) {
  this.name = name
  this.age = age
}

Person.prototype.say = function () {
  console.log(this.name)
}

let p = mynew(Person, 'tom', 22)
console.info(p)
p.say()

```