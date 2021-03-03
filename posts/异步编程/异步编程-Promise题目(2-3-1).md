### Promise 题目 2 - 3 - 1

```js
setTimeout(() => {
  console.log('timer1')

  setTimeout(() => {
    console.log('timer3')
  }, 0)
}, 0)
setTimeout(() => {
  console.log('timer2')
}, 0)

console.log('start')

// start, timer1,timer2,timer3
```

```js
setTimeout(() => {
  console.log('timer1')

  Promise.resolve().then(() => {
    console.log('promise')
  })
}, 0)

setTimeout(() => {
  console.log('timer2')
}, 0)

console.log('start')

// start, timer1,promise,timer2

```

### 过程分析
- 这两个例子, 看着好像只是把第一个定时器中的内容换了一下而已.
一个是为定时器 `timer3`, 一个是为 `Promise.then`
- 但是如果是定时器 `timer3` 的话, 它会在 `timer2` 后执行, 而 `Promise.then` 却是在 `timer2` 之前执行.
- 你可以这样理解, `Promise.then` 是微任务, 它会被加入到本轮中的微任务列表, 而定时器 `timer3` 是宏任务, 它会被加入到下一轮的宏任务中.
