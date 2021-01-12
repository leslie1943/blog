### Promise 5 - 5
- 在 `async1` 中 `await` 后面的 `Promise` 是没有返回值的, 也就是它的状态始终是 `pending` 状态, 因此相当于一直在 `await`, `await`, `await` 却始终没有响应.
- 所以在 `await` 之后的内容是不会执行的, 也包括 `async1` 后面的 `.then`.

```js
async function async1() {
  console.log('async1 start')
  await new Promise((resolve) => {
    console.log('promise1')
  })
  console.log('async1 success')
  return 'async1 end'
}
console.log('srcipt start')

async1().then((res) => console.log(res))

console.log('srcipt end')

/**
 * srcipt start
 * async1 start
 * promise1
 * srcipt end
 */
```

### 在async1的await后设置返回

```js
async function async1() {
  console.log('async1 start')
  await new Promise((resolve) => {
    console.log('promise1')
    resolve('value in async1 await') // 这一行的结果没有被接收
  })
  console.log('async1 success')
  return 'async1 end' // 直接返回了字符串 .then(res) 中的 res的值
}
console.log('srcipt start')

async1().then((res) => console.log(res))

console.log('srcipt end')

/**
 * srcipt start
 * async1 start
 * promise1
 * srcipt end
 * async1 success
 * async1 end
 */

```