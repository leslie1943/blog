### Promise 7 - 2

- `async` 函数中 `await` 的 `new Promise` 要是没有返回值的话则不执行后面的内容 参考 [异步编程: Promise题目(5-5)](https://github.com/leslie1943/blog/issues/142).
- `.then`函数中的参数期待的是函数, 如果不是函数的话会发生透传 参考 [异步编程: Promise题目(3-8)](https://github.com/leslie1943/blog/issues/131).
- 注意定时器的延迟时间


```js
const async1 = async () => {
  console.log('async1')
  setTimeout(() => {
    console.log('timer1')
  }, 2000)
  await new Promise((resolve) => {
    console.log('promise1') // 没有resolve返回值
  })
  console.log('async1 end')
  return 'async1 success'
}

console.log('script start')

async1().then((res) => console.log(res))

console.log('script end')

Promise.resolve(1)
  .then(2)
  .then(Promise.resolve(3))
  .catch(4)
  .then((res) => console.log(res))
setTimeout(() => {
  console.log('timer2')
}, 1000)

/**
 * script start
 * async1
 * promise1
 * script end
 * 1
 * timer2
 * timer1
 */

```