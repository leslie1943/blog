### Promise 4 - 2
- 我新增了一个`runReject`函数, 它用来在`1000 * x`秒后`reject`一个错误.
- 同时`.catch()`函数能够捕获到`.all()`里最先的那个异常, 并且只执行一次.想想这道题会怎样执行呢 🤔️？
```js
function runAsync (x) {
  const p = new Promise(r => setTimeout(() => r(x, console.log(x)), 1000))
  return p
}
function runReject (x) {
  const p = new Promise((res, rej) => setTimeout(() => rej(`Error: ${x}`, console.log(x)), 1000 * x))
  return p
}
Promise.all([runAsync(1), runReject(4), runAsync(3), runReject(2)])
  .then(res => console.log(res))
  .catch(err => console.log(err))

// 1s后输出
// 1
// 3
// 2s后输出
// 2
// Error: 2
// 4s后输出
// 4
```
- 没错, 就像我之前说的, `.catch`是会捕获最先的那个异常, 在这道题目中最先的异常就是`runReject(2)`的结果.
- 另外, 如果一组异步操作中有一个异常, 都不会进入`.then()`的第一个回调函数参数中.
- 注意, 为什么不说是不进入`.then()`中呢 🤔️?
- 哈哈, 大家别忘了`.then()`方法的第二个参数也是可以捕获错误的：

```js
Promise.all([runAsync(1), runReject(4), runAsync(3), runReject(2)])
  .then(res => console.log(res), 
  err => console.log(err))

```