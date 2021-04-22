### 异步编程: Promise,Genarator, Async 区别和联系
- 原始的调用: 回调地狱
```js
// 回调地狱
const timer = () =>
  setTimeout(() => {
    console.info('timer 1')
    setTimeout(() => {
      console.info('timer 2')
      setTimeout(() => {
        console.info('timer 3')
      }, 3000)
    }, 2000)
  }, 1000)
timer()
```

### 使用 promise 解决回调地狱
- promise 是一个类函数, 当它执行完毕后, 会开启异步任务, 这个异步任务还得看 promise 本身的状态. 通俗来说, 它的异步任务就是`then`中的回掉函数
- 那么问题来了, `Promise`的诞生不是为了开启异步任务, 而是为了解决异步代码的书写格式, 尽量实现函数回调的扁平化, 所以我们需要把异步代码写在 `promise` 中进行封装
- 参考 `codes\promise\promise-generator-async-2-no-return-in-then.js`
- 参考 `codes\promise\promise-generator-async-2-has-return-in-then.js`


### 为什么 .then()方法中加 return?
- 如果`.then()`不加`return`, 输出结果
```js
// 参考 `codes\promise\promise-generator-async-2-no-return-in-then.js`
// timer1 -> v1 -> v2 -> v3 -> timer2 -> timer3
```
- 如果`.then()`加`return`, 输出结果
```js
// 参考 `codes\promise\promise-generator-async-2-has-return-in-then.js`
// timer1 -> v1 -> timer2 -> v2 -> timer3 -> v3
```

- 要用到 `then` 之前呢, 必定会有个 `deferred` 的返回值, 然后再 `then`, 如果 `then` 里面有 `return`, 则就是链式调用, 如果没有 `return`, 就是同时执行

### 使用 async 解决回调地狱
```js
const asyncFn = (value, duration) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(value)
      resolve()
    }, duration)
  })
}
const fn = async () => {
  console.info('v1')
  await asyncFn('timer1', 1000)
  console.info('v2')
  await asyncFn('timer2', 2000)
  console.info('v3')
  await asyncFn('timer3', 3000)
}

fn()

```

### 三者关系
- 对于这三者之间的联系, 其实很好理解.我们可以认为它们是每一次版本升级的产物.
- 也就是说, `generator` 其实是 `promise` 的升级版, 但它的逻辑和理解却要比 `promise` 复杂.因此, 程序员们在上面要花费一些学习成本, 所以我个人不推荐大家使用 `generator`.
- 而 `async` 是 `generator` 的升级版, 外界都称它为 `generator` 的语法糖, 那就意味着 `async` 就是一个小甜点, 人人喜欢, 因为它简单易懂还好用, 顺理成章成为开发者们解决异步方案的不二之选

