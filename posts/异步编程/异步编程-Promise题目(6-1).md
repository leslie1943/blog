### Promise 6 - 1

```js
async function async1() {
  await async2()
  console.log('async1')
  return 'async1 success'
}
async function async2() {
  return new Promise((resolve, reject) => {
    console.log('async2')
    reject('error')
  })
}
async1().then((res) => console.log(res))
/**
 * async2
 * Uncaught (in promise) error
 */
```

### 过程讲解
- 如果在 `async` 函数中抛出了错误,则终止错误结果,不会继续向下执行.

- 如果改为 `throw new Error` 也是一样的：

```js
async function async1 () {
  console.log('async1');
  throw new Error('error!!!')
  return 'async1 success'
}
async1().then(res => console.log(res))
// 'async1'
// Uncaught (in promise) Error: error!!!
```