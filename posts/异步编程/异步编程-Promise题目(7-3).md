### Promise 7 - 3

```js
const p1 = new Promise((resolve) => {
  setTimeout(() => {
    resolve('resolve3')
    console.log('timer1')
  }, 0)
  resolve('resovle1')
  resolve('resolve2')
})
  .then((res) => {
    console.log(res)
    setTimeout(() => {
      console.log(p1) // 此时的P1是 finally之后的.
    }, 1000)
    // return 1 如果这里加上这句
  })
  .finally((res) => {
    console.log('finally', res)
  })

/**
 * resovle1
 * finally undefined
 * timer1
 * Promise: undefined
 */
```

### 注意点
1. `Promise` 的状态一旦改变就无法改变
2. `finally`不管 `Promise` 的状态是`resolved`还是`rejected`都会执行, 且它的回调函数是接收不到`Promise`的结果的, 所以`finally()`中的`res`是一个迷惑项
3. 最后一个定时器打印出的`p1`其实是`.finally`的返回值, 我们知道`.finally`的返回值如果在没有抛出错误的情况下默认会是上一个`Promise`的返回值, 而这道题中`.finally`上一个`Promise`是`.then()`, 但是这个`.then()`并没有返回值, 所以`p1`打印出来的`Promise`的值会是`undefined`, 如果你在定时器的下面加上一个`return 1`, 则值就会变成`1`
