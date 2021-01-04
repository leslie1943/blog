### Promise 题目 2 - 5

```js
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('success')
    console.log('timer1')
  }, 1000)
  console.log('promise1里的内容')
})

const promise2 = promise1.then(() => {
  throw new Error('error!!!')
})

console.log('promise1', promise1)
console.log('promise2', promise2)

setTimeout(() => {
  console.log('timer2')
  console.log('promise1', promise1)
  console.log('promise2', promise2)
}, 2000)

// promise1里的内容
// promise1 Promise { <pending> }
// promise2 Promise { <pending> }
// timer1
// Error: error!!!
// timer2
// promise1 Promise { 'success' }
// promise2 Promise {<rejected> Error: error!!!}

```

### 过程分析
- 参照 `2-4`的过程分析 [异步编程: Promise题目(2-4)](https://github.com/leslie1943/blog/issues/121). |
