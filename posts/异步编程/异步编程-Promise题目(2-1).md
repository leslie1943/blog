### Promise 题目 2 - 1

```js
console.info('start')

setTimeout(() => {
  console.info('in setTimeout')
}, 100)

Promise.resolve().then(() => {
  console.info('resolve')
})
console.info('end')

// print order:
// start, end, resolve, in setTimeout
```

### 过程分析
1. 刚开始整个脚本作为一个宏任务来执行, 对于同步代码直接压入执行栈进行执行, 因此先打印出start和end.
2. `setTimout` 作为一个宏任务被放入宏任务队列(下一个)
3. `Promise.then` 作为一个微任务被放入微任务队列
4. 本次宏任务执行完, 检查微任务, 发现 `Promise.then`, 执行它
5. 接下来进入下一个宏任务, 发现 `setTimeout`, 执行.
