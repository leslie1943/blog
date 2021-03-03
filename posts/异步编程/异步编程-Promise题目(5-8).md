### Promise 5 - 8

```js
async function async1() {
  console.log('async1 start')
  await async2()
  console.log('async1 end')
}

async function async2() {
  console.log('async2')
}

console.log('script start')

setTimeout(function () {
  console.log('setTimeout')
}, 0)

async1()

new Promise(function (resolve) {
  console.log('promise1')
  resolve()
}).then(function () {
  console.log('promise2')
})
console.log('script end')

/**
 * script start
 * async1 start
 * async2
 * promise1
 * script end
 * async1 end
 * promise2
 * setTimeout
 *
 */

```

### 讲解
这道题最后`async1 end`和`promise2`的顺序其实在网上饱受争议,我这里使用浏览器 `Chrome V80`, `Node v12.16.1`的执行结果都是上面这个答案)