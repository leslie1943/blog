### JavaScript: ES6, ES7, ES8, ES9, ES10, ES11, ES12
- 使用新特性需要使用最新版的 `bable` 就行转义

### 🚀🚀🚀 ES6
1. 类-class
```js
class Man {
  constructor(name) {
    this.name = name;
  }
  console() {
    console.log(this.name);
  }
}
const man = new Man('Jack');
man.console(); // Jack
```
2. 模块化(ES Module)
```js
// 模块 A 导出一个方法
export const sub = (a,b)=> a+b
// 模块 B 导入使用
import {sub} from './A'
console.info(sub(1,2))
```
3. 箭头函数
4. 函数参数默认值
```js
function foo(age=25){
}
```
5. 模板字符串
6. 解构赋值
```js
let a = 1, b = 2
[a, b] = [b, a] // a = 2, b=1
```
7. 延展操作符
```js
let a = [...'hello world']  // ["h", "e", "l", "l", "o", " ", "w", "o", "r", "l", "d"]
```
8. 对象属性简写
```js
const name = 'leslie'
const obj = {name}
```
9. Promise
```js
Promise.resolve().then(() => { console.log(2); });
console.log(1); // 1, 2
```
10. let和const


### 🚀🚀🚀 ES7 - ES2016
1. Array.prototype.includes()
```js
['jack','loves','rose'].includes('loves') // true
['jack','love','rose'].includes('loves') // false
```
2. 指数操作符
```js
2 ** 10 // 1024
```

### 🚀🚀🚀 ES8 - ES2017
1. async/await: 异步终极解决方案
```js
async function getData(){
    const res = await api.getDataApi()
    console.info(res)
}
```
2. Object.values()
```js
Object.values({a : 1, b : 2, c : 3}) // [1, 2, 3]
```
3. Object.entries()
```js
Object.entries({a : 1, b : 2, c : 3}) // [["a",1], ["b",2],["c",3]]
```
4. String padding
```js
// padStart
'hello'.padStart(10); // "     hello"
// padEnd
'hello'.padEnd(10) "hello     "
```
5. 函数参数列表结尾允许逗号
6. Object.getOwnPropertyDescriptors() // 获取一个对象的所有自身属性的描述符,如果没有任何自身属性，则返回空对象。
7. SharedArrayBuffer对象
```js
/*
 * @param {*} length 所创建的数组缓冲区的大小，以字节(byte)为单位。
 * @returns {SharedArrayBuffer} 一个大小指定的新 SharedArrayBuffer 对象。其内容被初始化为 0。
 */
new SharedArrayBuffer(10)
```
8. Atomics对象:Atomics 对象提供了一组静态方法用来对 SharedArrayBuffer 对象进行原子操作


### 🚀🚀🚀 ES9 - ES2018
### 🚀🚀🚀 ES10 - ES2019
### 🚀🚀🚀 ES11 - ES2020
### 🚀🚀🚀 ES12 - ES2021