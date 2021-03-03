### Promise 题目 1 - 3

```js
const promise = new Promise((resolve, reject) => {
  console.log(1);
  // 注意: 此处没有 resolve, 也没有 reject, 所以 promise.then() 不会执行
  console.log(2);
});
promise.then(() => {
  console.log(3);
});
console.log(4);
```
### 过程分析
- 和题目2相似, 只不过在 `promise` 中并没有 `resolve` 或者 `reject`
1. 从上到下, 先遇到 `new Promise`, 执行该构造函数中的代码 `1`
2. 继续执行同步代码 `2`
3. 跳出 `promise`, 往下执行, 碰到 `promise.then`这个微任务, 将其加入微任务队列
4. 执行同步代码`4`
5. 本轮宏任务全部执行完毕,检查微任务队列,发现`promise.then`这个微任务, 发现其状态为`pending`, ❌ 不执行它
- 结果 `1 2 4`