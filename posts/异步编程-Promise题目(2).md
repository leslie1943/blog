### Promise 题目 - 2

```js
const promise = new Promise((resolve,reject) => {
    console.info('1')
    resolve('success')
    console.info('2')
})

promise.then(()=>{
    console.info('3')
})

console.info('4')
```

### 过程分析
1. 从上到下, 先遇到 `new Promise`, 执行该构造函数中的代码 `1`
2. 再遇到 `resolve('success')`, 将 `promise`的状态改为了`resolved`并且将值保存下来
3. 继续执行同步代码 `2`
4. 跳出 `promise`, 往下执行, 碰到 `promise.then`这个微任务, 将其加入微任务队列
5. 执行同步代码`4`
6. 本轮宏任务全部执行完毕,检查微任务队列,发现`promise.then`这个微任务且状态为`resolved`, 执行它
- 结果 `1 2 4 3`