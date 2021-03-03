### Promise 5 - 9

```js
async function testSometing() {
  console.log('执行testSometing')
  return 'testSometing'
}

async function testAsync() {
  console.log('执行testAsync')
  return Promise.resolve('hello async')
}

async function test() {
  console.log('test start...')
  const v1 = await testSometing()
  console.log(v1)
  const v2 = await testAsync()
  console.log(v2)
  console.log(v1, v2)
}

test()

var promise = new Promise((resolve) => {
  console.log('promise start...')
  resolve('promise')
})
promise.then((val) => console.log(val))

console.log('test end...')
/**
 * test start...
 * 执行testSometing
 * promise start...
 * test end...
 * testSometing
 * 执行testAsync
 * promise
 * hello async
 * testSometing, hello async
 */
```

### 过程讲解
- 将整段代码看成一个大的任务 `【 MA_TASK_1 】` , 开始执行调用.
1. 执行 `test`函数的调用
2. 输出`test()`里的同步代码: 💛输出`test start...`, 继续执行, 遇到 `await testSometing()`
3. 进入`testSometing`函数的逻辑, 💛输出`执行testSometing`,返回结果`testSometing`
4. 跳出`test`调用. 继续执行 `【 MA_TASK_1 】` 的同步代码
5. 遇到 `Promise`的构造函数, 💛输出`promise start...`, 执行`resolve('promise')`跳出 构造函数
6. 继续执行 `【 MA_TASK_1 】` 的同步代码 💛输出`test end...`
7. 检查微任务队列, 执行`test`的暂停的地方, `console.log(v1)`  💛输出`testSometing`
8. 继续执行, 遇到 `testAsync`, 执行内部的同步代码 💛输出`执行testAsync`, 返回`hello async`
9. 检查微任务队列, 执行 `promise.then()`, 💛输出`promise`
10. 继续从 上次`await`停止的地方执行: `console.log(v2)`, 💛输出`hello async`
11. 继续执行同步代码 💛输出`testSometing, hello async`
