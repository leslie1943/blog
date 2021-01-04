### Promise 题目 2 - 4

```js
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('success')
  }, 1000)
})

const promise2 = promise1.then(() => {
  throw new Error('error!!!') // 执行后, promise的状态为 rejected
})

console.log('promise1', promise1)
console.log('promise2', promise2)

setTimeout(() => {
  console.log('promise1', promise1)
  console.log('promise2', promise2)
}, 2000)

// promise1, Promise{<pending>}
// promise2, Promise{<pending>}
// Uncaught (in promise) Error: error!!!
// promise1, Promise{<resolved>,'success'}
// promise2, Promise{<rejected>,Error: error!!}
```

### 过程分析
1. 从上至下, 先执行第一个`new Promise`中的函数, 碰到`setTimeout`将它加入下一个宏任务列表
2. 跳出`new Promise`, 碰到`promise1.then`这个微任务, 但其状态还是为`pending`, 这里理解为先不执行
3. `promise2`是一个新的状态为`pending`的`Promise`
4. 执行同步代码`console.log('promise1')`, 且打印出的`promise1`的状态为`pending`
5. 执行同步代码`console.log('promise2')`, 且打印出的`promise2`的状态为`pending`
6. 碰到第二个定时器, 将其放入下一个宏任务列表
7. 第一轮宏任务执行结束, 并且没有微任务需要执行, 因此执行第二轮宏任务
8. 先执行第一个定时器里的内容, 将`promise1`的状态改为`resolved`且保存结果并将之前的`promise1.then`推入微任务队列
9. 该定时器中没有其它的同步代码可执行, 因此执行本轮的微任务队列, 也就是`promise1.then`, 它抛出了一个错误, 且将`promise2`的状态设置为了`rejected`
10. 第一个定时器执行完毕, 开始执行第二个定时器中的内容
11. 打印出`'promise1'`, 且此时`promise1`的状态为`resolved`
12. 打印出`'promise2'`, 且此时`promise2`的状态为`rejected`
