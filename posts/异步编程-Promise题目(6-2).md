### Promise 6 - 1

```js
async function async1() {
  try {
    await Promise.reject('error!!!')
  } catch (e) {
    console.log(e)
  }
  console.log('async1')
  return Promise.resolve('async1 success')
}
async1().then((res) => console.log(res))
console.log('script start')

// script start
// error!!!
// async1
// async1 success

```

### 过程讲解
- 如果想要使得错误的地方不影响 `async` 函数后续的执行的话, 可以使用 `try catch`
1. 程序执行, 调用 `async1`执行, 遇到`await`,暂停, 跳出函数.
2. 输出 `script start`
3. 执行微任务`try`, 遇到 `Promise.reject('error!!!')`,跳转到 `catch`去执行
4. 然后继续执行 `async1`, 执行 `return`
5. 执行`.then()` 输出 返回结果