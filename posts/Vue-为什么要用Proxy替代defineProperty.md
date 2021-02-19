## Vue: 为什么要用Proxy替代defineProperty

### 🚀🚀 Object.defineProperty
- 定义: `Object.defineProperty` 方法会直接在一个对象上定义一个新属性或者修改一个对象的现有属性,并返回此对象

#### 为什么能实现响应式?
- 通过 `defineProperty` 两个属性, `get`和`set`
- `get`: 属性的`getter`函数, 当访问该属性时, 会调用此函数. 执行时不传入任何参数, 但是会传入 `this` 对象(由于继承关系, 这里的this并不一定是定义该属性的对象).该函数的返回值会被用作属性的值
- `set`: 属性的`setter`函数, 当属性值被修改时,会调用此函数.该方法接受一个参数(也就是被赋予的新值),会传入赋值时的 `this` 对象.默认为 `undefined`

```js
// 定义一个响应式函数 defineReactive
function update(){
    app.innerText = obj.foo
}

function defineReactive(obj,key,val){
    Object.defineProperty(obj,key,{
        get(){
            console.log(`get ${key}:${val}`);
            return val
        },
        set(newVal) {
            if (newVal !== val) {
                val = newVal
                update()
            }
        }
    })
}
```
- 调用`defineReactive`数据发生变化时,触发`update`方法,实现数据相应
```js
const obj = {}
defineReactive(obj, 'foo','')
setTimeout(()=>{
    obj.foo = new Date().toLocaleTimeString()
},1000)
```
- 在对象存在多个key情况下,需要进行遍历

```js
function observe(obj) {
    if (typeof obj !== 'object' || obj == null) {
        return
    }
    // 循环
    Object.keys(obj).forEach(key => {
        defineReactive(obj, key, obj[key])
    })
}
```
- 如果存在嵌套对象的情况,还需要在 `defineReactive` 中进行递归
```js
function defineReactive(obj, key, val) {
    observe(val)
    Object.defineProperty(obj, key, {
        get() {
            console.log(`get ${key}:${val}`);
            return val
        },
        set(newVal) {
            if (newVal !== val) {
                val = newVal
                update()
            }
        }
    })
}
```
- 当给 `key` 赋值为对象的时候,还需要在 `set` 属性中进行递归
```js
set(newVal) {
    if (newVal !== val) {
        observe(newVal) // 新值是对象的情况
        notifyUpdate()
    }
}
```
- 上述例子能够实现对一个对象的基本响应式, 但仍然存在诸多问题
- 现在对一个对象进行删除与添加属性操作, 无法劫持到
```js
const obj = {
    foo:'foo',
    bar:'bar'
}
observe(obj)
delete obj.foo // no ok
obj.jar = 'xxx' // no ok
```
- 当我们对一个数组进行监听的时候,并不那么好使了

```js
const arrData = [1,2,3,4,5];
arrData.forEach((val,index)=>{
    defineProperty(arrData,index,val)
})
arrData.push() // no ok
arrData.pop()  // no ok
arrDate[0] = 99 // ok
```
- 可以看到数据的 `api` 无法劫持到, 从而无法实现数据响应式, 所以在Vue2中, 增加了 `set`, `delete API`, 并且对数组`api`方法进行一个重写
- 还有一个问题则是, 如果存在深层的嵌套对象关系, 需要深层的进行监听, 造成了性能的极大问题

### defineProperty小结
1. 检测不到对象属性的添加和删除
2. 数组API方法无法监听到
3. 需要对每个属性进行遍历监听,如果嵌套对象,需要深层监听,造成性能问题


### 🚀🚀 Proxy
- `Proxy`的监听时针对一个对象的, 那么对这个对象的所有操作会进入监听操作,这就完全可以代理所有属性了
- 定义一个`reactive`响应式方法
```js
function reactive(obj){
    if (typeof obj !== 'object' && obj != null) {
        return obj
    }
    // proxy相当于在对象外层加拦截
    const observed = new Proxy(obj,{
        get(target, key, receiver){
            const res = Reflect.get(target, key, receiver)
            console.log(`获取${key}:${res}`)
            // return res
             return isObject(res) ? reactive(res) : res
        },
        set(target, key, value, receiver){
            const res = Reflect.set(target, key, value, receiver)
            console.log(`设置${key}:${value}`)
            return res
        },
         deleteProperty(target, key) {
            const res = Reflect.deleteProperty(target, key)
            console.log(`删除${key}:${res}`)
            return res
        }
    })
    return observed
}
```
- 测试
```js
const state = reactive({
    foo: 'foo'
})
// 1.获取
state.foo // ok
// 2.设置已存在属性
state.foo = 'fooooooo' // ok
// 3.设置不存在属性
state.dong = 'dong' // ok
// 4.删除属性
delete state.dong // ok
```
- 再测试嵌套对象情况,这时候发现就不那么 OK 了
```js
const state = reactive({
    bar: { a: 1 }
})

// 设置嵌套对象属性
state.bar.a = 10 // no ok
```
- 如果要解决,需要在get之上再进行一层代理
```js
 get(target, key, receiver){
    const res = Reflect.get(target, key, receiver)
    console.log(`获取${key}:${res}`)
    // return res
     return isObject(res) ? reactive(res) : res
 },
```
### defineProperty小结
1. Object.defineProperty只能遍历对象属性进行劫持
```js
function observe(obj) {
    if (typeof obj !== 'object' || obj == null) {
        return
    }
    Object.keys(obj).forEach(key => {
        defineReactive(obj, key, obj[key])
    })
}
```
2. Proxy直接可以劫持整个对象,并返回一个新对象,我们可以只操作新的对象达到响应式目的
```js
function reactive(obj) {
    if (typeof obj !== 'object' && obj != null) {
        return obj
    }
    // Proxy相当于在对象外层加拦截
    const observed = new Proxy(obj, {
        get(target, key, receiver) {
            const res = Reflect.get(target, key, receiver)
            console.log(`获取${key}:${res}`)
            return res
        },
        set(target, key, value, receiver) {
            const res = Reflect.set(target, key, value, receiver)
            console.log(`设置${key}:${value}`)
            return res
        },
        deleteProperty(target, key) {
            const res = Reflect.deleteProperty(target, key)
            console.log(`删除${key}:${res}`)
            return res
        }
    })
    return observed
}
```
1. Proxy可以直接监听数组的变化(`push`, `shift`, `splice`)
```js
const obj = [1,2,3]
const proxtObj = reactive(obj)
obj.psuh(4) // ok
```

1. `Proxy` 有多达13种拦截方法,不限于 `apply`, `ownKeys`, `deleteProperty`, `has` 等等,这是`Object.defineProperty`不具备的

