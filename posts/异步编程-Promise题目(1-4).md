### Promise 题目 1 - 4

```js
const promise1 = new Promise((resolve, reject) => {
  console.log("promise1");
  resolve("resolve1");
});
const promise2 = promise1.then((res) => {
  console.log(res);
});
console.log("1", promise1);
console.log("2", promise2);

// promise1
// 1, Promise{<resolved>, 'resolve1'}
// 2, Promise{<pending>}
// resolve1

```
### 过程分析
1. 从上到下, 先遇到 `Promise`, 执行改构造函数中的代码 `promise1`
2. 碰到 `resolve` 函数, 将 `promise1` 的状态改变为 `resolved`, 并将结果保存下来
3. 碰到 `promise1.then` 这个微任务, 将它放入微任务队列
4. `promise2` 是一个新的状态为 `pending` 的 `Promise`
5. 执行同步代码1,  同时打印出 `promise1` 的状态是 `resolved`
6. 执行同步代码2, 同时打印出 `promise2` 的状态是 `pending`
7. 宏任务执行完毕, 查找微任务队列, 发现 `promise1.then` 这个微任务且状态为 `resolved`, 执行它
