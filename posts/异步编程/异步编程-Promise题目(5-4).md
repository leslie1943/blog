### Promise 5 - 4
- 正常情况下, `async` 中的 `await` 命令是一个 `Promise` 对象, 返回该对象的结果.
- 但如果不是 `Promise` 对象的话, 就会直接返回对应的值, 相当于`Promise.resolve()`

```js
async function fn1() {
  // return await 123 //
  // 等同于
  return 12
}
fn1().then((res) => console.log(res))

async function fn2() {
  return await 34
  // 等同于
  // return 123
}
fn2().then((res) => console.log(res))

async function fn3() {
  return await Promise.resolve(56)
}
fn3().then((res) => console.log(res))

async function fn4() {
  return Promise.resolve(78)
}
fn4().then((res) => console.log(res))

/**
 * 打印结果:
 *  12
 *  34
 *  56
 *  78
 */
```
