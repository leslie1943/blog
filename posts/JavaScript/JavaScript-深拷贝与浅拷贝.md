#### 深拷贝与浅拷贝
- `浅拷贝`: (一层) => 仅仅是复制了引用, 彼此之间的操作会互相影响
- `深拷贝`: (多层) => 重新分配内存, 不同的地址, 操作互不影响


#### 浅拷贝
1. `Object.assign`: 只复制源对象中可枚举的属性和对象自身的属性
```js
const obj1 = {name: 'test', arr: [1,2,3] }
const obj2 = Object.assign({}, obj1)
obj2.name = 'updated test'

console.info(obj1) // {name: 'test', arr: [1,2,3] }
console.info(obj2) // {name: 'updated test', arr: [1,2,3] } 
console.info(obj1 === obj2) // false
console.info(obj1.name === obj2.name) // false
console.info(obj1.arr === obj2.arr) // true
```
2. `扩展运算符 ... `
```js
let obj1 = {a:1 , arr: [2,3]}
let obj2 = { ...obj1 }
console.info(obj.arr === obj2.arr) // true
console.info(obj1 === obj2) // false
```

#### 深拷贝
1. `JSON 序列化`
```js
const obj1 = { a: 1, jobs: { first: 'FE' }}
const obj2 = JSON.parse(JSON.stringify(obj1))
obj1.jobs.first = 'native'
console.info(obj1.jobs.first) // native
console.info(obj2.jobs.first) // FE

```
2. `loadash`的`cloneDeep`


#### 总结
- 只有一层可使用 `object.assign`, 
- 深层建议序列化反序列化方法 => `JSON.parse()` 和 `JSON.stringify()`
- 特殊要求: `lodash.cloneDeep()`
