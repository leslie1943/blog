### Promise 题目 2 - 2

```js
const promise = new Promise((resolve, reject) => {
  console.log(1)

  setTimeout(() => {
    console.log('timerStart')
    resolve('success')
    console.log('timerEnd')
  }, 0)

  console.log(2)
})
promise.then((res) => {
  console.log(res)
})
console.log(4)

// 1, 2, 4, timerStart,timerEnd,success
```

### 过程分析
1. 从上至下, 先遇到 `new Promise`, 执行该构造函数中的代码`1`
2. 然后碰到了 `setTimeout` 定时器, 放入宏任务队列等待执行
3. 执行同步代码 `2`
4. 跳出 `promise`函数, 遇到 `promise.then`,  但其装还是`pending`,暂不执行
5. 执行同步代码 `4`
6. 同步代码执行结束,  检查微任务队列和宏任务队列, 发现有 `setTimeout` 宏任务, 执行它
7. 首先执行 `timerStart`, 然后遇到了 `resolve`, 将 `promise` 的状态改为 `resolved` 且保存结果并将之前的 `promise.then` 推入微任务队列.
8.  继续执行 `timeEnd`
9.  宏任务执行完毕, 查找微任务队列和宏任务队列,还有 `promise.then`微任务,执行它

<font color="#F56C6C">从第7步可以得知: 只有当 `Promise` 返回状态后(无论是 `resolve` 还是 `reject` ), 这个 `Promise.then()` 才进入微任务队列</font>
